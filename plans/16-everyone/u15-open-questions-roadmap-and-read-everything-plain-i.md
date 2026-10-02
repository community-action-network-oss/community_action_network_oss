---
id: "16-u15"
plan: "16"
title: "Open questions, Roadmap and Read everything: plain intro, grouped Unfolds"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.0
priority: 7
depends_on: ["16-u12"]
writes: ["src/app/open-questions/**", "src/app/roadmap/**", "src/app/docs/**", "src/components/**"]
spec: ["DECISIONS.md", "docs/spec/18-phases-gates.md", "docs/design/ux/visual-direction.md", "docs/adr/0007-gluestack-design-system.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: done
attempts: 0
commits: ["f0e0023"]
actual_hours: 0.1
---
## Objective
Give the three deep pages a plain-language opening and group their long lists into Unfolds.

## Steps
1. Load the can-gallery skill and the impeccable skill. PRODUCT.md and the Direction contract (`.impeccable/surfaces/src-app-page-tsx.md`) are settled (D-80): read both and `reference/craft-floor.md`, then build to them. Never run impeccable init, concept-seed or a direction round.
2. Open questions: a plain intro on why we show what is undecided, then questions grouped by theme in Unfolds. Roadmap: phases as a counted pictogram row, detail in Unfolds. Read everything: a plain intro, the index grouped and unfolded; live doc rendering unchanged.
3. Keep every piece of information the page serves today: move detail into `Unfold`, never delete it.
4. Copy rules: plain words a nurse, cook or clerk reads first time; no em or en dashes; label anything unbuilt `Planned` and every example `Fictional example`; nothing implies CAN is live; no emergency, legal, medical or government service claims; calm, warm, no hype; never call the matching a feed; never repeat a sentence from manifesto.md, DECISIONS.md or the spec index verbatim.

## Acceptance
- All previous items present.
- verify passes.

## Out of scope
- Live doc loader changes.
