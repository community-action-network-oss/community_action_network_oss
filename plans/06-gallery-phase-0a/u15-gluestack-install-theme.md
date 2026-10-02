---
id: "06-u15"
plan: "06"
title: "Adopt gluestack-ui for gallery surfaces: install, pin and tokens theme"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.5
priority: 1
depends_on: []
writes: ["package.json","package-lock.json","next.config.ts","tsconfig.json","postcss.config.*","tailwind.config.*","gluestack-ui.config.json","src/components/ui/**","src/app/layout.tsx","src/app/globals.css","scripts/sync-content.mjs","src/content/gluestack-theme.*","scripts/check-out.mjs","eslint.config.mjs","docs/gluestack.md"]
reads: ["src/**","scripts/**"]
spec: ["DECISIONS.md","docs/adr/0003-nextjs-static-gallery-site.md","docs/adr/0007-gluestack-design-system.md","docs/design/ux/tokens.json","docs/design/ux/visual-direction.md","docs/spec/18-phases-gates.md"]
verify: ["npm run sync:content","npm run verify"]
founder_gate: false
defaults: "Version rule: newest stable gluestack-ui major that supports Next.js 16 and React 19.2 (and the same engine family as can_app where possible); if only an alpha or rc fits, pin that exact version and report it for DECISIONS.md. Never fall back to hand-written component CSS for new components."
status: done
attempts: 0
commits: ["12e6182","a0e74b7"]
actual_hours: 0.2
---

## Objective

Install gluestack-ui in the gallery with an exact pinned version and a theme generated from the shared tokens, keeping the site a fully static export. Phase 0A rules are unchanged.

## Steps

1. Read the gluestack docs for Next.js with the version rule in `defaults`. Record version, engine, and why in `docs/gluestack.md`. Pin exact versions (no ranges for gluestack-ui or the styling engine).
2. Install with the official CLI, adding only the components the gallery layout needs (box, text, heading, link, button-as-link, divider, and similar). Generated source goes to `src/components/ui/**`; after generation it is owned and customised by the gallery (D-80), so never regenerate over customisations.
3. Keep `output: 'export'` and `trailingSlash`. No runtime fetch, no remote font, no analytics, no cookies, no form. Any provider setup must work in a static export (client components render in the exported HTML where possible).
4. D-80: the gallery theme is gallery-owned, not synced. Create the gluestack theme config from the OWN-WORLD block of the Direction contract (`.impeccable/surfaces/src-app-page-tsx.md`), light and dark (`prefers-color-scheme`); keep the synced `tokens.css` status hues for chips. Read PRODUCT.md; never run impeccable init, concept-seed or a direction round.
5. Confirm `check:out` stays green (no form, no external hosts, no dashes, all routes exist). Record baseline and new first-load JS (gzip) per route in `docs/gluestack.md`.

## Acceptance

- gluestack-ui and its engine pinned exactly; choice and any pre-release status recorded and reported for DECISIONS.md.
- Gallery-owned theme from the Direction contract, with dark mode; synced status tokens untouched.
- `output: 'export'` unchanged; build produces `out/` with all routes; no third-party request.
- Existing pages look unchanged (components not migrated yet); `npm run verify` green.

## Out of scope

- Applying the identity to the shell and pages (16-u10 onwards).
- Budget enforcement (06-u09 and 06-u16 acceptance).
