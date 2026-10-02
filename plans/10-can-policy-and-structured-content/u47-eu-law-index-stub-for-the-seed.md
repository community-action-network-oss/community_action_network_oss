---
id: "10-u47"
plan: "10"
title: "EU-law index stub for the seed topics (index only, no text)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.0
priority: 47
depends_on: ["10-u41"]
writes: ["packs/legal/L2-supranational/nl/eu-law-index/**", "test/legal-eu-index.test.mjs"]
spec: ["docs/design/ai/legal-stack.md", "docs/spec/constitution/rules.md#LEGAL-SOURCE-1", "docs/open-questions/OQ-legal-corpus-sourcing.md", "docs/open-questions/OQ-supranational-default.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["6375c05"]
actual_hours: null
---
## Objective
A skeleton index of the EU legal acts the seeds touch (data protection, public order cooperation, waste, environment). It lists acts to be vendored and states no legal rule.

## Steps
1. `corpus.yaml` with `status: index_only`, `reviewed: false`, instrument `eu-law-index`; `articles/` is empty on purpose and lint (10-u41) treats `index_only` as articles-optional.
2. `index.yaml`: one row per topic area (the four above) with `act_title: TODO`, `celex_id: TODO`, `eur_lex_url: TODO`, `why_relevant`, `seed` (1 or 2), `vendor_status: pending`. Do NOT fill identifiers from memory; the vendor unit or a reviewer fills them from EUR-Lex.
3. A loader rule (documented, tested here as lint): an `index_only` corpus never produces an article citation; retrieval reports `no applicable article found in L2 (version)` for it (recorded fact, not a pass).

## Acceptance
- The stub lints, contains no legal assertion and no invented identifiers.
- `npm run verify` green.

## Out of scope
- Vendoring EU act texts (a later gated content unit of 10-u51's kind).
- Legal advice.
