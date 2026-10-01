---
id: "10-u53"
plan: "10"
title: "Legal stack config: jurisdiction pins, binding or reference per layer, retrieval limits"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.0
priority: 53
depends_on: ["10-u41", "10-u21", "10-u07"]
writes: ["schemas/pack.schema.json", "schemas/limits.schema.json", "limits.yaml", "packs/jurisdictions/nl-amsterdam/pack.yaml", "packs/jurisdictions/fiktiva-city/pack.yaml", "tools/lint.mjs", "test/legal-stack-config.test.mjs"]
spec: ["docs/design/ai/legal-stack.md#1-the-layers", "docs/design/ai/legal-stack.md#3-retrieval-never-whole-codes", "docs/open-questions/OQ-supranational-default.md", "docs/design/ai/decision-points.md#policy-pack-values-scarcity-and-minimum-effort"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Declare, per jurisdiction pack, which corpora form its stack and whether each layer is binding or reference, and put the retrieval budgets in pack values (code never holds a number).

## Steps
1. Add `legal_stack` to the jurisdiction `pack.yaml` schema: ordered `layers[]` of `{layer: L1..L6, corpus: <id>, version, pack_hash, mode: binding|reference|not_applicable}`. Lint: layers L1 to L6 each appear once (`not_applicable` allowed for L2 and L5 with a reason), versions and hashes match built corpus packs, and a `binding` layer cannot point at an `index_only` corpus without the field `acknowledged_index_only: true`.
2. Fill nl-amsterdam (L1 reference, L2 binding, L3, L4, L5, L6 binding, pinned to the 10-u44 to 10-u50 corpora as they exist; stubs pinned `index_only`) and fiktiva-city (synthetic corpus from the fixtures, all six layers).
3. limits.yaml keys with schema: `legal.retrieval.max_articles_per_layer` (default 3), `legal.retrieval.token_budget_per_run` (default 2500), `legal.retrieval.low_confidence_floor` (default 0.6), `legal.retrieval.risky_topics` (list of topic slugs that escalate on low confidence).
4. Tests: a pack with a missing layer fails lint; a hash pin that does not match fails; the keys parse.

## Acceptance
- Both jurisdiction packs list six layers with mode and pins.
- `npm run verify` green.

## Out of scope
- Loading and retrieval (10-u55, 10-u56).
