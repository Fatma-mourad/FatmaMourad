# Omnilor project access on Vercel

The Selected Work card and its cover image are intentionally public. Omnilor's
panel details, gallery screenshots, original case-study material, and prototype
are served only by authenticated server endpoints. The old `/work/omnilor` route
redirects to `/work?project=omnilor`, which opens the same access screen.

## Configure access

In Vercel ? Project ? Settings ? Environment Variables, set these **server-only**
variables for each environment where access should work:

- `OMNILOR_PASSWORD`: the password you will share with reviewers. Use a long,
  unique password.
- `OMNILOR_SESSION_SECRET`: an independent random secret of at least 32 characters.
  Generate one locally with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.

Do not prefix either variable with `VITE_` and do not commit either value.
Redeploy after adding or changing the variables. Missing configuration fails
closed with a service-unavailable response; there is no fallback password.

The build uses Nitro's Vercel server preset. Deploy the full application with
`npm run build`, not just a static output directory. The large private media files
are embedded in the server bundle, not copied to Vercel's static assets. Rebuild
on Vercel rather than deploying the Windows-generated build artifacts.

For local development, supply these variables in the shell that launches
`npm run dev`. Vite does not automatically copy non-`VITE_` variables from `.env`
into the server process. Use local development on a trusted machine only: Vite's
development source server is not a production access boundary.

## Behavior and limits

- Unlocking verifies the password on the server and returns project content.
- Media requests independently verify a signed, one-hour session cookie. On
  HTTPS it is `Secure`, `HttpOnly`, and `SameSite=Strict`.
- Content/media responses use `private, no-store` and disable CDN caching.
- The unlock endpoint accepts only same-origin JSON POST requests and applies
  best-effort instance-level throttling (10 attempts per minute). For distributed
  abuse protection, configure a Vercel Firewall rate-limit rule for
  `/api/omnilor/unlock`; instance-level limits do not span all server replicas.
- Closing the panel clears its client content and prompts for a password next
  time; the signed media cookie remains valid until expiry. Rotating either
  environment variable invalidates existing sessions.
- The visible card cover cannot be private while it is displayed publicly.
- Previously published deployments, cached downloads, and public repository
  copies cannot be revoked by this code. Remove old public Vercel deployments
  containing unprotected files if those copies must no longer be accessible.
- A reviewer who has access can save the content. Password access is not DRM.

Keep private assets under `src/server/private-assets` and import them with
`?inline` **only from the server-only module**. Never import private files from a
client component or add them to `public`. The original case-study content is
retained in `src/server/archive` and is available through an authenticated archive
endpoint.

## Verification

Run on Node 24 (the Vercel preset's runtime):

```sh
npm run build
node --test --test-isolation=none tests/omnilor-auth.test.mjs tests/omnilor-delivery.test.mjs
npx tsc --noEmit
```

The delivery tests exercise the actual built Vercel handler: configuration fails
closed, wrong credentials/origins are rejected, cookies are required for all
private media, tampered/expired sessions fail, throttling works, the old route
redirects, other work stays public, and private material is absent from static
output. Test credentials are local test fixtures only and are never deployed.
