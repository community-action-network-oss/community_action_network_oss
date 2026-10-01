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
Finish the lifecycle: tasks and blockers, verification evidence, and every terminal or resting transition with its required fields (stuck, paused, closed, redirected, withdrawn, solved), plus the public Resolution records, the status panel variants and the static external routes screen.

## Spec refs
- docs/spec/01-slice-1-brief.md sections 4 (T11 to T21), 5 (appeal effects for T19 and T20), 7 (what solved means)
- docs/design/system-design.md sections 3, 6
- rules: EVID-URL-1, LEGAL-GATE-1, OWN-1, INTERIM-1, CRISIS-STATIC-1
- wireframes participate.md (WF-TASK), browse.md (WF-DETAIL-2, 3, WF-RESOLUTION-1), submit.md (WF-EXTERNAL-1)

## Acceptance for the whole plan
On a seeded problem in solution_selection: the initiator records the decision then creates tasks and moves to implementation (T11), a member claims a task and updates progress, all required tasks finish and the problem moves to verification (T12), evidence with a URL and attestation is added, the initiator proposes solved with an outcome statement and a moderator confirms (T14), producing a Resolution record shown in WF-RESOLUTION-1 with the interim label. Another problem is made stuck with a documented blocker and next route (T15) and shows the stuck variant in WF-DETAIL-3, one is paused and one closed as duplicate (with duplicate_of), one redirected, and a withdrawal with no other contributor tombstones the initiator text (T21). Appeals of closed and redirected decisions work. `npm run verify` green in both repos.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [05-u01](u01-tasks-blockers.md) | Tasks, blockers and T11, T12 enforcement | can_server | 1.5 | 90 | 04-u07 | - |
| [05-u02](u02-verification-solved.md) | Verification evidence, T13, T14 solved and Resolution records | can_server | 1.5 | 91 | 05-u01 | - |
| [05-u03](u03-stuck-paused.md) | Stuck and paused transitions (T15 to T18) and pause review flags | can_server | 1.2 | 92 | 05-u02 | - |
| [05-u04](u04-close-redirect-withdraw.md) | Closed, redirected and withdrawn (T19, T20, T21) with appeals | can_server | 1.5 | 93 | 05-u03 | - |
| [05-u05](u05-tasks-screens.md) | Tasks tab, task detail and verification evidence form | can_app | 1.5 | 94 | 05-u01, 05-u02, 04-u10 | - |
| [05-u06](u06-detail-variants.md) | Detail variants: paused, stuck, withdrawn, closed, redirected, tombstone | can_app | 1.5 | 95 | 05-u03, 05-u04, 04-u10 | - |
| [05-u07](u07-resolution-and-external.md) | Resolution records archive and external routes | can_app | 1.2 | 96 | 05-u02, 05-u04, 02-u15 | - |
| [05-u08](u08-terminal-action-forms.md) | Terminal action forms and moderator confirm panel | can_app | 1.5 | 97 | 05-u06, 05-u05, 05-u04, 03-u24 | - |
| [05-u09](u09-real-emergency-routes.md) | Real emergency and external routes with reviewed legal text (founder-gated) | can_app | 1 | 210 | 05-u07 | yes |

## Risks
- The confirm flow for T14, T19, T20 relies on the pending mechanism from plan 03; a single moderator confirms with disclosure (INTERIM-1).
- WF-EXTERNAL-1 content is fictional and static; real routes need legal review (founder decision, OQ-emergency-routing). Default: fictional examples labelled as such.
- "Solved" evidence threshold is an open question (OQ-solved-evidence-threshold); defaults come from the brief section 7.

## depends_on_plans
04
