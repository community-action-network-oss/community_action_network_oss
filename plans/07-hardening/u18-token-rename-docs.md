---
id: "07-u18"
plan: "07"
title: "Rename design token status.interim to status.transitional (tokens, build, contrast check)"
repo: "."
area: can-spec
model: sonnet
est_hours: 0.8
priority: 136
depends_on: []
writes: ["docs/design/ux/tokens.json", "docs/design/ux/tokens.build.mjs", "docs/design/ux/visual-direction.md"]
spec: ["docs/design/ux/tokens.json", "docs/design/ux/visual-direction.md", "docs/design/ux/copy-deck.md"]
needs: []
verify: ["node docs/design/ux/tokens.build.mjs"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Finish the vocabulary change of D-51 in the design tokens: the policy badge token status.interim becomes status.transitional (INTERIM-1 now means transitional founder stewardship). This is a docs change owned by can-spec; the two consumers follow in 07-u19 and 07-u20 and must land with it.

## Steps
1. In docs/design/ux/tokens.build.mjs rename the key interim to transitional in both theme status maps (light and dark) and in any pair label strings (the contrast pairs named "status.interim fg on bg" and "status.interim bg on surface (badge edge)" become status.transitional). Keep the colour values unchanged.
2. Regenerate docs/design/ux/tokens.json by running node docs/design/ux/tokens.build.mjs (never hand-edit the generated file); the script must still exit 0, which is the WCAG AA contrast check: every pair that passed before still passes.
3. Update the token note in docs/design/ux/visual-direction.md: remove the "follow-up" sentence about the rename and state that policy badges use status.transitional (parchment).
4. Verify no other occurrence of status.interim remains in docs/design (grep) and report any in a comment line for can-spec; do not touch other docs.
5. Keep docs files under 25KB (check the size of each touched file).

## Acceptance
- tokens.json has status.transitional in both themes and no status.interim.
- node docs/design/ux/tokens.build.mjs exits 0 (every contrast pair passes).
- Colour values are unchanged.

## Out of scope
- Consumers (07-u19, 07-u20).
- Any change to colours or other tokens.
