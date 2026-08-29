import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin";
import { publicDoc } from "@/lib/content";
import { errorResponse, jsonResponse, optionsResponse } from "@/lib/http";
import { Emergency } from "@/models/Emergency";

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
    const item = await Emergency.create({
      name: String(body.name ?? "").trim(),
      description: String(body.description ?? "").trim(),
      number: String(body.number ?? "").trim(),
      sortOrder: Number(body.sortOrder ?? 99),
    });
    if (!item.name || !item.number) {
      await item.deleteOne();
      return errorResponse("Name and number are required.");
    }
    return jsonResponse({ item: publicDoc(item) }, 201);
  } catch (error) {
    console.error("Create emergency", error);
    return errorResponse("Unable to create emergency number.", 500);
  }
}
