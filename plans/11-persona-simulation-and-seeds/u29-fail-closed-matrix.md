---
id: "11-u29"
plan: "11"
title: "Fail-closed matrix scenarios (G9): every failure row triggered, zero publishes"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 129
depends_on: ["11-u17","09-u25","09-u12"]
writes: ["test/simulation/scenarios/failclosed/**"]
reads: []
spec: ["docs/design/ai/decision-points.md#shared-contract","docs/design/ai/runtime.md","docs/spec/constitution/rules.md#FAIL-CLOSED-AI-1","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1","docs/design/ai/simulation.md#8-graduation-criteria-defaults-to-be-ratified"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "Failures are injected through plan 09 test controls (FakeModel fault modes) and config, never by touching the database. If a row has no injection control in plan 09, list it as `uncovered` in the scenario output."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Trigger every row of the fail-closed matrix (timeout, schema failure after one retry, missing pack, budget exhausted, unsupported language, confidence below floor after escalation, gateway down, hash mismatch pack) and assert each ends in `hold` with the item unpublished and the static crisis route still served.

## Steps
1. Read the fail-closed matrix in docs/design/ai/runtime.md and the controls plan 09 exposes; build a table `rows[] {id, injection, expected_outcome: hold, expected_state, crisis_route_up}`.
2. For each row: set the fault, drive a submit by a careful persona, assert outcome `hold`, state unchanged, no public row, `GET` of the static crisis route returns 200, then clear the fault and assert the item can proceed (retry works).
3. Result `failclosed.matrix` lists rows covered and `publishes_on_failure` (must be 0) feeding G9.
4. Test on the test server (docker and db): all coverable rows pass; a deliberately fail-open stub (test double) is caught.
5. Lifecycle v2 (W13): add matrix rows for the new blocking DPs: a held DP-PUBLISH run keeps the problem `in_review` (T09) with no public row; a held DP-STAGE-RESOLUTION leaves the stage `resolving`; a held DP-ARCHIVE keeps the archive record private and the terminal state unchanged; a held DP-REUSE-FIT shows no suggestion; an unresolved legal stack holds a suggestion. Each row asserts the crisis route stays reachable and that recovery proceeds after the fault clears.

## Acceptance
- Each coverable matrix row ends in hold and no publish (test).
- The static crisis route stays up in every row (test).
- Uncovered rows are listed explicitly.
- `npm run verify` is green.

## Out of scope
- Implementing fail-closed behaviour (plan 09).
