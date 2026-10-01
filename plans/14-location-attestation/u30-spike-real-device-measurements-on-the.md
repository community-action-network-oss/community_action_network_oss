---
id: "14-u30"
plan: "14"
title: "Spike: real-device measurements on the reference mid-range Android phone, founder-gated"
repo: .
area: can-root
model: sonnet
est_hours: 1
priority: 480
depends_on: ["14-u21","14-u22","14-u24","14-u25"]
writes: ["spikes/zk-cell/results/device-*.json","spikes/zk-cell/e6-spoof/DEVICE-RESULTS.md"]
reads: ["spikes/**","docs/design/location/**"]
spec: ["docs/design/location/attestation.md#8-spike-plan","docs/adr/0016-private-location-attestation.md","docs/open-questions/OQ-location-verification.md"]
verify: ["node spikes/zk-cell/check.mjs"]
founder_gate: true
defaults: "Without a reference device the adoption decision cannot pass criterion 1; the proof type stays off."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The numbers that decide adoption: E1 and E2 on a real mid-range Android phone (about 3 years old, 4 GB RAM, Chrome) and a low-end 2 GB phone, plus the device spoof cases of E6. Only the founder holds the devices.

## Steps
1. Founder serves the harness page (14-u20 README) and runs E1, E2 and E4 on the phones, and the device cases of E6 (mock-location app, emulator).
2. Paste the result JSON into `results/device-*.json` (provisional: false) and the spoof observations into DEVICE-RESULTS.md.

## Acceptance
- Real device results exist for the reference phone, validated by check.mjs.

## Out of scope
- Interpretation (14-u31 and 14-u32).
