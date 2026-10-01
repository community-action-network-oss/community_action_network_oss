---
id: "02-u20"
plan: "02"
title: "Problem detail screen and tombstone"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 34
depends_on: ["02-u19","02-u11","02-u24","02-u25"]
writes: ["app/problems/**","src/problems/**","src/i18n/en.json","__tests__/detail-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/ux/wireframes/browse.md#WF-DETAIL-1","docs/design/ux/wireframes/browse.md#WF-DETAIL-2","docs/design/ux/screens.md#state-to-screen-map","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/detail-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-DETAIL-1 (problem workspace with status panel and timeline) and the WF-DETAIL-2 tombstone, from GET /v1/problems/{id} and /events. Tabs for later features appear only when their plan lands.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/problems/[id].tsx: sections in order: title, StatusPanel (label chip, plain explanation, next action, the decided-under or reopened policy-version notice, a transitional-stewardship badge when the API sets transitional, all from the API), problem text (condition, affected, observed versus uncertain shown as two labelled blocks), jurisdiction and coarse area (display only, never "verified"), timeline from /events with "Load more", duplicate_of notice when present.
3. Tombstone (WF-DETAIL-2): when tombstone is true show date and reason with calm wording and no author text; never a 404 screen. True 404 (id never existed or private to this viewer) shows common not found with a link back to the list.
4. Reusable StatusPanel and Timeline components in src/problems/ (plans 04 and 05 reuse them for paused, stuck, closed variants; keep the variant prop open but implement only the base).
5. Do not render tabs yet; plans 04 and 05 add them, and plan 09 adds the re-reviewed notice (09-u50). Any label for something unbuilt must say planned.
6. Handles only; never an email. States: loading, error, offline, tombstone, not found.
7. Tests: eligible problem renders label from API; tombstone renders without author text; 404 state; offline with cached data; timeline pages; heading outline has exactly one h1.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Tombstone is a 200 view, not a 404.
- Lifecycle copy is from the API.
- Exactly one h1 and logical heading order.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Contribution, proposal, task tabs (plans 04, 05).
- Paused, stuck, closed variants (plan 05).
