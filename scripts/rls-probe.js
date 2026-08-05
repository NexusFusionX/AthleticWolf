/**
 * Post-RLS verification with anon key only. Never prints secrets.
 * After migration: anon SELECT should return [] (no row payloads).
 */
const fs = require("fs");
const path = require("path");

function stripQuotes(v) {
  if (!v) return v;
  const t = v.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1);
  }
  return t;
}

const envPath = path.join(__dirname, "..", ".env.local");
const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), stripQuotes(l.slice(i + 1))];
    })
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !anon) {
  console.error("missing_env");
  process.exit(1);
}

const host = new URL(url).host;
const base = url.replace(/\/$/, "");

async function main() {
  const res = await fetch(
    base + "/rest/v1/plans?select=id,user_id,package_name,status&limit=1",
    {
      headers: {
        apikey: anon,
        Authorization: "Bearer " + anon,
      },
    }
  );
  const text = await res.text();
  console.log("REQUEST");
  console.log(
    "GET https://" +
      host +
      "/rest/v1/plans?select=id,user_id,package_name,status&limit=1"
  );
  console.log("Headers: apikey/Authorization = REDACTED_ANON_KEY");
  console.log("RESPONSE status=" + res.status);
  console.log("body=" + text.slice(0, 200));

  let rows = [];
  try {
    rows = JSON.parse(text || "[]");
  } catch {
    rows = null;
  }

  const locked =
    res.status === 401 ||
    res.status === 403 ||
    (Array.isArray(rows) && rows.length === 0);

  console.log("ANON_LOCKED=" + String(locked));
  if (!locked) {
    console.log(
      "FAIL: anon can still see plan rows. Run supabase/migrations/20260805_enable_plans_rls.sql"
    );
    process.exit(2);
  }
  console.log("PASS: anon cannot read plans rows");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
