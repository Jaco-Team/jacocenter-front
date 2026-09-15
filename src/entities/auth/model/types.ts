export type AuthUser = {
  id: number;
  login: string;
  name: string;
  fullName: string;
  shortName: string;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  registeredAt?: string | null;
  birthday?: string | null;
};

export type AuthSession = {
  token: string;
  token_type: string;
  expires_at: string;
  user: AuthUser;
};
