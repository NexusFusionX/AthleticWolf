"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Check, X } from "@phosphor-icons/react";
import { AdminCustomerDetail } from "@/app/components/AdminCustomerDetail";
import {
  getCustomerContact,
  type PlanCheckoutData,
} from "@/app/lib/plan-customer";

interface Plan {
  id: string;
  user_id: string;
  package_name: string;
  status: string;
  created_at: string;
  assessment_completed_at: string | null;
  plan_ready_at: string | null;
  plan_content: string | null;
  assessment_data: string | null;
  checkout_data: string | null;
}

function AdminContent() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [authContacts, setAuthContacts] = useState<
    Record<string, PlanCheckoutData>
  >({});
  const [contactsWarning, setContactsWarning] = useState<string | null>(null);

  useEffect(() => {
    void checkSession();
  }, []);

  async function checkSession() {
    try {
      const res = await fetch("/api/admin/session", { credentials: "include" });
      if (!res.ok) {
        setUser(null);
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.authenticated && data.username) {
        setUser({ username: data.username });
        await loadPlans();
        return;
      }
      setUser(null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function loadPlans() {
    try {
      const res = await fetch("/api/admin/plans", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) {
        setContactsWarning(data.error || "Failed to load plans");
        setPlans([]);
        return;
      }

      const rows = (data.plans as Plan[]) || [];
      setPlans(rows);

      if (rows.length > 0) {
        const contactsRes = await fetch("/api/admin/customer-contacts", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userIds: rows.map((p) => p.user_id) }),
        });
        const contactsData = await contactsRes.json();
        if (contactsData.contacts) {
          setAuthContacts(contactsData.contacts);
        }
        if (contactsData.error) {
          setContactsWarning(contactsData.error);
        } else {
          setContactsWarning(null);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "Invalid credentials");
        setLoginLoading(false);
        return;
      }

      setUser({ username: data.username });
      setPassword("");
      setLoading(true);
      await loadPlans();
    } catch {
      setLoginError("Login failed");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setPlans([]);
    setSelectedPlanId(null);
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
                autoComplete="username"
                className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm mb-6">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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

  const selectedPlan = selectedPlanId
    ? plans.find((p) => p.id === selectedPlanId)
    : null;

  if (selectedPlan) {
    return (
      <AdminCustomerDetail
        plan={selectedPlan}
        authContact={authContacts[selectedPlan.user_id] ?? null}
        onBack={() => setSelectedPlanId(null)}
        onSuccess={loadPlans}
      />
    );
  }

  return (
    <div className="min-h-screen bg-paper px-6 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              className="font-display text-2xl text-white mb-2 block"
            >
              Athletic<span className="text-accent">Wolf</span>
            </Link>
            <h1 className="font-display text-3xl text-white">Coach Dashboard</h1>
            <p className="text-muted mt-1">Logged in as {user.username}</p>
          </div>
          <button
            onClick={() => void handleLogout()}
            className="btn btn-outline px-6 py-2 text-sm font-bold uppercase tracking-wide"
          >
            Log Out
          </button>
        </div>

        <div className="shadow-premium rounded-2xl border border-line bg-card overflow-hidden">
          <div className="bg-ink px-8 py-6 text-white border-b border-line">
            <h2 className="font-display text-xl">Customer Assessments</h2>
            <p className="text-sm text-muted mt-1">{plans.length} total</p>
          </div>

          {contactsWarning && (
            <div className="border-b border-yellow-500/30 bg-yellow-500/10 px-8 py-3 text-sm text-yellow-200">
              {contactsWarning}
            </div>
          )}

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
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Assessment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => {
                    const contact = getCustomerContact(
                      plan,
                      authContacts[plan.user_id] ?? null
                    );

                    return (
                      <tr
                        key={plan.id}
                        className="border-b border-line hover:bg-surface/30 transition cursor-pointer"
                        onClick={() => setSelectedPlanId(plan.id)}
                      >
                        <td className="px-6 py-4 text-sm font-semibold">
                          {contact.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted">
                          {contact.phone}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold">
                          {plan.package_name}
                        </td>
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
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
                              {plan.plan_content ? "Created" : "Draft"}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPlanId(plan.id);
                            }}
                            className="btn btn-accent px-4 py-2 text-xs font-bold uppercase tracking-wide"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
