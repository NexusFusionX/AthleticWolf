import fs from "node:fs";

const map = {
  AD: "EUR", AE: "AED", AF: "AFN", AG: "XCD", AI: "XCD", AL: "ALL", AM: "AMD", AO: "AOA", AQ: "USD", AR: "ARS", AS: "USD", AT: "EUR", AU: "AUD", AW: "AWG", AX: "EUR", AZ: "AZN",
  BA: "BAM", BB: "BBD", BD: "BDT", BE: "EUR", BF: "XOF", BG: "BGN", BH: "BHD", BI: "BIF", BJ: "XOF", BL: "EUR", BM: "BMD", BN: "BND", BO: "BOB", BQ: "USD", BR: "BRL", BS: "BSD", BT: "BTN", BV: "NOK", BW: "BWP", BY: "BYN", BZ: "BZD",
  CA: "CAD", CC: "AUD", CD: "CDF", CF: "XAF", CG: "XAF", CH: "CHF", CI: "XOF", CK: "NZD", CL: "CLP", CM: "XAF", CN: "CNY", CO: "COP", CR: "CRC", CU: "CUP", CV: "CVE", CW: "ANG", CX: "AUD", CY: "EUR", CZ: "CZK",
  DE: "EUR", DJ: "DJF", DK: "DKK", DM: "XCD", DO: "DOP", DZ: "DZD", EC: "USD", EE: "EUR", EG: "EGP", EH: "MAD", ER: "ERN", ES: "EUR", ET: "ETB", FI: "EUR", FJ: "FJD", FK: "FKP", FM: "USD", FO: "DKK", FR: "EUR",
  GA: "XAF", GB: "GBP", GD: "XCD", GE: "GEL", GF: "EUR", GG: "GBP", GH: "GHS", GI: "GIP", GL: "DKK", GM: "GMD", GN: "GNF", GP: "EUR", GQ: "XAF", GR: "EUR", GS: "GBP", GT: "GTQ", GU: "USD", GW: "XOF", GY: "GYD",
  HK: "HKD", HM: "AUD", HN: "HNL", HR: "EUR", HT: "HTG", HU: "HUF", ID: "IDR", IE: "EUR", IL: "ILS", IM: "GBP", IN: "INR", IO: "USD", IQ: "IQD", IR: "IRR", IS: "ISK", IT: "EUR", JE: "GBP", JM: "JMD", JO: "JOD", JP: "JPY",
  KE: "KES", KG: "KGS", KH: "KHR", KI: "AUD", KM: "KMF", KN: "XCD", KP: "KPW", KR: "KRW", KW: "KWD", KY: "KYD", KZ: "KZT", LA: "LAK", LB: "LBP", LC: "XCD", LI: "CHF", LK: "LKR", LR: "LRD", LS: "LSL", LT: "EUR", LU: "EUR", LV: "EUR", LY: "LYD",
  MA: "MAD", MC: "EUR", MD: "MDL", ME: "EUR", MF: "EUR", MG: "MGA", MH: "USD", MK: "MKD", ML: "XOF", MM: "MMK", MN: "MNT", MO: "MOP", MP: "USD", MQ: "EUR", MR: "MRU", MS: "XCD", MT: "EUR", MU: "MUR", MV: "MVR", MW: "MWK", MX: "MXN", MY: "MYR", MZ: "MZN",
  NA: "NAD", NC: "XPF", NE: "XOF", NF: "AUD", NG: "NGN", NI: "NIO", NL: "EUR", NO: "NOK", NP: "NPR", NR: "AUD", NU: "NZD", NZ: "NZD", OM: "OMR", PA: "PAB", PE: "PEN", PF: "XPF", PG: "PGK", PH: "PHP", PK: "PKR", PL: "PLN", PM: "EUR", PN: "NZD", PR: "USD", PS: "ILS", PT: "EUR", PW: "USD", PY: "PYG",
  QA: "QAR", RE: "EUR", RO: "RON", RS: "RSD", RU: "RUB", RW: "RWF", SA: "SAR", SB: "SBD", SC: "SCR", SD: "SDG", SE: "SEK", SG: "SGD", SH: "SHP", SI: "EUR", SJ: "NOK", SK: "EUR", SL: "SLE", SM: "EUR", SN: "XOF", SO: "SOS", SR: "SRD", SS: "SSP", ST: "STN", SV: "USD", SX: "ANG", SY: "SYP", SZ: "SZL",
  TC: "USD", TD: "XAF", TF: "EUR", TG: "XOF", TH: "THB", TJ: "TJS", TK: "NZD", TL: "USD", TM: "TMT", TN: "TND", TO: "TOP", TR: "TRY", TT: "TTD", TV: "AUD", TW: "TWD", TZ: "TZS", UA: "UAH", UG: "UGX", UM: "USD", US: "USD", UY: "UYU", UZ: "UZS",
  VA: "EUR", VC: "XCD", VE: "VES", VG: "USD", VI: "USD", VN: "VND", VU: "VUV", WF: "XPF", WS: "WST", YE: "YER", YT: "EUR", ZA: "ZAR", ZM: "ZMW", ZW: "ZWL",
};

const rates = {
  USD: 1, EUR: 0.92, GBP: 0.79, PKR: 278, INR: 83, AED: 3.67, SAR: 3.75, CAD: 1.36, AUD: 1.53, JPY: 149, CNY: 7.24, BRL: 4.97, MXN: 17.1, ZAR: 18.5, NGN: 1550, BDT: 110, EGP: 48, TRY: 32, RUB: 92, KRW: 1320, SGD: 1.34, HKD: 7.82, CHF: 0.88, SEK: 10.5, NOK: 10.8, DKK: 6.87, PLN: 3.98, CZK: 23, HUF: 360, RON: 4.57, BGN: 1.8, ISK: 138, THB: 35, VND: 24500, IDR: 15700, MYR: 4.47, PHP: 56, TWD: 31, ARS: 875, CLP: 950, COP: 3950, PEN: 3.75, UAH: 41, ILS: 3.65, JOD: 0.71, KWD: 0.31, BHD: 0.38, OMR: 0.38, QAR: 3.64, AFN: 71, ALL: 93, AMD: 387, AOA: 910, AWG: 1.79, AZN: 1.7, BAM: 1.8, BBD: 2, BIF: 2850, BMD: 1, BND: 1.34, BOB: 6.9, BSD: 1, BTN: 83, BWP: 13.6, BYN: 3.27, BZD: 2, CDF: 2750, CRC: 510, CUP: 24, CVE: 100, DJF: 178, DOP: 58, DZD: 134, ERN: 15, ETB: 56, FJD: 2.25, FKP: 0.79, GEL: 2.7, GHS: 14, GIP: 0.79, GMD: 67, GNF: 8600, GTQ: 7.8, GYD: 209, HNL: 24.7, HTG: 132, IQD: 1310, IRR: 42000, JMD: 155, KES: 129, KGS: 89, KHR: 4100, KMF: 450, KPW: 900, KYD: 0.83, KZT: 450, LAK: 20500, LBP: 89000, LKR: 300, LRD: 190, LSL: 18.5, LYD: 4.8, MAD: 10, MDL: 17.8, MGA: 4500, MKD: 57, MMK: 2100, MNT: 3400, MOP: 8.05, MRU: 39.5, MUR: 46, MVR: 15.4, MWK: 1700, MZN: 64, NAD: 18.5, NIO: 36.7, NPR: 133, NZD: 1.66, PAB: 1, PGK: 3.8, PYG: 7300, RSD: 108, RWF: 1300, SBD: 8.4, SCR: 13.5, SDG: 600, SHP: 0.79, SLE: 22, SOS: 570, SRD: 35, SSP: 130, STN: 22.5, SYP: 13000, SZL: 18.5, TJS: 10.9, TMT: 3.5, TND: 3.1, TOP: 2.35, TTD: 6.8, TZS: 2600, UGX: 3800, UYU: 39, UZS: 12600, VES: 36.5, VUV: 119, WST: 2.7, XAF: 600, XCD: 2.7, XOF: 600, XPF: 110, YER: 250, ZMW: 27, ZWL: 322, ANG: 1.79,
};

const zero = ["BIF", "CLP", "DJF", "GNF", "ISK", "JPY", "KMF", "KRW", "LAK", "PYG", "RWF", "UGX", "VND", "XAF", "XOF", "XPF", "IDR", "HUF", "IRR", "IQD", "UZS", "VUV", "TWD", "CRC", "MGA", "MMK", "SOS", "TZS", "KZT"];
const three = ["BHD", "IQD", "JOD", "KWD", "LYD", "OMR", "TND"];

fs.writeFileSync(
  "app/data/country-to-currency.ts",
  `export const COUNTRY_TO_CURRENCY: Record<string, string> = ${JSON.stringify(map, null, 2)} as const;

export function getCurrencyCodeForCountry(countryCode: string) {
  const normalized = countryCode.trim().toUpperCase();
  return COUNTRY_TO_CURRENCY[normalized] ?? "USD";
}
`
);

fs.writeFileSync(
  "app/data/currency-rates.ts",
  `export const USD_EXCHANGE_RATES: Record<string, number> = ${JSON.stringify(rates, null, 2)} as const;

export const ZERO_DECIMAL_CURRENCIES = new Set<string>(${JSON.stringify(zero)});

export const THREE_DECIMAL_CURRENCIES = new Set<string>(${JSON.stringify(three)});
`
);

console.log("Generated currency data files.");
