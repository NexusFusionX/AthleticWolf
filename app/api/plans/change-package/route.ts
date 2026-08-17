import { NextRequest, NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/supabase-server";
import { findPackageByName, getPackageChangeType } from "@/app/lib/package-change";

export async function POST(request: NextRequest) {
  const { supabase, user } = await getAuthedUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    packageName?: string;
    checkoutContact?: {
      firstName?: string;
      lastName?: string;
      gender?: string;
      countryCode?: string;
      contactChannel?: "phone" | "email";
      phone?: string;
      email?: string;
      preferredContact?: string;
    };
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { packageName, checkoutContact } = body;

  if (!packageName) {
    return NextResponse.json({ error: "Missing packageName" }, { status: 400 });
  }

  const nextPackage = findPackageByName(packageName);

  if (!nextPackage) {
    return NextResponse.json({ error: "Unknown package" }, { status: 400 });
  }

  const { data: existingPlan, error: planError } = await supabase
    .from("plans")
    .select("id, package_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (planError) throw planError;

  if (!existingPlan) {
    return NextResponse.json({ error: "No active package found" }, { status: 404 });
  }

  const changeType = getPackageChangeType(
    existingPlan.package_name,
    nextPackage.name
  );

  if (!changeType) {
    return NextResponse.json({ error: "Invalid package change" }, { status: 400 });
  }

  if (changeType === "upgrade") {
    return NextResponse.json(
      { error: "Upgrades require payment. Complete checkout payment first." },
      { status: 402 }
    );
  }

  const checkoutPayload = checkoutContact?.firstName
    ? {
        firstName: checkoutContact.firstName.trim(),
        lastName: checkoutContact.lastName?.trim() ?? "",
        gender: checkoutContact.gender?.trim() ?? "",
        countryCode: checkoutContact.countryCode?.trim() ?? "",
        contactChannel: checkoutContact.contactChannel,
        phone:
          checkoutContact.contactChannel === "phone"
            ? checkoutContact.phone?.trim() ?? ""
            : "",
        email:
          checkoutContact.contactChannel === "email"
            ? checkoutContact.email?.trim() ?? ""
            : user.email ?? "",
        preferredContact: checkoutContact.preferredContact,
        accountEmail: user.email ?? "",
      }
    : null;

  const { error: updateError } = await supabase
    .from("plans")
    .update({
      package_name: nextPackage.name,
      status: "active",
      ...(checkoutPayload
        ? { checkout_data: JSON.stringify(checkoutPayload) }
        : {}),
    })
    .eq("id", existingPlan.id);

  if (updateError) throw updateError;

  if (checkoutContact?.firstName) {
    const fullName = [
      checkoutContact.firstName.trim(),
      checkoutContact.lastName?.trim(),
    ]
      .filter(Boolean)
      .join(" ");

    await supabase.auth.updateUser({
      data: {
        first_name: checkoutContact.firstName.trim(),
        last_name: checkoutContact.lastName?.trim() || null,
        full_name: fullName || checkoutContact.firstName.trim(),
        phone:
          checkoutContact.contactChannel === "phone"
            ? checkoutContact.phone?.trim() ?? null
            : null,
        contact_email:
          checkoutContact.contactChannel === "email"
            ? checkoutContact.email?.trim() ?? null
            : null,
        contact_channel: checkoutContact.contactChannel,
        preferred_contact: checkoutContact.preferredContact ?? null,
        country: checkoutContact.countryCode?.trim() || null,
        gender: checkoutContact.gender?.trim() || null,
      },
    });
  }

  return NextResponse.json({
    success: true,
    changeType,
    packageName: nextPackage.name,
  });
}
