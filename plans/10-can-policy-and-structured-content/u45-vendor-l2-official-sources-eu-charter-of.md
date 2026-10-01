---
id: "10-u45"
plan: "10"
title: "Vendor L2 official sources: EU Charter of Fundamental Rights and ECHR (founder or interactive, network)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 0.8
priority: 45
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
Commit the unmodified official source text with provenance so the build unit can ingest it offline. The Charter is reused under the EU legal-notice terms and the ECHR text is published by the Council of Europe; the founder confirms both and the English-language authority choice.

## Steps
1. A human or an interactive session with network access downloads: the Charter of Fundamental Rights of the European Union (Official Journal text via EUR-Lex) and the European Convention on Human Rights with its protocols (Council of Europe or HUDOC), English authoritative texts. Night runs must NOT fetch (the unit is gated for that reason).
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
