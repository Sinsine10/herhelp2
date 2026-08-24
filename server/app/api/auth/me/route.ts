import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getAuthFromRequest, publicUser } from "@/lib/auth";
import { errorResponse, jsonResponse, optionsResponse } from "@/lib/http";
import { User } from "@/models/User";

export const runtime = "nodejs";

export function OPTIONS() {
  return optionsResponse();
}

export async function GET(request: NextRequest) {
  try {
    const auth = getAuthFromRequest(request);
    if (!auth) {
      return errorResponse("Unauthorized.", 401);
    }

    await connectDB();
    const user = await User.findById(auth.userId);
    if (!user) {
      return errorResponse("Account not found.", 404);
    }

    return jsonResponse({ user: publicUser(user) });
  } catch (error) {
    console.error("Me error", error);
    return errorResponse("Unable to load profile.", 500);
  }
}
