---
id: "06-u04"
plan: "06"
title: "Founding role pages: engineers, designers, accessibility, security and privacy"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.5
priority: 40
depends_on: ["06-u03","06-u15","06-u16"]
writes: ["src/app/contribute/roles/**","src/content/roles/**","src/components/**","scripts/check-roles.mjs","package.json"]
spec: ["docs/spec/18-phases-gates.md","docs/spec/21-open-source-governance.md","docs/spec/20-participation-nonmonetary.md","docs/spec/04-roles-stewardship.md","docs/spec/16-security-a11y-ops-testing.md","docs/spec/17-ux.md"]
verify: ["npm run check:roles","npm run verify"]
founder_gate: false
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Create the role-page template for the founding stage (Gate X lists the full template; founding stage uses the first rung of the open-participation ladder) and fill four roles: engineers and maintainers, designers, accessibility reviewers, security and privacy specialists.

## Steps
0. D-60 consistency: engineers, designers and other technical contributors are the most urgent need today because the platform is being built. Add `urgency: "most-urgent-now"` to the Role type and render the sentence "Most urgent today: the platform is being built." on these role pages (06-u17 builds the cross-profession pitch on top).

1. Define a typed Role in src/content/roles/types.ts with the Gate X fields: what you can do now, prerequisites, time commitment options, privacy and conflict rules, prohibited activity, available tasks, review and escalation, how contribution affects decisions. Add `stage` ("founding") and a fixed statement: a role page does not grant authority merely by allowing self-selection.
2. Build /contribute/roles (index) and /contribute/roles/[role] with generateStaticParams. Same structure on every page so a screen reader user always finds fields in the same order. Use src/lib/paths.ts for links.
3. Write the four roles from the spec: engineers and maintainers (point at the repos, the contribution ladder in docs/spec/21-open-source-governance.md, skills under .claude/skills not required), designers (docs/design), accessibility (docs/spec/16 baseline, screen reader testing on fictional screens), security and privacy (SECURITY.md private disclosure, adversarial fixtures, never real data). Available tasks come from src/content/catalog.json filtered by tag or area; when none match, say honestly that no bounded task is open and point to open questions.
4. Founding stage rules: work uses fictional or public material only; no real personal data anywhere; AI use is allowed and disclosed per docs/spec/22-ai-contribution-policy.md and no paid tool is required.
5. Write scripts/check-roles.mjs: every role has all template fields, non-empty, and links resolve to existing routes. Add check:roles to verify.
6. Copy rules: no em dashes or en dashes in any user-facing text; label every example as fictional; nothing may imply the platform is live or handling real problems; no emergency, legal, medical or government service claims.

## Acceptance

- Four role pages and an index build statically; every template field is present on each.
- No role page promises authority, pay, or that the platform is operating.
- check:roles and verify pass.

## Out of scope

- The other four roles (06-u05).
- Roles for later gates (residents, stewards, institutions, node operators).
- Application or sign-up flows.
