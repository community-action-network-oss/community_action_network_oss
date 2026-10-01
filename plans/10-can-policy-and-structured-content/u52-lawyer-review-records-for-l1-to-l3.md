---
id: "10-u52"
plan: "10"
title: "Lawyer review records for L1 to L3 corpora and topic indexes (LEGAL-CORPUS-1, founder action)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.0
priority: 52
depends_on: ["10-u44", "10-u46", "10-u49", "10-u54"]
writes: ["packs/legal/L1-un/**/review/**", "packs/legal/L2-supranational/**/review/**", "packs/legal/L3-constitution/**/review/**", "ratifications/**"]
spec: ["docs/spec/constitution/rules.md#LEGAL-CORPUS-1", "docs/open-questions/OQ-legal-policy-reviewers.md", "docs/open-questions/OQ-legal-corpus-sourcing.md", "docs/open-questions/OQ-legal-layer-conflicts.md", "docs/spec/constitution/rules.md#FOUNDER-TRANS-1"]
verify: ["npm run verify"]
founder_gate: true
defaults: "If no reviewer is available, keep every corpus `draft`; the stack stays usable on synthetic evidence only."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A qualified person records review of the L1 to L3 corpora, their provenance and topic indexes. Without it they stay `draft` and cannot ratify.

## Steps
1. Reviewer (jurisdiction-qualified lawyer; transitional founder stewardship may approve only v1, constitution VIII.2) writes `review/<date>.md` per corpus: reviewer, qualification, scope reviewed, date, expiry, findings, any layer conflict found (held with a conflict note, never silently resolved).
2. Reviewer confirms the L1 `reference` and L2 `binding` modes for NL (OQ-supranational-default) or records a correction.
3. Ratify through the 10-u26 record format; a corpus whose review is only founder stewardship says so.

## Acceptance
- Every L1 to L3 corpus has a review record or an explicit unreviewed acceptance.
- `npm run verify` and the 10-u54 legal ratification check pass.

## Out of scope
- L4 to L6 review (10-u51).
- Legal advice to individuals.
