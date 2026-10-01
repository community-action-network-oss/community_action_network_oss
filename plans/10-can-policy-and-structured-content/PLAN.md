---
id: "10"
title: "can_policy and structured content"
approved: true
status: todo
depends_on_plans: ["02","03"]
spec: ["docs/design/ai/structured-content.md","docs/design/ai/policy-pack.md","docs/design/ai/decision-points.md","docs/design/ai/amendment-loop.md","docs/design/ai/evaluation.md","docs/design/components/can-policy.md","docs/design/components/server.md","docs/design/components/app.md","docs/spec/constitution/rules.md","docs/spec/01-slice-1-brief.md","docs/design/ux/wireframes/forms.md","docs/design/ux/wireframes/policy.md","docs/design/ux/ui-unit-template.md","docs/adr/0009-can-policy-repo.md","docs/adr/0010-structured-content-everywhere.md"]
---
# Plan 10: can_policy and structured content

## Goal
The fifth repository, `can_policy`, exists and holds the first community-legislated policy pack: base rules, v1 content schemas for every content type (D-58), one prompt, output schema, labeled examples and eval set for each of the 19 decision points, limits, a fictional test overlay and an Amsterdam overlay skeleton (D-56). can_server loads packs by version and hash and serves schemas. can_app renders every form from the schema version, optionally helped by AI fill-assist with per-field confirmation. CI evaluates proposals and reports a replay diff. Policy proposals have a UI. The pack is ratified by transitional founder stewardship.

## Spec refs
- docs/design/ai/structured-content.md (all sections), policy-pack.md, decision-points.md, amendment-loop.md, evaluation.md
- docs/design/components/can-policy.md, server.md, app.md
- docs/design/flows/structured-submission.md, policy-schema-change.md, policy-amendment.md
- docs/design/ux/wireframes/forms.md (WF-FORM-1 to 5), policy.md (WF-POLICY-1, WF-POLICY-2)
- docs/spec/constitution/rules.md: STRUCT-ONLY-1, SCHEMA-1, ASSUMP-1, COMPLETE-1, AI-ASSIST-1, FOUNDER-TRANS-1
- docs/open-questions: OQ-content-schema-design, OQ-limits, OQ-amsterdam-overlay-review, OQ-ratification-method

## Acceptance for the whole plan
From the repo roots with no network: `npm run verify` is green in can_policy, can_server and can_app; a tampered pack is refused by the server loader; the problem form in the app is built entirely from `GET /v1/content-schemas/problem`; bumping a schema version in a fixture changes the form without a code change; all 19 DPs plus ASSIST-FILL have prompt, schema, at least 8 labeled examples and a disjoint eval set that the eval runner scores against recorded responses; the replay diff report flags a seeded unintended flip in a protected tier and blocks; the ratification record format loads; pack v1.0.0 builds with a stable hash. Founder-gated and not part of the green bar: GitHub repo creation, Amsterdam legal review content, ratification of v1.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [10-u01](u01-create-can-policy-repo.md) | Create the empty can_policy GitHub repository (founder action) | root | 0.3 | 1 | - | yes |
| [10-u02](u02-scaffold-submodule.md) | Scaffold can_policy and add it as the fifth submodule | root | 1.2 | 2 | 10-u01 | - |
| [10-u03](u03-pack-format-and-ci.md) | Pack format, JSON schemas, hash tool and CI skeleton with npm run verify | can_policy | 1.5 | 3 | 10-u02 | - |
| [10-u04](u04-server-policy-module.md) | Policy module: pack loader, version registry, content-schema registry, PII-safe cache, fixture pack | can_server | 1.5 | 4 | - | - |
| [10-u05](u05-form-renderer.md) | Schema-driven form renderer on civic wrappers (WF-FORM-1 to 4) | can_app | 1.5 | 5 | 10-u04, 02-u25, 02-u14 | - |
| [10-u06](u06-base-rules-pack.md) | Base and constitution packs: rules.yaml from the registry with parity check | can_policy | 1.5 | 6 | 10-u03 | - |
| [10-u07](u07-limits-yaml.md) | limits.yaml with OQ-limits defaults and its schema | can_policy | 1 | 7 | 10-u03 | - |
| [10-u08](u08-schema-problem-v1.md) | Content schema v1: problem (14 fields, messages, examples) | can_policy | 1.5 | 8 | 10-u07 | - |
| [10-u09](u09-schema-contribution-a.md) | Content schemas v1: contribution common fields and first seven types | can_policy | 1.5 | 9 | 10-u07 | - |
| [10-u10](u10-schema-contribution-b.md) | Content schemas v1: remaining contribution types | can_policy | 1.5 | 10 | 10-u09 | - |
| [10-u11](u11-schema-proposal-decision-task.md) | Content schemas v1: proposal, decision_record, task, verification | can_policy | 1.5 | 11 | 10-u07 | - |
| [10-u12](u12-schema-appeal-policy-migration.md) | Content schemas v1: appeal and policy_proposal, plus migration-map format | can_policy | 1.5 | 12 | 10-u07 | - |
| [10-u13](u13-schema-completability-lint.md) | Schema completability lint: widgets, DP references, message ids, guidance in eval | can_policy | 1.2 | 13 | 10-u08, 10-u09, 10-u10, 10-u11, 10-u12 | - |
| [10-u14](u14-dp-scaffolding.md) | Decision-point scaffolding: shared prompt skeleton, output schema base, DP lint | can_policy | 1 | 14 | 10-u03 | - |
| [10-u15](u15-dp-intake-group.md) | Policy content: DP-ELIGIBILITY, DP-FRAMING, DP-DUPLICATE, DP-CONTRIB-RELEVANCE | can_policy | 1.5 | 15 | 10-u14, 10-u06, 10-u07, 10-u20 | - |
| [10-u16](u16-dp-safety-group.md) | Policy content: DP-PRIVACY, DP-NAMING, DP-TONE, DP-CRISIS | can_policy | 1.5 | 16 | 10-u14, 10-u06, 10-u07, 10-u20 | - |
| [10-u17](u17-dp-legal-group.md) | Policy content: DP-LEGALITY, DP-LEGAL, DP-DECISION-RECORD, DP-VERIFICATION | can_policy | 1.5 | 17 | 10-u14, 10-u06, 10-u07, 10-u20 | - |
| [10-u18](u18-dp-lifecycle-group.md) | Policy content: DP-EVIDENCE-TIER, DP-STAGE, DP-BLOCKER, DP-CLOSURE | can_policy | 1.5 | 18 | 10-u14, 10-u06, 10-u07, 10-u20 | - |
| [10-u19](u19-dp-structure-group.md) | Policy content: DP-APPEAL, DP-ASSUMPTIONS, DP-COMPLETENESS and the ASSIST-FILL prompt | can_policy | 1.5 | 19 | 10-u14, 10-u06, 10-u07, 10-u20, 10-u08 | - |
| [10-u20](u20-fiktiva-city-overlay.md) | Fictional test jurisdiction overlay: fiktiva-city | can_policy | 0.8 | 20 | 10-u06 | - |
| [10-u21](u21-amsterdam-overlay-skeleton.md) | Amsterdam (NL) jurisdiction overlay skeleton, marked unreviewed | can_policy | 1 | 21 | 10-u06, 10-u20 | - |
| [10-u22](u22-amsterdam-overlay-content-review.md) | Amsterdam overlay legal content and reviewer (founder action) | can_policy | 1.5 | 22 | 10-u21 | yes |
| [10-u23](u23-eval-runner.md) | Eval runner: recorded responses, metrics with confidence bounds, threshold gate | can_policy | 1.5 | 23 | 10-u14, 10-u15 | - |
| [10-u24](u24-replay-diff-report.md) | Replay diff report: flips by direction, DP, rule and jurisdiction, protected-tier block | can_policy | 1.5 | 24 | 10-u23 | - |
| [10-u25](u25-ci-wiring.md) | CI wiring: eval, replay on PRs, reports as artifacts, protected-core refusal | can_policy | 0.8 | 25 | 10-u23, 10-u24, 10-u13 | - |
| [10-u26](u26-ratification-records.md) | Ratification record format, loader check fields and contributor docs | can_policy | 1 | 26 | 10-u03 | - |
| [10-u27](u27-pack-v1-build.md) | Build pack v1.0.0 candidate: manifests, release.json, CHANGELOG, server fixture export | can_policy | 1.2 | 27 | 10-u13, 10-u15, 10-u16, 10-u17, 10-u18, 10-u19, 10-u20, 10-u21, 10-u26, 10-u25 | - |
| [10-u28](u28-founder-ratify-pack-v1.md) | Founder stewardship ratification of pack v1.0.0 (founder action) | can_policy | 0.5 | 28 | 10-u27, 10-u22 | yes |
| [10-u29](u29-submission-validator-draft-pin.md) | Validate submissions against the pinned schema version; drafts pin schema id, version and hash | can_server | 1.5 | 29 | 10-u04, 03-u06 | - |
| [10-u30](u30-fill-assist-endpoint.md) | AI fill-assist endpoint through the privacy gateway (AI-ASSIST-1) | can_server | 1.5 | 30 | 10-u29, 09-u08, 09-u09, 09-u12 | - |
| [10-u31](u31-draft-schema-migration.md) | Draft schema migration: minor auto-migrate, major mapping with 30-day grace | can_server | 1.5 | 31 | 10-u29, 10-u12 | - |
| [10-u32](u32-policy-proposals-api.md) | Policy proposals API: submit, stage, protected-core refusal, eval and replay reports | can_server | 1.5 | 32 | 10-u29, 10-u24, 10-u12 | - |
| [10-u33](u33-problem-submit-via-renderer.md) | Problem submit flow rebuilt on the schema renderer (replaces hard-coded steps) | can_app | 1.5 | 33 | 10-u05, 10-u29, 03-u19, 03-u16 | - |
| [10-u34](u34-contribution-proposal-forms.md) | Contribution and proposal forms rebuilt on the schema renderer | can_app | 1.5 | 34 | 10-u05, 10-u29, 10-u10, 04-u08, 04-u09 | - |
| [10-u35](u35-resolution-appeal-forms.md) | Decision record, task and verification forms rebuilt on the schema renderer | can_app | 1.5 | 35 | 10-u05, 10-u29, 10-u11, 04-u10, 05-u05, 05-u08 | - |
| [10-u36](u36-assist-and-hints.md) | Fill-assist per-field confirm and revision hints beside fields (WF-FORM-2, WF-FORM-3) | can_app | 1.5 | 36 | 10-u30, 10-u33, 09-u24, 09-u26 | - |
| [10-u37](u37-draft-migration-screen.md) | Draft schema version change screen: pin, move, confirm mappings (WF-FORM-5) | can_app | 1.5 | 37 | 10-u31, 10-u33 | - |
| [10-u38](u38-policy-proposal-form.md) | Policy proposal form on the schema renderer (WF-POLICY-1) | can_app | 1.5 | 38 | 10-u32, 10-u05, 10-u12 | - |
| [10-u39](u39-policy-proposal-view.md) | Policy proposal view: eval results, replay diff, ratification, rollout (WF-POLICY-2) | can_app | 1.5 | 39 | 10-u38, 10-u32 | - |
| [10-u40](u40-server-fixture-refresh.md) | Refresh the server fixture pack from can_policy v1.0.0 and pin it in test config | can_server | 0.8 | 40 | 10-u27, 10-u29 | - |

Decisions taken as reversible defaults (report in the morning): (1) one repo-wide semver per tag, each pack in the tag carries it; (2) label and help messages for schema fields live in the pack beside each schema (`content-schemas/<type>/messages.en.json`) and are served with it, the UX copy deck stays the review source; (3) can_policy dependencies are exactly pinned `ajv` and `yaml`; (4) cross-repo data: can_policy never reads `../docs` except in tests that skip with a reason, and can_server ships its own fixture pack.

Cross-plan contract (fixed ids, plan 09 depends on them): 10-u01 repo creation (gate), 10-u02 scaffold, 10-u03 pack format and CI, 10-u04 server policy module, 10-u05 form renderer.

## Risks
- 10-u04 is large. Its `defaults` allow the cache to land unwired.
- Prompts and examples are written before any live model has seen them. The eval numbers they produce are only meaningful on recorded responses until a founder-gated live run (plan 11).
- The Amsterdam overlay is real law drafted from public sources and stays marked unreviewed until the founder-gated review unit is done (OQ-amsterdam-overlay-review).
- The fill-assist endpoint (10-u30) depends on plan 09 units 09-u08 (AiGatewayPort), 09-u09 (privacy gateway) and 09-u12 (FakeModel). The appeal form and post-decision hints are plan 09 (09-u49, 09-u51), not this plan.

## depends_on_plans
02, 03
