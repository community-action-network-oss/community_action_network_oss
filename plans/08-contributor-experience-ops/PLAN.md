---
id: "08"
title: "Contributor experience and operations"
approved: true
status: "todo"
depends_on_plans: []
spec: ["docs/spec/21-open-source-governance.md","docs/spec/22-ai-contribution-policy.md","docs/spec/02-agent-rules.md","DECISIONS.md","plans/FORMAT.md"]
---

# Plan 08: Contributor experience and operations

## Goal

Make the repositories ready for a stranger and for an overnight agent: issue and pull request templates, CI workflows for every repo (committed, inert until a remote exists), a one-command bootstrap and devcontainer, a generated good-first-units index, a short onboarding tour, a night-run report template, dependency and release policies, and the founder-gated activation of the proposed agent settings.

## Acceptance

- A new contributor can go from clone to green verify with one command and a short tour.
- Every repo has a CI workflow that runs its verify; none runs until a remote exists.
- The corpus tool can emit a catalog that both the promo site and the good-first index consume.
- Nothing is applied to GitHub, no secret is referenced, nothing is pushed or deployed.

## Units

Total estimate: 14.5 hours across 14 units. Gated units are never selected by `corpus.mjs next`.

| Unit | Title | Repo | Hours | Needs units | Founder gate |
|---|---|---|---|---|---|
| 08-u01 | corpus.mjs catalog command and optional tags field | . | 1.5 | none | no |
| 08-u02 | Good-first-units index generated from plans | . | 1 | 1 | no |
| 08-u03 | GitHub issue templates, PR template and labels config (files only) | . | 1.5 | none | no |
| 08-u04 | CI workflow for the superproject | . | 1 | 2, 3 | no |
| 08-u05 | CI workflow for can_server | can_server | 1 | 4 | no |
| 08-u06 | CI workflow for can_app | can_app | 0.75 | 4 | no |
| 08-u07 | CI workflow for can_promo_site | can_promo_site | 0.75 | 4 | no |
| 08-u08 | One-command bootstrap script | . | 1.5 | none | no |
| 08-u09 | Devcontainer configuration | . | 0.75 | 8 | no |
| 08-u10 | docs/onboarding tour for new contributors | . | 1.5 | 2, 3, 8 | no |
| 08-u11 | Night-run report template | . | 0.5 | none | no |
| 08-u12 | Dependency update policy | . | 1 | none | no |
| 08-u13 | Release and versioning policy | . | 1 | none | no |
| 08-u14 | Activation checklist for .claude/settings.proposed.json | . | 0.75 | none | yes |

## Conventions

- Unit order within lane "." matters: 08-u01 (catalog command) first; 08-u03 creates scripts/check-github.mjs which later CI units extend.
- Files only: GitHub settings, labels, branch protection and Actions enablement are applied by a founder after a remote exists (see .github/README.md written by 08-u03).
- Workflows use `permissions: contents: read`, never `pull_request_target`, never reference secrets, and pin actions to a major version with a comment saying to pin to a commit SHA once online (policy in 08-u12).
- Docs files stay at 25 KB or less and use no em or en dashes.
- Optional unit frontmatter field `tags` (added in 08-u01) marks units for humans: `good-first`, `needs-context`, `design`, `a11y`, `docs`, `research`, `policy`, `translation`.

## Risks

- CI files cannot be run locally; each unit validates structure with scripts/check-github.mjs and runs the same commands locally.
- Submodule relative URLs only resolve on a host when every repo is pushed under the same owner (D-2).
- A large catalog or index could pass 25 KB; scripts truncate with a pointer to the JSON.
