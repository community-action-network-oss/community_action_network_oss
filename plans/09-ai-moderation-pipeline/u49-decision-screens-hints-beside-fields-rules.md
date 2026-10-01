---
id: "09-u49"
plan: "09"
title: "Decision screens: hints beside fields, rules, policy version"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 278
depends_on: ["09-u48","09-u24","10-u05","02-u25"]
writes: ["app/me/problems/**","src/features/moderation/decision/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/decision-*.test.tsx"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/submit.md#WF-DECISION-1","docs/design/ux/wireframes/submit.md#WF-DECISION-2","docs/design/ux/wireframes/forms.md#WF-FORM-3","docs/spec/constitution/rules.md#MOD-EXPLAIN-1","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1","docs/design/ai/structured-content.md","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/decision-screens.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-DECISION-1 (changes requested) shows each revision hint beside its field with rule ids and the policy version under which it was decided. WF-DECISION-2 (not accepted) shows the reason, the rule, the deletion date and appeal and external route entries. No person decided: the screen says so.

## Steps
1. Run `npm run gen:api` first (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The server units this depends on are already done, so the contract exists.
2. src/features/moderation/decision/DecisionView.tsx from GET /v1/problems/{id}/moderation: for needs_revision render the schema-driven form renderer of 10-u05 (import it, do not rebuild) with a hint map keyed by fieldRef, HintCallout beside each field (hint text plus icon, not red, rule id with plain text, policy version badge `status.decidedUnder` or `status.transitional`, span highlight when offsets exist). Focus moves to the first hinted field.
3. Revise and resubmit keeps every answer (pre-filled from the server draft), PATCHes the changed fields then POSTs the T03 transition; API field errors map back to fields; never retype.
4. Rejected (WF-DECISION-2): public explanation, rule ids with texts, route text from the jurisdiction pack, `decision.deleteDate` and `decision.appealUntil` from API values, actions Revise as a shared condition, Appeal this decision (disabled with the date when the window is closed), Delete now (confirm).
5. Show decision.noPerson ("No person decided this; it was applied by policy {version} and can be appealed") and the model class and prompt variant disclosure when present. Hints struck through with the text "Addressed" after an overturn (API marks them).
6. Not permitted for other users shows who can see it (common.notPermitted). Loading, error, offline states per the template.
7. Tests: every hint renders beside its field by field ref; text plus icon; resubmit calls PATCH then transition; rejected shows both dates and appeal open and closed; decidedUnder badge and transitional variant; a fixture schema with a different field set renders hints without code changes.
8. Supersession guard: if the older human-moderator version of this screen from plan 03 (03-u20 to 03-u25) exists, delete the files it wrote for it and their tests, and note the deletions in the commit message. Keep route paths stable.
9. Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply; strings only through useT() ids added to src/i18n/en.json and docs/design/ux/copy-deck.md ids; no em or en dashes (npm run lint:copy).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- Every hint renders next to its field (test by field ref).
- Dates and rule texts come from the API.
- Revise keeps all prior text.
- `npm run verify` is green.

## Out of scope
- Appeal form and timeline (later unit).
- The form renderer itself (10-u05). The appeal form of 10-u35 is superseded by the appeal unit here.
