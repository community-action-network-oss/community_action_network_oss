---
id: "13-u25"
plan: "13"
title: "Archive browse and search (WF-ARCHIVE-1)"
repo: can_app
area: can-app
model: sonnet
est_hours: 1.5
priority: 432
depends_on: ["13-u01","13-u05","02-u13","02-u15","02-u24","02-u25"]
writes: ["app/archive/**","src/features/archive/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/archive-browse*.test.tsx"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/archive.md#WF-ARCHIVE-1","docs/design/ux/copy-deck-archive.md","docs/spec/24-archive-reuse.md","docs/design/ux/journeys.md","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The public Archive list at /archive, readable without an account. Failures are listed with the same weight and card design as successes. No ranking, no counts as status, no infinite scroll.

## Steps
1. Run `npm run gen:api` and commit `src/api/schema.d.ts`.
2. Route app/archive/index.tsx over `listArchive` with cursor pagination and a "Load more" button (never infinite scroll). Cards: title, outcome in words ("Solved", "Tried, did not work", closed, redirected, stuck) with an icon, ended date, place at region level, challenge count.
3. Filters as keyboard-operable selects remembered per viewer in local state, shown as removable text chips: problem type, region, resource band (small, medium, large), outcome. Sorted by date ended unless a search is typed. Search box uses the server `q` once 13-u09 exposes it; until then it filters the current page client-side and says so in the code comment.
4. Simulation records show the label "Seed problem, synthetic evidence" on the card. The honest explainer lines (`archive.body`, `archive.honest`) are shown above the list.
5. States: loading, empty with filters and empty without, error with retry, offline (cached pages readable).
6. Every string goes through useT() ids added to src/i18n/en.json and the ids of docs/design/ux/copy-deck-archive.md; no em or en dashes (npm run lint:copy). Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply.
7. Tests: success and failure cards share the same markup; filters narrow and clear; no counts used as status; label on simulation records; keyboard operation; the route works with no session.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- The page works with no session.
- Failed paths and successes look the same.
- `npm run verify` is green.

## Out of scope
- The case page (13-u26).
- Meaning-match search UI beyond the plain search box.
