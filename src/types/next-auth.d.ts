import "next-auth/jwt";
import type { Token, User as IUser } from "./auth";
import { JWT } from "next-auth/jwt";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends IUser {
    token: Token;
  }

  interface Session {
    token: Token;
    user: IUser & DefaultSession["user"];
    accessTokenExpires: number;
    error?: "RefreshTokenError";
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends IUser {
    token: Token;
    user: IUser;
    accessTokenExpires: number;
    error?: "RefreshTokenError";
  }
}
