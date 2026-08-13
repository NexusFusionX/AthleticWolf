import { getCurrencyCodeForCountry } from "@/app/data/country-to-currency";
import {
  THREE_DECIMAL_CURRENCIES,
  USD_EXCHANGE_RATES,
  ZERO_DECIMAL_CURRENCIES,
} from "@/app/data/currency-rates";
import { getLiveUsdExchangeRates, getRateFromUsd } from "@/app/lib/live-fx";

/**
 * Currencies we will charge through Stripe.
 * Display may still show other local currencies as approximate amounts;
 * non-chargeable ones fall back to USD at payment time.
 */
export const CHARGEABLE_CURRENCIES = new Set([
  "USD",
  "EUR",
  "GBP",
  "PKR",
  "AED",
  "CAD",
  "AUD",
  "INR",
  "SAR",
  "SGD",
  "CHF",
  "NZD",
  "JPY",
  "MXN",
  "BRL",
]);

type CheckoutCurrency = {
  code: string;
  rateFromUsd: number;
};

export type StripeChargeAmount = {
  amount: number;
  currency: string;
  currencyCode: string;
  chargedInLocalCurrency: boolean;
  rateFromUsd: number;
};

function getLocaleForCountry(countryCode: string, currencyCode: string) {
  const normalized = countryCode.trim().toUpperCase();
  const candidates = [
    `en-${normalized}`,
    `${normalized.toLowerCase()}-${normalized}`,
    "en",
  ];

  for (const locale of candidates) {
    try {
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
      }).format(1);
      return locale;
    } catch {
      // Try the next locale candidate.
    }
  }

  return "en";
}

/** Currencies whose symbol glyphs often fall back to a different font. */
const CODE_DISPLAY_CURRENCIES = new Set([
  "PKR",
  "INR",
  "LKR",
  "NPR",
  "BDT",
  "AED",
  "SAR",
  "QAR",
  "KWD",
  "BHD",
  "OMR",
  "EGP",
  "NGN",
]);

/** Round package prices to whole units for these (no paisa/cents clutter). */
const WHOLE_UNIT_DISPLAY_CURRENCIES = new Set([
  "PKR",
  "INR",
  "LKR",
  "NPR",
  "BDT",
  "JPY",
  "KRW",
  "VND",
  "IDR",
  "HUF",
  "CLP",
]);

function getFractionDigits(currencyCode: string, localAmount: number) {
  if (
    ZERO_DECIMAL_CURRENCIES.has(currencyCode) ||
    WHOLE_UNIT_DISPLAY_CURRENCIES.has(currencyCode)
  ) {
    return 0;
  }

  if (THREE_DECIMAL_CURRENCIES.has(currencyCode)) {
    return 3;
  }

  return Number.isInteger(localAmount) ? 0 : 2;
}

function formatCurrencyAmount(
  localAmount: number,
  currencyCode: string,
  countryCode: string
) {
  const fractionDigits = getFractionDigits(currencyCode, localAmount);
  const rounded =
    fractionDigits === 0
      ? Math.round(localAmount)
      : Number(localAmount.toFixed(fractionDigits));
  const locale = getLocaleForCountry(countryCode || "US", currencyCode);
  const currencyDisplay = CODE_DISPLAY_CURRENCIES.has(currencyCode)
    ? "code"
    : "symbol";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(rounded);
}

export function getCheckoutCurrency(
  countryCode: string,
  rates: Record<string, number> = USD_EXCHANGE_RATES
): CheckoutCurrency {
  const code = getCurrencyCodeForCountry(countryCode);
  const rateFromUsd = getRateFromUsd(code, rates);

  return { code, rateFromUsd };
}

export function convertUsdToLocal(
  usdAmount: number,
  countryCode: string,
  rates: Record<string, number> = USD_EXCHANGE_RATES
) {
  const currency = getCheckoutCurrency(countryCode, rates);
  return usdAmount * currency.rateFromUsd;
}

export function formatCheckoutMoney(
  usdAmount: number,
  countryCode: string,
  rates: Record<string, number> = USD_EXCHANGE_RATES
) {
  const normalizedCountry = countryCode.trim().toUpperCase();
  const currency = getCheckoutCurrency(normalizedCountry, rates);
  const localAmount = convertUsdToLocal(usdAmount, normalizedCountry, rates);
  return formatCurrencyAmount(localAmount, currency.code, normalizedCountry);
}

export function formatCheckoutMoneyParts(
  usdAmount: number,
  countryCode: string,
  rates: Record<string, number> = USD_EXCHANGE_RATES
) {
  const normalizedCountry = countryCode.trim().toUpperCase();
  const currency = getCheckoutCurrency(normalizedCountry, rates);
  const localAmount = convertUsdToLocal(usdAmount, normalizedCountry, rates);
  const fractionDigits = getFractionDigits(currency.code, localAmount);
  const rounded =
    fractionDigits === 0
      ? Math.round(localAmount)
      : Number(localAmount.toFixed(fractionDigits));
  const locale = getLocaleForCountry(normalizedCountry || "US", currency.code);
  const currencyDisplay = CODE_DISPLAY_CURRENCIES.has(currency.code)
    ? "code"
    : "symbol";

  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.code,
    currencyDisplay,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).formatToParts(rounded);

  const currencyLabel = parts
    .filter((part) => part.type === "currency")
    .map((part) => part.value)
    .join("")
    .trim();

  const amountLabel = parts
    .filter((part) => part.type !== "currency")
    .map((part) => part.value)
    .join("")
    .trim();

  return {
    currencyCode: currency.code,
    currencyLabel: currencyLabel || currency.code,
    amountLabel: amountLabel || String(Math.round(localAmount)),
    full: formatCheckoutMoney(usdAmount, countryCode, rates),
  };
}

export function showsLocalCurrency(countryCode: string) {
  if (!countryCode.trim()) return false;
  return getCheckoutCurrency(countryCode).code !== "USD";
}

export function getCheckoutCurrencyCode(countryCode: string) {
  return getCheckoutCurrency(countryCode).code;
}

export function isChargeableCurrency(currencyCode: string) {
  return CHARGEABLE_CURRENCIES.has(currencyCode.trim().toUpperCase());
}

/** Currency used for Stripe PaymentIntents for this country. */
export function getStripeChargeCurrencyCode(countryCode: string) {
  const local = getCheckoutCurrencyCode(countryCode);
  return isChargeableCurrency(local) ? local : "USD";
}

export function chargesInLocalCurrency(countryCode: string) {
  if (!countryCode.trim()) return false;
  const local = getCheckoutCurrencyCode(countryCode);
  return local !== "USD" && isChargeableCurrency(local);
}

/**
 * Convert a USD major-unit amount (e.g. 70) into Stripe's smallest
 * currency unit for the visitor's charge currency.
 */
export function convertUsdToStripeAmount(
  usdAmount: number,
  countryCode: string,
  rates: Record<string, number> = USD_EXCHANGE_RATES
): StripeChargeAmount {
  const currencyCode = getStripeChargeCurrencyCode(countryCode || "US");
  const rateFromUsd = getRateFromUsd(currencyCode, rates);
  const localAmount = usdAmount * rateFromUsd;
  const chargedInLocalCurrency =
    currencyCode !== "USD" && isChargeableCurrency(currencyCode);

  let amount: number;
  if (ZERO_DECIMAL_CURRENCIES.has(currencyCode)) {
    amount = Math.round(localAmount);
  } else if (THREE_DECIMAL_CURRENCIES.has(currencyCode)) {
    amount = Math.round(localAmount * 1000);
  } else {
    amount = Math.round(localAmount * 100);
  }

  return {
    amount: Math.max(amount, 0),
    currency: currencyCode.toLowerCase(),
    currencyCode,
    chargedInLocalCurrency,
    rateFromUsd,
  };
}

/** Server helper: convert using the latest live FX rates. */
export async function convertUsdToStripeAmountLive(
  usdAmount: number,
  countryCode: string
) {
  const fx = await getLiveUsdExchangeRates();
  return convertUsdToStripeAmount(usdAmount, countryCode, fx.rates);
}

/** Format using the currency Stripe will actually charge. */
export function formatChargeMoney(
  usdAmount: number,
  countryCode: string,
  rates: Record<string, number> = USD_EXCHANGE_RATES
) {
  const chargeCode = getStripeChargeCurrencyCode(countryCode || "US");
  if (chargeCode === "USD") {
    return formatCheckoutMoney(usdAmount, "US", rates);
  }
  return formatCheckoutMoney(usdAmount, countryCode, rates);
}
