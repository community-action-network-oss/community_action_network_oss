---
id: "04-u10"
plan: "04"
title: "Decision record screen and stage transition controls"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 79
depends_on: ["04-u09","04-u05"]
writes: ["app/problems/**","src/decisions/**","src/stage/**","src/i18n/en.json","__tests__/decrec-*.test.tsx","__tests__/stage-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/participate.md#WF-DECREC-1","docs/spec/01-slice-1-brief.md#4-lifecycle","docs/spec/constitution/rules.md#LEGAL-GATE-1","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/decision-record-screen.test.tsx __tests__/stage-controls.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-DECREC-1 (decision record tab with interim badge, empty state) plus the generic stage controls that move a problem through T08, T09 and T10 using the API allowedTransitions, so no right is hardcoded.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. Decision tab: empty state "No decision yet" with what must happen first; when present show chosen proposal, method, rationale, decider handle, authority text, dissent notes, legal-gate record, the "Interim decision, will be re-reviewed" badge as text plus shape. Recording form for the initiator or a moderator in solution_selection (rationale, authority, legal-gate outcome with constraint and source when blocked), calling POST decision.
3. src/stage/StageControls.tsx: reads allowedTransitions from the problem detail, renders one labelled action per allowed transition that applies to the viewer (label and explanation from API vocabulary, never hardcoded), opens a field form generated from the "requires" list (a small registry src/stage/fieldForms.tsx mapping FieldKey to inputs: stageSummary, missingEvidenceNote, noAlternativesNote, reason, ...), calls POST transitions, maps fieldErrors, shows pending (proposed, awaiting moderator) state text. Unknown FieldKeys render a generic text input with a console-free fallback label.
4. Wire StageControls into the detail screen status panel (plan 05 reuses it for the later transitions).
5. Tests: T08 form fields from requires, fieldErrors shown, pending state displayed, no control appears for a guest, decision form blocked-gate validation, interim badge text.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Actions shown equal the API allowedTransitions (test with a stub).
- Interim badge is text, not colour only.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Task controls (plan 05).
