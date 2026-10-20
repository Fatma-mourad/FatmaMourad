import "@tanstack/react-start/server-only";
import {
  authorized,
  configuredSecrets,
  createSession,
  sessionCookie,
  verifyPassword,
} from "./omnilor-auth";
import project from "./omnilor-content.json";
// Inline imports stay inside the server bundle: Vite must never emit public copies.
import image02 from "./private-assets/omnilor-02.png?inline";
import image03 from "./private-assets/omnilor-03.png?inline";
import image04 from "./private-assets/omnilor-04.png?inline";
import image05 from "./private-assets/omnilor-05.png?inline";
import image06 from "./private-assets/omnilor-06.png?inline";
import legacyImage from "./private-assets/omni 2.png?inline";
import prototype from "./private-assets/Omnilor Prototype.mp4?inline";
import cover from "../assets/omnilor-mockup-01.jpg?inline";
import legacyPanel from "./archive/omnilor-panel.txt?raw";
import legacyProject from "./archive/omnilor-project.txt?raw";
import legacyCaseStudy from "./archive/omnilor-case-study.tsx.txt?raw";

const media: Record<string, string> = {
  "02": image02,
  "03": image03,
  "04": image04,
  "05": image05,
  "06": image06,
  cover,
  prototype,
  "legacy-image": legacyImage,
};
const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  Vary: "Cookie",
};

function json(data: unknown, status = 200, extra: Record<string, string> = {}) {
  return Response.json(data, { status, headers: { ...privateHeaders, ...extra } });
}

// Best-effort instance-level throttling; configure platform rate limits for distributed protection.
const attempts = new Map<string, { count: number; reset: number }>();
function throttled(request: Request) {
  const now = Date.now();
  for (const [key, value] of attempts) if (value.reset <= now) attempts.delete(key);
  const key =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("cf-connecting-ip") ??
    "shared";
  const entry = attempts.get(key) ?? { count: 0, reset: now + 60_000 };
  entry.count++;
  if (attempts.size >= 10000 && !attempts.has(key)) return true;
  attempts.set(key, entry);
  return entry.count > 10;
}

export async function handleOmnilor(request: Request): Promise<Response | undefined> {
  const path = new URL(request.url).pathname;
  if (path !== "/api/omnilor" && !path.startsWith("/api/omnilor/")) return undefined;
  const secrets = configuredSecrets();
  if (!secrets)
    return json({ error: "Project access is not configured. Please contact me for access." }, 503);

  if (path === "/api/omnilor/unlock") {
    if (request.method !== "POST")
      return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
    if (
      request.headers.get("origin") !== new URL(request.url).origin ||
      !request.headers.get("content-type")?.startsWith("application/json")
    ) {
      return json({ error: "Invalid request origin." }, 403);
    }
    if (throttled(request))
      return json({ error: "Too many attempts. Please wait a minute and try again." }, 429, {
        "Retry-After": "60",
      });
    if (Number(request.headers.get("content-length")) > 4096)
      return json({ error: "Invalid request." }, 413);
    let body: unknown;
    try {
      const text = await request.text();
      if (text.length > 4096) return json({ error: "Invalid request." }, 413);
      body = JSON.parse(text);
    } catch {
      return json({ error: "Invalid request." }, 400);
    }
    const password = (body as { password?: unknown } | null)?.password;
    if (
      typeof password !== "string" ||
      password.length > 1024 ||
      !(await verifyPassword(password, secrets))
    ) {
      return json({ error: "Incorrect password. Please try again." }, 401);
    }
    return json(project, 200, {
      "Set-Cookie": sessionCookie(await createSession(secrets), request),
    });
  }
  if (!(await authorized(request, secrets)))
    return json({ error: "Please unlock this project first." }, 401);
  if (request.method !== "GET" && request.method !== "HEAD")
    return json({ error: "Method not allowed." }, 405, { Allow: "GET, HEAD" });
  if (path === "/api/omnilor/content") return json(project);
  // Retain the original case-study material privately as well as the current panel.
  if (path === "/api/omnilor/archive") return json({ legacyPanel, legacyProject, legacyCaseStudy });
  if (path.startsWith("/api/omnilor/media/")) {
    const id = path.slice("/api/omnilor/media/".length);
    const asset = Object.hasOwn(media, id) ? media[id] : undefined;
    if (!asset) return json({ error: "Not found." }, 404);
    const match = /^data:([^;,]+);base64,(.*)$/s.exec(asset);
    if (!match) throw new Error("Protected media was not inlined in the server bundle.");
    const bytes = Uint8Array.from(atob(match[2]!), (character) => character.charCodeAt(0));
    return new Response(request.method === "HEAD" ? null : bytes, {
      headers: {
        ...privateHeaders,
        "Content-Type": match[1]!,
        "Content-Length": String(bytes.length),
      },
    });
  }
  return json({ error: "Not found." }, 404);
}
