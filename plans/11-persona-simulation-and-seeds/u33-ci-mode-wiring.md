---
id: "11-u33"
plan: "11"
title: "CI mode: npm run sim:ci, determinism check, night-run entry"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 133
depends_on: ["11-u19","11-u21","11-u22","11-u28","11-u29","11-u30","11-u31","11-u32"]
writes: ["package.json","test/simulation/ci/**","test/simulation/README.md","scripts/sim-ci.sh"]
reads: []
spec: ["docs/design/ai/simulation.md#5-modes","docs/design/flows/persona-simulation-run.md","docs/design/flows/night-run.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "The simulation suite is NOT part of `npm run verify` when it would exceed a few minutes; it is its own script called by CI and by the night run. Decide by measuring and record the measured time in the README."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
One command that runs the whole deterministic suite and one that proves determinism, so CI and the night run can call them and a pack change in can_policy can be checked against the persona suite (amendment-loop checklist item 5).

## Steps
1. `npm run sim:ci`: starts the test stack (docker compose up --wait, migrate, `SIMULATION_MODE=true`, FakeModel), runs `seed:bootstrap` for seeds 1 and 2, all scenarios (seed1, seed2, attack, failclosed, rollout, appeals, parity, regression), builds the report and graduation report, prints the summary and exits 1 on any deviation marked required or any critical entry.
2. `npm run sim:determinism`: runs the suite twice with the same seed and diffs masked `report.json`; exits 1 on any difference.
3. `scripts/sim-ci.sh` wraps both for GitHub Actions use; README section "Pack change check": run `npm run sim:ci -- --pack <dir>` against a pack directory built by can_policy (the amendment-loop persona gate).
4. Record runtime in README. Add one line to the can-server skill notes in the commit message for the orchestrator (skill files are not edited here).

## Acceptance
- `npm run sim:ci` is green on the fixture pack and exits 1 on an injected deviation (test).
- Determinism diff is empty on two runs (test).
- Measured runtime is recorded.

## Out of scope
- Live runs.
- Root CI workflow files (plan 08).
