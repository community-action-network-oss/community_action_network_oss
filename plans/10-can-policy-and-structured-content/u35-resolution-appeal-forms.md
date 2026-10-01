---
id: "10-u35"
plan: "10"
title: "Decision record, task and verification forms rebuilt on the schema renderer"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 35
depends_on: ["10-u05","10-u29","10-u11","04-u10","05-u05","05-u08"]
writes: ["src/features/decisions/**","src/features/tasks/**","src/features/terminal/**","src/i18n/en.json","__tests__/decisions/**","__tests__/tasks/**","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/forms.md#WF-FORM-1","docs/design/ux/wireframes/participate.md#WF-DECREC-1","docs/design/ai/structured-content.md#1-content-types-and-their-schemas"]
verify: ["npm run gen:api","npm run verify"]
founder_gate: false
defaults: "Keep screens, state controls and moderation confirm panels; replace entry forms only. Terminal-action forms (05-u08) become schema forms only where a schema exists in plan 10 (decision_record, task, verification); the appeal form belongs to plan 09 (09-u51, which already uses the 10-u05 renderer), so it is NOT touched here; other terminal actions stay as built."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Decision record (04-u10), task and verification evidence (05-u05) and the terminal action forms of 05-u08 that have a schema are rendered from their schemas. The appeal form is plan 09 (09-u51).

## Steps
1. Replace each hand-built form with `SchemaForm` for `decision_record`, `task`, `verification`; keep headers, status chips and state control wiring.
2. Delete hard-coded field names and add grep tests; payloads carry schema stamps; unsupported widgets fail safe.
3. Tests per form from fixture schemas; submit disabled until required fields answered or marked unknown where allowed; RTL snapshot for the decision record.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-DECREC-1.
- Three forms render only from schemas (grep tests).
- Existing screens and navigation tests pass unchanged.
- `npm run verify` is green on web.

## Out of scope
- The appeal form (09-u51).
- Policy proposal form (10-u38).
- Hints and assist (10-u36).
