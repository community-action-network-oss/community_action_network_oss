---
id: "10-u61"
plan: "10"
title: "Content schemas v1: archive_record, path_suggestion, stage_draft"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1.5
priority: 13
depends_on: ["10-u69","10-u07"]
writes: ["content-schemas/archive_record/**","content-schemas/path_suggestion/**","content-schemas/stage_draft/**","limits.yaml","test/schema-archive-*.test.mjs"]
reads: ["schemas/**","tools/**"]
spec: ["docs/design/ai/archive-reuse.md#1-archive_record-schema","docs/design/ai/archive-reuse.md#3-context_profile","docs/design/ai/archive-reuse.md#7-path_suggestion-lifecycle","docs/design/ai/archive-reuse.md#8-dp-stage-draft","docs/spec/24-archive-reuse.md","docs/design/ai/structured-content.md#2-schema-format"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Machine schemas for the Archive (D-76), versioned like every schema (D-58): they are the contract between the server (plan 13), the eval data (13-u18) and the gallery. Archive records are system-built, so these schemas have no `x-ui` form widgets beyond read-only display hints.

## Steps
1. `archive_record` exactly as the table of archive-reuse.md section 1: `id`, `problem_ref`, `terminal_state`, `source` (real|simulation), `snapshot`, `context_profile` ($ref to 10-u69), `executed_path[]` (name, goal, criteria, outcome resolved|skipped|blocked|abandoned, duration_band, cost_band, depends_on, chosen_option), `options[]`, `evidence_refs[]` (URIs and tiers only), `challenges[]` (`stage`, `tried`, `why_failed_or_blocked`, `kind` legal|resource|institutional|evidence|social|technical, `resolution`, `layer` L0 to L6), `costs`, `outcome`, `versions`, `attribution` (credit_text, source_url, handles only for opted-in contributors, `license` default CC-BY-4.0), `quality` (completeness, ratified, dp_archive_run_id), `previous_record_id`.
2. `path_suggestion`: `id`, `record_ids[]`, `dimensions[]` (name, verdict same|close|different, draft_value, record_value), `reuse_fit` (`legality[]` per stage with lawful|unlawful_at_L<n>|unknown and citation, `resource_fit` fits|stretch|exceeds with gap, `differences[]`, `adaptations[]` (substitute|scale_down|add_institution_step|drop_step with reason), `confidence`), `draft_stages[]`, `attribution`, `state` (computing|ready|stale|dismissed|accepted|used). `stage_draft`: `plan` ($ref to the stage_plan of 10-u69), `derived_from[]` per stage, `expires_at`, `status`.
3. Band scales (duration, cost, population, budget) are `enum`s defined once in `content-schemas/_shared/bands.json` and referenced; the server constants of 13-u02 and 13-u03 are tested against this file by a fixture exported from here (checked in as `test/fixtures/bands.json`).
4. Every schema file follows docs/design/ai/structured-content.md section 2: JSON Schema 2020-12 with `id`, `version: "1.0.0"`, `pack: "base@1.0.0"`, and per property `x-ui`, `x-guidance` (why, good, bad, min_chars, max_chars; fictional one-sentence examples) and `x-checks` (dps, enums, allow_unknown, none_stated). Message ids resolve in `content-schemas/<type>/messages.en.json` (plain language, no em or en dashes). Each schema folder holds `examples/valid-*.json` (at least 2, synthetic, `source: simulation` for archive records) and `examples/invalid-*.json` (at least 3: a record with an email in an option, a blocked stage with no challenge via a lint rule, a missing license); the unit test validates them with the 10-u03 tooling.
5. Lint rule `archive-record-challenge`: a record whose `executed_path` has a `blocked` or `abandoned` stage must have a challenge for that stage (ARCHIVE-1); a record with `terminal_state: stuck` must have `outcome.unresolved: true`.

## Acceptance
- Schemas validate, required lists match structured-content.md.
- Every message id used exists in messages.en.json.
- Valid examples pass and invalid examples fail for the stated reason.
- `npm run verify` is green.

## Out of scope
- The renderer (10-u05).
- Server enforcement.
