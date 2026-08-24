import { jsonResponse, optionsResponse } from "@/lib/http";

export const runtime = "nodejs";

export function OPTIONS() {
  return optionsResponse();
}

export function GET() {
  return jsonResponse({ ok: true, service: "herhelp-api" });
}
