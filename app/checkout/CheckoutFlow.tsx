"use client";

import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { CheckoutSkeleton } from "@/app/components/PageSkeleton";
import { CheckoutSteps } from "@/app/components/CheckoutSteps";
import { StripeCheckoutPayment } from "@/app/components/StripeCheckoutPayment";
import { CheckoutPackagePicker } from "@/app/components/CheckoutPackagePicker";
import { CheckoutContactFields } from "@/app/components/CheckoutContactFields";
import { CheckoutAccountFields } from "@/app/components/CheckoutAccountFields";
import { CheckoutInlineLogin } from "@/app/components/CheckoutInlineLogin";
import { CheckoutOrderSummary } from "@/app/components/CheckoutOrderSummary";
import { CheckoutPromoCode } from "@/app/components/CheckoutPromoCode";
import { CheckoutTermsAcceptance } from "@/app/components/CheckoutTermsAcceptance";
import { CheckoutTrustBadges } from "@/app/components/CheckoutTrustBadges";
import { packages } from "../data/packages";
import type { PromoCodeDefinition } from "@/app/data/promo-codes";
import { findCountryByCode } from "@/app/data/countries";
import { applyPromoDiscount } from "@/app/lib/promo-code";
import {
  formatChargeMoney,
  formatCheckoutMoney,
} from "@/app/lib/checkout-currency";
import { clearPendingAssessment } from "@/app/lib/assessment";
import {
  type CheckoutContact,
  isCheckoutContactComplete,
} from "@/app/lib/checkout-contact";
import {
  findPackageByName,
  getPackageChangeType,
} from "@/app/lib/package-change";
import { persistVisitorCountry } from "@/app/hooks/useVisitorCountry";
import { useLiveFxRates } from "@/app/hooks/useLiveFxRates";

const DEFAULT_PACKAGE =
  packages.find((p) => p.featured)?.name ?? packages[0].name;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CheckoutStep = "plan" | "payment";
type GuestAuthMode = "signup" | "login";

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export function CheckoutFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageFromUrl = searchParams.get("package");
  const initialPackage =
    packages.find((p) => p.name === packageFromUrl)?.name ?? DEFAULT_PACKAGE;

  const [selectedPackageName, setSelectedPackageName] = useState(initialPackage);
  const pkg = packages.find((p) => p.name === selectedPackageName);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [existingPlan, setExistingPlan] = useState<any>(null);
  const [changeError, setChangeError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoadError, setAuthLoadError] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("plan");
  const [guestAuthMode, setGuestAuthMode] = useState<GuestAuthMode>("signup");
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [contact, setContact] = useState<CheckoutContact>(() => {
    let storedCountry = "";
    if (typeof window !== "undefined") {
      try {
        const value = window.localStorage.getItem("aw_visitor_country");
        const normalized = value?.trim().toUpperCase() ?? "";
        if (normalized && findCountryByCode(normalized)) {
          storedCountry = normalized;
        }
      } catch {
        // ignore
      }
    }
    return {
      firstName: "",
      lastName: "",
      countryCode: storedCountry,
      contactChannel: "phone",
      phone: "",
      email: "",
      preferredContact: "WhatsApp",
    };
  });
  const [appliedPromo, setAppliedPromo] = useState<PromoCodeDefinition | null>(
    null
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { rates } = useLiveFxRates();

  function handleContactChange(next: CheckoutContact) {
    if (
      next.countryCode &&
      next.countryCode !== contact.countryCode &&
      findCountryByCode(next.countryCode)
    ) {
      persistVisitorCountry(next.countryCode, { manual: true });
    }
    setContact(next);
  }

  const contactComplete = useMemo(
    () => isCheckoutContactComplete(contact),
    [contact]
  );

  const actionType = existingPlan && pkg
    ? getPackageChangeType(existingPlan.package_name, pkg.name)
    : null;
  const currentPackage = existingPlan
    ? findPackageByName(existingPlan.package_name)
    : null;
  const upgradeDifference =
    currentPackage && pkg && actionType === "upgrade"
      ? pkg.price - currentPackage.price
      : null;

  const resolvedAccountEmail =
    contact.contactChannel === "email"
      ? contact.email.trim()
      : accountEmail.trim();

  const accountReady =
    Boolean(user) ||
    (guestAuthMode === "login"
      ? EMAIL_PATTERN.test(resolvedAccountEmail) && accountPassword.length >= 6
      : EMAIL_PATTERN.test(resolvedAccountEmail) && accountPassword.length >= 6);

  const canContinuePlanStep =
    contactComplete &&
    termsAccepted &&
    (Boolean(user) ||
      (guestAuthMode === "signup" && accountReady && !user)) &&
    actionType !== "same";

  const subtotalDueToday =
    actionType === "upgrade" && upgradeDifference != null
      ? upgradeDifference
      : actionType === "downgrade"
        ? 0
        : pkg?.price ?? 0;

  const promoDiscountAmount =
    appliedPromo && subtotalDueToday > 0
      ? subtotalDueToday - applyPromoDiscount(subtotalDueToday, appliedPromo.percentOff)
      : 0;

  const totalDueToday =
    appliedPromo && subtotalDueToday > 0
      ? applyPromoDiscount(subtotalDueToday, appliedPromo.percentOff)
      : subtotalDueToday;

  const paymentAmountLabel = formatChargeMoney(
    totalDueToday,
    contact.countryCode,
    rates
  );

  useEffect(() => {
    if (!packageFromUrl) {
      router.replace(
        `/checkout?package=${encodeURIComponent(DEFAULT_PACKAGE)}`,
        { scroll: false }
      );
    }
  }, [packageFromUrl, router]);

  useEffect(() => {
    if (packageFromUrl && packageFromUrl !== selectedPackageName) {
      const match = packages.find((p) => p.name === packageFromUrl);
      if (match) {
        setSelectedPackageName(match.name);
      }
    }
  }, [packageFromUrl, selectedPackageName]);

  useEffect(() => {
    if (contact.contactChannel === "email" && contact.email) {
      setAccountEmail(contact.email);
    }
  }, [contact.contactChannel, contact.email]);

  useEffect(() => {
    let cancelled = false;

    async function detectCountryFromIp() {
      try {
        // Prefer browser/VPN IP; localhost server geo often stays on Pakistan.
        let countryCode = "";
        try {
          const browserRes = await fetch("https://ipwho.is/", { cache: "no-store" });
          if (browserRes.ok) {
            const browserData = (await browserRes.json()) as {
              country_code?: string;
              success?: boolean;
            };
            if (browserData.success !== false) {
              countryCode = browserData.country_code?.trim().toUpperCase() ?? "";
            }
          }
        } catch {
          // Fall through to server geo.
        }

        if (!countryCode || !findCountryByCode(countryCode)) {
          const response = await fetch("/api/geo/country");
          if (!response.ok || cancelled) return;
          const data: { countryCode?: string | null } = await response.json();
          countryCode = data.countryCode?.trim().toUpperCase() ?? "";
        }

        if (!countryCode || !findCountryByCode(countryCode) || cancelled) {
          return;
        }

        setContact((current) => {
          if (current.countryCode) return current;
          persistVisitorCountry(countryCode);
          return { ...current, countryCode };
        });
      } catch {
        // Geo detection is best-effort only.
      }
    }

    detectCountryFromIp();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (contact.countryCode) {
      persistVisitorCountry(contact.countryCode);
    }
  }, [contact.countryCode]);

  useEffect(() => {
    async function checkAuth() {
      if (!isSupabaseConfigured()) {
        setAuthLoadError(
          "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
        );
        setLoading(false);
        return;
      }

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        const authUser = session?.user ?? null;
        setUser(authUser);

        if (authUser?.email) {
          setAccountEmail(authUser.email);
        }

        if (authUser?.user_metadata) {
          const meta = authUser.user_metadata;
          const fromMeta = splitFullName(
            (meta.full_name as string) || (meta.name as string) || ""
          );
          setContact((prev) => ({
            ...prev,
            firstName: prev.firstName || fromMeta.firstName,
            lastName: prev.lastName || fromMeta.lastName,
            phone: prev.phone || (meta.phone as string) || "",
          }));
        }

        if (authUser) {
          const { data: existingPlanData, error: planError } = await supabase
            .from("plans")
            .select("*")
            .eq("user_id", authUser.id)
            .maybeSingle();

          if (planError) {
            console.error("Checkout plan lookup failed:", planError);
          } else if (existingPlanData) {
            setExistingPlan(existingPlanData);
          }
        }
      } catch (error) {
        console.error("Checkout auth load failed:", error);
        setAuthLoadError(
          "Could not reach authentication service. Check your internet connection and Supabase settings, then refresh."
        );
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  function handlePackageSelect(packageName: string) {
    setSelectedPackageName(packageName);
    router.replace(`/checkout?package=${encodeURIComponent(packageName)}`, {
      scroll: false,
    });
  }

  async function loadExistingPlan(authUserId: string) {
    const { data: existingPlanData } = await supabase
      .from("plans")
      .select("*")
      .eq("user_id", authUserId)
      .maybeSingle();
    setExistingPlan(existingPlanData ?? null);
  }

  async function handleGuestSignIn() {
    setAuthError(null);
    setProcessing(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: resolvedAccountEmail,
        password: accountPassword,
      });

      if (error) {
        setAuthError(error.message);
        setProcessing(false);
        return;
      }

      setUser(data.user);
      if (data.user) {
        await loadExistingPlan(data.user.id);
      }
      setGuestAuthMode("signup");
      setProcessing(false);
    } catch {
      setAuthError("Could not sign in. Please try again.");
      setProcessing(false);
    }
  }

  async function handleContinueToPayment() {
    if (!pkg || !canContinuePlanStep) return;

    setAuthError(null);
    setChangeError(null);

    if (!user) {
      if (guestAuthMode !== "signup") {
        setAuthError("Sign in first, then continue to payment.");
        return;
      }

      setProcessing(true);

      try {
        const fullName = [contact.firstName.trim(), contact.lastName.trim()]
          .filter(Boolean)
          .join(" ");

        const { data, error } = await supabase.auth.signUp({
          email: resolvedAccountEmail,
          password: accountPassword,
          options: {
            data: {
              first_name: contact.firstName.trim(),
              last_name: contact.lastName.trim() || null,
              full_name: fullName || contact.firstName.trim(),
            },
          },
        });

        if (error) {
          setAuthError(error.message);
          setProcessing(false);
          return;
        }

        setUser(data.user);
        if (data.user) {
          await loadExistingPlan(data.user.id);
        }
      } catch {
        setAuthError("Could not create your account. Please try again.");
        setProcessing(false);
        return;
      }

      setProcessing(false);
    }

    setCheckoutStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handlePaymentSuccess() {
    clearPendingAssessment();
    if (existingPlan) {
      window.location.href = "/dashboard";
      return;
    }
    window.location.href = `/quiz?package=${encodeURIComponent(selectedPackageName)}`;
  }

  async function handleDowngradeConfirm() {
    if (!pkg || !user || !existingPlan || actionType !== "downgrade") return;

    setProcessing(true);
    setChangeError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setChangeError("Your session expired. Please sign in again.");
        setProcessing(false);
        return;
      }

      const response = await fetch("/api/plans/change-package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          packageName: pkg.name,
          checkoutContact: contact,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setChangeError(data.error ?? "Could not change your package.");
        setProcessing(false);
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setChangeError("Something went wrong. Please try again.");
      setProcessing(false);
    }
  }

  if (loading) {
    return <CheckoutSkeleton />;
  }

  if (!pkg) {
    return (
      <div className="checkout-shell">
        <div className="checkout-card checkout-card--centered">
          <h1 className="font-display text-3xl">No Package Selected</h1>
          <p className="mt-3 text-muted">
            Head back to the packages section and pick a plan to check out.
          </p>
          <Link
            href="/#packages"
            className="btn btn-accent mt-6 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
          >
            View Packages
          </Link>
        </div>
      </div>
    );
  }

  const summary = (
    <CheckoutOrderSummary
      packageName={pkg.name}
      pricePerMonth={pkg.price}
      subtotalDueToday={subtotalDueToday}
      totalDueToday={totalDueToday}
      countryCode={contact.countryCode}
      promoCode={appliedPromo?.code}
      promoDiscountAmount={promoDiscountAmount}
      changeType={actionType}
      currentPackageName={existingPlan?.package_name}
    />
  );

  const termsAcceptanceSection =
    actionType !== "same" ? (
      <CheckoutTermsAcceptance
        checked={termsAccepted}
        onChange={setTermsAccepted}
      />
    ) : null;

  const planContinueActions = (
    <div className="checkout-plan-actions">
      {(authError || changeError) && guestAuthMode === "signup" ? (
        <p className="checkout-error">{authError ?? changeError}</p>
      ) : null}

      {!canContinuePlanStep && actionType !== "same" ? (
        <p className="checkout-hint">
          {!contactComplete
            ? !contact.firstName.trim()
              ? "Complete your personal details to continue."
              : !contact.countryCode.trim()
                ? "Select your country to continue."
                : "Complete your personal details to continue."
            : !termsAccepted
              ? "Accept the Terms of Service, Privacy Policy, and Refund Policy to continue."
              : !user && !accountReady
                ? guestAuthMode === "login"
                  ? "Sign in to continue."
                  : "Add a valid email and password to create your account."
                : "Ready when you are."}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleContinueToPayment}
        disabled={processing || !canContinuePlanStep}
        className="btn btn-accent font-display checkout-continue w-full px-8 py-3.5 text-base text-white disabled:opacity-50"
      >
        {processing
          ? "Please wait..."
          : actionType === "downgrade"
            ? "Continue to confirm"
            : "Continue to payment"}
      </button>
    </div>
  );

  return (
    <div className="checkout-shell">
      <div className="checkout-card">
        <header className="checkout-header">
          <div className="checkout-header__top">
            {checkoutStep === "payment" ? (
              <button
                type="button"
                onClick={() => setCheckoutStep("plan")}
                className="checkout-back"
              >
                <ArrowLeft size={16} weight="bold" aria-hidden />
                Back
              </button>
            ) : (
              <Link href="/#packages" className="checkout-back">
                <ArrowLeft size={16} weight="bold" aria-hidden />
                Back
              </Link>
            )}
            <Link href="/" className="checkout-header__brand font-display">
              Athletic<span className="text-accent">Wolf</span>
            </Link>
          </div>

          <CheckoutSteps current={checkoutStep} />

          <div className="checkout-header__copy">
            <p className="checkout-header__eyebrow">Checkout</p>
            <h1 className="checkout-header__title font-display">
              {checkoutStep === "plan"
                ? "Account & plan"
                : actionType === "downgrade"
                  ? "Confirm package change"
                  : "Secure payment"}
            </h1>
          </div>
        </header>

        <div className="checkout-layout">
          <div className="checkout-main">
            {authLoadError ? (
              <p className="checkout-error">{authLoadError}</p>
            ) : null}

            {checkoutStep === "plan" ? (
              <>
                <CheckoutContactFields value={contact} onChange={handleContactChange} />

                {!user ? (
                  guestAuthMode === "login" ? (
                    <CheckoutInlineLogin
                      email={resolvedAccountEmail}
                      password={accountPassword}
                      loading={processing}
                      error={authError}
                      onEmailChange={setAccountEmail}
                      onPasswordChange={setAccountPassword}
                      onSubmit={handleGuestSignIn}
                      onCreateAccountClick={() => {
                        setGuestAuthMode("signup");
                        setAuthError(null);
                      }}
                    />
                  ) : (
                    <CheckoutAccountFields
                      email={resolvedAccountEmail}
                      password={accountPassword}
                      hideEmail={contact.contactChannel === "email"}
                      onEmailChange={setAccountEmail}
                      onPasswordChange={setAccountPassword}
                      onSignInClick={() => {
                        setGuestAuthMode("login");
                        setAuthError(null);
                      }}
                    />
                  )
                ) : null}

                <CheckoutPackagePicker
                  selectedName={selectedPackageName}
                  countryCode={contact.countryCode}
                  onSelect={handlePackageSelect}
                />

                {existingPlan && actionType === "same" ? (
                  <p className="checkout-note">
                    You are already on the {existingPlan.package_name} package.
                    Pick a different plan above to upgrade or downgrade.
                  </p>
                ) : null}

                {existingPlan && actionType === "downgrade" ? (
                  <p className="checkout-note">
                    Downgrading to {pkg.name} does not require payment. Confirm
                    on the next step. Refunds for price differences are handled
                    manually — see our{" "}
                    <Link href="/refund" className="text-accent hover:text-accent-light">
                      Refund Policy
                    </Link>
                    .
                  </p>
                ) : null}

                {actionType !== "downgrade" && actionType !== "same" ? (
                  <CheckoutPromoCode
                    appliedPromo={appliedPromo}
                    onApply={setAppliedPromo}
                  />
                ) : null}

                <div className="checkout-desktop-only">
                  {termsAcceptanceSection}
                  {planContinueActions}
                </div>
              </>
            ) : (
              <>
                {existingPlan && actionType === "upgrade" && upgradeDifference != null ? (
                  <div className="checkout-note checkout-note--panel">
                    <p className="font-semibold">Package upgrade</p>
                    <p className="mt-2 text-sm text-muted">
                      Upgrading from {existingPlan.package_name} to {pkg.name}.
                      You pay {formatCheckoutMoney(upgradeDifference, contact.countryCode, rates)} today — the monthly
                      price difference only.
                    </p>
                  </div>
                ) : null}

                {changeError ? (
                  <p className="checkout-error">{changeError}</p>
                ) : null}

                {actionType === "downgrade" ? (
                  <div className="checkout-payment-panel">
                    <p className="text-sm font-semibold">Confirm downgrade</p>
                    <p className="mt-2 text-sm text-muted">
                      Your plan will switch to {pkg.name} immediately. No payment
                      is collected on this step.
                    </p>
                    <button
                      type="button"
                      onClick={handleDowngradeConfirm}
                      disabled={processing}
                      className="btn btn-accent font-display mt-6 w-full px-8 py-3.5 text-base text-white disabled:opacity-50"
                    >
                      {processing
                        ? "Updating package..."
                        : `Confirm downgrade to ${pkg.name}`}
                    </button>
                  </div>
                ) : (
                  <StripeCheckoutPayment
                    key={`${selectedPackageName}-${actionType ?? "new"}-${appliedPromo?.code ?? "none"}-${contact.countryCode || "none"}`}
                    packageName={pkg.name}
                    promoCode={appliedPromo?.code}
                    countryCode={contact.countryCode}
                    amountLabel={paymentAmountLabel}
                    paymentDescription={
                      actionType === "upgrade" && existingPlan
                        ? `Upgrade payment for ${pkg.name}. Difference from your ${existingPlan.package_name} plan.`
                        : undefined
                    }
                    checkoutContact={contact}
                    contactComplete
                    onSuccess={handlePaymentSuccess}
                  />
                )}
              </>
            )}
          </div>

          <aside className="checkout-sidebar">
            <div className="checkout-sidebar__summary">{summary}</div>
            <CheckoutTrustBadges />
          </aside>
        </div>

        <div className="checkout-mobile-summary">
          {summary}
          {checkoutStep === "plan" ? (
            <>
              {termsAcceptanceSection}
              {planContinueActions}
              <CheckoutTrustBadges />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
