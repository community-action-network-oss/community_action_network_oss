---
id: "05-u05"
plan: "05"
title: "Tasks tab, task detail and verification evidence form"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 94
depends_on: ["05-u01","05-u02","04-u10"]
writes: ["app/problems/**","app/tasks/**","src/tasks/**","src/stage/**","src/i18n/en.json","__tests__/task-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/participate.md#WF-TASK-1","docs/design/ux/wireframes/participate.md#WF-TASK-2","docs/spec/constitution/rules.md#EVID-URL-1","docs/spec/01-slice-1-brief.md#7-what-solved-means","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/tasks-screens.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-TASK-1 (tasks list) and WF-TASK-2 (task detail: claim, progress, blockers, verification evidence), using the generated client.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. Tasks tab on the detail screen from GET tasks: title, status text, owner handle, required marker as text, blockers; creating tasks for the initiator after a decision exists.
3. app/tasks/[id].tsx: claim, status changes (dropping asks for a reason), progress update (posts a progress_update contribution), blockers add and clear, verification evidence form (URL, kind, observed date input type date on web, attestation about a public role with a hint that names of people are not allowed; flags from the server mapped to the field).
4. Copy: a completed task is not a solved problem (one explanatory sentence on the verification section). States: loading, empty ("No tasks yet"), validation, not permitted (names who can claim), tombstone not applicable.
5. Tests: claim race error mapping (409 shown calmly), drop requires reason, evidence validation, role-based controls, empty and error states.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- No upload control exists; only URL fields.
- Controls shown depend on API-provided permissions.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Terminal action forms (later unit).
