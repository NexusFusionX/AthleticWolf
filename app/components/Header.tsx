"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Bell } from "@phosphor-icons/react";
import { BrandLogo } from "./BrandLogo";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);

      if (user) {
        const { data: plan } = await supabase
          .from("plans")
          .select("plan_ready_at, notification_seen_at")
          .eq("user_id", user.id)
          .single();

        if (plan?.plan_ready_at && !plan?.notification_seen_at) {
          setHasNotification(true);
        }
      }

      setLoading(false);
    }
    checkAuth();
  }, []);

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b border-white/10 bg-black"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:px-8 sm:py-4">
        <BrandLogo height={72} priority />
        <nav className="hidden items-center gap-7 text-sm font-medium text-white/75 lg:flex">
          <a href="#programs" className="transition-colors hover:text-white">
            Programs
          </a>
          <Link href="/#how-it-works" className="transition-colors hover:text-white">
            How It Works
          </Link>
          <Link href="/packages" className="transition-colors hover:text-white">
            Packages
          </Link>
          <Link href="/#results" className="transition-colors hover:text-white">
            Results
          </Link>
          <Link href="/#about" className="transition-colors hover:text-white">
            About
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-white">
            FAQ
          </Link>
        </nav>
        {!loading && (
          <Link
            href={isLoggedIn ? "/dashboard" : "/auth/login"}
            className="btn btn-accent relative px-4 py-2 text-sm font-bold uppercase tracking-wide text-white sm:px-5 sm:py-2.5"
          >
            {isLoggedIn ? "Dashboard" : "Get Started"}
            {hasNotification && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500">
                <Bell size={12} weight="bold" className="text-ink" />
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}
