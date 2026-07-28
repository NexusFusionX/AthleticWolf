"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Bell, List, X } from "@phosphor-icons/react";
import { BrandLogo } from "./BrandLogo";

const NAV_LINKS = [
  { href: "/#programs", label: "Programs" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#packages", label: "Packages" },
  { href: "/#results", label: "Results" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasActivePlan, setHasActivePlan] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasNotification, setHasNotification] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.offsetHeight}px`,
      );
    };

    syncHeaderHeight();
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        setHasActivePlan(!!plan);

        if (plan?.plan_ready_at && !plan?.notification_seen_at) {
          setHasNotification(true);
        }
      } else {
        setHasActivePlan(false);
      }

      setLoading(false);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (menuOpen) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  const ctaHref = !isLoggedIn
    ? `/auth/login?redirect=${encodeURIComponent("/quiz")}`
    : hasActivePlan
      ? "/dashboard"
      : "/quiz";
  const ctaLabel = isLoggedIn && hasActivePlan ? "Dashboard" : "Get Started";

  return (
    <header
      data-site-header
      className={`site-header sticky top-0 z-50 border-b ${scrolled ? "site-header--scrolled" : "site-header--top"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5 sm:px-8 sm:py-4">
        <BrandLogo height={72} priority />

        <nav
          className="hidden items-center gap-7 text-sm font-medium text-white/75 lg:flex"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {loading ? (
            <div
              className="hidden h-10 w-28 animate-pulse rounded-xl bg-white/10 sm:block"
              aria-hidden
            />
          ) : (
            <Link
              href={ctaHref}
              className="btn btn-accent relative hidden px-4 py-2 text-sm font-bold uppercase tracking-wide text-white sm:inline-flex sm:px-5 sm:py-2.5"
            >
              {ctaLabel}
              {hasNotification && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500">
                  <Bell size={12} weight="bold" className="text-ink" />
                </span>
              )}
            </Link>
          )}

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:border-accent/40 hover:text-accent lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X size={22} weight="bold" />
            ) : (
              <List size={22} weight="bold" />
            )}
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-nav"
        className="mobile-nav-dialog fixed inset-0 z-[60] m-0 h-full max-h-none w-full max-w-none border-0 bg-black/95 p-0 backdrop:bg-black/60"
        onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeMenu();
        }}
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-6">
          <div className="flex items-center justify-between">
            <BrandLogo height={64} />
            <button
              type="button"
              onClick={closeMenu}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white"
              aria-label="Close menu"
            >
              <X size={22} weight="bold" />
            </button>
          </div>

          <nav className="mt-10 flex flex-1 flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3.5 text-lg font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {!loading && (
            <Link
              href={ctaHref}
              onClick={closeMenu}
              className="btn btn-accent relative w-full px-6 py-3.5 text-base font-bold uppercase tracking-wide text-white"
            >
              {ctaLabel}
              {hasNotification && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500">
                  <Bell size={12} weight="bold" className="text-ink" />
                </span>
              )}
            </Link>
          )}
        </div>
      </dialog>
    </header>
  );
}
