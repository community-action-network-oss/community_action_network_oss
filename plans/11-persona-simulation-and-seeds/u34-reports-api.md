---
id: "11-u34"
plan: "11"
title: "Simulation reports API for maintainers"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 134
depends_on: ["11-u23","11-u28"]
writes: ["src/simulation/reports/**","src/app.module.ts","test/simulation-mode/**","openapi/openapi.json"]
reads: []
spec: ["docs/design/ux/wireframes/policy.md#WF-SIM-1","docs/design/ai/simulation.md#6-run-reports-and-metrics","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "Reports are stored as files in `SIM_REPORTS_DIR` (set by the harness `--out`), read-only to the server; only maintainers may read; the route exists in simulation mode only unless `SIM_REPORTS_ENABLED=true` is set deliberately."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Expose run and graduation reports to the maintainers' screen: list runs, read one run summary, read the latest graduation report.

## Steps
1. `GET /v1/policy/simulations` (list: run id, mode, policy version, finished_at, verdict flags), `GET /v1/policy/simulations/{id}` (report summary: persona run counts by family, metrics with previous run deltas, critical entries, links to candidates), `GET /v1/policy/simulations/graduation` (latest graduation report). Explicit `operationId`s, maintainer role required (same guard as policy proposals), validated against the report JSON Schemas (11-u23, 11-u28), sanitized: no transcripts, no inputs.
2. Previous-run comparison computed server-side by `policy_version` and mode.
3. Tests with fixture report files: list, read, graduation, role guard, schema validation failure gives 502-style `report_invalid` not a crash; files outside the reports dir are unreadable (path traversal test). Regenerate OpenAPI.

## Acceptance
- Only maintainers can read reports (test).
- Path traversal is impossible (test).
- Responses contain no transcripts or input text (test).
- `npm run verify` is green.

## Out of scope
- The screen (11-u37).
- Report generation.
