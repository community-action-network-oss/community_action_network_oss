---
id: "10-u10"
plan: "10"
title: "Content schemas v1: remaining contribution types"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 10
depends_on: ["10-u09"]
writes: ["content-schemas/contribution.*/**","limits.yaml","test/schema-contribution-b.test.mjs"]
reads: []
spec: ["docs/design/ai/structured-content.md#1-content-types-and-their-schemas","docs/spec/01-slice-1-brief.md#6-contribution-types"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If a field's bounds are unclear, use the bounds from docs/design/ai/decision-points.md \"Policy-pack values\" and note the guess in the schema's `x-guidance.why`; never invent a required field the structured-content tables do not list."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The other contribution types: constraint, stakeholder_perspective, proposed_solution, proposal_improvement, risk, implementation_offer, progress_update, verification_evidence, and a reserved moderation_feedback stub.

## Steps
1. Folders `contribution.<type>/` as in 10-u09, referencing the common fragment. Extra required fields: constraint (constraint, source law|budget|physical|institutional, source_ref, recheck_condition); stakeholder_perspective (group, concern, basis, what_would_help; `group` widget forbids a person: `x-checks.group_not_person: true`); proposed_solution and proposal_improvement (mechanism, responsible_role, authority, cost, success_metric, risks, lawful_alternatives; improvement adds improves and change); risk (risk, likelihood_basis, who_bears_it, mitigation_idea); implementation_offer (offered_work, role_capacity, limits, lawful_basis); progress_update (task_ref, done, not_done, blockers, next_step); verification_evidence (url, metric_addressed, observation_date, source_role, what_it_does_not_show).
2. `moderation_feedback`: a schema with `"x-reserved": true` and no required fields beyond type, `status: reserved`; lint must accept the `x-reserved` marker and the renderer treats it as unsupported (document in the schema README).
3. Every schema file follows docs/design/ai/structured-content.md section 2: JSON Schema 2020-12 with `id`, `version: "1.0.0"`, `pack: "base@1.0.0"`, and per property `x-ui` (widget, label_msg, help_msg, order, group), `x-guidance` (why, good, bad, min_chars, max_chars; good and bad examples are fictional, one short sentence each) and `x-checks` (dps, enums, allow_unknown, none_stated). Message ids in `x-ui` resolve in `content-schemas/<type>/messages.en.json` (flat id to string; plain language, no em or en dashes). Required list matches the table in structured-content.md. Each schema folder also holds `examples/valid-*.json` (at least 2) and `examples/invalid-*.json` (at least 3, each named for what it breaks) that the unit test validates with the 10-u03 tooling.
4. `x-checks.dps`: solution types, offers and improvements add DP-LEGALITY; progress_update adds DP-STAGE; verification_evidence adds DP-VERIFICATION and DP-EVIDENCE-TIER; add `cooldown_exempt: true` to progress_update and verification_evidence consistent with `limits.yaml` `cooldowns.exempt_types` (lint compares the two).
5. Tests as in 10-u09, plus the cooldown-exempt consistency check and a test that every contribution type named in structured-content.md has a folder.

## Acceptance
- All remaining contribution types have schemas, messages and examples.
- Exempt-type flags agree with limits.yaml (test).
- A stakeholder_perspective naming a person field shape is rejected by shape (test).
- `npm run verify` green.

## Out of scope
- moderation_feedback content (reserved).
- Prompts (10-u15 to 10-u19).
