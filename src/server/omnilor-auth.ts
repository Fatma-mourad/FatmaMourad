const encoder = new TextEncoder();
export const cookieName = "omnilor_access";
export const sessionSeconds = 3600;

export type OmnilorSecrets = { password: string; sessionSecret: string };

export function configuredSecrets(): OmnilorSecrets | null {
  const password = process.env["OMNILOR_PASSWORD"];
  const sessionSecret = process.env["OMNILOR_SESSION_SECRET"];
  return password && sessionSecret && sessionSecret.length >= 32
    ? { password, sessionSecret }
    : null;
}

function hex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function equal(a: string, b: string) {
  let difference = a.length ^ b.length;
  for (let index = 0; index < Math.max(a.length, b.length); index++) {
    difference |= (a.charCodeAt(index) || 0) ^ (b.charCodeAt(index) || 0);
  }
  return difference === 0;
}

export async function verifyPassword(candidate: string, secrets: OmnilorSecrets) {
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(candidate)),
    crypto.subtle.digest("SHA-256", encoder.encode(secrets.password)),
  ]);
  return equal(hex(a), hex(b));
}

async function signature(value: string, secrets: OmnilorSecrets) {
  // Including the password invalidates existing sessions on password rotation.
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(JSON.stringify([secrets.sessionSecret, secrets.password])),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return hex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export async function createSession(secrets: OmnilorSecrets, now = Date.now()) {
  const expires = Math.floor(now / 1000) + sessionSeconds;
  const value = `v1.${expires}.${crypto.randomUUID()}`;
  return `${value}.${await signature(value, secrets)}`;
}

export async function authorized(request: Request, secrets: OmnilorSecrets, now = Date.now()) {
  const token = request.headers
    .get("cookie")
    ?.split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${cookieName}=`))
    ?.slice(cookieName.length + 1);
  if (!token || token.length > 256) return false;
  const parts = token.split(".");
  if (parts.length !== 4 || parts[0] !== "v1") return false;
  const expires = Number(parts[1]);
  const seconds = Math.floor(now / 1000);
  if (!Number.isSafeInteger(expires) || expires <= seconds || expires > seconds + sessionSeconds)
    return false;
  const value = parts.slice(0, 3).join(".");
  return equal(parts[3]!, await signature(value, secrets));
}

export function sessionCookie(token: string, request: Request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${cookieName}=${token}; Path=/api/omnilor; HttpOnly; SameSite=Strict; Max-Age=${sessionSeconds}${secure}`;
}
