import { apiRequest } from '@/shared/api/http';
import { AuthSession, AuthUser } from '@/entities/auth/model/types';

type LoginResponse = AuthSession & { st: true };
type MeResponse = { st: true; user: AuthUser };
type LogoutResponse = { st: true };

export const authApi = {
  login(login: string, password: string) {
    return apiRequest<LoginResponse>('/auth/token/login', {
      method: 'POST',
      auth: false,
      body: { login, password },
    });
  },

  me() {
    return apiRequest<MeResponse>('/auth/me', { method: 'GET' });
  },

  refresh() {
    return apiRequest<LoginResponse>('/auth/token/refresh', { method: 'POST' });
  },

  logout() {
    return apiRequest<LogoutResponse>('/auth/logout', { method: 'POST' });
  },
};
