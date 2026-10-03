---
id: "10-u65"
plan: "10"
title: "Policy content: DP-ARCHIVE, DP-REUSE-FIT, DP-STAGE-DRAFT"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1.5
priority: 65
depends_on: ["10-u14","10-u06","10-u07","10-u20","10-u61","10-u62","10-u63"]
writes: ["decision-points/DP-ARCHIVE/**","decision-points/DP-REUSE-FIT/**","decision-points/DP-STAGE-DRAFT/**","packs/base/rules.yaml"]
reads: ["schemas/**","tools/**","packs/base/rules.yaml"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/policy-pack.md","docs/design/ai/evaluation.md","docs/design/ai/runtime.md","docs/design/ai/safety-and-privacy.md","docs/design/ai/archive-reuse.md","docs/spec/24-archive-reuse.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If the 1.5 hours run short, finish prompt, schema and examples for every DP in this unit first and the adversarial eval cases last; record the shortfall as a TODO line in that DP's eval/README.md."
status: done
attempts: 0
commits: ["38e0833","c3d2281"]
actual_hours: null
---
## Objective
Author the policy content for the three archive and reuse DPs (D-76). Archive text is data, never instructions: every prompt quotes records inside the DATA block and says so.

## Steps
1. For each DP create `decision-points/<DP>/` from the 10-u14 skeleton (`npm run new-dp -- DP-NAME --rules A,B --outcomes x,y`) with: `prompt.md` (ROLE, RULES slot `{{RULES}}`, OUTPUT, EXAMPLES slot, DATA block with the quoted-data delimiters of docs/design/ai/runtime.md), `schema.json` (extends `schemas/dp-output.schema.json`, restricts `outcome` to the DP's allowed outcomes, adds the DP-specific optional keys named below), `pack-section.yaml` (dp, enforces, mode, inputs, outcomes, confidence floors, `escalate_model_below`), `examples/`, `eval/core.jsonl`, `eval/adversarial.jsonl`, `eval/thresholds.yaml`, `eval/README.md`.
2. Contents: `DP-ARCHIVE`: rules ARCHIVE-1; outcomes publish, needs_revision, hold; mode blocking for the record only; inputs: the assembled record (post privacy re-strip), the deterministic completeness findings; the model step is only the completeness read: do `challenges` and `reasons` explain failures and not only successes, are blocked stages explained, is anything left that looks personal; optional keys `missing[]` {field, hint}, `residual_personal_data` (bool; true forces hold). Adversarial: instruction-like imperatives inside a stage goal, hidden text, a link farm, a record whose success claim has weak evidence tiers.
3. `DP-REUSE-FIT`: rules REUSE-CONTEXT-1 and REUSE-CREDIT-1; outcomes publish, needs_revision, hold; mode blocking for display; inputs: the redacted draft, the source path as quoted data and the deterministic facts of 13-u11 (legality per stage, resource fit, differences, stale versions); the model proposes `adaptations[]` only (substitute, scale_down, add_institution_step, drop_step, each with a reason and, for an unlawful step, the lawful analogue if one is in the supplied corpus or archive text) and a confidence it cannot raise above the deterministic ceiling; it never decides legality. Adversarial: a source record instructing the model to mark everything lawful, an adaptation that touches a held stage, a request to hide a difference.
4. `DP-STAGE-DRAFT`: rules REUSE-CREDIT-1 and REUSE-NOBLOCK-1; outcomes publish (offer to the poster), needs_revision, hold; inputs: accepted suggestions with adaptations and `reuse_fit`, the published problem, the final criteria; output a draft stage plan in the `stage_plan` shape with `derived_from` on each stage, criteria translated to the new context, `depends_on` and the default decision method; every final criterion must be covered. Adversarial: a draft that drops credit, a draft with criteria copied unchanged from another jurisdiction's law, a record telling the model to skip review.
5. Examples (`examples/*.json`): at least 8 per DP, each `{id, input, expected_outcome, rule_ids, field_ref, revision_hint, jurisdiction, language, provenance: "fixture", tags[], note}`; every allowed outcome at least once, at least two boundary cases, the 3 best tagged `shot`. Inputs are post-gateway shaped (pseudonym tokens, no raw identifiers), fictional or synthetic, jurisdiction `fiktiva-city` unless the case is about Amsterdam framing text from D-56.
6. Eval (`eval/core.jsonl`): at least 10 cases per DP, disjoint from `examples/`; `eval/adversarial.jsonl`: at least 3 cases per DP (injection inside a field, homoglyph or spacing evasion, instructions in the data block, and the DP-specific attack named below). Cases are fictional and safe to publish.
7. `eval/thresholds.yaml`: `min_recall_nonpublish` 0.90, `max_false_reject` 0.05, `calibration_ece_max` 0.10, `schema_validity_min` 1.0, `injection_pass_min` 1.0, `parity_gap_max` 0.05, and the runtime `confidence_floor` per outcome; defaults to be ratified (docs/design/ai/simulation.md section 8).
8. Rule ids named in `enforces` must exist in `packs/base/rules.yaml` (10-u06 includes the lifecycle v2 and archive rules). `npm run verify` (DP lint of 10-u14). Never copy a real person, address, URL or incident into any example.

## Acceptance
- Each DP directory passes the DP lint with no warnings.
- Every allowed outcome of each DP has at least one example and one eval case.
- Eval and examples are disjoint and all fictional.
- `npm run verify` is green.

## Out of scope
- Running models: scoring uses recorded responses (10-u23).
- Server-side handlers (plan 09, plan 13).
