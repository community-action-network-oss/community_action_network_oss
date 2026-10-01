---
id: "03-u14"
plan: "03"
title: "Retention jobs: draft purge, fingerprints, idle revisions"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 51
depends_on: ["03-u13","03-u04"]
writes: ["src/platform/jobs/**","src/problems/app/retention.ts","src/accounts/app/retention.ts","src/app.module.ts","package.json","package-lock.json","test/retention.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#9-drafts-fingerprints-and-the-pending-screen","docs/design/system-design.md#3-slice-1-erd","docs/spec/constitution/rules.md#DRAFT-TTL-1","docs/open-questions/OQ-draft-ttl.md"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/retention.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Scheduled maintenance as Postgres-driven jobs (no Redis): hard-delete drafts 30 days after the decision, expire fingerprints at 90 days, remind then auto-withdraw idle needs_revision problems, and clean expired sessions and codes.

## Steps
1. Add @nestjs/schedule. src/platform/jobs/job.port.ts: JobPort {run(name, fn)} implemented with a jobs bookkeeping table (name, locked_until, last_run) using SELECT FOR UPDATE SKIP LOCKED so two instances never double run; a Nest Cron registers each job every 15 minutes in non-test environments only (config.jobsEnabled default true outside tests). Each job body is a plain function taking Clock so tests call it directly.
2. purgeDrafts(now): problems in rejected or withdrawn (pre-publication) with purge_after <= now: scrub all content text columns, intake_evidence, kept_flags, version snapshots, set purged_at, clear moderation_decision.revision_hint and spans for the problem (DRAFT-TTL-1 "revision_hint and spans cleared at purge"), keep events (type, states, times only) and moderation decisions and audit; Keep the stub problem row so events and decisions stay referable. Caches: nothing to purge in slice 1; state that in the test name.
3. expireFingerprints(now): delete where expires_at <= now. cleanupAuth(now): delete sessions 30 days past expiry or revoke, login_code 24 hours past expiry or consumption, per the retention table.
4. idleRevisions(now): needs_revision problems idle (updated_at) 23 days: send revisionReminder email once (review_reminder_sent_at); idle 30 days: apply T07 via the engine as actor system, purge_after = now + 30 days.
5. Tests (FixedClock): a rejected draft is intact at day 29, scrubbed at day 31; fingerprints gone at 91 days; reminder sent exactly once at day 23; auto-withdraw at day 30 emits T07 event with actor system; second job instance with the lock held does nothing; jobs are idempotent.

## Acceptance
- DRAFT-TTL-1: nothing of a rejected or withdrawn body remains after 30 days; the deletion date shown earlier equals the actual purge date.
- Jobs are idempotent and locked.
- All time logic is tested with the injected clock, no sleeps.
- `npm run verify` is green.

## Out of scope
- Pause review flags (plan 05).
- Account deletion (open question).
