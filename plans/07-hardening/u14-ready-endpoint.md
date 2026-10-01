---
id: "07-u14"
plan: "07"
title: "GET /v1/ready: database, migrations and active policy pack"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 132
depends_on: ["10-u04", "02-u03", "07-u12"]
writes: ["src/health/**", "src/platform/health/**", "src/app.module.ts", "test/ready.e2e-spec.ts", "openapi/openapi.json"]
spec: ["docs/design/components/cross-cutting.md", "docs/design/system-design.md#11-operations-notes", "docs/spec/16-security-a11y-ops-testing.md", "docs/spec/constitution/rules.md#PUB-FAILCLOSED-1"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/ready.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Readiness separate from liveness (D-57): GET /v1/health stays dependency-free; GET /v1/ready answers whether this instance may take traffic.

## Steps
1. GET /v1/ready (public, unauthenticated, no body details beyond check names): returns 200 {status: "ready", checks: {database: "ok", migrations: "ok", policy_pack: "ok", legal_corpus: "ok"}} or 503 {status: "not_ready", checks: {...: "failed" | "ok"}} using the shared error envelope for unexpected failures. Checks: a SELECT 1 with a 1 second timeout; the latest applied migration equals the newest migration file (drizzle journal); the active policy pack for each enabled jurisdiction is loaded and its content hash equals the pinned hash (10-u04 registry, fail-closed: a missing or mismatched pack means not ready, PUB-FAILCLOSED-1); the legal corpora named by the pack are loaded when the corpus loader exists (skip the check with value "n/a" before it does, never fake ok).
2. Never leak versions, hashes, file paths or error text in the response; those go to the structured log (redacted) only. Cache nothing for more than 2 seconds; the check must not run a model call or write anything.
3. Mark it @Public and out of the rate limiter's per-account table (an IP limit of 120 per minute applies via 07-u02 when present). Add the operationId getReady and regenerate OpenAPI.
4. Tests: ready on a migrated db with the fixture pack; 503 with the database down (stop connection); 503 when migrations are behind (temp schema); 503 when POLICY_ACTIVE pins a wrong hash; the body never contains a hash or path; health stays 200 in all those cases.
5. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- /v1/health is unchanged and dependency-free.
- /v1/ready is 503 on a missing database, stale migrations or a mismatched policy pack hash (tests).
- The response leaks no internal detail.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Orchestrator probes configuration (hosting).
- Provider reachability of a live model (never a readiness dependency: the pipeline fails closed on its own).
