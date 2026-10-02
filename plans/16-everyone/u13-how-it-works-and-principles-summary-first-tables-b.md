---
id: "16-u13"
plan: "16"
title: "How it works and Principles: summary first, tables behind Unfold"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.5
priority: 5
depends_on: ["16-u12"]
writes: ["src/app/how-it-works/**", "src/app/principles/**", "src/components/**", "src/app/globals.css", "src/app/theme.css"]
spec: ["DECISIONS.md", "docs/spec/18-phases-gates.md", "docs/design/ux/visual-direction.md", "docs/adr/0007-gluestack-design-system.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: done
attempts: 0
commits: ["44f871c"]
actual_hours: 0.1
---
## Objective
Restructure /how-it-works/ and /principles/ in layers in the Public Pictograms world.

## Steps
1. Load the can-gallery skill and the impeccable skill. PRODUCT.md and the Direction contract (`.impeccable/surfaces/src-app-page-tsx.md`) are settled (D-80): read both and `reference/craft-floor.md`, then build to them. Never run impeccable init, concept-seed or a direction round.
2. Each page opens with a plain summary plate (pictograms where they explain), then each section as an Unfold: the lifecycle table, the stage panel, roles, moderation, privacy; principles and what we will never do.
3. Keep every piece of information the page serves today: move detail into `Unfold`, never delete it.
4. Copy rules: plain words a nurse, cook or clerk reads first time; no em or en dashes; label anything unbuilt `Planned` and every example `Fictional example`; nothing implies CAN is live; no emergency, legal, medical or government service claims; calm, warm, no hype; never call the matching a feed; never repeat a sentence from manifesto.md, DECISIONS.md or the spec index verbatim.

## Acceptance
- All previous text present in out/ HTML.
- verify passes.

## Out of scope
- Other pages.
