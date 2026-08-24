import { API_URL } from "./config";

export type UserRole = "user" | "admin";

export type AuthUser = {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  role: UserRole;
};

type AuthResponse = {
  token: string;
  user: AuthUser;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data as T;
}

export function registerAccount(payload: {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role?: UserRole;
}) {
  return request<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ ...payload, role: payload.role ?? "user" }),
  });
}

export function loginAccount(payload: { email: string; password: string }) {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getProfile(token: string) {
  return request<{ user: AuthUser }>("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
