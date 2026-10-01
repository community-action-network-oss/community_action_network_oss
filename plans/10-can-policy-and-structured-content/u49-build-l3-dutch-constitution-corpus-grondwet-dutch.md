---
id: "10-u49"
plan: "10"
title: "Build L3 Dutch constitution corpus (Grondwet, Dutch authoritative) and draft topic index"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 49
depends_on: ["10-u48"]
writes: ["packs/legal/L3-constitution/nl/**", "test/legal-build-*.test.mjs"]
spec: ["docs/design/ai/legal-stack.md", "docs/spec/constitution/rules.md#LEGAL-SOURCE-1", "docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/design/flows/legal-corpus-update.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build the Grondwet corpus from the vendored official source with the ingest tool, so every article has a stable id, provenance and a draft topic index. Marked unreviewed until 10-u52 (OQ-legal-corpus-sourcing default).

## Steps
1. Write `corpus.yaml` per corpus (instrument, layer, jurisdiction, `mode`: L1 `reference`, L2 `binding` for NL per OQ-supranational-default) and run `node tools/legal-ingest.mjs` on each; commit `articles/`, `topic-index.json` (draft), `corpus.yaml`.
2. Check the article count against the count recorded in `source.yaml` and the source's own table of contents; mismatch fails the unit.
3. Fill `topics.seed.yaml` only with topics the seeds need (public safety and violence, expression and assembly, privacy and data protection, public space and cleanliness, environment, access to remedy, non-discrimination); the lawyer reviewer extends them later. Leave `topic_ban: false` everywhere.
4. Write `review/PENDING.md` (frontmatter `reviewed: false`, who may review per OQ-legal-policy-reviewers) so lint's unreviewed banner rules hold; set `status: draft`.
5. Add one lint test per corpus: ids unique and of the form `<layer>/<jurisdiction>/<instrument>/art-<n>`, every article cited in `topic-index.json`, `content_hash` stable.
6. Language is `nl`; topic index topics and actors are written in English slugs so retrieval works from typed English fields, with Dutch headings kept in the article.

## Acceptance
- Every article of the instrument exists once with provenance, and `npm run verify` is green.
- Corpus is `draft`, `reviewed: false`, with the pending-review record.
- No text differs from the vendored source (ingest `--check`).

## Out of scope
- Lawyer review (10-u52).
- Server loading (10-u55).
