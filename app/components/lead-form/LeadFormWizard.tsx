"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CaretLeft, Check } from "@phosphor-icons/react";
import {
  EMPTY_LEAD_FORM,
  LEAD_FORM_STEPS,
  isLeadStepComplete,
  type LeadFormData,
} from "@/app/lib/lead-form-steps";
import "./lead-form.css";

const STORAGE_KEY = "aw_lead_form_draft";
const SUBMITTED_KEY = "aw_lead_form_submitted";

export function LeadFormWizard() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<LeadFormData>(() => {
    if (typeof window === "undefined") return EMPTY_LEAD_FORM;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return EMPTY_LEAD_FORM;
      return { ...EMPTY_LEAD_FORM, ...(JSON.parse(raw) as LeadFormData) };
    } catch {
      return EMPTY_LEAD_FORM;
    }
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step = LEAD_FORM_STEPS[stepIndex];
  const total = LEAD_FORM_STEPS.length;
  const isLast = stepIndex === total - 1;
  const stepComplete = useMemo(
    () => isLeadStepComplete(step, data),
    [step, data]
  );
  const progressPct = Math.round(((stepIndex + 1) / total) * 100);

  function persist(next: LeadFormData) {
    setData(next);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  function updateField<K extends keyof LeadFormData>(
    name: K,
    value: LeadFormData[K]
  ) {
    persist({ ...data, [name]: value });
    setError(null);
  }

  function goNext() {
    if (!stepComplete) {
      setError("Please complete this step to continue.");
      return;
    }
    setError(null);
    if (!isLast) {
      setStepIndex((i) => Math.min(i + 1, total - 1));
      return;
    }
    void submit();
  }

  function goBack() {
    setError(null);
    setStepIndex((i) => Math.max(0, i - 1));
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json();
      if (!res.ok) {
        setError(payload.error || "Could not submit. Please try again.");
        setSubmitting(false);
        return;
      }

      try {
        window.sessionStorage.setItem(
          SUBMITTED_KEY,
          JSON.stringify({ id: payload.id, data })
        );
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }

      router.push(`/thank-you?lead=${encodeURIComponent(payload.id)}`);
    } catch {
      setError("Could not submit. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="lead-form">
      <div className="lead-form__head">
        <p className="lead-form__eyebrow">Apply for coaching</p>
        <h2 className="lead-form__title font-display">
          Start your application
        </h2>
        <p className="lead-form__lede">
          7 questions · No card needed · Nothing to book yet
        </p>
      </div>

      <div className="lead-form__progress" aria-hidden>
        <div className="lead-form__progress-meta">
          <span>
            Step {stepIndex + 1} of {total}
          </span>
          <span>{progressPct}%</span>
        </div>
        <div className="lead-form__progress-track">
          <div
            className="lead-form__progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="lead-form__segments">
          {LEAD_FORM_STEPS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`lead-form__segment${
                i === stepIndex ? " lead-form__segment--current" : ""
              }${i < stepIndex ? " lead-form__segment--done" : ""}`}
              onClick={() => {
                if (i <= stepIndex) setStepIndex(i);
              }}
              aria-label={`Go to ${item.label}`}
              disabled={i > stepIndex}
            />
          ))}
        </div>
      </div>

      <div className="lead-form__card">
        <p className="lead-form__step-label">{step.label}</p>
        <h3 className="lead-form__step-title">{step.title}</h3>
        {step.subtitle ? (
          <p className="lead-form__step-sub">{step.subtitle}</p>
        ) : null}

        <div className="lead-form__fields">
          {step.fields.map((field) => {
            if (field.type === "radio") {
              return (
                <fieldset key={field.name} className="lead-form__fieldset">
                  <legend className="sr-only">{field.label}</legend>
                  <div className="lead-form__choices">
                    {field.options.map((option) => {
                      const selected = data[field.name] === option.value;
                      return (
                        <label
                          key={option.value}
                          className={`lead-form__choice${
                            selected ? " lead-form__choice--selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={field.name}
                            value={option.value}
                            checked={selected}
                            onChange={() =>
                              updateField(field.name, option.value)
                            }
                            className="sr-only"
                          />
                          <span className="lead-form__choice-check" aria-hidden>
                            {selected ? <Check size={12} weight="bold" /> : null}
                          </span>
                          <span>{option.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              );
            }

            const shared = {
              id: field.name,
              name: field.name,
              required: field.required,
              placeholder: field.placeholder,
              value: data[field.name],
              onChange: (
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => updateField(field.name, e.target.value),
              className: "lead-form__input",
            };

            return (
              <label
                key={field.name}
                className={`lead-form__field${
                  field.half ? " lead-form__field--half" : ""
                }`}
              >
                <span>{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea {...shared} rows={4} />
                ) : (
                  <input {...shared} type={field.type} autoComplete="on" />
                )}
              </label>
            );
          })}
        </div>

        {error ? <p className="lead-form__error">{error}</p> : null}

        <div className="lead-form__actions">
          {stepIndex > 0 ? (
            <button
              type="button"
              className="lead-form__back"
              onClick={goBack}
              disabled={submitting}
            >
              <CaretLeft size={16} weight="bold" />
              Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            className="btn btn-accent lead-form__continue"
            onClick={goNext}
            disabled={submitting || !stepComplete}
          >
            {submitting
              ? "Submitting…"
              : isLast
                ? "Submit application"
                : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
