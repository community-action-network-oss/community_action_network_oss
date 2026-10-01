---
id: "06-u18"
plan: "06"
title: "Explainer page: AI-executed community policy and structured content"
repo: "can_gallery"
area: can-gallery
model: sonnet
est_hours: 1.5
priority: 151
depends_on: ["06-u17"]
writes: ["src/app/community-policy/**", "src/components/**", "src/content/policy-explainer.ts", "docs/claims.md", "scripts/check-out.mjs", "src/app/layout.tsx", "package.json"]
spec: ["docs/design/ai/README.md", "docs/design/ai/structured-content.md", "docs/design/ai/amendment-loop.md", "docs/design/ai/appeals.md", "docs/adr/0008-ai-executed-community-policy.md", "docs/adr/0010-structured-content-everywhere.md", "DECISIONS.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A plain-language explainer, /community-policy/: people make every rule, the AI applies it to every post before, during and after publication, explains each decision and answers to appeal. Content is structured everywhere. This replaces the old claim that people make and answer for every decision.

## Steps
1. Sections, each tagged `Planned` where unbuilt (everything beyond the specification is): (1) People write the rules: policy packs in can_policy, changed by pull request, checked by an evaluation and a replay of past decisions, ratified, then rolled out in stages. (2) The AI applies them: before publication, on every edit, and after publication when the rules or the facts change. (3) Every decision is explained: the rule, the policy version, the legal layer where law applies, and a way to appeal. (4) Appeals are independent: a second run with a different model and prompt, then a label task, then a proposal to change the rule. (5) Humans for emergencies and legal process only, logged. (6) Structured content everywhere: no free-form posting; every post type has a schema the community decided in advance covering facts, causes, affected people, scope, lawful options, uncertainty and assumptions; a check holds back wrong assumptions with hints; AI may help fill, the poster confirms.
2. Show a small static diagram (CSS or inline SVG, accessible name, no external asset) of the flow rules -> AI run -> explanation -> appeal -> rule change. Link each section to its doc on github.com via `DocRef`.
3. Add the new claims to docs/claims.md with source paths (06-u01 register); add the route to the nav, layout and the route list in scripts/check-out.mjs.
4. Copy rules: no em dashes or en dashes in any user-facing text; github.com is the only external host; no forms, cookies, analytics or third-party requests; label unbuilt things `Planned`; nothing implies the platform is live or handling real problems; no emergency, legal, medical or government service claims; calm, warm, no hype.
5. Lifecycle v2 (W13): the flow described is prepare privately, volunteer review, then the AI publication decision, then a per-problem stage plan: sections (2) and (3) say the AI applies the rules to the problem before publication (after volunteers have reviewed it, at least one completed review always required), on every edit and plan change, on the evidence each stage submits, and again when rules or facts change. Mention the new decision points by plain name (are the sources trusted, are the acceptance criteria measurable and lawful, is the stage plan well formed, did the evidence meet the criteria) and link /how-it-works for the stages. Update the diagram labels accordingly. Add a sentence that the archive of ended problems is the other main goal and link /archive-and-reuse once 06-u23 exists (a plain text mention until then).

## Acceptance
- /community-policy/ builds, has one h1, every section links its source doc.
- Claims register entries exist for each factual sentence; verify passes.
- No sentence says AI decides alone or that a person approves each item.

## Out of scope
- The legal layer page (06-u20).
- Removing old copy elsewhere (06-u19).
