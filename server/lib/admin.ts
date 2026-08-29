import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getAuthFromRequest } from "@/lib/auth";
import { errorResponse } from "@/lib/http";
import { User } from "@/models/User";

export async function requireAdmin(request: NextRequest) {
  const auth = getAuthFromRequest(request);
  if (!auth) {
    return { error: errorResponse("Please sign in.", 401) };
  }

  await connectDB();
  const user = await User.findById(auth.userId);
  if (!user || user.role !== "admin") {
    return { error: errorResponse("Only admins can change this content.", 403) };
  }

  return { user };
}
