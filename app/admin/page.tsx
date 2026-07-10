"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Check, X, ArrowLeft } from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import { PlanWizard } from "@/app/components/PlanWizard";

interface Plan {
  id: string;
  user_id: string;
  package_name: string;
  status: string;
  created_at: string;
  assessment_completed_at: string | null;
  plan_ready_at: string | null;
  plan_content: string | null;
}

interface PlanWithStatus extends Plan {
  hasPlanContent: boolean;
}

function AdminContent() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [markingReady, setMarkingReady] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const ADMIN_USERNAME = "mrmoiz";
  const ADMIN_PASSWORD = "ulpdgwlc";

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const savedUsername = localStorage.getItem("admin-username");
    if (savedUsername === ADMIN_USERNAME) {
      setUser({
        id: "admin",
        email: ADMIN_USERNAME,
      });
      loadPlans();
    } else {
      setLoading(false);
    }
  }

  async function loadPlans() {
    try {
      const { data: plansData } = await supabase
        .from("plans")
        .select("*")
        .order("created_at", { ascending: false });

      setPlans((plansData as Plan[]) || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem("admin-username", ADMIN_USERNAME);
        setUser({
          id: "admin",
          email: ADMIN_USERNAME,
        });
        loadPlans();
      } else {
        setLoginError("Invalid credentials");
        setLoginLoading(false);
      }
    } catch (err) {
      setLoginError("Invalid credentials");
      setLoginLoading(false);
    }
  }

  async function handleMarkReady(planId: string) {
    setMarkingReady(planId);
    try {
      await supabase
        .from("plans")
        .update({ plan_ready_at: new Date().toISOString() })
        .eq("id", planId);

      setPlans((prev) =>
        prev.map((p) =>
          p.id === planId ? { ...p, plan_ready_at: new Date().toISOString() } : p
        )
      );

      alert("Plan marked ready! Customer notified.");
    } catch (err) {
      alert("Failed to mark ready.");
    } finally {
      setMarkingReady(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center p-6">
        <div className="w-full overflow-hidden shadow-premium rounded-2xl border border-line bg-card">
          <div className="bg-ink px-8 py-7 text-white">
            <Link href="/" className="font-display text-lg">
              Athletic<span className="text-accent">Wolf</span>
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Admin
            </p>
            <h1 className="font-display mt-1.5 text-3xl">Coach Login</h1>
          </div>

          <form onSubmit={handleLogin} className="p-8">
            {loginError && (
              <div className="mb-6 rounded-xl bg-error/10 border border-error/30 p-4">
                <p className="text-sm text-error">{loginError}</p>
              </div>
            )}

            <label className="flex flex-col gap-2 text-sm mb-4">
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                placeholder="mrmoiz"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm mb-6">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                placeholder="••••••••"
              />
            </label>

            <button
              type="submit"
              disabled={loginLoading}
              className="btn btn-accent w-full px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white disabled:opacity-50"
            >
              {loginLoading ? "Logging in..." : "Admin Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const selectedPlan = selectedPlanId ? plans.find((p) => p.id === selectedPlanId) : null;

  if (selectedPlan) {
    return (
      <div className="min-h-screen bg-paper px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={() => setSelectedPlanId(null)}
            className="flex items-center gap-2 text-sm font-semibold text-accent mb-8 hover:text-accent/80 transition"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to Customers
          </button>

          <div className="mb-8">
            <div className="rounded-2xl border border-line bg-card p-8">
              <p className="text-sm text-muted mb-2">Customer Package</p>
              <h1 className="font-display text-3xl mb-1">{selectedPlan.package_name}</h1>
              <p className="text-sm text-foreground">
                Assessment: {selectedPlan.assessment_completed_at ? "✓ Completed" : "○ Pending"}
              </p>
            </div>
          </div>

          <PlanWizard
            planId={selectedPlan.id}
            onSuccess={() => {
              setSelectedPlanId(null);
              loadPlans();
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper px-6 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="font-display text-2xl text-white mb-2 block">
              Athletic<span className="text-accent">Wolf</span>
            </Link>
            <h1 className="font-display text-3xl text-white">Coach Dashboard</h1>
            <p className="text-muted mt-1">Logged in as {user.email}</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("admin-username");
              setUser(null);
            }}
            className="btn btn-outline px-6 py-2 text-sm font-bold uppercase tracking-wide"
          >
            Log Out
          </button>
        </div>

        <div className="shadow-premium rounded-2xl border border-line bg-card overflow-hidden">
          <div className="bg-ink px-8 py-6 text-white border-b border-line">
            <h2 className="font-display text-xl">Customer Assessments</h2>
            <p className="text-sm text-muted mt-1">
              {plans.length} total
            </p>
          </div>

          {plans.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted">No customers yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-line bg-surface/50">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Assessment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Plan Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id} className="border-b border-line hover:bg-surface/30 transition">
                      <td className="px-6 py-4 text-sm font-semibold">{plan.package_name}</td>
                      <td className="px-6 py-4 text-sm">
                        {plan.assessment_completed_at ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                            <Check size={14} weight="bold" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-500">
                            <X size={14} weight="bold" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {plan.plan_ready_at ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                            <Check size={14} weight="bold" />
                            Ready
                          </span>
                        ) : (
                          <span className="text-muted">Not ready</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {plan.plan_content ? (
                          <button
                            onClick={() => setSelectedPlanId(plan.id)}
                            className="inline-flex items-center gap-2 btn btn-outline px-4 py-2 text-xs font-bold uppercase tracking-wide"
                          >
                            ✓ Plan Created
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedPlanId(plan.id)}
                            className="btn btn-accent px-4 py-2 text-xs font-bold uppercase tracking-wide"
                          >
                            Create Plan
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><p>Loading...</p></div>}>
      <AdminContent />
    </Suspense>
  );
}
