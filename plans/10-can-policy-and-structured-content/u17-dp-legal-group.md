---
id: "10-u17"
plan: "10"
title: "Policy content: DP-LEGALITY, DP-LEGAL, DP-DECISION-RECORD, DP-VERIFICATION"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 17
depends_on: ["10-u14","10-u06","10-u07","10-u20"]
writes: ["decision-points/DP-LEGALITY/**","decision-points/DP-LEGAL/**","decision-points/DP-DECISION-RECORD/**","decision-points/DP-VERIFICATION/**"]
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
Author the policy content for DP-LEGALITY, DP-LEGAL, DP-DECISION-RECORD, DP-VERIFICATION: for each DP a prompt template, an output schema, labeled examples and a held-out eval set, so the eval runner (10-u23) can score it on recorded responses. 

## Steps
1. For each DP create `decision-points/<DP>/` with: `prompt.md` (generated from the 10-u14 skeleton, then filled: ROLE, RULES slot, OUTPUT, EXAMPLES slot, DATA block with the quoted-data delimiters from docs/design/ai/runtime.md), `schema.json` (extends `schemas/dp-output.schema.json`, restricts `outcome` to the DP's allowed outcomes and adds DP-specific optional keys such as `duplicate_of` or `stuck_payload`), `pack-section.yaml` (dp, enforces, mode, inputs, outcomes, confidence floors and `escalate_model_below`), `examples/`, `eval/core.jsonl`, `eval/adversarial.jsonl`, `eval/thresholds.yaml`, `eval/README.md`.
2. Contents per DP: `DP-LEGALITY`: rules LEGAL-GATE-1; outcomes publish, needs_revision, reject, hold; focus: dual legality gate on a proposal (constitution layer and jurisdiction pack); a blocked proposal yields the stuck payload (blocking constraint, source and version, blocked actions, recheck condition); never legal advice. `DP-LEGAL`: rules LEGAL-LANE-1; outcomes escalate_human, hold, publish (no signal); focus: subpoena or law-enforcement content, requests about specific people, claims needing counsel; escalate_human only to the legal lane; most inputs are no signal. `DP-DECISION-RECORD`: rules DECISION-REC-1, LEGAL-GATE-1; outcomes publish, needs_revision, hold; focus: completeness and consistency of the record (chosen proposal, method, rationale, decider role, authority, dissent notes, legal-gate record); never judges whether the decision is good. `DP-VERIFICATION`: rules VERIFY-1; outcomes publish, needs_revision, reject, hold; focus: evidence bears on the proposal's success metric and the outcome statement answers it; a finished task alone is not solved; threshold default from OQ-solved-evidence-threshold lives in thresholds.yaml.
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
