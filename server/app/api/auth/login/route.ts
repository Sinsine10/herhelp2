import { connectDB } from "@/lib/mongodb";
import { publicUser, signAuthToken, verifyPassword } from "@/lib/auth";
import { errorResponse, jsonResponse, optionsResponse } from "@/lib/http";
import { User } from "@/models/User";

export const runtime = "nodejs";

export function OPTIONS() {
  return optionsResponse();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").replace(/\s+/g, "").trim();
    const password = String(body.password ?? "");

    if ((!email && !phone) || !password) {
      return errorResponse("Email and password are required.");
    }

    await connectDB();

    const user = email
      ? await User.findOne({ email })
      : await User.findOne({ phone });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return errorResponse("Invalid email or password.", 401);
    }

    const token = signAuthToken({ userId: user._id.toString(), role: user.role });
    return jsonResponse({ token, user: publicUser(user) });
  } catch (error) {
    console.error("Login error", error);
    return errorResponse("Unable to sign in.", 500);
  }
}
