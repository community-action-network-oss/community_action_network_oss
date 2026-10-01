---
id: "07-u02"
plan: "07"
title: "Postgres-backed rate limits on every write path"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 111
depends_on: ["04-u07", "09-u05", "09-u33", "10-u30"]
writes: ["src/platform/security/**","src/db/schema.ts","drizzle/**","src/**/http/**","test/rate-limits.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#5-auth-flow","docs/design/system-design.md#11-operations-notes","docs/spec/16-security-a11y-ops-testing.md","docs/spec/constitution/rules.md#ACCT-REQ-1"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/rate-limits.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Replace the in-memory limiter from plan 02 with a Postgres-backed one so limits survive restarts and multiple instances, and apply explicit limits to every write route.

## Steps
1. Table rate_limit_bucket (key text, window_start timestamptz, count int, primary key (key, window_start)); PostgresRateLimiter implements the RateLimiter interface using an atomic INSERT ... ON CONFLICT DO UPDATE returning count; a cleanup job on the shared job queue (09-u05, the same queue as the 03-u14 retention jobs) removes buckets older than 2 days. Keys hash the IP and the email (never stored raw).
2. A central table src/platform/security/limits.ts mapping operationId to {limit, windowSeconds, keyBy: "ip" | "account" | "email"} for every non-GET route and the heavy GETs (list): defaults: auth code 5 per email per 10 minutes and 20 per IP; signup 5 per IP per hour; verify 10 per email per 10 minutes; draft create 20 per day per account; contributions 30 per hour per account; appeals 3 per day per account; fill-assist calls (10-u30) 30 per hour per account (these also fall under the model spend caps of 09-u14); policy proposals (10-u32) 5 per day per account; label task answers 60 per hour per labeler; invites 20 per day per steward; list endpoints 120 per minute per IP. A test fails if a non-GET operationId is missing from the table.
3. Respond 429 {error:{code: "rate_limited"}} with Retry-After and X-RateLimit-Remaining headers; document 429 in OpenAPI via the shared ApiErrors decorator.
4. Trust proxy handling: client IP comes from req.ip with config.trustProxy; test that a spoofed X-Forwarded-For is ignored when trustProxy is false.
5. Tests with FixedClock: each class of limit trips at N plus one, resets after the window, keys are per email and per IP independently, restart simulation (new limiter instance sees the same counts), cleanup job.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Every write route has an explicit limit entry (test enumerates routes).
- Counts persist across limiter instances.
- No raw IP or email is stored.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- CAPTCHA or proof of work (not in slice 1).
- WAF or CDN rules (hosting is a founder decision).
