---
id: "06-u14"
plan: "06"
title: "Deploy the promo site to the chosen static host"
repo: "can_promo_site"
area: "can-promo-site"
model: sonnet
est_hours: 1
priority: 140
depends_on: ["06-u01","06-u08","06-u09","06-u12","06-u13"]
writes: ["docs/deploy-log.md","README.md"]
spec: ["docs/adr/0003-nextjs-static-promo-site.md","docs/spec/18-phases-gates.md","docs/open-questions/OQ-domain.md","docs/open-questions/OQ-hosting-region.md","DECISIONS.md"]
verify: ["npm run verify","npm run a11y","npm run check:deploy"]
founder_gate: true
defaults: "Deploy to a preview URL first; never attach a domain or remove noindex in this unit."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Founder gate: needs a chosen host, an account and the founder approving publication. Publish the already-built static export and record exactly what happened.

## Steps

1. Confirm the audit (06-u01) shows every Phase 0A criterion met or consciously deferred, and that the founder has approved publication in DECISIONS.md.
2. Follow docs/deploy.md on a preview target; apply deploy/headers.txt; check response headers with curl.
3. Run the accessibility and budget checks against the preview URL as far as the scripts allow, and record results.
4. Record in docs/deploy-log.md: date, commit sha, host, URL, headers verified, rollback command. Update README.md with the URL.

## Acceptance

- The preview URL serves the export with the required headers.
- docs/deploy-log.md lets anyone roll back.
- Search indexing remains off until a founder decision says otherwise.

## Out of scope

- Domain, DNS and email.
- Analytics.
- Announcing the site.
