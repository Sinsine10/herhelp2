import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { UserRole } from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export type AuthTokenPayload = {
  userId: string;
  role: UserRole;
};

export function requireJwtSecret() {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }
  return JWT_SECRET;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function signAuthToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, requireJwtSecret(), { expiresIn: "7d" });
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, requireJwtSecret()) as AuthTokenPayload;
}

export function getBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return null;
  }
  return header.slice("Bearer ".length);
}

export function getAuthFromRequest(request: NextRequest) {
  const token = getBearerToken(request);
  if (!token) {
    return null;
  }

  try {
    return verifyAuthToken(token);
  } catch {
    return null;
  }
}

export function publicUser(user: {
  _id: { toString(): string };
  fullName: string;
  phone: string;
  email?: string;
  role: UserRole;
  createdAt?: Date;
}) {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    phone: user.phone,
    email: user.email ?? null,
    role: user.role,
  };
}
