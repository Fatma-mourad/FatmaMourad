import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const serverRoot = ".vercel/output/functions/__server.func";
const { default: app } = await import(pathToFileURL(`${process.cwd()}/${serverRoot}/index.mjs`));
const handleOmnilor = (request) => app.fetch(request);
const origin = "https://portfolio.example";
function request(path, options = {}) {
  return new Request(`${origin}/api/omnilor/${path}`, options);
}
let cookie;
test("protected content delivery", async () => {
  delete process.env.OMNILOR_PASSWORD;
  delete process.env.OMNILOR_SESSION_SECRET;
  assert.equal((await handleOmnilor(request("content"))).status, 503);
  process.env.OMNILOR_PASSWORD = "test-only-password";
  process.env.OMNILOR_SESSION_SECRET = "test-only-session-secret-with-at-least-32-characters";
  for (const path of ["content", "media/02", "media/prototype", "archive"])
    assert.equal((await handleOmnilor(request(path))).status, 401);
  assert.equal(
    (
      await handleOmnilor(
        request("unlock", {
          method: "POST",
          headers: { Origin: "https://evil.example", "Content-Type": "application/json" },
          body: '{"password":"test-only-password"}',
        }),
      )
    ).status,
    403,
  );
  const unlock = (password) =>
    request("unlock", {
      method: "POST",
      headers: { Origin: origin, "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
  assert.equal((await handleOmnilor(unlock("wrong"))).status, 401);
  const response = await handleOmnilor(unlock("test-only-password"));
  assert.equal(response.status, 200);
  cookie = response.headers.get("set-cookie").split(";")[0];
  const project = await response.json();
  assert.equal(project.role, "UI/UX Design");
  assert.equal(project.images.length, 6);
  for (const path of [
    "content",
    "media/cover",
    "media/02",
    "media/03",
    "media/04",
    "media/05",
    "media/06",
    "media/prototype",
    "media/legacy-image",
    "archive",
  ]) {
    const media = await handleOmnilor(request(path, { headers: { cookie } }));
    assert.equal(media.status, 200, path);
    assert.match(media.headers.get("cache-control"), /no-store/);
    if (path.startsWith("media/")) assert.ok((await media.arrayBuffer()).byteLength > 1000);
  }
  assert.equal(
    (await handleOmnilor(request("media/unknown", { headers: { cookie } }))).status,
    404,
  );
  assert.equal(
    (await handleOmnilor(request("content", { headers: { cookie: cookie + "tampered" } }))).status,
    401,
  );
  for (let i = 0; i < 12; i++) await handleOmnilor(unlock("wrong"));
  assert.equal((await handleOmnilor(unlock("wrong"))).status, 429);
});
test("public artifacts contain no private media or case-study content", async () => {
  const paths = await readdir(".vercel/output/static", { recursive: true });
  for (const name of paths) {
    assert.doesNotMatch(
      name,
      /omnilor-0[2-6]|Omnilor Prototype|omni 2|omnilor-content|omnilor\.server/,
    );
    if (!/\.(js|json|html|map)$/.test(name)) continue;
    const text = await readFile(`.vercel/output/static/${name}`, "utf8");
    for (const privateText of [
      "Designing a clear, well-structured dashboard while ensuring effective collaboration",
      "I gained experience in dashboard design, developer handoff",
      "OMNILOR_PASSWORD",
      "OMNILOR_SESSION_SECRET",
      "North Field Oil",
      "A transparent care journey",
    ])
      assert.ok(!text.includes(privateText), `${name} leaked ${privateText}`);
  }
});

test("work page stays public and the legacy Omnilor route redirects to the gate", async () => {
  const response = await app.fetch(new Request(`${origin}/work`));
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes("Omnilor"));
  assert.ok(html.includes("PayLink"));
  assert.ok(!html.includes("I gained experience in dashboard design"));
  const legacy = await app.fetch(new Request(`${origin}/work/omnilor`));
  assert.ok([301, 302, 303, 307, 308].includes(legacy.status));
  assert.ok(legacy.headers.get("location").includes("project=omnilor"));
});
