---
id: "06"
title: "Gallery, Phase 0A completion"
approved: true
status: "todo"
depends_on_plans: ["08"]
spec: ["docs/spec/18-phases-gates.md","docs/spec/20-participation-nonmonetary.md","docs/spec/21-open-source-governance.md","docs/spec/22-ai-contribution-policy.md","docs/open-questions/OQ-promo-interest-channel.md","docs/adr/0003-nextjs-static-gallery-site.md","DECISIONS.md"]
---

# Plan 06: Gallery, Phase 0A completion

## Goal

Finish the public gallery of CAN in can_gallery (a read-only window into the project plus the Phase 0A public concept and founding contributor pages): every claim sourced, a one-hour task catalog and founding role pages generated from real plan units, locale-ready structure, accessibility and performance gates run offline, local social images, a decisions page and a what is new page, with the founder-gated pieces (interest channel, repository link, deploy) prepared but not executed. The primary visitor is a developer who should think: Yes, finally! We can solve problems.

## Acceptance

- Every Phase 0A acceptance criterion in docs/spec/18-phases-gates.md is checked in docs/phase-0a-audit.md with evidence.
- Every factual claim on the site appears in docs/claims.md with a source path that exists.
- Every call to contribute links to a catalog task or an open question, each with owner, review process and expected outcome.
- axe finds zero serious or critical violations on every route; the performance budget script passes.
- No third-party request is made by any page; no form, analytics or cookies.
- Nothing is deployed and no repository URL is invented: both stay founder-gated.

## Units

Total estimate: 17 hours across 14 units. Gated units are never selected by `corpus.mjs next`.

| Unit | Title | Repo | Hours | Needs units | Founder gate |
|---|---|---|---|---|---|
| 06-u01 | Factual-claims register and Phase 0A content audit | can_gallery | 1.5 | none | no |
| 06-u02 | Locale-ready routing structure (English only) | can_gallery | 1 | 1 | no |
| 06-u03 | One-hour contribution catalog page generated from plan units | can_gallery | 1.5 | 2, 08-u01 | no |
| 06-u04 | Founding role pages: engineers, designers, accessibility, security and privacy | can_gallery | 1.5 | 3 | no |
| 06-u05 | Founding role pages: legal and policy, translators, researchers, documentation | can_gallery | 1.5 | 4 | no |
| 06-u06 | How decisions are made: DECISIONS.md summary and ADR index page | can_gallery | 1.5 | 2 | no |
| 06-u07 | What is new page fed from the superproject git log | can_gallery | 1 | 2 | no |
| 06-u08 | Accessibility audit and fixes (axe via Playwright on the static export) | can_gallery | 1.5 | 1, 3, 5, 6, 7 | no |
| 06-u09 | Performance budget and offline Lighthouse-style checks | can_gallery | 1.5 | 8 | no |
| 06-u10 | Social preview images generated locally | can_gallery | 1 | 8, 9 | no |
| 06-u11 | Expression-of-interest channel (implements the founder decision) | can_gallery | 1 | 1, 2 | yes |
| 06-u12 | Repository link activation once a remote exists | can_gallery | 0.5 | 3 | yes |
| 06-u13 | Static hosting deploy preparation docs and checks | can_gallery | 1 | 9 | no |
| 06-u14 | Deploy the gallery to the chosen static host | can_gallery | 1 | 1, 8, 9, 12, 13 | yes |

## Conventions

- Run every unit with cwd can_gallery. The standing verify is `npm run verify`; units add their own `check:*` npm scripts and extend `verify` to call them.
- Sync scripts follow the open-questions sync convention (scripts/sync-*.mjs, committed JSON in src/content/). They read the superproject at `..` when present and otherwise keep the committed output and exit 0 with a message. The check scripts fail only when sources exist and the committed output is stale.
- Copy rules: no em dashes or en dashes in any user-facing text; label every example as fictional; nothing may imply the platform is live or handling real problems; no emergency, legal, medical or government service claims.
- Plan 08 unit 08-u01 (corpus catalog command) must be done before 06-u03.
- Units that need a browser use Playwright as a dev dependency only; the shipped site stays dependency-light and fetches nothing.

## Risks

- The gallery repo is built the night this plan is written; unit steps say to read the real src first and adapt names.
- Role pages and the catalog can drift from the plans corpus; the sync check scripts catch staleness.
- Public text on a public site is a reputation risk: units 11, 12 and 14 stay founder-gated.
