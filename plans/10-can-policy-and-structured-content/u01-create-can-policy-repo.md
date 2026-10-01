---
id: "10-u01"
plan: "10"
title: "Create the empty can_policy GitHub repository (founder action)"
repo: "."
area: can-root
model: sonnet
est_hours: 0.3
priority: 1
depends_on: []
writes: []
reads: []
spec: ["docs/adr/0009-can-policy-repo.md","docs/design/components/can-policy.md","docs/design/ai/policy-pack.md"]
verify: ["git ls-remote https://github.com/community-action-network-oss/can_policy.git"]
founder_gate: true
defaults: "If the org name or visibility is in doubt, create the repo under community-action-network-oss as public and note it in the morning review; renaming later is cheap before 10-u02 runs."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The fifth repository exists on GitHub so 10-u02 can wire it as a submodule. This unit is a founder action: creating a GitHub repository needs the founder account, so no agent runs it (ADR 0009).

## Steps
1. In the GitHub organization `community-action-network-oss`, create a repository named exactly `can_policy`. Visibility: public. Initialize with NOTHING: no README, no .gitignore, no license template. 10-u02 pushes the first commit and adds the MIT LICENSE itself.
2. Description to paste: "Community-legislated moderation policy for Community Action Network: versioned policy packs, content schemas, decision-point prompts, labeled examples, evals and ratification records."
3. Give the same maintainers and teams the other four repositories have. Leave branch protection off until 10-u03 lands CI, then require the CI job on `main`.
4. Check from a terminal: `git ls-remote https://github.com/community-action-network-oss/can_policy.git` exits 0 and prints nothing (an empty repository).
5. Create the local bare sibling next to the superproject so relative submodule URLs resolve, exactly as the other submodules do: `git init --bare -b main <parent of superproject>/can_policy.git` (10-u02 documents this, the founder may leave it to the night run).

## Acceptance
- The GitHub repository `community-action-network-oss/can_policy` exists, is public and has zero commits.
- `git ls-remote` on its URL succeeds.

## Out of scope
- Any file in the repository (10-u02).
- LICENSE, CI and branch protection rules (10-u02, 10-u03).
