export type AuthContext = {
  userId: string;
  email: string;
  roles: string[];
};

export type AccessTokenPayload = {
  sub: string;
  email: string;
  roles: string[];
  iat?: number;
  exp?: number;
};
