---
id: "10-u63"
plan: "10"
title: "Policy content: DP-STAGE-PLAN and DP-PUBLISH"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1.5
priority: 63
depends_on: ["10-u14","10-u06","10-u07","10-u20","10-u69","10-u60","10-u62"]
writes: ["decision-points/DP-STAGE-PLAN/**","decision-points/DP-PUBLISH/**","packs/base/rules.yaml"]
reads: ["schemas/**","tools/**","packs/base/rules.yaml"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/policy-pack.md","docs/design/ai/evaluation.md","docs/design/ai/runtime.md","docs/design/ai/safety-and-privacy.md","docs/design/ai/structured-content.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If the 1.5 hours run short, finish prompt, schema and examples for every DP in this unit first and the adversarial eval cases last; record the shortfall as a TODO line in that DP's eval/README.md."
status: doing
attempts: 0
commits: []
actual_hours: null
---
## Objective
Author the policy content for the plan check and the publication decision of lifecycle v2 (D-72, D-74).

## Steps
1. For each DP create `decision-points/<DP>/` from the 10-u14 skeleton (`npm run new-dp -- DP-NAME --rules A,B --outcomes x,y`) with: `prompt.md` (ROLE, RULES slot `{{RULES}}`, OUTPUT, EXAMPLES slot, DATA block with the quoted-data delimiters of docs/design/ai/runtime.md), `schema.json` (extends `schemas/dp-output.schema.json`, restricts `outcome` to the DP's allowed outcomes, adds the DP-specific optional keys named below), `pack-section.yaml` (dp, enforces, mode, inputs, outcomes, confidence floors, `escalate_model_below`), `examples/`, `eval/core.jsonl`, `eval/adversarial.jsonl`, `eval/thresholds.yaml`, `eval/README.md`.
2. Contents: `DP-STAGE-PLAN`: rules STAGE-GATE-1 and PLAN-CHANGE-1; outcomes publish, needs_revision, hold; mode blocking; runs on submit, on the publish run and on every plan-change proposal (T22); the deterministic DAG check (no cycle, no dangling `depends_on`, every node has name, goal, decision method and 1+ criterion) is server code (12-u01 `validatePlan`) and is NOT this prompt; the model reads coherence: do the stages cover the final criteria (each final criterion has a stage or an explicit reason), is the order sensible, are parallel stages truly independent, is any stage a duplicate or a vague catch-all; for a plan change also: is the reason given, are removed or skipped stages justified, are the final criteria still reachable. Optional keys `uncovered_final_criteria[]`, `per_stage[]` {name, hint}. Adversarial: a plan that hides the real work in a stage called "other", a plan change that silently drops a hard stage, a cycle described in prose.
3. `DP-PUBLISH`: rules REVIEW-1 and RECO-1; outcomes publish, needs_revision, reject, route_external, hold; mode blocking, aggregates; inputs: the typed outcomes of the other blocking DPs on the whole structured problem (never raw text), the volunteer review summary (counts of open, accepted and declined recommendations with the poster's reasons, no volunteer identities, and the quorum facts: completed reviews, days open), accepted archive suggestions with their fit summary (never decisive: REUSE-NOBLOCK-1 and D-74 keep one completed review mandatory), and community guideline text. The prompt must state that recommendations still open are weighed and cited, never counted as accepted, and that zero completed reviews can never publish (the server also enforces it; the DP refuses on its own too). Optional keys `open_recommendations_cited[]` {path, weight_reason}, `speedup_cited` (bool). Adversarial: a poster who declines every recommendation with empty-sounding reasons, a review summary claiming the problem was already approved, an archive suggestion presented as a substitute for review.
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
