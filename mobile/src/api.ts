import { API_URL } from "./config";

export type UserRole = "user" | "admin";

export type AuthUser = {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  role: UserRole;
};

export type ActionStep = { title: string; body: string };

export type Incident = {
  id: string;
  title: string;
  summary: string;
  featured?: boolean;
  steps: ActionStep[];
};

export type HelpService = {
  id: string;
  name: string;
  category: string;
  description: string;
  area: string;
  hours: string;
  phone: string;
  verified: boolean;
};

export type EmergencyNumber = {
  id: string;
  name: string;
  description: string;
  number: string;
};

export type Guide = {
  id: string;
  category: string;
  title: string;
  summary: string;
  intro: string;
  heading?: string;
  bullets: string[];
  footer: string;
};

export type AppContent = {
  incidents: Incident[];
  services: HelpService[];
  emergencies: EmergencyNumber[];
  guides: Guide[];
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

function authHeaders(token: string, extra?: HeadersInit): HeadersInit {
  return { Authorization: `Bearer ${token}`, ...(extra ?? {}) };
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
    headers: authHeaders(token),
  });
}

export function fetchContent() {
  return request<AppContent>("/api/content");
}

export function saveIncident(token: string, payload: Partial<Incident>, id?: string) {
  return request<{ item: Incident }>(id ? `/api/incidents/${id}` : "/api/incidents", {
    method: id ? "PUT" : "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteIncident(token: string, id: string) {
  return request<{ ok: boolean }>(`/api/incidents/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

export function saveService(token: string, payload: Partial<HelpService>, id?: string) {
  return request<{ item: HelpService }>(id ? `/api/services/${id}` : "/api/services", {
    method: id ? "PUT" : "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteService(token: string, id: string) {
  return request<{ ok: boolean }>(`/api/services/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

export function saveEmergency(token: string, payload: Partial<EmergencyNumber>, id?: string) {
  return request<{ item: EmergencyNumber }>(id ? `/api/emergencies/${id}` : "/api/emergencies", {
    method: id ? "PUT" : "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteEmergency(token: string, id: string) {
  return request<{ ok: boolean }>(`/api/emergencies/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

export function saveGuide(token: string, payload: Partial<Guide>, id?: string) {
  return request<{ item: Guide }>(id ? `/api/guides/${id}` : "/api/guides", {
    method: id ? "PUT" : "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteGuide(token: string, id: string) {
  return request<{ ok: boolean }>(`/api/guides/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
