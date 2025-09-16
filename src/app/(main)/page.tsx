import React from "react";
import { auth } from "../api/auth/[...nextauth]/auth";
import TokenClient from "@/components/home/TokenClient";

export default async function Home() {
  const session = await auth();

  const user = session?.user;
  const token = session?.token;

  return (
    <div className="min-h-screen">
      <div className="px-4 py-4 lg:py-10 lg:px-20 break-words">
        {user && (
          <div>
            <h1 className="text-4xl mb-5 font-bold">Information Profile</h1>
            <ul className="grid grid-cols-2 w-fit gap-x-8 gap-y-4">
              <li>
                <strong>ID:</strong> {user.id}
              </li>
              <li>
                <strong>Username:</strong> {user.username}
              </li>
              <li>
                <strong>Email:</strong> {user.email}
              </li>
              <li>
                <strong>First Name:</strong> {user.first_name}
              </li>
              <li>
                <strong>Last Name:</strong> {user.last_name || "N/A"}
              </li>
              <li>
                <strong>Display Name:</strong> {user.display_name}
              </li>
              <li>
                <strong>Customer Code:</strong> {user.customer_code}
              </li>
              <li>
                <strong>Registered:</strong> {user.registered}
              </li>
              <li>
                <strong>Roles:</strong> {user.roles.join(", ")}
              </li>
              <li>
                <strong>Capabilities:</strong> {user.capabilities.join(", ")}
              </li>
              <li>
                <strong>Email Verified:</strong>{" "}
                {user.email_verified ? "Yes" : "No"}
              </li>
              <li>
                <strong>Phone:</strong> {user.phone}
              </li>
              <li>
                <strong>Gender:</strong> {user.gender}
              </li>
              <li>
                <strong>Date of Birth:</strong> {user.date_of_birth}
              </li>
            </ul>
          </div>
        )}

        {token && (
          <div className="mt-6">
            <h2 className="text-4xl mb-3 font-bold">Token In Server</h2>
            <ul className="space-y-4">
              <li>
                <strong>Access Token:</strong> {token.accessToken}
              </li>
              <li>
                <strong>Refresh Token:</strong> {token.refreshToken}
              </li>
            </ul>
          </div>
        )}

        <TokenClient />
      </div>
    </div>
  );
}
