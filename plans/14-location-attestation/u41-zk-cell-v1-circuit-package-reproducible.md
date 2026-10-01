---
id: "14-u41"
plan: "14"
title: "zk_cell_v1 circuit package: reproducible build, keys and vectors"
repo: can_app
area: can-app
model: sonnet
est_hours: 1.5
priority: 491
depends_on: ["14-u32","14-u40"]
writes: ["zk/**","package.json","package-lock.json"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#3-candidates","docs/design/location/attestation.md#7-interfaces","docs/adr/0016-private-location-attestation.md","docs/spec/constitution/rules-legal-sim.md#LOC-PRIV-1","docs/design/location/attestation.md#8-spike-plan","docs/design/ux/wireframes/guest.md#WF-LOCPERM-1","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Gated on the adoption decision. The production circuit `cell_membership_v1` of the chosen stack, with a reproducible build, the verifying key and its hash, the shared test vectors with 14-u40, and licences recorded. Spike code is copied and cleaned, never imported from spikes/.

## Steps
1. Create `zk/cell_membership_v1/` from the winning spike with the final public input order (area root, area version, message digest, challenge nonce, plausibility bit), circuit unit tests and a build script that reproduces the artefacts byte for byte from the repository (document the toolchain versions).
2. Artefacts: compiled circuit, proving key (hosted separately if over the bundle budget, hash-pinned), verifying key and `vk_hash` that goes into the server registry (14-u40); a licence file listing every dependency (open source, permissive, no custom crypto).
3. Shared vectors file read by both repos' tests (checked in here, copied by a script into can_server test fixtures, never a symlink).
4. Tests: members prove and verify, non-members and wrong digests fail, public input order test, build reproducibility check (hash equality on a second build in CI).

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- The build is reproducible and the vk hash is stable.
- No private input appears in any public output.
- `npm run verify` is green.

## Out of scope
- The prover adapter (14-u42).
- The verifier (14-u43).
