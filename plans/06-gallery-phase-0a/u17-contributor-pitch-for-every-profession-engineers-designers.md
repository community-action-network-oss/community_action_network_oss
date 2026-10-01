---
id: "06-u17"
plan: "06"
title: "Contributor pitch for every profession: engineers, designers and technical people first, lawyers, activists and policy experts needed now"
repo: "can_gallery"
area: can-gallery
model: sonnet
est_hours: 1.5
priority: 150
depends_on: ["06-u04", "06-u05"]
writes: ["src/app/contribute/**", "src/app/page.tsx", "src/content/pitch.ts", "src/content/roles/**", "scripts/check-pitch.mjs", "package.json"]
spec: ["DECISIONS.md", "manifesto.md", "docs/spec/21-open-source-governance.md", "docs/spec/22-ai-contribution-policy.md", "docs/design/ai/policy-pack.md", "docs/design/components/can-policy.md", "docs/open-questions/OQ-legal-corpus-sourcing.md", "docs/open-questions/OQ-legal-layer-conflicts.md", "docs/open-questions/OQ-supranational-default.md", "docs/open-questions/OQ-reresolution-feasibility.md", "docs/open-questions/OQ-legal-policy-reviewers.md", "docs/open-questions/OQ-amsterdam-overlay-review.md", "docs/open-questions/OQ-policy-pr-rights.md"]
verify: ["npm run check:pitch", "npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Make the gallery pitch for everyone (D-60). Every profession can contribute. The most urgent need today is engineers, designers and other technical people because the platform is being built. Lawyers, activists, policy and rights experts are needed now as well: they draft the platform rules and policy packs in can_policy. Each profession gets a concrete ask that links to an open question or a plan unit.

## Steps
1. Read src/app/contribute/page.tsx, the roles pages and scripts first; adapt names. Create a typed `src/content/pitch.ts`: `{profession, urgency: 'most-urgent-now'|'needed-now'|'welcome', ask, why, links[]}` where each link is `{kind: 'oq'|'unit'|'role', id}`. Professions: engineers and maintainers, designers, other technical people (data, security, DevOps, accessibility), then lawyers, activists, policy experts, rights experts, then translators, researchers, writers, educators, and a line for everyone else.
2. Concrete asks (each with at least one link): engineers (the repositories and open plan units, for example 09-u56 to 09-u67 and 10-u55 to 10-u57), designers (UX gap: a wireframe for the reopened status panel, plan 09 unit 09-u65), lawyers (review corpora and topic indexes: OQ-legal-corpus-sourcing, OQ-legal-policy-reviewers, plan units 10-u51 and 10-u52; interpretation conflicts: OQ-legal-layer-conflicts), policy experts (draft rules and policy packs in can_policy: OQ-policy-pr-rights, OQ-reresolution-feasibility), rights experts (OQ-legal-layer-conflicts, OQ-supranational-default), activists (propose rules and examples from lived cases, fictional or public only: OQ-amsterdam-overlay-review, and the can_policy contributor path unit 08-u15).
3. Rebuild /contribute/ as the pitch: heading "Every profession can help", the two urgency groups first ("Most urgent today" then "Needed now to write the rules"), then "Also welcome". Replace the home page contribute teaser with the same two-sentence pitch from `pitch.ts`. Keep the one-hour task framing and link to the catalog (06-u03). Never promise authority, pay or that the platform is operating.
4. `scripts/check-pitch.mjs`: every link resolves (oq id exists in src/content/open-questions.json, role slug exists, unit id exists as a file under `../plans/**` when the superproject is present, else skipped with a message); every profession has at least one link; urgency order is respected; wired into `verify` as `check:pitch`.
5. Copy rules: no em dashes or en dashes in any user-facing text; github.com is the only external host; no forms, cookies, analytics or third-party requests; label unbuilt things `Planned`; nothing implies the platform is live or handling real problems; no emergency, legal, medical or government service claims; calm, warm, no hype.

## Acceptance
- /contribute/ shows the two urgency groups and a concrete linked ask per profession.
- check:pitch and verify pass; no dead link.
- The wording matches D-60 (technical most urgent, legal and policy needed now).

## Out of scope
- Role page bodies (06-u04, 06-u05 carry their own edits).
- Sign-up flows or forms.
