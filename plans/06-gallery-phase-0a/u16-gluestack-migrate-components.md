---
id: "06-u16"
plan: "06"
title: "Adopt gluestack-ui for gallery surfaces: migrate layout and components, drop component CSS"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.5
priority: 15
depends_on: ["06-u15"]
writes: ["src/components/**","src/app/layout.tsx","src/app/**/page.tsx","src/app/globals.css","src/app/tokens.css","scripts/check-out.mjs","docs/gluestack.md","package.json"]
reads: ["src/**","scripts/**"]
spec: ["docs/adr/0003-nextjs-static-gallery-site.md","docs/adr/0007-gluestack-design-system.md","docs/design/ux/tokens.json","docs/design/ux/visual-direction.md","docs/spec/18-phases-gates.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If the perf budget in the acceptance is exceeded, trim generated components and unused provider features first; raise a number only by editing docs/gluestack.md with a written reason and telling the orchestrator."
status: todo
attempts: 0
commits: []
actual_hours: null
---

## Objective

Re-implement the current layout primitives and components (src/components/Shell.tsx, ui.tsx and the page markup) on gluestack, then delete the hand-written component CSS they replace.

## Steps

1. Read src/components and src/app first; list the primitives (shell, skip link, headings, cards, tags, doc references, stage list) and keep their names and props so pages change minimally.
2. Rebuild each on primitives from `src/components/ui/**`. Preserve semantics: one h1 per page, landmarks, skip link, visible focus, reduced motion, no horizontal scroll at 320px, labels carrying meaning, `Planned` tags, "Fictional example" labels.
3. Delete the CSS rules that are now unused from globals.css; keep tokens.css only if gluestack's theme still reads it, otherwise remove it and its sync step.
4. Make sure the exported HTML still contains the full content (no client-only rendering of copy) and `check:out` passes: no form, no external hosts but github.com `<a href>`, no dashes, all routes.
5. Measure first-load JS and CSS per route (gzip) before and after; write the table in `docs/gluestack.md`.

## Acceptance

- Explicit perf budget for this unit: shared first-load JavaScript at most 130 KB gzipped per page, CSS at most 30 KB gzipped, HTML at most 30 KB per page, zero third-party origins. 06-u09 adopts these numbers in docs/performance-budget.md (the previous 100 KB JS line is superseded, with this unit as the reason).
- No page loses content or a landmark; copy checks and `check:out` green; `npm run verify` green.
- Hand-written component CSS removed; only token variables and gluestack styles remain.
- Output is still a fully static export with no runtime third-party fetch, cookies, analytics or forms.

## Out of scope

- New pages or copy changes.
- The budget script itself (06-u09).
