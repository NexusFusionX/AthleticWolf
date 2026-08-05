import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;

  const admin = createSupabaseAdmin();
  if (!admin) {
    return NextResponse.json(
      {
        error:
          "Add SUPABASE_SERVICE_ROLE_KEY to server env (Supabase → Settings → API → service_role).",
      },
      { status: 503 }
    );
  }

  const { data, error: queryError } = await admin
    .from("plans")
    .select("*")
    .order("created_at", { ascending: false });

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  return NextResponse.json({ plans: data ?? [] });
}
