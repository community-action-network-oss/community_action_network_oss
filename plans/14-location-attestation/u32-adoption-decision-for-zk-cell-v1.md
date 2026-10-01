---
id: "14-u32"
plan: "14"
title: "Adoption decision for zk_cell_v1 (founder gate)"
repo: .
area: can-root
model: sonnet
est_hours: 0.5
priority: 482
depends_on: ["14-u31","14-u28","14-u29","14-u30"]
writes: ["docs/design/location/adoption-decision.md"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#3-candidates","docs/adr/0016-private-location-attestation.md","docs/open-questions/OQ-location-verification.md","docs/open-questions/OQ-impacted-label-web.md"]
verify: ["node plans/tools/corpus.mjs lint"]
founder_gate: true
defaults: "No adoption: slice 1 stays on option C, and every zk unit stays unselected."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The founder decides, from docs/design/location/spike-results.md, whether `zk_cell_v1` is adopted: all four criteria of D-75 must hold (proof at most 3 s median on a mid-range Android browser, at most 20 KB, verify at most 50 ms, and a clean privacy review), and which stack (E1 or E2). All 14-u4x implementation units depend on this unit.

## Steps
1. Founder reads the report and writes `adoption-decision.md`: adopted or not, stack chosen, the date, any condition, and the label wording for web (OQ-impacted-label-web).
2. Only after this file exists does the orchestrator mark the unit done.

## Acceptance
- The decision file exists with an explicit adopt or do-not-adopt.

## Out of scope
- Implementation (14-u40 and later).
