/**
 * Smoke-test charge-currency conversion math (mirrors app/lib/checkout-currency.ts).
 * Run: node scripts/verify-currency-charge.js
 */

const USD_EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  PKR: 278,
  AED: 3.67,
  CAD: 1.36,
  AUD: 1.53,
  JPY: 149,
};

const ZERO_DECIMAL = new Set(["JPY"]);
const THREE_DECIMAL = new Set(["BHD", "KWD", "OMR"]);
const CHARGEABLE = new Set([
  "USD",
  "EUR",
  "GBP",
  "PKR",
  "AED",
  "CAD",
  "AUD",
  "JPY",
]);

const COUNTRY_CURRENCY = {
  US: "USD",
  PK: "PKR",
  GB: "GBP",
  AE: "AED",
  JP: "JPY",
  AF: "AFN",
};

function chargeCurrency(country) {
  const local = COUNTRY_CURRENCY[country] || "USD";
  return CHARGEABLE.has(local) ? local : "USD";
}

function toStripe(usd, country) {
  const code = chargeCurrency(country);
  const local = usd * (USD_EXCHANGE_RATES[code] || 1);
  let amount;
  if (ZERO_DECIMAL.has(code)) amount = Math.round(local);
  else if (THREE_DECIMAL.has(code)) amount = Math.round(local * 1000);
  else amount = Math.round(local * 100);
  return { amount, currency: code.toLowerCase(), code };
}

function assertEq(actual, expected, label) {
  if (actual !== expected) {
    console.error("FAIL", label, { actual, expected });
    process.exit(1);
  }
  console.log("PASS", label, actual);
}

const us = toStripe(70, "US");
assertEq(us.amount, 7000, "US_70_cents");
assertEq(us.currency, "usd", "US_currency");

const pk = toStripe(70, "PK");
assertEq(pk.amount, Math.round(70 * 278 * 100), "PK_70_paisa");
assertEq(pk.currency, "pkr", "PK_currency");

const gb = toStripe(60, "GB"); // upgrade diff example
assertEq(gb.amount, Math.round(60 * 0.79 * 100), "GB_60_pence");
assertEq(gb.currency, "gbp", "GB_currency");

const jp = toStripe(70, "JP");
assertEq(jp.amount, Math.round(70 * 149), "JP_70_yen_zero_decimal");
assertEq(jp.currency, "jpy", "JP_currency");

const af = toStripe(70, "AF"); // AFN not chargeable → USD
assertEq(af.amount, 7000, "AF_fallback_usd_amount");
assertEq(af.currency, "usd", "AF_fallback_usd_currency");

// Promo 10% on Silver then convert
const promoUsd = 70 * 0.9;
const pkPromo = toStripe(promoUsd, "PK");
assertEq(pkPromo.amount, Math.round(promoUsd * 278 * 100), "PK_promo_10");

console.log("SUCCESS");
