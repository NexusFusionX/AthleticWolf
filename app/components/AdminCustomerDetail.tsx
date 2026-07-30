"use client";

import { useMemo } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { PlanWizard } from "./PlanWizard";
import { getCustomerContact, type PlanCheckoutData } from "@/app/lib/plan-customer";

interface Plan {
  id: string;
  user_id: string;
  package_name: string;
  assessment_completed_at: string | null;
  plan_ready_at: string | null;
  plan_content: string | null;
  assessment_data: string | null;
  checkout_data: string | null;
}

interface AssessmentAnswers {
  [key: string]: string | string[] | undefined;
}

interface CustomerDetailProps {
  plan: Plan;
  authContact?: PlanCheckoutData | null;
  onBack: () => void;
  onSuccess: () => void;
}

export function AdminCustomerDetail({
  plan,
  authContact = null,
  onBack,
  onSuccess,
}: CustomerDetailProps) {
  const contact = useMemo(
    () => getCustomerContact(plan, authContact),
    [plan, authContact]
  );
  const assessmentAnswers = contact.assessment as AssessmentAnswers | null;

  return (
    <div className="min-h-screen bg-paper px-6 py-12 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-accent mb-8 hover:text-accent/80 transition"
        >
          <ArrowLeft size={16} weight="bold" />
          Back to Customers
        </button>

        <div className="mb-8 rounded-2xl border border-line bg-card p-8">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-3">
            Checkout Contact
          </p>
          <p className="mb-5 text-sm text-muted">
            From checkout — available even if assessment is not done yet.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs text-muted uppercase mb-1">Name</p>
              <p className="font-display text-lg">{contact.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase mb-1">Account email</p>
              <p className="font-semibold text-sm break-all">{contact.email}</p>
            </div>
            {contact.checkout?.contactChannel === "phone" && contact.phone !== "—" && (
              <div>
                <p className="text-xs text-muted uppercase mb-1">Phone</p>
                <p className="font-semibold text-sm">{contact.phone}</p>
              </div>
            )}
            {contact.checkout?.contactChannel === "email" && contact.checkout.email && (
              <div>
                <p className="text-xs text-muted uppercase mb-1">Contact email</p>
                <p className="font-semibold text-sm break-all">{contact.checkout.email}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted uppercase mb-1">Preferred contact</p>
              <p className="font-semibold text-sm">{contact.preferredContact}</p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase mb-1">Package</p>
              <p className="font-display text-lg">{plan.package_name}</p>
            </div>
          </div>
          {contact.name === "Unknown" &&
            contact.phone === "—" &&
            !contact.checkout?.email && (
            <p className="mt-5 text-sm text-yellow-200/90">
              No checkout contact saved for this customer yet. They may have
              purchased before checkout contact fields were added.
            </p>
          )}
        </div>

        {plan.assessment_completed_at && assessmentAnswers && (
          <div className="mb-8 rounded-2xl border border-line bg-card p-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-6">
              Assessment Responses
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.entries(assessmentAnswers)
                .filter(([key]) => !["name", "email"].includes(key))
                .map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs text-muted uppercase mb-1.5 tracking-wider font-semibold">
                      {key
                        .replace(/_/g, " ")
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {Array.isArray(value) ? value.join(", ") : String(value)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {!plan.assessment_completed_at && (
          <div className="mb-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-8">
            <p className="text-sm text-yellow-500 font-semibold">
              Assessment not completed yet — use checkout contact above to follow up.
            </p>
          </div>
        )}

        <PlanWizard
          planId={plan.id}
          onSuccess={() => {
            onSuccess();
            onBack();
          }}
        />
      </div>
    </div>
  );
}
