---
id: "09-u56"
plan: "09"
title: "Legal-stack step in the run DAG: layers, retrieval, cumulative evaluation (LEGAL-STACK-1)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 285
depends_on: ["09-u41", "10-u56", "09-u19"]
writes: ["src/moderation/app/legal-stack/**", "src/moderation/app/dag/**", "test/moderation-legal-stack.e2e-spec.ts", "test/fixtures/moderation/legal/**"]
spec: ["docs/design/ai/legal-stack.md#1-the-layers", "docs/design/ai/legal-stack.md#3-retrieval-never-whole-codes", "docs/design/ai/legal-stack.md#4-how-dps-use-the-stack", "docs/spec/constitution/rules.md#LEGAL-STACK-1", "docs/design/ai/runtime.md", "docs/adr/0012-legal-layer-stack.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/moderation-legal-stack.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Every run of a DP that judges legality (DP-LEGALITY, DP-ELIGIBILITY, DP-DECISION-RECORD, DP-RERESOLUTION, plus law-backed DP-TONE, DP-NAMING, DP-PRIVACY) applies all layers L0 to L6 cumulatively through one shared DAG step, so CAN never requests or publishes anything illegal.

## Steps
1. Add a `legalStack` step to the bounded DAG (09-u16): select layers with `LegalRegistry.stackFor(jurisdiction, at)`, call `retrieveLegal` (10-u56) with the item's typed fields and the DP, and put the returned articles with ids, corpus versions and hashes in the rules slice, outside the data block (09-u08 prompt builder).
2. Cumulative evaluation in deterministic code, never first-match: the DP output carries one finding per layer; the step blocks when any layer blocks; an L2 or other higher-layer block cannot be relaxed by a lower layer; a lower layer may restrict further. A layer with no match is recorded `none_found` with its corpus version, never a pass.
3. Fail closed: `LegalLayerMissing`, a hash-verification failure, or `escalate` from retrieval with a failed escalation yields `hold` (FAIL-CLOSED-AI-1), never publish.
4. Cache and record: the stage-output cache key (09-u19) includes `legalCacheKeyPart`, and the run record stores article ids, corpus versions and hashes, so a corpus change invalidates cached decisions and replays can resolve exact text.
5. Tests on the 10-u55 fiktiva fixtures with FakeModel scripted answers: fixture failing only at L2, only at L4, only at L6 is blocked; a lower layer cannot relax a higher; missing L3 corpus holds; low retrieval confidence on a risky topic escalates then holds; run record lists article ids and versions.
6. Terminology (D-74): where this unit says proposal read `stage_option` (and `stage_choice` at the CHOICE-GATE); the legal-stack step is also invoked by DP-CRITERIA (09-u70) for criteria and by DP-REUSE-FIT (13-u11) for archived paths, so expose it as a service with a stable input/output type and keep it free of problem-specific wiring.

## Acceptance
- A fixture failing at exactly one layer is blocked for each of L1 to L6 (table-driven test).
- A missing layer corpus holds the run (test).
- `npm run verify` is green.

## Out of scope
- Citation storage and its DB constraint (09-u57).
- Topic refusals (09-u58).
