export interface TokenPayload {
  exp: string;
  iat: string;
  iss: string;
  session_id: string;
  type: string;
  user_id: string;
}

export interface Token {
  accessToken: string;
  accessPayload: TokenPayload;
  refreshToken: string;
  refreshPayload: TokenPayload;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  customer_code: string;
  registered: string;
  roles: string[];
  capabilities: string[];
  email_verified: boolean;
  phone: string;
  gender: string;
  date_of_birth: string;
}

export interface LoginResponse {
  success: boolean;
  token: Token;
  message: string;
  data: User;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  token: Token;
}
