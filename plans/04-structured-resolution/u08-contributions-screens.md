---
id: "04-u08"
plan: "04"
title: "Contributions tab and add-contribution screen"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 77
depends_on: ["04-u02","02-u20","02-u14","02-u24","02-u25"]
writes: ["app/problems/**","src/contributions/**","src/problems/**","src/i18n/en.json","__tests__/contrib-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/participate.md#WF-CONTRIB-1","docs/design/ux/wireframes/participate.md#WF-CONTRIB-2","docs/spec/01-slice-1-brief.md#6-contributions","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/contributions-screens.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-CONTRIB-1: contributions grouped by type, never ranked, no counts. WF-CONTRIB-2: add a contribution with the right fields per type, delays shown calmly.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. Add a Contributions tab to the detail screen (tab list with proper roles, keyboard arrow navigation on web). Group by type with section headings (h2) using plain names from copy; order inside a group as given by the API; show the author handle, date and evidence links (open in a new tab with rel noopener and a visible external-link text), a "Pending review" label for the viewer own pending items, tombstone placeholders (WF-DETAIL-2 pattern), and no counts, likes or sorting controls.
3. app/problems/[id]/add.tsx (RequireAuth, member): type select limited to the types in the detail response allowedContributionTypes (never a client-side matrix), body counter 1500, evidence URL rows for evidence type, answers-contribution picker for factual_claim.
4. Cooldown: when the API returns cooldown_active show "You can add another contribution in about {minutes} minutes" using retryAfterSeconds, keep the text, and disable submit until then without a ticking live region. Hard privacy flags map to the field with the highlighted span.
5. Not permitted for guests shows sign-in prompt with returnTo; tombstone, empty ("No contributions yet. Add the first.") and error states.
6. Tests: grouping by type, pending label for own item, no count elements exist (query assertion), cooldown message, per-type form fields, flag mapping, guest prompt.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- No popularity data is rendered anywhere (test asserts absence of counts).
- Type choices come only from the API allowedContributionTypes.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Proposals UI.
- Moderator side (done in plan 03 screens).
