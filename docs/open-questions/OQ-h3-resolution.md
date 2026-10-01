# OQ-h3-resolution: What cell size and minimum area size protect people?

- **ID:** OQ-h3-resolution
- **Status:** open

## Question

What H3 resolution, minimum number of cells per affected area and population floor should apply?

## Why it matters

Small areas make "inside" almost an address. Large cells blur the area boundary.

## Current default (what we built meanwhile)

Resolution 8 (about 0.74 km2 per cell), at least 25 cells per area. Smaller affected places are expressed as the surrounding neighbourhood, and the problem text names the place. A population floor for urban areas is undecided.

## Who can help

Privacy researchers; statisticians; geographers; data-protection officers.

## What a good answer looks like

A recommendation for resolution and minimum size per area type with the reasoning, and a population floor if one is advised.

## Spec links

- `docs/design/location/attestation.md`
- `docs/adr/0016-private-location-attestation.md`
- `docs/spec/constitution/rules-legal-sim.md` (LOC-PRIV-1)
