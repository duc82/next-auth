"use client";

import { useSession } from "next-auth/react";

export default function TokenClient() {
  const { data: session } = useSession();

  const token = session?.token;

  if (!token) return null;

  return (
    <div className="mt-6">
      <h2 className="text-4xl mb-3 font-bold">Token In Client</h2>
      <ul className="space-y-4">
        <li>
          <strong>Access Token:</strong> {token.accessToken}
        </li>
        <li>
          <strong>Refresh Token:</strong> {token.refreshToken}
        </li>
      </ul>
    </div>
  );
}
