---
id: "10-u69"
plan: "10"
title: "Problem schema parts: context_profile, stage_plan and affected_area"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1.5
priority: 69
depends_on: ["10-u08","10-u07"]
writes: ["content-schemas/problem/**","content-schemas/_shared/**","limits.yaml","test/schema-problem-v2.test.mjs"]
reads: ["schemas/**","tools/**"]
spec: ["docs/design/ai/structured-content.md#3-the-problem-schema-field-by-field","docs/design/ai/archive-reuse.md#3-context_profile","docs/spec/01b-stages.md","docs/design/location/attestation.md#2-area-model","docs/spec/01a-lifecycle.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Complete the problem schema with the three structured parts that sit beside the 16 core fields: field 15 `context_profile` (D-76), the optional `stage_plan` DAG (D-72), and `affected_area` (D-73).

## Steps
1. Shared fragments in `content-schemas/_shared/`: `criterion` {statement, measure, target?, evidence_hint?, deadline?}, `stage_node` {name, goal, acceptance_criteria[] (1+ `criterion`), decision_method poster_after_input|community_vote|steward|other_named, depends_on[] (stage names), required (default true), needs_choice, auto_start}, `bands.json` (shared with 10-u61).
2. Problem schema additions: field 15 `context_profile` with the dimensions of archive-reuse.md section 3 (`problem_type`, `category`, `population_scale` band, `geography` {country, region, settlement_class, climate_class}, `resource_band`, `budget_band` (both `x-checks.private_until_publication: true`), `institutions[]` roles only, `legal_stack` (read-only, resolver-derived: `x-ui.widget: readonly`), `language` BCP 47, `constraints[]` typed legal|time|skills|political|physical); every dimension allows `unknown` (`x-checks.allow_unknown`). Optional `stage_plan` (array of `stage_node`, `x-ui.widget: stage_plan`, slot for the editor of plan 12) with `x-checks.dps` DP-STAGE-PLAN and DP-CRITERIA; the `classic-5` and one-stage templates as `examples/template-classic-5.json` and `template-one-stage.json`. Optional `affected_area` (`x-ui.widget: area_picker`, value is a reference `{area_version}` into the area API of 14-u01; the polygon is never inside the problem body; `x-checks.reviewable: true`).
3. Reserved `$ref` slots left by 10-u08 are now filled; the problem `required` list is unchanged (stage_plan, affected_area and context_profile are optional at schema level; CRITERIA-1 needs the final criteria, enforced already; the server decides whether a missing affected_area blocks T01 later through a pack value).
4. Every schema file follows docs/design/ai/structured-content.md section 2: JSON Schema 2020-12 with `id`, `version: "1.0.0"`, `pack: "base@1.0.0"`, and per property `x-ui`, `x-guidance` (why, good, bad, min_chars, max_chars; fictional one-sentence examples) and `x-checks` (dps, enums, allow_unknown, none_stated). Message ids resolve in `content-schemas/<type>/messages.en.json` (plain language, no em or en dashes). Each schema folder holds `examples/valid-*.json` (at least 2) and `examples/invalid-*.json` (at least 3, named for what they break); the unit test validates them with the 10-u03 tooling.
5. Examples: valid problem with a two-parallel-stage plan (seed 1 shape, fictional), valid with classic-5, invalid: a stage without criteria, a stage `depends_on` naming no stage, a duplicate stage name, `context_profile` with an unknown taxonomy id (shape check against `archive.taxonomy` once 10-u66 exists, a lint no-op until then), `geography` with a street address. A cycle is shape-valid and listed as "fails DP-STAGE-PLAN / validatePlan" (the layer split is documented).

## Acceptance
- Schemas validate, required lists match structured-content.md.
- Every message id used exists in messages.en.json.
- Valid examples pass and invalid examples fail for the stated reason.
- `npm run verify` is green.

## Out of scope
- The renderer (10-u05).
- Server enforcement.
