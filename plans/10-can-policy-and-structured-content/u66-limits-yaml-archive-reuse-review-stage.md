---
id: "10-u66"
plan: "10"
title: "limits.yaml: archive, reuse, review, stage and location pack values"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1
priority: 66
depends_on: ["10-u07"]
writes: ["limits.yaml","schemas/limits.schema.json","docs/limits.md","test/limits-v2.test.mjs"]
reads: ["schemas/**"]
spec: ["docs/design/ai/archive-reuse.md#5-ranking-and-explanation","docs/design/ai/archive-reuse.md#7-path_suggestion-lifecycle","docs/design/location/attestation.md#2-area-model","docs/spec/01-slice-1-brief.md","docs/design/ai/policy-pack.md","docs/open-questions/OQ-limits.md","docs/open-questions/OQ-h3-resolution.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["7d0361c"]
actual_hours: null
---
## Objective
The tunable numbers of lifecycle v2, the archive and the location check, as pack values (so a change is a policy PR with replay), read through the policy module by plan 09, 12, 13 and 14.

## Steps
1. Extend `limits.yaml` and `limits.schema.json` (same leaf shape and lint as 10-u07) with: `archive.rank_weights` {problem_type 0.25, constraints 0.15, resources_budget 0.15, scale 0.10, geography_climate 0.10, institutions 0.10, legal_stack 0.10, language 0.05} (a lint requires the sum 1.0), `archive.completeness_bonus`, `archive.solved_bonus`, `archive.derank_factor` 0.5, `archive.min_candidate_score`, `archive.rrf_k` 60, `archive.top_k_fusion` 30, `archive.top_n_shown` 5, `archive.max_per_source_problem` 2, `archive.taxonomy` (the problem type and category ids, one file reference), `archive.cross_language_recall_floor`, `metrics.min_n`.
2. `suggestions.debounce_trailing_seconds` 5, `suggestions.idle_typing_seconds` 1.5, `suggestions.max_runs_per_hour_per_draft` 6, `suggestions.stage_draft_expiry_days` 30, `suggestions.run_budget_micro_usd`.
3. `review.quorum_completed_reviews` 3, `review.recommendation_open_max_days` 7, `review.publish_anyway_after_days` 14 (D-74 defaults; at least one completed review is a constant in code, not a limit), `stage.auto_start_default` false.
4. `location.k_min_cells` 25, `location.h3_resolution` 8, `location.challenge_ttl_seconds` 120, `location.rate_per_account_per_area_per_hour`, `location.rate_per_account_per_day`, `location.impacted_cap_per_area_per_day`, `location.surge_new_account_days`, `location.plausibility_max_speed_kmh`, `location.history_ttl_hours` 24; mark `provisional: true` with a note linking OQ-limits and OQ-h3-resolution. The server constants of 14-u01 must equal these defaults (the lint prints them in `docs/limits.md` so a server test can compare).
5. Tests: weights sum, unknown key fails, the new keys exist with defaults, `public: false` for rate and surge thresholds (they must not appear in any explanation, see 10-u07).
6. Update `docs/limits.md` with each new key, default, meaning and OQ link.

## Acceptance
- The new keys lint and have documented defaults.
- Rank weights sum to 1.0 (tested).
- `npm run verify` is green.

## Out of scope
- Reading the values in the server (plans 09, 12, 13, 14).
