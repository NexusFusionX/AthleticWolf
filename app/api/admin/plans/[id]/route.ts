import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await context.params;
  const admin = createSupabaseAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY is not configured." },
      { status: 503 }
    );
  }

  const { data, error: queryError } = await admin
    .from("plans")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  return NextResponse.json({ plan: data });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await context.params;
  const admin = createSupabaseAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY is not configured." },
      { status: 503 }
    );
  }

  let body: {
    plan_content?: string | null;
    plan_ready_at?: string | null;
    status?: string | null;
    package_name?: string | null;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const updates: Record<string, string | null> = {};
  if ("plan_content" in body) updates.plan_content = body.plan_content ?? null;
  if ("plan_ready_at" in body) updates.plan_ready_at = body.plan_ready_at ?? null;
  if ("status" in body) updates.status = body.status ?? null;
  if ("package_name" in body) updates.package_name = body.package_name ?? null;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const { data, error: updateError } = await admin
    .from("plans")
    .update(updates)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  return NextResponse.json({ plan: data });
}
