import { LoginResponse, RefreshTokenResponse } from "@/types/auth";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};

export const refreshToken = async (
  refresh_token: string
): Promise<RefreshTokenResponse | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token }),
  });

  const data = await res.json();

  if (!res.ok) {
    return null;
  }
  return data;
};
