"use client";

import {
  formatCheckoutMoney,
  getCheckoutCurrencyCode,
  showsLocalCurrency,
} from "@/app/lib/checkout-currency";
import { useVisitorCountry } from "@/app/hooks/useVisitorCountry";
import { useLiveFxRates } from "@/app/hooks/useLiveFxRates";
import { PACKAGE_TERM_MONTHS, getPackageTotalUsd } from "@/app/data/packages";

type LocalizedPackagePriceProps = {
  usdPrice: number;
  usdTotal?: number;
  usdValue?: number;
  size?: "card" | "detail";
};

export function LocalizedPackagePrice({
  usdPrice,
  usdTotal,
  usdValue,
  size = "card",
}: LocalizedPackagePriceProps) {
  const { countryCode, ready: countryReady } = useVisitorCountry();
  const { rates, ready: fxReady, source } = useLiveFxRates();
  const ready = countryReady && fxReady;
  const totalUsd = usdTotal ?? getPackageTotalUsd(usdPrice);
  const total = formatCheckoutMoney(totalUsd, countryCode, rates);
  const monthly = formatCheckoutMoney(usdPrice, countryCode, rates);
  const value =
    usdValue != null ? formatCheckoutMoney(usdValue, countryCode, rates) : null;
  const local = showsLocalCurrency(countryCode);
  const currencyCode = getCheckoutCurrencyCode(countryCode);
  const priceClassName =
    currencyCode === "PKR"
      ? "package-card__price package-card__price--pkr"
      : "package-card__price";

  if (size === "detail") {
    return (
      <div style={{ opacity: ready ? 1 : 0.7 }}>
        <div className="mt-2 flex items-end gap-1">
          <span className={priceClassName}>{total}</span>
          <span className="mb-1 text-sm text-muted">
            / {PACKAGE_TERM_MONTHS} months
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">
          Paid in full · {monthly}/mo equivalent
        </p>
        {value ? (
          <p className="mt-1 text-sm text-muted">Total value {value}</p>
        ) : null}
        {local ? (
          <p className="mt-2 text-xs text-muted">
            Shown in {currencyCode} for your location
            {source === "live" ? " · live rate" : ""}.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="package-card__pricing" style={{ opacity: ready ? 1 : 0.7 }}>
      <div className="package-card__price-row">
        <span className={priceClassName}>{total}</span>
        <span className="package-card__period">
          / {PACKAGE_TERM_MONTHS} months
        </span>
      </div>
      <p className="package-card__billing">
        Paid in full · {monthly}/mo equivalent
      </p>
      {local ? (
        <p className="package-card__billing" style={{ opacity: 0.8 }}>
          {currencyCode} · based on your location
          {source === "live" ? " · live rate" : ""}
        </p>
      ) : null}
    </div>
  );
}
