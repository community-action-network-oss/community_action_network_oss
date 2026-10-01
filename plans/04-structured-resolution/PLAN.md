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
Published problems get structured participation inside the stage plan (lifecycle v2, D-72): typed contributions submitted as schema forms (never free-form text) that target a stage or the problem, stage options (which replace proposals) compared side by side, a stage choice recorded with authority, rationale and a layered legal-gate record (no vote), duplicate linking, and opt-in follows with in-app and email notifications. The stage plan, its states and the stage screens are plan 12. Contributions and proposals become public only after the blocking moderation run of plan 09 (09-u40, 09-u41); this plan builds the data model, the endpoints, the evidence-tier recompute and the screen shells that host the schema renderer (plan 10).

## Spec refs
- docs/spec/01-slice-1-brief.md sections 6 (contribution enum), 2 (cooldown defaults); docs/spec/01b-stages.md (allowed types per stage state, contributions ahead, the choice gate); docs/spec/01a-lifecycle.md
- docs/design/system-design.md sections 2, 3, 6
- wireframes participate.md (WF-CONTRIB-2, WF-PROPOSAL-2, WF-DECREC-2 as schema forms), stages.md (WF-STAGE-1) and forms.md; rules NOTIFY-CONSENT-1, EVID-URL-1, RANK-1, OWN-1, STRUCT-ONLY-1, LEGAL-GATE-1, LEGAL-CITE-1

## Acceptance for the whole plan
On a seeded active problem with the FakeModel, member-two submits a clarifying question and an evidence contribution as schema forms (the second is blocked by the 2 minute delay with a calm message), both show "Awaiting review" to their author until the moderation run publishes them, contributions show grouped by type with no counts or ranking, a contribution to a planned stage is kept with a "For a later stage" label, two members add stage options each with mechanism, success metric, risks and verification plan, the options are compared in the stage workspace, and the decider records a stage choice (rationale, authority, per-layer legal-gate record) shown with "Decided under policy vX". A follower sees an in-app notification and a Mailpit email only after opting in. A duplicate link can be set. `npm run verify` green in both repos.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [04-u01](u01-contributions-domain.md) | Contributions schema, type enum, per-stage-state allowed matrix, cooldown rules | can_server | 1.5 | 70 | 03-u14, 12-u02 | - |
| [04-u02](u02-contributions-endpoints.md) | Contribution endpoints with schema validation, checks, cooldown and pending run | can_server | 1.5 | 71 | 04-u01, 03-u08, 10-u29 | - |
| [04-u03](u03-contribution-moderation.md) | Contribution evidence tier recompute and cooldown from hold decisions | can_server | 1.5 | 72 | 04-u02, 03-u11, 03-u09 | - |
| [04-u04](u04-proposals.md) | Stage options: proposed_solution contributions become stage_option rows and the options comparison read (replaces proposals) | can_server | 1.5 | 73 | 04-u03, 10-u29, 12-u02 | - |
| [04-u05](u05-decision-record.md) | Stage choice gate and decision record (CHOICE-GATE, layered and cited legal-gate record) | can_server | 1.2 | 74 | 04-u04, 12-u02 | - |
| [04-u06](u06-duplicate-link.md) | duplicate_of linking | can_server | 0.8 | 75 | 04-u05 | - |
| [04-u07](u07-follows-notifications.md) | Follows, consent, in-app notifications and emails | can_server | 1.5 | 76 | 04-u06, 03-u11 | - |
| [04-u08](u08-contributions-screens.md) | Contribution form shell (WF-CONTRIB-2) and the shared contribution list grouped by type | can_app | 1.5 | 77 | 04-u02, 02-u20, 02-u14, 02-u24, 02-u25, 10-u05, 10-u29 | - |
| [04-u09](u09-proposals-screens.md) | Options comparison view and option form shell (replaces the Proposals tab; lives inside the stage workspace) | can_app | 1.5 | 78 | 04-u04, 04-u08, 02-u24, 02-u25, 10-u05 | - |
| [04-u10](u10-decision-record-screen.md) | Stage choice record view and stage controls (replaces the decision tab and T08 to T10 controls) | can_app | 1.5 | 79 | 04-u09, 04-u05, 12-u06, 02-u24, 02-u25, 10-u05 | - |
| [04-u11](u11-follow-notification-screens.md) | Follow controls and notifications list | can_app | 1.2 | 80 | 04-u07, 04-u10, 02-u24, 02-u25 | - |

## Risks
- Every contribution is checked by a blocking moderation run before it is shown (brief section 6, D-51). Default: unchecked contributions are visible only to their author with an "Awaiting review" label. If the run is held (fail closed) the contribution stays hidden.
- Cooldown lengths are an open question (OQ-cooldown-lengths); the defaults are constants in one file.
- 04-u04, 04-u05, 04-u09 and 04-u10 keep their ids and are rewritten in place (plans 09, 10 and 11 depend on them); WF-CONTRIB-1, WF-PROPOSAL-1 and WF-DECREC-1 are retired wireframes (D-72) now served by WF-STAGE-1.
- Stage tasks, blockers and stage resolution are plan 05 and 12-u06 and 12-u07; the decision record unit only records the choice.

## depends_on_plans
03
