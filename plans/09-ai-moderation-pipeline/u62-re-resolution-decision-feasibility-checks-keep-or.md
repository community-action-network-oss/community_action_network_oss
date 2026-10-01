---
id: "09-u62"
plan: "09"
title: "Re-resolution decision: feasibility checks, keep or annotate or reopen, target state"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 291
depends_on: ["09-u61", "04-u07", "05-u04", "13-u05"]
writes: ["src/archive/review/decide/**", "src/archive/review/feasibility/**", "src/db/schema.ts", "drizzle/**", "openapi/openapi.json", "test/re-resolution-decide.e2e-spec.ts"]
spec: ["docs/design/flows/re-resolution.md#sequence", "docs/open-questions/OQ-reresolution-feasibility.md", "docs/open-questions/OQ-policy-retroactivity.md", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/spec/01a-lifecycle.md#42-transition-table", "docs/design/ai/decision-points.md#per-dp-notes"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/re-resolution-decide.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Turn the DP-RERESOLUTION outcome (computed from the archive record or the stage records) into an action with a deterministic feasibility check (OQ-reresolution-feasibility defaults; the lawful completed implementation check reads the archive record's `executed_path` and the verified evidence of the completed stages). Reopen only when the conclusion changes and every criterion holds; otherwise write a visible annotation and change no state.

## Steps
1. `FeasibilityChecker` (pure, table-driven): (1) the problem still exists (not deleted or tombstoned for privacy); (2) its jurisdiction is still enabled (jurisdiction registry or pack value `jurisdictions.enabled`); (3) the initiator or a steward can be notified (account active with a verified email or a steward exists for the jurisdiction); (4) reopening does not undo a lawful completed implementation without a new proposal: a problem whose implementation tasks are verified complete and whose legal gate passed under the old rules is infeasible unless the new rule makes the completed measure itself unlawful, in which case the reason is recorded and a new proposal is required (no state undo). Pack values `reresolution.*` hold queue limits and batch sizes (defaults documented).
2. Decision table: DP outcome keep -> store note, no public change; annotate (or reopen and infeasible) -> `archive_annotation` kind `re_resolution` (the table of 13-u05, extended here; stage-level annotations carry stage_id) {problem_id, review_id, text keys, reason code (infeasible_not_exists, infeasible_jurisdiction, infeasible_unreachable, infeasible_completed_lawful, informational), policy and corpus versions} shown publicly with the old decision intact; hold -> retry; reopen and feasible -> call the T23 or T24 engine entry (09-u63).
3. Target: a reopen of an ended problem is T20 `REOPEN-RULE` (solved, closed, redirected or stuck to `active`), or T21 `REOPEN-EVIDENCE` for a `solved` problem when the changed rule is an evidence rule (DP-EVIDENCE-TIER, DP-VERIFICATION). The DP output `affected_stage_ids` says which stages return from `resolved` to `active` (ST10, applied by the T20 and T21 effect of 12-u07); their unstarted successors return to `planned`. For an `active` problem a changed rule on a resolved stage reopens only that stage through ST10 (no problem transition) with a notice. The old archive record is kept; the next end of the problem builds a new record linked to it (13-u02).
4. Initiator unreachable and no steward: annotate only (test). Write `re_resolution_record` {old and new version, changed conclusion, feasibility result per criterion} (RERESOLVE-1 evidence).
5. Read: `GET /v1/problems/{id}/history` includes review records and annotations. Run `npm run openapi` then `git add -- openapi/openapi.json`. Tests: each infeasible criterion produces an annotation and no state change; feasible reopen is handed to the engine with the right target; an annotate never edits the old decision row.

## Acceptance
- Every infeasible case writes a record and changes no state (RERESOLVE-1 test).
- Reopen target selection is table-tested for T20 with affected stages, T21 on final criteria, and a stage-only reopen on an `active` problem.
- openapi regenerated; `npm run verify` is green.

## Out of scope
- The engine transitions and notices (09-u63, 09-u64).
