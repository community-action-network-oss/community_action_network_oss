---
id: "16-u14"
plan: "16"
title: "Contribute: every profession first, builder detail behind Unfold"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.0
priority: 6
depends_on: ["16-u12"]
writes: ["src/app/contribute/**", "src/components/**", "src/content/**"]
spec: ["DECISIONS.md", "docs/spec/18-phases-gates.md", "docs/design/ux/visual-direction.md", "docs/adr/0007-gluestack-design-system.md", "plans/06-gallery-phase-0a/u17-contributor-pitch-for-every-profession-engineers-designers.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Make /contribute/ welcoming to every profession while keeping the builder detail one tap away.

## Steps
1. Load the can-gallery skill and the impeccable skill. PRODUCT.md and the Direction contract (`.impeccable/surfaces/src-app-page-tsx.md`) are settled (D-80): read both and `reference/craft-floor.md`, then build to them. Never run impeccable init, concept-seed or a direction round.
2. Open with 'Every profession can help' and the roles in plain words (pictogram per role). Move clone command, repositories table, stack and decision process into an Unfold titled 'For builders'. Keep it compatible with 06-u17, which later adds pitch.ts and urgency groups on this structure.
3. Keep every piece of information the page serves today: move detail into `Unfold`, never delete it.
4. Copy rules: plain words a nurse, cook or clerk reads first time; no em or en dashes; label anything unbuilt `Planned` and every example `Fictional example`; nothing implies CAN is live; no emergency, legal, medical or government service claims; calm, warm, no hype; never call the matching a feed; never repeat a sentence from manifesto.md, DECISIONS.md or the spec index verbatim.

## Acceptance
- All previous text present.
- verify passes.

## Out of scope
- pitch.ts (06-u17).
