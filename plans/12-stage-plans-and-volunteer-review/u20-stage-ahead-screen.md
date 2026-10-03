---
id: "12-u20"
plan: "12"
title: "Contribute ahead to a planned stage (WF-STAGE-3)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 45
depends_on: ["12-u18", "04-u08", "12-u10", "02-u24", "02-u25"]
writes: ["app/problems/**", "src/stages/ahead/**", "src/i18n/en.json", "__tests__/stage-ahead-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/stages.md#WF-STAGE-3", "docs/spec/01b-stages.md", "docs/spec/constitution/rules.md#STAGE-PREP-1", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/stage-ahead-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-STAGE-3 on the same route as the workspace when the stage is Planned (or Ready and not started): people contribute options, evidence notes and criteria suggestions ahead of time, kept ready (`STAGE-PREP-1`). Choosing, steps and submitting evidence stay unavailable and say so in words.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. `{stage.locked}` with the predecessors, `{stage.ahead.title}`, `{stage.ahead.body}`, `{stage.ahead.waiting}`; the existing ahead items with `{stage.ahead.kept}`; `{stage.ahead.add}` opens the add-contribution screen (04-u08) with `stageId` and only the types the API allows for a planned or ready stage (never `progress_update` or `verification_evidence`).
3. A "Not available yet: choosing, steps, submitting evidence" block is shown in words; the sections of the workspace for those actions are not rendered.
4. A Skipped stage shows its reason and keeps ahead contributions readable; when the stage starts, ahead items appear in WF-STAGE-1 marked "Added ahead of time".
5. Slots for the Guest badge and the Impacted only filter (12-u22, 12-u23).
5a. Reply allowance (D-85): ahead-of-time items are replies. Show the remaining-replies indicator from 04-u08 beside `{stage.ahead.add}`; at 0 left the add action says in words when it is possible again (`reply.next`).
6. States: loading, error, offline, session expired, not permitted, empty ("No contributions yet. Add the first.").

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The planned view offers only the allowed contribution types and no choice, step or evidence actions.
- Items made ahead are visibly labelled for a later stage.
- A disallowed pair never reaches the API from the UI.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Attaching a contribution as evidence (12-u10 server; the attach action lives in 12-u18).
