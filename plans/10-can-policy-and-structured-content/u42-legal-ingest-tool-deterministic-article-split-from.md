---
id: "10-u42"
plan: "10"
title: "Legal ingest tool: deterministic article split from a vendored official source"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 42
depends_on: ["10-u41"]
writes: ["tools/legal-ingest.mjs", "tools/legal-ingest/**", "test/legal-ingest.test.mjs", "test/fixtures/legal-source/**", "docs/legal-corpora.md", "package.json"]
spec: ["docs/design/ai/legal-stack.md", "docs/spec/constitution/rules.md#LEGAL-SOURCE-1", "docs/spec/constitution/rules.md#LEGAL-CORPUS-1", "docs/design/flows/legal-corpus-update.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A tool that turns an official source file already committed under `sources/` into `articles/*.md`, a `corpus.yaml` skeleton with hash and a draft `topic-index.json`, with no network and no model. The text is never rewritten (LEGAL-SOURCE-1).

## Steps
1. CLI `node tools/legal-ingest.mjs <corpus-dir>`: reads `sources/source.yaml` (`file`, `format: txt|html`, `split` = per-instrument rule: a regex for article headings, a heading-number group, optional chapter regex, `language`) and the named file. Offline only; the tool refuses any URL argument.
2. Split deterministically: one article per heading match, text copied byte for byte (whitespace normalised only by the CRLF to LF rule), `article_key` from the heading number, `source_locator` from the byte offsets. HTML: strip tags with a small stdlib parser, keep entity decoding only; no summarising.
3. Write `corpus.yaml` skeleton from `source.yaml` (publisher, URL, retrieval_date copied from `source.yaml`, never invented), compute `content_hash` and each `text_sha256`, set `status: draft`, `reviewed: false`, `reviewer: none`. Refuse to run when `source.yaml` lacks publisher, URL, retrieval_date or license.
4. Draft topic index: one entry per article with `topics` filled by keyword match from a per-corpus `topics.seed.yaml` (words to topics), everything else empty, `topic_ban: false`. Mark the file `draft: true`; a lawyer approves it (LEGAL-CORPUS-1), the tool never decides a ban.
5. Idempotent: re-running yields identical output; `--check` fails if articles drifted from the source. Tests use a synthetic 5-article source (invented, labeled fictional) in both txt and html, plus a source with a duplicated heading (must fail) and a source edited after ingest (`--check` fails).
6. Document in docs/legal-corpora.md the vendoring procedure for a human or an interactive session with network: download the official file, record retrieval date and sha256 in `source.yaml`, commit, then run the tool.

## Acceptance
- Ingest of the fixture source is byte-stable and `--check` passes.
- The tool has no network code path (test greps for http client imports) and never edits text.
- `npm run verify` green.

## Out of scope
- Fetching any real text (the vendor units).
- Embedding based topic ranking (runtime, 10-u56).
