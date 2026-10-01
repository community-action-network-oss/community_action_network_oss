---
id: "02-u19"
plan: "02"
title: "Problem list screen (real data)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 33
depends_on: ["02-u10","02-u15","02-u13"]
writes: ["app/index.tsx","src/problems/**","src/i18n/en.json","__tests__/list-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/ux/wireframes/browse.md#WF-LIST-1","docs/design/ux/wireframes/browse.md#WF-LIST-2","docs/spec/constitution/rules.md#RANK-1","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/list-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Replace the home placeholder with WF-LIST-1 and WF-LIST-2: published problems from GET /v1/problems with filters, a "Load more" button (no infinite scroll), and the honest ordering disclosure.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. src/problems/useProblems.ts: TanStack useInfiniteQuery over listProblems with cursor; filters state, jurisdictionId, q held in the URL query string so the view is shareable and restorable.
3. ProblemCard in src/problems/: title, status chip using the API label text (plus a neutral shape or icon so colour is never the only signal), jurisdiction, coarse area, "Interim decision" text when the API flags it, and a "Needs investigation" tag when investigationNeeded. No counts, no likes, no popularity.
4. Header text states the order: "Sorted by date published. Engagement is not used." (reads criteria from the response; if criteria.usesEngagementSignals were true the unit must fail a test).
5. WF-LIST-2 empty and filtered-empty states with a next action; loading skeleton announced once; error state with retry that keeps filters; offline banner while cached items stay readable; the home keeps the existing health check as a small footer status line only if it already exists.
6. Tests with mocked client: first page, load more appends, filter changes refetch and update the URL, empty, filtered-empty, error and retry, offline, chip shows label text.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- No infinite scroll and no count or popularity UI.
- Lifecycle labels come from the API response, not hardcoded.
- Filters survive reload through the URL.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Detail screen (next unit).
- Search indexing (all pages noindex).
