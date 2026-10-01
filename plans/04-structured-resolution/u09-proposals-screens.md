---
id: "04-u09"
plan: "04"
title: "Options comparison view and option form shell (replaces the Proposals tab; lives inside the stage workspace)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 78
depends_on: ["04-u04", "04-u08", "02-u24", "02-u25", "10-u05"]
writes: ["app/problems/**","src/stages/options/**","src/i18n/en.json","__tests__/option-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/stages.md#WF-STAGE-1", "docs/design/ux/wireframes/participate.md#WF-PROPOSAL-1", "docs/design/ux/wireframes/participate.md#WF-PROPOSAL-2", "docs/design/ux/wireframes/forms.md#WF-FORM-1", "docs/spec/01b-stages.md", "docs/design/ux/copy-deck.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/options-screens.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-PROPOSAL-1 is retired by D-72 and becomes the Options section of WF-STAGE-1, where comparison stays as a view. This unit builds the reusable `OptionsComparison` component (options side by side on mechanism, success metric, risks and verification plan, with no scores) and WF-PROPOSAL-2 as the option form shell hosting the schema renderer (10-u05). The stage workspace screen (12-u18) composes them. The form fields come from the pinned `stage_option` schema, never from this unit.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. `src/stages/options/OptionsComparison.tsx`: comparison table on wide screens that collapses to stacked cards at narrow widths (rows are the four fields; real table semantics on web), each card labelled by summary; "Awaiting review" labels for own options still in the moderation run; improvements listed under their option; no ranking, scores or votes. Data from `GET /v1/stages/{id}/options` (`comparison`).
3. app/problems/[id]/stages/[stageId]/option.tsx: load useContentSchema("stage_option") and render SchemaForm (10-u05) with the schema stamp (10-u29); the success-metric guidance, counters and examples come from the schema's x-guidance, not from this unit; edit only while allowed by the API; server field errors and revision hints mapped onto the renderer. 10-u34 completes it. Creating an option posts a `proposed_solution` contribution with the stageId (04-u02).
4. Guidance and examples are shown by the renderer and labelled synthetic ("Example, synthetic").
5. Tests: comparison renders all four fields per option, narrow layout stacks, guests read-only, the screen renders the option fixture schema through SchemaForm and names no field (grep test over src/stages/options), own awaiting-review label, no score elements.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Comparison uses table semantics on web and remains readable at 200 percent text and 360 px.
- No scoring UI exists.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The stage workspace screen and the choice section (12-u18, 04-u10).
