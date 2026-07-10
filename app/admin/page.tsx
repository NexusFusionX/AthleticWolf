"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, X } from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";

interface Plan {
  id: string;
  user_id: string;
  package_name: string;
  status: string;
  created_at: string;
  assessment_completed_at: string | null;
  plan_ready_at: string | null;
}

interface UserData {
  id: string;
  email: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [markingReady, setMarkingReady] = useState<string | null>(null);

  useEffect(() => {
    async function loadAdmin() {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser || authUser.email !== "hello@athleticwolf.com") {
          router.push("/");
          return;
        }

        setUser({
          id: authUser.id,
          email: authUser.email,
        });

        const { data: plansData, error } = await supabase
          .from("plans")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPlans((plansData as Plan[]) || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load admin panel:", err);
        router.push("/");
      }
    }

    loadAdmin();
  }, [router]);

  async function handleMarkReady(planId: string) {
    setMarkingReady(planId);
    try {
      const { error } = await supabase
        .from("plans")
        .update({ plan_ready_at: new Date().toISOString() })
        .eq("id", planId);

      if (error) throw error;

      setPlans((prev) =>
        prev.map((p) =>
          p.id === planId ? { ...p, plan_ready_at: new Date().toISOString() } : p
        )
      );

      alert("Plan marked as ready! Email notification sent to customer.");
    } catch (err) {
      alert("Failed to mark plan ready. Please try again.");
    } finally {
      setMarkingReady(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">Loading admin panel...</p>
      </div>
    );
  }

  if (!user) {
    return null;
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
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/");
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
              {plans.length} customer{plans.length !== 1 ? "s" : ""} total
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
                      Name
                    </th>
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
                      <td className="px-6 py-4 text-sm text-foreground">
                        Customer #{plan.user_id.slice(0, 8)}
                      </td>
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
                        {!plan.plan_ready_at && plan.assessment_completed_at ? (
                          <button
                            onClick={() => handleMarkReady(plan.id)}
                            disabled={markingReady === plan.id}
                            className="btn btn-accent px-4 py-2 text-xs font-bold uppercase tracking-wide disabled:opacity-50"
                          >
                            {markingReady === plan.id ? "Marking..." : "Mark Ready"}
                          </button>
                        ) : plan.plan_ready_at ? (
                          <span className="text-xs text-accent font-semibold">Sent ✓</span>
                        ) : (
                          <span className="text-xs text-muted">Waiting for assessment</span>
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
