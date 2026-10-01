---
id: "10-u18"
plan: "10"
title: "Policy content: DP-EVIDENCE-TIER, DP-STAGE, DP-BLOCKER, DP-CLOSURE"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 18
depends_on: ["10-u14","10-u06","10-u07","10-u20"]
writes: ["decision-points/DP-EVIDENCE-TIER/**","decision-points/DP-STAGE/**","decision-points/DP-BLOCKER/**","decision-points/DP-CLOSURE/**"]
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
Author the policy content for DP-EVIDENCE-TIER, DP-STAGE, DP-BLOCKER, DP-CLOSURE: for each DP a prompt template, an output schema, labeled examples and a held-out eval set, so the eval runner (10-u23) can score it on recorded responses. 

## Steps
1. For each DP create `decision-points/<DP>/` with: `prompt.md` (generated from the 10-u14 skeleton, then filled: ROLE, RULES slot, OUTPUT, EXAMPLES slot, DATA block with the quoted-data delimiters from docs/design/ai/runtime.md), `schema.json` (extends `schemas/dp-output.schema.json`, restricts `outcome` to the DP's allowed outcomes and adds DP-specific optional keys such as `duplicate_of` or `stuck_payload`), `pack-section.yaml` (dp, enforces, mode, inputs, outcomes, confidence floors and `escalate_model_below`), `examples/`, `eval/core.jsonl`, `eval/adversarial.jsonl`, `eval/thresholds.yaml`, `eval/README.md`.
2. Contents per DP: `DP-EVIDENCE-TIER`: rules EVID-URL-1, EVIDENCE-TIERS; outcomes publish, needs_revision, hold; focus: tier by constitution III.4 from stored URL metadata (never a live fetch), claim text matches the source description; deterministic scheme and category checks are not this prompt. `DP-STAGE`: rules STAGE-1; outcomes publish, needs_revision, hold; focus: sufficiency of stage summaries and the records behind T08, T09, T10, T12, T16, T17, T18 (proposal sets, reopen reasons, task completion, cleared blockers, pause and resume conditions). `DP-BLOCKER`: rules LEGAL-GATE-1, BLOCKER-1; outcomes publish, needs_revision, hold; focus: the stuck payload has a real blocking constraint with source and version, a recheck date and a next lawful route (T15). `DP-CLOSURE`: rules CLOSE-1; outcomes publish, needs_revision, reject, route_external, hold; focus: closure reason code matches the facts (duplicate with duplicate_of, out of scope, no longer relevant); redirect destinations are institutions or approved partners, never individuals (T19, T20).
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
