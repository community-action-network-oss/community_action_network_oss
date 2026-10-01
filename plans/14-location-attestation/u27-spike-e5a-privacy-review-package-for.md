---
id: "14-u27"
plan: "14"
title: "Spike E5a: privacy review package for the external reviewers"
repo: .
area: can-root
model: sonnet
est_hours: 1.5
priority: 477
depends_on: ["14-u21","14-u22","14-u25"]
writes: ["spikes/zk-cell/e5-privacy/**"]
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
Prepare what two external reviewers need for E5: a transcript of every request, log line and database row for one send under zk_cell_v1, an analysis that the cell is not derivable, the absence of a stable linker, the timing and challenge side channels, and the open questions.

## Steps
1. The spike lives only under spikes/zk-cell/ in the superproject (a throwaway directory, never imported by can_server or can_app mainline code, section 8 of the design). Never commit a secret, a proving key larger than 5 MB, or a real location.
2. Write `e5-privacy/PACKAGE.md`: a sequence of one contribution send with the exact fields on every wire message and in every row (use the real shapes from 14-u02 and the circuit public inputs from E1), the threat table of design section 1 restated against the actual artefacts, and each residual risk of section 5 with its mitigation.
3. Analysis sections: why the public inputs reveal nothing about the cell (plausibility bit and area root only); why no per-user linker exists (no nullifier, per-message challenge); the intersection attack over overlapping areas and the K_MIN_CELLS mitigation; timing (existing contribution timestamps only); the challenge side channel.
4. A reviewer checklist with a pass or fail box per item, matching the E5 pass rule (no finding of medium or higher left open), and a template for findings with severity.
5. No claim of review having happened: the file states it is a package, and the review is 14-u28.

## Acceptance
- The package is self-contained and cites real artefact shapes.
- It states clearly that no review has happened.
- `node spikes/zk-cell/check.mjs` is green.

## Out of scope
- The review itself (14-u28).
