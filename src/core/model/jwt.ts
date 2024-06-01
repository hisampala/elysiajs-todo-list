export type JWTType = {
  id: string;
  exp: number;
};
export type REFRESH_JWTType = {
  jwt: string;
  user_agent: string;
  exp: number;
};
export type JWTITEMType = {
  token: string;
  refresh_token: string;
};
