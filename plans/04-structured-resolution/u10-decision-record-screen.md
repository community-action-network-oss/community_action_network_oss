---
id: "04-u10"
plan: "04"
title: "Stage choice record view and stage controls (replaces the decision tab and T08 to T10 controls)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 79
depends_on: ["04-u09", "04-u05", "12-u06", "02-u24", "02-u25", "10-u05"]
writes: ["app/problems/**","src/decisions/**","src/stages/controls/**","src/i18n/en.json","__tests__/decrec-*.test.tsx","__tests__/stage-controls-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/stages.md#WF-STAGE-1", "docs/design/ux/wireframes/participate.md#WF-DECREC-1", "docs/design/ux/wireframes/participate.md#WF-DECREC-2", "docs/spec/01b-stages.md", "docs/spec/01a-lifecycle.md", "docs/spec/constitution/rules.md#LEGAL-GATE-1", "docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/design/ux/copy-deck.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/decision-record-screen.test.tsx __tests__/stage-controls-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-DECREC-1 is retired by D-72 and becomes the Choice section of WF-STAGE-1 (record, dissent and policy badge kept). This unit builds the reusable `ChoiceRecord` component and the generic `StageControls` that move a stage through its transitions (ST03 start, ST04 submit evidence for resolution, ST07 block) using the API's allowed stage transitions, so no right is hardcoded. The stage workspace screen (12-u18) composes them; WF-DECREC-2 stays the schema form behind the "make the choice" action.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. `src/decisions/ChoiceRecord.tsx`: empty state "No choice yet" with what must happen first; when present show chosen option or steps, method (from the stage's decision method), rationale, decider handle, authority text, dissent notes, the legal-gate record, "Decided under policy vX" (and "Policy vX, transitional stewardship" when the API sets transitional) as text plus shape, and the legal-gate record per layer with provision and corpus version (LEGAL-CITE-1). The recording form for the decider is the schema renderer (10-u05) on the decision_record schema (10-u35 completes it); this unit only mounts it. A withdrawn choice shows as withdrawn with its reason.
3. src/stages/controls/StageControls.tsx: reads `allowedStageTransitions` from the stage response (12-u06), renders one labelled action per allowed transition that applies to the viewer (label and explanation from API vocabulary, never hardcoded), opens the form through SchemaForm using the schema named by the transition's requires list (blocker statement, reason, notes are transition fields defined in docs/spec/01a-lifecycle.md (T11 to T14), not pack schemas; no FieldKey-to-input registry is kept in the app), calls the stage transition endpoint, maps fieldErrors, shows pending state text ("Checking evidence": the stage is waiting for its moderation run, never "awaiting moderator"). An unknown schema fails safe through the renderer's unsupported placeholder.
4. Wire both into the stage workspace route as components (12-u18 owns the screen; here they are exported with a storybook-free test harness screen).
5. Tests: the choice form comes from the schema, fieldErrors shown, checking-evidence state displayed, no control appears for a guest or a non-decider, a blocked-gate record shows its layer and provision, policy-version label text, actions shown equal the stub API list.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Actions shown equal the API allowed stage transitions (test with a stub).
- The policy-version label is text, not colour only; no field registry exists in src/stages/controls.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Step and task controls (plan 05).
- The stage workspace screen (12-u18).
