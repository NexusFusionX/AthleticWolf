"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setLoading(false);
    }
    checkAuth();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="/" className="font-display text-xl text-white sm:text-2xl">
          Athletic<span className="text-accent">Wolf</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-white/75 lg:flex">
          <a href="#programs" className="transition-colors hover:text-white">
            Programs
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-white">
            How It Works
          </a>
          <a href="#packages" className="transition-colors hover:text-white">
            Packages
          </a>
          <a href="#results" className="transition-colors hover:text-white">
            Results
          </a>
          <a href="#about" className="transition-colors hover:text-white">
            About
          </a>
          <a href="#faq" className="transition-colors hover:text-white">
            FAQ
          </a>
        </nav>
        {!loading && (
          <a
            href={isLoggedIn ? "/dashboard" : "#apply"}
            className="btn btn-accent px-4 py-2 text-sm font-bold uppercase tracking-wide text-white sm:px-5 sm:py-2.5"
          >
            {isLoggedIn ? "Dashboard" : "Get Started"}
          </a>
        )}
      </div>
    </header>
  );
}
