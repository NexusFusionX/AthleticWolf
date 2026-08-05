import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionCookieOptions,
  createAdminSessionToken,
  isAdminAuthConfigured,
  validateAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin auth is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET on the server.",
      },
      { status: 503 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const username = body.username?.trim() ?? "";
  const password = body.password ?? "";

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createAdminSessionToken(username);
  const response = NextResponse.json({
    ok: true,
    username,
  });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    token,
    adminSessionCookieOptions()
  );
  return response;
}
