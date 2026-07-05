"use client";

import { useState } from "react";

const goals = [
  "Fat loss",
  "Muscle gain",
  "Body recomposition",
  "Strength",
  "Athletic performance",
  "General fitness",
];

const packages = ["Silver", "Platinum", "Diamond", "Not sure yet"];

export function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const country = data.get("country");
    const goal = data.get("goal");
    const pkg = data.get("package");
    const message = data.get("message");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Country: ${country}`,
      `Goal: ${goal}`,
      `Interested package: ${pkg}`,
      "",
      `Message:`,
      `${message}`,
    ].join("\n");

    window.location.href = `mailto:hello@athleticwolf.com?subject=${encodeURIComponent(
      "New coaching application - Athletic Wolf"
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-surface p-8 text-center">
        <p className="text-lg font-semibold">Thanks — almost there!</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Your email app should have opened with your details pre-filled. Hit
          send and we&apos;ll get back to you within 24-48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className="flex flex-col gap-2 text-sm">
        Name
        <input
          name="name"
          required
          className="rounded-xl border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Email
        <input
          type="email"
          name="email"
          required
          className="rounded-xl border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Country
        <input
          name="country"
          required
          className="rounded-xl border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Primary goal
        <select
          name="goal"
          required
          className="rounded-xl border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none focus:border-accent"
        >
          {goals.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm sm:col-span-2">
        Interested package
        <select
          name="package"
          required
          className="rounded-xl border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none focus:border-accent"
        >
          {packages.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm sm:col-span-2">
        Anything else we should know?
        <textarea
          name="message"
          rows={4}
          className="rounded-xl border border-white/10 bg-surface-2 px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </label>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-flame px-8 py-3.5 text-base font-semibold text-white transition-all hover:brightness-110 sm:col-span-2"
      >
        Submit Application
      </button>
    </form>
  );
}
