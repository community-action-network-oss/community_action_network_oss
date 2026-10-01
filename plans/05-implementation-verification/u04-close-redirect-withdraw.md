---
id: "05-u04"
plan: "05"
title: "Closed, redirected and withdrawn (T16, T17, T18) with unresolved stages skipped and appeals"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 93
depends_on: ["05-u03", "13-u01"]
writes: ["src/problems/app/**", "src/notifications/**", "test/terminal.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/spec/01b-stages.md", "docs/spec/24-archive-reuse.md", "docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals", "docs/spec/constitution/rules.md#OWN-1", "docs/spec/constitution/rules.md#APPEAL-1", "docs/spec/constitution/rules.md#INTERIM-1", "docs/design/ux/wireframes/browse.md#WF-DETAIL-3"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/terminal.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
T16 closed and T17 redirected (the initiator proposes, a moderation run decides) and T18 withdrawal with the OWN-1 tombstone rule. This unit builds the proposals and field validation; the deciding run is 09-u42 (DP-DUPLICATE, DP-ELIGIBILITY, DP-CRISIS, DP-CLOSURE) and appeals are 09-u33 to 09-u37. Every terminal transition after publication builds an archive record with its full path and challenges (`ARCHIVE-1`): the record, its public routes and `DP-ARCHIVE` are 13-u01 and 13-u04; this unit passes the terminal context to the effect and builds no resolution record.

## Steps
1. T16 propose (initiator only; the run decides): required reasonCode (duplicate, invalid, out_of_scope, no_longer_relevant, initiator_request, rule_violation) and plain explanation; duplicate requires problem.duplicate_of set (plan 04). When the run accepts (09-u42, run id) the engine applies T16: every unresolved stage becomes `skipped` with the closure reason (ST09, registered by 12-u06 on the TransitionEffects port of 03-u05), the archive record is built (13-u01), followers notified; the decision row comes from the run, not from this unit. T17 same with destination (institution, partner project or emergency channel; an emergency channel is routed through the emergency/legal lane, 09-u38) and routeText and reason.
2. T18 (active to withdrawn, initiator only): allowed only when no other account has an accepted contribution (query; context.noOtherAcceptedContribution); problem stays public as withdrawn with withdrawn_published true; initiator-authored text (problem text fields and the initiator contributions) is tombstoned (tombstoned_at, text nulled) and shown through the tombstone shape (OWN-1: no owner field, problem stays); unresolved stages become `skipped`; an archive record is built. If another person has contributed, T18 fails with condition_failed and the response suggests T16 reason initiator_request. (T06 and T07, withdrawal before publication, are plan 03.)
3. Appeals of T16 and T17 outcomes use the structured appeal of plan 09 (09-u33 filing, 09-u34 independent re-run, 09-u37 re-decision under the new policy version). Store previous_state on the proposal so a re-decision can restore it (the stages skipped by closure return to their prior state on an overturn: record the prior stage states in the proposal); no human reviewer and no uphold or overturn endpoint exist here. Add T16 and T17 outcomes to the appealable-outcomes constant owned by 09-u33 only through its extension point.
4. Notifications and emails to followers on closed, redirected, withdrawn through the fan-out.
5. Tests: each T16 reason with required fields, duplicate without duplicate_of fails, a run-actor accept skips every unresolved stage and calls the archive hook, a human actor cannot apply T16 or T17, T17 destination required, T18 allowed with no other contributors and refused otherwise, tombstone shape, previous_state and prior stage states stored on the proposal, atomicity.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- OWN-1: withdrawal after another contributor tombstones text and never removes the problem.
- The previous problem and stage states are stored so a later re-decision can restore them.
- The policy version is stored on every closed or redirected decision and the archive record is requested for every terminal transition.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Reopening terminal states (T20 and T21 re-resolution, plan 09).
- The archive record and archive routes (13-u01).
- The deciding run (09-u42) and appeals (09-u33 to 09-u37).
- App forms (later units).
