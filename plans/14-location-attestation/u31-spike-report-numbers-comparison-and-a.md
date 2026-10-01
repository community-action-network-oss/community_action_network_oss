---
id: "14-u31"
plan: "14"
title: "Spike report: numbers, comparison and a recommendation for B or not"
repo: .
area: can-root
model: sonnet
est_hours: 1.2
priority: 481
depends_on: ["14-u21","14-u22","14-u23","14-u24","14-u25","14-u26","14-u27"]
writes: ["docs/design/location/spike-results.md","spikes/zk-cell/REPORT-DATA.json"]
reads: ["spikes/**","docs/design/location/**"]
spec: ["docs/design/location/attestation.md#8-spike-plan","docs/adr/0016-private-location-attestation.md","docs/open-questions/OQ-location-verification.md"]
verify: ["node spikes/zk-cell/check.mjs"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A single document the founder reads: a table of measured numbers per experiment and device profile (provisional or real), the pass or fail of each adoption criterion, the E1 versus E2 comparison, whether option A stays parked, residual risks, and a recommendation. It states which numbers are still missing (real device, external review, native).

## Steps
1. Aggregate the result files through a script `spikes/zk-cell/report.mjs` into REPORT-DATA.json and a markdown table; write `docs/design/location/spike-results.md` (at most 25 KB) with sections: summary, numbers, criteria table (the four of design section 3 plus the privacy review), comparison, parked A, residual risks, missing evidence, recommendation (adopt B with E1 or E2, stay on C, or revisit later) with the reasons.
2. Add the file to the doc index of docs/design/location if one exists; do not edit the design doc itself; any contradiction with attestation.md is listed as a question, not silently changed.

## Acceptance
- Every criterion row says met, not met or not assessable, with the source file.
- Provisional numbers are labelled.
- `node plans/tools/corpus.mjs lint` is green.

## Out of scope
- The decision (14-u32).
