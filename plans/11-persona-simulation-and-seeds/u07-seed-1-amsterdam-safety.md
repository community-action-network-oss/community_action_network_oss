---
id: "11-u07"
plan: "11"
title: "Seed 1 files: Amsterdam public safety, synthetic evidence"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 107
depends_on: ["11-u01", "10-u21", "10-u08", "11-u03", "10-u69"]
writes: ["simulation/seeds/seed-1-amsterdam-safety/**"]
reads: []
spec: ["docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/design/flows/seed-bootstrap.md","docs/adr/0011-persona-simulation-proof.md","docs/open-questions/OQ-amsterdam-overlay-review.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "Evidence is synthetic: invented incident categories, invented counts and dates, marked on every item; the overlay it runs against may be the unreviewed skeleton (OQ-amsterdam-overlay-review), in which case the report states that."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Seed 1: the real framing with synthetic evidence, as data a loader and the harness consume (D-56). Framing, verbatim: "Amsterdam residents face recurring explosions and violent incidents that may reduce actual and perceived public safety." Label shown on the problem: "Seed problem, synthetic evidence".

## Steps
1. `seed.yaml` per 11-u01 (`id: seed-1-amsterdam-safety`, `number: 1`, `framing` exactly the sentence above, jurisdiction `NL-AMSTERDAM`, label const, personas list).
2. `problem.json`: a v1 `problem` body: condition equal to or built on the framing, affected groups (residents, businesses, visitors, emergency responders as groups), place coarse (Amsterdam, districts by name only), since and trend (synthetic), observed facts and uncertain claims (each with a synthetic source), evidence refs, a causal hypothesis marked `untested`, scope, responsible roles (roles only, for example "the municipal department for public safety", "the public prosecution service", never a person), desired outcome with a measurable indicator, assumptions typed, out_of_scope, lawful options. No individual is named; nothing refers to a real incident.
3. `evidence/*.json`: at least 6 synthetic items (incident-pattern table, perceived-safety survey summary, response-time table, prevention programme budget, a retrieved-style public statement placeholder clearly marked as retrieved not verified, and a contradicting synthetic item) each `{id, url: https://evidence.sim.test/seed-1/<id>, description, synthetic: true, tier_cap, metadata{publisher_role, date, kind}}`.
4. `rubric.yaml` (expected.yaml): the decomposition the contributions must collectively cover: incident categories, patterns, affected groups, hypotheses, prevention, constraints (policing and justice competences), civil liberties, evidence quality, institutional responsibilities, measurable outcomes; used as the completeness rubric by the report.
5. `variants/`: `happy`, `revise` (the wellmeaning-wrong submission variant steered by DP-ASSUMPTIONS), `appeal` (including a stage resolution appeal), `stuck` (an option the overlay blocks, so a stage is `blocked`), `plan_change` (a proposal after publication that adds a stage), `parallel_stages`, `reuse` (the run that ends in an archive record for 11-u48), `attack_wave` (adv-doxx attaches a named suspect and street address, using canaries), each a list of persona script references and parameter bindings. Contributor content for each variant (observation, root_cause hypotheses, constraint, stakeholder_perspective, proposals) is written as `variants/<name>/contributions/*.json` bodies valid for the v1 schemas.
6. `npm run verify` (seed lint compares framing byte for byte).
7. Lifecycle v2 (W13): add `stage_plan.json` (D-72): `understand-incidents` in parallel with `map-competences`, both feeding `design-prevention`, then `implement-pilot`, then `measure-outcome`, each stage with a goal, a decision method (default `poster_after_input`) and at least one measurable criterion, and `final_acceptance_criteria[]` in `problem.json`; `problem.json` also carries `sources[]` (synthetic, host `evidence.sim.test`, trusted category, authenticity note) and a `context_profile` with declared resource and budget bands for the Amsterdam setting. `affected_area` is a synthetic polygon reference only. Stage evidence items per stage go under `evidence/` with `stage` and `criterion` keys (met and not-met variants for stg-evidence-strong and stg-evidence-weak). The rubric adds one item per stage criterion.

## Acceptance
- The framing sentence equals D-56 seed 1 byte for byte (lint).
- Every evidence item is synthetic, marked and under the fake domain.
- All five variants exist with bodies valid for the v1 schemas.
- `npm run verify` green.

## Out of scope
- Loading and running (can_server units).
- Legal accuracy of the overlay (10-u22).
