---
id: "09-u61"
plan: "09"
title: "Re-resolution review job: run DP-RERESOLUTION through the DAG with retries and budgets"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 290
depends_on: ["09-u60", "09-u22", "09-u05", "10-u59"]
writes: ["src/archive/review/run/**", "src/moderation/app/dp/registry*.ts", "src/db/schema.ts", "drizzle/**", "test/fixtures/moderation/reresolution/**", "test/re-resolution-run.e2e-spec.ts"]
spec: ["docs/design/ai/triggers.md#re-resolution-d-59", "docs/design/flows/re-resolution.md#sequence", "docs/design/flows/re-resolution.md#failure-paths", "docs/design/ai/decision-points.md#per-dp-notes", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/adr/0013-retroactive-re-resolution.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/re-resolution-run.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Execute the review: each selected archive record or resolved stage runs DP-RERESOLUTION with the `archive_record` (executed path, options and choices with the decision method and reasons, challenges, versions) or the stage's `stage_choice` and `stage_evidence`, the rule diff and the L0 to L6 retrieved articles. The job records every run and never changes visible state by itself.

## Steps
1. Register DP-RERESOLUTION in the DP registry (09-u06) as async, bounded, outcomes keep, annotate, reopen, hold only (schema rejects any other, never reject or delete). Run trigger `re_resolution` with policy and corpus versions on the `moderation_run`.
2. Handler: build the input from the `archive_record` (or the stage records), its decision and legal-gate records with layer citations and the diff (masked through the privacy gateway, 09-u09); call the DAG with the `legalStack` step (09-u56) over the new corpora; store `reresolution_review` {id, problem_id, archive_record_id null, stage_id null, batch_id, run_id, old_versions, new_versions, outcome, changed_conclusion, cited_rule_ids, status}.
3. Failure paths (re-resolution.md): model or budget failure retries with backoff and changes nothing; low confidence never reopens (the outcome is demoted to `annotate` for audit); spend caps pause the batch and alert; emergency or legal signal (DP-CRISIS, DP-LEGAL) goes to the lane (09-u38) and the review pauses for that item.
4. The handler returns the outcome to the feasibility and applier unit (09-u62); here it only records. Use `moderationFixtures()` packs v1 and v2 plus fixtures under `test/fixtures/moderation/reresolution/` (never the 10-u04 policy fixtures).
5. Tests: keep stores a run and a quiet note; hold retries with backoff and the item is unchanged; low confidence demoted to annotate; schema rejects a `reject` output; provider counter shows FakeModel only.

## Acceptance
- Every review is a recorded run with versions and prompt hash.
- Nothing visible changes in this unit (test over public reads).
- `npm run verify` is green.

## Out of scope
- Feasibility, annotation and reopen (09-u62, 09-u63).
