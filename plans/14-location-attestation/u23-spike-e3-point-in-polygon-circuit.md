---
id: "14-u23"
plan: "14"
title: "Spike E3: point-in-polygon circuit (option A) at 32 and 64 vertices"
repo: .
area: can-root
model: sonnet
est_hours: 1.5
priority: 473
depends_on: ["14-u20"]
writes: ["spikes/zk-cell/e3-polygon/**","spikes/zk-cell/results/e3-*.json"]
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
E3: report proving time and memory of a fixed-point ray-casting circuit for polygons of 32 and 64 vertices, to decide whether option A stays parked.

## Steps
1. The spike lives only under spikes/zk-cell/ in the superproject (a throwaway directory, never imported by can_server or can_app mainline code, section 8 of the design). Never commit a secret, a proving key larger than 5 MB, or a real location.
2. If a required tool (nargo, bb, circom, snarkjs, Chromium) cannot be installed in the environment, stop and report the unit as blocked with the exact missing tool; never invent or estimate numbers. Numbers measured headless with CPU throttling are labelled PROVISIONAL in every file; real mid-range Android numbers come only from 14-u30.
3. Noir circuit (reuse the E1 toolchain) over fixed-point coordinates with the polygon vertices as public inputs and the hidden point private; test with an inside point, an outside point and a point on an edge.
4. Measure with the harness at 4x and 6x throttling for 32 and 64 vertices; record constraints count, proving time, peak memory, proof size.
5. Pass if median at most 10 s on mid-range Android (PROVISIONAL here). Otherwise record "A is parked". Note the cell-grid precision limit of option B against polygon exactness (areas smaller than the grid cannot be expressed anyway).

## Acceptance
- Results for both sizes exist and validate.
- The findings state plainly whether A stays parked.
- `node spikes/zk-cell/check.mjs` is green.

## Out of scope
- Using option A in any product code.
