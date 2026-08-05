import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "aw_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

/**
 * Server-only credentials from env. Never sent to the browser.
 */
function getAdminUsername() {
  return process.env.ADMIN_USERNAME?.trim() || "";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

export function isAdminAuthConfigured() {
  return Boolean(getAdminUsername() && getAdminPassword() && getSessionSecret());
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
}

export function createAdminSessionToken(username: string) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${username}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(
  token: string | undefined | null
): { username: string } | null {
  if (!token || !getSessionSecret()) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [username, expRaw, sig] = parts;
  const payload = `${username}.${expRaw}`;
  const expected = sign(payload);

  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  if (username !== getAdminUsername()) return null;

  return { username };
}

export function validateAdminCredentials(username: string, password: string) {
  const expectedUser = getAdminUsername();
  const expectedPass = getAdminPassword();
  if (!expectedUser || !expectedPass) return false;

  const userOk =
    username.length === expectedUser.length &&
    timingSafeEqual(Buffer.from(username), Buffer.from(expectedUser));
  const passOk =
    password.length === expectedPass.length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(expectedPass));

  return userOk && passOk;
}

export function adminSessionCookieOptions(maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function getAdminSession() {
  const jar = await cookies();
  return verifyAdminSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdminSession() {
  if (!isAdminAuthConfigured()) {
    return {
      session: null as null,
      error: NextResponse.json(
        {
          error:
            "Admin auth is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.",
        },
        { status: 503 }
      ),
    };
  }

  const session = await getAdminSession();
  if (!session) {
    return {
      session: null as null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { session, error: null as null };
}
