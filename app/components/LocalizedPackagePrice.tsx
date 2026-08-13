"use client";

import {
  formatCheckoutMoney,
  getCheckoutCurrencyCode,
  showsLocalCurrency,
} from "@/app/lib/checkout-currency";
import { useVisitorCountry } from "@/app/hooks/useVisitorCountry";
import { useLiveFxRates } from "@/app/hooks/useLiveFxRates";

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
  const monthly = formatCheckoutMoney(usdPrice, countryCode, rates);
  const total =
    usdTotal != null ? formatCheckoutMoney(usdTotal, countryCode, rates) : null;
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
          <span className={priceClassName}>{monthly}</span>
          <span className="mb-1 text-sm text-muted">/ month</span>
        </div>
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
        <span className={priceClassName}>{monthly}</span>
        <span className="package-card__period">/ month</span>
      </div>
      {total ? (
        <p className="package-card__billing">
          {total} total · 6-month commitment
        </p>
      ) : null}
      {local ? (
        <p className="package-card__billing" style={{ opacity: 0.8 }}>
          {currencyCode} · based on your location
          {source === "live" ? " · live rate" : ""}
        </p>
      ) : null}
    </div>
  );
}
