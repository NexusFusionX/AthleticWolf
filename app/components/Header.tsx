"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Bell, List, User, X } from "@phosphor-icons/react";
import { BrandLogo } from "./BrandLogo";

const NAV_LINKS = [
  { href: "/#programs", label: "Programs" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/#packages", label: "Packages" },
  { href: "/#results", label: "Results" },
  { href: "/about", label: "About" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasNotification, setHasNotification] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
      document.body.style.overflow = "";
    };
  }, []);

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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (menuOpen && !menuClosing) {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    }
  }, [menuOpen, menuClosing]);

  function closeMenu() {
    if (menuClosing || !menuOpen) return;

    setMenuClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      dialogRef.current?.close();
      setMenuOpen(false);
      setMenuClosing(false);
      document.body.style.overflow = "";
      closeTimerRef.current = null;
    }, 320);
  }

  function openMenu() {
    setMenuOpen(true);
  }

  function toggleMenu() {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  const accountHref = isLoggedIn ? "/dashboard" : "/auth/login";
  const accountLabel = isLoggedIn ? "Go to dashboard" : "Sign up or sign in";
  const accountText = isLoggedIn ? "Dashboard" : "Sign up / Sign in";
  const menuCtaLabel = isLoggedIn ? "Dashboard" : "Get Started";

  return (
    <header
      data-site-header
      className="site-header sticky top-0 z-50 border-b border-white/10 bg-black"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-6 py-2 sm:px-8 md:flex md:justify-between md:gap-4 md:py-3">
        <button
          type="button"
          className="col-start-1 row-start-1 flex h-11 w-11 items-center justify-center justify-self-start rounded-xl border border-white/15 text-white transition-colors hover:border-accent/40 hover:text-accent md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <X size={22} weight="bold" />
          ) : (
            <List size={22} weight="bold" />
          )}
        </button>

        <div className="col-start-2 row-start-1 justify-self-center md:col-auto md:justify-self-start">
          <BrandLogo href="/" className="site-header__brand" />
        </div>

        <nav
          className="hidden items-center gap-7 text-sm font-medium text-white/75 md:flex"
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

        <div className="col-start-3 row-start-1 flex items-center justify-self-end md:col-auto">
          {loading ? (
            <div
              className="h-11 w-11 animate-pulse rounded-xl bg-white/10 md:w-36"
              aria-hidden
            />
          ) : (
            <Link
              href={accountHref}
              className="relative inline-flex h-11 w-11 items-center justify-center gap-2 rounded-xl border border-white/15 text-white transition-colors hover:border-accent/40 hover:text-accent md:w-auto md:px-3.5"
              aria-label={accountLabel}
            >
              <User size={20} weight="bold" aria-hidden />
              <span className="site-header__account-text hidden md:inline">
                {accountText}
              </span>
              {hasNotification && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500">
                  <Bell size={10} weight="bold" className="text-ink" />
                </span>
              )}
            </Link>
          )}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-nav"
        className={`mobile-nav-dialog${menuClosing ? " mobile-nav-dialog--closing" : ""}`}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          setMenuOpen(false);
          setMenuClosing(false);
          document.body.style.overflow = "";
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeMenu();
        }}
      >
        <div className="mobile-nav-dialog__panel">
          <div className="mobile-nav-dialog__header">
            <BrandLogo height={76} />
            <button
              type="button"
              onClick={closeMenu}
              className="mobile-nav-dialog__close"
              aria-label="Close menu"
            >
              <X size={22} weight="bold" />
            </button>
          </div>

          <nav className="mobile-nav-dialog__links" aria-label="Mobile">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="mobile-nav-dialog__link"
                style={{ animationDelay: `${0.04 + index * 0.045}s` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {!loading && (
            <Link
              href={accountHref}
              onClick={closeMenu}
              className="btn btn-accent mobile-nav-dialog__cta relative w-full px-6 py-3.5 text-base font-bold uppercase tracking-wide text-white"
            >
              {menuCtaLabel}
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
