---
id: "15-u07"
plan: "15"
title: "E2E: news watch on FakeNewsSource and FakeModel"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.3
priority: 506
depends_on: ["15-u06"]
writes: ["test/news-watch.e2e-spec.ts", "test/fixtures/news/**"]
reads: ["src/**"]
spec: ["docs/spec/25-news-watch.md", "docs/integrations/mera-news.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/news-watch.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
One end-to-end proof of plan 15 on fakes, and the no-dependency proof.

## Steps
1. Seed an active problem with a two-stage plan, set `NEWS_SOURCE=fake`, run `news.poll_fanout` and drain the queue.
2. Assert: at most 3 assessments; one evidence contribution by `news_watch` with only the spec 25.4 fields; contribution moderation ran; a `context_change` re-check was queued; `DP-STAGE-RESOLUTION` is what resolves the stage when the fixture evidence meets the criterion, and nothing in `src/news/**` wrote that state.
3. Same seed with a paused problem: no poll.
4. With `NEWS_SOURCE` unset: the whole server e2e suite passes and the queue holds no news job.
5. A static check in the test: `grep -ril mera src` lists only files under `src/news/infra/mera/` and `src/config.ts`.

## Acceptance
- All assertions above pass on FakeModel with no network.
- `npm run verify` is green.

## Out of scope
- The live adapter (15-u11).
