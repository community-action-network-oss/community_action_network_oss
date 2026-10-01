---
id: "03-u24"
plan: "03"
title: "Moderator review screen with explainable decision form"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 60
depends_on: ["03-u23","03-u10","03-u08","02-u24","02-u25"]
writes: ["app/mod/problems/**","src/moderator/**","src/i18n/en.json","__tests__/mod-review-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/moderation.md#WF-MOD-REVIEW-1","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/constitution/rules.md#MOD-EXPLAIN-1","docs/spec/constitution/rules.md#INTERIM-1","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/mod-review.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-MOD-REVIEW-1: read a submission with its check results, then decide (publish, request changes, reject) with the MOD-EXPLAIN-1 fields enforced by the form.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/mod/problems/[id].tsx: two panes on wide screens, stacked on narrow. Left: the submitted text per field with kept-flag markers and repost note. Right: decision form: outcome radio, rule ids multi-select from GET /v1/rules showing plain text, field picker plus optional text span (select a span in the preview and store start and end), revision hint, public explanation, internal note (labelled moderator only, never shown), jurisdiction select for publish, interim disclosure text, safety-sensitive checkbox that makes the hint optional.
3. Validation mirrors MOD-EXPLAIN-1: Save is blocked and the first missing field focused when rule ids, field ref or hint are missing (server errors also mapped); decision incomplete state per screens.md.
4. On success show the outcome and return to the queue with a status message. A moderator reviewing their own problem sees not permitted.
5. Tests: form validation per outcome, span selection, safety-sensitive path, server field errors mapped, not permitted state, interim text.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- A reject or revise decision cannot be saved from the UI without rule ids, a field reference and a hint (unless safety sensitive).
- Internal note is labelled and never rendered outside this screen.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Appeal review (next unit).
