---
id: "10-u19"
plan: "10"
title: "Policy content: DP-APPEAL, DP-ASSUMPTIONS, DP-COMPLETENESS and the ASSIST-FILL prompt"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 19
depends_on: ["10-u14","10-u06","10-u07","10-u20","10-u08"]
writes: ["decision-points/DP-APPEAL/**","decision-points/DP-ASSUMPTIONS/**","decision-points/DP-COMPLETENESS/**","decision-points/ASSIST-FILL/**"]
reads: ["schemas/**","tools/**","packs/base/rules.yaml"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/policy-pack.md","docs/design/ai/evaluation.md","docs/design/ai/runtime.md","docs/design/ai/safety-and-privacy.md","docs/design/ai/structured-content.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If the 1.5 hours run short, finish prompt, schema and examples for every DP in this unit first and the adversarial eval cases last; record the shortfall as a TODO line in that DP's eval/README.md. Never copy a real person, address or incident into an example."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Author the policy content for DP-APPEAL, DP-ASSUMPTIONS, DP-COMPLETENESS, ASSIST-FILL: for each DP a prompt template, an output schema, labeled examples and a held-out eval set, so the eval runner (10-u23) can score it on recorded responses. Use the three guidance pairs recorded by 10-u08 (`guidance-index.json`) as eval cases with `source: "x-guidance:problem.<field>"`, and add `sub-wellmeaning-wrong`, `sub-vague` and `adv-assumption-smuggle` style cases (see docs/design/ai/simulation.md section 2). For ASSIST-FILL add leakage and invented-source regression cases; its output shape is not a moderation outcome, so its `schema.json` does not extend dp-output and the DP lint treats ASSIST-FILL as the one non-moderation DP (add that exception in tools/lint-dp.mjs with a test).

## Steps
1. For each DP create `decision-points/<DP>/` with: `prompt.md` (generated from the 10-u14 skeleton, then filled: ROLE, RULES slot, OUTPUT, EXAMPLES slot, DATA block with the quoted-data delimiters from docs/design/ai/runtime.md), `schema.json` (extends `schemas/dp-output.schema.json`, restricts `outcome` to the DP's allowed outcomes and adds DP-specific optional keys such as `duplicate_of` or `stuck_payload`), `pack-section.yaml` (dp, enforces, mode, inputs, outcomes, confidence floors and `escalate_model_below`), `examples/`, `eval/core.jsonl`, `eval/adversarial.jsonl`, `eval/thresholds.yaml`, `eval/README.md`.
2. Contents per DP: `DP-APPEAL`: rules APPEAL-1; outcomes publish, needs_revision, reject, route_external, hold; focus: independent re-run of the appealed DP set with a different model or prompt variant; reads the appeal fields and the original decision record; bounded and async. `DP-ASSUMPTIONS`: rules ASSUMP-1; outcomes publish, needs_revision, hold; focus: never emits reject; factual, causal, legal, scope assumptions presented as fact; an honestly marked assumption passes; one hint per field; legal readings cite the pack version and, when unsure, ask the poster to mark it unverified. `DP-COMPLETENESS`: rules COMPLETE-1, STRUCT-ONLY-1; outcomes publish, needs_revision, hold; focus: model read after the deterministic layer: is each required field a meaningful answer to its own question; unknown and none_stated valid only where the schema allows them and with the paired settle-it field; padding is a finding. `ASSIST-FILL`: rules AI-ASSIST-1; outcomes suggestions only (not a moderation DP: its schema is `{suggestions[{field_ref, value, basis}], questions[{field_ref, text}]}` and is checked by the same lint); focus: fill-assist prompt for the private notes box; suggests values for schema fields it can ground in the notes, asks questions for the rest, never invents a source, number, date or name, never fills a field it has no notes for; leakage and invention are regression cases.
3. Examples (`examples/*.json`): at least 8 per DP, each `{id, input, expected_outcome, rule_ids, field_ref, revision_hint, jurisdiction, language, provenance: "fixture", tags[], note}`; cover every allowed outcome at least once, at least two boundary cases, and tag the 3 best as `shot` for the prompt. All inputs are post-gateway shaped (pseudonym tokens like `[PERSON_1]`, no raw identifiers), fictional or synthetic, jurisdiction `fiktiva-city` unless the case is about Amsterdam framing text from D-56.
4. Eval (`eval/core.jsonl`): at least 10 cases per DP, disjoint from `examples/` (different ids and different inputs; the lint in 10-u23 checks), same case shape plus `field_ref`. `eval/adversarial.jsonl`: at least 5 cases for DPs in the harmful classes (privacy, naming, crisis, tone, legal) and 3 for the others: injection inside a field, homoglyph or spacing evasion, split-across-fields, instructions in the data block. Cases are fictional and safe to publish.
5. `eval/thresholds.yaml`: `min_recall_harmful` (0.98 for the harmful-class DPs, else 0.90), `max_false_reject` (0.05), `calibration_ece_max` (0.10), `schema_validity_min` (1.0), `injection_pass_min` (1.0 on adversarial), `parity_gap_max` (0.05), and the runtime `confidence_floor` per outcome. Values come from docs/design/ai/simulation.md section 8 and evaluation.md; they are defaults to be ratified.
6. Prompt rules to check in each prompt: user content only inside the DATA block; the rule slice is a placeholder `{{RULES}}` filled by the server; the model is told it has no tools; the prompt asks for JSON only; no example is duplicated verbatim in the prompt and the eval set.
7. `npm run verify` (the 10-u03 lint covers file presence; the 10-u14 DP lint covers schema, outcome subset, rule ids present in `packs/base/rules.yaml`, example shape and disjointness). Fix findings.

## Acceptance
- Each DP directory passes the DP lint with no warnings.
- Every allowed outcome of each DP has at least one example and one eval case.
- Eval and examples are disjoint (lint) and all fictional (no real names, numbers, URLs).
- `npm run verify` is green.

## Out of scope
- Running models: scoring uses recorded responses (10-u23).
- Server-side deterministic layers (keyword crisis detector, regex redaction).
- Live-model tuning of thresholds (plan 11, founder-gated).
