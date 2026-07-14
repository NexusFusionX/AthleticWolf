"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import { PlanWizard } from "./PlanWizard";

interface Plan {
  id: string;
  user_id: string;
  package_name: string;
  assessment_completed_at: string | null;
  plan_ready_at: string | null;
  plan_content: string | null;
  assessment_data: string | null;
}

interface AssessmentAnswers {
  goal?: string;
  experience?: string;
  frequency?: string;
  equipment?: string;
  injuries?: string;
  diet?: string;
  sleep?: string;
  stress?: string;
  [key: string]: string | undefined;
}

interface CustomerDetailProps {
  plan: Plan;
  onBack: () => void;
  onSuccess: () => void;
}

export function AdminCustomerDetail({ plan, onBack, onSuccess }: CustomerDetailProps) {
  const [customerEmail, setCustomerEmail] = useState("Loading...");
  const [customerName, setCustomerName] = useState("Loading...");
  const [assessmentAnswers, setAssessmentAnswers] = useState<AssessmentAnswers | null>(null);
  const [loadingCustomer, setLoadingCustomer] = useState(true);

  useEffect(() => {
    async function loadCustomerData() {
      try {
        // Parse assessment data to get customer name and email
        let email = "Unknown";
        let name = "Unknown";

        if (plan.assessment_data) {
          try {
            const answers = JSON.parse(plan.assessment_data);
            setAssessmentAnswers(answers);

            // Extract name and email from assessment data
            if (answers.name) name = answers.name;
            if (answers.email) email = answers.email;
          } catch (err) {
            console.error("Failed to parse assessment data:", err);
          }
        }

        setCustomerName(name);
        setCustomerEmail(email);
      } catch (err) {
        console.error("Error loading customer:", err);
      } finally {
        setLoadingCustomer(false);
      }
    }

    loadCustomerData();
  }, [plan]);

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

        {/* Customer Info Card */}
        <div className="mb-8 rounded-2xl border border-line bg-card p-8">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-3">
            Customer Information
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-muted uppercase mb-1">Name</p>
              <p className="font-display text-lg">{customerName}</p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase mb-1">Email</p>
              <p className="font-semibold text-sm break-all">{customerEmail}</p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase mb-1">Package</p>
              <p className="font-display text-lg">{plan.package_name}</p>
            </div>
          </div>
        </div>

        {/* Assessment Section */}
        {plan.assessment_completed_at && assessmentAnswers && (
          <div className="mb-8 rounded-2xl border border-line bg-card p-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-6">
              ✓ Assessment Responses
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.entries(assessmentAnswers)
                .filter(([key]) => !["name", "email"].includes(key)) // Skip name/email as they're in header
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
              ⚠ Assessment not yet completed by customer
            </p>
          </div>
        )}

        {/* Plan Creation Section */}
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
