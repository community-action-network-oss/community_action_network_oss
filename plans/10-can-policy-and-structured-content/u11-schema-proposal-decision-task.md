---
id: "10-u11"
plan: "10"
title: "Content schemas v1: proposal, decision_record, task, verification"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 11
depends_on: ["10-u07"]
writes: ["content-schemas/proposal/**","content-schemas/decision_record/**","content-schemas/task/**","content-schemas/verification/**","limits.yaml","test/schema-resolution.test.mjs"]
reads: []
spec: ["docs/design/ai/structured-content.md#1-content-types-and-their-schemas","docs/spec/01-slice-1-brief.md#4-lifecycle"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If a field's bounds are unclear, use the bounds from docs/design/ai/decision-points.md \"Policy-pack values\" and note the guess in the schema's `x-guidance.why`; never invent a required field the structured-content tables do not list."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Schemas for the resolution content types: proposal, decision record, task, and verification.

## Steps
1. proposal: mechanism, responsible_role, authority_and_legal_basis, cost_estimate, funding, success_metric, risks_and_rights_impact, dependencies[], verification_plan, lawful_alternatives_considered[], assumptions[]; guidance on `success_metric`: how anyone could tell it worked (DP-VERIFICATION later reads it); `x-checks.dps` adds DP-LEGALITY, DP-STAGE.
2. decision_record: chosen_proposal (ref), method, rationale, decider_role, authority, dissent_notes[], legal_gate_record {constraint_checked, source_ref, result}, assumptions[], review_date; adds DP-DECISION-RECORD, DP-LEGALITY.
3. task: question_answered, deliverable, done_criteria[], owner_role; verification: success_metric_restated, evidence_refs[] (each with tier request), outcome_statement, what_the_evidence_does_not_show; adds DP-VERIFICATION, DP-EVIDENCE-TIER, DP-STAGE.
4. Every schema file follows docs/design/ai/structured-content.md section 2: JSON Schema 2020-12 with `id`, `version: "1.0.0"`, `pack: "base@1.0.0"`, and per property `x-ui` (widget, label_msg, help_msg, order, group), `x-guidance` (why, good, bad, min_chars, max_chars; good and bad examples are fictional, one short sentence each) and `x-checks` (dps, enums, allow_unknown, none_stated). Message ids in `x-ui` resolve in `content-schemas/<type>/messages.en.json` (flat id to string; plain language, no em or en dashes). Required list matches the table in structured-content.md. Each schema folder also holds `examples/valid-*.json` (at least 2) and `examples/invalid-*.json` (at least 3, each named for what it breaks) that the unit test validates with the 10-u03 tooling.
5. Bounds into `limits.yaml`; example submissions use the fictional city; for decision_record add an invalid example "decider is a named person" (shape allows a role string only through `x-checks.roles_only`).
6. Tests as in 10-u08; add a cross-schema test that `decision_record.chosen_proposal` and `verification.success_metric_restated` reference fields that exist in proposal.

## Acceptance
- Four schemas validate, with messages and examples.
- Required lists equal structured-content.md.
- The cross-schema reference test passes.
- `npm run verify` green.

## Out of scope
- State machine effects of T-ids (server).
- Prompts.
