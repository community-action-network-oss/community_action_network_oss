---
id: "14-u28"
plan: "14"
title: "Spike E5b: external privacy review (two reviewers), founder-gated"
repo: .
area: can-root
model: sonnet
est_hours: 0.5
priority: 478
depends_on: ["14-u27"]
writes: ["spikes/zk-cell/e5-privacy/REVIEW-RECORD.md"]
reads: ["spikes/**","docs/design/location/**"]
spec: ["docs/design/location/attestation.md#8-spike-plan","docs/adr/0016-private-location-attestation.md","docs/open-questions/OQ-location-verification.md"]
verify: ["node spikes/zk-cell/check.mjs"]
founder_gate: true
defaults: "If no external reviewers are found, the founder may accept a documented internal review as a temporary substitute; the adoption decision (14-u32) then says so and the proof type stays off by default."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The founder arranges two external reviewers, hands them the package of 14-u27, and records the outcome: names or pseudonyms as they allow, date, findings with severity, and whether any medium or higher finding is open.

## Steps
1. Founder action: send the package, collect written findings.
2. Record the findings and their resolution in `REVIEW-RECORD.md`; an agent may only format the record, never invent findings.

## Acceptance
- Two written reviews are recorded, or the substitution is stated.
- No medium or higher finding is open, or the open ones are listed.

## Out of scope
- Fixing findings (new units if needed).
