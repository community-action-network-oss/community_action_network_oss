# OQ-zk-setup: Which proof system setup suits a contributor-run project?

- **ID:** OQ-zk-setup
- **Status:** open

## Question

Should the target proof use a universal-setup, Plonk-family system or a per-circuit Groth16 ceremony?

## Why it matters

A ceremony needs trusted participants and rerunning for each circuit change. That is a heavy burden for a contributor-run project.

## Current default (what we built meanwhile)

Prefer a universal-setup Plonk-family system (for example Noir with UltraHonk) over a per-circuit Groth16 ceremony. The spike tests both. If neither meets the thresholds, slice 1 stays on option C.

## Who can help

Cryptographers; zero-knowledge engineers; security reviewers.

## What a good answer looks like

A comparison with measured numbers on the reference devices and a ceremony plan if one is needed.

## Spec links

- `docs/design/location/attestation.md`
- `docs/adr/0016-private-location-attestation.md`
- `docs/spec/01-slice-1-brief.md` (Impacted and guest labels)
