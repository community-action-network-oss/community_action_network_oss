---
id: "11-u50"
plan: "11"
title: "Location scenarios: impacted and guest personas, local, travelling and outside brigade"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.2
priority: 150
depends_on: ["14-u11","14-u14","11-u16","11-u47","11-u05"]
writes: ["test/simulation/scenarios/location/**","test/simulation/scenarios/index.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/simulation.md","docs/design/location/attestation.md#4-anti-spoofing-signals-not-identity","docs/spec/constitution/rules-legal-sim.md#IMPACT-1","docs/spec/constitution/rules-legal-sim.md#GUEST-LABEL-1","docs/spec/constitution/rules-legal-sim.md#LOC-DOUBT-1"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Prove the D-73 properties with personas and no device: the label is per message, never changes a moderation outcome, a brigade from outside floods nothing, and no location data exists anywhere.

## Steps
1. Declare `location` on existing personas through the scenario bindings (no new persona files): `con-resident` inside, a travelling contributor outside for one message and inside for another, `adv-brigade` accounts outside; the driver attaches the test attestation of 14-u11 (never a coordinate).
2. Assert: the same account is `impacted` for one message and `guest` for another; identical content sent as impacted and as guest gets the same DP outcomes (parity check on the run records); `impactedOnly` hides guests and the counts match; a brigade of outside accounts raises the per-area surge downgrade without any restriction or reputation row (LOC-DOUBT-1); no persona-visible API or log contains a location-like value (the leak checker of 11-u25 scans them).
3. Add `report.location {impacted, guest, surge_downgrades}` as counts; not a graduation criterion.
4. Tests on the test server in deterministic mode.

## Acceptance
- Moderation outcomes are identical for impacted and guest copies of the same content.
- No restriction row follows any location signal.
- `npm run verify` is green.

## Out of scope
- Real devices.
