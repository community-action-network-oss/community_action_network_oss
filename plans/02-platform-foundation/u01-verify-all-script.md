---
id: "02-u01"
plan: "02"
title: "Extend verify-all.sh with flags and missing gates"
repo: "."
area: can-root
model: sonnet
est_hours: 1
priority: 5
depends_on: []
writes: ["scripts/verify-all.sh"]
reads: ["plans/tools/**","docs/design/check.py","scripts/verify-all.sh"]
spec: ["docs/spec/01-slice-1-brief.md","docs/spec/02-agent-rules.md","docs/design/system-design.md#10-web-first-verification"]
needs: []
verify: ["bash -n scripts/verify-all.sh","bash scripts/verify-all.sh --docs-only"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
scripts/verify-all.sh already exists (W1 P1: runs each submodule verify plus corpus lint, constitution and design checks). Extend it, do not rewrite it, so a contributor or agent can prove a change is green with one command, including a docs-only mode and the gates it lacks. No CI service is configured (founder-gated).

## Steps
1. Read the existing scripts/verify-all.sh first and keep its run() helper, pass, fail and skip summary and exit behaviour.
2. Add flags: --docs-only runs only the non-submodule checks (no docker, no npm); --e2e is reserved: it prints "e2e: not wired yet (plan 07-u08)" and does not fail; no flag keeps today default behaviour plus the new gates below.
3. Add the missing doc and plan gates: node plans/tools/test/run.mjs; node docs/design/ux/tokens.build.mjs then git diff --exit-code on its outputs (use git -C with the repo root); node docs/spec/constitution/tools/map-check.mjs.
4. Add the code gates that are missing, skipped with a SKIP line when prerequisites are absent: docker compose up -d --wait for can_server (use docker compose -f can_server/docker-compose.yml) before the can_server verify when docker exists; a native bundle proof for can_app (npx --prefix can_app expo export --platform ios --output-dir "$(mktemp -d)", JS only, D-8) after can_app verify.
5. Do not use cd; use absolute paths from the script location, npm --prefix and git -C. Run every gate even when one fails and exit non-zero at the end.

## Acceptance
- `bash scripts/verify-all.sh --docs-only` runs the doc and plan checks only and exits 0 on a clean tree.
- Existing behaviour and summary format are unchanged for the default run.
- A failing gate is named in the FAIL list and does not stop later gates (try a temporary typo in a scratch copy of the script, do not commit it).

## Out of scope
- Hosted CI (plan 08 owns the inert CI file).
- The e2e gate (07-u08).
