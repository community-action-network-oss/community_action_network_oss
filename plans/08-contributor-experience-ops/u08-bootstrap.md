---
id: "08-u08"
plan: "08"
title: "One-command bootstrap script"
repo: "."
area: "can-root"
model: sonnet
est_hours: 1.5
priority: 80
depends_on: []
writes: ["scripts/bootstrap.sh"]
spec: ["CONTRIBUTING.md","docs/spec/21-open-source-governance.md","DECISIONS.md","docs/spec/16-security-a11y-ops-testing.md"]
verify: ["bash -n scripts/bootstrap.sh","bash scripts/bootstrap.sh --check"]
founder_gate: false
defaults: "Never use sudo and never install system packages; print the exact command a human should run instead."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Reduce local setup to `scripts/bootstrap.sh`, as docs/spec/21 asks for progressively simpler setup, with a safe `--check` mode.

## Steps

1. Write bash with `set -euo pipefail`. Flags: `--check` (report only, change nothing), `--no-docker`, `--help`.
2. Checks: git, Node 24 or newer (engines, D-5), npm, Python 3, Docker and compose (warn only when `--no-docker` or missing, since only can_server needs them). Print found versions and the fix hint per miss. Exit non-zero only for missing git or Node.
3. Actions (skipped under --check): `git submodule update --init`, `npm ci` in can_server, can_app, can_promo_site (skip any that has no package.json), start compose for can_server only when Docker works.
4. Finish by running `scripts/verify-all.sh` only when asked with `--verify`, and by printing next steps: read docs/onboarding/README.md (written by 08-u10) and pick a unit.
5. Idempotent: a second run changes nothing. No network use other than npm and git.

## Acceptance

- `--check` runs on a clean machine and changes no files (verify with `git status --porcelain` before and after).
- Missing Docker never blocks promo or app setup.
- Script passes `bash -n` (and shellcheck if installed).

## Out of scope

- Installing system software.
- Windows support (document WSL).
- Devcontainer (08-u09).
