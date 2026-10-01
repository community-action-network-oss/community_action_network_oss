---
id: "11-u43"
plan: "11"
title: "Scenario: re-resolution reopens a solved seed problem after a policy or legal-corpus change"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 143
depends_on: ["11-u19", "11-u20", "11-u21", "09-u66", "13-u04"]
writes: ["test/simulation/scenarios/rereso/**"]
reads: []
spec: ["docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/spec/01a-lifecycle.md","docs/spec/constitution/rules.md#RERESOLVE-1","docs/spec/constitution/rules.md#TOPIC-FORBIDDEN-1"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "If the plan 09 behavior is not yet implemented, mark the scenario `pending_dependency` with the reason and skip; never fake the outcome."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A persona run in which a solved seed problem is reopened by T20 `REOPEN-RULE` after a policy or legal-corpus version change, with the old archive record kept.

## Steps
1. Start from a seed 1 run that reaches `solved` (11-u19, 11-u20). Publish a new fixture pack or corpus version that changes the conclusion on the chosen solution (rule ids named).
2. Trigger the re-resolution queue; assert `DP-RERESOLUTION` outcome `reopen`, event T20 with old and new version, the changed rule ids and the feasibility result, and that the problem is `active` again with the affected stage back to `active` (ST10) and its unstarted successors back to `planned`.
3. Assert the old archive record is still readable (and a new one is built when the problem ends again), the notice reached the initiator persona ("Reopened under policy vX"), and the reopened view shows old conclusion, what changed, next step and the appeal path.
4. Add a `keep` control (change that does not alter the conclusion): no state change, record written. Persona appeals the reopen once; assert the appeal path runs (APPEAL-1).
5. Register as `seed1.reresolve`; tests as in 11-u19.

## Acceptance
- The reopen run keeps the old record and reaches T20 with the full payload (test).
- A non-changing corpus update leaves state unchanged (test).
- The scenario skips with `pending_dependency` when 09-u66 behavior is absent (test).
- `npm run verify` is green.

## Out of scope
- Live runs.
- Changing thresholds.
