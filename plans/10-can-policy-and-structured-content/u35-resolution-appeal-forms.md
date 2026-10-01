---
id: "10-u35"
plan: "10"
title: "Decision record, task, verification and appeal forms rebuilt on the schema renderer"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 35
depends_on: ["10-u05","10-u29","10-u11","10-u12","04-u10","05-u05","05-u08","03-u22"]
writes: ["src/features/decisions/**","src/features/tasks/**","src/features/appeals/**","src/features/terminal/**","src/i18n/en.json","__tests__/decisions/**","__tests__/tasks/**","__tests__/appeals/**","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/forms.md#WF-FORM-1","docs/design/ux/wireframes/participate.md#WF-DECREC-1","docs/design/ux/wireframes/submit.md#WF-APPEAL-1","docs/design/ai/structured-content.md#1-content-types-and-their-schemas"]
verify: ["npm run gen:api","npm run verify"]
founder_gate: false
defaults: "Keep screens, state controls and moderation confirm panels; replace entry forms only. Terminal-action forms (05-u08) become schema forms only where a schema exists in plan 10 (decision_record, task, verification, appeal); other terminal actions stay as built."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Decision record (04-u10), task and verification evidence (05-u05), terminal action forms (05-u08) and the appeal form (03-u22) are rendered from their schemas. The appeal form keeps the "never new personal data" guidance and the closed reason hints.

## Steps
1. Replace each hand-built form with `SchemaForm` for `decision_record`, `task`, `verification`, `appeal`; keep headers, status chips and state control wiring.
2. Appeal form: decision ref is prefilled and read-only, rule ids come from the decision payload, guidance reminds no new personal data, `new_evidence_refs` uses the `evidence_url` widget.
3. Delete hard-coded field names and add grep tests; payloads carry schema stamps; unsupported widgets fail safe.
4. Tests per form from fixture schemas; submit disabled until required fields answered or marked unknown where allowed; RTL snapshot for the decision record.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-DECREC-1.
- Four forms render only from schemas (grep tests).
- Appeal payload includes the decision ref and schema stamps.
- Existing screens and navigation tests pass unchanged.
- `npm run verify` is green on web.

## Out of scope
- Policy proposal form (10-u38).
- Hints and assist (10-u36).
