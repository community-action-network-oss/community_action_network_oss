---
id: "14-u14"
plan: "14"
title: "E2E: inside, denied, replayed, stale, surge and outage give the right labels"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.3
priority: 462
depends_on: ["14-u03","12-u11","14-u11","14-u12"]
writes: ["test/e2e/location-attestation.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/constitution/rules-legal-sim.md#IMPACT-1","docs/spec/constitution/rules-legal-sim.md#GUEST-LABEL-1","docs/spec/constitution/rules-legal-sim.md#LOC-DOUBT-1","docs/design/location/attestation.md#4-anti-spoofing-signals-not-identity","docs/adr/0016-private-location-attestation.md","docs/design/components/server.md"]
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
The acceptance test of slice-1 attestation: through the real HTTP API with the fake verifier and no device.

## Steps
1. Setup a published problem with an area version of at least 25 cells and two accounts.
2. Scenarios: inside claim gives impacted; no permission, outside, stale (expired challenge), replayed challenge, invalid proof type, verifier outage each give guest and a posted message; the same account is impacted in one problem and guest in another; a per-area surge flips later posts to guest and recovers; the label never changes the moderation outcome of an identical message (compare the runs of an impacted and a guest copy); a new area version applies to new contributions only and old labels keep their version.
3. Filter: `impactedOnly=true` returns only impacted items and the counts match; guest items always carry the label.
4. LOC-DOUBT-1: after all doubt scenarios no restriction or reputation row exists.

## Acceptance
- All scenarios pass with fakes.
- A new area version never relabels old contributions.
- `npm run verify` is green.

## Out of scope
- Web UI journeys (plan 07).
