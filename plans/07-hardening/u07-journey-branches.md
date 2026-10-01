---
id: "07-u07"
plan: "07"
title: "Playwright journeys: revise with hints, rejection, appeal-to-example loop and fail-closed hold"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 121
depends_on: ["12-u26", "09-u45", "09-u50", "09-u51", "09-u54", "09-u37", "10-u36", "09-u52"]
writes: ["e2e/journeys/branches.spec.ts", "e2e/helpers/**"]
reads: ["e2e/**","src/**","app/**"]
spec: ["docs/design/ux/journeys.md", "docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals", "docs/spec/01a-lifecycle.md", "docs/design/ux/copy-deck.md", "docs/design/ux/wireframes/submit.md#WF-DECISION-1", "docs/design/ux/wireframes/submit.md#WF-DECISION-2", "docs/design/ux/wireframes/submit.md#WF-HOLD-1", "docs/design/ux/wireframes/submit.md#WF-APPEAL-1", "docs/design/ux/wireframes/submit.md#WF-APPEAL-2", "docs/design/ux/wireframes/forms.md#WF-FORM-3", "docs/design/ux/wireframes/forms.md#WF-FORM-4", "docs/design/ux/wireframes/moderation.md#WF-LABEL-1", "docs/design/ux/ui-unit-template.md"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npm run e2e -- e2e/journeys/branches.spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The branch paths of the AI-executed model, all with the FakeModel: a needs_revision publication decision (after volunteer review) with hints beside fields (sources, final criteria, stage plan and facts) and an assumption prompt, then revise, return to volunteer review (T03) and publish; a rejection with the cited rule and an appeal that runs the appeal-to-example loop (independent re-run, community label task, example candidate, re-decision under the new version); and a provider outage that holds fail-closed.

## Steps
1. Revise and resubmit: after volunteer review (the journey helpers of 12-u26 get a problem to in_review with the quorum met) the FakeModel script returns needs_revision from DP-PUBLISH citing DP-COMPLETENESS, DP-ASSUMPTIONS, DP-CRITERIA and DP-SOURCE-TRUST (T02); the poster sees the revision hints beside the right fields in WF-PREP-1 to WF-PREP-3 (WF-DECISION-1, WF-FORM-3) and an assumption prompt (WF-FORM-4) citing the rule and policy version; edits, sends back to volunteer review (T03) with no retyping (assert the fields are pre-filled and the schema version pin is unchanged; recommendations on changed fields reopen for volunteers), requests publication again and the second run publishes (T04).
2. Rejection and appeal-to-example: a scripted reject (T05, WF-DECISION-2: rule id and policy version shown, deletion date text equals the decision date plus 30 days, appeal available); the member files a structured appeal (WF-APPEAL-1: rule, passage, reason); WF-APPEAL-2 timeline shows the independent re-run with a different model or prompt variant still disputed; a seeded labeler opens WF-LABEL-1 (context masked, randomized) and answers within a quorum fixed up front; the label becomes an example candidate through the fake policy proposal adapter (09-u36); the pack in the fixture moves to the next version through the test ratification hook; the instance is re-decided by the AI under the new version (09-u37) and the timeline shows each step. Assert that no person overturns the single instance by hand and that the original decision stays visible.
3. Fail-closed hold: a scripted provider outage (09-u12) during the publication decision (T09) or the privacy gate at T01 (T08) leaves the problem in "In volunteer review" or "Waiting for the check" and then in WF-HOLD-1 ("taking longer than usual", no promised time, withdraw still available); recovery runs the item to its real outcome; at no time is the item public while held.
4. Both viewports; axe on decision, appeal, label and hold screens.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- All three paths pass at both viewports with no model provider call.
- Hints appear beside the right fields, assumptions are surfaced, and nothing is retyped.
- The appeal loop ends in a re-decision under a new policy version, shown on the timeline.
- A held item is never public.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Policy-change re-moderation and re-resolution (07-u21); the legal stack paths (07-u22).
- Appeal of closed or redirected (covered by server E2E 09-u45).
