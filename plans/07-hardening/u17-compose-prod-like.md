---
id: "07-u17"
plan: "07"
title: "Compose prod-like profile: all images together, nothing deployed"
repo: "."
area: can-root
model: sonnet
est_hours: 1.2
priority: 135
depends_on: ["07-u12", "07-u13", "07-u14", "07-u15", "07-u16"]
writes: ["compose.prod-like.yml", "scripts/prod-like.sh", "scripts/verify-all.sh", "docs/runbook-prod-like.md", "README.md"]
spec: ["docs/design/components/cross-cutting.md", "docs/spec/16-security-a11y-ops-testing.md", "docs/design/system-design.md#11-operations-notes"]
needs: ["docker"]
verify: ["bash scripts/prod-like.sh --check"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Prove the images work together without deploying anything (D-57): one compose file with a prod-like profile that runs Postgres, the server image, the app web image, the gallery image and Mailpit, wired only through environment variables and health checks. It is a local rehearsal, not a hosting recommendation.

## Steps
1. compose.prod-like.yml at the superproject root (never replaces can_server/docker-compose.yml, which stays the dev stack): services postgres (pinned image, named volume, healthcheck), migrate (one-shot: the server image with the explicit migrate entrypoint, depends_on postgres healthy), server (depends_on migrate completed, healthcheck GET /v1/health, readiness waited on via GET /v1/ready), app (07-u15 image), gallery (07-u16 image), mailpit (dev mail catcher, profile prod-like only to rehearse the SMTP port; real mail stays founder-gated). Images are built from each repo's Dockerfile; no volume mounts of source; each service reads only its documented variables from a root .env.prod-like.example copied to .env.prod-like (never committed).
2. scripts/prod-like.sh: subcommands up, down, check, logs. check runs node can_server/scripts/check-env.mjs against the env file (07-u13), builds, starts, waits for /v1/ready 200 on the server (AI_PROVIDER stays fake: the script refuses to start when ANTHROPIC_API_KEY or OPEN_ROUTER_KEY is set unless --allow-live is passed, and prints that real member data to a live provider is founder-gated), fetches the app and gallery home pages, checks that the app html names the server origin, runs the can_server backup and restore script test (07-u05) against the compose database, then tears down and removes volumes. Exits non-zero on any failure and always cleans up (trap).
3. Wire it as an optional gate in scripts/verify-all.sh (flag --prod-like, off by default, skipped with a clear message when docker is missing). Add a short section to the root README listing the commands and stating that nothing here deploys or provisions anything.
4. docs/runbook-prod-like.md: how to run the rehearsal, the port map, how it maps to a real host (images plus env contract plus Postgres plus backup), and what is explicitly not covered (TLS, domains, scaling, secret managers, registry, live AI key).

## Acceptance
- bash scripts/prod-like.sh check passes on a machine with Docker and fails when a service is unhealthy.
- No image contains a secret and the profile starts with the FakeModel only.
- Nothing is pushed, deployed or provisioned.
- verify-all.sh keeps working without docker.

## Out of scope
- Deployment, registries, TLS, domains, cloud accounts (founder-gated, D-57).
- Kubernetes or other orchestrator manifests.
