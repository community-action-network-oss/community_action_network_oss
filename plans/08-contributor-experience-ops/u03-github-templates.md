---
id: "08-u03"
plan: "08"
title: "GitHub issue templates, PR template and labels config (files only)"
repo: "."
area: "can-root"
model: sonnet
est_hours: 1.5
priority: 30
depends_on: []
writes: [".github/ISSUE_TEMPLATE/**",".github/PULL_REQUEST_TEMPLATE.md",".github/labels.yml",".github/CODEOWNERS",".github/README.md","scripts/check-github.mjs"]
spec: ["docs/spec/22-ai-contribution-policy.md","docs/spec/21-open-source-governance.md","docs/open-questions/README.md","SECURITY.md","CONTRIBUTING.md"]
verify: ["node scripts/check-github.mjs"]
founder_gate: false
defaults: "No contact_links in config.yml until the remote exists; CODEOWNERS contains commented placeholders only."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Encode the contribution process as files: how to claim a unit, how to propose an answer to an open question, what a pull request must say, and the label set. Nothing is applied to any GitHub account.

## Steps

1. Issue forms in .github/ISSUE_TEMPLATE: task-claim.yml (unit id, repo, what I will do, how I will verify), open-question-proposal.yml (OQ id, proposal, evidence, risks), bug.yml (what happened, expected, fictional or real data warning: never paste personal data), docs-fix.yml. config.yml sets blank_issues_enabled: false and tells security reporters to follow SECURITY.md (no public issue).
2. .github/PULL_REQUEST_TEMPLATE.md: unit id, what changed and why, verify output pasted, checklist (tests, accessibility, no em or en dashes in user-facing copy, no generated files hand-edited), AI disclosure block (tool, model if known, how used, what I verified, what I am unsure of, per docs/spec/22), and a statement that I can explain the change in my own words.
3. .github/labels.yml: type (bug, task, docs, question), area (can-spec, can-root, can-server, can-app, can-promo-site), risk (low, high-review-required for auth, privacy, moderation, identity, protocol, migrations, constitution), status (needs-triage, blocked, founder-decision), good-first, needs-context, ai-assisted. Each with color and description.
4. .github/CODEOWNERS with commented placeholders and the high-risk paths listed; .github/README.md for a founder: how to apply labels (`gh label` commands, not run), enable branch protection, require the CI checks from the workflow files, and a warning that nothing here is active until pushed.
5. Write scripts/check-github.mjs `[repoDir ...]` (default `.`): validates issue forms have name, description and body, labels.yml lines parse, PR template has the AI disclosure heading, and any .github/workflows file has `permissions:`, no `pull_request_target`, no `secrets.` reference, no `curl | sh`. Dependency-free regex checks only.

## Acceptance

- check-github passes and fails when a rule is broken (add a small self-test with a temp fixture).
- Templates mention fictional data and the private security route.
- No label or setting is applied.

## Out of scope

- Applying anything to GitHub.
- Workflows (08-u04 to 08-u07).
- Discussions or project board setup.
