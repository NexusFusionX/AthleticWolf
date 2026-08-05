/**
 * Applies backup + RLS SQL using available credentials.
 * Never prints secret values.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.join(__dirname, "..");
const envPath = path.join(root, ".env.local");

function stripQuotes(v) {
  const t = (v || "").trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1);
  }
  return t;
}

function loadEnv() {
  const text = fs.readFileSync(envPath, "utf8");
  const env = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    env[line.slice(0, i).trim()] = stripQuotes(line.slice(i + 1));
  }
  return env;
}

function upsertEnv(key, value) {
  let text = fs.readFileSync(envPath, "utf8");
  const re = new RegExp("^" + key + "=.*$", "m");
  if (re.test(text)) {
    text = text.replace(re, key + "=" + value);
  } else {
    text += (text.endsWith("\n") ? "" : "\n") + key + "=" + value + "\n";
  }
  fs.writeFileSync(envPath, text);
}

async function tryManagementSql(projectRef, serviceKey, sql) {
  const endpoints = [
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    `https://${projectRef}.supabase.co/pg/query`,
  ];
  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          apikey: serviceKey,
          Authorization: "Bearer " + serviceKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: sql }),
      });
      const body = await res.text();
      console.log("SQL_ENDPOINT", url.includes("api.supabase.com") ? "management" : "pg", "status=" + res.status);
      if (res.ok) {
        console.log("SQL_OK body_prefix=" + body.slice(0, 200));
        return true;
      }
      console.log("SQL_FAIL body_prefix=" + body.slice(0, 200));
    } catch (e) {
      console.log("SQL_ERR", e.message);
    }
  }
  return false;
}

async function verifyAnonLocked(url, anon) {
  const res = await fetch(
    url.replace(/\/$/, "") + "/rest/v1/plans?select=id&limit=1",
    {
      headers: {
        apikey: anon,
        Authorization: "Bearer " + anon,
      },
    }
  );
  const text = await res.text();
  let rows = [];
  try {
    rows = JSON.parse(text);
  } catch {
    rows = null;
  }
  const locked =
    res.status === 401 ||
    res.status === 403 ||
    (Array.isArray(rows) && rows.length === 0);
  console.log("ANON_STATUS=" + res.status);
  console.log("ANON_BODY_PREFIX=" + text.slice(0, 120));
  console.log("ANON_LOCKED=" + String(locked));
  return locked;
}

async function verifyServiceCanRead(url, serviceKey) {
  const res = await fetch(
    url.replace(/\/$/, "") + "/rest/v1/plans?select=id&limit=1",
    {
      headers: {
        apikey: serviceKey,
        Authorization: "Bearer " + serviceKey,
      },
    }
  );
  const text = await res.text();
  console.log("SERVICE_READ_STATUS=" + res.status);
  console.log("SERVICE_READ_PREFIX=" + text.slice(0, 80));
  return res.ok;
}

(async () => {
  const provided = process.argv[2];
  if (!provided || provided.length < 40) {
    console.error("missing_key_arg");
    process.exit(1);
  }

  // Basic sanity: must be service_role JWT
  try {
    const payload = JSON.parse(
      Buffer.from(provided.split(".")[1], "base64url").toString("utf8")
    );
    console.log("KEY_ROLE=" + payload.role);
    console.log("KEY_REF=" + payload.ref);
    if (payload.role !== "service_role") {
      console.error("not_service_role");
      process.exit(2);
    }
  } catch {
    console.error("invalid_jwt");
    process.exit(2);
  }

  upsertEnv("SUPABASE_SERVICE_ROLE_KEY", provided);
  console.log("ENV_UPDATED=SUPABASE_SERVICE_ROLE_KEY");

  const env = loadEnv();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const projectRef = new URL(url).hostname.split(".")[0];

  const okService = await verifyServiceCanRead(url, serviceKey);
  if (!okService) {
    console.error("service_key_cannot_read_plans");
    process.exit(3);
  }

  const backupSql = fs.readFileSync(
    path.join(root, "supabase", "backup-plans-before-rls.sql"),
    "utf8"
  );
  const rlsSql = fs.readFileSync(
    path.join(root, "supabase", "migrations", "20260805_enable_plans_rls.sql"),
    "utf8"
  );

  console.log("TRY_APPLY_BACKUP");
  const backupOk = await tryManagementSql(projectRef, serviceKey, backupSql);
  console.log("TRY_APPLY_RLS");
  const rlsOk = await tryManagementSql(projectRef, serviceKey, rlsSql);

  if (!backupOk || !rlsOk) {
    // Fallback: use supabase CLI db execute if DATABASE_URL appears later
    console.log("DIRECT_SQL_APPLY=failed_need_dashboard_or_db_url");
  }

  const locked = await verifyAnonLocked(url, anon);
  if (!locked) {
    console.log("RLS_NOT_ACTIVE_YET");
    process.exit(4);
  }

  console.log("ALL_DONE_RLS_ACTIVE");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
