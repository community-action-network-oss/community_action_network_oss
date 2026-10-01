---
id: "09-u05"
plan: "09"
title: "Postgres payload job queue with priority classes and backoff"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 234
depends_on: ["02-u03"]
writes: ["src/platform/queue/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/queue.e2e-spec.ts"]
reads: ["src/platform/**"]
spec: ["docs/design/flows/background-jobs.md","docs/design/ai/triggers.md#backpressure","docs/design/ai/triggers.md#ordering-and-concurrency","docs/design/components/cross-cutting.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/queue.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A job queue for moderation work: payload rows claimed with FOR UPDATE SKIP LOCKED, leases, retry with backoff, a dead state, and priority classes so DP-CRISIS and pre-publication work runs before updates, then post-publication, then sampling. No queue service.

## Steps
1. Write ONLY under src/platform/queue/** (03-u14 owns src/platform/jobs/** and builds a cron lock table; do not touch it). `docs/design/flows/background-jobs.md` intends one runner, so export `QueuePort` such that 03-u14 can later be rebased onto it; say so in the commit message.
2. Table job (id uuid v7, queue text, class text CHECK in crisis|prepub|update|async|sample, priority int, payload jsonb, run_at, status queued|running|done|dead, attempt int, max_attempts int default 5, lease_until, last_error_code text, dedupe_key text unique where status in (queued,running), created_at). Migration via db:generate. last_error_code is a code, never a message with content.
3. QueuePort: `enqueue({queue,class,payload,dedupeKey,runAt})` idempotent by dedupe_key; `claim(queue, n, now)` ordered by class rank, priority, run_at using SKIP LOCKED with a lease; `ack`, `fail(code)` exponential backoff capped at 15 minutes with jitter from an injected Random; after max_attempts the job is dead and an audit event `job.dead` is written.
4. Starvation guard: `claim` takes at least `asyncMinShare` (config, default 0.2) of each batch from classes async and sample when they are waiting. Per-class token bucket in `src/platform/queue/bucket.ts` (pure, injected Clock) used later by re-moderation batches.
5. Worker loop `QueueWorker` with handler registry `register(queue, handler)`, concurrency from config, graceful stop on SIGTERM, disabled when `config.jobsEnabled` is false (tests call `drain(queue)` directly). Metrics hook interface only (`onClaimed`, `onDead`).
6. Tests (e2e): two workers never run the same job; crash lease expiry makes it claimable again; backoff schedule with fake clock; dedupe; priority order crisis before sample; starvation guard lets async work through under a flood of prepub jobs; dead state and audit event.

## Acceptance
- SKIP LOCKED claim, lease and backoff are tested with a fake clock.
- Priority order and the async minimum share are tested.
- No file under src/platform/jobs/** is changed.
- `npm run verify` is green.

## Out of scope
- Enqueuing from domain events (relay unit).
- Cron schedules and retention (03-u14).
