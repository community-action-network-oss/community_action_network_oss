# OQ-impacted-label-web: What should the label say on web while the location check is self-asserted?

- **ID:** OQ-impacted-label-web
- **Status:** open

## Question

While web proofs are only a self-assertion, should the label read "Impacted" or something more careful?

## Why it matters

People rely on the "Impacted only" filter. A label that sounds verified when it is not would mislead them.

## Current default (what we built meanwhile)

The label reads "Reported impacted" on web until the proof type `zk_cell_v1` passes its spike. Native builds with a device integrity token may use the plain wording once built. The founder may override.

## Who can help

UX writers; trust and safety practitioners; civic-tech researchers.

## What a good answer looks like

Tested wording that people read correctly, plus the point at which the plain label is honest.

## Spec links

- `docs/design/location/attestation.md`
- `docs/adr/0016-private-location-attestation.md`
- `docs/spec/01-slice-1-brief.md` (Impacted and guest labels)
- `docs/spec/constitution/rules-legal-sim.md` (IMPACT-1)
