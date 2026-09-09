export type AuthUser = {
  id: number;
  login: string;
  name: string;
};

export type AuthSession = {
  token: string;
  token_type: string;
  expires_at: string;
  user: AuthUser;
};
