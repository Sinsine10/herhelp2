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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();
    const item = await Guide.findByIdAndUpdate(
      id,
      {
        category: String(body.category ?? "").trim(),
        title: String(body.title ?? "").trim(),
        summary: String(body.summary ?? "").trim(),
        intro: String(body.intro ?? "").trim(),
        heading: String(body.heading ?? "").trim(),
        bullets: Array.isArray(body.bullets) ? body.bullets.map(String) : [],
        footer: String(body.footer ?? "").trim(),
        sortOrder: Number(body.sortOrder ?? 0),
      },
      { new: true }
    );
    if (!item) return errorResponse("Guide not found.", 404);
    return jsonResponse({ item: publicDoc(item) });
  } catch (error) {
    console.error("Update guide", error);
    return errorResponse("Unable to update guide.", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  try {
    const { id } = await params;
    await connectDB();
    const item = await Guide.findByIdAndDelete(id);
    if (!item) return errorResponse("Guide not found.", 404);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Delete guide", error);
    return errorResponse("Unable to delete guide.", 500);
  }
}
