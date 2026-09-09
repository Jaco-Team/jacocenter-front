import { apiRequest } from '@/shared/api/http';
import { AuthSession, AuthUser } from '@/entities/auth/model/types';

type AuthUserDto = { id: number | string; login?: string; name?: string };
type AuthSessionDto = {
  st: true;
  token: string;
  token_type?: string;
  expires_at: string;
  user: AuthUserDto;
};
type MeResponse = { st: true; user: AuthUserDto };
type LogoutResponse = { st: true };

function mapUser(dto: AuthUserDto): AuthUser {
  return {
    id: Number(dto.id),
    login: String(dto.login ?? ''),
    name: String(dto.name ?? ''),
  };
}

function mapSession(dto: AuthSessionDto): AuthSession {
  return {
    token: dto.token,
    token_type: dto.token_type ?? 'Bearer',
    expires_at: dto.expires_at,
    user: mapUser(dto.user),
  };
}

export const authApi = {
  login(login: string, password: string) {
    return apiRequest<AuthSessionDto>('/auth/token/login', {
      method: 'POST',
      auth: false,
      body: { login, password },
    }).then(mapSession);
  },

  me() {
    return apiRequest<MeResponse>('/auth/me', { method: 'GET' }).then((response) => ({
      user: mapUser(response.user),
    }));
  },

  refresh() {
    return apiRequest<AuthSessionDto>('/auth/token/refresh', { method: 'POST' }).then(mapSession);
  },

  logout() {
    return apiRequest<LogoutResponse>('/auth/logout', { method: 'POST' });
  },
};
