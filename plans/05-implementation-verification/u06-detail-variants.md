---
id: "05-u06"
plan: "05"
title: "Detail variants: paused, stuck, withdrawn, closed, redirected, tombstone"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 95
depends_on: ["05-u03", "05-u04", "04-u10", "02-u24", "02-u25", "09-u50"]
writes: ["src/problems/**","app/problems/**","src/i18n/en.json","__tests__/detail-variants*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/browse.md#WF-DETAIL-2", "docs/design/ux/wireframes/browse.md#WF-DETAIL-3", "docs/design/ux/wireframes/submit.md#WF-REMOD-1", "docs/design/ux/screens.md#state-to-screen-map", "docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/design/ux/copy-deck.md", "docs/design/ux/ui-unit-template.md"]
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
WF-DETAIL-3: status panel variants with neutral calm styling (never red), showing the reasons, resume conditions, blockers and routes the table requires, plus appeal entry on closed and redirected, the legally blocked stuck variant, and the "Reopened under policy vX" notice after a re-resolution (T20, T21; the notice component is 09-u50, this unit places it in the panel). The stage map (12-u05) stays visible in every variant.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. Extend StatusPanel (variant prop prepared in plan 02) with: paused (reason, resume condition, review date), stuck (blocker statement, source and version, blocked actions, recheck date, next route, documented attempts, with the blocked stages listed by name; when the blocker is legal, the layer L0 to L6 and the provision cited, "Legally blocked: the solution is not lawful here, the problem stays open"), withdrawn (published withdrawn: tombstoned initiator text), closed (reason code text, explanation, duplicate target link), redirected (destination and route text), solved summary with the final criteria result link (`/problems/{id}/stages/final/result`, 12-u19) and the archive record link (`/archive/{id}`, WF-ARCHIVE-2, 13-u26). All strings from the API vocabulary or fields; fallbacks come from the copy deck.
3. Appeal entry on closed and redirected for the initiator within the window (links to the appeal form of 09-u51).
4. "Decided under policy vX" (and "Policy vX, transitional stewardship" when transitional) wherever the API supplies a policy version; "Reopened under policy vX" when reopened. Colour tokens neutral; each variant has a text label and an icon shape.
5. Tests: one render test per variant with a fixture from the API schema, snapshot-free assertions on required fields, no red token usage (test scans styles for the urgent token on lifecycle chips), appeal entry only for the initiator inside the window.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Every required field from docs/spec/01a-lifecycle.md (T11 to T18) for each state is rendered.
- No lifecycle state uses the urgent or red token.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Forms to enter these states (next units).
