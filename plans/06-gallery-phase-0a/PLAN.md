---
id: "06"
title: "Gallery, Phase 0A completion"
approved: true
status: "todo"
depends_on_plans: ["08", "10", "11"]
spec: ["docs/spec/18-phases-gates.md","docs/spec/20-participation-nonmonetary.md","docs/spec/21-open-source-governance.md","docs/spec/22-ai-contribution-policy.md","docs/open-questions/OQ-promo-interest-channel.md","docs/adr/0003-nextjs-static-gallery-site.md","DECISIONS.md"]
---

# Plan 06: Gallery, Phase 0A completion

## Goal

Finish the public gallery of CAN in can_gallery (a read-only window into the project plus the Phase 0A public concept and founding contributor pages): every claim sourced, a one-hour task catalog and founding role pages generated from real plan units, locale-ready structure, accessibility and performance gates run offline, local social images, a decisions page and a what is new page, with the founder-gated pieces (interest channel, repository link, deploy) prepared but not executed. The primary visitor is anyone with any expertise (a nurse, a hotel worker, a civil servant, a developer) who should think: Yes, finally! I can help solve problems (D-80). Plan 16 rebuilds the site in its own Public Pictograms world with gradual unfolding; 06-u16 is superseded by 16-u10.


Lifecycle v2, archive and location (W13): the explainers describe the stage plan flow and the AI publication decision (06-u18, 06-u19), re-resolution over Archive records (06-u21) and the seed stage plans (06-u22); three new units add the Archive explainer (06-u23), the private location explainer the permission prompt links to (06-u24) and the static Archive pages built from the labelled simulation records (06-u25). Plan edges to 10 and 11 exist because 06-u25 reads the archive_record schema (10-u61) and the simulation archive export (11-u48).

## Acceptance

- Every Phase 0A acceptance criterion in docs/spec/18-phases-gates.md is checked in docs/phase-0a-audit.md with evidence.
- Every factual claim on the site appears in docs/claims.md with a source path that exists.
- Every call to contribute links to a catalog task or an open question, each with owner, review process and expected outcome.
- axe finds zero serious or critical violations on every route; the performance budget script passes.
- No third-party request is made by any page; no form, analytics or cookies.
- Nothing is deployed and no repository URL is invented: both stay founder-gated.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [06-u01](u01-claims-audit.md) | Factual-claims register and Phase 0A content audit | can_gallery | 1.5 | 10 | - | - |
| [06-u02](u02-locale-routing.md) | Locale-ready routing structure (English only) | can_gallery | 1 | 20 | 06-u01, 06-u15, 16-u10 | - |
| [06-u03](u03-task-catalog.md) | One-hour contribution catalog page generated from plan units | can_gallery | 1.5 | 30 | 06-u02, 08-u01, 06-u15, 16-u10 | - |
| [06-u04](u04-roles-engineering.md) | Founding role pages: engineers, designers, accessibility, security and privacy | can_gallery | 1.5 | 40 | 06-u03, 06-u15, 16-u10 | - |
| [06-u05](u05-roles-expertise.md) | Founding role pages: legal and policy, translators, researchers, documentation | can_gallery | 1.5 | 50 | 06-u04, 06-u15, 16-u10 | - |
| [06-u06](u06-decisions-page.md) | How decisions are made: DECISIONS.md summary and ADR index page | can_gallery | 1.5 | 60 | 06-u02, 06-u15, 16-u10 | - |
| [06-u07](u07-whats-new.md) | What is new page fed from the superproject git log | can_gallery | 1 | 70 | 06-u02, 06-u15, 16-u10 | - |
| [06-u08](u08-a11y-audit.md) | Accessibility audit and fixes (axe via Playwright on the static export) | can_gallery | 1.5 | 80 | 06-u01, 06-u03, 06-u05, 06-u06, 06-u07, 06-u15, 16-u10, 06-u22 | - |
| [06-u09](u09-perf-budget.md) | Performance budget and offline Lighthouse-style checks | can_gallery | 1.5 | 90 | 06-u08, 06-u15, 16-u10 | - |
| [06-u10](u10-social-previews.md) | Social preview images generated locally | can_gallery | 1 | 100 | 06-u08, 06-u09, 06-u15, 16-u10 | - |
| [06-u11](u11-interest-channel.md) | Expression-of-interest channel (implements the founder decision) | can_gallery | 1 | 110 | 06-u01, 06-u02, 06-u15, 16-u10 | yes |
| [06-u12](u12-repo-link.md) | Repository link activation once a remote exists | can_gallery | 0.5 | 120 | 06-u03 | yes |
| [06-u13](u13-deploy-prep.md) | Static hosting deploy preparation docs and checks | can_gallery | 1 | 130 | 06-u09 | - |
| [06-u14](u14-deploy.md) | Deploy the gallery to the chosen static host | can_gallery | 1 | 140 | 06-u01, 06-u08, 06-u09, 06-u12, 06-u13 | yes |
| [06-u15](u15-gluestack-install-theme.md) | Adopt gluestack-ui for gallery surfaces: install, pin and tokens theme | can_gallery | 1.5 | 1 | - | - |
| [06-u16](u16-gluestack-migrate-components.md) | Adopt gluestack-ui for gallery surfaces: migrate layout and components, drop component CSS | can_gallery | 1.5 | 15 | 06-u15 | - |
| [06-u17](u17-contributor-pitch-for-every-profession-engineers-designers.md) | Contributor pitch for every profession: engineers, designers and technical people first, lawyers, activists and policy experts needed now | can_gallery | 1.5 | 150 | 06-u04, 06-u05 | - |
| [06-u18](u18-explainer-page-ai-executed-community-policy-and.md) | Explainer page: AI-executed community policy and structured content | can_gallery | 1.5 | 151 | 06-u17 | - |
| [06-u19](u19-replace-the-old-human-only-moderation-copy.md) | Replace the old human-only moderation copy and re-sync manifesto-derived copy | can_gallery | 1.5 | 152 | 06-u18 | - |
| [06-u20](u20-explainer-page-the-legal-layer-stack-lawful.md) | Explainer page: the legal layer stack, lawful everywhere | can_gallery | 1.5 | 153 | 06-u18, 06-u19 | - |
| [06-u21](u21-explainer-page-when-the-rules-improve-past.md) | Explainer page: when the rules improve, past cases are re-examined | can_gallery | 1.0 | 154 | 06-u20 | - |
| [06-u22](u22-explainer-page-persona-simulation-proof-and-the.md) | Explainer page: persona simulation proof and the four seed problems (synthetic evidence) | can_gallery | 1.5 | 155 | 06-u21 | - |
| [06-u23](u23-explainer-page-the-archive-and-reuse.md) | Explainer page: the Archive and reuse, solving common problems together | can_gallery | 1 | 155 | 06-u22 | - |
| [06-u24](u24-explainer-page-the-private-location-check.md) | Explainer page: the private location check, impacted and guest labels | can_gallery | 1 | 156 | 06-u23 | - |
| [06-u25](u25-static-archive-pages-from-synced-simulation.md) | Static Archive pages from synced simulation records (/archive, /archive/[id]) | can_gallery | 1.5 | 157 | 06-u24, 11-u48, 10-u61 | - |

## Conventions

- Run every unit with cwd can_gallery. The standing verify is `npm run verify`; units add their own `check:*` npm scripts and extend `verify` to call them.
- Sync scripts follow the open-questions sync convention (scripts/sync-*.mjs, committed JSON in src/content/). They read the superproject at `..` when present and otherwise keep the committed output and exit 0 with a message. The check scripts fail only when sources exist and the committed output is stale.
- Copy rules: no em dashes or en dashes in any user-facing text; label every example as fictional; nothing may imply the platform is live or handling real problems; no emergency, legal, medical or government service claims.
- Plan 08 unit 08-u01 (corpus catalog command) must be done before 06-u03.
- Design system: gluestack-ui (ADR 0007, D-50), installed by 06-u15 and applied in the gallery's own Public Pictograms world by 16-u10 (D-80; 06-u16 skipped) before any other gallery UI unit. Until they land the site is hand-written plain CSS driven by tokens. The site stays a static export with no runtime third-party fetch.
- Units that need a browser use Playwright as a dev dependency only; the shipped site stays dependency-light and fetches nothing.

## Risks

- The gallery repo is built the night this plan is written; unit steps say to read the real src first and adapt names.
- Role pages and the catalog can drift from the plans corpus; the sync check scripts catch staleness.
- gluestack-ui adds client JavaScript to a site that had none; 06-u16 sets the explicit budget (130 KB gzipped JS per page) and 06-u09 enforces it. If only a pre-release supports Next 16, it is pinned exactly and logged.
- Public text on a public site is a reputation risk: units 11, 12 and 14 stay founder-gated.
