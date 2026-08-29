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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();
    const item = await Incident.findByIdAndUpdate(
      id,
      {
        title: String(body.title ?? "").trim(),
        summary: String(body.summary ?? "").trim(),
        featured: Boolean(body.featured),
        steps: Array.isArray(body.steps) ? body.steps : [],
        sortOrder: Number(body.sortOrder ?? 0),
      },
      { new: true }
    );
    if (!item) return errorResponse("Incident not found.", 404);
    return jsonResponse({ item: publicDoc(item) });
  } catch (error) {
    console.error("Update incident", error);
    return errorResponse("Unable to update incident.", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  try {
    const { id } = await params;
    await connectDB();
    const item = await Incident.findByIdAndDelete(id);
    if (!item) return errorResponse("Incident not found.", 404);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Delete incident", error);
    return errorResponse("Unable to delete incident.", 500);
  }
}
