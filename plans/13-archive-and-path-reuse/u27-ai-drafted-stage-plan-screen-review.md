---
id: "13-u27"
plan: "13"
title: "AI-drafted stage plan screen: review, edit, apply (WF-STAGEDRAFT-1)"
repo: can_app
area: can-app
model: sonnet
est_hours: 1.5
priority: 434
depends_on: ["13-u16","12-u05","12-u14","12-u21"]
writes: ["app/me/problems/**","src/features/stage-draft/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/stage-draft*.test.tsx"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/archive.md#WF-STAGEDRAFT-1","docs/design/ux/copy-deck-archive.md","docs/design/flows/stage-draft.md","docs/spec/constitution/rules-legal-sim.md#REUSE-CREDIT-1","docs/design/ux/wireframes/prepare.md#WF-PREP-3","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Route /me/problems/{id}/stage-draft, shown to the poster after publication when a draft exists or matching paths exist. Nothing is applied until the poster presses apply.

## Steps
1. Run `npm run gen:api` first (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit; the server contract is already done.
2. Screen over `getStageDraft` and `requestStageDraft`: graph and list toggle (list default for screen readers), each stage with its source ("Case A, Case B"), "Starts after", criteria, edit and remove; "Edited by you" after a change; add stage. Editing reuses the stage plan editor components of 12-u14 (WF-PREP-3: checkboxes and selects, no drag-only interaction); apply goes through the plan change screen flow of 12-u21 (the same check and failure states).
3. Apply calls `applyStageDraft`, shows `stagedraft.checking` while DP-STAGE-PLAN runs; on failure shows `stagedraft.checkFailed` with the stage named and nothing is lost. Discard asks to confirm. The credit lines (`credit.line`, `credit.carried`) are always visible; credit shows on the public stage map after apply (12-u05 consumes `basedOn`).
4. The community line (`stagedraft.community`) says the community may still take part and is not a blocker. Only the poster can open the route; others see the not-permitted state. Offline keeps edits on the device.
5. States: loading, unavailable (`stagedraft.unavailable`), not permitted, offline, expired draft.
6. Every string goes through useT() ids added to src/i18n/en.json and the ids of docs/design/ux/copy-deck-archive.md; no em or en dashes (npm run lint:copy). Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply.
7. Tests: edit marks "Edited by you"; apply success and failure paths keep the draft; discard confirm; credit always visible; not permitted for non-poster; offline edits kept; both views list the same data.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- Nothing is applied before the apply press.
- A failed check loses no edit.
- `npm run verify` is green.

## Out of scope
- The stage plan editor itself (plan 12).
