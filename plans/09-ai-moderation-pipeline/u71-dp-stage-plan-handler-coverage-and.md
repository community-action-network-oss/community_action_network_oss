---
id: "09-u71"
plan: "09"
title: "DP-STAGE-PLAN handler: coverage and coherence on top of the server DAG validation"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 299
depends_on: ["09-u20","09-u16","09-u01","12-u01","10-u63"]
writes: ["src/moderation/app/dp-stage-plan.ts","src/moderation/domain/stage-plan/**","test/fixtures/moderation/stage-plan/**","test/dp-stage-plan.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/decision-points.md#shared-contract","docs/design/ai/decision-points.md#per-dp-notes","docs/spec/01b-stages.md","docs/spec/constitution/rules.md#STAGE-GATE-1","docs/spec/constitution/rules.md#PLAN-CHANGE-1","docs/spec/01a-lifecycle.md"]
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
Judge a stage plan: well formed (deterministic, the `validatePlan` of 12-u01), coherent, and covering the final criteria. Runs on submit, on the publish run and on every plan-change proposal.

## Steps
1. Deterministic layer calls `validatePlan` from src/stages/domain (12-u01; never reimplement it): cycle, dangling edge, no start node, stage without criteria, unreachable or dead-end required stage, duplicate name. Any issue is `needs_revision` with the issue code and stage name as the hint, with no model call. Add the coverage check: every final criterion is addressed by some stage criterion or has a stated reason.
2. Model layer for coherence only: stages that are duplicates or vague catch-alls, parallel stages that are not independent, order that contradicts the goals; for a plan-change proposal also whether a reason is given, whether removed or skipped stages are justified and whether the final criteria are still reachable. Outcomes publish, needs_revision, hold.
3. A missing plan defaults to the one-stage template; the DP then checks only coverage (tested).
4. Output `uncovered_final_criteria[]` and `per_stage[]` {name, hint}, anchored to `stage_plan.<name>` paths.
5. Use FakeModel keyword-table files added under the unit's own fixtures directory (do not edit the fake table of 09-u12; add a second table file it loads via config), and moderationFixtures() packs (never the 10-u04 default pack).
6. Tests: each `validatePlan` issue maps to a hint without a model call (provider counter 0); a hidden "other" stage is flagged by the model fixture; a plan change that silently drops a hard stage needs a reason; classic-5 and a parallel plan publish; hold on provider failure.

## Acceptance
- Structure is never judged by the model.
- A missing plan is accepted as the one-stage default.
- `npm run verify` is green.

## Out of scope
- Plan change application (12-u09).
- Prompt (10-u63).
