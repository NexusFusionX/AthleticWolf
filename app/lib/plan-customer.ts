export type PlanCheckoutData = {
  firstName?: string;
  lastName?: string;
  gender?: string;
  contactChannel?: "phone" | "email";
  phone?: string;
  email?: string;
  accountEmail?: string;
  preferredContact?: string;
  countryCode?: string;
};

type PlanLike = {
  assessment_data?: string | null;
  checkout_data?: string | null;
};

export function parseCheckoutData(raw: string | null | undefined): PlanCheckoutData | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PlanCheckoutData;
  } catch {
    return null;
  }
}

export function parseAssessmentData(raw: string | null | undefined): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function getCustomerContact(
  plan: PlanLike,
  authFallback?: PlanCheckoutData | null
) {
  const checkout = parseCheckoutData(plan.checkout_data) ?? authFallback ?? null;
  const assessment = parseAssessmentData(plan.assessment_data);

  const checkoutName =
    checkout?.firstName || checkout?.lastName
      ? `${checkout.firstName ?? ""} ${checkout.lastName ?? ""}`.trim()
      : null;

  const assessmentName =
    typeof assessment?.name === "string" ? assessment.name.trim() : null;

  const name = checkoutName || assessmentName || "Unknown";
  const email =
    checkout?.accountEmail ||
    (typeof assessment?.email === "string" && assessment.email) ||
    "—";
  const phone =
    checkout?.contactChannel === "phone" ? checkout?.phone?.trim() || "—" : "—";
  const preferredContact =
    checkout?.preferredContact ||
    (checkout?.contactChannel === "email" ? "Email" : "—");

  return {
    name,
    email,
    phone,
    preferredContact,
    checkout,
    assessment,
  };
}
