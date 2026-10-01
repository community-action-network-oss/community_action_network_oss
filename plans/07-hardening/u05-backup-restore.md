---
id: "07-u05"
plan: "07"
title: "Portable Postgres backup and restore scripts and runbook"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 114
depends_on: ["07-u04"]
writes: ["scripts/backup.sh","scripts/restore.sh","scripts/test-restore.sh","docs/runbook-backup-restore.md","package.json"]
reads: ["docker-compose.yml"]
spec: ["docs/spec/16-security-a11y-ops-testing.md", "docs/design/system-design.md#11-operations-notes", "docs/design/components/cross-cutting.md", "docs/spec/01-slice-1-brief.md#9-drafts-fingerprints-and-the-pending-screen"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If pg_dump is not in the container image path, use docker compose exec with the full /usr/bin path; no host-level install is required."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Backups exist and a restore is proven (D-57, hosting is undecided): scripts that work against any Postgres reachable through DATABASE_URL (compose, a VM or a managed instance), a scripted restore into a scratch database, and a runbook that also covers the retention interaction (backups must not resurrect purged drafts forever) and the policy packs (rebuilt from can_policy tags, so only the database is backed up).

## Steps
1. scripts/backup.sh: pg_dump -Fc "$DATABASE_URL" > backups/can-YYYYmmdd-HHMMSS.dump (backups/ in .gitignore); when DATABASE_URL is unset or BACKUP_VIA_COMPOSE=1 it uses docker compose exec -T postgres pg_dump instead (dev only). Prints the path, refuses to run if the database is unreachable, optional BACKUP_KEEP_DAYS pruning default 14. No cloud CLI and no host-specific command.
2. scripts/restore.sh <dump> [target-db]: creates the target database (default can_restore), pg_restore --no-owner into it, runs a sanity query (migrations table current, moderation_run and moderation_decision counts),  never touches the live database unless the user passes --into-live and types the database name.
3. scripts/test-restore.sh (script "test:restore"): seeds if empty, takes a backup, restores into can_restore_test, compares row counts of every table, asserts append-only grants still hold (UPDATE on audit_event, moderation_run content and moderation_decision fails under the restricted role), drops the scratch database.
4. docs/runbook-backup-restore.md: when to back up, how to restore, retention note (a restored backup older than 30 days may contain draft text that the purge job already deleted: run npm run jobs:purge-now after any restore, add that script that calls the purge job functions once with the real clock), after a restore the active policy pack is reloaded from the tagged can_policy version named in the config and its hash is checked by GET /v1/ready (07-u14), then re-moderation is not replayed automatically; what is not covered (offsite copies, encryption at rest of the dump, point-in-time recovery: founder and hosting decisions).
5. Add package.json scripts: backup, restore, test:restore, jobs:purge-now (a tiny node entry under src/ built to dist/ like seed).

## Acceptance
- The restore test passes against compose and fails if a table is missing.
- The runbook states the purge-after-restore step.
- `npm run verify` is green.

## Out of scope
- Offsite storage, encryption of dumps, PITR.
