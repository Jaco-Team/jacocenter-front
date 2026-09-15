import { apiRequest } from '@/shared/api/http';
import { AuthSession, AuthUser } from '@/entities/auth/model/types';

type AuthUserDto = {
  id: number | string;
  login?: string;
  name?: string;
  full_name?: string;
  short_name?: string;
  first_name?: string | null;
  last_name?: string | null;
  middle_name?: string | null;
  registered_at?: string | null;
  birthday?: string | null;
};
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
  const fullName = String(dto.full_name ?? dto.name ?? '');
  const shortName = String(dto.short_name ?? '');

  return {
    id: Number(dto.id),
    login: String(dto.login ?? ''),
    name: String(dto.name ?? (shortName || fullName)),
    fullName,
    shortName,
    firstName: dto.first_name ? String(dto.first_name) : null,
    lastName: dto.last_name ? String(dto.last_name) : null,
    middleName: dto.middle_name ? String(dto.middle_name) : null,
    registeredAt: dto.registered_at ? String(dto.registered_at) : null,
    birthday: dto.birthday ? String(dto.birthday) : null,
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

  updateProfile(input: { fullName: string; shortName: string }) {
    return apiRequest<MeResponse>('/auth/me', {
      method: 'PATCH',
      body: {
        full_name: input.fullName,
        short_name: input.shortName || null,
      },
    }).then((response) => ({ user: mapUser(response.user) }));
  },

  refresh() {
    return apiRequest<AuthSessionDto>('/auth/token/refresh', { method: 'POST', retryOnUnauthorized: false }).then(mapSession);
  },

  logout() {
    return apiRequest<LogoutResponse>('/auth/logout', { method: 'POST' });
  },
};
