import { connectDB } from "@/lib/mongodb";
import { hashPassword, publicUser, signAuthToken } from "@/lib/auth";
import { errorResponse, jsonResponse, optionsResponse } from "@/lib/http";
import { User, USER_ROLES, type UserRole } from "@/models/User";

export const runtime = "nodejs";

export function OPTIONS() {
  return optionsResponse();
}

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "").trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = String(body.fullName ?? "").trim();
    const phone = normalizePhone(String(body.phone ?? ""));
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const role = (body.role ?? "user") as UserRole;
    const adminCode = String(body.adminCode ?? "");

    if (!fullName || !phone || !email || !password) {
      return errorResponse("Full name, phone, email, and password are required.");
    }

    if (!email.includes("@")) {
      return errorResponse("Enter a valid email address.");
    }

    if (password.length < 8) {
      return errorResponse("Password must be at least 8 characters.");
    }

    if (!USER_ROLES.includes(role)) {
      return errorResponse("Invalid account type.");
    }

    await connectDB();

    if (role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      const expectedCode = process.env.ADMIN_SIGNUP_CODE;

      if (adminCount > 0) {
        if (!expectedCode || adminCode !== expectedCode) {
          return errorResponse("A valid admin signup code is required.", 403);
        }
      }
    }

    const existing = await User.findOne({ $or: [{ phone }, { email }] });
    if (existing) {
      return errorResponse("An account with this phone or email already exists.", 409);
    }

    const user = await User.create({
      fullName,
      phone,
      email: email || undefined,
      passwordHash: await hashPassword(password),
      role,
    });

    const token = signAuthToken({ userId: user._id.toString(), role: user.role });

    return jsonResponse({ token, user: publicUser(user) }, 201);
  } catch (error) {
    console.error("Register error", error);
    return errorResponse("Unable to create account.", 500);
  }
}
