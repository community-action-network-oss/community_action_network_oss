---
id: "10-u36"
plan: "10"
title: "Fill-assist per-field confirm and revision hints beside fields (WF-FORM-2, WF-FORM-3)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 36
depends_on: ["10-u30","10-u33"]
writes: ["src/forms/schema/**","src/features/submit/**","src/i18n/en.json","__tests__/forms/**","src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/forms.md#WF-FORM-2","docs/design/ux/wireframes/forms.md#WF-FORM-3","docs/design/ai/structured-content.md#7-ai-fill-assist","docs/spec/constitution/rules.md#AI-ASSIST-1"]
verify: ["npm run gen:api","npm run verify"]
founder_gate: false
defaults: "Hints come from the check or submit response `needs_revision` payload (field_ref, revision_hint, rule_ids, policy_version) that plan 09 defines; build against the contract in the generated client and a fixture, and do not invent a new endpoint."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Add the two interactions that make structured forms bearable: optional "Suggest an answer" with a private notes box and per-field Use, Edit then use, Discard (no accept-all), the persistent Assisted marker; and `needs_revision` hints anchored to fields with text and icon, never red.

## Steps
1. Notes box (private, labelled never published) and "Suggest an answer" per field and for the form; call `POST /v1/content-schemas/{type}/assist`; show suggestions read-only beside the field with three actions; nothing fills a field by itself; no "accept all" control exists (test asserts its absence).
2. On Use or Edit then use: set the value, add `{field_ref, assist_run_id}` to the draft's `assisted` set, show `form.assist.marker`; the marker stays in preview and published view and clears only if the person clears and rewrites the field. Failure of assist (`assist_unavailable`) shows a plain message and leaves the form usable.
3. Hints: render `hints` map from the check response beside fields (WF-FORM-3): text plus icon, rule id and policy version line, actions "Mark as assumption" (switches the basis control) and "Add source"; focus moves to the first hinted field after a check; fields without hints stay plain; "Check my draft" triggers the advisory pass.
4. Tests: suggestion never fills by itself; Use and Edit paths set `assisted`; discard leaves value; hints rendering and focus move; no colour-only status; RTL; strings via messages and `useT()`.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-FORM-2.
- No accept-all control exists and a suggestion never writes a value without a click (tests).
- Assisted marker appears and persists through preview (test).
- Hints appear beside fields with the rule id and policy version, focus moves to the first (tests).
- `npm run verify` is green on web.

## Out of scope
- Server hint production and assist endpoint (plan 09, 10-u30).
- Draft migration (10-u37).
