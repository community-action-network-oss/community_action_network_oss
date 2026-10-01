---
id: "14-u24"
plan: "14"
title: "Spike E4: bundle size and lazy loading of WASM and keys"
repo: .
area: can-root
model: sonnet
est_hours: 1.2
priority: 474
depends_on: ["14-u21","14-u22"]
writes: ["spikes/zk-cell/e4-bundle/**","spikes/zk-cell/results/e4-*.json"]
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
E4: how much the winning stack adds to the web bundle, and a loading design that pays that cost only on the first send with a location check.

## Steps
1. The spike lives only under spikes/zk-cell/ in the superproject (a throwaway directory, never imported by can_server or can_app mainline code, section 8 of the design). Never commit a secret, a proving key larger than 5 MB, or a real location.
2. If a required tool (nargo, bb, circom, snarkjs, Chromium) cannot be installed in the environment, stop and report the unit as blocked with the exact missing tool; never invent or estimate numbers. Numbers measured headless with CPU throttling are labelled PROVISIONAL in every file; real mid-range Android numbers come only from 14-u30.
3. Build a minimal Expo web export fixture inside the spike directory that imports each prover lazily; measure the extra gzip size of the application chunks, the WASM files and the proving or verifying keys.
4. Pass: at most 3 MB extra gzip, loaded only on first use. Otherwise record the hosting-keys-separately design (fetched on demand, cached, hash-pinned to the verifying key hash).
5. Record load time on the throttled profile and the cache behaviour on a second send. Findings in `e4-bundle/FINDINGS.md`.

## Acceptance
- Sizes for both stacks are in the results and validate.
- The loading design is written down.
- `node spikes/zk-cell/check.mjs` is green.

## Out of scope
- Changing the main app bundle.
