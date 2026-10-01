---
id: "15-u03"
plan: "15"
title: "Poll jobs: fanout, poll and dedupe"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.3
priority: 502
depends_on: ["15-u02", "09-u05"]
writes: ["src/news/app/jobs/**", "src/news/news.module.ts", "src/app.module.ts", "test/news-poll.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/25-news-watch.md#253-the-loop", "docs/design/flows/background-jobs.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/news-poll.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The three job kinds of spec 25.3 on the 09-u05 queue, minus the DP itself: `news.poll_fanout`, `news.poll_problem`, and enqueuing `news.assess`.

## Steps
1. Register `NewsModule` in `app.module.ts`. When the port is null, register no handlers and no recurring job.
2. `news.poll_fanout`: recurring every `NEWS_POLL_INTERVAL_HOURS` (default 12, config rejects values of 24 or more). Calls `syncWatches()`, then enqueues one `news.poll_problem` per row (async priority class), idempotency key `poll:{problemId}:{window}`.
3. `news.poll_problem`: `findCandidates(watchText, since = last_polled_at or now minus 48 h)`, drop refs whose normalized URL hash is in `news_seen`, `readCandidates` for the rest, insert their hashes, and enqueue `news.assess` for the top `NEWS_MAX_ASSESS_PER_POLL` (default 3) by adapter rank with the article fields in the payload. Set `last_polled_at`; on a failed source call set `last_error` and stop (next poll retries).
4. Purge `news_seen` older than 90 days inside the fanout.
5. `news.assess` handler is a stub that records the payload until 15-u04 lands.
6. E2E with `FakeNewsSource`: an active problem is polled, a paused one is not; the second poll enqueues nothing new for the same articles; at most 3 assess jobs per poll; a scripted source failure sets `last_error` and changes nothing else.

## Acceptance
- No job exists when `NEWS_SOURCE=off` (test).
- `npm run verify` is green.

## Out of scope
- The scheduler tick ownership question (plan 09 risks).
