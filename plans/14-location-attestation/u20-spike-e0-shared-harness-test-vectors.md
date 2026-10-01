---
id: "14-u20"
plan: "14"
title: "Spike E0: shared harness, test vectors and result format"
repo: .
area: can-root
model: sonnet
est_hours: 1.5
priority: 470
depends_on: ["14-u01"]
writes: ["spikes/zk-cell/README.md","spikes/zk-cell/harness/**","spikes/zk-cell/vectors/**","spikes/zk-cell/check.mjs","spikes/zk-cell/package.json"]
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
Everything the experiments share, so each later unit only adds a circuit and runs it the same way: the cell set, the Merkle trees, the measurement harness and the result schema.

## Steps
1. The spike lives only under spikes/zk-cell/ in the superproject (a throwaway directory, never imported by can_server or can_app mainline code, section 8 of the design). Never commit a secret, a proving key larger than 5 MB, or a real location.
2. If a required tool (nargo, bb, circom, snarkjs, Chromium) cannot be installed in the environment, stop and report the unit as blocked with the exact missing tool; never invent or estimate numbers. Numbers measured headless with CPU throttling are labelled PROVISIONAL in every file; real mid-range Android numbers come only from 14-u30.
3. `vectors/`: a generator (seeded) for a synthetic affected area of about 4000 H3 cells at resolution 8 (use h3-js on a fictional polygon), the sorted cell ids, a Poseidon Merkle tree of depth 12 and a SHA-256 mirror (the server root of 14-u01), 50 member cells and 50 non-member cells, a message digest and a challenge nonce; all deterministic from a seed.
4. `harness/measure.mjs`: runs an experiment's prove and verify functions N times, records median and p95 proving time, peak memory (Chromium `performance.measureUserAgentSpecificMemory` or process RSS for node), proof size, verify time; a headless Chromium runner through Playwright with CDP CPU throttling (4x and 6x, labelled provisional) and a node runner for server-side verify on one core.
5. `results/schema.json` and a writer: one JSON file per (experiment, device profile) with the fields of the E1 pass criteria and a `provisional: true|false` flag; `check.mjs` validates all result files against the schema and the pass thresholds of section 3 and 8 and prints a table; it exits 0 when the harness itself is healthy (it does not fail on a failed experiment, it reports it).
6. README: how to run on a laptop, and how the founder runs the same harness on a real phone (14-u30): serve the page on the local network, open it in the phone browser, paste the result JSON back.

## Acceptance
- The generator is deterministic and its output validates.
- `node spikes/zk-cell/check.mjs` is green with no results present and with the sample result in test/.
- No file outside spikes/zk-cell changes.

## Out of scope
- Any circuit (E1 to E3).
- Mainline code changes.
