---
id: "16-u16"
plan: "16"
title: "Impeccable finish: review, detector, DESIGN.md"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.5
priority: 8
depends_on: ["16-u13", "16-u14", "16-u15"]
writes: ["DESIGN.md", ".impeccable/**", "src/**"]
spec: ["DECISIONS.md", "docs/spec/18-phases-gates.md", "docs/design/ux/visual-direction.md", "docs/adr/0007-gluestack-design-system.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Close the build per the impeccable finish: one batched screenshot round, the detector, the finish reviewer, fixes, and the documenter.

## Steps
1. Load the can-gallery skill and the impeccable skill. PRODUCT.md and the Direction contract (`.impeccable/surfaces/src-app-page-tsx.md`) are settled (D-80): read both and `reference/craft-floor.md`, then build to them. Never run impeccable init, concept-seed or a direction round.
2. Capture desktop.png (1440) and mobile.png (390) of / and /where-you-fit/ into .impeccable/review/ from the built out/ served locally.
3. Run impeccable detect --json on the changed pages, fix mechanical findings.
4. Spawn the impeccable finish reviewer with the Direction contract, screenshots and craft-floor path; apply one fix batch; one verdict round.
5. Spawn the documenter to write DESIGN.md and .impeccable/design.json.
6. Copy rules: plain words a nurse, cook or clerk reads first time; no em or en dashes; label anything unbuilt `Planned` and every example `Fictional example`; nothing implies CAN is live; no emergency, legal, medical or government service claims; calm, warm, no hype; never call the matching a feed; never repeat a sentence from manifesto.md, DECISIONS.md or the spec index verbatim.

## Acceptance
- Reviewer disposition recorded in the unit report.
- DESIGN.md and design.json exist.
- verify passes.

## Out of scope
- New pages.
