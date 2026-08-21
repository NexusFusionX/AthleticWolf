"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export function SiteFooterCTA() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(Boolean(session?.user));
    });
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 px-6 py-8 text-center sm:px-10 sm:py-10">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
        Ready to start?
      </p>
      <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl">
        {loggedIn
          ? "Your coaching dashboard is waiting."
          : "Your personalized coaching plan starts here."}
      </h2>
      <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        {loggedIn ? (
          <>
            <Link
              href="/dashboard"
              className="btn btn-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
            >
              Go to dashboard
            </Link>
            <Link
              href="/#apply"
              className="btn btn-outline px-8 py-3.5 text-sm font-bold uppercase tracking-wide"
            >
              Apply now
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/#apply"
              className="btn btn-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
            >
              Apply now
            </Link>
            <Link
              href="/how-it-works"
              className="btn btn-outline px-8 py-3.5 text-sm font-bold uppercase tracking-wide"
            >
              How it works
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
