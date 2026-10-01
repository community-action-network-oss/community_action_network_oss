---
id: "14-u29"
plan: "14"
title: "Spike E7: native App Attest and Play Integrity round trips on devices, founder-gated"
repo: .
area: can-root
model: sonnet
est_hours: 1
priority: 479
depends_on: ["14-u09","14-u10"]
writes: ["spikes/zk-cell/e7-native/**"]
reads: ["spikes/**","docs/design/location/**"]
spec: ["docs/design/location/attestation.md#8-spike-plan","docs/adr/0016-private-location-attestation.md","docs/open-questions/OQ-location-verification.md"]
verify: ["node spikes/zk-cell/check.mjs"]
founder_gate: true
defaults: "If devices or developer accounts are unavailable, native stays bundle-only for slice 1 (the design fail action for E7)."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Needs a test build on an iPhone and an Android phone and a device without Play services, plus Apple and Google developer configuration, so it cannot run in a night run.

## Steps
1. Founder runs the checklist in `e7-native/CHECKLIST.md` (an agent may write it): round trip on each device, verdict handling on success, failure and absence.
2. Record results; an absent verdict must map to guest with no error.

## Acceptance
- Results for each device class are recorded.
- Absent verdict maps to guest (observed).

## Out of scope
- Anything beyond recording.
