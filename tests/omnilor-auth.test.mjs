import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createSession,
  authorized,
  cookieName,
  sessionCookie,
  verifyPassword,
} from "../src/server/omnilor-auth.ts";
const secrets = {
  password: "test-only-password",
  sessionSecret: "test-only-session-secret-with-at-least-32-characters",
};
const now = 1_800_000_000_000;
const request = (token) =>
  new Request("https://portfolio.example/api/omnilor/content", {
    headers: token ? { cookie: `${cookieName}=${token}` } : {},
  });
test("password verification rejects incorrect credentials", async () => {
  assert.equal(await verifyPassword(secrets.password, secrets), true);
  assert.equal(await verifyPassword("incorrect", secrets), false);
});
test("sessions require a valid signature and expire", async () => {
  const token = await createSession(secrets, now);
  assert.equal(await authorized(request(token), secrets, now), true);
  assert.equal(await authorized(request(), secrets, now), false);
  assert.equal(await authorized(request(token + "a"), secrets, now), false);
  assert.equal(await authorized(request(token), secrets, now + 3600_000), false);
  assert.equal(await authorized(request(token), { ...secrets, password: "rotated" }, now), false);
  assert.equal(
    await authorized(request(token), { ...secrets, sessionSecret: "rotated-secret" }, now),
    false,
  );
});
test("cookie is HTTP-only, same-site, and secure on HTTPS", () => {
  const cookie = sessionCookie("test", request());
  for (const attribute of [
    "HttpOnly",
    "SameSite=Strict",
    "Secure",
    "Path=/api/omnilor",
    "Max-Age=3600",
  ])
    assert.ok(cookie.includes(attribute));
});
