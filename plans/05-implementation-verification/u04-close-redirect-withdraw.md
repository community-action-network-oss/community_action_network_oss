---
id: "05-u04"
plan: "05"
title: "Closed, redirected and withdrawn (T19, T20, T21) with appeals"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 93
depends_on: ["05-u03"]
writes: ["src/problems/app/**", "src/resolutions/**", "src/notifications/**", "test/terminal.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals", "docs/spec/constitution/rules.md#OWN-1", "docs/spec/constitution/rules.md#APPEAL-1", "docs/spec/constitution/rules.md#INTERIM-1", "docs/design/ux/wireframes/browse.md#WF-DETAIL-3"]
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
T19 closed and T20 redirected (the initiator proposes, a moderation run decides, Resolution record), and T21 withdrawal with the OWN-1 tombstone rule. This unit builds the proposals, field validation and records; the deciding run is 09-u42 (DP-DUPLICATE, DP-ELIGIBILITY, DP-CRISIS, DP-CLOSURE) and appeals are 09-u33 to 09-u37.

## Steps
1. T19 propose (initiator only; the run decides): required reasonCode (duplicate, invalid, out_of_scope, no_longer_relevant, initiator_request, rule_violation) and plain explanation; duplicate requires problem.duplicate_of set (plan 04). When the run decides accept (09-u42, run id) the engine applies T19 and the resolution writer (05-u02) creates resolution_record kind closed with the policy version; followers notified. The decision row comes from the run, not from this unit. T20 same with destination (institution, partner project or emergency channel; an emergency channel is routed through the emergency/legal lane, 09-u38) and routeText and reason; resolution kind redirected.
2. T21 (W to withdrawn, initiator only): allowed only when no other account has an accepted contribution (query; context.noOtherAcceptedContribution); problem stays public as withdrawn with withdrawn_published true; initiator-authored text (problem text fields and the initiator contributions) is tombstoned (tombstoned_at, text nulled) and shown through the tombstone shape (OWN-1: no owner field, problem stays). If another person has contributed, T21 fails with condition_failed and the response suggests T19 reason initiator_request.
3. Appeals of T19 and T20 outcomes use the structured appeal of plan 09 (09-u33 filing, 09-u34 independent re-run, 09-u37 re-decision under the new policy version). Store previous_state on the proposal so a re-decision can restore it; no human reviewer and no uphold or overturn endpoint exist here. Add T19 and T20 outcomes to the appealable-outcomes constant owned by 09-u33 only through its extension point.
4. Notifications and emails to followers on closed, redirected, withdrawn through the fan-out.
5. Tests: each T19 reason with required fields, duplicate without duplicate_of fails, a run-actor accept creates the record, a human actor cannot apply T19 or T20, T20 destination required, T21 allowed with no other contributors and refused otherwise, tombstone shape, previous_state stored on the proposal, atomicity.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- OWN-1: withdrawal after another contributor tombstones text and never removes the problem.
- The previous state is stored so a later re-decision can restore it.
- The policy version is stored on every closed or redirected record.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Reopening terminal states (T23 and T24 re-resolution, plan 09).
- The deciding run (09-u42) and appeals (09-u33 to 09-u37).
- App forms (later units).
