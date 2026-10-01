---
id: "10-u43"
plan: "10"
title: "Vendor L1 official sources: UDHR, ICCPR, ICESCR (founder or interactive, network)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 0.8
priority: 43
depends_on: ["10-u42"]
writes: ["packs/legal/**/sources/**"]
spec: ["docs/design/ai/legal-stack.md", "docs/spec/constitution/rules.md#LEGAL-SOURCE-1", "docs/open-questions/OQ-legal-corpus-sourcing.md", "docs/design/flows/legal-corpus-update.md"]
verify: ["npm run verify"]
founder_gate: true
defaults: "If the licence is unclear or the file cannot be fetched, mark the unit blocked with the reason; never paste text from memory or a model."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Commit the unmodified official source text with provenance so the build unit can ingest it offline. These are public UN instrument texts; the gate exists because night runs cannot fetch and the founder confirms the UN reuse terms.

## Steps
1. A human or an interactive session with network access downloads: the Universal Declaration of Human Rights, the International Covenant on Civil and Political Rights and the International Covenant on Economic, Social and Cultural Rights, English authoritative texts from the United Nations (OHCHR or the UN treaty collection). Night runs must NOT fetch (the unit is gated for that reason).
2. Save each file unmodified at `packs/legal/<layer>/<jurisdiction>/<corpus>/sources/` and write `sources/source.yaml` per 10-u42: official publisher, exact URL, retrieval date (today), license as stated by the publisher, language, `sha256` of the file, and the `split` rule for the ingest tool.
3. Confirm the file is the authoritative text (official publisher, not a mirror or summary). If the licence or reuse terms are unclear, stop and record it in `sources/LICENSE-NOTE.md` for the founder; do not commit the text until the founder confirms.
4. Run `node tools/legal-ingest.mjs <corpus-dir> --check` only to verify the split matches the expected article count recorded in `source.yaml`; do not commit articles in this unit.

## Acceptance
- Every vendored file has publisher, URL, retrieval date, licence and sha256 in `source.yaml`.
- No text edited; no translation used as the authority.
- `npm run verify` green.

## Out of scope
- Building articles and topic indexes (the next unit).
- Any lawyer review.
