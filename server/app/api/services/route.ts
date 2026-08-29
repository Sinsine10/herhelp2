import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin";
import { publicDoc } from "@/lib/content";
import { errorResponse, jsonResponse, optionsResponse } from "@/lib/http";
import { HelpService } from "@/models/HelpService";

export const runtime = "nodejs";

export function OPTIONS() {
  return optionsResponse();
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  try {
    const body = await request.json();
    await connectDB();
    const item = await HelpService.create({
      name: String(body.name ?? "").trim(),
      category: String(body.category ?? "").trim(),
      description: String(body.description ?? "").trim(),
      area: String(body.area ?? "").trim(),
      hours: String(body.hours ?? "").trim(),
      phone: String(body.phone ?? "").trim(),
      verified: body.verified !== false,
      sortOrder: Number(body.sortOrder ?? 99),
    });
    if (!item.name || !item.phone) {
      await item.deleteOne();
      return errorResponse("Name and phone are required.");
    }
    return jsonResponse({ item: publicDoc(item) }, 201);
  } catch (error) {
    console.error("Create service", error);
    return errorResponse("Unable to create service.", 500);
  }
}
