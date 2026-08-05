/**
 * 1) Ensure service role is in .env.local
 * 2) Push required env vars to Vercel (production + preview + development)
 * 3) Attempt SQL apply via every available method
 * Never prints secret values.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync, spawnSync } = require("child_process");

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

function loadEnv(file) {
  if (!fs.existsSync(file)) return {};
  const env = {};
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    env[line.slice(0, i).trim()] = stripQuotes(line.slice(i + 1));
  }
  return env;
}

function upsertEnv(file, key, value) {
  let text = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  const re = new RegExp("^" + key + "=.*$", "m");
  if (re.test(text)) text = text.replace(re, key + "=" + value);
  else text += (text.endsWith("\n") || text.length === 0 ? "" : "\n") + key + "=" + value + "\n";
  fs.writeFileSync(file, text);
}

async function runSql(projectRef, serviceKey, sql, label) {
  const attempts = [
    {
      name: "database-v1",
      url: `https://${projectRef}.supabase.co/database/v1/query`,
      body: { query: sql },
    },
    {
      name: "pg-meta",
      url: `https://${projectRef}.supabase.co/pg-meta/default/query`,
      body: { query: sql },
    },
    {
      name: "pg",
      url: `https://${projectRef}.supabase.co/pg/query`,
      body: { query: sql },
    },
  ];

  for (const a of attempts) {
    const res = await fetch(a.url, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: "Bearer " + serviceKey,
        "Content-Type": "application/json",
        "X-Connection-Encrypted": "true",
      },
      body: JSON.stringify(a.body),
    });
    const text = await res.text();
    console.log(label + "_" + a.name + "_status=" + res.status);
    if (res.ok) {
      console.log(label + "_OK");
      return true;
    }
    console.log(label + "_fail_prefix=" + text.slice(0, 160));
  }
  return false;
}

function vercelEnvSet(key, value, environment) {
  // echo value into vercel env add
  const result = spawnSync(
    "npx",
    ["vercel", "env", "add", key, environment, "--force"],
    {
      cwd: root,
      input: value + "\n",
      encoding: "utf8",
      shell: true,
    }
  );
  console.log(
    "VERCEL_ENV_" +
      environment +
      "_" +
      key +
      "_status=" +
      (result.status === 0 ? "ok" : "fail")
  );
  if (result.status !== 0) {
    console.log((result.stderr || result.stdout || "").slice(0, 300));
  }
}

(async () => {
  const serviceKey = process.argv[2] || loadEnv(envPath).SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error("no_service_key");
    process.exit(1);
  }

  upsertEnv(envPath, "SUPABASE_SERVICE_ROLE_KEY", serviceKey);

  // Ensure admin env exists
  const env = loadEnv(envPath);
  if (!env.ADMIN_SESSION_SECRET) {
    upsertEnv(
      envPath,
      "ADMIN_SESSION_SECRET",
      require("crypto").randomBytes(32).toString("hex")
    );
  }
  if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
    console.error("missing_ADMIN_USERNAME_or_ADMIN_PASSWORD_in_env");
    process.exit(1);
  }

  const fresh = loadEnv(envPath);
  const url = fresh.NEXT_PUBLIC_SUPABASE_URL;
  const anon = fresh.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const projectRef = new URL(url).hostname.split(".")[0];
  console.log("PROJECT_REF=" + projectRef);
  console.log("SERVICE_KEY_LEN=" + serviceKey.length);

  // Pull production env for DATABASE_URL
  try {
    execFileSync(
      "npx",
      ["vercel", "env", "pull", ".env.vercel.prod.tmp", "--environment=production", "--yes"],
      { cwd: root, stdio: "inherit", shell: true }
    );
    const prod = loadEnv(path.join(root, ".env.vercel.prod.tmp"));
    for (const k of [
      "DATABASE_URL",
      "POSTGRES_URL",
      "POSTGRES_URL_NON_POOLING",
      "POSTGRES_PRISMA_URL",
    ]) {
      console.log(k + "_prod=" + (prod[k] ? "present" : "missing"));
      if (prod[k] && !fresh[k]) upsertEnv(envPath, k, prod[k]);
    }
    fs.unlinkSync(path.join(root, ".env.vercel.prod.tmp"));
  } catch (e) {
    console.log("PROD_ENV_PULL_FAIL=" + e.message);
  }

  const afterPull = loadEnv(envPath);
  const dbUrl =
    afterPull.POSTGRES_URL_NON_POOLING ||
    afterPull.DATABASE_URL ||
    afterPull.POSTGRES_URL ||
    afterPull.POSTGRES_PRISMA_URL;

  const backupSql = fs.readFileSync(
    path.join(root, "supabase", "backup-plans-before-rls.sql"),
    "utf8"
  );
  const rlsSql = fs.readFileSync(
    path.join(root, "supabase", "migrations", "20260805_enable_plans_rls.sql"),
    "utf8"
  );

  let applied = false;
  if (dbUrl) {
    console.log("TRY_PSQL_VIA_PG_PACKAGE");
    try {
      execFileSync("npm", ["install", "pg", "--no-save"], {
        cwd: root,
        stdio: "inherit",
        shell: true,
      });
      const { Client } = require("pg");
      const client = new Client({
        connectionString: dbUrl,
        ssl: { rejectUnauthorized: false },
      });
      await client.connect();
      await client.query(backupSql);
      console.log("BACKUP_APPLIED=true");
      await client.query(rlsSql);
      console.log("RLS_APPLIED=true");
      await client.end();
      applied = true;
    } catch (e) {
      console.log("PG_APPLY_FAIL=" + e.message);
    }
  } else {
    console.log("NO_DATABASE_URL");
    applied = await runSql(projectRef, serviceKey, backupSql, "BACKUP");
    const rls = await runSql(projectRef, serviceKey, rlsSql, "RLS");
    applied = applied && rls;
  }

  // Push env to Vercel
  const adminUser = afterPull.ADMIN_USERNAME;
  const adminPass = afterPull.ADMIN_PASSWORD;
  const adminSecret =
    afterPull.ADMIN_SESSION_SECRET ||
    require("crypto").randomBytes(32).toString("hex");
  if (!adminUser || !adminPass) {
    console.error("missing_admin_creds_for_vercel_push");
    process.exit(1);
  }
  if (!afterPull.ADMIN_SESSION_SECRET) {
    upsertEnv(envPath, "ADMIN_SESSION_SECRET", adminSecret);
  }

  for (const environment of ["production", "preview", "development"]) {
    vercelEnvSet("SUPABASE_SERVICE_ROLE_KEY", serviceKey, environment);
    vercelEnvSet("ADMIN_USERNAME", adminUser, environment);
    vercelEnvSet("ADMIN_PASSWORD", adminPass, environment);
    vercelEnvSet("ADMIN_SESSION_SECRET", adminSecret, environment);
  }

  // Verify anon lock
  const probe = await fetch(
    url.replace(/\/$/, "") + "/rest/v1/plans?select=id&limit=1",
    {
      headers: { apikey: anon, Authorization: "Bearer " + anon },
    }
  );
  const body = await probe.text();
  const locked =
    probe.status === 401 ||
    probe.status === 403 ||
    body.trim() === "[]";
  console.log("ANON_STATUS=" + probe.status);
  console.log("ANON_LOCKED=" + String(locked));
  console.log("SQL_APPLIED=" + String(applied));

  if (!applied) {
    process.exit(4);
  }
  if (!locked) {
    process.exit(5);
  }
  console.log("SUCCESS");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
