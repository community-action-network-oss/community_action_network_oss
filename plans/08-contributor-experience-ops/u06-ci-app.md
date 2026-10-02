---
id: "08-u06"
plan: "08"
title: "CI workflow for can_app"
repo: "can_app"
area: "can-root"
model: sonnet
est_hours: 0.75
priority: 60
depends_on: ["08-u04"]
writes: [".github/workflows/ci.yml"]
spec: ["docs/spec/11-architecture.md","docs/adr/0005-web-first-verification.md"]
verify: ["node ../scripts/check-github.mjs .","npm run typecheck"]
founder_gate: false
status: done
attempts: 0
commits: ["a2e6cd3"]
actual_hours: 0.1
---

## Objective

Run can_app verify in CI. Per D-8 only web is verified and native builds only need to bundle.

## Steps

1. Read package.json: `verify` runs typecheck, lint, prettier, the logical-properties check, jest and a web export.
2. Write .github/workflows/ci.yml: push and pull_request, permissions contents read, Node 24, npm cache, `npm ci`, `npm run verify`. Add a second job that runs `npx expo export --platform ios --output-dir /tmp/ios-bundle` marked continue-on-error: false only if it passes locally in under five minutes, otherwise leave it as a commented job.
3. Note: the generated API client depends on can_server openapi; CI uses the committed copy.
4. Validate with `node ../scripts/check-github.mjs .`.

## Acceptance

- Workflow passes the structural check; commands match package scripts.
- No secrets or write permissions.

## Out of scope

- Device builds, EAS or store jobs.
- Screenshots.
