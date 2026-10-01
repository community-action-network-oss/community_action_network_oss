# ADR 0003: Next.js static export for the promo site

- Status: Accepted, 2026-10-01 (D-9, D-10)

## Context
The spec named no promo stack. Phase 0A requires no forms, no analytics, no third-party fetches. The audience is developers first; the site must load fast, be accessible, and be cheap to host anywhere. The founder wants a visitor to think "Yes, finally! We can actually solve problems."

## Decision
`can_promo_site` is Next 16 with `output: 'export'` (pure static HTML), plain CSS driven by the shared tokens, system fonts, no client-side data fetching, no analytics, no forms. The primary call to action links to the repository and the open questions register; the repository link is a placeholder until the remote exists. Examples are labelled fictional, unbuilt things "planned", and no real jurisdiction is named.

## Consequences
- Hostable on any static host or a plain file server; no runtime to secure.
- Familiar to the target contributors; room to add MDX docs later.
- Next brings a larger toolchain than a hand-written page; accepted for contributor familiarity and future growth.
- The promo site cannot show live data; that is intended.

## How to reverse
The output is plain HTML and CSS. Replace the generator (Astro, Eleventy, hand-written) and keep the tokens-to-CSS step.
