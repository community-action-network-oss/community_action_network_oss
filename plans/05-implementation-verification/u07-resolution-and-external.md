---
id: "05-u07"
plan: "05"
title: "Resolution records archive and external routes"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 96
depends_on: ["05-u02","05-u04","02-u15","02-u24","02-u25"]
writes: ["app/resolutions/**","app/external.tsx","src/resolutions/**","src/external/**","src/i18n/en.json","__tests__/resolution-*.test.tsx","__tests__/external-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md", "docs/design/ux/wireframes/browse.md#WF-RESOLUTION-1", "docs/design/ux/wireframes/submit.md#WF-EXTERNAL-1", "docs/spec/constitution/rules.md#CRISIS-STATIC-1", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/open-questions/OQ-emergency-routing.md", "docs/design/ux/copy-deck.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/resolutions-screen.test.tsx __tests__/external-routes.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-RESOLUTION-1: archive of solved, closed and redirected problems with their records. WF-EXTERNAL-1: static routes for an individual or urgent situation that work with the network down.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/resolutions/index.tsx from GET /v1/resolutions with kind filter and "Load more"; each row shows kind label, problem title, outcome or reason, evidence links, "Decided under policy vX" (and "Reopened under policy vX" with the superseded earlier record kept and linked, never hidden, D-59); empty and error states. A detail section per record reachable from the problem detail.
3. app/external.tsx and an overlay component usable from forms: all content static in src/external/routes.ts (CRISIS-STATIC-1: no network call, jest asserts zero fetches); fictional example routes clearly labelled "Fictional example for the demonstration"; lines for emergency number, a fictional local service, and "This platform is not an emergency service". The jurisdiction emergency notice from the API is shown if cached, never required.
4. Replace the plain-text placeholders in the submit and decision screens by links to this screen (grep for the placeholder strings).
5. Tests: archive filter and pagination, policy-version text, superseded records shown, external screen renders with fetch mocked to throw, links from decision screens.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- External routes render with no network.
- Everything not real is labelled fictional.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Real emergency routing data (founder-gated, OQ-emergency-routing).
