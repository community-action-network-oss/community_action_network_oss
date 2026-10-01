---
id: "08-u05"
plan: "08"
title: "CI workflow for can_server"
repo: "can_server"
area: "can-root"
model: sonnet
est_hours: 1
priority: 50
depends_on: ["08-u04"]
writes: [".github/workflows/ci.yml"]
spec: ["docs/spec/11-architecture.md","docs/adr/0002-server-owned-openapi.md","docs/spec/02-agent-rules.md"]
verify: ["node ../scripts/check-github.mjs .","npm run lint"]
founder_gate: false
defaults: "Use `npm run verify` on a runner with Docker (compose provides Postgres 16 on port 5433, D-4)."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Run can_server verify in CI: it already starts compose, migrates, lints, builds, tests and checks that openapi/openapi.json is unchanged.

## Steps

1. Read package.json (`verify` script) and docker-compose.yml.
2. Write .github/workflows/ci.yml: push and pull_request, permissions contents read, Node 24, npm cache, `npm ci`, `npm run verify`, then `docker compose down -v` in an always step. Comment: inert until a remote exists.
3. Note in the workflow that a diff in openapi/openapi.json fails the job and means run `npm run openapi` and commit it.
4. Validate with `node ../scripts/check-github.mjs .` and run `npm run lint`.

## Acceptance

- Workflow passes the structural check; its commands are exactly the repo scripts.
- No secrets or write permissions.

## Out of scope

- Release, image build or deploy jobs.
- Coverage services.
