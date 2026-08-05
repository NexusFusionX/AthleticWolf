import { NextResponse } from "next/server";
import { getAdminSession, isAdminAuthConfigured } from "@/lib/admin-auth";

export async function GET() {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        authenticated: false,
        error:
          "Admin auth is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.",
      },
      { status: 503 }
    );
  }

  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    username: session.username,
  });
}
