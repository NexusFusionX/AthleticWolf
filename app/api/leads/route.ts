import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import {
  EMPTY_LEAD_FORM,
  isLeadFormComplete,
  type LeadFormData,
} from "@/app/lib/lead-form-steps";

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseLeadBody(body: unknown): LeadFormData | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const data: LeadFormData = {
    firstName: asString(raw.firstName),
    lastName: asString(raw.lastName),
    mobile: asString(raw.mobile),
    email: asString(raw.email),
    fitnessStatus: asString(raw.fitnessStatus),
    hardestPart: asString(raw.hardestPart),
    work: asString(raw.work),
    incomeRange: asString(raw.incomeRange),
    openToInvest: asString(raw.openToInvest),
    instagram: asString(raw.instagram),
  };
  return isLeadFormComplete(data) ? data : null;
}

function insertClient() {
  const admin = createSupabaseAdmin();
  if (admin) return admin;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const data = parseLeadBody(body);
  if (!data) {
    return NextResponse.json(
      { error: "Please complete all form fields." },
      { status: 400 }
    );
  }

  const client = insertClient();
  if (!client) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 }
    );
  }

  const { data: row, error } = await client
    .from("leads")
    .insert({
      first_name: data.firstName,
      last_name: data.lastName,
      mobile: data.mobile,
      email: data.email,
      fitness_status: data.fitnessStatus,
      hardest_part: data.hardestPart,
      work: data.work,
      income_range: data.incomeRange,
      open_to_invest: data.openToInvest,
      instagram: data.instagram,
      raw_json: data,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Lead insert failed:", error);
    return NextResponse.json(
      {
        error:
          error.message.includes("relation") || error.code === "42P01"
            ? "Leads table is missing. Run supabase/create-leads-table.sql in Supabase."
            : "Could not save your application. Please try again.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, id: row.id });
}

export type { LeadFormData };
export { EMPTY_LEAD_FORM };
