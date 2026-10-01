---
id: "12-u26"
plan: "12"
title: "Playwright journey: prepare, volunteer review, publish, stages in parallel, plan change, solved (FakeModel)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 60
depends_on: ["12-u12","12-u13","12-u14","12-u15","12-u16","12-u17","12-u18","12-u19","12-u20","12-u21","12-u23","12-u25","02-u21","09-u48","09-u49","11-u18","10-u33","10-u34","10-u35"]
writes: ["e2e/journey-v2.spec.ts", "e2e/helpers/journey-v2.ts"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#1-what-slice-1-is", "docs/design/ux/wireframes/prepare.md#WF-PREP-1", "docs/design/ux/wireframes/prepare.md#WF-VREVIEW-2", "docs/design/ux/wireframes/stages.md#WF-STAGE-1", "docs/design/ux/wireframes/stages.md#WF-STAGEMAP-1", "docs/design/ux/wireframes/guest.md#WF-FILTER-1", "docs/design/ux/ui-unit-template.md"]
needs: ["docker", "db", "mail"]
verify: ["npm run verify", "npm run e2e -- e2e/journey-v2.spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The browser proof of lifecycle v2 on web at both viewports, against the real server with the deterministic `FakeModel` and Mailpit (no paid call). It mirrors the server journey 12-u25 through the screens WF-PREP-1 to WF-PREP-3, WF-VREVIEW-1 to WF-VREVIEW-3, WF-STAGEMAP-1, WF-STAGE-1 to WF-STAGE-3, WF-STAGEMAP-1 plan change, and WF-FILTER-1. Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).

## Steps
1. `e2e/helpers/journey-v2.ts` reuses the helpers of 02-u21 (`signInAs`, `signUpWithInvite`, `expectNoSeriousAxeViolations`) and adds helpers for the seeded poster and three volunteers (02-u12). Before the spec, reset and seed through the harness prepare script (`npm run seed:reset`, then the seed bootstrap of 11-u18 for the synthetic seed account and the Amsterdam overlay with AI_PROVIDER=fake and the recorded FakeModel script for this journey, 09-u12); the problem content is an Amsterdam framing with synthetic evidence (D-56), and the facts section uses the schema form of 10-u33.
2. Scenario: the poster signs in, builds the problem in WF-PREP-1 with two sources (trust hints visible), two final criteria in WF-PREP-2 and a plan with two parallel stages in WF-PREP-3 (list view and graph view both checked), runs `Check my draft`, and sends to review; the status screen says "In volunteer review" with the needs-reviewers call; three volunteers opt in on WF-VREVIEW-1, declare no conflict and review in WF-VREVIEW-2 (two make recommendations, one containing an email address that is masked); the poster resolves them in WF-VREVIEW-3 (accept one, decline one with a reason, an empty reason is refused) and requests publication; the problem becomes Active with the stage map showing both root stages In progress; a member contributes ahead to the third stage (WF-STAGE-3), the options, choice, steps and evidence run in both stages (WF-STAGE-1), one is Not met first (WF-STAGE-2) then Done after more evidence; the third stage becomes Ready and starts and shows the item marked "Added ahead of time"; a plan change is proposed and applied; the problem shows Solved.
3. Assertions on the way: the stage list view and the graph show the same stages; a Planned stage offers no choose, steps or submit actions; a guest-labelled contribution is hidden by Impacted only and the hidden count is read out in the live region; no handle of a reviewer and no email is ever in the DOM; copy contains no dashes; axe has no serious or critical issues at the main screens at both viewports.
4. A second short spec: the held publication run shows "Waiting for the check" and the problem is not public until it resolves.
5. Add the spec to the root e2e wiring (07-u08 picks up `e2e/journey-v2.spec.ts` by name).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- `npm run e2e` passes the journey at 360x800 and 1280x800 against compose and the seed.
- The journey is deterministic across 3 consecutive runs.
- `npm run verify` does not require browsers and stays green.

## Out of scope
- Appeal, rejection, fail-closed and re-resolution journeys (07-u07, 07-u21, 07-u22).
- Native device testing (founder-gated).
