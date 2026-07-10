"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Check } from "@phosphor-icons/react";

interface UserData {
  email: string;
  full_name: string;
}

interface Plan {
  id: string;
  user_id: string;
  package_name: string;
  status: "assessment_pending" | "plan_ready" | "active" | "completed";
  created_at: string;
  assessment_completed_at: string | null;
  plan_ready_at: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          router.push("/auth/login?redirect=/dashboard");
          return;
        }

        setUser({
          email: authUser.email || "",
          full_name:
            (authUser.user_metadata?.full_name as string) || "Valued Client",
        });

        const { data: plans } = await supabase
          .from("plans")
          .select("*")
          .eq("user_id", authUser.id)
          .single();

        if (plans) {
          setPlan(plans);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard");
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
        <div className="text-center">
          <p className="text-muted">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper py-12 px-6">
      {plan?.plan_ready_at && (
        <div className="mx-auto max-w-2xl mb-6">
          <div className="rounded-xl bg-accent/10 border border-accent/30 p-4 text-center">
            <p className="font-semibold text-accent">🎉 Your coaching plan is ready!</p>
            <p className="text-sm text-foreground mt-1">Check your email for your personalized plan and next steps.</p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="font-display text-xl">
            Athletic<span className="text-accent">Wolf</span>
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-outline px-6 py-2 text-sm font-bold uppercase tracking-wide"
          >
            Log Out
          </button>
        </div>

        <div className="shadow-premium rounded-2xl border border-line bg-card p-8">
          <h1 className="font-display text-3xl mb-2">Welcome, {user?.full_name}!</h1>
          <p className="text-muted mb-8">{user?.email}</p>

          {error && (
            <div className="mb-6 rounded-xl bg-error/10 border border-error/30 p-4">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          {plan ? (
            <div className="space-y-6">
              <div className="rounded-xl border border-line bg-surface p-6">
                <p className="text-sm text-muted mb-2">Active Package</p>
                <p className="font-display text-2xl">{plan.package_name}</p>
              </div>

              <div className="space-y-4">
                <h2 className="font-display text-lg">Your Progress</h2>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="rounded-xl border border-line bg-surface p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            plan.assessment_completed_at
                              ? "bg-accent"
                              : "bg-line"
                          }`}
                        >
                          {plan.assessment_completed_at && (
                            <Check size={16} weight="bold" className="text-ink" />
                          )}
                        </div>
                        <p className="text-sm font-semibold">Assessment</p>
                      </div>
                      <p className="text-xs text-muted">
                        {plan.assessment_completed_at
                          ? "Completed"
                          : "Complete your intake assessment"}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="rounded-xl border border-line bg-surface p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            plan.plan_ready_at ? "bg-accent" : "bg-line"
                          }`}
                        >
                          {plan.plan_ready_at && (
                            <Check size={16} weight="bold" className="text-ink" />
                          )}
                        </div>
                        <p className="text-sm font-semibold">Coaching Plan</p>
                      </div>
                      <p className="text-xs text-muted">
                        {plan.plan_ready_at
                          ? "Ready to start"
                          : "We're preparing your plan"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {!plan.assessment_completed_at && (
                <Link
                  href={`/quiz?package=${encodeURIComponent(plan.package_name)}`}
                  className="btn btn-accent w-full px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white"
                >
                  Complete Assessment →
                </Link>
              )}

              {plan.plan_ready_at && (
                <div className="rounded-xl bg-accent/10 border border-accent/30 p-6">
                  <p className="font-semibold text-accent mb-2">
                    Your coaching plan is ready!
                  </p>
                  <p className="text-sm text-foreground">
                    Check your email for your personalized coaching plan and next steps.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted mb-6">
                No active coaching package yet. Purchase one to get started.
              </p>
              <Link
                href="/#packages"
                className="btn btn-accent px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white"
              >
                View Packages
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
