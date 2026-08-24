import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: corsHeaders });
}

export function optionsResponse() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status);
}
