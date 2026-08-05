const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const tmp = path.join(root, ".env.vercel.tmp");
const local = path.join(root, ".env.local");

execSync("npx vercel env pull .env.vercel.tmp --yes", {
  cwd: root,
  stdio: "inherit",
});

function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    let v = line.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[line.slice(0, i).trim()] = v;
  }
  return out;
}

const remote = parseEnv(fs.readFileSync(tmp, "utf8"));
let localText = fs.existsSync(local) ? fs.readFileSync(local, "utf8") : "";
const localEnv = parseEnv(localText);

const keys = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "DATABASE_URL",
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL_NON_POOLING",
];

const updates = [];
for (const key of keys) {
  if (remote[key] && !localEnv[key]) {
    updates.push(key);
    localText += (localText.endsWith("\n") ? "" : "\n") + key + "=" + remote[key] + "\n";
  } else if (remote[key] && localEnv[key] === "") {
    updates.push(key + "(replace_empty)");
    localText = localText.replace(
      new RegExp("^" + key + "=.*$", "m"),
      key + "=" + remote[key]
    );
  }
  console.log(
    key +
      ": remote=" +
      (remote[key] ? "len=" + remote[key].length : "missing") +
      " local=" +
      (localEnv[key] ? "len=" + localEnv[key].length : localEnv[key] === "" ? "empty" : "missing")
  );
}

if (updates.length) {
  fs.writeFileSync(local, localText);
  console.log("updated_local_keys=" + updates.join(","));
} else {
  console.log("no_local_updates");
}

fs.unlinkSync(tmp);
