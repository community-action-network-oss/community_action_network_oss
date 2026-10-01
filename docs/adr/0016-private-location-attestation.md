# ADR 0016: Private location attestation

- Status: Accepted, 2026-10-01 (D-73). Builds on [0005](0005-web-first-verification.md), [0010](0010-structured-content-everywhere.md) and [0012](0012-legal-layer-stack.md). Design: `docs/design/location/attestation.md`.

## Context
Whether a message comes from someone affected by a problem matters to readers, but location is among the most sensitive data a civic platform can hold. A stored coordinate or cell trail would endanger people and make the database a target.

## Decision
- Each contribution is labelled `impacted` or `guest` per message, from where the app is used when sending, via a private location attestation. Coordinates never leave the device and are never stored or logged.
- Stored per contribution: label, verification result, area version, proof type.
- Affected areas are versioned per problem, built from jurisdiction overlays or drawn by the poster, reviewed in volunteer review, with a minimum size.
- Staged path: slice 1 is option C (client check, server challenge, device attestation on native, nothing on web), because web is the only verified platform (D-8) and it avoids a ZK toolchain in the critical path. Target is option B (blinded coarse-cell Merkle membership proof, `zk_cell_v1`) after a spike with explicit criteria. Option A (ZK point-in-polygon) is researched and parked.
- Suspect or missing attestation downgrades to `guest`. It never causes an accusation, rejection or moderation difference.
- Interface: `LocationAttestationPort` (client prover, server verifier); unknown proof types fail toward `guest`.

## Consequences
- Slice-1 `impacted` is weakly assured on web; wording must not claim verified location (OQ-1).
- ZK adds WASM weight and a circuit and key lifecycle once B lands.
- Intersection and small-area risks remain; mitigated by area minimums and coarse cells, not eliminated.
- Persona simulation needs a fake port.

## How to reverse
Replace the verifier with a self-declared coarse area (D-73 reverse) by setting the proof type to `none` and labelling by declaration. Stored rows stay valid because they hold no location.
