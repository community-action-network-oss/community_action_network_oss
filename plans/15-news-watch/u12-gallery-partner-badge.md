---
id: "15-u12"
plan: "15"
title: "Gallery partner badge (WF-PARTNER-1)"
repo: "can_gallery"
area: can-gallery
model: sonnet
est_hours: 0.8
priority: 511
depends_on: []
writes: ["src/components/PartnerBadge.tsx", "src/components/Shell.tsx", "src/app/layout.tsx", "src/app/globals.css", "src/config/site.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/browse.md#WF-PARTNER-1", "docs/design/ux/copy-deck.md", "docs/spec/25-news-watch.md#259-attribution"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-PARTNER-1 on the gallery: "Powered by Mera News, news pipeline partner", bottom right on every page, linking to https://mera.news.

## Steps
1. `PARTNER = { name: "Mera News", role: "news pipeline partner", url: "https://mera.news" }` in `src/config/site.ts`.
2. `PartnerBadge` server component: a single external link (`rel="noopener"`, new tab) with accessible name from the copy deck text; mounted once in `src/app/layout.tsx`.
3. CSS in `globals.css` using `tokens.css` variables: fixed to the bottom end with `inset-inline-end` and `inset-block-end` of 16 px plus `env(safe-area-inset-bottom)`, light and dark, visible focus ring. Under 480 px it is not fixed: render it at the end of the footer instead, so it never covers content or footer links. Respect `prefers-reduced-motion` (no animation at all is fine).
4. No logo image, no new dependency, no client JS.
5. Text has no em or en dashes.

## Acceptance
- The badge shows on every page in light and dark; at 375 px it sits in the footer and nothing overlaps (check `out/` pages with `npm run check:out` passing).
- `npm run verify` is green.

## Out of scope
- The app badge (15-u09).
