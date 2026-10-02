---
id: "08-u04"
plan: "08"
title: "CI workflow for the superproject"
repo: "."
area: "can-root"
model: sonnet
est_hours: 1
priority: 40
depends_on: ["08-u02","08-u03"]
writes: [".github/workflows/ci.yml","scripts/check-github.mjs"]
spec: ["docs/spec/02-agent-rules.md","docs/spec/21-open-source-governance.md","docs/spec/16-security-a11y-ops-testing.md","CONTRIBUTING.md"]
verify: ["node scripts/check-github.mjs","node plans/tools/corpus.mjs lint","node plans/tools/test/run.mjs","node scripts/sync-good-first.mjs --check"]
founder_gate: false
defaults: "Check out submodules recursively with a note about same-owner relative URLs; if they cannot resolve, the root jobs still run."
status: done
attempts: 0
commits: ["2ea1b59"]
actual_hours: 0.1
---

## Objective

Root CI mirrors scripts/verify-all.sh for everything that is not a submodule: corpus lint and tests, the good-first index check, the spec, constitution and design checks. Committed; runs on GitHub once merged.

## Steps

1. Read scripts/verify-all.sh and reuse exactly its non-submodule commands (corpus lint, spec check if present, constitution check, `python3 docs/design/check.py`, `node docs/design/ux/tokens.build.mjs` in check mode if it has one).
2. Write .github/workflows/ci.yml: triggers push to main and pull_request; permissions contents read; concurrency cancel-in-progress; Node 24 and Python 3 setup; jobs corpus, spec-docs, design. A top comment states it runs on GitHub once merged.
3. Add a dash check: fail on U+2014 or U+2013 in files changed under docs/, README.md, CONTRIBUTING.md (grep step, quoted codepoints).
4. Extend scripts/check-github.mjs to verify the workflow commands exist as files or scripts in the repo.
5. Run each command locally and confirm green.

## Acceptance

- The workflow file passes check-github and every command in it passes locally.
- No secrets, no write permissions.

## Out of scope

- Submodule CI (08-u05 to 08-u07).
- Deployment or release jobs.
- Required-check configuration on the host.
