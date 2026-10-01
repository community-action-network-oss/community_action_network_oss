---
id: "06-u11"
plan: "06"
title: "Expression-of-interest channel (implements the founder decision)"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1
priority: 110
depends_on: ["06-u01","06-u02","06-u15","16-u10"]
writes: ["src/app/get-involved/**","src/content/site.ts","src/content/interest.ts","docs/claims.md","docs/privacy-notice.md","package.json"]
spec: ["docs/open-questions/OQ-promo-interest-channel.md","docs/spec/18-phases-gates.md","docs/spec/16-security-a11y-ops-testing.md","DECISIONS.md"]
verify: ["npm run check:copy","npm run check:claims","npm run verify"]
founder_gate: true
defaults: "If the decision is still undecided, change nothing: the default (repository link and open questions, no form, no list) already ships."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Founder gate: needs a decision on OQ-promo-interest-channel (repository discussions, a mailing list, or a privacy-minimal form) logged in DECISIONS.md. Then implement exactly that channel on the site and nothing more.

## Steps

1. Confirm the question status is `decided` and a DECISIONS.md entry names the channel, who operates it, what data is held and retention. If not, stop and report.
2. Add src/content/interest.ts holding the chosen channel (kind, link, what is collected, retention, operator). Render /get-involved from it with a plain-language privacy notice in docs/privacy-notice.md and on the page.
3. If the channel is an external link, state that leaving the site hands the visitor to a third party. If it needs a server (a form), do not build one here: a static export cannot receive posts; write the requirement in the unit report and stop.
4. Add the claims to docs/claims.md; keep check:copy and check:claims green. Keep the page free of cookies and scripts.
5. Copy rules: no em dashes or en dashes in any user-facing text; label every example as fictional; nothing may imply the platform is live or handling real problems; no emergency, legal, medical or government service claims.

## Acceptance

- The channel on the page matches the logged decision; the notice states data, operator and retention.
- No new third-party request unless the decision names one and the page says so.
- verify passes.

## Out of scope

- Running a mailing list or discussion space.
- Any form backend.
- Analytics.
