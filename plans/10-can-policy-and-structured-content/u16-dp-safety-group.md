---
id: "10-u16"
plan: "10"
title: "Policy content: DP-PRIVACY, DP-NAMING, DP-TONE, DP-CRISIS"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 16
depends_on: ["10-u14","10-u06","10-u07","10-u20"]
writes: ["decision-points/DP-PRIVACY/**","decision-points/DP-NAMING/**","decision-points/DP-TONE/**","decision-points/DP-CRISIS/**"]
reads: ["schemas/**","tools/**","packs/base/rules.yaml"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/policy-pack.md","docs/design/ai/evaluation.md","docs/design/ai/runtime.md","docs/design/ai/safety-and-privacy.md","docs/design/ai/structured-content.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If the 1.5 hours run short, finish prompt, schema and examples for every DP in this unit first and the adversarial eval cases last; record the shortfall as a TODO line in that DP's eval/README.md. Never copy a real person, address or incident into an example."
status: done
attempts: 0
commits: ["f83334d"]
actual_hours: 0.1
---
## Objective
Author the policy content for DP-PRIVACY, DP-NAMING, DP-TONE, DP-CRISIS: for each DP a prompt template, an output schema, labeled examples and a held-out eval set, so the eval runner (10-u23) can score it on recorded responses. 

## Steps
1. For each DP create `decision-points/<DP>/` with: `prompt.md` (generated from the 10-u14 skeleton, then filled: ROLE, RULES slot, OUTPUT, EXAMPLES slot, DATA block with the quoted-data delimiters from docs/design/ai/runtime.md), `schema.json` (extends `schemas/dp-output.schema.json`, restricts `outcome` to the DP's allowed outcomes and adds DP-specific optional keys such as `duplicate_of` or `stuck_payload`), `pack-section.yaml` (dp, enforces, mode, inputs, outcomes, confidence floors and `escalate_model_below`), `examples/`, `eval/core.jsonl`, `eval/adversarial.jsonl`, `eval/thresholds.yaml`, `eval/README.md`.
2. Contents per DP: `DP-PRIVACY`: rules PRIV-GATE-1; outcomes publish, needs_revision, reject, hold; focus: runs after deterministic redaction; judges residual and indirect identifiers (rare combinations of place, role, time, split across fields); any uncertainty about a person identifier is needs_revision with a span, never publish. `DP-NAMING`: rules NAME-1; outcomes publish, needs_revision, reject, hold; focus: person entities in public text, office alias suggestion in the pattern from the jurisdiction pack, institutions and offices allowed, election layer off by default. `DP-TONE`: rules TONE-1; outcomes publish, needs_revision, reject, hold; focus: abuse, threats, incitement, escalation, conflict framing, coded and misspelled variants; a threat of violence also feeds DP-CRISIS; hints suggest restating facts. `DP-CRISIS`: rules CRISIS-STATIC-1, SCOPE-1; outcomes route_external, escalate_human, hold, publish (no signal); focus: runs first on every text-bearing event; credible imminent danger only gives escalate_human; all examples are invented phrasing with no real helpline numbers, no methods and no real people; the deterministic keyword layer is out of scope here (server).
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
