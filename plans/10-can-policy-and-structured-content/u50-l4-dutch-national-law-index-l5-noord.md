---
id: "10-u50"
plan: "10"
title: "L4 Dutch national-law index, L5 Noord-Holland and L6 Amsterdam stubs (no legal assertion)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.2
priority: 50
depends_on: ["10-u41", "10-u21"]
writes: ["packs/legal/L4-national/nl/**", "packs/legal/L5-regional/nl/noord-holland/**", "packs/legal/L6-city/nl-amsterdam/**", "test/legal-stubs.test.mjs"]
spec: ["docs/design/ai/legal-stack.md#6-amsterdam-starting-stack", "docs/spec/constitution/rules.md#LEGAL-SOURCE-1", "docs/open-questions/OQ-amsterdam-overlay-review.md", "docs/open-questions/OQ-legal-corpus-sourcing.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["0a9b1f2"]
actual_hours: null
---
## Objective
Skeleton corpora for the lower layers so the Amsterdam stack (D-61) has every layer present and visibly unreviewed. They state no law.

## Steps
1. L4 `statutes/index.yaml`: topic rows for seed 1 (public order, criminal procedure, explosives and weapons) and seed 2 (waste, littering enforcement, environmental management) and data-protection implementation, each `statute: TODO`, `official_url: TODO`, `vendor_status: pending`. L5 `noord-holland/corpus.yaml`: `status: index_only`, note "empty at start; filled only if a seed needs it". L6 `bylaws/index.yaml`: public order, public space, waste rows with the same TODO shape.
2. Each stub has `corpus.yaml` (`index_only`, `reviewed: false`, mode `binding`), `review/PENDING.md`, and an unreviewed banner in its README; no `articles/`.
3. Test: every stub lints; lint rejects any stub row carrying article text; the four lower layers each resolve in a combined Amsterdam listing script `tools/list-stack.mjs nl-amsterdam` that prints layer, corpus id, status, reviewed.

## Acceptance
- L4, L5, L6 stubs exist and list their TODO sources; no legal assertion.
- `tools/list-stack.mjs nl-amsterdam` prints all six layers with their status.
- `npm run verify` green.

## Out of scope
- Vendoring statutes or bylaws (10-u51).
- Provincial content.
