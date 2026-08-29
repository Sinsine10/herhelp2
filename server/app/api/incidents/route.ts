import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin";
import { publicDoc } from "@/lib/content";
import { errorResponse, jsonResponse, optionsResponse } from "@/lib/http";
import { Incident } from "@/models/Incident";

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
    const item = await Incident.create({
      title: String(body.title ?? "").trim(),
      summary: String(body.summary ?? "").trim(),
      featured: Boolean(body.featured),
      steps: Array.isArray(body.steps) ? body.steps : [],
      sortOrder: Number(body.sortOrder ?? 99),
    });
    if (!item.title || !item.summary) {
      await item.deleteOne();
      return errorResponse("Title and summary are required.");
    }
    return jsonResponse({ item: publicDoc(item) }, 201);
  } catch (error) {
    console.error("Create incident", error);
    return errorResponse("Unable to create incident.", 500);
  }
}
