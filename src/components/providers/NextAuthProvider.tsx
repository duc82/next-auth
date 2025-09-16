"use client";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({ children }: PropsWithChildren) {
  return (
    <SessionProvider refetchInterval={10} refetchOnWindowFocus={true}>
      {children}
    </SessionProvider>
  );
}
