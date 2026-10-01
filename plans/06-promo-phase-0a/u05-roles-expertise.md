---
id: "06-u05"
plan: "06"
title: "Founding role pages: legal and policy, translators, researchers, documentation"
repo: "can_promo_site"
area: "can-promo-site"
model: sonnet
est_hours: 1.5
priority: 50
depends_on: ["06-u04"]
writes: ["src/content/roles/**","src/app/contribute/roles/**","scripts/check-roles.mjs"]
spec: ["docs/spec/18-phases-gates.md","docs/spec/21-open-source-governance.md","docs/spec/20-participation-nonmonetary.md","docs/open-questions/OQ-legal-policy-reviewers.md","docs/open-questions/OQ-unsupported-language.md","docs/spec/06-moderation-geo-governance.md"]
verify: ["npm run check:roles","npm run verify"]
founder_gate: false
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Add the remaining four founding roles using the template from 06-u04: legal and policy experts, translators and localizers, researchers, and documentation contributors.

## Steps

1. Add four Role entries. Legal and policy: reviews fictional or public material and open questions only, gives no legal advice to individuals, and a policy pack needs a qualified reviewer (OQ-legal-policy-reviewers). Translators: fictional examples and interface strings only, verify technical meaning, language order is an open question (OQ-unsupported-language). Researchers: user research on fictional prototypes, public sources, consent and no recruiting of real affected people yet. Documentation: spec edits, READMEs, plain-language rewrites.
2. Each role links to the open questions that fit it by "Who can help" in docs/open-questions, and to catalog tasks by tag.
3. Extend scripts/check-roles.mjs to require eight roles and unique slugs.
4. Add the eight-role index with one sentence each.
5. Copy rules: no em dashes or en dashes in any user-facing text; label every example as fictional; nothing may imply the platform is live or handling real problems; no emergency, legal, medical or government service claims.

## Acceptance

- Eight founding role pages; the index lists all of them.
- Legal and policy page contains the no-individual-advice statement and the independence note.
- check:roles and verify pass.

## Out of scope

- Roles for residents, institutions, moderators and node operators (later gates).
- Recruiting real participants.
