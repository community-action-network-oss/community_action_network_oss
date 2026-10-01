---
id: "11-u44"
plan: "11"
title: "Scenario: legal stack refuses a forbidden topic and marks an illegal-solution proposal stuck"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 144
depends_on: ["11-u02","11-u19","09-u67"]
writes: ["test/simulation/scenarios/legal-stack/**"]
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
A persona run that exercises the legal layer stack: a forbidden-topic problem is refused and an illegal-solution proposal sends the problem to stuck.

## Steps
1. In a synthetic jurisdiction whose corpus forbids one topic, a submitter persona submits a problem on that topic; assert T05 rejection with `TOPIC-FORBIDDEN-1` and the legal basis (layer and source version) logged, and that nothing is published in that jurisdiction.
2. A proposer persona submits a stage option whose solution is illegal under one layer (L1 to L6 fixture); assert `DP-LEGALITY` blocks the stage (ST07) with the stuck payload citing layer, source and recheck condition, the problem goes `stuck` (T13) only when every remaining required stage is blocked, and a lawful sibling option is unaffected.
3. Assert refusal notices show the rule id and appeal route, and that the observer feed records both decisions.
4. Register as `legal.stack`; tests as in 11-u19.

## Acceptance
- Forbidden topic is refused with `TOPIC-FORBIDDEN-1` and no publication (test).
- Illegal solution leads to `stuck` with the layer cited (test).
- The scenario skips with `pending_dependency` when 09-u67 behavior is absent (test).
- `npm run verify` is green.

## Out of scope
- Live runs.
- Changing thresholds.
