---
id: "03-u21"
plan: "03"
title: "Decision screens with hints beside fields and revise-resubmit"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 57
depends_on: ["03-u20","03-u10","03-u09","02-u24","02-u25"]
writes: ["app/me/problems/**","src/decisions/**","src/submit/**","src/i18n/en.json","__tests__/decision-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/submit.md#WF-DECISION-1","docs/design/ux/wireframes/submit.md#WF-DECISION-2","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/constitution/rules.md#MOD-EXPLAIN-1","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/decision-screens.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: skipped
attempts: 0
commits: []
actual_hours: null
blocked_reason: "superseded by 09-u49"
---
## Objective
SUPERSEDED: replaced by 09-u49. Decision screens are replaced by decision screens with hints beside fields and policy version. This unit is skipped and builds nothing; the text below is kept only as history.

WF-DECISION-1 (changes requested) shows each revision hint beside its field with rule texts; WF-DECISION-2 (not accepted) shows reasons, the exact deletion date, and appeal and external route entries. "Revise and resubmit" keeps the draft.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/me/problems/[id]/decision.tsx from GET /v1/problems/{id}/moderation and the problem: for needs_revision render the edit form for the flagged fields with HintCallout beside each (field label, revision hint, rule id with plain text from the rules endpoint, struck-through style plus text "Addressed" when the API marks hints addressed or struck), policy version, "Interim decision, will be re-reviewed", appeal entry with the exact appealable-until date.
3. Revise and resubmit: edits PATCH the draft (fields only the flagged ones need change), then POST transitions {to: "submitted"} (T03); API field errors map back to fields; never retype: all text pre-filled from the server draft.
4. Rejected (WF-DECISION-2): public explanation, rule ids with texts, the deletion date ("Your text is deleted on {date}"), a copy-text action that copies the text to the clipboard and offers starting a new draft (pre-filled in the local draft store), Appeal button (route /me/problems/{id}/appeal, window-closed state disables it with the date), and a link to external routes (plan 05; plain text for now).
5. Not permitted for other users: shows who can see it. Loading, error, offline states.
6. Tests: hints beside the right fields with text not colour; resubmit flow calls PATCH then transition; rejected shows deletion date and appeal availability both open and closed; copy action; interim notice present.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Every hint renders next to its field (test by field ref).
- The deletion date and appeal deadline are the API values.
- Revise keeps all prior text.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Appeal form (next unit).
- Moderator screens.
