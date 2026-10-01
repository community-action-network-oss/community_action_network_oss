---
id: "05-u06"
plan: "05"
title: "Detail variants: paused, stuck, withdrawn, closed, redirected, tombstone"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 95
depends_on: ["05-u03","05-u04","04-u10"]
writes: ["src/problems/**","app/problems/**","src/i18n/en.json","__tests__/detail-variants*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/browse.md#WF-DETAIL-2","docs/design/ux/wireframes/browse.md#WF-DETAIL-3","docs/design/ux/screens.md#state-to-screen-map","docs/spec/01-slice-1-brief.md#4-lifecycle","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/detail-variants.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-DETAIL-3: status panel variants with neutral calm styling (never red), showing the reasons, resume conditions, blockers and routes the table requires, plus appeal entry on closed and redirected.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. Extend StatusPanel (variant prop prepared in plan 02) with: paused (reason, resume condition, review date), stuck (blocker statement, source and version, blocked actions, recheck date, next route, documented attempts), withdrawn (published withdrawn: tombstoned initiator text), closed (reason code text, explanation, duplicate target link), redirected (destination and route text), solved summary link to the Resolution record. All strings from the API vocabulary or fields; fallbacks come from the copy deck.
3. Appeal entry on closed and redirected for the initiator within the window (links to the plan 03 appeal screen).
4. Interim label wherever the API says interim. Colour tokens neutral; each variant has a text label and an icon shape.
5. Tests: one render test per variant with a fixture from the API schema, snapshot-free assertions on required fields, no red token usage (test scans styles for the urgent token on lifecycle chips), appeal entry only for the initiator inside the window.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Every required field from the brief table for each state is rendered.
- No lifecycle state uses the urgent or red token.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Forms to enter these states (next units).
