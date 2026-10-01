---
id: "10"
title: "can_policy and structured content"
approved: true
status: todo
depends_on_plans: ["02","03"]
spec: ["docs/design/ai/structured-content.md","docs/design/ai/policy-pack.md","docs/design/ai/decision-points.md","docs/design/ai/legal-stack.md","docs/design/flows/legal-corpus-update.md","docs/design/ai/amendment-loop.md","docs/design/ai/evaluation.md","docs/design/components/can-policy.md","docs/design/components/server.md","docs/design/components/app.md","docs/spec/constitution/rules.md","docs/spec/01-slice-1-brief.md","docs/design/ux/wireframes/forms.md","docs/design/ux/wireframes/policy.md","docs/design/ux/ui-unit-template.md","docs/adr/0009-can-policy-repo.md","docs/adr/0010-structured-content-everywhere.md"]
---
# Plan 10: can_policy and structured content

## Goal
The fifth repository, `can_policy`, exists and holds the first community-legislated policy pack: base rules, v1 content schemas for every content type (D-58), one prompt, output schema, labeled examples and eval set for each of the 19 decision points, limits, a fictional test overlay and an Amsterdam overlay skeleton (D-56). can_server loads packs by version and hash and serves schemas. can_app renders every form from the schema version, optionally helped by AI fill-assist with per-field confirmation. CI evaluates proposals and reports a replay diff. Policy proposals have a UI. The pack is ratified by transitional founder stewardship.

## Legal corpora (D-61)
Units 10-u41 to 10-u59 add the legal layer stack to can_policy under `packs/legal/<layer>/<jurisdiction>/`: the corpus format with source provenance (10-u41), an offline ingest tool (10-u42), L1 UN instruments (10-u43, 10-u44), L2 EU Charter, ECHR and an EU-law index stub (10-u45 to 10-u47), L3 Grondwet (10-u48, 10-u49), L4 to L6 stubs (10-u50), stack config and pins (10-u53), ratification checks (10-u54), the server loader and retrieval (10-u55, 10-u56), corpus activation jobs that trigger re-moderation and re-resolution (10-u57, consumed by 09-u60), and DP content for the stack and for DP-RERESOLUTION (10-u58, 10-u59). Every unit that fetches an official text or asserts law is founder-gated (10-u43, 10-u45, 10-u48 vendor with provenance because night runs may not fetch; 10-u51 and 10-u52 need lawyer review records, LEGAL-CORPUS-1). Corpora stay `draft` and unreviewed until a qualified reviewer signs.

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
| [10-u01](u01-create-can-policy-repo.md) | Create the empty can_policy GitHub repository (founder action) | . | 0.3 | 1 | - | yes |
| [10-u02](u02-scaffold-submodule.md) | Scaffold can_policy and add it as the fifth submodule | . | 1.2 | 2 | 10-u01 | - |
| [10-u03](u03-pack-format-and-ci.md) | Pack format, JSON schemas, hash tool and CI skeleton with npm run verify | can_policy | 1.5 | 3 | 10-u02 | - |
| [10-u04](u04-server-policy-module.md) | Policy module: pack loader, version registry, content-schema registry, PII-safe cache, fixture pack | can_server | 1.5 | 4 | - | - |
| [10-u05](u05-form-renderer.md) | Schema-driven form renderer on civic wrappers (WF-FORM-1 to 4) | can_app | 1.5 | 5 | 10-u04, 02-u25, 02-u14 | - |
| [10-u06](u06-base-rules-pack.md) | Base and constitution packs: rules.yaml from the registry with parity check | can_policy | 1.5 | 6 | 10-u03 | - |
| [10-u07](u07-limits-yaml.md) | limits.yaml with OQ-limits defaults and its schema | can_policy | 1 | 7 | 10-u03 | - |
| [10-u08](u08-schema-problem-v1.md) | Content schema v1: problem core (16 fields incl. sources and final acceptance criteria) | can_policy | 1.5 | 8 | 10-u07 | - |
| [10-u09](u09-schema-contribution-a.md) | Content schemas v1: contribution common fields and first seven types | can_policy | 1.5 | 9 | 10-u07 | - |
| [10-u10](u10-schema-contribution-b.md) | Content schemas v1: remaining contribution types | can_policy | 1.5 | 10 | 10-u09 | - |
| [10-u11](u11-content-schemas-v1-stage-option-stage.md) | Content schemas v1: stage_option, stage_choice, stage_evidence | can_policy | 1.5 | 11 | 10-u07, 10-u69 | - |
| [10-u12](u12-schema-appeal-policy-migration.md) | Content schemas v1: appeal and policy_proposal, plus migration-map format | can_policy | 1.5 | 12 | 10-u07 | - |
| [10-u13](u13-schema-completability-lint.md) | Schema completability lint: widgets, DP references, message ids, guidance in eval | can_policy | 1.2 | 13 | 10-u08, 10-u09, 10-u10, 10-u11, 10-u12, 10-u60, 10-u61, 10-u69, 10-u70 | - |
| [10-u14](u14-dp-scaffolding.md) | Decision-point scaffolding: shared prompt skeleton, output schema base, DP lint | can_policy | 1 | 14 | 10-u03 | - |
| [10-u15](u15-dp-intake-group.md) | Policy content: DP-ELIGIBILITY, DP-FRAMING, DP-DUPLICATE, DP-CONTRIB-RELEVANCE | can_policy | 1.5 | 15 | 10-u14, 10-u06, 10-u07, 10-u20 | - |
| [10-u16](u16-dp-safety-group.md) | Policy content: DP-PRIVACY, DP-NAMING, DP-TONE, DP-CRISIS | can_policy | 1.5 | 16 | 10-u14, 10-u06, 10-u07, 10-u20 | - |
| [10-u17](u17-dp-legal-group.md) | Policy content: DP-LEGALITY, DP-LEGAL, DP-DECISION-RECORD, DP-VERIFICATION | can_policy | 1.5 | 17 | 10-u14, 10-u06, 10-u07, 10-u20, 10-u11 | - |
| [10-u18](u18-dp-lifecycle-group.md) | Policy content: DP-EVIDENCE-TIER, DP-BLOCKER, DP-CLOSURE (DP-STAGE retired) | can_policy | 1.5 | 18 | 10-u14, 10-u06, 10-u07, 10-u20 | - |
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
| [10-u33](u33-facts-section-of-the-preparation-workspace.md) | Facts section of the preparation workspace (WF-PREP-1) and the exact preview, on the schema renderer | can_app | 1.5 | 33 | 10-u05, 10-u29, 03-u16, 03-u08, 10-u08 | - |
| [10-u34](u34-contribution-and-stage-option-forms-rebuilt.md) | Contribution and stage option forms rebuilt on the schema renderer | can_app | 1.5 | 34 | 10-u05, 10-u29, 10-u10, 04-u08, 04-u09 | - |
| [10-u35](u35-resolution-appeal-forms.md) | Decision record, task and verification forms rebuilt on the schema renderer | can_app | 1.5 | 35 | 10-u05, 10-u29, 10-u11, 04-u10, 05-u05, 05-u08, 10-u70 | - |
| [10-u36](u36-assist-and-hints.md) | Fill-assist per-field confirm and revision hints beside fields (WF-FORM-2, WF-FORM-3) | can_app | 1.5 | 36 | 10-u30, 10-u33, 09-u24, 09-u26 | - |
| [10-u37](u37-draft-migration-screen.md) | Draft schema version change screen: pin, move, confirm mappings (WF-FORM-5) | can_app | 1.5 | 37 | 10-u31, 10-u33 | - |
| [10-u38](u38-policy-proposal-form.md) | Policy proposal form on the schema renderer (WF-POLICY-1) | can_app | 1.5 | 38 | 10-u32, 10-u05, 10-u12 | - |
| [10-u39](u39-policy-proposal-view.md) | Policy proposal view: eval results, replay diff, ratification, rollout (WF-POLICY-2) | can_app | 1.5 | 39 | 10-u38, 10-u32 | - |
| [10-u40](u40-server-fixture-refresh.md) | Refresh the server fixture pack from can_policy v1.0.0 and pin it in test config | can_server | 0.8 | 40 | 10-u27, 10-u29 | - |
| [10-u41](u41-legal-corpus-format-layout-corpus-yaml-provenance.md) | Legal corpus format: layout, corpus.yaml provenance, schemas and lint (LEGAL-SOURCE-1) | can_policy | 1.5 | 41 | 10-u03, 10-u06 | - |
| [10-u42](u42-legal-ingest-tool-deterministic-article-split-from.md) | Legal ingest tool: deterministic article split from a vendored official source | can_policy | 1.5 | 42 | 10-u41 | - |
| [10-u43](u43-vendor-l1-official-sources-udhr-iccpr-icescr.md) | Vendor L1 official sources: UDHR, ICCPR, ICESCR (founder or interactive, network) | can_policy | 0.8 | 43 | 10-u42 | yes |
| [10-u44](u44-build-l1-un-human-rights-corpora-udhr.md) | Build L1 UN human-rights corpora: UDHR, ICCPR, ICESCR articles and draft topic index | can_policy | 1.5 | 44 | 10-u43 | - |
| [10-u45](u45-vendor-l2-official-sources-eu-charter-of.md) | Vendor L2 official sources: EU Charter of Fundamental Rights and ECHR (founder or interactive, network) | can_policy | 0.8 | 45 | 10-u42 | yes |
| [10-u46](u46-build-l2-corpora-eu-charter-and-echr.md) | Build L2 corpora: EU Charter and ECHR articles and draft topic index | can_policy | 1.5 | 46 | 10-u45 | - |
| [10-u47](u47-eu-law-index-stub-for-the-seed.md) | EU-law index stub for the seed topics (index only, no text) | can_policy | 1.0 | 47 | 10-u41 | - |
| [10-u48](u48-vendor-l3-official-source-constitution-of-the.md) | Vendor L3 official source: Constitution of the Kingdom of the Netherlands (founder or interactive, network) | can_policy | 0.8 | 48 | 10-u42 | yes |
| [10-u49](u49-build-l3-dutch-constitution-corpus-grondwet-dutch.md) | Build L3 Dutch constitution corpus (Grondwet, Dutch authoritative) and draft topic index | can_policy | 1.5 | 49 | 10-u48 | - |
| [10-u50](u50-l4-dutch-national-law-index-l5-noord.md) | L4 Dutch national-law index, L5 Noord-Holland and L6 Amsterdam stubs (no legal assertion) | can_policy | 1.2 | 50 | 10-u41, 10-u21 | - |
| [10-u51](u51-l4-to-l6-legal-content-selected-national.md) | L4 to L6 legal content: selected national statute, province and Amsterdam bylaw articles with lawyer review (founder action) | can_policy | 1.5 | 51 | 10-u50, 10-u42 | yes |
| [10-u52](u52-lawyer-review-records-for-l1-to-l3.md) | Lawyer review records for L1 to L3 corpora and topic indexes (LEGAL-CORPUS-1, founder action) | can_policy | 1.0 | 52 | 10-u44, 10-u46, 10-u49, 10-u54 | yes |
| [10-u53](u53-legal-stack-config-jurisdiction-pins-binding-or.md) | Legal stack config: jurisdiction pins, binding or reference per layer, retrieval limits | can_policy | 1.0 | 53 | 10-u41, 10-u21, 10-u07 | - |
| [10-u54](u54-legal-corpus-ratification-and-eval-checks-in.md) | Legal corpus ratification and eval checks in CI (review record, citations resolve, replay) | can_policy | 1.5 | 54 | 10-u41, 10-u26, 10-u25 | - |
| [10-u55](u55-legal-corpus-loader-and-registry-in-the.md) | Legal corpus loader and registry in the policy module, with synthetic fixture corpora | can_server | 1.5 | 55 | 10-u04, 10-u41 | - |
| [10-u56](u56-topic-index-and-article-retrieval-only-relevant.md) | Topic index and article retrieval: only relevant articles enter a prompt, within context budgets | can_server | 1.5 | 56 | 10-u55 | - |
| [10-u57](u57-corpus-activation-events-re-moderation-and-re.md) | Corpus activation events: re-moderation and re-resolution jobs on a legal corpus version change | can_server | 1.5 | 57 | 10-u55, 09-u27 | - |
| [10-u58](u58-policy-content-legal-stack-examples-and-eval.md) | Policy content: legal-stack examples and eval for DP-LEGALITY, DP-ELIGIBILITY, DP-LEGAL (layered citation, topic ban, conflict hold) | can_policy | 1.5 | 58 | 10-u17, 10-u15, 10-u41 | - |
| [10-u59](u59-policy-content-dp-reresolution-prompt-output-schema.md) | Policy content: DP-RERESOLUTION prompt, output schema, examples and eval | can_policy | 1.5 | 59 | 10-u14, 10-u06, 10-u07, 10-u41, 10-u61 | - |
| [10-u60](u60-content-schema-v1-review-recommendation.md) | Content schema v1: review_recommendation | can_policy | 1 | 60 | 10-u08, 10-u07 | - |
| [10-u61](u61-content-schemas-v1-archive-record-path.md) | Content schemas v1: archive_record, path_suggestion, stage_draft | can_policy | 1.5 | 61 | 10-u69, 10-u07 | - |
| [10-u62](u62-policy-content-dp-source-trust-and.md) | Policy content: DP-SOURCE-TRUST and DP-CRITERIA | can_policy | 1.5 | 62 | 10-u14, 10-u06, 10-u07, 10-u20, 10-u08, 10-u11 | - |
| [10-u63](u63-policy-content-dp-stage-plan-and.md) | Policy content: DP-STAGE-PLAN and DP-PUBLISH | can_policy | 1.5 | 63 | 10-u14, 10-u06, 10-u07, 10-u20, 10-u69, 10-u60, 10-u62 | - |
| [10-u64](u64-policy-content-dp-stage-resolution-replaces.md) | Policy content: DP-STAGE-RESOLUTION (replaces DP-STAGE) | can_policy | 1.5 | 64 | 10-u14, 10-u06, 10-u07, 10-u20, 10-u11, 10-u62 | - |
| [10-u65](u65-policy-content-dp-archive-dp-reuse.md) | Policy content: DP-ARCHIVE, DP-REUSE-FIT, DP-STAGE-DRAFT | can_policy | 1.5 | 65 | 10-u14, 10-u06, 10-u07, 10-u20, 10-u61, 10-u62, 10-u63 | - |
| [10-u66](u66-limits-yaml-archive-reuse-review-stage.md) | limits.yaml: archive, reuse, review, stage and location pack values | can_policy | 1 | 66 | 10-u07 | - |
| [10-u67](u67-second-synthetic-jurisdiction-fiktiva-north-overlay.md) | Second synthetic jurisdiction: fiktiva-north overlay and legal stack with deliberate differences | can_policy | 1.5 | 67 | 10-u20, 10-u41, 10-u53 | - |
| [10-u69](u69-problem-schema-parts-context-profile-stage.md) | Problem schema parts: context_profile, stage_plan and affected_area | can_policy | 1.5 | 69 | 10-u08, 10-u07 | - |
| [10-u70](u70-content-schemas-v1-decision-record-records.md) | Content schemas v1: decision_record (records stage_choice), task, verification | can_policy | 1.2 | 70 | 10-u11, 10-u69 | - |

## Risks
- 10-u04 is large. Its `defaults` allow the cache to land unwired.
- Prompts and examples are written before any live model has seen them. The eval numbers they produce are only meaningful on recorded responses until a founder-gated live run (plan 11).
- The Amsterdam overlay is real law drafted from public sources and stays marked unreviewed until the founder-gated review unit is done (OQ-amsterdam-overlay-review).
- The fill-assist endpoint (10-u30) depends on plan 09 units 09-u08 (AiGatewayPort), 09-u09 (privacy gateway) and 09-u12 (FakeModel). The appeal form and post-decision hints are plan 09 (09-u49, 09-u51), not this plan.

## depends_on_plans
02, 03
