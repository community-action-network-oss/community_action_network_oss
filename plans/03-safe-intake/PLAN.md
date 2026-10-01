---
id: "03"
title: "Safe intake"
approved: true
status: todo
depends_on_plans: ["02"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md","docs/spec/constitution/rules.md","docs/design/ux/screens.md","docs/design/ux/journeys.md","docs/design/ux/ui-unit-template.md"]
---
# Plan 03: Safe intake

## Goal
A signed-in member can turn a frustration into a private draft, pass deterministic privacy and eligibility checks, submit it, and a moderator can review it with explainable decisions (publish, request changes, reject), with revise-and-resubmit, appeals and honest deadlines. The lifecycle state machine enforcing the brief's table lands here and every later plan uses it.

## Spec refs
- docs/spec/01-slice-1-brief.md sections 4, 5, 9 (state table, decisions, appeals, drafts)
- docs/design/system-design.md sections 2, 4, 6, 9 (modules, events, API, fixtures)
- docs/spec/constitution/rules.md: PRIV-GATE-1, NAME-1, SCOPE-1, PUB-FAILCLOSED-1, MOD-EXPLAIN-1, INTERIM-1, APPEAL-1, APPEAL-2, DRAFT-TTL-1, CRISIS-STATIC-1
- wireframes submit.md and moderation.md

## Acceptance for the whole plan
Against seed data: member-one signs in, writes a draft through WF-SUBMIT-1 to 7 (local autosave survives a reload and a session expiry), a flagged name blocks submit with a field hint, a clean draft submits (T01) and shows WF-PENDING-1. A moderator in WF-MOD-QUEUE-1 and WF-MOD-REVIEW-1 first requests changes (T02, hints beside fields, email in Mailpit), the member revises and resubmits (T03), then the moderator publishes (T04). A second draft is rejected (T05) with a deletion date 30 days out, an appeal is filed by the member and resolved by a different moderator when two exist (or with the same-moderator disclosure), and an overturn restores the draft. The lifecycle table has exhaustive table-driven tests, the privacy and eligibility fixture corpora pass, the retention job deletes expired drafts under a fake clock, and `npm run verify` is green in both repos.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [03-u01](u01-lifecycle-table.md) | Lifecycle transition table and guard with exhaustive tests | can_server | 1.5 | 15 | 02-u09 | - |
| [03-u02](u02-privacy-detector.md) | Privacy detector with fixture corpus (PRIV-GATE-1, NAME-1) | can_server | 1.5 | 16 | - | - |
| [03-u03](u03-eligibility-checks.md) | Eligibility, language, URL and secret checks with corpus | can_server | 1.5 | 17 | - | - |
| [03-u04](u04-fingerprint.md) | Draft fingerprint: normalisation, salted HMAC and repost match | can_server | 1 | 41 | 02-u10 | - |
| [03-u05](u05-transition-engine.md) | Transition engine with atomic event write and pending confirm | can_server | 1.5 | 42 | 03-u01, 02-u10, 02-u08 | - |
| [03-u06](u06-draft-endpoints.md) | Draft endpoints: create, edit, delete, my problems | can_server | 1.5 | 43 | 03-u05, 03-u03 | - |
| [03-u07](u07-transitions-endpoint.md) | Transitions endpoint and allowed-actions | can_server | 1.2 | 44 | 03-u06 | - |
| [03-u08](u08-checks-endpoint.md) | Checks endpoint, preview and T01/T03 synchronous gate | can_server | 1.5 | 45 | 03-u02, 03-u03, 03-u04, 03-u07 | - |
| [03-u09](u09-moderation-read.md) | Moderation schema, rule registry, queue and problem decisions read | can_server | 1.5 | 46 | 03-u07 | - |
| [03-u10](u10-moderation-decisions.md) | Moderation decisions: publish, request changes, reject | can_server | 1.5 | 47 | 03-u09, 03-u08 | - |
| [03-u11](u11-decision-emails.md) | Decision and reminder emails via Mailpit | can_server | 1 | 48 | 03-u10, 02-u06 | - |
| [03-u12](u12-appeals-file.md) | Appeals: schema, reviewer selection and filing | can_server | 1.5 | 49 | 03-u10 | - |
| [03-u13](u13-appeals-resolve.md) | Appeals: resolve with uphold or overturn effects | can_server | 1.5 | 50 | 03-u12, 03-u11 | - |
| [03-u14](u14-retention-jobs.md) | Retention jobs: draft purge, fingerprints, idle revisions | can_server | 1.5 | 51 | 03-u13, 03-u04 | - |
| [03-u15](u15-invites-endpoint.md) | Moderator-issued invites endpoint | can_server | 0.8 | 52 | 02-u08 | - |
| [03-u16](u16-draft-store.md) | Local draft store with autosave | can_app | 1 | 24 | - | - |
| [03-u17](u17-submit-steps-1-3.md) | Submit steps 1 to 3: condition, affected, where | can_app | 1.5 | 53 | 03-u16, 03-u06, 02-u14, 02-u16 | - |
| [03-u18](u18-submit-steps-4-5.md) | Submit steps 4 and 5: observed vs uncertain, evidence links | can_app | 1.2 | 54 | 03-u17 | - |
| [03-u19](u19-submit-steps-6-7.md) | Submit steps 6 and 7: privacy review, preview, submit | can_app | 1.5 | 55 | 03-u18, 03-u08, 03-u07 | - |
| [03-u20](u20-pending-and-myactivity.md) | Pending review and my activity screens | can_app | 1.2 | 56 | 03-u19 | - |
| [03-u21](u21-decision-screens.md) | Decision screens with hints beside fields and revise-resubmit | can_app | 1.5 | 57 | 03-u20, 03-u10, 03-u09 | - |
| [03-u22](u22-appeal-screen.md) | Appeal screen | can_app | 0.8 | 58 | 03-u21, 03-u12 | - |
| [03-u23](u23-mod-queue-invite.md) | Moderator queue and invite screens | can_app | 1.5 | 59 | 03-u09, 03-u15, 02-u16, 02-u15 | - |
| [03-u24](u24-mod-review-screen.md) | Moderator review screen with explainable decision form | can_app | 1.5 | 60 | 03-u23, 03-u10, 03-u08 | - |
| [03-u25](u25-mod-appeal-screen.md) | Moderator appeal review screen | can_app | 1 | 61 | 03-u24, 03-u13 | - |

Notes: the transitions endpoint refuses T02, T04 and T05 (those happen only through moderation decisions). Proposes-and-confirms transitions (T14, T19, T20) are modelled in the engine here but their field validation lands in plan 05.

## Risks
- Name detection is heuristic. Default: err toward flagging, always allow "Keep as is" for the author (moderator sees the kept flag), never auto-reject on a flag. Precision and recall are measured later (docs say evaluation sets are small and hand written).
- Single moderator pool: reviewer-selection must work for pools of 1 (disclosure) and 2 or more (different reviewer).
- Time-based jobs: all tested through the injected Clock.

## depends_on_plans
02
