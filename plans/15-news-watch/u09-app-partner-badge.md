---
id: "15-u09"
plan: "15"
title: "App partner badge (WF-PARTNER-1)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1
priority: 508
depends_on: ["15-u08", "02-u13", "02-u15"]
writes: ["src/components/civic/PartnerBadge*", "app/_layout.tsx", "src/api/**", "src/i18n/en.json", "__tests__/partner-badge*.test.tsx"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/browse.md#WF-PARTNER-1", "docs/design/ux/copy-deck.md", "docs/spec/25-news-watch.md#259-attribution", "docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-PARTNER-1 in the app: a small bottom-end pill "Powered by {name}, news pipeline partner", shown only when `GET /health` reports a `newsSource`.

## Steps
1. Regenerate the API client from the server contract (15-u08), never hand-edit generated code.
2. `PartnerBadge`: reads `newsSource` with React Query (stale time 1 hour); renders nothing when null or on error. Fixed bottom-end with safe-area insets, logical properties only (`scripts/check-logical.mjs`), theme tokens for colour, full contrast in light and dark. Under 480 px use `news.partner.short`.
3. It is one link to `newsSource.url` (opens externally), accessible name `news.partner.a11y`, at least 44 px touch target, never covering a primary action: add bottom padding to the root scroll container equal to the badge height when shown.
4. Mount it once in `app/_layout.tsx`.
5. Every string goes through useT() ids in src/i18n/en.json (ids from the copy deck section "News watch and partner"); no em or en dashes (npm run lint:copy). Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply.
6. Tests: hidden when null; shown with the name; short label under 480 px; link target and accessible name.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- `npm run verify` is green.

## Out of scope
- A logo image (text only in slice 1).
