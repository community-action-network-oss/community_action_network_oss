---
id: "06-u15"
plan: "06"
title: "Adopt gluestack-ui for gallery surfaces: install, pin and tokens theme"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.5
priority: 14
depends_on: []
writes: ["package.json","package-lock.json","next.config.ts","tsconfig.json","postcss.config.*","tailwind.config.*","gluestack-ui.config.json","src/components/ui/**","src/app/layout.tsx","src/app/globals.css","scripts/sync-content.mjs","src/content/gluestack-theme.*","scripts/check-out.mjs","eslint.config.mjs","docs/gluestack.md"]
reads: ["src/**","scripts/**"]
spec: ["docs/adr/0003-nextjs-static-gallery-site.md","docs/adr/0007-gluestack-design-system.md","docs/design/ux/tokens.json","docs/design/ux/visual-direction.md","docs/spec/18-phases-gates.md"]
verify: ["npm run sync:content","npm run verify"]
founder_gate: false
defaults: "Version rule: newest stable gluestack-ui major that supports Next.js 16 and React 19.2 (and the same engine family as can_app where possible); if only an alpha or rc fits, pin that exact version and report it for DECISIONS.md. Never fall back to hand-written component CSS for new components."
status: todo
attempts: 0
commits: []
actual_hours: null
---

## Objective

Install gluestack-ui in the gallery with an exact pinned version and a theme generated from the shared tokens, keeping the site a fully static export. Phase 0A rules are unchanged.

## Steps

1. Read the gluestack docs for Next.js with the version rule in `defaults`. Record version, engine, and why in `docs/gluestack.md`. Pin exact versions (no ranges for gluestack-ui or the styling engine).
2. Install with the official CLI, adding only the components the gallery layout needs (box, text, heading, link, button-as-link, divider, and similar). Generated source goes to `src/components/ui/**`, single owner: the gluestack CLI, never hand-edited.
3. Keep `output: 'export'` and `trailingSlash`. No runtime fetch, no remote font, no analytics, no cookies, no form. Any provider setup must work in a static export (client components render in the exported HTML where possible).
4. Extend `scripts/sync-content.mjs` so `npm run sync:content` generates the gluestack theme config from `docs/design/ux/tokens.json` (light and dark, `prefers-color-scheme`), with a "generated, do not edit" header; `sync:check` fails on drift. tokens.css stays only if still needed after 06-u16.
5. Confirm `check:out` stays green (no form, no external hosts, no dashes, all routes exist). Record baseline and new first-load JS (gzip) per route in `docs/gluestack.md`.

## Acceptance

- gluestack-ui and its engine pinned exactly; choice and any pre-release status recorded and reported for DECISIONS.md.
- Theme generated from tokens.json, with dark mode; sync:check detects drift.
- `output: 'export'` unchanged; build produces `out/` with all routes; no third-party request.
- Existing pages look unchanged (components not migrated yet); `npm run verify` green.

## Out of scope

- Migrating the layout primitives and pages (06-u16).
- Budget enforcement (06-u09 and 06-u16 acceptance).
