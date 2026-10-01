---
id: "11-u19"
plan: "11"
title: "Seed 1 scenarios: happy path and the revise loop"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 119
depends_on: ["11-u17", "11-u18", "11-u07", "11-u02", "11-u03", "11-u45", "12-u07"]
writes: ["test/simulation/scenarios/seed1/**","test/simulation/scenarios/index.ts"]
reads: []
spec: ["docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/design/ai/simulation.md#2-persona-catalog","docs/design/flows/persona-simulation-run.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "Expected outcomes come from the seed `expected` blocks; if a deterministic outcome is wrong because FakeModel was derived from eval cases that do not cover the seed text, add the seed text as an eval case through a candidate (11-u26), not by weakening the expectation."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Two scripted lifecycles for seed 1 run in deterministic mode with assertions: `happy` (sub-careful submits, contributors build the problem, proposals, a decision record, tasks, progress, verification, terminal state) and `revise` (sub-wellmeaning-wrong is steered by DP-ASSUMPTIONS, fixes it, then proceeds).

## Steps
1. Scenario definition `scenarios/seed1/happy.ts`: persona order and parameter bindings from the seed variant file; the lifecycle v2 run: prepare, volunteer review by `vol-careful`, publication, the stage plan runs (parallel stages `understand-incidents` and `map-competences`, then the rest, each resolved through DP-STAGE-RESOLUTION on `stg-evidence-strong` evidence), final DP-VERIFICATION; terminal expectation `solved` or an honest `stuck` or `redirected` with the archive record complete (G1); assert the decomposition rubric is covered by published contributions (every rubric item matched by a contribution `type` and keyword set from the rubric file).
2. `revise.ts`: the wellmeaning-wrong variant must receive `needs_revision` from the publication run with a hint on the causal field (rule ASSUMP-1) and on the legal assumption; after `mark_assumption` and a new review pass it publishes; assert the published problem lists the assumptions marked as assumptions.
3. Each scenario returns a `ScenarioResult {terminal_state, steps, deviations, holds, retries, notices}` written into the run directory and registered in `scenarios/index.ts` with a stable id (`seed1.happy`, `seed1.revise`).
4. Tests: run both against the real test server in deterministic mode (needs docker and db) and assert terminal states and the rubric coverage.

## Acceptance
- `seed1.happy` reaches a verified terminal state in deterministic mode (test).
- `seed1.revise` shows a needs_revision then a publish with assumptions marked (test).
- Rubric coverage is computed and asserted.
- `npm run verify` is green.

## Out of scope
- Appeal, stuck and attack variants (11-u20, 11-u22).
