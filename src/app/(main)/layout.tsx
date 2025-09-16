import Header from "@/components/header/Header";
import React from "react";
import { auth } from "../api/auth/[...nextauth]/auth";
import AutoLogoutProvider from "@/components/providers/AutoLogoutProvider";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const user = session?.user;

  return (
    <AutoLogoutProvider error="RefreshTokenError">
      <Header user={user} />
      {children}
    </AutoLogoutProvider>
  );
}
