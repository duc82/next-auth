import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/schemas/auth";
import { login, refreshToken } from "@/actions/auth";
import { jwtDecode, JwtPayload } from "jwt-decode";

class SignInError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      name: "Credentials",
      async authorize(credentials) {
        try {
          const { data, success, error } = await signInSchema.safeParseAsync(
            credentials
          );

          if (!success) {
            throw new SignInError(error.issues[0].message);
          }

          const loginRes = await login(data.email, data.password);

          return {
            ...loginRes.data,
            id: loginRes.data.id.toString(),
            token: loginRes.token,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new SignInError(error.message);
          }

          throw new SignInError("Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        const decoded = jwtDecode<Required<JwtPayload>>(user.token.accessToken);
        const lifeTime = decoded.exp - decoded.iat;
        token = {
          ...token,
          ...user,
          id: parseInt(user?.id as string),
          accessTokenExpires: Date.now() + lifeTime * 1000,
        };
      }

      // Refresh token
      if (Date.now() >= token.accessTokenExpires) {
        try {
          const refreshResponse = await refreshToken(token.token.refreshToken);

          if (!refreshResponse) {
            token.error = "RefreshTokenError";
            console.log("Refresh token failed, redirecting to login");
            return token;
          }

          token.token = refreshResponse.token;
          const decoded = jwtDecode<Required<JwtPayload>>(
            token.token.accessToken
          );
          const lifeTime = decoded.exp - decoded.iat;
          token.accessTokenExpires = Date.now() + lifeTime * 1000;
        } catch (error) {
          token.error = "RefreshTokenError";
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.token = token.token;
      session.user = {
        ...token,
        ...session.user,
      };
      session.error = token.error;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/",
    signOut: "/logout",
  },
});
