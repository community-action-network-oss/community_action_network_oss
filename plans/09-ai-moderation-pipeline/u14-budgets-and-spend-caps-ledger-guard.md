---
id: "09-u14"
plan: "09"
title: "Budgets and spend caps: ledger, guard and alerts"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 243
depends_on: ["09-u08"]
writes: ["src/ai-gateway/app/budget/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/ai-gateway-budget.e2e-spec.ts"]
reads: ["src/ai-gateway/**","src/config.ts"]
spec: ["docs/design/ai/runtime.md#budgets","docs/design/ai/safety-and-privacy.md#spend-caps","docs/open-questions/OQ-model-provider-spend-cap.md","docs/design/ai/triggers.md#backpressure"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/ai-gateway-budget.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Enforce token, latency and cost budgets in the gateway. Reaching a cap sheds work in a fixed order and holds blocking work; it never weakens a check. Live providers refuse to start without a cap; the default is $10 per month (D-65).

## Steps
1. Table spend_ledger (id, day date, jurisdiction_id null, dp_id, run_id, cost_micro_usd, created_at). Daily totals by SUM and monthly totals by SUM over the month; per-DP, per-event, per-jurisdiction and global daily caps plus the app monthly cap `AI_SPEND_CAP_MONTHLY_USD` (default 10, i.e. 10,000,000 micro-USD) from config; defaults in config only, never magic numbers in code. Per-run budgets (record, persona and eval runs) are separate ledger scopes passed by the caller and always sit under the monthly cap.
2. `BudgetGuard.check({dpId, jurisdictionId, estimateMicroUsd})` returns allow or `{deny: "budget_exhausted", shed: "sample" | "remoderation" | "update_lowrisk" | "blocking"}` following the shed order sampling, re-moderation batches, low-risk updates, then hold blocking work. `record(...)` writes the ledger row in the run transaction.
3. Alert levels 50, 80 and 100 percent emitted once per day per cap through an `AlertPort` (log adapter now, no email), idempotent by (cap, level, day).
4. Per-stage token budget uses the prompt-builder counts; latency budget hard timeout from config (45 s default) surfaces `provider_timeout`.
5. A live provider with no cap configured refuses to start: unit test through config validation (the cap check already exists in config; assert it here too). Free-model calls are recorded at cost 0 but still count toward call caps.
6. Tests: exceeding a per-event cap denies the next stage; shed order by class; blocking class gets deny `blocking` which the caller maps to hold; alert thresholds fire once; fake clock day rollover resets daily totals; month rollover resets the monthly total; a per-run budget stops its run at 95 percent.

## Acceptance
- Cap breach yields hold for blocking work and deferral for async work, never a weaker check.
- Alert thresholds are idempotent per day.
- `npm run verify` is green.

## Out of scope
- Routing.
- Cost per accepted result metric (metrics unit).
