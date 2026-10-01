---
id: "12-u06"
plan: "12"
title: "Stage transition engine: ST01 to ST11 on rows, the gating transaction, start, submit and block endpoints"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 49
depends_on: ["12-u02", "03-u05", "12-u04"]
writes: ["src/stages/app/**", "src/stages/http/**", "src/stages/infra/**", "src/db/schema.ts", "drizzle/**", "test/stage-engine.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01b-stages.md", "docs/spec/01a-lifecycle.md", "docs/design/flows/stage-advancement.md", "docs/design/components/server.md#lifecycle-v2-modules-d-72", "docs/spec/constitution/rules.md#STAGE-GATE-1", "docs/spec/constitution/rules.md#BLOCKER-1"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/stage-engine.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Run the stage state machine of 12-u01 against real rows. Every stage transition updates the stage and appends a `stage_event` in one transaction. The gating engine runs in the same transaction as the change that triggers it, under row locks, so a successor becomes `ready` exactly once (STAGE-GATE-1). This unit also exposes the steward actions start, submit for resolution and block; the resolution itself (ST05, ST06) is 12-u07, and plan changes (ST09 through T22, ST10, ST11) are 12-u09.

## Steps
1. `src/stages/app/stage-engine.ts`: `apply({stageId, to, actor: {kind: "steward" | "run" | "system", id}, fields, reason, runId?})` in one Drizzle transaction: lock the problem row, then the stage and its successors in id order (`SELECT ... FOR UPDATE`, one fixed order, so concurrent resolutions cannot deadlock), build the context (problem state, predecessor states, choice recorded, required tasks done through a `TaskPort` whose fake returns done until 05-u01 and a `BlockerRecordPort` (stores the BLOCKER-1 record, fake keeps it in the `stage_event` payload until 05-u03 implements it with the `stage_blocker` table), evidence mapped), call `evaluateStageTransition`, mutate, insert one `stage_event`. Errors use the kernel envelope: `not_ready` (409), `invalid_transition`, `not_permitted`, `validation_failed` with fieldErrors, `problem_not_active` when the problem is paused or stuck (no stage starts or resolves, 01b 4b.4).
2. Gating (`gate(tx, problemId)`): after any stage change that resolves or skips a stage, recompute planned to ready with `readyStages` for successors (ST02, event per stage, exactly once under the lock); start `auto_start` stages that became ready when the problem is `active` (ST03, system actor); when `finalCheckDue` and nothing is open, ask the problem transition engine (03-u05) to record a system proposal of T15 (`pending_transition`, proposedBy system) with the candidate evidence ids per final criterion taken from the criteria `met_by` of resolved stages, so `DP-VERIFICATION` runs (09-u42); when every unresolved required stage is `blocked` or behind a `blocked` stage, append `problem.stuck_candidate` and queue DP-BLOCKER for T13 (the run decides, never this unit).
3. Endpoints: `POST /v1/stages/{id}/start` (steward; ST03; refused with `not_ready` from `planned`, the contributions made ahead are shown), `POST /v1/stages/{id}/submit` (steward; ST04: choice recorded when `needs_choice` (CHOICE-GATE passed, 04-u05), all required tasks done or dropped with a reason, 1+ `stage_evidence` mapped to criteria; freezes the evidence (`frozen_at`) and enqueues the resolution job that 12-u07 handles), `POST /v1/stages/{id}/block` and `POST /v1/stages/{id}/unblock` (steward or run; ST07 needs the blocking constraint, its source and version, blocked actions, recheck condition, next lawful route and 1+ documented attempt, BLOCKER-1; ST08 needs the cleared note with evidence and returns the stage to `resume_state`; if the problem was `stuck`, T14 applies first through the problem engine). The steward is the poster after publication. Add `allowedStageTransitions` ([{to, requires: FieldKey[], mode}]) to `GET /v1/stages/{id}` and the stage map data, computed from the domain table for the viewer (never hardcoded in the app).
4. `TransitionEffects` registration (03-u05): on T16, T17 and T18 every unresolved stage becomes `skipped` with the closure reason in the same transaction (ST09, system actor); contributions kept ahead stay on record.
5. Tests (e2e, real Postgres): a diamond plan resolves in both orders; two predecessors resolved in parallel transactions make the successor `ready` exactly once (run the pair 20 times); start from `planned` gives `not_ready`; a paused problem refuses start and submit; a blocked branch leaves the parallel branch running; all required stages blocked queues the stuck candidate once; final check proposal created once when the last required stage resolves; closure skips unresolved stages; a throwing effect or failing event insert rolls everything back; `allowedStageTransitions` equals the domain table for steward, member and guest.
6. `npm run openapi`, then `git add -- openapi/openapi.json`.

## Acceptance
- STAGE-GATE-1 holds under concurrent resolutions (repeat test).
- Every stage change and its gating result commit together or not at all.
- No person resolves a stage: ST05 and ST06 need a run id (12-u07).
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- DP-STAGE-RESOLUTION and appeals on stage decisions (12-u07).
- Plan changes (12-u09).
- Task and blocker records themselves (05-u01).
