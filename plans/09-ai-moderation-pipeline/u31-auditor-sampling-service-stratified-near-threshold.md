---
id: "09-u31"
plan: "09"
title: "Auditor sampling service: stratified, near-threshold, sample_tick"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 260
depends_on: ["09-u30","09-u07"]
writes: ["src/review/app/sampler.ts","src/review/infra/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/audit-sampler.e2e-spec.ts"]
reads: ["src/moderation/**"]
spec: ["docs/design/ai/triggers.md#3-post-publication-async","docs/design/ai/amendment-loop.md","docs/design/ai/README.md","docs/design/ai/evaluation.md","docs/design/ux/wireframes/moderation.md#WF-AUDIT-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/audit-sampler.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Pick decisions for human audit: stratified random sample per DP and jurisdiction at a pack-set rate, plus all decisions near a threshold, on `sample_tick`. Samples feed auditors and the flip and disagreement metrics even when policy did not change.

## Steps
1. Table audit_sample (id, review_ref unique, decision_id, run_id, dp_id, jurisdiction_id, reason random|near_threshold|appeal_candidate|lane_followup, created_at, closed_at). Rate and margin from pack values (`sampling.rate`, `sampling.near_threshold_margin`); no numbers in code. Migration via db:generate.
2. Handler for sample_tick jobs (the relay already emits them; add a scheduled tick producer in the queue worker config, off in tests): stratified draw with an injected Random, excludes decisions already sampled, skips unmaskable ones (mask unit), caps per day by config.
3. Near-threshold rule: confidence within the margin of the DP floor. Also called by the appeal unit to mark a candidate example (reason appeal_candidate) and by lane for followup.
4. Async class jobs; under spend pressure sampling is shed first (queue/budget unit order).
5. Tests: deterministic draw with a seeded Random; stratification covers each DP and jurisdiction; near-threshold always included; duplicates excluded; shed under cap.

## Acceptance
- Stratified and near-threshold selection tested with a seeded Random.
- No sampled item is unmaskable.
- `npm run verify` is green.

## Out of scope
- Reviewer endpoints (next unit).
