---
id: "07-u19"
plan: "07"
title: "can_app: sync tokens and rename code references to status.transitional"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 0.8
priority: 137
depends_on: ["07-u18", "02-u24", "02-u25"]
writes: ["src/theme/tokens.json", "src/theme/**", "src/components/**", "src/problems/**", "src/**/*.tsx", "__tests__/**", "scripts/sync-tokens.mjs"]
spec: ["docs/design/ux/tokens.json", "docs/design/ux/visual-direction.md", "docs/design/ux/wireframes/browse.md#WF-DETAIL-1", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run sync:tokens", "npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Land the token rename in can_app together with 07-u18: refresh the synced tokens and change every code reference from interim to transitional (theme types, the generated gluestack theme from 02-u24, civic wrapper props, badge components, tests).

## Steps
1. Run npm run sync:tokens to copy docs/design/ux/tokens.json into src/theme/tokens.json (do not edit it by hand).
2. grep -rn "interim" src app __tests__ for status token and prop names (status.interim, tokens.status.interim, variant "interim", isInterim) and rename them to transitional, including the gluestack theme generator from 02-u24 and the civic wrappers of 02-u25; user-facing text already says "Policy vX, transitional stewardship" from the copy deck. Do not rename unrelated words.
3. Add or extend a jest test that fails if the string "status.interim" or a variant named interim appears in src, app or the theme (grep-style test), and a test that the transitional badge renders text plus shape in light and dark.
4. If a screen from other plans still renders an interim badge variant, keep behaviour the same and only rename; list any in the commit message.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- src/theme/tokens.json equals docs/design/ux/tokens.json (sync is idempotent).
- No reference to status.interim remains (test).
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Changing colours, adding tokens or changing copy.
- can_gallery (07-u20).
