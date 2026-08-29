import { connectDB } from "@/lib/mongodb";
import { jsonResponse, optionsResponse, errorResponse } from "@/lib/http";
import { loadAllContent } from "@/lib/content";

export const runtime = "nodejs";

export function OPTIONS() {
  return optionsResponse();
}

export async function GET() {
  try {
    await connectDB();
    const content = await loadAllContent();
    return jsonResponse(content);
  } catch (error) {
    console.error("Content load error", error);
    return errorResponse("Unable to load content.", 500);
  }
}
