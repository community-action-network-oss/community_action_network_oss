---
id: "12-u14"
plan: "12"
title: "Stage plan editor (WF-PREP-3): templates, graph and list, dependency checkboxes, classic-5"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 39
depends_on: ["12-u13", "12-u10", "12-u05", "12-u04", "02-u24", "02-u25"]
writes: ["app/me/problems/**", "src/preparation/plan/**", "src/i18n/en.json", "__tests__/plan-editor-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/prepare.md#WF-PREP-3", "docs/spec/01b-stages.md", "docs/design/flows/problem-preparation.md", "docs/design/flows/plan-change.md", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/plan-editor-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-PREP-3 at `/me/problems/{id}/stages`: optional stage plan editor. The starting choice (`classic-5` template from `GET /v1/stage-templates`, one stage, or blank), then the plan as a graph with an equivalent list (the same `StageMap` and `StageList` components of 12-u05 in an editable mode). `depends_on` is edited as checkboxes of other stages (keyboard operable), never by dragging lines.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. Starting choice `{plan.start.template}` or `{plan.start.blank}` with the template help; picking classic-5 fills five stages in series that the poster can rename, reorder, split or delete; a one-stage plan creates stage `resolve` whose criteria equal the final criteria.
3. Stage editor panel: name, goal, `{plan.stage.dependsOn}` checkboxes (`{plan.stage.dependsNone}` when empty), decision method radio (`{plan.method.poster}` default, `{plan.method.community}`, steward, other named), required, needs choice and auto start toggles from the schema, criteria through `CriteriaEditor` (12-u13), `{plan.stage.remove}`, `{plan.stage.add}`.
4. Inline validation from the same rules as the server (`validatePlan` mirrored by the API error codes, not re-implemented as a second source of truth: call a preview `POST /v1/problems/{id}/stage-plan/validate` on change; add that endpoint to 12-u04's plan service if missing): cycle (`{plan.graph.cycle}`) and a plan that cannot reach the final criteria (`{plan.graph.noEnd}`) are flagged inline with text and an icon and block saving the plan only, not the draft.
5. Graph and list views switch with the always visible toggle; the list is the default for screen readers and one-column phones; parallel branches are described in words (`{plan.graph.parallel}`).
6. States: loading, error, offline (local edit kept), session expired, not permitted (read only in `in_review` for anyone but the poster); after publication the screen redirects to the plan change form (12-u21).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Serial, parallel and mixed shapes can be built and saved; a cycle blocks saving the plan only.
- `depends_on` is keyboard-operable checkboxes; the graph only displays it.
- Decision method defaults to the poster after community input.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Plan changes after publication (12-u21, 12-u09).
- The AI drafted plan after publication (plan 13).
