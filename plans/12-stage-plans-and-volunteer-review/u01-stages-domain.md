---
id: "12-u01"
plan: "12"
title: "Stages domain: stage plan DAG, acceptance criteria, gating engine and stage state machine (ST01 to ST11)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 16
depends_on: ["02-u09"]
writes: ["src/stages/domain/**"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md", "docs/spec/01b-stages.md", "docs/spec/01a-lifecycle.md", "docs/design/components/server.md#lifecycle-v2-modules-d-72", "docs/design/flows/stage-advancement.md", "docs/spec/constitution/rules.md#STAGE-GATE-1", "docs/spec/constitution/rules.md#CRITERIA-1"]
needs: []
verify: ["npm run lint", "npm run build", "npm test", "npx vitest run src/stages/domain"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Encode the stage level of lifecycle v2 (docs/spec/01b-stages.md, the single owner of ST01 to ST11, `STAGE-GATE-1` and the `classic-5` template) as pure TypeScript with table-driven tests. This is the executable form of the stage plan; persistence, HTTP and the transactional engine come in later units (12-u02, 12-u06). Framework-light: no `@nestjs/*`, no `drizzle-orm`, no node I/O in `src/stages/domain/`.

## Steps
1. `src/stages/domain/types.ts`: `StageState` (`planned`, `ready`, `active`, `resolving`, `resolved`, `blocked`, `skipped`), `DecisionMethod` (`poster_after_input`, `community_vote`, `steward`, `other_named`), `Stage` ({id, name, goal, decisionMethod, required, needsChoice, autoStart, dependsOn: string[] (stage ids), criteria: Criterion[]}), `Criterion` ({id, statement, measure, target?, evidenceHint?}), `StagePlan` ({planVersion, stages, finalCriteria: Criterion[]}), `StageStates = Record<stageId, StageState>`. Stage chips map (exact text from 01b section 4b.2: "Planned", "Ready", "In progress", "Checking evidence", "Done", "Blocked", "Skipped") as `STAGE_CHIP`.
2. `src/stages/domain/plan.ts`: `validatePlan(plan)` returns `{ok, issues[]}` with issue codes `cycle` (with the cycle path), `dangling_edge`, `no_start_node`, `no_criteria` (stage id), `no_final_criteria` (CRITERIA-1), `unreachable_from_final` (a required stage that leads nowhere), `dead_end_required` (a stage with no successor that serves no final criterion and is required), `duplicate_name`. Pure; also `topoOrder(plan)` (a stage always after the stages it starts after) used by the list view.
3. `src/stages/domain/gating.ts`: `readyStages(plan, states)` (STAGE-GATE-1: planned stages whose every predecessor is `resolved` or `skipped`), `canStart(plan, states, id)` returning `{ok}` or `{ok:false, code:"not_ready"}`, `finalCheckDue(plan, states)` (every required stage `resolved` or `skipped`, `T15` is then requested), `problemChip(plan, states)` returning `{kind:"one", name}` or `{kind:"many", n}` for the labels "Active: stage {name}" and "Active: {n} stages in progress" (copy ids come from the app; this returns data only).
4. `src/stages/domain/transitions.ts`: `STAGE_TRANSITIONS` for ST01 to ST11 as typed data (id, from, to, actors `steward | run | system`, required fields, conditions) and a pure `evaluateStageTransition({from, to, actor, fields, context})` returning ok or `{code: "invalid_transition" | "not_permitted" | "missing_fields" | "condition_failed"}`. Context carries `problemState` (ST03 refused unless `active`; while `paused` or `stuck` no stage starts or resolves), `predecessorsResolved`, `choiceRecorded`, `tasksDone`, `evidenceMapped`. ST09 counts as resolved for gating; ST10 sets unstarted `ready` successors back to `planned` (`successorsAfterReopen(plan, states, id)`).
5. `src/stages/domain/templates.ts`: `CLASSIC_5` (five stages in series with the starting criteria wording of 01b section 4b.1) and `ONE_STAGE(finalCriteria)` (stage `resolve` whose criteria equal the final criteria). Both pass `validatePlan`.
6. `src/stages/domain/contribution-matrix.ts`: `allowedContributionTypes(stageState)` from 01b section 4b.6 (planned or ready: nine types, never `progress_update` or `verification_evidence`; active: all; resolving: `clarifying_question`, `risk`; blocked: four; resolved or skipped: none) and `allowedForProblemLevel(problemState)`.
7. Tests (`*.spec.ts`, Vitest): (a) a test that parses the stage transition table of docs/spec/01b-stages.md at test time and asserts every ST id, from set, to state and actor equals `STAGE_TRANSITIONS` (skip with an explicit reason when the file is absent: can_server may be checked out alone); (b) a table of plans (serial, parallel, diamond, mixed, one stage, classic-5) with expected ready sets as states change; (c) cycle, dangling edge, no criteria, unreachable and dead-end rejection; (d) property test with fast-check: over random DAGs and random resolve orders a stage is never ready while a predecessor is neither `resolved` nor `skipped`, and every stage is ready exactly once; (e) the `skipped` stage counts for gating; (f) the matrix test for every stage state; (g) chips equal the spec text.

## Acceptance
- ST01 to ST11 equal docs/spec/01b-stages.md (parsing test).
- STAGE-GATE-1 holds for every generated DAG (property test), and a `planned` stage can never start (`not_ready`).
- `classic-5` and the one-stage template validate.
- The module imports nothing from Nest, Drizzle or node I/O (lint boundary rule).
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- Persistence, endpoints, the transactional engine and row locks (12-u02, 12-u06).
- DP calls and DP-STAGE-RESOLUTION (12-u07).
- Problem-level T-table (03-u01).
