---
name: can-promo-site
description: Work on can_promo_site, the static Next.js promo and founding-contributor site of CAN. Use when editing its pages, copy, CSS, synced content, or running its verify pipeline.
---

# can-promo-site

Weight: light. Next.js 16 static export, plain CSS, zero client JavaScript of our own, no runtime dependencies beyond next/react. Phase 0A deliverable (`docs/spec/18-phases-gates.md`).

## Routes
`/`, `/how-it-works/`, `/contribute/`, `/open-questions/`, `/roadmap/`, `/principles/` (all under `src/app/`, trailing slash on).

## Commands (run with `npm --prefix can_promo_site`)
- `run dev` (port 3000), `run build` (writes `out/`), `run lint`, `run typecheck`
- `run sync:content` rewrites synced files; `run sync:check` fails on drift
- `run verify` = sync:check + lint + typecheck + build + check:out (no `<form`, no analytics, no external hosts in href/src, no em or en dashes in rendered HTML, all six routes exist)

## Invariants
- Phase 0A limits: no forms, cookies, analytics, third-party fetches or fonts. No collection of personal data. The channel to get involved is the repository plus the open questions (`OQ-promo-interest-channel`).
- Never imply the platform is live or handles real problems. Status: concept and early scaffolding; not an emergency, legal, medical, government or individual case service.
- Copy rules: no em or en dashes; examples labelled "Fictional example"; no real jurisdiction named; anything unbuilt carries the `Planned` tag; calm, warm, no hype.
- Visual: only tokens (`--can-*`), system fonts, no red for ordinary states, label always carries meaning. One h1 per page, skip link, visible focus, reduced motion respected, no horizontal scroll at 320px.
- `REPO_URL` lives only in `src/config/site.ts` and stays `#repository-coming-soon` until a remote exists. Doc references use `DocRef` so they become links automatically.

## Single-owner synced files (never hand edit)
- `src/content/tokens.json` and `src/app/tokens.css`: from `docs/design/ux/tokens.json`
- `src/content/open-questions.json`: from `docs/open-questions/OQ-*.md` (title, why it matters, current default, who can help)
- `src/content/stages.ts` is a hand copy of the public labels in `docs/spec/01-slice-1-brief.md`; update it when that table changes.
Change the source in `docs/`, run `sync:content`, commit both.

## Traps
- Next defaults leak in on scaffold: delete default art and `next/font/google`. `next dev` regenerates AGENTS.md and CLAUDE.md on every run; both are gitignored, never delete or commit them.
- Next 16 has breaking API changes versus older training data: read the guide in `node_modules/next/dist/docs/` before writing Next code.
- `check:out` scans rendered HTML, so a dash inside JSON from sync (open questions) fails the build; the sync script already converts dashes to commas.
- A `pre` inside a grid item overflows at 320px unless the item has `min-width: 0`.
- `sync:check` skips when `../docs` is absent (standalone checkout).
- Commit only inside `can_promo_site`; the superproject records the pointer.
