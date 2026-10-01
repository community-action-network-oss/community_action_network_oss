---
id: "11-u13"
plan: "11"
title: "Server simulation mode: synthetic flag on accounts and content, public-surface guard (SIM-LABEL-1)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 113
depends_on: ["10-u29","02-u04","04-u01","04-u04","04-u05","09-u33","10-u32"]
writes: ["src/simulation/**","src/app.module.ts","src/config.ts","src/db/schema.ts","drizzle/**","test/simulation-mode/**","openapi/openapi.json",".env.example"]
reads: []
spec: ["docs/spec/constitution/rules.md#SIM-LABEL-1","docs/spec/constitution/rules.md#SIM-NOSECRET-1","docs/design/ai/simulation.md#1-principles","docs/design/flows/persona-simulation-run.md","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "The flag lives in new columns with a migration (never edit old migrations); a normal deployment has `SIMULATION_MODE=false` and rejects any request that tries to set `synthetic`."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Make simulation data identifiable and fenced in the server: in simulation mode, accounts created by invite carry `synthetic: true` and a run id, every content item and evidence reference they create inherits it, health reports `simulation: true`, and no synthetic item can render on a public surface as real. Personas still go through the public API; this unit adds labeling, not a back door.

## Steps
1. Config `SIMULATION_MODE` (default false). When true: `GET /v1/health` includes `simulation: true`; signup by invite for an invite flagged `synthetic` creates accounts with `synthetic=true`, `sim_run_id` (taken from a header `X-Sim-Run` that only a synthetic invite may send) and the handle prefix `sim-`; the flag is never settable through a content body.
2. Migration adds `synthetic boolean not null default false` and `sim_run_id text null` to accounts, problems, contributions, proposals, decision records, evidence refs, appeals and policy proposals, and `is_seed`, `synthetic_evidence` on problems; content created by a synthetic account inherits `synthetic` in the one write path (a pure domain function with tests), so no module can forget it.
3. Public surface guard: every public read model (list, detail, history, notices, explanations, feeds) returns a visible `label: "synthetic"` field and, for seeds, the text label "Seed problem, synthetic evidence"; a contract test enumerates all public GET responses from OpenAPI and fails if one that can include a synthetic row lacks the label field; in non-simulation mode, rows with `synthetic=true` are filtered out of every public read (test inserts one via a repository, asserts invisibility).
4. Evidence: seed evidence references carry the visible "synthetic evidence" mark and their tier is capped by the pack value (stored cap, read by DP-EVIDENCE-TIER inputs).
5. Tests: invite and account labeling; inheritance; header only honoured for synthetic invites; production mode hides synthetic rows; the labeled seed text appears on seed problems; health flag. Regenerate OpenAPI.

## Acceptance
- No synthetic row is visible in non-simulation mode (test).
- All public GET schemas that can carry synthetic rows expose a label (contract test).
- A body cannot set `synthetic` (test).
- `npm run verify` green.

## Out of scope
- Observer feed (11-u14).
- The seed loader (11-u18).
