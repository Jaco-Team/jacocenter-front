import { afterEach, describe, expect, it, vi } from 'vitest';
import { authApi } from '@/entities/auth/api/authApi';
import { useSessionStore } from './sessionStore';

describe('useSessionStore', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    useSessionStore.getState().clearSession();
  });

  it('does not retain an expired session', () => {
    useSessionStore.getState().setSession({
      token: 'expired-token',
      token_type: 'Bearer',
      expires_at: '2020-01-01T00:00:00Z',
      user: { id: 1, login: 'operator', name: 'Operator' },
    });

    expect(useSessionStore.getState()).toMatchObject({
      token: null,
      user: null,
      expiresAt: null,
      status: 'ready',
    });
  });

  it('stores a refreshed session returned by the API', async () => {
    vi.spyOn(authApi, 'refresh').mockResolvedValue({
      token: 'fresh-token',
      token_type: 'Bearer',
      expires_at: '2099-01-01T00:00:00Z',
      user: { id: 2, login: 'operator', name: 'Operator' },
    });
    useSessionStore.setState({ token: 'old-token', expiresAt: '2099-01-01T00:00:00Z' });

    await useSessionStore.getState().refresh();

    expect(useSessionStore.getState()).toMatchObject({
      token: 'fresh-token',
      expiresAt: '2099-01-01T00:00:00Z',
      user: { id: 2, login: 'operator' },
      status: 'ready',
    });
  });

  it('clears local state when logout cannot reach the API', async () => {
    vi.spyOn(authApi, 'logout').mockRejectedValue(new Error('offline'));
    useSessionStore.setState({
      token: 'token',
      expiresAt: '2099-01-01T00:00:00Z',
      user: { id: 1, login: 'operator', name: 'Operator' },
      status: 'ready',
    });

    await useSessionStore.getState().logout();

    expect(useSessionStore.getState()).toMatchObject({ token: null, user: null, expiresAt: null, status: 'ready' });
  });
});
