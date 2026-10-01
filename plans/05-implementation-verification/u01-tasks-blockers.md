---
id: "05-u01"
plan: "05"
title: "Tasks, blockers and T11, T12 enforcement"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 90
depends_on: ["04-u07"]
writes: ["src/tasks/**","src/problems/app/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/tasks.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/design/system-design.md#6-api-surface-v1","docs/spec/constitution/rules.md#LEGAL-GATE-1","docs/design/ux/wireframes/participate.md#WF-TASK-1","docs/design/ux/wireframes/participate.md#WF-TASK-2"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/tasks.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Add tasks and blockers and make the engine enforce T11 (solution_selection to implementation) and T12 (implementation to verification).

## Steps
1. Schema task: id, problem_id, decision_record_id, title, description, owner_id null, status (open|claimed|in_progress|done|dropped), required bool default true, dropped_reason null, verification_note null, created_by, created_at, updated_at, origin_node_id, protocol_version; blocker: id, task_id, text, cleared_at null, cleared_note, created_by. Migration via db:generate.
2. Endpoints: GET /v1/problems/{id}/tasks (public), POST /v1/problems/{id}/tasks (initiator; only after a decision record exists), PATCH /v1/tasks/{id} (assignee or initiator: status, verificationNote, droppedReason required when dropping), POST /v1/tasks/{id}/claim (member: sets owner when unowned; recorded as an implementation_offer style event), POST /v1/tasks/{id}/blockers and PATCH blocker clear. Progress notes are progress_update contributions reusing plan 04 (exempt from cooldown); no new text store.
3. Engine context (src/problems/app/transition-context.ts): T11 requires a decision_record for an accepted proposal, a legal_gate_record with outcome clear, and at least one task; the transitions endpoint call carries decisionRecordId only, the server verifies the rest. T12 requires every required task done or dropped with a reason, and the chosen proposal verification plan present.
4. Fan-out: task claimed and completed produce notifications through the plan 04 fan-out (state_changed kinds only for lifecycle changes; add task_updated kind).
5. Tests: T11 missing each prerequisite fails with the right fieldError, T11 success with a decision and a task, T12 blocked by an open required task and allowed after done or dropped with reason, claim races (one owner), blockers, permissions, key-set tests (no email).
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- T11 and T12 enforce their table prerequisites server-side.
- Dropping a task requires a reason.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Verification evidence and terminal transitions (next units).
