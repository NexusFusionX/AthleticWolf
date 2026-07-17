"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { packages } from "../data/packages";

const ASSESSMENT_KEY = "athletic-wolf-pending-assessment";

export function CheckoutFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageName = searchParams.get("package");
  const pkg = packages.find((p) => p.name === packageName);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [existingPlan, setExistingPlan] = useState<any>(null);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [pendingAssessment, setPendingAssessment] = useState<any>(null);
  const [redirectingToQuiz, setRedirectingToQuiz] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      setUser(authUser);

      let plan = null;
      if (authUser) {
        const { data: existingPlanData } = await supabase
          .from("plans")
          .select("*")
          .eq("user_id", authUser.id)
          .single();
        plan = existingPlanData ?? null;
        if (plan) {
          setExistingPlan(plan);
        }
      }

      // Brand-new customer (no plan yet): assessment must be completed first.
      if (authUser && !plan && packageName) {
        let assessment = null;
        try {
          const raw = localStorage.getItem(ASSESSMENT_KEY);
          assessment = raw ? JSON.parse(raw) : null;
        } catch {
          assessment = null;
        }

        if (!assessment || assessment.package !== packageName) {
          setRedirectingToQuiz(true);
          router.replace(`/quiz?package=${encodeURIComponent(packageName)}`);
          return;
        }

        setPendingAssessment(assessment);
      }

      setLoading(false);
    }
    checkAuth();
  }, [packageName, router]);

  // Determine if this is an upgrade or downgrade
  const getActionType = () => {
    if (!existingPlan || !pkg) return null;
    const existingPkg = packages.find((p) => p.name === existingPlan.package_name);
    if (!existingPkg) return null;
    if (pkg.price > existingPkg.price) return "upgrade";
    if (pkg.price < existingPkg.price) return "downgrade";
    return "same";
  };

  const actionType = getActionType();

  async function handleCheckout() {
    if (!pkg || !user) return;

    if (existingPlan) {
      setShowUpgradeDialog(true);
      return;
    }

    setProcessing(true);

    try {
      const { error } = await supabase.from("plans").insert({
        user_id: user.id,
        package_name: pkg.name,
        status: "active",
        assessment_completed_at: new Date().toISOString(),
        assessment_data: pendingAssessment
          ? JSON.stringify(pendingAssessment.formData)
          : null,
      });

      if (error) throw error;

      localStorage.removeItem(ASSESSMENT_KEY);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Failed to complete purchase. Please try again.");
      setProcessing(false);
    }
  }

  async function handleUpgrade() {
    if (!pkg || !user || !existingPlan) return;
    setProcessing(true);

    try {
      const { error } = await supabase
        .from("plans")
        .update({
          package_name: pkg.name,
          status: "active",
        })
        .eq("id", existingPlan.id);

      if (error) throw error;

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Failed to upgrade. Please try again.");
      setProcessing(false);
    }
  }

  if (showUpgradeDialog && existingPlan && pkg) {
    const isUpgrade = actionType === "upgrade";
    const isDowngrade = actionType === "downgrade";
    const actionText = isUpgrade ? "upgrade" : isDowngrade ? "downgrade" : "switch";
    const actionCapital = isUpgrade ? "Upgrade" : isDowngrade ? "Downgrade" : "Switch";
    const loadingText = isUpgrade ? "Upgrading..." : isDowngrade ? "Downgrading..." : "Switching...";

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
        <div className="w-full max-w-md overflow-hidden shadow-premium rounded-2xl border border-line bg-card">
          <div className="bg-ink px-8 py-7 text-white">
            <h2 className="font-display text-2xl">Active Package Detected</h2>
          </div>

          <div className="p-8">
            <p className="text-muted mb-6">
              You already have an active <strong>{existingPlan.package_name}</strong> package. Would you like to {actionText} to <strong>{pkg.name}</strong>?
            </p>

            <div className="space-y-3">
              <button
                onClick={handleUpgrade}
                disabled={processing}
                className="btn btn-accent w-full px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white disabled:opacity-50"
              >
                {processing ? loadingText : `${actionCapital} to ${pkg.name}`}
              </button>

              <button
                onClick={() => window.location.href = "/dashboard"}
                className="btn btn-outline w-full px-8 py-3.5 text-base font-bold uppercase tracking-wide disabled:opacity-50"
              >
                Keep Current Package
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (redirectingToQuiz) {
    return null;
  }

  if (!pkg) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="w-full shadow-premium rounded-2xl border border-line bg-card p-10 text-center">
          <h1 className="font-display text-3xl">No Package Selected</h1>
          <p className="mt-3 text-muted">
            Head back to the packages section and pick a plan to check out.
          </p>
          <Link
            href="/#packages"
            className="btn btn-accent mt-6 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
          >
            View Packages
          </Link>
        </div>
      </div>
    );
  }

  if (!user && !loading) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="w-full shadow-premium rounded-2xl border border-line bg-card p-10 text-center">
          <h1 className="font-display text-3xl">Sign In Required</h1>
          <p className="mt-3 text-muted">
            You need to create an account or log in to complete your order.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/auth/signup?redirect=/checkout?package=${encodeURIComponent(packageName || "")}`}
              className="btn btn-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
            >
              Create Account
            </Link>
            <Link
              href={`/auth/login?redirect=/checkout?package=${encodeURIComponent(packageName || "")}`}
              className="btn btn-outline px-6 py-3 text-sm font-bold uppercase tracking-wide"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
      <div className="w-full overflow-hidden shadow-premium rounded-2xl border border-line bg-card">
        <div className="bg-ink px-8 py-7 text-white">
          <Link href="/" className="font-display text-lg">
            Athletic<span className="text-accent">Wolf</span>
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Checkout
          </p>
          <h1 className="font-display mt-1.5 text-3xl sm:text-4xl">
            Complete Your Order
          </h1>
        </div>

        <div className="p-8">
          <div className="rounded-xl border border-line bg-surface p-6">
            <div className="flex items-center justify-between">
              <p className="font-display text-xl">{pkg.name} Plan</p>
              {pkg.featured && (
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Most Popular
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">6 Month Coaching Package</p>
            <div className="mt-4 flex items-end gap-1">
              <span className="font-display text-3xl">${pkg.price}</span>
              <span className="mb-0.5 text-sm text-muted">/ month</span>
            </div>
            <p className="mt-1 text-sm text-muted">Total value ${pkg.value}</p>

            <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check
                    size={16}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {pendingAssessment && (
            <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3">
              <Check size={18} weight="bold" className="shrink-0 text-accent" />
              <p className="text-sm font-semibold text-accent">
                Assessment complete — you&apos;re ready to check out.
              </p>
            </div>
          )}

          <div className="mt-6 rounded-xl border border-dashed border-line bg-surface p-6 text-center">
            <p className="text-sm font-semibold">🔒 Payment Method</p>
            <p className="mt-2 text-sm text-muted">
              Secure payment processing isn&apos;t connected yet. Once it is,
              you&apos;ll enter your card details here. For now, continue below
              to proceed as if payment were complete.
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={processing}
            className="btn btn-accent font-display mt-6 w-full px-8 py-3.5 text-base text-white disabled:opacity-50"
          >
            {processing ? "Processing..." : "Complete Purchase (Test Mode) →"}
          </button>
        </div>
      </div>
    </div>
  );
}
