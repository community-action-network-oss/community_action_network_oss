---
id: "14-u43"
plan: "14"
title: "zk_cell_v1 verifier: public inputs, verify then discard, unknown proof types to guest"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 493
depends_on: ["14-u40","14-u41","14-u02","14-u03"]
writes: ["src/location/infra/zk/**","src/location/app/**","src/config.ts",".env.example","test/location-zk.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#3-candidates","docs/design/location/attestation.md#7-interfaces","docs/adr/0016-private-location-attestation.md","docs/spec/constitution/rules-legal-sim.md#LOC-PRIV-1"]
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
Gated on the adoption decision. `ZkCellVerifier` behind `LocationVerifierPort`: verify the proof against the stored Poseidon root for the version, bind the digest and the single-use challenge nonce, apply the doubt rules, store only the four fields, discard the proof.

## Steps
1. Verify with the library of the chosen stack in a worker thread pool sized from config; public inputs must equal (root for `area.areaVersion`, version, digest, nonce, plausibility bit); the challenge is consumed atomically as in 14-u02. A plausibility bit of false downgrades to guest `outside` or `invalid_proof` per the coarse set.
2. Registry check against `proof_circuit` (14-u40): active or grace circuits only; an unknown circuit or vk hash verifies to `guest` with `invalid_proof`, not an error, so older clients keep working.
3. Result: `impacted` with `verified` and proof type `zk_cell_v1`; nothing else stored; proof bytes are not kept anywhere (14-u12 static check extended).
4. Throughput guard: a configured concurrency limit and a queue timeout map to `guest` with `unavailable` rather than a failed post.
5. Tests: a valid fixture proof verifies; a proof for another digest, nonce, root or version fails to guest; an unknown circuit gives guest; the throughput guard; the conformance suite of 14-u12 still passes.

## Acceptance
- A valid proof yields impacted/verified; every failure yields guest and an accepted message.
- Proofs are never stored or logged.
- `npm run verify` is green.

## Out of scope
- End to end proof fixture (14-u45).
