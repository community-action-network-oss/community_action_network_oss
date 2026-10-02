---
id: "08-u07"
plan: "08"
title: "CI workflow for can_gallery"
repo: "can_gallery"
area: "can-root"
model: sonnet
est_hours: 0.75
priority: 70
depends_on: ["08-u04"]
writes: [".github/workflows/ci.yml"]
spec: ["docs/adr/0003-nextjs-static-gallery-site.md","docs/spec/18-phases-gates.md","docs/spec/02-agent-rules.md"]
verify: ["node ../scripts/check-github.mjs .","npm run lint"]
founder_gate: false
defaults: "If package.json has no `verify` script, run `npm run lint && npm run build`."
status: done
attempts: 0
commits: ["dec1d34"]
actual_hours: 0.1
---

## Objective

Run can_gallery verify in CI, plus the accessibility and budget checks once plan 06 adds them.

## Steps

1. Read package.json scripts.
2. Write .github/workflows/ci.yml: push and pull_request, permissions contents read, Node 24, npm cache, `npm ci`, `npm run verify`. Add a job for `npx playwright install --with-deps chromium && npm run a11y && npm run perf` guarded by `if: hashFiles('scripts/a11y.mjs') != ''` so it activates when 06-u08 lands.
3. Add an artifact upload of the out/ directory for reviewers (upload-artifact, 7 days), no deploy.
4. Validate with `node ../scripts/check-github.mjs .`.

## Acceptance

- Workflow passes the structural check; commands match package scripts.
- No deploy step, no secrets.

## Out of scope

- Deploying (plan 06 unit 14 is founder-gated).
- Preview environments.
