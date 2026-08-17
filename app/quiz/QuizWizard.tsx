"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { clearPendingAssessment, checkoutHref } from "@/app/lib/assessment";
import {
  ASSESSMENT_STEPS,
  getVisibleSteps,
  isStepComplete,
  isStepVisible,
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

function nextVisibleIndex(
  from: number,
  formData: Record<string, AssessmentFormValue>,
  direction: 1 | -1
) {
  let i = from + direction;
  while (i >= 0 && i < ASSESSMENT_STEPS.length) {
    if (isStepVisible(ASSESSMENT_STEPS[i], formData)) return i;
    i += direction;
  }
  return from;
}

export function QuizWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package");
  const startFresh = searchParams.get("start") === "1";
  const isDesignPreview =
    process.env.NODE_ENV === "development" &&
    searchParams.get("preview") === "1";

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<Record<string, AssessmentFormValue>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumePrompt, setResumePrompt] = useState<
    SavedProgress | null | undefined
  >(undefined);
  const [hydrated, setHydrated] = useState(false);

  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [existingPlan, setExistingPlan] = useState<any>(null);
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [furthestStep, setFurthestStep] = useState(0);

  const visibleSteps = useMemo(
    () => getVisibleSteps(formData),
    [formData]
  );
  const currentStep = ASSESSMENT_STEPS[current] ?? ASSESSMENT_STEPS[0];

  // Keep current on a visible step when answers change conditionals.
  useEffect(() => {
    if (!isStepVisible(currentStep, formData)) {
      setCurrent((c) => nextVisibleIndex(c, formData, -1));
    }
  }, [currentStep, formData]);

  const contentSteps = visibleSteps;
  const displayTotal = Math.max(contentSteps.length, 1);
  const displayStep = Math.max(
    contentSteps.findIndex((s) => s.id === currentStep.id) + 1,
    1
  );

  const segments = useMemo(
    () =>
      contentSteps.map((step) => ({
        id: step.id,
        label: step.label,
        absoluteIndex: ASSESSMENT_STEPS.findIndex((s) => s.id === step.id),
      })),
    [contentSteps]
  );

  const editTargets = useMemo(() => {
    const map: Record<string, number> = {};
    ASSESSMENT_STEPS.forEach((step, i) => {
      map[step.id] = i;
    });
    return map;
  }, []);

  useEffect(() => {
    if (startFresh) {
      clearPendingAssessment();
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [startFresh]);

  useEffect(() => {
    if (isDesignPreview) {
      setAuthLoading(false);
      setAccessAllowed(true);
      setUser({ id: "preview" });
      setExistingPlan({ package_name: selectedPackage || "Platinum" });
      setResumePrompt(null);
      setHydrated(true);
      return;
    }

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
  }, [selectedPackage, router, startFresh, isDesignPreview]);

  useEffect(() => {
    if (isDesignPreview) {
      setResumePrompt(null);
      setHydrated(true);
      return;
    }

    const saved = loadSavedProgress();
    const hasProgress =
      saved &&
      (saved.step > 0 ||
        Object.values(saved.formData ?? {}).some((v) =>
          Array.isArray(v) ? v.length > 0 : Boolean(v)
        ));

    if (hasProgress) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only localStorage read on mount
      setResumePrompt(saved);
    } else {
      setResumePrompt(null);
      setHydrated(true);
    }
  }, [isDesignPreview]);

  useEffect(() => {
    if (isDesignPreview || !hydrated || submitted) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ step: current, formData, packageName: selectedPackage })
    );
  }, [current, formData, hydrated, submitted, selectedPackage, isDesignPreview]);

  function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    setCurrent(0);
    setFurthestStep(0);
    setFormData({});
    setErrors({});
  }

  function handleContinueResume() {
    if (resumePrompt) {
      const maxStep = ASSESSMENT_STEPS.length - 1;
      let step = Math.min(Math.max(resumePrompt.step, 0), maxStep);
      if (!isStepVisible(ASSESSMENT_STEPS[step], resumePrompt.formData)) {
        step = nextVisibleIndex(step, resumePrompt.formData, -1);
      }
      setCurrent(step);
      setFurthestStep(Math.max(step, resumePrompt.step));
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
    const stepField = currentStep.fields.find((f) => f.name === name);
    const exclusive =
      stepField && stepField.type === "checkbox"
        ? stepField.exclusiveValue
        : undefined;

    setFormData((prev) => {
      const existing = (prev[name] as string[] | undefined) ?? [];
      let next: string[];

      if (exclusive && value === exclusive) {
        next = existing.includes(exclusive) ? [] : [exclusive];
      } else if (exclusive && existing.includes(exclusive)) {
        next = [value];
      } else if (existing.includes(value)) {
        next = existing.filter((v) => v !== value);
      } else {
        next = [...existing, value];
      }

      return { ...prev, [name]: next };
    });
    setErrors((prev) => ({ ...prev, [name]: false }));
  }

  function validateStep(idx: number) {
    const step = ASSESSMENT_STEPS[idx];
    if (!step || step.kind === "review" || step.fields.length === 0) {
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
          !Number.isNaN(n) &&
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

    const next = nextVisibleIndex(current, formData, 1);
    if (next !== current) {
      setCurrent(next);
      setFurthestStep((prev) => Math.max(prev, next));
      return;
    }

    // Last visible step — submit
    setSubmitted(true);
    setSubmitError(null);

    try {
      if (isDesignPreview) {
        return;
      }

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
    setCurrent((c) => nextVisibleIndex(c, formData, -1));
  }

  function handleSelectStep(stepIndex: number) {
    if (stepIndex < 0 || stepIndex >= ASSESSMENT_STEPS.length) return;
    if (!isStepVisible(ASSESSMENT_STEPS[stepIndex], formData)) return;
    setErrors({});
    setCurrent(stepIndex);
    setFurthestStep((prev) => Math.max(prev, stepIndex));
  }

  if (authLoading || resumePrompt === undefined) {
    return (
      <div className="assessment-pro assessment-pro--gate">
        <div className="assessment-pro__main">
          <div className="assessment-pro__main-inner assessment-pro__gate">
            <p className="assessment-pro__section">Coaching intake</p>
            <h1 className="assessment-pro__headline">Loading…</h1>
            <p className="assessment-pro__lead">
              One moment while we check your account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    const redirectTarget = `/quiz${
      selectedPackage
        ? `?package=${encodeURIComponent(selectedPackage)}`
        : ""
    }`;
    return (
      <div className="assessment-pro assessment-pro--gate">
        <div className="assessment-pro__main">
          <div className="assessment-pro__main-inner assessment-pro__gate">
            <p className="assessment-pro__section">Coaching intake</p>
            <h1 className="assessment-pro__headline">Sign in required</h1>
            <p className="assessment-pro__lead">
              Sign in to complete your post-purchase coaching intake.
            </p>
            <div className="assessment-pro__gate-actions">
              <Link
                href={`/auth/signup?redirect=${encodeURIComponent(redirectTarget)}`}
                className="assessment-pro__btn-primary"
              >
                Create account
              </Link>
              <Link
                href={`/auth/login?redirect=${encodeURIComponent(redirectTarget)}`}
                className="assessment-pro__btn-ghost"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!accessAllowed && !existingPlan) {
    return (
      <div className="assessment-pro assessment-pro--gate">
        <div className="assessment-pro__main">
          <div className="assessment-pro__main-inner assessment-pro__gate">
            <p className="assessment-pro__section">Almost ready</p>
            <h1 className="assessment-pro__headline">Finishing setup…</h1>
            <p className="assessment-pro__lead">
              We couldn&apos;t load your coaching plan yet. If you just paid,
              wait a moment and try again.
            </p>
            <div className="assessment-pro__gate-actions">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="assessment-pro__btn-primary"
              >
                Try again
              </button>
              <Link href="/dashboard" className="assessment-pro__btn-ghost">
                Go to dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!accessAllowed) {
    return (
      <div className="assessment-pro assessment-pro--gate">
        <div className="assessment-pro__main">
          <div className="assessment-pro__main-inner assessment-pro__gate">
            <h1 className="assessment-pro__headline">Opening assessment…</h1>
          </div>
        </div>
      </div>
    );
  }

  if (
    existingPlan &&
    selectedPackage &&
    existingPlan.package_name !== selectedPackage
  ) {
    return (
      <div className="assessment-pro assessment-pro--gate">
        <div className="assessment-pro__main">
          <div className="assessment-pro__main-inner assessment-pro__gate">
            <h1 className="assessment-pro__headline">Taking you to checkout…</h1>
            <p className="assessment-pro__lead">Preparing your package change.</p>
          </div>
        </div>
      </div>
    );
  }

  if (resumePrompt) {
    return (
      <div className="assessment-pro assessment-pro--gate">
        <header className="assessment-pro__top">
          <div className="assessment-pro__top-inner">
            <p className="assessment-pro__brand">
              <Link href="/">
                Athletic<span>Wolf</span>
              </Link>
            </p>
          </div>
        </header>
        <div className="assessment-pro__main">
          <div className="assessment-pro__main-inner assessment-pro__gate">
            <p className="assessment-pro__section">Welcome back</p>
            <h1 className="assessment-pro__headline">Resume your assessment?</h1>
            <p className="assessment-pro__lead">
              You have an assessment in progress
              {resumePrompt.packageName
                ? ` for the ${resumePrompt.packageName} plan`
                : ""}
              . Continue where you left off, or start over.
            </p>
            <div className="assessment-pro__gate-actions">
              <button
                type="button"
                onClick={handleContinueResume}
                className="assessment-pro__btn-primary"
              >
                Continue where I left off
              </button>
              <button
                type="button"
                onClick={handleStartOver}
                className="assessment-pro__btn-ghost"
              >
                Start over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isLast =
    nextVisibleIndex(current, formData, 1) === current &&
    currentStep.kind === "review";
  const canContinue = isStepComplete(currentStep, formData);

  return (
    <AssessmentShell
      step={currentStep}
      displayStep={Math.max(displayStep, 1)}
      displayTotal={displayTotal}
      packageName={selectedPackage || existingPlan?.package_name}
      brandHref="/"
      showProgress={!submitted}
      onStartOver={resetProgress}
      onSelectStep={submitted ? undefined : handleSelectStep}
      segments={segments}
      furthestAbsoluteIndex={Math.max(furthestStep, current)}
      footer={
        !submitted ? (
          <div className="assessment-pro__actions">
            {current > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="assessment-pro__btn-ghost"
              >
                Back
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canContinue}
              className="assessment-pro__btn-primary"
            >
              {isLast ? "Continue to my dashboard →" : "Continue"}
            </button>
          </div>
        ) : undefined
      }
    >
      {submitError && (
        <div className="assessment-pro__error" role="alert">
          <p>{submitError}</p>
        </div>
      )}
      {submitted ? (
        <div className="assessment-pro__payoff">
          <p className="assessment-pro__kicker">You&apos;re in</p>
          <h2 className="assessment-pro__title">Taking you to your dashboard…</h2>
          <p className="assessment-pro__lede">
            Your coach has everything they need to start building.
          </p>
          <Link
            href="/dashboard"
            className="assessment-pro__btn-primary assessment-pro__btn-primary--inline"
          >
            Continue to my dashboard →
          </Link>
        </div>
      ) : currentStep.kind === "review" ? (
        <AssessmentReview
          formData={formData}
          onEditStep={handleSelectStep}
          editTargets={editTargets}
        />
      ) : (
        <AssessmentFields
          fields={currentStep.fields}
          formData={formData}
          errors={errors}
          onSetValue={setValue}
          onToggleCheckbox={toggleCheckbox}
        />
      )}
    </AssessmentShell>
  );
}
