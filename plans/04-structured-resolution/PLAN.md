---
id: "04"
title: "Structured resolution"
approved: true
status: todo
depends_on_plans: ["03"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md","docs/spec/constitution/rules.md","docs/design/ux/screens.md","docs/design/ux/journeys.md","docs/design/ux/ui-unit-template.md"]
---
# Plan 04: Structured resolution

## Goal
Published problems get structured participation: typed contributions with reflection delays and moderator review, proposals compared side by side, a recorded decision with authority and rationale (no vote), duplicate linking, and opt-in follows with in-app and email notifications.

## Spec refs
- docs/spec/01-slice-1-brief.md sections 6 (contribution enum and allowed types per state), 4 (T08 to T11), 2 (cooldown defaults)
- docs/design/system-design.md sections 2, 3, 6
- wireframes participate.md; rules NOTIFY-CONSENT-1, EVID-URL-1, RANK-1, OWN-1

## Acceptance for the whole plan
On a seeded eligible problem, member-two adds a clarifying question and an evidence contribution (URL), the second is blocked by the 2 minute delay with a calm message, the moderator accepts both, contributions show grouped by type with no counts or ranking, the initiator moves the problem to solution_development (T08) and adds two proposals each with mechanism, success metric, risks and verification plan (T09 to solution_selection), compares them in WF-PROPOSAL-1, and records a decision (rationale, authority, legal-gate record) in WF-DECREC-1 shown with the interim badge. A follower sees an in-app notification and a Mailpit email only after opting in. A duplicate link can be set. `npm run verify` green in both repos.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [04-u01](u01-contributions-domain.md) | Contributions schema, type enum, allowed-per-state matrix, cooldown rules | can_server | 1.5 | 70 | 03-u14 | - |
| [04-u02](u02-contributions-endpoints.md) | Contribution endpoints with checks, cooldown and pending review | can_server | 1.5 | 71 | 04-u01, 03-u08 | - |
| [04-u03](u03-contribution-moderation.md) | Contribution moderation, appeals restore, evidence tier recompute | can_server | 1.5 | 72 | 04-u02, 03-u13, 03-u11 | - |
| [04-u04](u04-proposals.md) | Proposals endpoints and T08, T09, T10 field enforcement | can_server | 1.5 | 73 | 04-u03 | - |
| [04-u05](u05-decision-record.md) | Decision record and legal-gate record | can_server | 1.2 | 74 | 04-u04 | - |
| [04-u06](u06-duplicate-link.md) | duplicate_of linking | can_server | 0.8 | 75 | 04-u05 | - |
| [04-u07](u07-follows-notifications.md) | Follows, consent, in-app notifications and emails | can_server | 1.5 | 76 | 04-u06, 03-u11 | - |
| [04-u08](u08-contributions-screens.md) | Contributions tab and add-contribution screen | can_app | 1.5 | 77 | 04-u02, 02-u20, 02-u14, 02-u24, 02-u25 | - |
| [04-u09](u09-proposals-screens.md) | Proposals tab, comparison and proposal form | can_app | 1.5 | 78 | 04-u04, 04-u08, 02-u24, 02-u25 | - |
| [04-u10](u10-decision-record-screen.md) | Decision record screen and stage transition controls | can_app | 1.5 | 79 | 04-u09, 04-u05, 02-u24, 02-u25 | - |
| [04-u11](u11-follow-notification-screens.md) | Follow controls and notifications list | can_app | 1.2 | 80 | 04-u07, 04-u10, 02-u24, 02-u25 | - |

## Risks
- Moderator workload: every contribution is reviewed before it is shown (brief section 6). Default: unreviewed contributions are visible only to their author with a "pending review" label.
- Cooldown lengths are an open question (OQ-cooldown-lengths); the defaults are constants in one file.
- T11 also needs tasks (plan 05); the decision record unit does not execute T11.

## depends_on_plans
03
