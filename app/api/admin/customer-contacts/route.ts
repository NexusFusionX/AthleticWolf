import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import type { PlanCheckoutData } from "@/app/lib/plan-customer";

export async function POST(request: NextRequest) {
  const admin = createSupabaseAdmin();

  if (!admin) {
    return NextResponse.json(
      {
        error:
          "Add SUPABASE_SERVICE_ROLE_KEY to .env.local (Supabase → Settings → API → service_role).",
        contacts: {},
      },
      { status: 503 }
    );
  }

  let body: { userIds?: string[] };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const userIds = [...new Set(body.userIds ?? [])].filter(Boolean);
  const contacts: Record<string, PlanCheckoutData> = {};

  await Promise.all(
    userIds.map(async (userId) => {
      try {
        const { data, error } = await admin.auth.admin.getUserById(userId);
        if (error || !data.user) return;

        const meta = data.user.user_metadata ?? {};
        const firstName =
          (meta.first_name as string) ||
          (meta.full_name as string)?.split(/\s+/)[0] ||
          "";
        const lastName =
          (meta.last_name as string) ||
          (meta.full_name as string)?.split(/\s+/).slice(1).join(" ") ||
          "";

        contacts[userId] = {
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          contactChannel:
            (meta.contact_channel as "phone" | "email") || undefined,
          phone: (meta.phone as string) || undefined,
          email: (meta.contact_email as string) || undefined,
          accountEmail: data.user.email ?? undefined,
          preferredContact: (meta.preferred_contact as string) || undefined,
        };
      } catch {
        // skip failed user lookups
      }
    })
  );

  return NextResponse.json({ contacts });
}
