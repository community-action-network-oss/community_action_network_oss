---
name: can-gallery
description: Work on can_gallery, the read-only public gallery and explainer site (static Next.js) of CAN. Use when editing its pages, copy, CSS, synced content, or running its verify pipeline.
---

# can-gallery

Weight: light. Next.js 16 static export. Built on gluestack-ui (D-50, ADR 0007): 06-u15 installs it, 16-u10 applies the gallery identity. Until 16-u10 lands, pages are plain CSS. JS budget 130 KB gzipped per page, no runtime third-party fetch. Phase 0A deliverable (`docs/spec/18-phases-gates.md`).

## Settled before you start (D-80)
- **Audience: anyone with any expertise** (nurse, cook, clerk, electrician, student, lawyer, engineer), not mainly developers. Plain words a non-specialist reads first time; jargon (repo, lifecycle, schema, moderation run, attestation, OQ ids) only inside unfolded detail or on the deep pages.
- **Gradual unfolding everywhere.** Never delete information the site serves; show what matters at that moment and put the rest in `Unfold` (`src/components/Unfold.tsx`, native `details`/`summary`, text stays in the exported HTML, works without JS, visible "Show more" label, `#hash` opens it). Do not use the gluestack Accordion for this.
- **Visual world: Public Pictograms (Isotype).** PRODUCT.md and the Direction contract (`.impeccable/surfaces/src-app-page-tsx.md`) are settled. Load the impeccable skill, read both plus `reference/craft-floor.md`, and build to them. Never run impeccable init, concept-seed or a direction round, and never open the decision page.
- **The vision to carry in copy:** a person tells CAN what they know, privately, on their own device, and is shown only the few public problems they can move. One person, maybe five problems, solved properly. Never call it a feed; no algorithm guesses. Mark it `Planned`.

## Routes
`/`, `/how-it-works/`, `/contribute/`, `/open-questions/`, `/roadmap/`, `/principles/` (all under `src/app/`, trailing slash on), plus `/docs/` (Read everything), `/docs/<slug>/` for every public document (generated from the manifest) and `/docs/view/?path=<path>` for documents added after the build.

## Commands (run with `npm --prefix can_gallery`)
- `run dev` (port 3000), `run build` (writes `out/`), `run lint`, `run typecheck`
- `run sync:content` rewrites synced files; `run sync:check` fails on drift
- `run test` runs `scripts/whitelist.test.mjs` (whitelist rejects plans/, .claude/, `..`, absolute paths, URLs, non-md; fetch failure never yields text)
- `run sync:docs` writes the docs index (`.generated/manifest.json`, gitignored); `dev` and `build` run it first
- `run verify` = sync:check + test + lint + typecheck + build + check:out (no `<form`, no analytics, no external hosts in href/src, no em or en dashes in rendered HTML, all routes exist, docs page count equals the manifest, no document text anywhere in `out/`, only the allowed GitHub fetch hosts in built JS)

## Invariants
- Phase 0A limits: no forms, cookies, analytics or fonts, and no third-party fetches EXCEPT the live document fetches of D-67/D-68 (see Docs below). No collection of personal data. The channel to get involved is the repository plus the open questions (`OQ-promo-interest-channel`, a stable id kept from before the rename).
- Never imply the platform is live or handles real problems. Status: concept and early scaffolding; not an emergency, legal, medical, government or individual case service.
- Copy rules: never repeat a sentence from manifesto.md, DECISIONS.md or the spec index verbatim (`check:out` fails on known document sentences); no em or en dashes; examples labelled "Fictional example"; the four seed problems (D-56) may name Amsterdam but are always labelled "Seed problem, synthetic evidence" and never name individuals; no other real jurisdiction named; anything unbuilt carries the `Planned` tag; calm, warm, no hype.
- Visual: the gallery theme (gallery-owned, per the Direction contract) plus the shared status hue families; system fonts only (no font files, no remote fonts); no red for ordinary states; label always carries meaning. One h1 per page, skip link, visible focus, reduced motion respected, no horizontal scroll at 320px.
- `REPO_URL` lives only in `src/config/site.ts` and is set to the GitHub superproject URL. Doc references use `DocRef` and link to GitHub. github.com is the only allowed external host (`check:out` allows exactly it, as `<a href>` over https).

## Owned, customised sources
- `src/components/ui/**`: generated once by the gluestack CLI (06-u15), then owned by the gallery and customised to the Direction contract (D-80). Edit freely; do not regenerate over customisations.

## Single-owner synced files (never hand edit)
- `src/content/tokens.json` and `src/app/tokens.css`: from `docs/design/ux/tokens.json` (shared status hues). The gallery identity theme is NOT synced: it is gallery-owned (D-80).
- `src/content/open-questions.json`: from `docs/open-questions/OQ-*.md` (title, why it matters, current default, who can help)
- `src/content/stages.ts` is a hand copy of the public labels in `docs/spec/01a-lifecycle.md` and `docs/spec/01b-stages.md` (lifecycle v2, D-72): the six path steps (Prepare, Volunteer review, Published, Stages, Solved, then Archive per D-76), the five stage sub steps with Poster, Community and AI lines, and the side states. `src/components/Path.tsx` renders them on `/` and `/how-it-works/`. Update it when those docs change.
Change the source in `docs/`, run `sync:content`, commit both.

## Traps
- Next defaults leak in on scaffold: delete default art and `next/font/google`. `next dev` regenerates AGENTS.md and CLAUDE.md on every run; both are gitignored, never delete or commit them.
- Next 16 has breaking API changes versus older training data: read the guide in `node_modules/next/dist/docs/` before writing Next code.
- `check:out` scans rendered HTML, so a dash inside JSON from sync (open questions) fails the build; the sync script already converts dashes to commas.
- A `pre` inside a grid item overflows at 320px unless the item has `min-width: 0`.
- `sync:check` skips when `../docs` is absent (standalone checkout).
- Commit only inside `can_gallery`; the superproject records the pointer.

## Docs: Read everything (D-66, D-67, D-68, D-70)
- **Never a stale copy.** No document text is bundled in the build. Build ships only the index (`scripts/docs-manifest.json` committed path list, `.generated/manifest.json` with titles and sections, gitignored). Each `/docs/<slug>/` page is a shell: `LiveDoc` (client) shows a loading state, fetches the file from GitHub main in the browser, renders it with `src/lib/render.ts` (unified, remark-gfm, rehype-sanitize, slug, autolink, relative links rewritten to gallery routes or GitHub; lazy chunk, not base JS) and shows "Live from GitHub, checked <time>". Failure (network, non-200, 10 s timeout) shows "GitHub is unreachable right now, so this document cannot be shown live." with Retry and Open on GitHub; no-JS shows a noscript message. Changes appear only after the founder pushes: editing a doc locally does NOT change what the site shows.
- **Whitelist** (`src/lib/whitelist.mjs`, deny by default): `manifesto.md`, `DECISIONS.md`, `docs/open-questions`, `docs/spec` (incl. constitution), `docs/design`, `docs/adr`, `can_policy/**` (.md plus .json/.yaml as code blocks). Never plans/, .claude/, code, scripts, tools, .env, tsv. Used by the build script, the live loader and the `/docs/view/` route.
- **New files:** `/docs/` lists the build index at once, then asks the GitHub tree API (both repos) and lists new whitelisted files linking to `/docs/view/?path=`. Tree failure or rate limit falls back to the build index with a one-line note. Community policies (`can_policy`, public, may be empty or have no main yet: 404 or 409) show "being drafted" until files exist.
- **One config** `src/config/docs-origin.mjs`: DOCS_ORIGIN (raw files), TREE_ORIGIN (listings), org and repos, `THIRD_PARTY`, privacy note text. To switch to a same-domain proxy, change the origins and set `THIRD_PARTY=false`; the privacy note (docs page, doc pages, footer) goes away. Pages never hard-code these.
- **Privacy:** visible note on /docs, every doc page and the footer: GitHub sees the reader's IP. Rule relaxed only for `raw.githubusercontent.com` and `api.github.com`, repos `community_action_network_oss` and `can_policy`.
- **Mermaid:** code blocks become `pre.mermaid`; `src/lib/mermaid.ts` is imported lazily only when a rendered page has one (bundled, no CDN, strict security level); on failure the source block stays visible.
- **check:out** pins the config values, rejects any other GitHub host reference in built JS or any in HTML, and fails if a known sentence from manifesto.md, DECISIONS.md or the spec index appears anywhere in `out/`. The dash rule needs no exemption because no document text is in the HTML (titles in the index are cleaned by the build script).
- **Base JS:** docs pages add about 4 KB gz over the home page. Render chunk about 50 KB gz, loaded after the fetch. Mermaid is several chunks (about 650 KB gz in total, largest 431 KB), loaded only on pages with diagrams.
