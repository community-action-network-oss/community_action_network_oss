---
id: "05-u07"
plan: "05"
title: "External routes screen (WF-EXTERNAL-1) and archive links from the problem page"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 96
depends_on: ["05-u02","05-u04","13-u01","02-u15","02-u24","02-u25"]
writes: ["app/external.tsx","src/external/**","src/problems/ArchiveLink.tsx","src/i18n/en.json","__tests__/archive-link-*.test.tsx","__tests__/external-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md", "docs/design/ux/wireframes/archive.md#WF-ARCHIVE-1", "docs/design/ux/wireframes/archive.md#WF-ARCHIVE-2", "docs/design/ux/wireframes/submit.md#WF-EXTERNAL-1", "docs/spec/24-archive-reuse.md", "docs/spec/constitution/rules.md#CRISIS-STATIC-1", "docs/spec/constitution/rules.md#ARCHIVE-1", "docs/open-questions/OQ-emergency-routing.md", "docs/design/ux/copy-deck.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/archive-link.test.tsx __tests__/external-routes.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The Resolution records archive is renamed and replaced by the Archive (D-76, `ARCHIVE-1`): the browse screen WF-ARCHIVE-1 at `/archive` and the case view WF-ARCHIVE-2 at `/archive/{id}` are built by plan 13 (13-u25, 13-u26) on the archive module (13-u01). This unit keeps what plan 05 owns: WF-EXTERNAL-1, the static routes for an individual or urgent situation that work with the network down, and the archive link from the problem page (solved, closed, redirected, stuck, withdrawn after publication) to its archive record. There is no `/resolutions` route and no `src/resolutions` code.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are already done, so the contract exists.
2. `src/problems/ArchiveLink.tsx`: on a problem in a terminal or stuck state show "Read the archive record" linking to `/archive/{archiveRecordId}` when the API detail carries the id (13-u01), and a calm "The archive record is being prepared" note while it is pending (`archive_record.status` pending, never an error); a reopened problem (T20, T21) links its newest record and notes that the earlier record is kept (D-59, `RERESOLVE-1`); the component is mounted by the status panel variants (05-u06). No archive list or case view code lives here.
3. app/external.tsx and an overlay component usable from forms: all content static in src/external/routes.ts (CRISIS-STATIC-1: no network call, jest asserts zero fetches); fictional example routes clearly labelled "Fictional example for the demonstration"; lines for emergency number, a fictional local service, and "This platform is not an emergency service". The jurisdiction emergency notice from the API is shown if cached, never required.
4. Replace the plain-text placeholders in the preparation and decision screens by links to this screen (grep for the placeholder strings).
5. Tests: archive link states (ready, pending, reopened with earlier record kept, none for non-terminal states), external screen renders with fetch mocked to throw, links from decision screens.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- External routes render with no network.
- Everything not real is labelled fictional; no route or file uses the name resolutions.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The archive browse and case screens (13-u25, 13-u26) and suggested paths (plan 13).
- Real emergency routing data (founder-gated, OQ-emergency-routing).
