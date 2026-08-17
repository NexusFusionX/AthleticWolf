"use client";

import Link from "next/link";
import type { PackageChangeType } from "@/app/lib/package-change";
import {
  chargesInLocalCurrency,
  formatCheckoutMoney,
  getCheckoutCurrencyCode,
  getStripeChargeCurrencyCode,
  showsLocalCurrency,
} from "@/app/lib/checkout-currency";
import { useLiveFxRates } from "@/app/hooks/useLiveFxRates";
import { PACKAGE_TERM_MONTHS, getPackageTotalUsd } from "@/app/data/packages";

type CheckoutOrderSummaryProps = {
  packageName: string;
  pricePerMonth: number;
  subtotalDueToday: number;
  totalDueToday: number;
  countryCode: string;
  promoCode?: string;
  promoDiscountAmount?: number;
  changeType?: PackageChangeType | null;
  currentPackageName?: string;
};

export function CheckoutOrderSummary({
  packageName,
  pricePerMonth,
  totalDueToday,
  countryCode,
  promoCode,
  promoDiscountAmount = 0,
  changeType,
  currentPackageName,
}: CheckoutOrderSummaryProps) {
  const { rates, source } = useLiveFxRates();
  const isUpgrade = changeType === "upgrade";
  const isDowngrade = changeType === "downgrade";
  const formatMoney = (amount: number) =>
    formatCheckoutMoney(amount, countryCode, rates);
  const packageTotal = getPackageTotalUsd(pricePerMonth);

  return (
    <aside className="checkout-summary">
      <p className="checkout-summary__eyebrow">Order summary</p>
      <p className="checkout-summary__plan">{packageName}</p>
      <p className="checkout-summary__term">
        {PACKAGE_TERM_MONTHS}-month coaching · paid in full
      </p>

      {showsLocalCurrency(countryCode) ? (
        <p className="checkout-summary__currency-note">
          {chargesInLocalCurrency(countryCode)
            ? `Prices and card payment in ${getCheckoutCurrencyCode(countryCode)}${source === "live" ? " (live rate)" : ""}.`
            : `Prices shown in ${getCheckoutCurrencyCode(countryCode)}. Card payment is charged in ${getStripeChargeCurrencyCode(countryCode)}.`}
        </p>
      ) : null}

      {isUpgrade && currentPackageName ? (
        <p className="checkout-summary__note">
          Upgrading from {currentPackageName}
        </p>
      ) : null}

      {isDowngrade && currentPackageName ? (
        <p className="checkout-summary__note">
          Downgrading from {currentPackageName}
        </p>
      ) : null}

      <dl className="checkout-summary__rows">
        {!isUpgrade && !isDowngrade ? (
          <>
            <div className="checkout-summary__row">
              <dt>Program term</dt>
              <dd>{PACKAGE_TERM_MONTHS} months</dd>
            </div>
            <div className="checkout-summary__row">
              <dt>Package total</dt>
              <dd>{formatMoney(packageTotal)}</dd>
            </div>
          </>
        ) : null}
        {promoDiscountAmount > 0 && promoCode ? (
          <div className="checkout-summary__row checkout-summary__row--discount">
            <dt>Promo ({promoCode})</dt>
            <dd>-{formatMoney(promoDiscountAmount)}</dd>
          </div>
        ) : null}
        <div className="checkout-summary__row checkout-summary__row--total">
          <dt>Total due today</dt>
          <dd>{formatMoney(totalDueToday)}</dd>
        </div>
      </dl>

      {isDowngrade ? (
        <p className="checkout-summary__fine">
          No charge today. See our{" "}
          <Link href="/refund" className="text-accent hover:text-accent-light">
            Refund Policy
          </Link>{" "}
          for credits.
        </p>
      ) : isUpgrade ? (
        <p className="checkout-summary__fine">
          You pay only the prepaid package difference today.
        </p>
      ) : (
        <p className="checkout-summary__fine">
          Full {PACKAGE_TERM_MONTHS}-month package due today
          {pricePerMonth > 0
            ? ` (${formatMoney(pricePerMonth)}/mo equivalent)`
            : ""}
          .
        </p>
      )}
    </aside>
  );
}
