---
id: "14-u22"
plan: "14"
title: "Spike E2: Circom and Groth16 variant with a ceremony plan"
repo: .
area: can-root
model: sonnet
est_hours: 1.5
priority: 472
depends_on: ["14-u20"]
writes: ["spikes/zk-cell/e2-circom/**","spikes/zk-cell/results/e2-*.json"]
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
E2: the same statement in Circom with snarkjs Groth16, plus a per-circuit ceremony plan a contributor-run project can reproduce.

## Steps
1. The spike lives only under spikes/zk-cell/ in the superproject (a throwaway directory, never imported by can_server or can_app mainline code, section 8 of the design). Never commit a secret, a proving key larger than 5 MB, or a real location.
2. If a required tool (nargo, bb, circom, snarkjs, Chromium) cannot be installed in the environment, stop and report the unit as blocked with the exact missing tool; never invent or estimate numbers. Numbers measured headless with CPU throttling are labelled PROVISIONAL in every file; real mid-range Android numbers come only from 14-u30.
3. Circuit with the same public inputs as E1 (Poseidon from circomlib, depth 12). A local powers-of-tau of the needed size is acceptable for the spike only and is labelled "NOT a ceremony output".
4. snarkjs in the browser (WASM) for proving, node for verifying; the harness metrics at 4x and 6x throttling; proof size (expect about 200 bytes); the pass criteria of E1.
5. Ceremony plan `e2-circom/CEREMONY.md`: phases, who can contribute, how a contribution is verified and published, the minimum number of contributors, how a contributor reproduces the build from the repository, the cost of a new circuit version, and how the verifying key hash enters the pack as an artefact (key rotation, design section 7). Compare with the universal-SRS route of E1 (OQ-5).
6. Write the comparison with E1 into `e2-circom/FINDINGS.md`: time, size, memory, bundle size and ceremony cost.

## Acceptance
- Proofs verify and reject as in E1.
- The ceremony plan is concrete and reproducible.
- `node spikes/zk-cell/check.mjs` is green.

## Out of scope
- Running a real ceremony.
