---
id: "11-u27"
plan: "11"
title: "Regression rerun: every prior failure becomes a persona script"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 127
depends_on: ["11-u26","11-u17"]
writes: ["test/simulation/regression/**"]
reads: []
spec: ["docs/design/ai/simulation.md#7-feeding-the-amendment-loop","docs/design/ai/evaluation.md#regression-suite"]
needs: []
verify: ["npm run lint","npm run build","npx vitest run test/simulation"]
founder_gate: false
defaults: "Only confirmed candidates (status `confirmed`) become regression scripts; unconfirmed ones stay reports."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A fixed case stays fixed: every confirmed prior failure is replayed as a scripted persona step in each deterministic run until a ratified PR retires it.

## Steps
1. Loader reads confirmed candidates (and `regression.jsonl` rows with `provenance: simulation`) from the synced can_policy data (11-u12) and builds one script step per case (`raw_http` or submit, with expected outcome).
2. Scenario `regression.all` runs them in id order; results go to `report.metrics.regression {total, passed, failed[]}`; a failure marks the run `critical: regression`.
3. Tests with a fixture of three confirmed candidates: pass, a deliberately failing one is reported with id, order is stable.

## Acceptance
- Confirmed candidates run on every deterministic run (test).
- A regressed case is listed by id and marks the run critical (test).
- `npm run verify` is green.

## Out of scope
- Retiring a regression case (its own ratified PR in can_policy).
