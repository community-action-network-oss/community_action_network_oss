---
id: "10-u58"
plan: "10"
title: "Policy content: legal-stack examples and eval for DP-LEGALITY, DP-ELIGIBILITY, DP-LEGAL (layered citation, topic ban, conflict hold)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 58
depends_on: ["10-u17", "10-u15", "10-u41"]
writes: ["decision-points/DP-LEGALITY/**", "decision-points/DP-ELIGIBILITY/**", "decision-points/DP-LEGAL/**", "packs/base/rules.yaml"]
spec: ["docs/design/ai/legal-stack.md#4-how-dps-use-the-stack", "docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/spec/constitution/rules.md#TOPIC-FORBIDDEN-1", "docs/spec/constitution/rules.md#LEGAL-STACK-1", "docs/design/ai/decision-points.md", "docs/open-questions/OQ-legal-layer-conflicts.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["b68f305","3305163"]
actual_hours: null
---
## Objective
Teach and test the legal stack in the DP content: every legality finding cites layer, article and corpus version; a forbidden topic is refused with its basis; an illegal-only solution yields the stuck payload; a layer interpretation conflict holds.

## Steps
1. Extend each prompt (`RULES` slot unchanged, the retrieved articles arrive from 10-u56) and `schema.json`: `legal_findings[]` of `{layer: L0..L6, article_id, corpus_version, finding: constrains|permits|none_found|conflict}` required whenever the outcome rests on law; `reject` for a topic ban requires a finding with `topic_ban_ref`; `stuck_payload` gains `layer`, `article_id`, `corpus_version`; `conflict_note` required on a `hold` caused by layer conflict.
2. Add at least 8 examples and 10 eval cases per DP over the synthetic fiktiva corpus ids only: blocked only at L2, only at L4, only at L6 (cumulative, not first-match); lower layer tries to relax a higher one (must still block); forbidden topic (refusal with basis); legal topic elsewhere (different jurisdiction allows); illegal-only proposal (stuck payload); L1 versus L3 interpretation conflict (hold with conflict note); retrieval finds no article (recorded `none_found`, never a pass); a model-inferred ban without an indexed `topic_ban` (must hold, not reject).
3. Add rule ids LEGAL-STACK-1, LEGAL-CITE-1, TOPIC-FORBIDDEN-1 to the DP rule lists (they exist in the registry mirrored by `packs/base/rules.yaml`; the parity check of 10-u06 must stay green).
4. Adversarial cases: injection asking the model to skip a layer; citation of an article not in the retrieved slice (must fail schema or lint as unresolved).

## Acceptance
- Each DP lints; every legal outcome has an example and an eval case.
- No example cites a real article or real person; all ids resolve in the fixture corpus (10-u54 check).
- `npm run verify` green.

## Out of scope
- Real-jurisdiction legal eval (needs reviewed corpora).
