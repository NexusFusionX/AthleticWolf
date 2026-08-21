"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import {
  leadDisplayRows,
  leadToFormData,
  type LeadRecord,
} from "@/app/lib/lead-form-steps";

type AdminLeadDetailProps = {
  lead: LeadRecord;
  onBack: () => void;
};

export function AdminLeadDetail({ lead, onBack }: AdminLeadDetailProps) {
  const data = leadToFormData(lead);
  const rows = leadDisplayRows(data);
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
  const submittedAt = lead.created_at
    ? new Date(lead.created_at).toLocaleString()
    : "—";

  return (
    <div className="min-h-screen bg-paper px-6 py-12 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent/80"
        >
          <ArrowLeft size={16} weight="bold" />
          Back to Applications
        </button>

        <div className="mb-8 rounded-2xl border border-line bg-card p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Coaching application
          </p>
          <h1 className="font-display text-3xl text-white">{fullName || "Lead"}</h1>
          <p className="mt-2 text-sm text-muted">Submitted {submittedAt}</p>
        </div>

        <div className="rounded-2xl border border-line bg-card p-8">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            Application answers
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {rows.map((row) => (
              <div key={row.key}>
                <p className="mb-1 text-xs uppercase text-muted">{row.label}</p>
                <p className="text-sm font-semibold break-words text-white">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
