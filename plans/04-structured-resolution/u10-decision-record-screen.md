---
id: "04-u10"
plan: "04"
title: "Decision record screen and stage transition controls"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 79
depends_on: ["04-u09", "04-u05", "02-u24", "02-u25", "10-u05"]
writes: ["app/problems/**","src/decisions/**","src/stage/**","src/i18n/en.json","__tests__/decrec-*.test.tsx","__tests__/stage-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/participate.md#WF-DECREC-1", "docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/spec/constitution/rules.md#LEGAL-GATE-1", "docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/design/ux/copy-deck.md", "docs/design/ux/ui-unit-template.md"]
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
WF-DECREC-1 (decision record tab with the policy-version label, empty state) plus the generic stage controls that move a problem through T08, T09 and T10 using the API allowedTransitions, so no right is hardcoded.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. Decision tab: empty state "No decision yet" with what must happen first; when present show chosen proposal, method, rationale, decider handle, authority text, dissent notes, legal-gate record, "Decided under policy vX" (and "Policy vX, transitional stewardship" when the API sets transitional) as text plus shape, and the legal-gate record per layer with provision and corpus version (LEGAL-CITE-1). The recording form for the initiator in solution_selection is the schema renderer (10-u05) on the decision_record schema (10-u35 completes it); this unit only mounts it.
3. src/stage/StageControls.tsx: reads allowedTransitions from the problem detail, renders one labelled action per allowed transition that applies to the viewer (label and explanation from API vocabulary, never hardcoded), opens the stage form through SchemaForm using the schema named by the transition's requires list (stage summary, reason and notes are schema fields in the pack, 10-u11; no FieldKey-to-input registry is kept in the app), calls POST transitions, maps fieldErrors, shows pending state text ("Awaiting review": a proposal waiting for its moderation run, never "awaiting moderator"). An unknown schema fails safe through the renderer's unsupported placeholder.
4. Wire StageControls into the detail screen status panel (plan 05 reuses it for the later transitions).
5. Tests: T08 form comes from the schema, fieldErrors shown, awaiting-review state displayed, no control appears for a guest, a blocked-gate record shows its layer and provision, policy-version label text.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Actions shown equal the API allowedTransitions (test with a stub).
- The policy-version label is text, not colour only; no field registry exists in src/stage.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Task controls (plan 05).
