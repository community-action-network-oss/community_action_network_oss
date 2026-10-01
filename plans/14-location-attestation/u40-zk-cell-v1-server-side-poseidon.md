---
id: "14-u40"
plan: "14"
title: "zk_cell_v1 server side: Poseidon area root and circuit and key registry"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 490
depends_on: ["14-u32","14-u01","14-u02"]
writes: ["src/areas/domain/poseidon*.ts","src/areas/app/**","src/location/domain/circuits/**","src/db/schema.ts","drizzle/**","openapi/openapi.json","test/area-poseidon.e2e-spec.ts"]
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
Gated on the adoption decision. Add the Poseidon Merkle root to each area version (computed for new versions and backfilled for old ones by a job) and a registry of circuits and verifying key hashes.

## Steps
1. Migration adding `cells_root_poseidon` and `circuit_id` to `problem_area_version` (a new column on an immutable row is set once by the backfill job, the only permitted UPDATE, as a narrow column grant stated in the migration). Poseidon implementation or library per the spike result, with test vectors shared with the circuit package (14-u41).
2. Registry table `proof_circuit` (circuit_id, proof_type, vk_hash, status active|grace|retired, since) filled from a config file; a key rotation is an operator event recorded like any policy artefact; the old verifier stays for a grace period.
3. The area GET (14-u01) returns the Poseidon root and `circuitId` when present. Run `npm run openapi` and `git add -- openapi/openapi.json`.
4. Tests: roots equal the vectors of the spike; backfill is idempotent; a changed cell set gives a different root; registry state transitions.

## Acceptance
- Roots match the shared vectors.
- Old verifiers remain until their grace ends.
- `npm run verify` is green with openapi regenerated.

## Out of scope
- The verifier (14-u43).
