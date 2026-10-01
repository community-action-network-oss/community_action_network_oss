---
id: "09-u66"
plan: "09"
title: "E2E extension: a policy change reopens a solved seed problem, with notice, history, infeasible and appeal cases"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 295
depends_on: ["09-u45", "09-u64", "09-u63", "13-u04", "12-u07"]
writes: ["test/e2e-re-resolution.e2e-spec.ts", "test/support/re-resolution-flow.ts", "test/fixtures/moderation/reresolution/flow/**"]
spec: ["docs/design/flows/re-resolution.md", "docs/design/ai/triggers.md#re-resolution-d-59", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/design/ai/simulation.md", "docs/design/ai/amendment-loop.md", "docs/design/flows/appeal.md", "docs/spec/01a-lifecycle.md#42-transition-table"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/e2e-re-resolution.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Scenario 9 of the plan 09 acceptance: change the rules and a past solved problem reopens visibly. Uses a seed problem of framing 1 or 2 (D-56), labeled synthetic evidence, extended only through test/fixtures/moderation/reresolution/flow/.

## Steps
1. Setup: a seeded problem solved under policy v1 (a stage plan run to `solved`, stage choice and decision record, legal findings with a fiktiva L4 article, and its `archive_record` built by 13-u04). Activate a v2 fixture whose changed rule touches that decision; move through shadow (no selection), canary (batch created), full.
2. Assert: DP-RERESOLUTION returns `reopen`, feasibility passes, T20 reopens the problem to `active` and the affected stage to `active` (ST10, successors back to `planned`), the old archive record and decisions are intact and readable, notices exist for initiator and a follower, `GET /v1/problems/{id}/history` lists old and new, and `problem.reopened` is emitted.
3. Variants: evidence-rule change reopens a solved problem through T21 (the final verification stage and the affected stage evidence); a completed lawful implementation is annotated and not reopened; initiator unreachable with no steward is annotated; low confidence is annotated for audit; an unrelated resolution is untouched (not selected).
4. Legal corpus variant: activate a fiktiva L6 corpus version that blocks the chosen solution; the `re_resolution_scan` job (10-u57) reopens or the problem goes through the normal gate to stuck with the layered payload; assert the LEGAL-CORPUS-1 job ids are stored.
5. Appeal: the initiator appeals the re-resolution; the independent re-run upholds; assert APPEAL-1 and that nothing was deleted at any point.
6. Final assertions: provider counter shows FakeModel only, every run has policy and corpus versions and prompt hash, metrics show a reopen and an annotate.

## Acceptance
- The re-resolution scenario passes on FakeModel in CI.
- No history is lost and no reopen is silent (notice always present).
- `npm run verify` is green.

## Out of scope
- Persona simulation variants (plan 11).
