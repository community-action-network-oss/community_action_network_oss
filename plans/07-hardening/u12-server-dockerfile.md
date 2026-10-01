---
id: "07-u12"
plan: "07"
title: "Production Dockerfile for can_server: multi-stage, non-root, healthcheck"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 130
depends_on: ["07-u04"]
writes: ["Dockerfile", ".dockerignore", "scripts/test-image.sh", "package.json"]
spec: ["docs/design/components/cross-cutting.md", "docs/spec/16-security-a11y-ops-testing.md", "docs/design/system-design.md#11-operations-notes"]
needs: ["docker"]
verify: ["npm run verify", "bash scripts/test-image.sh"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A portable production image for can_server (D-57): anywhere Docker runs, the server runs. Nothing is pushed, deployed or provisioned here; hosting stays a founder decision.

## Steps
1. Dockerfile, multi-stage: a build stage (pinned node LTS slim digest or exact tag) runs npm ci and npm run build; a prune step runs npm ci --omit=dev; the runtime stage copies only dist/, drizzle/ (migrations), node_modules (production), package.json and openapi/openapi.json. Run as a non-root user (fixed uid), read-only root filesystem compatible (writes only to /tmp), no dev dependencies, no secrets and no .env baked in (.dockerignore excludes .env*, backups/, node_modules, test/, dist/).
2. HEALTHCHECK calls GET /v1/health (liveness, no dependencies) with a node one-liner (no curl dependency); EXPOSE the configured PORT; CMD runs node dist/main.js; graceful shutdown on SIGTERM must be honoured (enableShutdownHooks in src/main.ts if missing; add it here with a test). Migrations are an explicit separate command (node dist/migrate.js or the existing db:migrate equivalent exposed as a documented entrypoint argument), never run implicitly at start.
3. scripts/test-image.sh (script "test:image", needs docker): builds the image, runs it with a throwaway Postgres on a temp network and a documented minimal env (dev keys, AI_PROVIDER unset so FakeModel), asserts the container user is not root, GET /v1/health is 200, the image contains no .env and no devDependency (npm ls check), docker stop exits 0 within 10 seconds (SIGTERM honoured), then cleans up.
4. Image size and layer notes in a comment at the top of the Dockerfile; label with org.opencontainers.image.source only if the repo URL is known, otherwise omit.

## Acceptance
- docker build succeeds from a clean checkout and the test script passes.
- The container runs as non-root and holds no secrets.
- SIGTERM stops it cleanly.
- `npm run verify` is green.

## Out of scope
- Registry push, CI publishing, orchestrator manifests, TLS (hosting is founder-gated, D-57).
- GET /v1/ready (07-u14) and the env contract (07-u13).
