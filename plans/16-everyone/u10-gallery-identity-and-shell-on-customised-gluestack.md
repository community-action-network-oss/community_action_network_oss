---
id: "16-u10"
plan: "16"
title: "Gallery identity and shell on customised gluestack, plus the Unfold primitive"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.5
priority: 2
depends_on: ["06-u15"]
writes: ["src/components/**", "src/app/layout.tsx", "src/app/globals.css", "src/app/theme.css", "src/config/site.ts", "src/content/gluestack-theme.*", "docs/gluestack.md", "scripts/check-out.mjs", "package.json"]
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
Apply the Public Pictograms world from the Direction contract to the whole site shell on customised gluestack components, and add the single disclosure primitive every page will use.

## Steps
1. Load the can-gallery skill and the impeccable skill. PRODUCT.md and the Direction contract (`.impeccable/surfaces/src-app-page-tsx.md`) are settled (D-80): read both and `reference/craft-floor.md`, then build to them. Never run impeccable init, concept-seed or a direction round.
2. Theme: write the gallery-owned theme (light and dark, prefers-color-scheme) from the OWN-WORLD block: grey-blue paper ground, near-black ink, cobalt, ochre and green pictogram inks, square 2px corners, no shadows or gradients. Keep the synced status hue tokens for chips. System fonts only.
3. Customise the generated `src/components/ui/**` sources (button, link, heading, text, divider, badge) to the world. They are owned now (D-80).
4. Build `src/components/Unfold.tsx` on native `details`/`summary`: a visible 'Show more' / 'Show less' label, keyboard focus ring, the summary sentence always visible, content in the exported HTML, and a tiny effect that opens the matching `details` when the URL hash targets it. No gluestack Accordion.
5. Build `src/components/Pictogram.tsx`: hand-authored inline SVG figures on one 24-unit grid, each under the icon budget (few paths, decorative ones aria-hidden, meaningful ones titled). Start with nurse, cook, clerk, electrician, student, and the problem symbols crossing, bus, clinic, school, water, plus a plain 'plate' wrapper (title, legend, caption).
6. Rebuild Shell: nav becomes What is CAN (/), How it works, Where you fit (/where-you-fit/), Help build it (/contribute/), plus a 'Go deeper' group (Read everything, Open questions, Roadmap, Principles) that also lives in the footer. Keep skip link, landmarks, status strip text and footer privacy and license notes. Until 16-u12 lands, the Where you fit link may point at /#where-you-fit.
7. Delete hand-written component CSS that these replace. Record first-load JS per route in docs/gluestack.md; stay under 130 KB gz.
8. Copy rules: plain words a nurse, cook or clerk reads first time; no em or en dashes; label anything unbuilt `Planned` and every example `Fictional example`; nothing implies CAN is live; no emergency, legal, medical or government service claims; calm, warm, no hype; never call the matching a feed; never repeat a sentence from manifesto.md, DECISIONS.md or the spec index verbatim.

## Acceptance
- Every route renders in the new world in light and dark with no horizontal scroll at 320px.
- Unfold works without JS (content in out/ HTML).
- verify passes; JS budget recorded.

## Out of scope
- Page body rewrites (16-u11 onwards).
