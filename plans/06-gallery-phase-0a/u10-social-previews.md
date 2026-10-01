---
id: "06-u10"
plan: "06"
title: "Social preview images generated locally"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1
priority: 100
depends_on: ["06-u08","06-u09","06-u15","16-u10"]
writes: ["scripts/gen-og.mjs","scripts/check-og.mjs","public/og/**","src/app/layout.tsx","src/app/**/page.tsx","src/lib/metadata.ts","package.json"]
spec: ["docs/spec/18-phases-gates.md","docs/design/ux/tokens.json","docs/design/ux/visual-direction.md","docs/adr/0003-nextjs-static-gallery-site.md"]
verify: ["npm run gen:og","npm run check:og","npm run verify"]
founder_gate: false
defaults: "metadataBase uses the SITE_URL env var, falling back to http://localhost:3000, until OQ-domain is decided."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Give every route a 1200 by 630 social card and correct Open Graph and Twitter metadata, produced with local tools only: no hosted image service, no remote fonts.

## Steps

1. Write scripts/gen-og.mjs: a route table (path, title, one-line description from existing metadata), an inline HTML template using design tokens and system fonts, rendered to PNG with Playwright Chromium (already a dev dependency from 06-u08) into public/og/<slug>.png. Deterministic output; no timestamps.
2. Text only plus token colors; no photos, no people, no logos that imply an organization. Include the stage label "Concept stage" on every card so no card implies a live service.
3. Write src/lib/metadata.ts: `pageMetadata(path)` returning title, description, openGraph, twitter (summary_large_image) with alt text; wire it into each page and the layout.
4. Write scripts/check-og.mjs: each route has a PNG of exactly 1200x630 (read the PNG header), at most 100 KB, and the page metadata references it. Add gen:og and check:og to package.json; check:og in verify.
5. Copy rules: no em dashes or en dashes in any user-facing text; label every example as fictional; nothing may imply the platform is live or handling real problems; no emergency, legal, medical or government service claims.

## Acceptance

- One PNG per route, within size and dimension limits, with alt text in metadata.
- No network access during generation; check:og and verify pass.

## Out of scope

- Final brand identity (OQ-domain).
- Absolute production URLs.
