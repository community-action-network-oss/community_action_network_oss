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
A signed-in member can turn a frustration into a private draft, pass the deterministic privacy and eligibility checks, and submit it. The lifecycle v2 state machine (T00 to T22 of docs/spec/01a-lifecycle.md; D-72) lands here and every later plan uses it. Preparation sources, criteria and the stage plan (12-u04), volunteer review (12-u03) and stage plans (12-u01, 12-u02) are plan 12. Who decides is not a person: after the synchronous checks a blocking moderation run applies the community's published policy (plan 09); this plan builds the checks, the engine, the decision table and the rule registry, the emails, retention on the shared job queue, and the steward invite screen. Human moderator queues, reviewer selection and human appeals were removed by D-51 and are replaced by plan 09; volunteer review before publication (D-72) is plan 12. The submit form itself is the schema renderer of plan 10 (10-u33), not hard-coded steps.

## Spec refs
- docs/spec/01-slice-1-brief.md sections 4, 5, 9, docs/spec/01a-lifecycle.md and 01b-stages.md (state tables T00 to T22 and ST01 to ST11)
- docs/design/system-design.md sections 2, 4, 6, 9 (modules, events, API, fixtures)
- docs/spec/constitution/rules.md: PRIV-GATE-1, NAME-1, SCOPE-1, PUB-FAILCLOSED-1, MOD-EXPLAIN-1, NO-INSTANCE-OVERRIDE-1, INTERIM-1 (transitional stewardship), DRAFT-TTL-1, CRISIS-STATIC-1
- wireframes prepare.md (WF-PREP-1), submit.md (WF-SUBMIT-2 to 4 kept, WF-PENDING-1, WF-MYACT-1) and moderation.md (WF-MOD-INVITE-1)

## Acceptance for the whole plan
Against the dev seed: a member signs in, writes a draft (local autosave survives a reload and a session expiry, the draft pins its schema version), a flagged name blocks sending with a field hint, and a clean draft passes the synchronous checks and moves to volunteer review (T01, in_review). From there plan 12 (review) and plan 09 (the publication decision) take over: with the FakeModel the blocking run publishes, requests changes (hints beside fields, email in Mailpit) or rejects with a deletion date 30 days out, and the member can appeal (09-u33 on). The lifecycle table has exhaustive table-driven tests including T20 and T21, the privacy and eligibility fixture corpora pass, the retention job deletes expired drafts under a fake clock through the shared queue, a steward can issue an invite that is shown once, and `npm run verify` is green in both repos. Units 03-u10, 03-u12, 03-u13, 03-u17 to 03-u22, 03-u24 and 03-u25 are skipped (superseded by plans 09 and 10).

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [03-u01](u01-lifecycle-table.md) | Lifecycle v2 transition table (T00 to T22) and guard with exhaustive tests | can_server | 1.5 | 15 | 02-u09 | - |
| [03-u02](u02-privacy-detector.md) | Privacy detector with fixture corpus (PRIV-GATE-1, NAME-1) | can_server | 1.5 | 16 | - | - |
| [03-u03](u03-eligibility-checks.md) | Eligibility, language, URL and secret checks with corpus | can_server | 1.5 | 17 | - | - |
| [03-u04](u04-fingerprint.md) | Draft fingerprint: normalisation, salted HMAC and repost match | can_server | 1 | 41 | 02-u10 | - |
| [03-u05](u05-transition-engine.md) | Transition engine with atomic event write and run-decision input | can_server | 1.5 | 42 | 03-u01, 02-u10, 02-u08 | - |
| [03-u06](u06-draft-endpoints.md) | Draft endpoints: create, edit, delete, my problems | can_server | 1.5 | 43 | 03-u05, 03-u03 | - |
| [03-u07](u07-transitions-endpoint.md) | Transitions endpoint and allowed-actions | can_server | 1.2 | 44 | 03-u06 | - |
| [03-u08](u08-checks-endpoint.md) | Checks endpoint, preview and T01/T03 synchronous gate (draft to in_review) | can_server | 1.5 | 45 | 03-u02, 03-u03, 03-u04, 03-u07 | - |
| [03-u09](u09-moderation-read.md) | Moderation decision table and public rule registry | can_server | 1.5 | 46 | 03-u07 | - |
| [03-u10](u10-moderation-decisions.md) | Moderation decisions: publish, request changes, reject (skipped: superseded by 09-u03, 09-u22, 09-u23) | can_server | 1.5 | 47 | 03-u09, 03-u08 | - |
| [03-u11](u11-decision-emails.md) | Decision and reminder emails via Mailpit | can_server | 1 | 48 | 03-u05, 03-u09, 02-u06 | - |
| [03-u12](u12-appeals-file.md) | Appeals: schema, reviewer selection and filing (skipped: superseded by 09-u33) | can_server | 1.5 | 49 | 03-u10 | - |
| [03-u13](u13-appeals-resolve.md) | Appeals: resolve with uphold or overturn effects (skipped: superseded by 09-u34, 09-u37) | can_server | 1.5 | 50 | 03-u12, 03-u11 | - |
| [03-u14](u14-retention-jobs.md) | Retention jobs on the job queue: draft purge, fingerprints, idle revisions | can_server | 1.5 | 51 | 09-u05, 03-u04, 03-u11 | - |
| [03-u15](u15-invites-endpoint.md) | Steward-issued invites endpoint | can_server | 0.8 | 52 | 02-u08 | - |
| [03-u16](u16-draft-store.md) | Local draft store with autosave | can_app | 1 | 24 | - | - |
| [03-u17](u17-submit-steps-1-3.md) | Submit steps 1 to 3: condition, affected, where (skipped: superseded by 10-u33) | can_app | 1.5 | 53 | 03-u16, 03-u06, 02-u14, 02-u16, 02-u24, 02-u25 | - |
| [03-u18](u18-submit-steps-4-5.md) | Submit steps 4 and 5: observed vs uncertain, evidence links (skipped: superseded by 10-u33) | can_app | 1.2 | 54 | 03-u17, 02-u24, 02-u25 | - |
| [03-u19](u19-submit-steps-6-7.md) | Submit steps 6 and 7: privacy review, preview, submit (skipped: superseded by 10-u33) | can_app | 1.5 | 55 | 03-u18, 03-u08, 03-u07, 02-u24, 02-u25 | - |
| [03-u20](u20-pending-and-myactivity.md) | Pending review and my activity screens (skipped: superseded by 09-u48, 09-u52) | can_app | 1.2 | 56 | 03-u19, 02-u24, 02-u25 | - |
| [03-u21](u21-decision-screens.md) | Decision screens with hints beside fields and revise-resubmit (skipped: superseded by 09-u49) | can_app | 1.5 | 57 | 03-u20, 03-u10, 03-u09, 02-u24, 02-u25 | - |
| [03-u22](u22-appeal-screen.md) | Appeal screen (skipped: superseded by 09-u51) | can_app | 0.8 | 58 | 03-u21, 03-u12, 02-u24, 02-u25 | - |
| [03-u23](u23-mod-queue-invite.md) | Steward invite screen (WF-MOD-INVITE-1) | can_app | 1.5 | 59 | 03-u15, 02-u16, 02-u15, 02-u24, 02-u25 | - |
| [03-u24](u24-mod-review-screen.md) | Moderator review screen with explainable decision form (skipped: superseded by 09-u53, 09-u54, 09-u55) | can_app | 1.5 | 60 | 03-u23, 03-u10, 03-u08, 02-u24, 02-u25 | - |
| [03-u25](u25-mod-appeal-screen.md) | Moderator appeal review screen (skipped: superseded by 09-u53, 09-u54) | can_app | 1 | 61 | 03-u24, 03-u13, 02-u24, 02-u25 | - |

Notes: the transitions endpoint refuses every run-decided transition (T02, T04, T05 and the rest of the run-decided set: only a recorded moderation run applies them, 09-u23). Initiator proposals (T13 to T17, T22) are modelled in the engine here, their field validation lands in plan 05 (T22 in 12-u09) and the deciding run in 09-u42. Transition side effects plug in through the TransitionEffects port (12-u04, 12-u06, 13-u01). 03-u09 creates the decision table that 09-u03 migrates to the AI model. Skipped units stay in the table for history.

## Risks
- Name detection is heuristic and is only the deterministic first layer. Default: err toward flagging, always allow "Keep as is" for the author (the moderation run sees the kept flag as an input), never auto-reject on a flag. Precision and recall are measured later (docs say evaluation sets are small and hand written).
- 03-u17 to 03-u19 are skipped in favour of 10-u33, but 10-u33 still lists 03-u19 in its depends_on; plan 10 must repoint it to 03-u16 and 03-u08.
- Time-based jobs: all tested through the injected Clock.

## depends_on_plans
02
