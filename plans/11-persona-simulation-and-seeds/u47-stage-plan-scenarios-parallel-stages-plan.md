---
id: "11-u47"
plan: "11"
title: "Stage-plan scenarios: parallel stages, plan change, stage resolution, gate skipper, volunteer behaviours"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 147
depends_on: ["11-u19","11-u45","12-u07","12-u09","12-u08"]
writes: ["test/simulation/scenarios/stages/**","test/simulation/scenarios/index.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/design/flows/stage-work.md","docs/design/flows/stage-advancement.md","docs/design/flows/plan-change.md","docs/design/flows/volunteer-review.md","docs/spec/01b-stages.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The lifecycle v2 variants the simulation doc requires of both seeds: one parallel-stage run, one plan-change proposal, one stage resolution appeal path (the appeal itself is in 11-u20 and 11-u31), blocked stage, and the volunteer personas, as deterministic scenarios on FakeModel.

## Steps
1. `stages/parallel.ts` (`seed1.parallel`, `seed2.parallel`): the two parallel stages run independently; a third stage stays `planned` until both are `resolved` (assert STAGE-GATE-1 through the stage map API); `stg-contributor` options posted ahead to the planned stage are kept ready and attach when it becomes active.
2. `stages/evidence.ts`: `stg-evidence-weak` then `stg-evidence-strong` on the same stage: `needs_revision` naming the criterion, then `resolved`, with the per-criterion result and the policy version readable on the stage result route.
3. `stages/plan-change.ts` (`seed1.planchange`): after publication a proposal adds a stage; assert DP-STAGE-PLAN and DP-CRITERIA ran, the plan version incremented atomically, the change and reason are public, and a silent edit attempt by `stg-gate-skipper` is refused with `use_plan_change`.
4. `stages/volunteers.ts`: `vol-careful`, `vol-nitpick`, `vol-brigade` and `vol-leaker` run against a prepared problem: recommendations stored and resolved with reasons, zero reviews never publishes, nitpick volume does not block, brigade flagged without ranking, leaker blocked and nothing leaked (the checker of 11-u25 runs over the review views).
5. Register the scenarios with stable ids in `scenarios/index.ts`; each returns a `ScenarioResult` as in 11-u19. Tests on the test server in deterministic mode.

## Acceptance
- All scenarios pass in deterministic mode.
- No gate is skipped and no plan is silently edited (assertions).
- `npm run verify` is green.

## Out of scope
- Live runs (11-u38).
