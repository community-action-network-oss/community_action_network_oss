---
id: "10-u62"
plan: "10"
title: "Policy content: DP-SOURCE-TRUST and DP-CRITERIA"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1.5
priority: 62
depends_on: ["10-u14","10-u06","10-u07","10-u20","10-u08","10-u11"]
writes: ["decision-points/DP-SOURCE-TRUST/**","decision-points/DP-CRITERIA/**","packs/base/rules.yaml"]
reads: ["schemas/**","tools/**","packs/base/rules.yaml"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/policy-pack.md","docs/design/ai/evaluation.md","docs/design/ai/runtime.md","docs/design/ai/safety-and-privacy.md","docs/design/ai/structured-content.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If the 1.5 hours run short, finish prompt, schema and examples for every DP in this unit first and the adversarial eval cases last; record the shortfall as a TODO line in that DP's eval/README.md."
status: done
attempts: 0
commits: ["32998dd"]
actual_hours: null
---
## Objective
Author the policy content for the two new publication-time DPs of lifecycle v2 (D-72).

## Steps
1. For each DP create `decision-points/<DP>/` from the 10-u14 skeleton (`npm run new-dp -- DP-NAME --rules A,B --outcomes x,y`) with: `prompt.md` (ROLE, RULES slot `{{RULES}}`, OUTPUT, EXAMPLES slot, DATA block with the quoted-data delimiters of docs/design/ai/runtime.md), `schema.json` (extends `schemas/dp-output.schema.json`, restricts `outcome` to the DP's allowed outcomes, adds the DP-specific optional keys named below), `pack-section.yaml` (dp, enforces, mode, inputs, outcomes, confidence floors, `escalate_model_below`), `examples/`, `eval/core.jsonl`, `eval/adversarial.jsonl`, `eval/thresholds.yaml`, `eval/README.md`.
2. Contents: `DP-SOURCE-TRUST`: rules SOURCE-1 and EVID-URL-1; outcomes publish, needs_revision, hold; mode blocking; inputs `sources[]` (and cited stage evidence on ST05); deterministic checks are not this prompt (scheme, category allowlist); focus: does each cited URI belong to a trusted category or is it corroborated, does the description establish that the issue is real, is the authenticity note credible (no fetch of the live page; the model reads stored metadata and the poster's note), a "no source yet" note yields needs_revision with a hint to add one or to ask reviewers. Optional output keys: `per_source[]` {ref, verdict, reason}. Adversarial: a source that is a claim restated as its own proof, a look-alike domain, a source page claiming to instruct the reviewer. `DP-CRITERIA`: rules CRITERIA-1; outcomes publish, needs_revision, reject, hold; focus: each criterion is measurable (a way to tell it happened), lawful (DP-LEGALITY layers apply: no criterion requires an unlawful act, reject only for that), fits the problem (final criteria restate `desired_outcome` in testable form; stage criteria serve a final criterion); optional keys `per_criterion[]` {ref, measurable, lawful, fits, hint}. Adversarial: vacuous criteria ("things improve"), a criterion that requires an illegal act, a criterion that is unreachable by design.
3. Examples (`examples/*.json`): at least 8 per DP, each `{id, input, expected_outcome, rule_ids, field_ref, revision_hint, jurisdiction, language, provenance: "fixture", tags[], note}`; every allowed outcome at least once, at least two boundary cases, the 3 best tagged `shot`. Inputs are post-gateway shaped (pseudonym tokens, no raw identifiers), fictional or synthetic, jurisdiction `fiktiva-city` unless the case is about Amsterdam framing text from D-56.
4. Eval (`eval/core.jsonl`): at least 10 cases per DP, disjoint from `examples/`; `eval/adversarial.jsonl`: at least 3 cases per DP (injection inside a field, homoglyph or spacing evasion, instructions in the data block, and the DP-specific attack named below). Cases are fictional and safe to publish.
5. `eval/thresholds.yaml`: `min_recall_nonpublish` 0.90, `max_false_reject` 0.05, `calibration_ece_max` 0.10, `schema_validity_min` 1.0, `injection_pass_min` 1.0, `parity_gap_max` 0.05, and the runtime `confidence_floor` per outcome; defaults to be ratified (docs/design/ai/simulation.md section 8).
6. Rule ids named in `enforces` must exist in `packs/base/rules.yaml` (10-u06 includes the lifecycle v2 and archive rules). `npm run verify` (DP lint of 10-u14). Never copy a real person, address, URL or incident into any example.

## Acceptance
- Each DP directory passes the DP lint with no warnings.
- Every allowed outcome of each DP has at least one example and one eval case.
- Eval and examples are disjoint and all fictional.
- `npm run verify` is green.

## Out of scope
- Running models: scoring uses recorded responses (10-u23).
- Server-side handlers (plan 09, plan 13).
