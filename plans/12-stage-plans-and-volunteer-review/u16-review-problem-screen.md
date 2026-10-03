---
id: "12-u16"
plan: "12"
title: "Review a problem and make recommendations (WF-VREVIEW-2)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 41
depends_on: ["12-u15", "12-u05", "10-u05", "10-u29", "02-u24", "02-u25", "10-u60"]
writes: ["app/review/**", "src/review/problem/**", "src/i18n/en.json", "__tests__/review-problem-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/prepare.md#WF-VREVIEW-2", "docs/spec/constitution/rules.md#REVIEW-1", "docs/spec/constitution/rules.md#RECO-1", "docs/design/flows/volunteer-review.md", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/review-problem-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["850c680","263ec76"]
actual_hours: null
---
## Objective
Build WF-VREVIEW-2 at `/review/problems/{id}`: the masked structured problem with a recommend control on every field, source, stage, stage criterion and final criterion. A recommendation names its target path, the change and the reason through a schema form (`review_recommendation` schema on SchemaForm).

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. First the conflict declaration (`{vreview.conflict}`, `{vreview.conflict.help}`) which posts `POST /v1/review/{id}/session`; nothing else is shown until it is recorded.
3. Render the masked problem from `GET /v1/review/{id}` section by section (field labels from the content schema, sources with their category label, final criteria, stage plan list from the `StageList` of 12-u05), each with `{vreview.rec.add}`; the recommend panel shows the target (`{vreview.rec.target}`), `{vreview.rec.change}` and `{vreview.rec.why}`, `{vreview.rec.send}`, and `{vreview.rec.sent}` afterwards. Recommendations are checked for personal data by the server before sharing; a masked or refused result shows a calm message and keeps the text.
4. A volunteer sees only their own recommendations and the poster's answers (`{vreview.rec.mine}`), and the aggregate after `{vreview.finish}` (finish with recommendations or "no changes"). Many volunteers can recommend the same target; the screen never shows other volunteers' text before finishing.
5. Slots for the Guest badge and the Impacted only filter on the recommendations list (12-u22, 12-u23) are props, empty until those units land.
6. States: loading, error, offline, session expired, not permitted (own problem or not opted in: calm message naming the rule), not found when the problem left `in_review`, rate limited (daily recommendation limit).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The poster handle, account and masked details never render (exact key set test).
- The conflict declaration comes first and is recorded.
- A recommendation target is chosen from real paths only; the form fields come from the schema (grep test).
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The poster's resolution screen (12-u17).
- Any publish, reject or edit control for volunteers (none exists, REVIEW-1).
