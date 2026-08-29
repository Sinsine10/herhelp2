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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();
    const item = await HelpService.findByIdAndUpdate(
      id,
      {
        name: String(body.name ?? "").trim(),
        category: String(body.category ?? "").trim(),
        description: String(body.description ?? "").trim(),
        area: String(body.area ?? "").trim(),
        hours: String(body.hours ?? "").trim(),
        phone: String(body.phone ?? "").trim(),
        verified: body.verified !== false,
        sortOrder: Number(body.sortOrder ?? 0),
      },
      { new: true }
    );
    if (!item) return errorResponse("Service not found.", 404);
    return jsonResponse({ item: publicDoc(item) });
  } catch (error) {
    console.error("Update service", error);
    return errorResponse("Unable to update service.", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  try {
    const { id } = await params;
    await connectDB();
    const item = await HelpService.findByIdAndDelete(id);
    if (!item) return errorResponse("Service not found.", 404);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Delete service", error);
    return errorResponse("Unable to delete service.", 500);
  }
}
