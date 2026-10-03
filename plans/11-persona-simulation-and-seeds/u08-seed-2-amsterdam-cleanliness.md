---
id: "11-u08"
plan: "11"
title: "Seed 2 files: Amsterdam city centre cleanliness, synthetic evidence"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 108
depends_on: ["11-u01", "10-u21", "10-u08", "11-u03", "10-u69"]
writes: ["simulation/seeds/seed-2-amsterdam-cleanliness/**"]
reads: []
spec: ["docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/design/flows/seed-bootstrap.md","docs/adr/0011-persona-simulation-proof.md","docs/open-questions/OQ-amsterdam-overlay-review.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "Same as seed 1: everything numeric is invented and marked; no named individual, including no named street resident."
status: done
attempts: 0
commits: ["b488cbb","09eced6"]
actual_hours: null
---
## Objective
Seed 2 as data. Framing, verbatim: "Amsterdam city centre remains dirty despite substantial government cleaning activity and expenditure." Label: "Seed problem, synthetic evidence".

## Steps
1. `seed.yaml` as in 11-u07 with `framing` exactly the sentence above.
2. `problem.json`: condition and scope bounded to the city centre, affected (residents, businesses, visitors), synthetic cleanliness measurements and cost figures as observed facts with sources, `existing_efforts` filled (what institutions already do and spend, synthetic), causal hypotheses untested, responsible roles (roles only), outcome indicator (a synthetic cleanliness index with a before value), assumptions typed (including a deliberate budget-cut assumption for the wellmeaning-wrong variant), out_of_scope, lawful options.
3. `evidence/*.json`: at least 6 synthetic items (cleanliness index table, complaint volume pattern, collection frequency schedule, expenditure table, enforcement statistics, a contradicting item) with metadata as in seed 1.
4. `rubric.yaml`: collection design, enforcement, communications, constraints (operational and legal), cost-effectiveness, measurable outcome.
5. `variants/`: `happy`, `revise`, `appeal` (including a stage resolution appeal), `stuck` (a measure outside the competent body's powers, a `blocked` stage), `plan_change`, `parallel_stages`, `reuse`, `attack_wave` (adv-individual pleading about one resident's waste, adv-spam duplicates); contributions bodies valid for v1 schemas, including a `con-institution` operational constraint and `con-implementer` tasks, and verification evidence with a synthetic before and after index tied to the outcome metric.
6. `npm run verify`.
7. Lifecycle v2 (W13): add `stage_plan.json` (D-72): `measure-baseline`, then in parallel `collection-design` and `enforcement-and-comms`, then `pilot`, then `measure-result`, with criteria per stage and `final_acceptance_criteria[]` tied to the synthetic cleanliness index; `problem.json` carries `sources[]` and a `context_profile` (a city-centre setting with a mid budget band) and the stage evidence items under `evidence/` as for seed 1.

## Acceptance
- The framing equals D-56 seed 2 byte for byte (lint).
- Evidence synthetic and marked; no individual named.
- `npm run verify` green.

## Out of scope
- Seeds 3 and 4 (gated).
- Running.
