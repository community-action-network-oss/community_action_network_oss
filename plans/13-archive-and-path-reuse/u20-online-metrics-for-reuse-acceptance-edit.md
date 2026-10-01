---
id: "13-u20"
plan: "13"
title: "Online metrics for reuse: acceptance, edit distance, time to publish, outcomes (aggregates only)"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.2
priority: 419
depends_on: ["13-u14","13-u16","09-u39"]
writes: ["src/archive/app/metrics/**","src/db/schema.ts","drizzle/**","openapi/openapi.json","test/archive-metrics.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#10-evaluation","docs/design/ai/evaluation.md","docs/design/ai/safety-and-privacy.md","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
After graduation, measure whether reuse helps, as aggregates that are never used to rank people: suggestion acceptance rate, edit distance between the draft and the accepted stage plan, time to publication with and without accepted suggestions, outcomes of derived paths versus others, dismissal reasons.

## Steps
1. A daily aggregate job writes rows to `reuse_metric_daily` (metric, day, jurisdiction class, value, n) with a minimum cell size (cells with n below the pack value `metrics.min_n` are dropped, never published); source rows contain no account id.
2. Edit distance: a normalised tree edit distance between the drafted `StagePlan` and the applied plan (stage add, remove, rename, edge change), a pure function with table tests.
3. Outcome comparison joins only on problem ids inside the job and stores only the aggregate; `source = simulation` records and problems are excluded from outcome statistics (13-u05 view).
4. Endpoint `GET /v1/archive/metrics` (steward and the public aggregate subset): only aggregates; no per-person or per-problem rows. Run `npm run openapi` and `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit it.
5. Tests: small cells are dropped; edit distance fixtures; simulation excluded; the endpoint exposes no identifier; key-set test.
6. Rate limits: do not edit the central rate-limit table `src/platform/security/limits.ts` owned by 07-u02 in this unit (that table is single-owner and a row added here would conflict). The routes of this unit are listed in the acceptance as a follow-up for 07-u02, with proposed limits.

## Acceptance
- Only aggregates above the minimum cell size are exposed.
- Nothing here ranks or scores a person.
- `npm run verify` is green with openapi regenerated.
- Follow-up for 07-u02 (not done here, never edit the limits table in this unit): add rows for `getArchiveMetrics` (GET /v1/archive/metrics): public aggregate, 60 per minute per IP.

## Out of scope
- Dashboards.
