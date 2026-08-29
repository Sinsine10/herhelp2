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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();
    const item = await Emergency.findByIdAndUpdate(
      id,
      {
        name: String(body.name ?? "").trim(),
        description: String(body.description ?? "").trim(),
        number: String(body.number ?? "").trim(),
        sortOrder: Number(body.sortOrder ?? 0),
      },
      { new: true }
    );
    if (!item) return errorResponse("Emergency number not found.", 404);
    return jsonResponse({ item: publicDoc(item) });
  } catch (error) {
    console.error("Update emergency", error);
    return errorResponse("Unable to update emergency number.", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  try {
    const { id } = await params;
    await connectDB();
    const item = await Emergency.findByIdAndDelete(id);
    if (!item) return errorResponse("Emergency number not found.", 404);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Delete emergency", error);
    return errorResponse("Unable to delete emergency number.", 500);
  }
}
