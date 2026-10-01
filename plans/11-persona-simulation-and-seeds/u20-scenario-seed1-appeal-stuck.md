---
id: "11-u20"
plan: "11"
title: "Seed 1 scenarios: appeal, stuck proposal, decision and tasks to terminal state"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 120
depends_on: ["11-u19","09-u33","09-u34"]
writes: ["test/simulation/scenarios/seed1/**"]
reads: []
spec: ["docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/design/ai/appeals.md","docs/design/ai/decision-points.md#per-dp-notes"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "If the appeal re-run or the legal gate is not yet implemented by plan 09 units, mark the scenario `pending_dependency` in its definition and have it skip with that reason rather than faking the outcome."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The seed 1 variants that exercise the other half of the lifecycle: `appeal` (a rejected item appealed with a specific factual dispute, independent re-run, outcome recorded), `stuck` (one proposal blocked by the legal gate becomes `stuck`, another is chosen in a decision record with the legal-gate record), tasks claimed, progress and verification to `solved` or honest `stuck`.

## Steps
1. `appeal.ts`: sub-revising is rejected once, `app-appellant` files an appeal with a factual dispute; assert the independent re-run happened (different model or prompt variant recorded in the observer feed), the outcome and timestamps, and the notice shown to the poster.
2. `stuck.ts`: prop-proposer submits one lawful and one blocked proposal (overlay rule blocks it); assert DP-LEGALITY produces the stuck payload (constraint, source and version, blocked actions, recheck condition), DP-BLOCKER validates it, the decision record for the other proposal passes DP-DECISION-RECORD, and the problem reaches `solved` through verified evidence or an honest `stuck`.
3. Add tasks: con-implementer claims, posts progress and `verification_evidence`; assert DP-VERIFICATION runs and a completed task alone does not mark solved.
4. Register as `seed1.appeal` and `seed1.stuck`; tests as in 11-u19.

## Acceptance
- `seed1.appeal` records an independent re-run and a resolved appeal (test).
- `seed1.stuck` yields one stuck proposal with the full payload and one decision record (test).
- A finished task without verification evidence does not reach solved (test).
- `npm run verify` is green.

## Out of scope
- Attack wave (11-u22).
- Appeal-to-example loop (11-u31).
