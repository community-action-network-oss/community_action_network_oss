---
id: "02-u08"
plan: "02"
title: "Auth HTTP: cookies, CSRF, guards, /v1/me"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 16
depends_on: ["02-u07"]
writes: ["src/accounts/http/**","src/platform/security/**","src/accounts/accounts.module.ts","src/app.setup.ts","test/auth-http.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#5-auth-flow","docs/design/system-design.md#6-api-surface-v1","docs/spec/constitution/rules.md#ACCT-REQ-1","docs/spec/constitution/rules.md#IDENT-1"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/auth-http.e2e-spec.ts"]
founder_gate: false
defaults: "If the CSRF-exempt auth routes seem unsafe to the founder, require a GET /v1/csrf bootstrap instead; log it in docs/open-questions/ as OQ-csrf-bootstrap and keep the exemption."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Expose the auth flow over HTTP with web-safe sessions: httpOnly cookie, CSRF double submit, a global auth guard, role decorators, and the first endpoints /v1/auth/*, /v1/me and handle regenerate.

## Steps
1. Controllers with explicit @ApiOperation operationIds and DTO classes with @ApiProperty: POST /v1/auth/signup (signUp), POST /v1/auth/code (requestCode), POST /v1/auth/verify (verifyCode), POST /v1/auth/logout, GET /v1/me, POST /v1/me/handle/regenerate. Signup returns {handle}; requestCode returns {message: "If that address can sign in, we sent a code"}; no response schema anywhere contains an email field (IDENT-1).
2. Cookies on verify success: can_session (HttpOnly; SameSite=Lax; Path=/v1; Secure only when config.cookieSecure) and can_csrf (readable, SameSite=Lax, Path=/). With header X-CAN-Client: native the token is returned in the body and no cookies are set (native path is founder-gated for device verification; only the server side is built here).
3. src/platform/security/auth.guard.ts: global guard that resolves the session from the cookie or Authorization: Bearer (native), attaches {accountId, role} to the request, and returns 401 session_expired or unauthenticated. A @Public() decorator opts routes out; every non-GET route is non-public by default (ACCT-REQ-1). A @Roles(...) decorator and RolesGuard return 403 not_permitted.
4. src/platform/security/csrf.guard.ts: for POST, PATCH, PUT, DELETE with a cookie session, require header X-CAN-CSRF equal to the can_csrf cookie (constant-time); native bearer requests are exempt. Default decision: /v1/auth/signup, /code and /verify are exempt (credential exchange, protected by the rate limiter), logout and everything else require CSRF.
5. src/platform/security/rate-limiter.ts: interface RateLimiter {hit(key, limit, windowMs): Promise<boolean>} with an in-memory implementation. Apply per email (5 codes per 10 minutes) and per IP (20 per 10 minutes) on signup, code and verify; exceeding returns 429 rate_limited with Retry-After. Comment "ponytail: in-memory, per process; plan 07 makes it Postgres-backed".
6. configureApp: cookie parsing (add cookie-parser or parse manually), CORS with credentials: true for config.corsOrigins, allowed headers include X-CAN-CSRF and X-CAN-Client.
7. Tests (e2e, real DB and Mailpit): signup -> code from Mailpit -> verify sets cookies (assert HttpOnly flag on can_session and absence on can_csrf) -> GET /v1/me returns handle and role, no email -> POST without CSRF header returns 403 -> with header succeeds -> logout then /v1/me gives 401 session_expired. A route-table test enumerates all registered routes and asserts every non-GET route is non-public except the three auth exchange routes. Regenerate works once, the second call returns conflict.
8. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Cookie flags and CSRF behaviour are asserted in tests, not assumed.
- ACCT-REQ-1: the route-table test fails if a new non-GET route is added without an auth decision.
- IDENT-1 contract test: no schema in openapi.json has a property named email (inputs excepted: the request DTOs may carry email, response schemas may not).
- Rate limit returns 429 with the error envelope.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Steward sign-in specifics (OQ-moderator-signin).
- Postgres-backed limits (plan 07).
- Native device storage.
