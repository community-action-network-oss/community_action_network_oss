---
id: "12"
title: "Stage plans and volunteer review"
approved: true
status: todo
depends_on_plans: ["02", "03", "04", "09", "10"]
spec: ["docs/spec/01-slice-1-brief.md","docs/spec/01a-lifecycle.md","docs/spec/01b-stages.md","docs/design/components/server.md","docs/design/ux/ui-unit-template.md","docs/spec/constitution/rules.md"]
---
# Plan 12: Stage plans and volunteer review

## Goal
Lifecycle v2 (D-72): the poster prepares a complete structured problem privately, opted-in volunteers review it with personal data masked, the AI publication decision publishes it, and a per-problem stage plan (a DAG) runs until the final acceptance criteria are met. This plan builds the stages domain and gating engine, stage persistence and API, the review module, the preparation API, the preparation, review and stage screens, plan changes, contributing ahead to planned stages, the impacted and guest label UI (D-73) and the end-to-end journey.

## Acceptance for the whole plan
On a seeded problem with the FakeModel: a poster prepares facts, sources and final criteria with a stage plan of two parallel stages, sends it to volunteer review, two volunteers recommend changes, the poster accepts one and declines one with reasons, the publication decision publishes it, a contribution is made ahead to a `planned` stage, the parallel stages run options, choice, steps and evidence and resolve through DP-STAGE-RESOLUTION, a plan change is proposed and accepted, and the problem reaches `solved` through DP-VERIFICATION against the final criteria. Guest contributions are labelled and the Impacted-only filter hides them with a visible count. `npm run verify` is green in both repos and the Playwright journey passes.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [12-u01](u01-stages-domain.md) | Stages domain: stage plan DAG, acceptance criteria, gating engine and stage state machine (ST01 to ST11) | can_server | 1.5 | 16 | 02-u09 | - |
| [12-u02](u02-stages-persistence-api.md) | Stages persistence and API: stage, stage_edge, acceptance_criterion, stage_option, stage_choice, stage_evidence | can_server | 1.5 | 46 | 12-u01, 02-u10, 02-u08, 03-u05 | - |
| [12-u03](u03-review-module.md) | Review module: opt-in volunteers, masked review view, review_recommendation, poster accept or decline, quorum | can_server | 1.5 | 48 | 12-u04, 12-u02, 09-u09, 09-u22, 02-u04 | - |
| [12-u04](u04-preparation-api.md) | Preparation API: sources, final acceptance criteria, optional stage plan, and problem states v2 (T00 to T10) | can_server | 1.5 | 47 | 12-u02, 03-u05, 03-u06, 03-u08, 02-u10 | - |
| [12-u05](u05-stage-map-screen.md) | Problem page stage map (WF-STAGEMAP-1) with accessible list view | can_app | 1.5 | 36 | 12-u02, 02-u20, 02-u24, 02-u25, 02-u14 | - |
| [12-u06](u06-stage-engine.md) | Stage transition engine: ST01 to ST11 on rows, the gating transaction, start, submit and block endpoints | can_server | 1.5 | 49 | 12-u02, 03-u05, 12-u04 | - |
| [12-u07](u07-stage-resolution.md) | Stage resolution: DP-STAGE-RESOLUTION adapter, ST04 to ST06, per-criterion results and appeals | can_server | 1.5 | 50 | 12-u06, 09-u23, 09-u22, 09-u33 | - |
| [12-u08](u08-publication-decision.md) | Publication decision adapter: DP-PUBLISH on the in_review problem, open recommendations weighed, T02, T04, T05 and T09 applied | can_server | 1.5 | 51 | 12-u03, 12-u04, 09-u23, 09-u24, 09-u18, 03-u11 | - |
| [12-u09](u09-plan-change.md) | Plan change after publication (PLAN-CHANGE-1, T22): proposals, DP-STAGE-PLAN, atomic plan version | can_server | 1.5 | 52 | 12-u06, 09-u23, 04-u07 | - |
| [12-u10](u10-templates-ahead-fixtures.md) | Stage templates endpoint, attaching contributions made ahead to an active stage (STAGE-PREP-1), stage fixtures | can_server | 1.2 | 53 | 12-u06, 04-u02, 02-u12 | - |
| [12-u11](u11-impact-read-side.md) | Impact label read side: impactedOnly filter and exact filter counts on every content list | can_server | 1.5 | 54 | 14-u02, 04-u02, 12-u02, 12-u03 | - |
| [12-u12](u12-prep-workspace-screen.md) | Preparation workspace (WF-PREP-1): parts, sources with trust hints, readiness, send to volunteer review | can_app | 1.5 | 37 | 12-u04, 03-u16, 10-u05, 10-u29, 02-u14, 02-u16, 02-u24, 02-u25 | - |
| [12-u13](u13-criteria-editor-screen.md) | Acceptance criteria editor (WF-PREP-2): final criteria and a reusable per-stage editor | can_app | 1.2 | 38 | 12-u04, 10-u05, 02-u14, 12-u12, 02-u24, 02-u25 | - |
| [12-u14](u14-stage-plan-editor-screen.md) | Stage plan editor (WF-PREP-3): templates, graph and list, dependency checkboxes, classic-5 | can_app | 1.5 | 39 | 12-u13, 12-u10, 12-u05, 12-u04, 02-u24, 02-u25 | - |
| [12-u15](u15-review-queue-screen.md) | Volunteer review queue and opt-in (WF-VREVIEW-1) | can_app | 1.2 | 40 | 12-u03, 02-u16, 02-u15, 02-u24, 02-u25 | - |
| [12-u16](u16-review-problem-screen.md) | Review a problem and make recommendations (WF-VREVIEW-2) | can_app | 1.5 | 41 | 12-u15, 12-u05, 10-u05, 10-u29, 02-u24, 02-u25 | - |
| [12-u17](u17-review-resolve-screen.md) | Poster resolves recommendations and requests publication (WF-VREVIEW-3) | can_app | 1.5 | 42 | 12-u03, 12-u12, 10-u05, 02-u24, 02-u25 | - |
| [12-u18](u18-stage-workspace-screen.md) | Stage workspace (WF-STAGE-1): options, choice, steps, evidence, criteria and submit | can_app | 1.5 | 43 | 12-u05, 12-u06, 04-u08, 04-u09, 04-u10, 10-u05, 10-u29, 02-u24, 02-u25 | - |
| [12-u19](u19-stage-result-screen.md) | Stage resolution result (WF-STAGE-2) and the final solved result | can_app | 1.2 | 44 | 12-u07, 12-u18, 09-u51, 02-u24, 02-u25 | - |
| [12-u20](u20-stage-ahead-screen.md) | Contribute ahead to a planned stage (WF-STAGE-3) | can_app | 1.2 | 45 | 12-u18, 04-u08, 12-u10, 02-u24, 02-u25 | - |
| [12-u21](u21-plan-change-screen.md) | Propose a plan change (WF-STAGEMAP-1 action): form, status and plan history | can_app | 1.5 | 46 | 12-u09, 12-u14, 12-u05, 02-u24, 02-u25 | - |
| [12-u22](u22-guest-badge-components.md) | Guest badge and explanation sheet (WF-GUEST-1), wired into every content list | can_app | 1.2 | 47 | 12-u11, 04-u08, 12-u18, 02-u24, 02-u25 | - |
| [12-u23](u23-impacted-filter-component.md) | Impacted only filter (WF-FILTER-1) on every content list | can_app | 1.2 | 48 | 12-u22, 12-u11, 02-u24, 02-u25 | - |
| [12-u24](u24-location-permission-screen.md) | Location permission pre-prompt (WF-LOCPERM-1) wired to the attestation challenge | can_app | 1.5 | 49 | 12-u22, 14-u02, 04-u08, 02-u24, 02-u25 | - |
| [12-u25](u25-journey-server-v2.md) | Server e2e on FakeModel: prepare, review, publish, parallel stages, plan change, solved | can_server | 1.5 | 55 | 12-u07, 12-u08, 12-u09, 12-u10, 12-u11, 04-u05, 09-u44 | - |
| [12-u26](u26-journey-app-v2.md) | Playwright journey: prepare, volunteer review, publish, stages in parallel, plan change, solved (FakeModel) | can_app | 1.5 | 60 | 12-u12, 12-u13, 12-u14, 12-u15, 12-u16, 12-u17, 12-u18, 12-u19, 12-u20, 12-u21, 12-u23, 12-u25, 02-u21, 09-u48, 09-u49 | - |

The five anchors 12-u01 to 12-u05 are fixed ids that plans 13 and 14 depend on. 12-u12 to 12-u24 are can_app units on the schema renderer (10-u05) and the gluestack civic wrappers (02-u24, 02-u25). 12-u22 to 12-u24 need the attestation API 14-u02.

## Risks
- Several units edit the shared `openapi.json` and `src/db/schema.ts`; server units are strictly serial in the server lane.
- The DPs introduced by D-72 (DP-SOURCE-TRUST, DP-CRITERIA, DP-STAGE-PLAN, DP-PUBLISH, DP-STAGE-RESOLUTION) are planned in plans 09 and 10; this plan builds the adapters and ports and uses fakes until they land.
- The impacted and guest label depends on the attestation API (14-u02).

## depends_on_plans
02, 03, 04, 09, 10
