---
id: "12-u13"
plan: "12"
title: "Acceptance criteria editor (WF-PREP-2): final criteria and a reusable per-stage editor"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 38
depends_on: ["12-u04", "10-u05", "02-u14", "12-u12", "02-u24", "02-u25"]
writes: ["app/me/problems/**", "src/preparation/criteria/**", "src/i18n/en.json", "__tests__/criteria-editor-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/prepare.md#WF-PREP-2", "docs/spec/01b-stages.md", "docs/spec/constitution/rules.md#CRITERIA-1", "docs/design/flows/problem-preparation.md", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/criteria-editor-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-PREP-2 at `/me/problems/{id}/criteria`: one measurable statement per criterion with measure, target and evidence fields (rendered from the pinned `acceptance_criterion` content schema on SchemaForm, so the schema may rename them), an example labelled synthetic, a neutral hint for a vague statement, and at least one final criterion required to send for review (`CRITERIA-1`). Exported as `CriteriaEditor` so WF-PREP-3 reuses it for stage criteria.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. `CriteriaEditor` component in `src/preparation/criteria/`: props `owner` (`problem` or a stage id), list of criteria, add and remove (`{crit.add}`, `{crit.remove}`), `{crit.count}`, `{crit.required}` shown when none; saves through `PATCH /v1/problems/{id}` for final criteria and `PUT /v1/problems/{id}/stage-plan` for stage criteria (12-u04).
3. Each criterion is a SchemaForm section (statement, measure, target, evidence hint); the `{crit.example}` text is labelled "Example, synthetic"; a vague-statement hint from the deterministic check or a `DP-CRITERIA` hint shows as a neutral note with text and an icon (`{crit.hint.vague}`), never red.
4. No free text box without structure; focus moves to the first error on save; the screen is also reachable from a hint link in WF-PREP-1.
5. States: loading, error, offline, session expired, not permitted, and the read only variant while the problem is `in_review` for a non-editor.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- At least one final criterion is enforced before send (server error mapped to the field).
- `CriteriaEditor` works for both owners from the same code.
- The criteria fields come from the schema; no field name is hard-coded (grep test).
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The stage plan editor (12-u14) and the volunteer recommendation on a criterion (12-u16).
