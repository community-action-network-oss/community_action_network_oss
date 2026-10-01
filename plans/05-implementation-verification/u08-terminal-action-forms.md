---
id: "05-u08"
plan: "05"
title: "Terminal action forms and moderator confirm panel"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 97
depends_on: ["05-u06","05-u05","05-u04","03-u24","02-u24","02-u25"]
writes: ["src/stage/**","src/moderator/**","app/mod/problems/**","src/problems/**","src/i18n/en.json","__tests__/terminal-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/browse.md#WF-DETAIL-3","docs/design/ux/wireframes/moderation.md#WF-MOD-REVIEW-1","docs/spec/01-slice-1-brief.md#4-lifecycle","docs/spec/01-slice-1-brief.md#7-what-solved-means","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/terminal-forms.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Extend the stage controls from plan 04 to the later transitions (T11 to T21) and give moderators one place to confirm or decline pending transitions with explanation fields.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. Register field forms in src/stage/fieldForms.tsx for the new FieldKeys: decisionRecordId picker, failed-check note with evidence picker, outcomeStatement with a hint that quotes the chosen success metric, blocker fields, pause fields (review date input with the 90 day maximum validated), reasonCode select per transition, duplicate target search (reads the public list), destination and routeText, resumeConditionMetNote, clearedNote.
3. Withdraw (T21) shows the OWN-1 explanation up front and falls back to the "request closure" form when the API says other contributions exist (allowedTransitions omits T21).
4. Moderator confirm panel: on WF-MOD-REVIEW-1 for problems with pending_transition show the proposal, the proposer, fields, and Confirm or Decline with rule ids and explanation (MOD-EXPLAIN-1 fields for decline); self-confirmation disclosure banner when the API says the pool is one. Queue tab for pending confirmations and pause reviews added to WF-MOD-QUEUE-1.
5. Tests: each form maps fieldErrors, T21 fallback to closure request, confirm and decline calls, disclosure banner, review date over 90 days blocked client side (server still authoritative).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Controls and required fields come from the API allowedTransitions and requires lists.
- Moderator confirmation uses the same explanation fields as other decisions.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Contribution flows.
