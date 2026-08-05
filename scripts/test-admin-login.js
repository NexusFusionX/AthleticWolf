/**
 * Local admin login smoke test. Reads credentials from .env.local.
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
  const username = env.ADMIN_USERNAME;
  const password = env.ADMIN_PASSWORD;
  if (!username || !password) {
    console.error("missing_ADMIN_USERNAME_or_ADMIN_PASSWORD");
    process.exit(1);
  }

  const login = await fetch("http://localhost:3000/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const loginBody = await login.text();
  console.log("login_status=" + login.status);
  console.log("login_body=" + loginBody.slice(0, 200));
  console.log(
    "set_cookie=" +
      String(
        login.headers.getSetCookie?.() || login.headers.get("set-cookie") || ""
      ).slice(0, 80)
  );

  const cookie = (login.headers.getSetCookie?.() || [])[0] || "";
  const cookieHeader = cookie.split(";")[0];

  const plans = await fetch("http://localhost:3000/api/admin/plans", {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  const plansBody = await plans.text();
  console.log("plans_status=" + plans.status);
  console.log("plans_body_prefix=" + plansBody.slice(0, 160));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
