/**
 * Verify production admin auth + plans after deploy. Never prints secrets.
 */
const fs = require("fs");
const path = require("path");

function loadEnv(file) {
  if (!fs.existsSync(file)) return {};
  const env = {};
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    let v = line.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    env[line.slice(0, i).trim()] = v;
  }
  return env;
}

(async () => {
  const env = loadEnv(path.join(__dirname, "..", ".env.local"));
  const base = "https://athleticwolf.com";

  const session = await fetch(base + "/api/admin/session");
  console.log("session_status=" + session.status);

  const bad = await fetch(base + "/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "x", password: "y" }),
  });
  console.log("bad_login_status=" + bad.status);

  const login = await fetch(base + "/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: env.ADMIN_USERNAME,
      password: env.ADMIN_PASSWORD,
    }),
  });
  const loginBody = await login.text();
  console.log("login_status=" + login.status);
  console.log("login_ok=" + String(login.status === 200));
  console.log("login_has_username=" + String(loginBody.includes('"username"')));

  const cookie = (login.headers.getSetCookie?.() || [])[0] || "";
  const cookieHeader = cookie.split(";")[0];
  console.log("cookie_set=" + String(Boolean(cookieHeader)));

  const plans = await fetch(base + "/api/admin/plans", {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  const plansBody = await plans.text();
  let count = 0;
  try {
    count = (JSON.parse(plansBody).plans || []).length;
  } catch {
    count = -1;
  }
  console.log("plans_status=" + plans.status);
  console.log("plans_count=" + count);

  const anon = await fetch(
    env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, "") +
      "/rest/v1/plans?select=id&limit=1",
    {
      headers: {
        apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: "Bearer " + env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    }
  );
  const anonBody = await anon.text();
  const locked = anon.status === 401 || anon.status === 403 || anonBody.trim() === "[]";
  console.log("anon_status=" + anon.status);
  console.log("anon_locked=" + String(locked));
  console.log("EMAIL_ISSUE_RESOLVED=" + String(locked));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
