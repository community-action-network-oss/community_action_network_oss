---
id: "10-u11"
plan: "10"
title: "Content schemas v1: stage_option, stage_choice, stage_evidence"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 11
depends_on: ["10-u07", "10-u69"]
writes: ["content-schemas/stage_option/**", "content-schemas/stage_choice/**", "content-schemas/stage_evidence/**", "limits.yaml", "test/schema-stage-*.test.mjs"]
reads: []
spec: ["docs/design/ai/structured-content.md#1-content-types-and-their-schemas", "docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01b-stages.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If a field's bounds are unclear, use the bounds from docs/design/ai/decision-points.md \"Policy-pack values\" and note the guess in the schema's `x-guidance.why`; never invent a required field the structured-content tables do not list."
status: done
attempts: 0
commits: ["b0d923f"]
actual_hours: 0.1
---
## Objective
Schemas for the stage-level content types of lifecycle v2 (D-72): `stage_option` (replaces the old `proposal`, D-74), `stage_choice` and `stage_evidence`. The decision record, task and verification schemas are 10-u70.

## Steps
1. stage_option: `stage_ref`, `option_statement`, `mechanism`, `responsible_role`, `authority_and_legal_basis`, `cost_estimate` (a band plus a free number, never required to be exact), `funding`, `how_it_meets_stage_criteria` (maps to criterion refs of the stage), `risks_and_rights_impact`, `lawful_alternatives[]`, `dependencies[]`, `assumptions[]`; guidance on `how_it_meets_stage_criteria`: how anyone could tell the option meets the stage criteria (DP-STAGE-RESOLUTION and DP-LEGALITY read it); `x-checks.dps` adds DP-LEGALITY and DP-CONTRIB-RELEVANCE.
2. stage_choice: `stage_ref`, `chosen_option_ids[]` or `steps`, `decision_method` (`poster_after_input`, `community_vote`, `steward`, `other_named`), `decider_role`, `authority`, `rationale`, `dissent_notes[]`, `legal_gate_record` {constraint_checked, source_ref, layer, result}, `steps[]` (each: step, owner_role, done_criterion); adds DP-DECISION-RECORD (the CHOICE-GATE) and DP-LEGALITY. `decider_role` is a role string only (`x-checks.roles_only`).
3. stage_evidence: `stage_ref`, `criterion_ref` (each item addresses one criterion of the stage), `evidence_refs[]` (URL, tier request, description), `observation_date`, `outcome_statement`, `what_the_evidence_does_not_show`; adds DP-STAGE-RESOLUTION, DP-EVIDENCE-TIER and DP-SOURCE-TRUST (SOURCE-1 on cited sources). The `evidence_url` widget forbids uploads of people.
4. Every schema file follows docs/design/ai/structured-content.md section 2: JSON Schema 2020-12 with `id`, `version: "1.0.0"`, `pack: "base@1.0.0"`, and per property `x-ui` (widget, label_msg, help_msg, order, group), `x-guidance` (why, good, bad, min_chars, max_chars; good and bad examples are fictional, one short sentence each) and `x-checks` (dps, enums, allow_unknown, none_stated). Message ids in `x-ui` resolve in `content-schemas/<type>/messages.en.json` (flat id to string; plain language, no em or en dashes). Each schema folder holds `examples/valid-*.json` (at least 2) and `examples/invalid-*.json` (at least 3, each named for what it breaks) that the unit test validates with the 10-u03 tooling.
5. Bounds into `limits.yaml`; example submissions use the fictional city; for stage_choice add an invalid example "decider is a named person" (shape allows a role string only through `x-checks.roles_only`) and for stage_evidence "criterion_ref missing".
6. Tests as in 10-u08; add a cross-schema test that `stage_choice.chosen_option_ids` and `stage_evidence.criterion_ref` refer to fields that exist in stage_option and in the stage criteria shape of 10-u69.

## Acceptance
- Three schemas validate, with messages and examples.
- Required lists equal structured-content.md section 1.
- The cross-schema reference test passes.
- `npm run verify` green.

## Out of scope
- State machine effects of T-ids and ST-ids (server).
- decision_record, task and verification (10-u70).
- Prompts.
