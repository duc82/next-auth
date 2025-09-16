"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AutoLogoutProvider({
  children,
  error,
}: {
  children: React.ReactNode;
  error: string;
}) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === error) {
      signOut({ redirect: true, redirectTo: "/login" });
    }
  }, [session, error]);

  return children;
}
