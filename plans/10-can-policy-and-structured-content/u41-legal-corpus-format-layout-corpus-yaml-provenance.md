---
id: "10-u41"
plan: "10"
title: "Legal corpus format: layout, corpus.yaml provenance, schemas and lint (LEGAL-SOURCE-1)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 41
depends_on: ["10-u03", "10-u06"]
writes: ["packs/legal/README.md", "schemas/legal-corpus.schema.json", "schemas/legal-article.schema.json", "schemas/topic-index.schema.json", "schemas/pack.schema.json", "tools/lint-legal.mjs", "tools/lint.mjs", "tools/build-pack.mjs", "tools/pack-hash.mjs", "test/legal-*.test.mjs", "test/fixtures/legal/**", "docs/legal-corpora.md"]
spec: ["docs/design/ai/legal-stack.md", "docs/design/flows/legal-corpus-update.md", "docs/design/components/can-policy.md", "docs/spec/constitution/rules.md#LEGAL-SOURCE-1", "docs/spec/constitution/rules.md#LEGAL-STACK-1", "docs/design/ai/policy-pack.md#version-and-hash", "docs/adr/0012-legal-layer-stack.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["6a05575"]
actual_hours: 0.1
---
## Objective
Define how a legal corpus lives in can_policy so the legal stack (D-61) is versioned, hash-pinned and traceable to its official source. No legal text is added here, only the format and its lint.

## Steps
1. Layout: `packs/legal/<layer>/<jurisdiction>/<corpus>/` with `corpus.yaml`, `sources/` (the vendored official file, unmodified), `articles/<article-key>.md`, `topic-index.json`, `review/`. Layer dirs are `L1-un`, `L2-supranational`, `L3-constitution`, `L4-national`, `L5-regional`, `L6-city` exactly as docs/design/ai/legal-stack.md section 2. L0 is the base pack and has no corpus.
2. Pack kind: extend `schemas/pack.schema.json` with layer `legal` (each corpus directory is its own pack, `pack.yaml` beside `corpus.yaml`). The hash algorithm of 10-u03 is NOT changed (the server hash contract stays valid); `sources/` and `articles/` are hashed files, so `content_hash` and the pack hash move with any text edit. A jurisdiction pack pins corpora by `{id, version, pack_hash}` (the pin field is added by 10-u53).
3. `corpus.yaml` schema (LEGAL-SOURCE-1): `id`, `layer`, `jurisdiction`, `instrument`, `official_publisher`, `source_url`, `retrieval_date`, `version`, `effective_from`, `effective_to` (nullable), `language` (authoritative) and `translations[]` (each labeled `translation: true`, never the cited text), `license`, `content_hash` (sha256 over the concatenated article texts in key order), `mode` (`binding|reference`, default per jurisdiction in pack config), `status` (`index_only|draft|ratified`), `reviewed` (bool), `reviewer` (record or `none`).
4. Article file: frontmatter `article_id` (stable, `L2/nl/echr/art-10`), `article_key`, `heading`, `language`, `source_locator` (page, section or anchor in the vendored source), `text_sha256`; body is the official text verbatim. `topic_ban` is never set in an article; a topic ban lives only in the topic index and needs `reviewed: true` (used by 09-u58).
5. `topic-index.json` schema: array of `{article_id, topics[], actors[], actions[], constraint_kinds[], always_for_dps[], topic_ban (bool, default false), ban_scope (topic ids, required when topic_ban)}`. Lint: every article is covered by exactly one entry; every entry resolves to an article.
6. `tools/lint-legal.mjs`: fails on missing provenance fields, `content_hash` that does not match the text, an article without `source_locator`, an `articles/` file whose `text_sha256` differs, a translation used as `language` authority, `status: ratified` without a review record (`review/*.md` with reviewer, jurisdiction qualification, scope, date), and `topic_ban: true` on a corpus with `reviewed: false`. Wire into `tools/lint.mjs`.
7. Lint exemptions, documented in docs/legal-corpora.md: official text is verbatim, so the banned dash check and the 256 KB cap of 10-u03 skip `packs/legal/**/articles/**` and `packs/legal/**/sources/**` (cap raised to 1 MB per source file); the dash check still applies to `corpus.yaml`, `topic-index.json`, `review/` and the docs.
8. Fixtures under test/fixtures/legal: one valid synthetic corpus (invented articles, labeled fictional, jurisdiction `fiktiva`) and broken variants (missing publisher, hash drift, uncovered article, topic_ban on unreviewed). Tests assert the expected message for each. Write docs/legal-corpora.md (format, how to propose a corpus change, what a reviewer signs).

## Acceptance
- `npm run verify` is green; each broken fixture fails with a distinct message.
- A corpus without provenance or with a hash that does not match its text cannot pass lint (LEGAL-SOURCE-1 test).
- The pack hash changes when one article byte changes (test).

## Out of scope
- Any real legal text (10-u43 onward).
- The server loader (10-u55).
