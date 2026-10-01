---
id: "12-u23"
plan: "12"
title: "Impacted only filter (WF-FILTER-1) on every content list"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 48
depends_on: ["12-u22", "12-u11", "02-u24", "02-u25", "14-u02"]
writes: ["src/location/filter/**", "src/contributions/**", "src/stages/**", "src/review/**", "src/i18n/en.json", "__tests__/impacted-filter-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/guest.md#WF-FILTER-1", "docs/spec/constitution/rules-legal-sim.md#GUEST-LABEL-1", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/impacted-filter-component.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-FILTER-1: an "Impacted only" switch, off by default, on the contributions and options of the problem page, the stage workspace (options, evidence, steps, choice comments), contributing ahead, and the volunteer review views (recommendations). It hides guest items from the view and always says how many are hidden, so nothing is removed silently.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. `ImpactedFilter` component in `src/location/filter/`: a checkbox switch with a text label `{filter.impacted.label}` and exact counts `{filter.impacted.counts}` ("12 impacted, 18 guest") taken from the API `filterCounts`; when on, `{filter.impacted.on}` says how many guest items are hidden with `{filter.impacted.showAll}`; empty result `{filter.impacted.empty}` still states the hidden count.
3. The choice is remembered per viewer and per device (local storage wrapped in try and catch, synced to the account setting when signed in if the API offers it, else device only), applies to all lists of the same kind and can always be turned off; the list is refetched with `impactedOnly=true` rather than filtered client-side, so counts stay exact.
4. Changing the filter announces the new count in a live region and keeps focus on the control; counts are plain information, never a ranking or an engagement figure; they never include private data.
5. Mount the component in the slots left by 04-u08, 12-u16, 12-u17, 12-u18 and 12-u20.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Off by default; the hidden count is always visible when on.
- Focus stays on the control after a change and the change is announced.
- Storage failure (private mode) falls back to in-memory without error.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The server read side (12-u11), the badge (12-u22) and the permission flow (12-u24).
