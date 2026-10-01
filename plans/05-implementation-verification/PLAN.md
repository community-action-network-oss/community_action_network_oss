---
id: "05"
title: "Implementation and verification"
approved: true
status: todo
depends_on_plans: ["04"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md","docs/spec/constitution/rules.md","docs/design/ux/screens.md","docs/design/ux/journeys.md","docs/design/ux/ui-unit-template.md"]
---
# Plan 05: Implementation and verification

## Goal
Finish lifecycle v2: stage tasks (steps) and blockers, verification evidence and the solved check against the final acceptance criteria, and every terminal or resting problem transition with its required fields (stuck including legally blocked, paused, closed, redirected, withdrawn, solved), plus the status panel variants, archive links and the static external routes screen. The public Resolution records are replaced by the Archive (D-76): the archive module, `/archive` routes and screens are plan 13 (13-u01, 13-u25, 13-u26). The initiator proposes T13 to T17; a moderation run decides (09-u42). This plan builds the proposals, field validation and screens, never a human confirm path. Stage states and stage transitions are plan 12.

## Spec refs
- docs/spec/01-slice-1-brief.md sections 4, 5 (appeal effects), 7 (what solved means); docs/spec/01a-lifecycle.md (T11 to T18 and the old to new map in 4.3); docs/spec/01b-stages.md (ST04, ST07, ST08); docs/spec/24-archive-reuse.md
- docs/design/system-design.md sections 3, 6
- rules: EVID-URL-1, LEGAL-GATE-1, LEGAL-CITE-1, OWN-1, INTERIM-1 (transitional stewardship), RERESOLVE-1, CRISIS-STATIC-1, STRUCT-ONLY-1
- wireframes participate.md (WF-TASK-2), stages.md (WF-STAGE-1), browse.md (WF-DETAIL-2, 3), submit.md (WF-EXTERNAL-1, WF-REMOD-1), forms.md

## Acceptance for the whole plan
On a seeded active problem whose stage has a recorded choice, with the FakeModel: the decider creates steps, a member claims one and updates progress, all required steps finish, evidence with a URL and attestation is added through a schema form and the stage is submitted (ST04, 12-u06). When the last required stage resolves the system proposes solved with an outcome statement per final criterion and the run decides T15, producing an archive record (13-u01) shown through the archive link as "Decided under policy vX". Another problem is made stuck (T13) because every required stage is blocked with a documented blocker (one of them legally blocked, naming layer and provision) and next route and shows the stuck variant in WF-DETAIL-3, one is paused (T11) and one closed as duplicate (T16, with duplicate_of, unresolved stages skipped), one redirected (T17), and a withdrawal with no other contributor tombstones the initiator text (T18). No screen has a confirm or decline control for a person. `npm run verify` green in both repos.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [05-u01](u01-tasks-blockers.md) | Stage tasks (steps), task blockers and the TaskPort that gates ST04 | can_server | 1.5 | 90 | 04-u07, 10-u29, 12-u02, 04-u05 | - |
| [05-u02](u02-verification-solved.md) | Verification evidence and the solved check (T15, DP-VERIFICATION on the final acceptance criteria) | can_server | 1.5 | 91 | 05-u01, 12-u07, 13-u01 | - |
| [05-u03](u03-stuck-paused.md) | Stuck and paused transitions (T11 to T14), stage blocker records and pause review flags | can_server | 1.2 | 92 | 05-u02, 09-u05, 12-u06 | - |
| [05-u04](u04-close-redirect-withdraw.md) | Closed, redirected and withdrawn (T16, T17, T18) with unresolved stages skipped and appeals | can_server | 1.5 | 93 | 05-u03, 13-u01 | - |
| [05-u05](u05-tasks-screens.md) | Task detail and verification form (WF-TASK-2) and the steps list for the stage workspace | can_app | 1.5 | 94 | 05-u01, 05-u02, 04-u10, 02-u24, 02-u25, 10-u05 | - |
| [05-u06](u06-detail-variants.md) | Detail variants: paused, stuck, withdrawn, closed, redirected, tombstone | can_app | 1.5 | 95 | 05-u03, 05-u04, 04-u10, 02-u24, 02-u25, 09-u50 | - |
| [05-u07](u07-resolution-and-external.md) | External routes screen (WF-EXTERNAL-1) and archive links from the problem page | can_app | 1.2 | 96 | 05-u02, 05-u04, 13-u01, 02-u15, 02-u24, 02-u25 | - |
| [05-u08](u08-terminal-action-forms.md) | Problem-level action forms on the renderer shell: pause, stuck, solved proposal, close, redirect, withdraw | can_app | 1.5 | 97 | 05-u06, 05-u05, 05-u04, 02-u24, 02-u25, 10-u05 | - |
| [05-u09](u09-real-emergency-routes.md) | Real emergency and external routes with reviewed legal text (founder-gated) | can_app | 1 | 210 | 05-u07 | yes |

## Risks
- T13 to T17 are decided by moderation runs (09-u42); this plan only records proposals. Until plan 09 lands the proposals wait and the screens show "Awaiting review".
- Unit ids 05-u01 to 05-u09 are kept and rewritten in place (plans 09, 10 and 11 depend on them); file names keep their old slugs. The old Resolution records (`resolution_record`, `/v1/resolutions`, `src/resolutions`, WF-RESOLUTION-1) no longer exist: the Archive replaces them (13-u01, WF-ARCHIVE-1, WF-ARCHIVE-2).
- WF-EXTERNAL-1 content is an example and static; real routes need legal review (founder decision, OQ-emergency-routing). Default: examples labelled as such.
- "Solved" evidence threshold is an open question (OQ-solved-evidence-threshold); defaults come from the brief section 7.

## depends_on_plans
04
