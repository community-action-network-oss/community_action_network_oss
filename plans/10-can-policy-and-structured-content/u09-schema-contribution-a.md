---
id: "10-u09"
plan: "10"
title: "Content schemas v1: contribution common fields and first seven types"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 9
depends_on: ["10-u07"]
writes: ["content-schemas/contribution.*/**","content-schemas/_common/**","limits.yaml","test/schema-contribution-a.test.mjs"]
reads: []
spec: ["docs/design/ai/structured-content.md#1-content-types-and-their-schemas","docs/spec/01-slice-1-brief.md#6-contribution-types"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If a field's bounds are unclear, use the bounds from docs/design/ai/decision-points.md \"Policy-pack values\" and note the guess in the schema's `x-guidance.why`; never invent a required field the structured-content tables do not list."
status: done
attempts: 0
commits: ["41d3274"]
actual_hours: 0.1
---
## Objective
The shared contribution fields and the first seven contribution types: clarifying_question, observation, personal_experience, factual_claim, evidence, interpretation, root_cause.

## Steps
1. Create `content-schemas/_common/contribution-common.json` as a `$defs` fragment (type, target, claim, basis firsthand|cited|inferred, evidence_refs, uncertainty, assumptions) that each type schema references with `$ref` by relative path; teach nothing new to tooling: if `ajv` cannot resolve the relative `$ref`, inline the fragment with a build step in `tools/inline-common.mjs` and commit the inlined output (document which in the schema README).
2. One folder per type `content-schemas/contribution.<type>/` with `schema.json`, `messages.en.json`, `examples/`. Extra required fields from structured-content.md: clarifying_question (missing_information, why_it_matters, who_could_answer role); observation (what_observed, when, where_coarse, how_observed); personal_experience (pattern_illustrated, period; guidance forbids case narrative; `x-checks.dps` includes DP-PRIVACY first); factual_claim (statement, source_ref or none_stated, answers_contribution_id optional); evidence (url, source_description, claim_supported, what_it_does_not_show; URL only, no uploads); interpretation (reading_of, alternatives_considered); root_cause (hypothesis, mechanism, supporting_evidence_refs, test_that_would_disprove_it).
3. Every schema file follows docs/design/ai/structured-content.md section 2: JSON Schema 2020-12 with `id`, `version: "1.0.0"`, `pack: "base@1.0.0"`, and per property `x-ui` (widget, label_msg, help_msg, order, group), `x-guidance` (why, good, bad, min_chars, max_chars; good and bad examples are fictional, one short sentence each) and `x-checks` (dps, enums, allow_unknown, none_stated). Message ids in `x-ui` resolve in `content-schemas/<type>/messages.en.json` (flat id to string; plain language, no em or en dashes). Required list matches the table in structured-content.md. Each schema folder also holds `examples/valid-*.json` (at least 2) and `examples/invalid-*.json` (at least 3, each named for what it breaks) that the unit test validates with the 10-u03 tooling.
4. Contribution bounds into `limits.yaml` (`fields.contribution.*`): claim 20 to 500 chars, evidence refs 0 to 6; `x-checks.dps` always includes DP-CONTRIB-RELEVANCE, DP-PRIVACY, DP-NAMING, DP-TONE, DP-CRISIS, DP-ASSUMPTIONS, DP-COMPLETENESS; evidence adds DP-EVIDENCE-TIER; the solution types add DP-LEGALITY (10-u10).
5. Tests mirror 10-u08 per type: meta-valid, valid and invalid examples, message ids, required list equals the table, `source_ref` or `none_stated` rule for factual_claim, `personal_experience` rejects a `narrative` property (`additionalProperties: false`).

## Acceptance
- Seven type schemas plus the common fragment validate and each has examples.
- Required extra fields equal the structured-content.md table (test).
- personal_experience cannot carry a free narrative field.
- `npm run verify` green.

## Out of scope
- The remaining contribution types (10-u10).
- DP prompts.
