---
id: "05-u01"
plan: "05"
title: "Stage tasks (steps), task blockers and the TaskPort that gates ST04"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 90
depends_on: ["04-u07", "10-u29", "12-u02", "04-u05", "10-u70"]
writes: ["src/tasks/**","src/problems/app/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/tasks.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01b-stages.md", "docs/design/components/server.md#lifecycle-v2-entities", "docs/design/system-design.md#6-api-surface-v1", "docs/spec/constitution/rules.md#LEGAL-GATE-1", "docs/spec/constitution/rules.md#STRUCT-ONLY-1", "docs/design/ux/wireframes/participate.md#WF-TASK-2", "docs/design/ux/wireframes/stages.md#WF-STAGE-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/tasks.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["8c09682"]
actual_hours: null
---
## Objective
Add the steps of a stage as tasks (a task belongs to a stage and to the `stage_choice` that created it) and task blockers, and implement the `TaskPort` that 12-u06 uses to gate ST04 (submit for resolution): every required task is done or dropped with a reason. Task bodies are structured submissions validated against the pinned task schema (10-u29). The old T11 and T12 gates are gone (docs/spec/01a-lifecycle.md section 4.3): tasks cannot start until the choice gate passed (`CHOICE-GATE`, 04-u05), and the transition to resolving is ST04.

## Steps
1. Schema task: id, problem_id, stage_id fk, stage_choice_id fk, title, description (the validated structured answers; schema_id, schema_version, schema_hash stamped), owner_id null, status (open|claimed|in_progress|done|dropped), required bool default true, dropped_reason null, verification_note null, created_by, created_at, updated_at, origin_node_id, protocol_version; task_blocker: id, task_id, text, cleared_at null, cleared_note, created_by. Migration via db:generate. Tasks are public with the problem after T04 (steps of a stage, never private).
2. Endpoints: GET /v1/stages/{id}/tasks (public), POST /v1/stages/{id}/tasks (the stage's decider or steward; only when the stage is `active` and a `stage_choice` with a clear gate exists, so a stage with `needs_choice` false (classic-5 `facts`, `implement`, `verify`) may create tasks directly), PATCH /v1/tasks/{id} (assignee or steward: status, verificationNote, droppedReason required when dropping), POST /v1/tasks/{id}/claim (member: sets owner when unowned, one winner), POST /v1/tasks/{id}/blockers and PATCH blocker clear. Verification of a task is by someone other than the doer (a different account must set `verified`; `VERIFY-1`). Progress notes are progress_update contributions reusing plan 04 (exempt from cooldown, allowed in an `active` or `blocked` stage); no new text store.
3. `TaskPort` implementation for 12-u06: `requiredTasksDone(stageId)` returns done or the list of open required tasks with their reasons; ST04 is refused with fieldErrors naming them. A completed task alone is never evidence (the stage still needs `stage_evidence`, `VERIFY-1`). A stage in `blocked` or `resolving` refuses new tasks.
4. Fan-out: task claimed and completed produce notifications through the plan 04 fan-out (add task_updated kind).
5. Tests: tasks refused before the choice gate when the stage needs a choice; ST04 blocked by an open required task and allowed after done or dropped with reason; claim races (one owner); the doer cannot verify their own task; blockers; permissions; key-set tests (no email).
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- ST04 prerequisites on tasks are enforced server-side through the port.
- Dropping a task requires a reason; verification needs a second account.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Stage blockers (ST07, ST08) and the stuck problem state (05-u03).
- Verification evidence and the solved check (05-u02).
