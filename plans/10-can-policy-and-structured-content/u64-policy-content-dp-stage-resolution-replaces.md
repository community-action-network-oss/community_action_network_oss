---
id: "10-u64"
plan: "10"
title: "Policy content: DP-STAGE-RESOLUTION (replaces DP-STAGE)"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1.5
priority: 64
depends_on: ["10-u14","10-u06","10-u07","10-u20","10-u11","10-u62"]
writes: ["decision-points/DP-STAGE-RESOLUTION/**","packs/base/rules.yaml"]
reads: ["schemas/**","tools/**","packs/base/rules.yaml"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/policy-pack.md","docs/design/ai/evaluation.md","docs/design/ai/runtime.md","docs/design/ai/safety-and-privacy.md","docs/design/ai/structured-content.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If the 1.5 hours run short, finish prompt, schema and examples for every DP in this unit first and the adversarial eval cases last; record the shortfall as a TODO line in that DP's eval/README.md."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Author the policy content for stage resolution (ST04 to ST06, STAGE-RESOLVE-1), appealable.

## Steps
1. For each DP create `decision-points/<DP>/` from the 10-u14 skeleton (`npm run new-dp -- DP-NAME --rules A,B --outcomes x,y`) with: `prompt.md` (ROLE, RULES slot `{{RULES}}`, OUTPUT, EXAMPLES slot, DATA block with the quoted-data delimiters of docs/design/ai/runtime.md), `schema.json` (extends `schemas/dp-output.schema.json`, restricts `outcome` to the DP's allowed outcomes, adds the DP-specific optional keys named below), `pack-section.yaml` (dp, enforces, mode, inputs, outcomes, confidence floors, `escalate_model_below`), `examples/`, `eval/core.jsonl`, `eval/adversarial.jsonl`, `eval/thresholds.yaml`, `eval/README.md`.
2. Contents: `DP-STAGE-RESOLUTION`: rules STAGE-RESOLVE-1 and STAGE-GATE-1; outcomes publish (the stage resolves), needs_revision (the stage stays active and the unmet criteria are named), hold; mode blocking, and async when a rule or policy change touches a resolved stage (then keep, annotate or reopen is DP-RERESOLUTION, 10-u59); inputs: the stage criteria, the recorded `stage_choice` and its steps, `stage_evidence` items with tiers (DP-EVIDENCE-TIER) and the poster's outcome statements; focus: every criterion met by evidence that addresses it, what the evidence does not show, criteria met only by the poster's own say-so (needs_revision), the choice gate recorded when the stage needs a choice. Output keys: required `per_criterion[]` {criterion_ref, met (bool), evidence_ids[], hint}; a `publish` with any `met: false` is invalid (schema `if/then`). Adversarial: evidence that restates the criterion, a link to a page about something else, evidence dated before the stage started, instructions hidden in an evidence description.
3. Also add the lint check that no DP named DP-STAGE exists (retired) and that the pack manifest lists DP-STAGE-RESOLUTION with `appealable: true`.
4. Examples (`examples/*.json`): at least 8 per DP, each `{id, input, expected_outcome, rule_ids, field_ref, revision_hint, jurisdiction, language, provenance: "fixture", tags[], note}`; every allowed outcome at least once, at least two boundary cases, the 3 best tagged `shot`. Inputs are post-gateway shaped (pseudonym tokens, no raw identifiers), fictional or synthetic, jurisdiction `fiktiva-city` unless the case is about Amsterdam framing text from D-56.
5. Eval (`eval/core.jsonl`): at least 10 cases per DP, disjoint from `examples/`; `eval/adversarial.jsonl`: at least 3 cases per DP (injection inside a field, homoglyph or spacing evasion, instructions in the data block, and the DP-specific attack named below). Cases are fictional and safe to publish.
6. `eval/thresholds.yaml`: `min_recall_nonpublish` 0.90, `max_false_reject` 0.05, `calibration_ece_max` 0.10, `schema_validity_min` 1.0, `injection_pass_min` 1.0, `parity_gap_max` 0.05, and the runtime `confidence_floor` per outcome; defaults to be ratified (docs/design/ai/simulation.md section 8).
7. Rule ids named in `enforces` must exist in `packs/base/rules.yaml` (10-u06 includes the lifecycle v2 and archive rules). `npm run verify` (DP lint of 10-u14). Never copy a real person, address, URL or incident into any example.

## Acceptance
- Each DP directory passes the DP lint with no warnings.
- Every allowed outcome of each DP has at least one example and one eval case.
- Eval and examples are disjoint and all fictional.
- `npm run verify` is green.

## Out of scope
- Running models: scoring uses recorded responses (10-u23).
- Server-side handlers (plan 09, plan 13).
