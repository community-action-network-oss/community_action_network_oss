---
id: "10-u51"
plan: "10"
title: "L4 to L6 legal content: selected national statute, province and Amsterdam bylaw articles with lawyer review (founder action)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 51
depends_on: ["10-u50", "10-u42"]
writes: ["packs/legal/L4-national/nl/**", "packs/legal/L5-regional/nl/**", "packs/legal/L6-city/nl-amsterdam/**"]
spec: ["docs/design/ai/legal-stack.md#6-amsterdam-starting-stack", "docs/spec/constitution/rules.md#LEGAL-CORPUS-1", "docs/spec/constitution/rules.md#LEGAL-SOURCE-1", "docs/open-questions/OQ-legal-policy-reviewers.md", "docs/open-questions/OQ-amsterdam-overlay-review.md", "docs/open-questions/OQ-legal-corpus-sourcing.md"]
verify: ["npm run verify"]
founder_gate: true
defaults: "If no qualified reviewer is found, vendor from public sources, keep `reviewed: false` and the banner, keep topic_ban false everywhere; public participation stays closed (SIM-GATE-1)."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Real legal content for L4 to L6, selected articles only for seeds 1 and 2. Legal text is gated: a lawyer or the founder decides what is included and what is marked reviewed (LEGAL-CORPUS-1).

## Steps
1. Founder or delegate names a qualified Dutch reviewer or records an explicit "unreviewed" acceptance (OQ-legal-policy-reviewers default) in each corpus `review/` record.
2. A human or interactive session vendors the selected statute and bylaw articles from the official gazette and municipal bylaws register with provenance (10-u43 procedure), then runs the ingest tool; articles are never typed or paraphrased.
3. Each corpus gets its `topic-index.json` reviewed by the lawyer; a `topic_ban` entry is allowed only for an article that actually forbids the topic and only with `reviewed: true` (TOPIC-FORBIDDEN-1).
4. Set `status: ratified` only through a ratification record (10-u54 check); otherwise leave `draft`.

## Acceptance
- Every article has an official source, effective date and retrieval date, or the corpus stays `index_only`.
- A reviewer or an explicit unreviewed acceptance is recorded per corpus.
- `npm run verify` green.

## Out of scope
- Any claim that the corpus is legal advice.
- Other jurisdictions.
