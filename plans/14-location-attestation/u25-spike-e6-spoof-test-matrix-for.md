---
id: "14-u25"
plan: "14"
title: "Spike E6: spoof test matrix for the location signals"
repo: .
area: can-root
model: sonnet
est_hours: 1.2
priority: 475
depends_on: ["14-u04","14-u03"]
writes: ["spikes/zk-cell/e6-spoof/**","spikes/zk-cell/results/e6-*.json"]
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
E6: which signals detect which spoof, and a demonstration that every undetected case still yields only an `impacted` label, never another privilege.

## Steps
1. The spike lives only under spikes/zk-cell/ in the superproject (a throwaway directory, never imported by can_server or can_app mainline code, section 8 of the design). Never commit a secret, a proving key larger than 5 MB, or a real location.
2. If a required tool (nargo, bb, circom, snarkjs, Chromium) cannot be installed in the environment, stop and report the unit as blocked with the exact missing tool; never invent or estimate numbers. Numbers measured headless with CPU throttling are labelled PROVISIONAL in every file; real mid-range Android numbers come only from 14-u30.
3. Headless cases against the real client library of 14-u04 and the test server with the fake verifier disabled: a browser devtools geolocation override, an emulator-style constant position, an implausible jump sequence, a replayed challenge, a surge of new accounts. Record per case: detected or not, by which signal, resulting label.
4. Cases that need a physical device or a mock-location app (E6 device cases) are written as a checklist in `e6-spoof/DEVICE-CASES.md` for the founder run (14-u30), not run here.
5. Assert for each undetected case that the only consequence is the `impacted` label (no other privilege exists in slice 1: a test lists what the label affects: the filter view and nothing else).
6. Findings: a table of detected and undetected cases with the accepted residual risk wording for OQ-impacted-label-web.

## Acceptance
- The headless matrix is complete and reproducible.
- Every undetected case is shown to have no effect beyond the label.
- `node spikes/zk-cell/check.mjs` is green.

## Out of scope
- Device cases (14-u30).
