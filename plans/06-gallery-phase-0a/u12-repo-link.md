---
id: "06-u12"
plan: "06"
title: "Repository link activation once a remote exists"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 0.5
priority: 120
depends_on: ["06-u03"]
writes: ["src/content/site.ts","docs/claims.md","README.md","src/content/catalog.json","src/content/decisions.json","scripts/check-copy.mjs"]
spec: ["docs/spec/18-phases-gates.md","docs/adr/0003-nextjs-static-gallery-site.md","docs/adr/0001-submodule-layout.md","docs/open-questions/OQ-domain.md"]
verify: ["npm run sync:catalog","npm run sync:decisions","npm run check:copy","npm run verify"]
founder_gate: true
defaults: "If the remote is private or not yet public, leave REPO_URL null."
status: done
attempts: 0
commits: ["can_gallery:e19af36"]
actual_hours: 0.5
---

## Objective

Founder gate: needs a public remote URL and the founder saying it is ready. Replace the placeholder so the repository, setup instructions, specification, charter and open questions are linked, which is how a founding contributor reaches setup without any paid tool.

## Steps

1. Set REPO_URL in src/content/site.ts to the URL the founder provides (never guess an owner or name). Derive file and tree links from it.
2. Remove the "coming once the remote exists" wording in one place (site.ts) and re-run sync scripts so unit and ADR links carry URLs.
3. Update docs/claims.md (the placeholder claim becomes a supported claim) and README.md; make check:copy allow exactly this host.
4. Run verify and open every external link by hand once.
5. Copy rules: no em dashes or en dashes in any user-facing text; label every example as fictional; nothing may imply the platform is live or handling real problems; no emergency, legal, medical or government service claims.

## Acceptance

- Every repository link resolves to the real remote; no placeholder text remains.
- check:copy allow list names exactly one repository host; verify passes.

## Out of scope

- Deploying.
- Creating the remote or its settings.
