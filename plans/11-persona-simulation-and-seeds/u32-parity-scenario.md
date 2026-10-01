---
id: "11-u32"
plan: "11"
title: "Parity scenario (G11): same persona content across synthetic jurisdictions and language markers"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 132
depends_on: ["11-u24","11-u02","10-u20"]
writes: ["test/simulation/scenarios/parity/**"]
reads: []
spec: ["docs/design/ai/evaluation.md#sets-per-decision-point","docs/design/ai/simulation.md#6-run-reports-and-metrics","docs/design/ai/simulation.md#8-graduation-criteria-defaults-to-be-ratified"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "Uses fiktiva-city plus two more invented overlays generated in the test (no new real jurisdiction); language markers are invented dialect tags and a second invented-language label, not machine translations."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Measure whether the pipeline treats matched content equally across jurisdictions and languages, as input to the G11 parity bound.

## Steps
1. Build matched sets: the same `sub-careful` and `sub-wellmeaning-wrong` content with different synthetic jurisdiction labels (three overlays) and language markers (three tags, including a right-to-left tag).
2. Run through the pipeline; compute the maximum gap in publish rate and in recall of non-publish expectations between groups, with Wilson bounds; write `report.parity`.
3. Tests: equal outcomes give gap 0; a deliberately biased FakeModel mode yields a gap above the bound and is reported.

## Acceptance
- Matched sets run and the gap is computed with bounds (test).
- A biased double is detected (test).
- `npm run verify` is green.

## Out of scope
- Real language translations.
- Amsterdam-specific parity (needs reviewed overlay).
