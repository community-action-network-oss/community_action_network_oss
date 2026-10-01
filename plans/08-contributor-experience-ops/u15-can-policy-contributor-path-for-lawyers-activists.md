---
id: "08-u15"
plan: "08"
title: "can_policy contributor path for lawyers, activists and policy experts (no git needed)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.2
priority: 150
depends_on: ["10-u02", "10-u26", "10-u41"]
writes: ["CONTRIBUTING.md", ".github/PULL_REQUEST_TEMPLATE.md", ".github/ISSUE_TEMPLATE/**", "docs/contribute-without-git.md", "docs/contributing-legal-corpus.md"]
spec: ["docs/spec/21-open-source-governance.md", "docs/spec/22-ai-contribution-policy.md", "docs/design/flows/legal-corpus-update.md", "docs/design/ai/legal-stack.md", "docs/open-questions/OQ-policy-pr-rights.md", "docs/open-questions/OQ-legal-policy-reviewers.md", "docs/open-questions/OQ-legal-corpus-sourcing.md", "DECISIONS.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A path into can_policy for people who are not engineers (D-60): lawyers, activists, policy and rights experts can propose rules, examples and legal-corpus corrections without learning git, and know what review and ratification mean.

## Steps
1. Extend CONTRIBUTING.md (10-u26 wrote the policy PR section): add a top section "If you are not an engineer" linking docs/contribute-without-git.md; keep the engineer path below.
2. docs/contribute-without-git.md: step by step with the GitHub web editor (edit a file, propose a change, which folder holds what: rules in packs/base, examples in decision-points, legal corpora in packs/legal/<layer>/<jurisdiction>/), or opening an issue with the issue form so a maintainer drafts the change; what CI will say and how to read it; what ratification means today (interim founder stewardship) and later (panel).
3. docs/contributing-legal-corpus.md: what a legal corpus change needs (official source URL and publisher, retrieval date, version and effective date, language, article text verbatim and never rewritten by an AI, topic index entries, a lawyer review record with qualification and scope, LEGAL-CORPUS-1); how a conflict between layers is reported (held with a conflict note, OQ-legal-layer-conflicts); that a corpus change triggers re-moderation and re-resolution so reviewers should expect notices; no legal advice to individuals; fictional or public material only, no real people.
4. `.github/ISSUE_TEMPLATE/`: forms "Propose a rule", "Report a wrong or missing law or article", "Add a labeled example" with required fields (layer, jurisdiction, source URL, why it matters, what changes), all asking for AI-use disclosure per docs/spec/22-ai-contribution-policy.md. PR template: checklist (provenance, review record or request for a reviewer, examples are fictional, no dashes in user-facing copy).
5. `npm run verify` (lint bans the dash characters in these docs; plain language, no jargon without a gloss).

## Acceptance
- A non-engineer can follow docs/contribute-without-git.md from opening the repo to a proposed change.
- Issue forms and the PR template exist and ask for provenance and AI disclosure.
- `npm run verify` green.

## Out of scope
- Reviewer pool and process (OQ-legal-policy-reviewers).
- Applying GitHub settings (founder action).
