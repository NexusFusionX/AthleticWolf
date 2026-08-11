import { getCurrencyCodeForCountry } from "@/app/data/country-to-currency";
import {
  THREE_DECIMAL_CURRENCIES,
  USD_EXCHANGE_RATES,
  ZERO_DECIMAL_CURRENCIES,
} from "@/app/data/currency-rates";

type CheckoutCurrency = {
  code: string;
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

function getFractionDigits(currencyCode: string, localAmount: number) {
  if (ZERO_DECIMAL_CURRENCIES.has(currencyCode)) {
    return 0;
  }

  if (THREE_DECIMAL_CURRENCIES.has(currencyCode)) {
    return 3;
  }

  return Number.isInteger(localAmount) ? 0 : 2;
}

export function getCheckoutCurrency(
  countryCode: string
): CheckoutCurrency {
  const code = getCurrencyCodeForCountry(countryCode);
  const rateFromUsd = USD_EXCHANGE_RATES[code] ?? 1;

  return { code, rateFromUsd };
}

export function convertUsdToLocal(usdAmount: number, countryCode: string) {
  const currency = getCheckoutCurrency(countryCode);
  return usdAmount * currency.rateFromUsd;
}

export function formatCheckoutMoney(usdAmount: number, countryCode: string) {
  const normalizedCountry = countryCode.trim().toUpperCase();
  const currency = getCheckoutCurrency(normalizedCountry);
  const localAmount = convertUsdToLocal(usdAmount, normalizedCountry);
  const fractionDigits = getFractionDigits(currency.code, localAmount);
  const locale = getLocaleForCountry(normalizedCountry || "US", currency.code);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(localAmount);
}

export function showsLocalCurrency(countryCode: string) {
  if (!countryCode.trim()) return false;
  return getCheckoutCurrency(countryCode).code !== "USD";
}

export function getCheckoutCurrencyCode(countryCode: string) {
  return getCheckoutCurrency(countryCode).code;
}
