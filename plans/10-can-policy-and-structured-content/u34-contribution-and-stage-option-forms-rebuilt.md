---
id: "10-u34"
plan: "10"
title: "Contribution and stage option forms rebuilt on the schema renderer"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 34
depends_on: ["10-u05","10-u29","10-u10","04-u08","04-u09"]
writes: ["src/features/contributions/**","src/features/proposals/**","app/problem/**","src/i18n/en.json","__tests__/contributions/**","__tests__/proposals/**","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/forms.md#WF-FORM-1","docs/design/ux/wireframes/participate.md#WF-CONTRIB-1","docs/design/ux/wireframes/participate.md#WF-PROPOSAL-1","docs/design/ai/structured-content.md#1-content-types-and-their-schemas"]
verify: ["npm run gen:api","npm run verify"]
founder_gate: false
defaults: "Keep tabs, lists and comparison views from 04-u08 and 04-u09; replace only the entry forms. The contribution type picker lists the types the server allows for the problem state (existing allowed-per-state endpoint), each opening `contribution.<type>` from the registry."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The add-contribution flow and the proposal form become schema forms: pick an allowed type, `SchemaForm` renders `contribution.<type>` (or `stage_option`), submit stamps the schema version. No contribution field is hard-coded in the app.

## Steps
1. Type picker: for the current problem state list allowed types (from 04-u02), label from schema messages; selecting a type calls `useContentSchema("contribution.<type>")`.
2. Replace the hand-built forms of 04-u08 and 04-u09 with `SchemaForm`; keep `target` (problem, task or contribution id) as a hidden typed field set by the route; keep cooldown and pending-review messages; show `x-guidance` per field.
3. personal_experience form shows the "no case narrative" guidance prominently and the WF-FORM-1 basis control; evidence and verification_evidence use the `evidence_url` widget (URL only, no uploads).
4. Delete hard-coded field names and per-type switch statements (grep test over `src/features/contributions` and the stage option form directory of plan 12).
5. Tests: each of 13 contribution types plus stage_option renders from a fixture schema set copied from can_policy v1 schemas (trimmed copies with origin note); an unsupported type shows the unsupported placeholder; payload carries schema stamps; RTL and a11y smoke.
6. Lifecycle v2: the stage option form is mounted by the stage workspace (WF-STAGE-1, WF-STAGE-3, plan 12); contributions ahead of time to a `planned` stage show the "for a later stage" label and only the nine allowed types; the form posts the attestation object through the hook of 14-u05 when present. `proposal` as a route or noun no longer exists (D-74).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-CONTRIB-1.
- All contribution types and the proposal form render from schemas (tests).
- No field name or per-type switch remains in feature code (grep tests).
- Cooldown and pending-review messaging still works.
- `npm run verify` is green on web.

## Out of scope
- Decision record, task, verification, appeal forms (10-u35).
- Hints and assist (10-u36).
