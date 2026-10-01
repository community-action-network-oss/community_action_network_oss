---
id: "15-u06"
plan: "15"
title: "Limits, spend cap deferral and eval fixtures"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 505
depends_on: ["15-u05", "09-u14"]
writes: ["src/news/app/**", "test/fixtures/evals/news-relevance/**", "test/news-limits.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/25-news-watch.md#257-limits-and-cost", "docs/design/flows/background-jobs.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/news-limits.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Bound noise and cost: at most one filed contribution per problem per day, and `news.assess` deferred, never dropped, when the spend cap is reached.

## Steps
1. `NEWS_MAX_FILED_PER_DAY` (default 1, later a pack value): once reached, further evidence verdicts that day are recorded on the run as `context` with reason `daily_cap`.
2. Before a model call, ask the spend guard (09-u14); at the cap, reschedule `news.assess` to the next budget window with the job's backoff, and count deferrals in metrics (no content in metrics).
3. Eval set: 20 synthetic labelled (problem, article) pairs across the four verdicts and two languages, in the format 09-u68 reads, so the register can pick a model for this DP.
4. E2E: two evidence verdicts on one day file one contribution; at the cap the job is deferred and runs after the window.

## Acceptance
- Nothing is dropped silently at the cap (test).
- `npm run verify` is green.

## Out of scope
- Choosing the live model (09-u68 does it from the eval set).
