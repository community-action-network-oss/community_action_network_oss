---
id: "09-u20"
plan: "09"
title: "DP-COMPLETENESS handler: layer 1 from 10-u29, model read for any content type"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.3
priority: 249
depends_on: ["09-u16","09-u01","10-u29"]
writes: ["src/moderation/app/dp-completeness.ts","src/moderation/app/dp-completeness.spec.ts","test/fixtures/moderation/completeness/**"]
reads: ["src/policy/**","src/moderation/**"]
spec: ["docs/design/ai/structured-content.md#5-dp-completeness","docs/design/ai/structured-content.md#2-schema-format","docs/design/ai/structured-content.md#9-policy-pack-values-tied-to-schemas","docs/design/ai/decision-points.md#per-dp-notes","docs/design/flows/structured-submission.md"]
needs: []
verify: ["npm run verify","npx vitest run src/moderation/app/dp-completeness"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Layer 1 (deterministic, before any model: required fields, enums, length bounds, list sizes, URL shape, repeated-text and filler detectors) already exists as pure functions in src/policy/domain/completeness.ts from 10-u29; import it, never duplicate it. This unit adds the DP handler: run layer 1, and only if it passes, layer 2, a model read through the DAG that each required field answers its own question. Generic over content type through the 10-u04 schema registry.

## Steps
1. Read src/policy/domain/completeness.ts (10-u29) and call it for layer 1; map its structured findings (field_ref, code) to DP-COMPLETENESS hints with rule id COMPLETE-1 or STRUCT-ONLY-1. If a detector needed here is missing there ("n/a" or "see above" answers, unknown without the paired settle-it field, a field not in the schema), add it to that file with table-driven tests rather than here, and say so in the commit message.
2. `DpCompleteness` handler in src/moderation/app/dp-completeness.ts: a layer 1 finding yields needs_revision with one hint per field and no model call (saves cost); otherwise call the DAG for the per-field meaningful-answer read, whose output (field_ref, meaningful boolean, hint) is validated against the DP schema.
3. Fixture schemas: the problem schema from pack-v1 of the fixtures unit plus one tiny extra schema with a different field set under test/fixtures/moderation/completeness/ to prove genericity; fixtures include the synthetic well-meaning-but-vague and padded answers.
4. Unit tests: genericity test (swap schema, same handler code); hints are one per field; layer 1 failure makes zero model calls (spy); layer 2 flags an answer that addresses a different field.

## Acceptance
- Works for the problem schema and a second fixture schema without code changes.
- Layer 1 failures never call a model (spy test).
- No second copy of the deterministic detectors exists.
- `npm run verify` is green.

## Out of scope
- DP-ASSUMPTIONS (next unit).
- Rendering hints (app units).
- Schema validation and draft pinning (10-u29).
