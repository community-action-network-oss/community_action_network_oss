---
id: "10-u70"
plan: "10"
title: "Content schemas v1: decision_record (records stage_choice), task, verification"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1.2
priority: 14
depends_on: ["10-u11","10-u69"]
writes: ["content-schemas/decision_record/**","content-schemas/task/**","content-schemas/verification/**","limits.yaml","test/schema-decision-task.test.mjs"]
reads: ["schemas/**","tools/**"]
spec: ["docs/design/ai/structured-content.md#1-content-types-and-their-schemas","docs/spec/01b-stages.md","docs/spec/01a-lifecycle.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["7adca17"]
actual_hours: 0.1
---
## Objective
The remaining resolution schemas under lifecycle v2: the decision record now records a `stage_choice`, tasks belong to a stage, and verification judges the final acceptance criteria.

## Steps
1. decision_record: `stage_choice_ref`, `method`, `rationale`, `decider_role`, `authority`, `dissent_notes[]`, `legal_gate_record` {constraint_checked, source_ref, layer, result}, `assumptions[]`, `review_date`; adds DP-DECISION-RECORD and DP-LEGALITY (it is the audit record of a stage choice, produced at the CHOICE-GATE).
2. task: `stage_ref`, `question_answered`, `deliverable`, `done_criteria[]`, `owner_role` (tasks belong to a stage); verification: `final_criterion_refs[]` (each final acceptance criterion addressed), `evidence_refs[]` (each with tier request), `outcome_statement` per criterion, `what_the_evidence_does_not_show`; adds DP-VERIFICATION, DP-EVIDENCE-TIER, DP-SOURCE-TRUST and (for tasks) DP-STAGE-RESOLUTION via the stage evidence.
3. Every schema file follows docs/design/ai/structured-content.md section 2: JSON Schema 2020-12 with `id`, `version: "1.0.0"`, `pack: "base@1.0.0"`, and per property `x-ui`, `x-guidance` (why, good, bad, min_chars, max_chars; fictional one-sentence examples) and `x-checks` (dps, enums, allow_unknown, none_stated). Message ids resolve in `content-schemas/<type>/messages.en.json` (plain language, no em or en dashes). Each schema folder holds `examples/valid-*.json` (at least 2) and `examples/invalid-*.json` (at least 3, named for what they break); the unit test validates them with the 10-u03 tooling.
4. Bounds into limits.yaml; invalid examples include "decider is a named person" and "verification without a criterion ref"; cross-schema test: `verification.final_criterion_refs` use the `criterion` shape of 10-u69 and `decision_record.stage_choice_ref` refers to a field that exists in 10-u11.

## Acceptance
- Schemas validate, required lists match structured-content.md.
- Every message id used exists in messages.en.json.
- Valid examples pass and invalid examples fail for the stated reason.
- `npm run verify` is green.

## Out of scope
- The renderer (10-u05).
- Server enforcement.
