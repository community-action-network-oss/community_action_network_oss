---
id: "12-u15"
plan: "12"
title: "Volunteer review queue and opt-in (WF-VREVIEW-1)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 40
depends_on: ["12-u03", "02-u16", "02-u15", "02-u24", "02-u25"]
writes: ["app/review/**", "src/review/queue/**", "src/i18n/en.json", "__tests__/review-queue-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/prepare.md#WF-VREVIEW-1", "docs/spec/constitution/rules.md#REVIEW-1", "docs/open-questions/OQ-reviewer-eligibility.md", "docs/design/flows/volunteer-review.md", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/review-queue-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-VREVIEW-1 at `/review/problems`: signed-in members opt in to volunteer review, then see a queue of `in_review` problems with place and structure only. Opt-in and opt-out take effect at once.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. `app/review/problems/index.tsx` (RequireAuth): the not-opted-in state (`{vreview.optin.title}`, `{vreview.optin.body}`, `{vreview.optin.on}`) and the opted-in state (`{vreview.optin.off}`, `{vreview.masked}`); calls `POST` and `DELETE /v1/me/review-opt-in` (12-u03).
3. Queue from `GET /v1/review/queue`: items show place, number of parts and whether recommendations exist yet ("Amsterdam, 4 parts, 2 recommendations"), never the poster handle or any masked detail; order is random as the API returns it; no counts as status, no rankings, no streaks; `{vreview.open}` opens WF-VREVIEW-2; empty state `{vreview.queue.empty}`.
4. A problem the volunteer posted never appears (the API excludes it; the screen shows nothing special).
5. Add "Review" to the nav only for opted-in members (nav shell 02-u15); no numeric badge anywhere.
6. States: loading, error, offline, session expired, not permitted, rate limited.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Opt-in and opt-out work immediately and are announced politely.
- No personal data, handles, counts as status or rankings appear (query assertions).
- The nav item exists only after opt-in.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The review screen and recommendations (12-u16) and the poster's resolution screen (12-u17).
