"use client";

import Link from "next/link";
import type { PackageChangeType } from "@/app/lib/package-change";
import { formatUsd } from "@/app/lib/package-change";

type CheckoutOrderSummaryProps = {
  packageName: string;
  pricePerMonth: number;
  subtotalDueToday: number;
  totalDueToday: number;
  promoCode?: string;
  promoDiscountAmount?: number;
  changeType?: PackageChangeType | null;
  currentPackageName?: string;
};

export function CheckoutOrderSummary({
  packageName,
  pricePerMonth,
  subtotalDueToday,
  totalDueToday,
  promoCode,
  promoDiscountAmount = 0,
  changeType,
  currentPackageName,
}: CheckoutOrderSummaryProps) {
  const isUpgrade = changeType === "upgrade";
  const isDowngrade = changeType === "downgrade";

  return (
    <aside className="checkout-summary">
      <p className="checkout-summary__eyebrow">Order summary</p>
      <p className="checkout-summary__plan">{packageName}</p>
      <p className="checkout-summary__term">6-month coaching · billed monthly</p>

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
        <div className="checkout-summary__row">
          <dt>Monthly rate</dt>
          <dd>{formatUsd(pricePerMonth)}/mo</dd>
        </div>
        {!isUpgrade && !isDowngrade ? (
          <div className="checkout-summary__row">
            <dt>Program term</dt>
            <dd>6 months</dd>
          </div>
        ) : null}
        {promoDiscountAmount > 0 && promoCode ? (
          <div className="checkout-summary__row checkout-summary__row--discount">
            <dt>Promo ({promoCode})</dt>
            <dd>-{formatUsd(promoDiscountAmount)}</dd>
          </div>
        ) : null}
        <div className="checkout-summary__row checkout-summary__row--total">
          <dt>Total due today</dt>
          <dd>{formatUsd(totalDueToday)}</dd>
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
          You pay only the monthly price difference today.
        </p>
      ) : (
        <p className="checkout-summary__fine">
          First month due today. {formatUsd(pricePerMonth * 6)} total over 6
          months.
        </p>
      )}
    </aside>
  );
}
