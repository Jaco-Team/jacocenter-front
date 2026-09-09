import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { authApi } from '@/entities/auth/api/authApi';
import { AuthSession, AuthUser } from '@/entities/auth/model/types';
import { ApiError, configureHttp } from '@/shared/api/http';

type SessionStatus = 'idle' | 'loading' | 'ready';

type SessionState = {
  token: string | null;
  user: AuthUser | null;
  expiresAt: string | null;
  status: SessionStatus;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
  bootstrap: () => Promise<void>;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const REFRESH_MARGIN_MS = 30 * 60 * 1000;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let bootstrapPromise: Promise<void> | null = null;

function clearRefreshTimer() {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
}

function isUnauthorized(error: unknown) {
  return error instanceof ApiError && error.status === 401;
}

function scheduleRefresh() {
  clearRefreshTimer();
  const { expiresAt, token } = useSessionStore.getState();
  if (!token || !expiresAt) {
    return;
  }

  const delay = Math.max(Date.parse(expiresAt) - Date.now() - REFRESH_MARGIN_MS, 15_000);
  refreshTimer = setTimeout(() => {
    void useSessionStore.getState().refresh();
  }, Math.min(delay, 2_147_483_647));
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      expiresAt: null,
      status: 'idle',

      setSession: (session) => {
        set({
          token: session.token,
          user: session.user,
          expiresAt: session.expires_at,
          status: 'ready',
        });
        scheduleRefresh();
      },

      clearSession: () => {
        clearRefreshTimer();
        set({
          token: null,
          user: null,
          expiresAt: null,
          status: 'ready',
        });
      },

      bootstrap: async () => {
        if (bootstrapPromise) {
          return bootstrapPromise;
        }

        bootstrapPromise = (async () => {
          // persist пишет состояние в storage при каждом set, поэтому до
          // rehydrate() любое изменение статуса затирает сохранённый токен.
          await useSessionStore.persist.rehydrate();
          set({ status: 'loading' });

          const token = get().token;
          if (!token) {
            set({ status: 'ready' });
            return;
          }

          try {
            const { user } = await authApi.me();
            set({ user, status: 'ready' });
            scheduleRefresh();
          } catch (error) {
            if (isUnauthorized(error)) {
              get().clearSession();
              return;
            }

            set({ status: 'ready' });
            scheduleRefresh();
          }
        })();

        try {
          await bootstrapPromise;
        } finally {
          bootstrapPromise = null;
        }
      },

      login: async (login, password) => {
        const session = await authApi.login(login, password);
        get().setSession(session);
      },

      logout: async () => {
        try {
          if (get().token) {
            await authApi.logout();
          }
        } catch {
          // Session is cleared locally even if the API is unreachable.
        }

        get().clearSession();
      },

      refresh: async () => {
        if (!get().token) {
          return;
        }

        try {
          const session = await authApi.refresh();
          get().setSession(session);
        } catch (error) {
          if (isUnauthorized(error)) {
            get().clearSession();
            return;
          }

          scheduleRefresh();
        }
      },
    }),
    {
      name: 'callcenter-session',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        expiresAt: state.expiresAt,
      }),
    },
  ),
);

configureHttp({
  getToken: () => useSessionStore.getState().token,
  onUnauthorized: () => useSessionStore.getState().clearSession(),
});
