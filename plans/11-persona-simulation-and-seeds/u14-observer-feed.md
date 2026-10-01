---
id: "11-u14"
plan: "11"
title: "Read-only observer feed of run records for the harness"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 114
depends_on: ["11-u13","09-u22","09-u04"]
writes: ["src/simulation/observer/**","src/app.module.ts","test/simulation-mode/**","openapi/openapi.json"]
reads: []
spec: ["docs/design/ai/simulation.md#4-lifecycle-driving","docs/design/ai/simulation.md#6-run-reports-and-metrics","docs/design/components/server.md","docs/design/ai/runtime.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "The feed exposes decision and cost records only for synthetic accounts (filtered server-side); it is mounted only when `SIMULATION_MODE=true` and requires a harness token created by a synthetic maintainer invite."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The only extra surface the harness may use beyond the user API: `GET /v1/sim/runs/{run_id}/records` (paged, read-only) returning moderation runs, decisions, hints, costs, cache hits, appeals and notices produced for synthetic accounts, so reports can score outcomes against persona expectations without a database.

## Steps
1. Read the moderation run recorder from plan 09 (`moderation_run`, `moderation_decision`): the feed maps rows to a stable record shape `{kind: run|decision|appeal|notice|rollout, subject_ref, dp, outcome, rule_ids, field_ref, confidence, policy_version, prompt_hash, model_id, cost, cache_hit, created_at, persona_ref}` (no content text, no input; text only as `inputs_hash`).
2. Endpoint with explicit `operationId: getSimRunRecords`; pagination cursor; filter `kind`; 404 in non-simulation mode (route not mounted); auth by a harness token; rows for accounts with `synthetic=false` are never returned (test).
3. Persona attribution: records carry the persona handle through the account they belong to.
4. Tests with FakeModel runs for two personas; synthetic-only filter; route absent when mode is off; no field contains input text (planted string not present). Regenerate OpenAPI.

## Acceptance
- The feed returns decision and cost records only for synthetic accounts (tests).
- The route does not exist when simulation mode is off (test).
- No input text appears in any record (test).
- `npm run verify` green.

## Out of scope
- Reports (11-u23).
- Moderation internals (plan 09).
