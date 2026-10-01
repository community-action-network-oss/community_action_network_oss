---
id: "14-u21"
plan: "14"
title: "Spike E1: Noir and Barretenberg (UltraHonk) cell-membership circuit"
repo: .
area: can-root
model: sonnet
est_hours: 1.5
priority: 471
depends_on: ["14-u20"]
writes: ["spikes/zk-cell/e1-noir/**","spikes/zk-cell/results/e1-*.json"]
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
E1 of the spike plan: a Noir circuit proving that a hidden H3 res-8 cell id is in a Poseidon Merkle tree of depth 12, bound to the message digest, the challenge nonce and a plausibility bit, proved with bb.js in the browser and verified server side.

## Steps
1. The spike lives only under spikes/zk-cell/ in the superproject (a throwaway directory, never imported by can_server or can_app mainline code, section 8 of the design). Never commit a secret, a proving key larger than 5 MB, or a real location.
2. If a required tool (nargo, bb, circom, snarkjs, Chromium) cannot be installed in the environment, stop and report the unit as blocked with the exact missing tool; never invent or estimate numbers. Numbers measured headless with CPU throttling are labelled PROVISIONAL in every file; real mid-range Android numbers come only from 14-u30.
3. Circuit `cell_membership_v1` in Noir: private inputs the cell id and the Merkle path; public inputs the area root, the area version, the message digest, the challenge nonce and the plausibility bit; no nullifier and no persistent identifier (design section 6). Unit tests inside Noir for a member, a non-member and a wrong digest.
4. Browser prover with `@aztec/bb.js` (UltraHonk): lazy-loaded WASM, proof generation for the 50 member vectors; record the metrics of the harness with 4x and 6x throttling; node verifier timing on one core; proof size.
5. Record pass or fail against: median proving at most 3 s, p95 at most 8 s, peak memory at most 150 MB, proof at most 20 KB, verify at most 50 ms (all PROVISIONAL here). Record toolchain versions, licences and the audit status of the proving system (criterion 4).
6. If E1 fails the thresholds say so in `results/e1-*.json` with the failing dimension and mark "try E2". Write 10 lines of findings into `e1-noir/FINDINGS.md`.

## Acceptance
- Proofs verify for members and are rejected for non-members and a wrong digest.
- Result files exist for each throttle profile and validate.
- `node spikes/zk-cell/check.mjs` is green.

## Out of scope
- Real-device numbers (14-u30).
- Adoption.
