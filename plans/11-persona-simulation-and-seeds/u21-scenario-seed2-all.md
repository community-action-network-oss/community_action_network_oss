---
id: "11-u21"
plan: "11"
title: "Seed 2 scenarios: happy, revise, appeal, stuck and attack variants"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 121
depends_on: ["11-u17","11-u18","11-u08","11-u02","11-u03"]
writes: ["test/simulation/scenarios/seed2/**","test/simulation/scenarios/index.ts"]
reads: []
spec: ["docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/design/flows/persona-simulation-run.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "Reuse the engine and assertions of seed 1; only data differs. Attack variant uses adv-individual and adv-spam only; the full attack wave is 11-u22."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Seed 2 (city centre cleanliness) scenarios for every variant in simulation.md: `seed2.happy`, `seed2.revise`, `seed2.appeal`, `seed2.stuck` and `seed2.attack` (adv-individual pleads about a single resident's waste and must be routed; adv-spam floods duplicates and must be held by caps and DP-DUPLICATE).

## Steps
1. Mirror the seed 1 scenario structure; verification evidence uses the synthetic before and after cleanliness index tied to the outcome metric of the problem.
2. Assert `existing_efforts` is filled in the published problem, the `con-institution` operational constraint is published, the proposal combines collection design, enforcement and communications (rubric coverage), tasks complete, verification reaches `solved` or honest `stuck`.
3. `seed2.attack`: the individual plea gets `route_external` or reject with no narrative retained; spam is bounded by `limits.yaml` caps (assert counts equal the cap) and DP-DUPLICATE.
4. Register ids and write tests (docker and db).
5. Lifecycle v2 (W13): run the seed 2 stage plan (`measure-baseline`, then `collection-design` and `enforcement-and-comms` in parallel, `pilot`, `measure-result`) through the same lifecycle as 11-u19 (prepare, review, publication, stages, final verification), asserting parallel stages do not gate each other and that the `pilot` stage stays `planned` until both predecessors are `resolved`.

## Acceptance
- All five seed 2 scenarios run in deterministic mode and meet their assertions (tests).
- Spam stops exactly at the configured caps (test).
- `npm run verify` is green.

## Out of scope
- Seeds 3 and 4.
