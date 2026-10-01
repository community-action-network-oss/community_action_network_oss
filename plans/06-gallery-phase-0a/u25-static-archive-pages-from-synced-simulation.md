---
id: "06-u25"
plan: "06"
title: "Static Archive pages from synced simulation records (/archive, /archive/[id])"
repo: can_gallery
area: can-gallery
model: sonnet
est_hours: 1.5
priority: 157
depends_on: ["06-u24","11-u48","10-u61"]
writes: ["scripts/sync-archive.mjs","scripts/check-archive.mjs","src/content/archive.json","src/app/archive/**","src/components/**","docs/claims.md","scripts/check-out.mjs","src/app/layout.tsx","package.json"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/archive.md#WF-ARCHIVE-1","docs/design/ux/wireframes/archive.md#WF-ARCHIVE-2","docs/spec/24-archive-reuse.md","docs/design/ai/archive-reuse.md#11-cold-start","docs/spec/constitution/rules-legal-sim.md#SIM-LABEL-1","docs/adr/0003-nextjs-static-gallery-site.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The same Archive data, read-only, as static pages in the gallery (WF-ARCHIVE-1 says the app screen and the gallery pages share the data). In slice 1 the only records are the labelled simulation records of the seed runs (11-u48). No records of real problems exist until public participation opens.

## Steps
1. `scripts/sync-archive.mjs` (the sync convention: reads `../can_server/test/simulation/fixtures/archive/*.json` when present, otherwise keeps the committed `src/content/archive.json` and exits 0): keeps only `source: simulation` records and only the fields the public pages show (title from the condition, terminal state, ended date, region, challenges, executed path, outcome, attribution, license), validates each against the archive_record schema fields of 10-u61 (copied key list, no new dependency), converts dashes to commas, and refuses a record that is not labelled simulation or that contains an email-like string.
2. `src/app/archive/page.tsx` (list, newest first, filters as links by outcome, no counts used as status, failures listed with the same card as successes) and `src/app/archive/[id]/page.tsx` with `generateStaticParams` (the journey: stage map as a list, options and reasons, each challenge with what was tried, why it failed or what blocked it, how it was resolved or that it was not, costs in bands, outcome, versions, license and credit). Every card and page carries the label "Seed problem, synthetic evidence" and says these are simulation records; tag the whole section `Planned`.
3. `scripts/check-archive.mjs` (wired as `check:archive`): every page has the label text exactly, no email-like or coordinate-like string, every record has a license and credit line, the committed JSON equals the sync output when the source exists. Add the routes to `scripts/check-out.mjs` and the nav; link the explainer 06-u23.
4. No search box and no client JavaScript beyond the shell; the static export must stay free of third-party requests. Claims to docs/claims.md.
5. Copy rules: no em dashes or en dashes in any user-facing text; github.com is the only external host; no forms, cookies, analytics or third-party requests; label unbuilt things `Planned`; nothing implies the platform is live or handling real problems; no emergency, legal, medical or government service claims; calm, warm, no hype.

## Acceptance
- Every archive page carries the simulation label and a license and credit line.
- The sync refuses anything that is not a labelled simulation record.
- `npm run verify` passes with `check:archive` wired.

## Out of scope
- Search and the app screens (13-u25, 13-u26).
- Records of real problems.
