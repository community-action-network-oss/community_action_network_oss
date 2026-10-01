---
id: "10-u37"
plan: "10"
title: "Draft schema version change screen: pin, move, confirm mappings (WF-FORM-5)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 37
depends_on: ["10-u31","10-u33"]
writes: ["src/forms/schema/**","src/features/submit/**","app/submit/**","src/i18n/en.json","__tests__/forms/**","src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/forms.md#WF-FORM-5","docs/design/flows/policy-schema-change.md","docs/design/ai/structured-content.md#8-how-schemas-change"]
verify: ["npm run gen:api","npm run verify"]
founder_gate: false
defaults: "Offer Move and Stay exactly as WF-FORM-5 shows; Stay is unavailable once `grace_ends_at` has passed."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Show the person that their draft is pinned to an older form version, what is new or changed, and let them move with per-field confirmation of the mapping, or stay until the grace window ends.

## Steps
1. Banner on a pinned draft: version pinned text, newer-available text, list of new or changed fields from `GET /v1/drafts/{id}/migration`, buttons Move and Stay, the grace end date in plain text.
2. Migration view for a major bump: each mapping row shows the old answer and the target field, with a confirm control per row; unmapped required fields (`new_required`) appear as fresh questions; `POST` the confirmed mapping; success restamps the draft and reopens the form.
3. Minor bump: no screen, a one-line notice "new optional fields added" on next open.
4. Tests with fixtures for minor and major bumps, expired grace, keyboard and screen reader order, RTL.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-FORM-5.
- A pinned draft shows what changed and offers Move and Stay (tests).
- Moving requires confirming each mapping row; new required fields are asked fresh (tests).
- After the grace date Stay is not offered (test).
- `npm run verify` is green on web.

## Out of scope
- Server migration logic (10-u31).
