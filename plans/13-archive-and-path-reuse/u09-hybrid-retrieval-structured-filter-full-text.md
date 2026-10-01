---
id: "13-u09"
plan: "13"
title: "Hybrid retrieval: structured filter, full text, vectors, reciprocal rank fusion"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 408
depends_on: ["13-u08","13-u03"]
writes: ["src/archive/app/retrieval/**","src/archive/domain/retrieval/**","test/archive-retrieval.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#4-retrieval-hybrid","docs/spec/24-archive-reuse.md#242-suggestions-while-preparing","docs/open-questions/OQ-cross-language-reuse.md","docs/design/components/server.md"]
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
Given a problem draft, return the top 30 candidate chunks grouped by record, reading ratified records only (the `archive_retrievable` view). Ranking by dimension and the final cut to 5 are 13-u10.

## Steps
1. Query builder (pure): from the draft's redacted field text and its `context_profile` build a structured query, a full-text query per record language, and the text to embed. Language is not a hard filter; `problem_type` family is.
2. Three lists from `ContextIndexRepository`: (1) structured filter and per-dimension candidate score on `context_profile`; (2) `tsvector` search with the language configuration and the `simple` fallback; (3) vector search with cosine on the active model (skipped, with a recorded reason, when the embedding call fails or the index has no vectors for the model).
3. Fusion: reciprocal rank fusion (k = 60, a pack value) of the available lists, top 30, aggregated from chunks to records (best chunk per record plus a small bonus for multiple matching chunks). A record with only a structured match still appears, which keeps the feature working with no model.
4. Cross-language: use the multilingual vector list; when the model fails the cross-language floor the query is translated first (13-u07). Return `machineTranslated` markers with the matched text.
5. Honest empty state: when no record scores above the eval floor (pack value `archive.min_candidate_score`) return `{status: "nothing_similar_yet"}` and make no model call beyond what already ran for the query embedding; never pad with weak matches.
6. Tests with the fake embedding and a fixture archive of 12 records across two languages: each list contributes, RRF order is stable, withdrawn and unratified records never appear, the empty state returns no suggestions, vector outage degrades to two lists, a Dutch record is found by an English paraphrase through the fake multilingual table.

## Acceptance
- Only the `archive_retrievable` view is read.
- Retrieval works with vectors off (structured plus text).
- The empty state is honest and cheap.
- `npm run verify` is green.

## Out of scope
- Per-dimension ranking and explanation (13-u10).
- Fit checks (13-u11).
