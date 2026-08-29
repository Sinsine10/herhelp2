import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin";
import { publicDoc } from "@/lib/content";
import { errorResponse, jsonResponse, optionsResponse } from "@/lib/http";
import { Guide } from "@/models/Guide";

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
    const item = await Guide.create({
      category: String(body.category ?? "").trim(),
      title: String(body.title ?? "").trim(),
      summary: String(body.summary ?? "").trim(),
      intro: String(body.intro ?? "").trim(),
      heading: String(body.heading ?? "").trim(),
      bullets: Array.isArray(body.bullets) ? body.bullets.map(String) : [],
      footer: String(body.footer ?? "").trim(),
      sortOrder: Number(body.sortOrder ?? 99),
    });
    if (!item.title || !item.intro) {
      await item.deleteOne();
      return errorResponse("Title and intro are required.");
    }
    return jsonResponse({ item: publicDoc(item) }, 201);
  } catch (error) {
    console.error("Create guide", error);
    return errorResponse("Unable to create guide.", 500);
  }
}
