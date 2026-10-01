---
id: "14-u26"
plan: "14"
title: "Spike E8: verifier throughput on one core"
repo: .
area: can-root
model: sonnet
est_hours: 1
priority: 476
depends_on: ["14-u21","14-u22"]
writes: ["spikes/zk-cell/e8-throughput/**","spikes/zk-cell/results/e8-*.json"]
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
E8: sustained verifies per second per vCPU for the server verifier of each stack, with the proof bytes discarded after the check.

## Steps
1. The spike lives only under spikes/zk-cell/ in the superproject (a throwaway directory, never imported by can_server or can_app mainline code, section 8 of the design). Never commit a secret, a proving key larger than 5 MB, or a real location.
2. If a required tool (nargo, bb, circom, snarkjs, Chromium) cannot be installed in the environment, stop and report the unit as blocked with the exact missing tool; never invent or estimate numbers. Numbers measured headless with CPU throttling are labelled PROVISIONAL in every file; real mid-range Android numbers come only from 14-u30.
3. A node loop with the bb.js verifier and the snarkjs verifier on a single core (`taskset` or a one-CPU container if available, otherwise a worker pinned by `--cpu` and a note), 60 seconds, record verifies per second and p95 latency, memory.
4. Pass: at least 50 verifies per second per vCPU. If not, document queueing and batch options.
5. Confirm that nothing in the loop keeps proof bytes after verify (heap snapshot comparison or a simple retained-size check).

## Acceptance
- Throughput numbers for both stacks validate.
- `node spikes/zk-cell/check.mjs` is green.

## Out of scope
- Production sizing.
