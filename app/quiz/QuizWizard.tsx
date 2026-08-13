"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { clearPendingAssessment, checkoutHref } from "@/app/lib/assessment";
import {
  ASSESSMENT_STEPS,
  type AssessmentFormValue,
} from "@/app/lib/assessment-steps";
import { AssessmentFields } from "@/app/components/assessment/AssessmentFields";
import { AssessmentReview } from "@/app/components/assessment/AssessmentReview";
import { AssessmentShell } from "@/app/components/assessment/AssessmentShell";

type SavedProgress = {
  step: number;
  formData: Record<string, AssessmentFormValue>;
  packageName: string | null;
};

const STORAGE_KEY = "athletic-wolf-quiz-progress";

function loadSavedProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as SavedProgress;
  } catch {
    return null;
  }
}

export function QuizWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package");
  const startFresh = searchParams.get("start") === "1";

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<Record<string, AssessmentFormValue>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumePrompt, setResumePrompt] = useState<SavedProgress | null | undefined>(
    undefined
  );
  const [hydrated, setHydrated] = useState(false);

  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [existingPlan, setExistingPlan] = useState<any>(null);
  const [accessAllowed, setAccessAllowed] = useState(false);

  useEffect(() => {
    if (startFresh) {
      clearPendingAssessment();
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [startFresh]);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      setUser(authUser);

      if (!authUser) {
        setAuthLoading(false);
        return;
      }

      const { data: plan, error: planError } = await supabase
        .from("plans")
        .select("*")
        .eq("user_id", authUser.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (planError) {
        console.error("quiz plan lookup failed", planError);
      }

      setExistingPlan(plan ?? null);

      if (startFresh) {
        router.replace("/packages");
        return;
      }

      if (!plan) {
        // Paid users sometimes hit this before the plan row is readable —
        // show a recoverable state instead of silently bouncing to packages.
        setAccessAllowed(false);
        setAuthLoading(false);
        return;
      }

      if (plan.assessment_completed_at) {
        router.replace("/dashboard");
        return;
      }

      if (selectedPackage && plan.package_name !== selectedPackage) {
        router.replace(checkoutHref(selectedPackage));
        return;
      }

      setAccessAllowed(true);
      setAuthLoading(false);
    }
    void checkAuth();
  }, [selectedPackage, router, startFresh]);

  useEffect(() => {
    const saved = loadSavedProgress();
    const hasProgress =
      saved &&
      (saved.step > 0 ||
        Object.values(saved.formData ?? {}).some((v) =>
          Array.isArray(v) ? v.length > 0 : Boolean(v)
        ));

    if (hasProgress) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only localStorage read on mount, before any UI renders
      setResumePrompt(saved);
    } else {
      setResumePrompt(null);
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated || submitted) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ step: current, formData, packageName: selectedPackage })
    );
  }, [current, formData, hydrated, submitted, selectedPackage]);

  function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    setCurrent(0);
    setFormData({});
    setErrors({});
  }

  function handleContinueResume() {
    if (resumePrompt) {
      const maxStep = ASSESSMENT_STEPS.length - 1;
      setCurrent(Math.min(Math.max(resumePrompt.step, 0), maxStep));
      setFormData(resumePrompt.formData);
    }
    setResumePrompt(null);
    setHydrated(true);
  }

  function handleStartOver() {
    resetProgress();
    setResumePrompt(null);
    setHydrated(true);
  }

  function setValue(name: string, value: AssessmentFormValue) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  }

  function toggleCheckbox(name: string, value: string) {
    setFormData((prev) => {
      const existing = (prev[name] as string[] | undefined) ?? [];
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      return { ...prev, [name]: next };
    });
    setErrors((prev) => ({ ...prev, [name]: false }));
  }

  function validateStep(idx: number) {
    const step = ASSESSMENT_STEPS[idx];
    if (step.kind === "review" || step.fields.length === 0) {
      setErrors({});
      return true;
    }

    const newErrors: Record<string, boolean> = {};
    let ok = true;

    for (const field of step.fields) {
      if (!field.required) continue;
      const value = formData[field.name];
      let valid = false;

      if (field.type === "checkbox") {
        valid = Array.isArray(value) && value.length > 0;
      } else if (field.type === "email") {
        valid =
          typeof value === "string" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      } else if (field.type === "number") {
        const n = parseFloat((value as string) ?? "");
        valid =
          !isNaN(n) &&
          (field.min === undefined || n >= field.min) &&
          (field.max === undefined || n <= field.max);
      } else {
        valid = typeof value === "string" && value.trim() !== "";
      }

      if (!valid) {
        newErrors[field.name] = true;
        ok = false;
      }
    }

    setErrors(newErrors);
    return ok;
  }

  async function handleNext() {
    if (!validateStep(current)) return;

    if (current < ASSESSMENT_STEPS.length - 1) {
      setCurrent((c) => c + 1);
      return;
    }

    setSubmitted(true);
    setSubmitError(null);

    try {
      if (user && existingPlan) {
        const { error } = await supabase
          .from("plans")
          .update({
            assessment_completed_at: new Date().toISOString(),
            assessment_data: JSON.stringify(formData),
            status: "active",
          })
          .eq("id", existingPlan.id);

        if (error) throw error;

        localStorage.removeItem(STORAGE_KEY);
        router.push("/dashboard");
      } else {
        router.push("/packages");
      }
    } catch {
      setSubmitError("Failed to save assessment. Please try again.");
      setSubmitted(false);
    }
  }

  function handleBack() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  if (authLoading || resumePrompt === undefined) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="text-center">
          <p className="font-display text-2xl text-white">Loading assessment…</p>
          <p className="mt-2 text-sm text-muted">One moment while we check your account.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    const redirectTarget = `/quiz${selectedPackage ? `?package=${encodeURIComponent(selectedPackage)}` : ""}`;
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="w-full shadow-premium rounded-2xl border border-line bg-card p-10 text-center">
          <h1 className="font-display text-3xl">Sign In Required</h1>
          <p className="mt-3 text-muted">
            Sign in to complete your post-purchase intake assessment.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/auth/signup?redirect=${encodeURIComponent(redirectTarget)}`}
              className="btn btn-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
            >
              Create Account
            </Link>
            <Link
              href={`/auth/login?redirect=${encodeURIComponent(redirectTarget)}`}
              className="btn btn-outline px-6 py-3 text-sm font-bold uppercase tracking-wide"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!accessAllowed && !existingPlan) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="w-full shadow-premium rounded-2xl border border-line bg-card p-10 text-center">
          <h1 className="font-display text-3xl">Finishing setup…</h1>
          <p className="mt-3 text-muted">
            We couldn&apos;t load your coaching plan yet. If you just paid, wait a
            moment and try again.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
            >
              Try again
            </button>
            <Link
              href="/dashboard"
              className="btn btn-outline px-6 py-3 text-sm font-bold uppercase tracking-wide"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!accessAllowed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="text-center">
          <p className="font-display text-2xl text-white">Opening assessment…</p>
        </div>
      </div>
    );
  }

  // Existing plan under a different package: redirecting to checkout
  if (existingPlan && selectedPackage && existingPlan.package_name !== selectedPackage) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="text-center">
          <p className="font-display text-2xl text-white">Taking you to checkout…</p>
          <p className="mt-2 text-sm text-muted">Preparing your package change.</p>
        </div>
      </div>
    );
  }

  if (resumePrompt) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="w-full overflow-hidden shadow-premium rounded-2xl border border-line bg-card">
          <div className="bg-ink px-8 py-7 text-white">
            <Link href="/" className="font-display text-lg">
              Athletic<span className="text-accent">Wolf</span>
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Welcome Back
            </p>
            <h1 className="font-display mt-1.5 text-3xl sm:text-4xl">
              Resume Your Assessment?
            </h1>
          </div>
          <div className="p-8 text-center">
            <p className="text-muted">
              You have an assessment in progress: Step {resumePrompt.step + 1}{" "}
              of {ASSESSMENT_STEPS.length}
              {resumePrompt.packageName
                ? ` for the ${resumePrompt.packageName} Plan`
                : ""}
              . Continue where you left off, or start over.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleContinueResume}
                className="btn btn-accent font-display px-7 py-3 text-base text-white"
              >
                Continue Where I Left Off →
              </button>
              <button
                type="button"
                onClick={handleStartOver}
                className="btn border border-line px-7 py-3 text-sm font-semibold hover:border-accent/60"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
      <div className="w-full shadow-premium">
        <AssessmentShell
          currentStep={current}
          packageName={selectedPackage || existingPlan?.package_name}
          brandHref="/"
          showProgress={!submitted}
          onStartOver={resetProgress}
          footer={
            !submitted ? (
              <div className="flex items-center justify-between border-t border-line px-8 py-5">
                {current > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn border border-line px-6 py-3 text-sm font-semibold hover:border-accent/60"
                  >
                    ← Back
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-accent font-display px-7 py-3 text-base text-white"
                >
                  {current === ASSESSMENT_STEPS.length - 1
                    ? "Submit assessment →"
                    : "Next Step →"}
                </button>
              </div>
            ) : undefined
          }
        >
          {submitError && (
            <div className="mb-6 rounded-xl border border-error/30 bg-error/10 p-4">
              <p className="text-sm text-error">{submitError}</p>
            </div>
          )}
          {submitted ? (
            <div className="py-4 text-center">
              <h2 className="font-display text-3xl">Assessment Complete ✅</h2>
              <p className="mt-3 text-muted">Taking you to your dashboard...</p>
              <Link
                href="/"
                className="btn btn-dark mt-6 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
              >
                Back to Home
              </Link>
            </div>
          ) : ASSESSMENT_STEPS[current].kind === "review" ? (
            <AssessmentReview
              formData={formData}
              onEditStep={(stepIndex) => setCurrent(stepIndex)}
            />
          ) : (
            <AssessmentFields
              fields={ASSESSMENT_STEPS[current].fields}
              formData={formData}
              errors={errors}
              onSetValue={setValue}
              onToggleCheckbox={toggleCheckbox}
            />
          )}
        </AssessmentShell>
      </div>
    </div>
  );
}
