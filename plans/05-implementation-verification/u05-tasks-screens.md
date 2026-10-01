---
id: "05-u05"
plan: "05"
title: "Task detail and verification form (WF-TASK-2) and the steps list for the stage workspace"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 94
depends_on: ["05-u01", "05-u02", "04-u10", "02-u24", "02-u25", "10-u05"]
writes: ["app/tasks/**","src/tasks/**","src/i18n/en.json","__tests__/task-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/participate.md#WF-TASK-2", "docs/design/ux/wireframes/stages.md#WF-STAGE-1", "docs/design/ux/wireframes/forms.md#WF-FORM-1", "docs/spec/constitution/rules.md#EVID-URL-1", "docs/spec/01-slice-1-brief.md#7-what-solved-means", "docs/design/ux/copy-deck.md", "docs/design/ux/ui-unit-template.md"]
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
WF-TASK-1 (the Tasks tab) is retired by D-72 and becomes the Steps section of WF-STAGE-1. This unit builds the reusable `StepsList` component (steps of a stage: title, status text, owner handle, required marker as text, blockers) and WF-TASK-2 (task detail: claim, progress, blockers, verification), using the generated client. The task and verification-evidence forms are hosted by the schema renderer (10-u05) and completed by 10-u35; no field is hard-coded here. The stage workspace (12-u18) mounts `StepsList`.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. `src/tasks/StepsList.tsx` from GET /v1/stages/{id}/tasks: title, status text, owner handle, required marker as text, blockers; the add-step action for the decider after the choice (or directly when the stage needs no choice); empty state `{stage.step.empty}` before the choice.
3. app/tasks/[id].tsx: claim, status changes (dropping asks for a reason), progress update (posts a progress_update contribution), blockers add and clear, and the verification evidence form mounted as SchemaForm on the pinned verification schema (URL, kind, observed date, attestation about a public role are schema fields with their guidance; flags and revision hints from the server are mapped to the field through the renderer). Verification must be by someone other than the doer: the control is hidden for the doer and the reason is given in words. Progress updates and task creation mount SchemaForm the same way.
4. Copy: a completed task is not a solved problem or a resolved stage (one explanatory sentence on the verification section). States: loading, empty ("No steps yet"), validation, not permitted (names who can claim), tombstone not applicable.
5. Tests: claim race error mapping (409 shown calmly), drop requires reason, evidence validation comes from the schema (the screen names no field; grep test over src/tasks), role-based controls including the verify-by-another rule, empty and error states.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- No upload control exists; only URL fields.
- Controls shown depend on API-provided permissions.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The stage workspace screen (12-u18) and problem-level action forms (05-u08).
