---
id: "12-u18"
plan: "12"
title: "Stage workspace (WF-STAGE-1): options, choice, steps, evidence, criteria and submit"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 43
depends_on: ["12-u05","12-u06","04-u08","04-u09","04-u10","05-u05","10-u05","10-u29","02-u24","02-u25"]
writes: ["app/problems/**", "src/stages/workspace/**", "src/i18n/en.json", "__tests__/stage-workspace-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/stages.md#WF-STAGE-1", "docs/design/ux/wireframes/participate.md#WF-TASK-2", "docs/spec/01b-stages.md", "docs/design/flows/stage-work.md", "docs/spec/constitution/rules.md#VERIFY-1", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/stage-workspace-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-STAGE-1 at `/problems/{id}/stages/{stageId}` for stages in state ready, active or resolving: the one repeatable loop of options, choice, steps, evidence and criteria that replaces the old proposals, decision and tasks tabs. It composes the components of 04-u08 (ContributionList), 04-u09 (OptionsComparison, option form) and 04-u10 (ChoiceRecord, StageControls) and adds steps, evidence and criteria sections.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. Header: `< Stage map`, stage name with its chip, `{stagemap.after}` predecessors. Sections in order: `{stage.options}` (OptionsComparison, `{stage.option.add}` opens the schema form, `{stage.option.empty}`), `{stage.choice}` (method text from the stage, `{stage.choice.pending}`, `{stage.choice.make}` for the decider only, then ChoiceRecord with dissent and policy badge), `{stage.steps}` (tasks of the stage with owner, status and required flag; `{stage.step.add}`; `{stage.step.empty}` before the choice; step detail and verification use the WF-TASK-2 schema form of plan 05, verification by someone other than the doer), `{stage.evidence}` (URL only evidence with the criteria each supports, `{stage.evidence.add}` on the schema form), `{stage.criteria}` with `{stage.criteria.progress}` and a text checklist per criterion ("Has evidence" or "No evidence yet"), and the submit action `{stage.submit}` (ST04).
3. Everything the viewer may do comes from `allowedStageTransitions` and the stage response; contributions made ahead appear marked "Added ahead of time"; a steward sees `Attach to evidence` on kept contributions (12-u10).
4. While `resolving` the screen shows `{stage.checking}`, the criteria are read only and the evidence is frozen; after a result the screen links to WF-STAGE-2 (12-u19). A blocked stage shows its constraint and next route.
5. Slots for the Guest badge and the Impacted only filter on options, choice comments, evidence and steps (12-u22, 12-u23) are props.
5a. Reply allowance (D-85): show the remaining-replies indicator from 04-u08 beside `{stage.option.add}` and `{stage.evidence.add}`; those actions open the add screen, which blocks submit at 0 with the reset time. Handle 429 `reply_limit_reached` from the option and evidence forms.
6. States: loading, error, offline, session expired, not permitted, empty sections, tombstone for withdrawn items.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- No section hard-codes a form field; every form is a SchemaForm (grep test).
- The choice, steps and submit controls appear only when the API allows them for the viewer.
- Evidence is URL only and each item names the criteria it supports.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The result screen (12-u19), contributing ahead (12-u20) and the plan change form (12-u21).
- Task and blocker data models (05-u01).
