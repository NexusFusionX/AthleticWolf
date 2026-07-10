"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push(redirectTo);
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center justify-center p-6">
      <div className="w-full overflow-hidden shadow-premium rounded-2xl border border-line bg-card">
        <div className="bg-ink px-8 py-7 text-white">
          <Link href="/" className="font-display text-lg">
            Athletic<span className="text-accent">Wolf</span>
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Log In
          </p>
          <h1 className="font-display mt-1.5 text-3xl">Access Your Plan</h1>
        </div>

        <form onSubmit={handleLogin} className="p-8">
          {error && (
            <div className="mb-6 rounded-xl bg-error/10 border border-error/30 p-4">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          <label className="flex flex-col gap-2 text-sm mb-4">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
              placeholder="you@example.com"
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
            disabled={loading}
            className="btn btn-accent w-full px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="mt-6 text-center text-sm text-muted">
            Don't have an account?{" "}
            <Link
              href={`/auth/signup?redirect=${encodeURIComponent(redirectTo)}`}
              className="text-accent hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><p>Loading...</p></div>}>
      <LoginContent />
    </Suspense>
  );
}
