---
id: "12-u12"
plan: "12"
title: "Preparation workspace (WF-PREP-1): parts, sources with trust hints, readiness, send to volunteer review"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 37
depends_on: ["12-u04", "03-u16", "10-u05", "10-u29", "02-u14", "02-u16", "02-u24", "02-u25"]
writes: ["app/me/problems/**", "src/preparation/**", "src/i18n/en.json", "__tests__/prep-workspace-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/prepare.md#WF-PREP-1", "docs/design/ux/wireframes/submit.md#WF-SUBMIT-2", "docs/design/ux/wireframes/submit.md#WF-SUBMIT-3", "docs/design/ux/wireframes/submit.md#WF-SUBMIT-4", "docs/design/ux/wireframes/forms.md#WF-FORM-3", "docs/design/flows/problem-preparation.md", "docs/spec/constitution/rules.md#CRITERIA-1", "docs/spec/constitution/rules.md#SOURCE-1", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/prep-workspace-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-PREP-1 at `/me/problems/{id}`: the poster's workspace for `draft`, `needs_revision` and `in_review` (still editable, with a banner that reviewers see changes). Four parts (facts, sources, final criteria, stages), each with a text status (Ready or Not finished), never colour alone, driven by `GET /v1/me/problems/{id}/preparation` (12-u04). The facts section opens the schema section form of the problem submit flow (10-u33, a route link, the form fields are never written here).

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. `app/me/problems/[id].tsx` (RequireAuth, initiator): header chip from the API label, `{prep.private}` notice, progress `{prep.progress}`, the four parts as a list with their status, links to WF-PREP-2 (`/me/problems/{id}/criteria`) and WF-PREP-3 (`/me/problems/{id}/stages`), and the facts section link (the route of 10-u33).
3. Sources part: the URL list field (WF-SUBMIT-2) is a `source_ref` editor on SchemaForm (uri, category select, establishes, authenticity note) plus a trust hint beside each link: a text label and an icon from the category (`{prep.trust.high}` for official or primary, `{prep.trust.medium}`, `{prep.trust.low}`, `{prep.trust.unknown}`), advice only, never blocking, plus `{prep.trust.help}`; the "I do not have a source yet" note stays marked "needs evidence".
4. In `needs_revision` hints from the publication decision appear beside the fields (WF-FORM-3 pattern: rule id and policy version; the hint display component is 10-u36); a hint naming a stage or criterion links to its editor.
5. Actions: `Check my draft` (POST checks of 03-u08; flags with spans mapped to the fields and the privacy review panel of WF-SUBMIT-3), `Save draft` (local autosave through 03-u16, server sync through PATCH), and `{prep.sendReview}` disabled with `{prep.sendReview.missing}` listing the unfinished parts; sending first shows the exact preview (WF-SUBMIT-4, the wrapper of 10-u33) and `{prep.sendReview.masked}`, then calls the T01 transition (`in_review`).
6. States: loading, error, offline (local draft stays editable), session expired (WF-SESSION-1 keeps the draft), not permitted, rate limited; every string is a copy-deck id (docs/design/ux/copy-deck-lifecycle.md), no dashes.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Parts show the exact text status and the progress count from the API, never colour alone.
- Send is disabled until facts, a source (or the no-source note) and the final criteria are ready; the stage plan is optional.
- No field name of the problem schema appears in `src/preparation/**` (grep test).
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The criteria and plan editors (12-u13, 12-u14), the review resolution screen (12-u17) and the suggested paths panel (plan 13).
- The schema form for the facts section (10-u33).
