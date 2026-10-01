---
id: "15-u11"
plan: "15"
title: "Turn on the Mera adapter (founder gate)"
repo: .
area: can-root
model: sonnet
est_hours: 0.5
priority: 510
depends_on: ["15-u07"]
writes: ["docs/integrations/mera-news.md"]
reads: ["docs/**"]
spec: ["docs/integrations/mera-news.md", "docs/spec/25-news-watch.md#258-simulation-and-graduation", "docs/spec/01-slice-1-brief.md"]
verify: ["node plans/tools/corpus.mjs lint"]
founder_gate: true
defaults: "Not activated: CAN stays on FakeNewsSource and the app badge stays hidden."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The founder turns on real news: after the Mera changes in docs/integrations/mera-news.md section 1 are deployed, and only when `SIM-GATE-1` allows real content.

## Steps
1. Founder deploys the Mera news-api (staging, then prod) and puts `NEWS_SOURCE=mera`, `MERA_NEWS_API_URL` and `MERA_NEWS_API_KEY` in the gitignored `.env` of the target environment.
2. Smoke check against staging: `curl` with the key returns `topicResults` for a test topic; a wrong key returns 401; `GET /health` on CAN shows `newsSource`.
3. Record the date, environment and outcome in docs/integrations/mera-news.md under a new "Activation log" heading. Only then does the orchestrator mark the unit done.

## Acceptance
- The activation log entry exists and the smoke checks passed.

## Out of scope
- Any CAN code change.
