---
id: "14-u42"
plan: "14"
title: "zk_cell_v1 prover adapter: lazy WASM, plausibility bit, fallback to option C"
repo: can_app
area: can-app
model: sonnet
est_hours: 1.5
priority: 492
depends_on: ["14-u41","14-u04","14-u40"]
writes: ["src/location/zk/**","src/api/schema.d.ts","__tests__/location-zk*.test.ts"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#3-candidates","docs/design/location/attestation.md#7-interfaces","docs/adr/0016-private-location-attestation.md","docs/spec/constitution/rules-legal-sim.md#LOC-PRIV-1","docs/design/ux/wireframes/guest.md#WF-LOCPERM-1","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Gated on the adoption decision. `ZkCellProver` implementing the client `LocationProverPort`: derive the hidden cell on device, build the Merkle path from the cached cell set, prove in a worker, and return an attestation request with proof type `zk_cell_v1`. Browsers that cannot run it fall back to option C without an error.

## Steps
1. Lazy load the prover and keys on first use (the loading design from E4), in a web worker; show progress through the existing "Checking location" state of 12-u24; a timeout of the pack-value length falls back to `client_assertion` with a calm state, never blocks the send.
2. `supported(area)` returns `["zk_cell_v1", "client_assertion"]` best first only when the area carries the Poseidon root and circuit id and the device passes a capability check (WASM, memory).
3. The plausibility bit comes from the history module of 14-u04; the cell id and the path exist only inside the worker call and are never logged or stored (the spy tests of 14-u04 extended to the worker).
4. Tests with a recorded proof fixture and a fake worker: success, timeout fallback, unsupported device fallback, no coordinate or cell value reaches logs or storage.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- A device that cannot prove sends option C attestation, never an error.
- No cell or position leaves the worker.
- `npm run verify` is green.

## Out of scope
- Label wording (14-u44).
