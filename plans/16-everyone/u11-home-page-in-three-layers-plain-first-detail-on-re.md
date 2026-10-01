---
id: "16-u11"
plan: "16"
title: "Home page in three layers: plain first, detail on request"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.0
priority: 3
depends_on: ["16-u10"]
writes: ["src/app/page.tsx", "src/components/**", "src/content/**", "src/app/globals.css", "src/app/theme.css"]
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
Rewrite `/` so a nurse, a cook or a clerk understands CAN in one viewport, while every piece of today's information stays reachable.

## Steps
1. Load the can-gallery skill and the impeccable skill. PRODUCT.md and the Direction contract (`.impeccable/surfaces/src-app-page-tsx.md`) are settled (D-80): read both and `reference/craft-floor.md`, then build to them. Never run impeccable init, concept-seed or a direction round.
2. Layer 1, the FIRST VIEWPORT exactly as the Direction contract says: headline, the people-to-problems pictogram plate (Fictional example), one plain sentence on what CAN is, the status line, and the primary action 'See where you fit'. Signature interaction: focus or hover on a person lights its rule and problem and updates the caption; without JS every pair stays captioned; figures count in once, static under reduced motion.
3. Layer 2: 'One person, a few problems, solved properly' plate (one figure, five problem symbols, counted not scaled). Then four plain steps (someone notices a problem; people who know help shape it; it gets fixed step by step with proof; the fix is kept for others), each with an Unfold holding today's rail detail (PathRail, roles, stage panel) unchanged.
4. Layer 3: 'Go deeper' links. The contrast block, principles, worked example (Alderbrook, Fictional), the open-questions teaser and the full safety notice each sit in an Unfold or a one-line link to their page. The emergency sentence stays visible somewhere on the page in short form.
5. Keep every piece of information the page serves today: move detail into `Unfold`, never delete it.
6. Copy rules: plain words a nurse, cook or clerk reads first time; no em or en dashes; label anything unbuilt `Planned` and every example `Fictional example`; nothing implies CAN is live; no emergency, legal, medical or government service claims; calm, warm, no hype; never call the matching a feed; never repeat a sentence from manifesto.md, DECISIONS.md or the spec index verbatim.

## Acceptance
- One h1; first viewport matches the contract at 390 and 1440 px.
- No repo jargon above the fold.
- All previous home content present in out/index.html.
- verify passes.

## Out of scope
- /where-you-fit/ (16-u12).
