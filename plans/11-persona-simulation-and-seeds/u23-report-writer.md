---
id: "11-u23"
plan: "11"
title: "Run reports: report.json, schema and readable summary"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 123
depends_on: ["11-u17","11-u14"]
writes: ["test/simulation/report/**","schemas/**","docs/simulation-report.md"]
reads: []
spec: ["docs/design/ai/simulation.md#6-run-reports-and-metrics","docs/design/ux/wireframes/policy.md#WF-SIM-1","docs/design/flows/persona-simulation-run.md"]
needs: []
verify: ["npm run lint","npm run build","npx vitest run test/simulation"]
founder_gate: false
defaults: "Report JSON key order is stable and values contain no input text; the summary markdown states the run mode in its first line (\"deterministic, FakeModel\" or \"live\")."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The report every run writes, keyed by run id, policy version, schema versions, model ids, seed and mode: lifecycle results, per-persona outcomes versus expectations, deviations, cost and holds, plus a short readable summary. Metrics sections are filled by 11-u24 and 11-u25.

## Steps
1. `report/schema.ts` and `docs/simulation-report.md` define `report.json`: `{run_id, mode, seed, policy_version, schema_versions, model_ids, harness_sha, started_at, finished_at, scenarios: [{id, terminal_state, steps, holds, retries, deviations[]}], personas: [{id, steps, as_expected, deviations}], metrics: {} , privacy: {}, injection: {}, appeals: {}, cost: {}, parity: {}, disagreement: [], critical: [], incomplete: bool}` plus a JSON Schema in `test/simulation/report/report.schema.json` used by the API in 11-u34.
2. `report/build.ts` merges scenario results, `events.jsonl` and observer records into the report; `incomplete: true` with a reason when the run stopped on budget or error (live mode over the spend cap).
3. `report/summary.ts`: a markdown summary with run header (mode statement first), lifecycle table, deviation list (persona, step, expected, observed) and the sentence "Personas, not real people." Deterministic mode adds "met on synthetic fixtures with FakeModel".
4. Tests: report validates against its schema; stable key order; no input text (planted string absent); incomplete flag on a budget stop.

## Acceptance
- A deterministic run produces a schema-valid report and summary (test).
- The summary states the run mode first (test).
- `npm run verify` is green.

## Out of scope
- Metric computation (11-u24, 11-u25).
- The API and view (11-u34, 11-u37).
