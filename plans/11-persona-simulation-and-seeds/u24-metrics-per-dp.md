---
id: "11-u24"
plan: "11"
title: "Metrics: per-DP precision and recall, false rejects, revision effectiveness, calibration, parity, cost"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 124
depends_on: ["11-u23","10-u23"]
writes: ["test/simulation/metrics/**"]
reads: []
spec: ["docs/design/ai/simulation.md#6-run-reports-and-metrics","docs/design/ai/evaluation.md","docs/design/ai/simulation.md#8-graduation-criteria-defaults-to-be-ratified"]
needs: []
verify: ["npm run lint","npm run build","npx vitest run test/simulation"]
founder_gate: false
defaults: "Intervals: Wilson 95% (same formula as can_policy tools/lib/metrics.mjs from 10-u23; copy the formula with a test vector in both repos, do not import across repos)."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Compute the metrics the graduation criteria need from the run records and persona expectations, per DP and end to end.

## Steps
1. Inputs: persona step expectations (`expected`) joined to observed decisions by `(persona, step)`; outputs per DP: precision and recall of non-publish decisions on attack personas; false-reject rate on `sub-careful`, `con-expert`, `con-skeptic`; hint quality as share of revisable submissions passing within 2 rounds; confidence calibration (ECE, 10 bins); parity gap across personas run under different synthetic jurisdictions and language markers; disagreement list (persona expectation versus pipeline outcome).
2. Cost: per run, per persona, cost per accepted result (accepted = published after any rounds), cache hit rate; cost comes from the observer feed.
3. Each metric returns `{value, n, lower, upper}` with Wilson bounds where it is a proportion; small samples (n under 20) carry `small_sample: true`.
4. Write into `report.json.metrics` through the report builder; do not compute thresholds here (that is 11-u28).
5. Tests with synthetic record tables: known precision and recall, Wilson vectors shared with can_policy, ECE example, parity gap, small-sample flag, revise-within-2 computation.
6. Lifecycle v2 (W13): the per-DP metric tables include DP-SOURCE-TRUST, DP-CRITERIA, DP-STAGE-PLAN, DP-PUBLISH and DP-STAGE-RESOLUTION (recall of non-publish on the attack personas, false-reject on `sub-careful` and `stg-evidence-strong`, hint quality), and the report lists DP-ARCHIVE, DP-REUSE-FIT and DP-STAGE-DRAFT outcomes from the reuse scenario (11-u49) as counts only (their quality is gated by the archive eval, 13-u19). `vol-nitpick` contributes a metric: share of runs where open low-value recommendations changed the DP-PUBLISH outcome (expected zero).

## Acceptance
- Each metric matches hand-computed values on fixture tables (tests).
- Wilson vectors equal the can_policy implementation's documented vectors (test).
- `npm run verify` is green.

## Out of scope
- Leak and injection counts (11-u25).
- Pass or fail against thresholds (11-u28).
