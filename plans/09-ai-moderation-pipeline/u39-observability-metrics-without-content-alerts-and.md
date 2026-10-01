---
id: "09-u39"
plan: "09"
title: "Observability: metrics without content, alerts and cost per accepted result"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.3
priority: 268
depends_on: ["09-u22"]
writes: ["src/platform/metrics/**","src/moderation/app/metrics.ts","src/app.module.ts","src/db/schema.ts","drizzle/**","test/moderation-metrics.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/runtime.md#observability","docs/design/ai/safety-and-privacy.md#spend-caps","docs/design/components/cross-cutting.md","docs/design/ai/evaluation.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-metrics.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Record decisions per outcome, DP and policy version, confidence histogram, escalation and hold rates by reason, flips, appeal overturn rate, cache hit rate, tokens, latency percentiles, cost per accepted result, canary trips, schema failures, budget breaches, queue depth and age. No content in labels; jurisdiction and DP are the dimensions.

## Steps
1. src/platform/metrics: a tiny in-process registry (counter, histogram, gauge) with a Prometheus text exposition at GET /v1/internal/metrics, disabled unless `config.metricsEnabled`, and guarded by a static bearer token from env; a test asserts label values are drawn from closed sets (outcome, dp id, hold reason, jurisdiction id, model id) and never from user text.
2. Hook the recorder, queue, budget, router and applier through the interfaces created in earlier units (`onClaimed`, run completion event). `cost per accepted result` is computed by SQL: accepted = a decision not overturned on appeal and not flipped by the next version; expose as a gauge job `computeAcceptedCost(now)`.
3. Alert rules as data (docs-free): hold rate spike, overturn spike, cost per accepted result regression, canary trip, expressed as a typed list in src/moderation/app/alerts.ts with thresholds from config and an evaluator that emits through AlertPort (log adapter). Unit test the evaluator with synthetic series.
4. Logs carry run ids, outcome codes and counts only: add a logging test that a full run produces no log line containing the fixture canary or any field text.
5. Tests: metrics exposition after a fixture run; closed label sets; accepted-cost SQL with an overturned fixture; alert evaluator cases.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- No metric label or log line contains user text (test with canary).
- Cost per accepted result is computable and tested.
- openapi/openapi.json regenerated if the internal route is documented, else a test asserts it is excluded from the contract; `npm run verify` is green.

## Out of scope
- Dashboards, hosting of Prometheus.
