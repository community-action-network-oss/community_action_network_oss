---
id: "09-u62"
plan: "09"
title: "Re-resolution decision: feasibility checks, keep or annotate or reopen, target state"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 291
depends_on: ["09-u61", "04-u07", "05-u04"]
writes: ["src/resolutions/app/review/decide/**", "src/resolutions/app/review/feasibility/**", "src/db/schema.ts", "drizzle/**", "openapi/openapi.json", "test/re-resolution-decide.e2e-spec.ts"]
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
Turn the DP-RERESOLUTION outcome into an action with a deterministic feasibility check (OQ-reresolution-feasibility defaults). Reopen only when the conclusion changes and every criterion holds; otherwise write a visible annotation and change no state.

## Steps
1. `FeasibilityChecker` (pure, table-driven): (1) the problem still exists (not deleted or tombstoned for privacy); (2) its jurisdiction is still enabled (jurisdiction registry or pack value `jurisdictions.enabled`); (3) the initiator or a steward can be notified (account active with a verified email or a steward exists for the jurisdiction); (4) reopening does not undo a lawful completed implementation without a new proposal: a problem whose implementation tasks are verified complete and whose legal gate passed under the old rules is infeasible unless the new rule makes the completed measure itself unlawful, in which case the reason is recorded and a new proposal is required (no state undo). Pack values `reresolution.*` hold queue limits and batch sizes (defaults documented).
2. Decision table: DP outcome keep -> store note, no public change; annotate (or reopen and infeasible) -> `resolution_annotation` {problem_id, review_id, text keys, reason code (infeasible_not_exists, infeasible_jurisdiction, infeasible_unreachable, infeasible_completed_lawful, informational), policy and corpus versions} shown publicly with the old decision intact; hold -> retry; reopen and feasible -> call the T23 or T24 engine entry (09-u63).
3. Target state: default `solution_development`; `eligible` when DP output `reopen_target` says the problem's own eligibility changed; T24 to `verification` when the changed rule is an evidence rule on a `solved` problem (DP-EVIDENCE-TIER, DP-VERIFICATION). A `solved` problem whose old record is a Resolution gets the new record later, the old kept.
4. Initiator unreachable and no steward: annotate only (test). Write `re_resolution_record` {old and new version, changed conclusion, feasibility result per criterion} (RERESOLVE-1 evidence).
5. Read: `GET /v1/problems/{id}/history` includes review records and annotations. Run `npm run openapi` then `git add -- openapi/openapi.json`. Tests: each infeasible criterion produces an annotation and no state change; feasible reopen is handed to the engine with the right target; an annotate never edits the old decision row.

## Acceptance
- Every infeasible case writes a record and changes no state (RERESOLVE-1 test).
- Reopen target selection is table-tested for T23 to solution_development, T23 to eligible, T24 to verification.
- openapi regenerated; `npm run verify` is green.

## Out of scope
- The engine transitions and notices (09-u63, 09-u64).
