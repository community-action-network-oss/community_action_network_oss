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
writes: ["src/problems/app/**","src/moderation/**","src/resolutions/**","src/notifications/**","test/terminal.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/constitution/rules.md#OWN-1","docs/spec/constitution/rules.md#APPEAL-1","docs/spec/constitution/rules.md#INTERIM-1","docs/design/ux/wireframes/browse.md#WF-DETAIL-3"]
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
T19 closed and T20 redirected (initiator proposes, moderator confirms, Resolution record), T21 withdrawal with the OWN-1 tombstone rule, and the appeal overturn effects for T19 and T20.

## Steps
1. T19 propose (initiator) or moderator: required reasonCode (duplicate, invalid, out_of_scope, no_longer_relevant, initiator_request, rule_violation) and plain explanation; duplicate requires problem.duplicate_of set (plan 04). Confirm by a moderator creates moderation_decision (outcome closed_confirmed, rule ids, explanation, appealable 14 days), resolution_record kind closed, followers notified. T20 same with destination (institution, partner project or emergency channel) and routeText and reason; resolution kind redirected.
2. T21 (W to withdrawn, initiator only): allowed only when no other account has an accepted contribution (query; context.noOtherAcceptedContribution); problem stays public as withdrawn with withdrawn_published true; initiator-authored text (problem text fields and the initiator contributions) is tombstoned (tombstoned_at, text nulled) and shown through the tombstone shape (OWN-1: no owner field, problem stays). If another person has contributed, T21 fails with condition_failed and the response suggests T19 reason initiator_request.
3. Appeal overturn effects in the plan 03 resolve switch: closed_confirmed or redirected_confirmed overturned returns the problem to the state before (previous_state stored on the pending or the event) with the reason recorded; replace the not_implemented branch and its test. Allow initiator appeals of T19 and T20 decisions in the filing endpoint (extend the allowed outcomes constant).
4. Notifications and emails to followers on closed, redirected, withdrawn through the fan-out.
5. Tests: each T19 reason with required fields, duplicate without duplicate_of fails, confirm creates record and decision, T20 destination required, T21 allowed with no other contributors and refused otherwise, tombstone shape, overturn of T19 and T20 restores the previous state, pool of one disclosure, atomicity.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- OWN-1: withdrawal after another contributor tombstones text and never removes the problem.
- Overturned closure or redirect returns to the previous state with a recorded reason.
- Interim label stored on every confirmation.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Reopening terminal states (deferred).
- App forms (later units).
