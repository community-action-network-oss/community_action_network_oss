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

Decisions taken as reversible defaults (report in the morning): (1) one repo-wide semver per tag, each pack in the tag carries it; (2) label and help messages for schema fields live in the pack beside each schema (`content-schemas/<type>/messages.en.json`) and are served with it, the UX copy deck stays the review source; (3) can_policy dependencies are exactly pinned `ajv` and `yaml`; (4) cross-repo data: can_policy never reads `../docs` except in tests that skip with a reason, and can_server ships its own fixture pack.

Cross-plan contract (fixed ids, plan 09 depends on them): 10-u01 repo creation (gate), 10-u02 scaffold, 10-u03 pack format and CI, 10-u04 server policy module, 10-u05 form renderer.

## Risks
- 10-u04 is large. Its `defaults` allow the cache to land unwired.
- Prompts and examples are written before any live model has seen them. The eval numbers they produce are only meaningful on recorded responses until a founder-gated live run (plan 11).
- The Amsterdam overlay is real law drafted from public sources and stays marked unreviewed until the founder-gated review unit is done (OQ-amsterdam-overlay-review).
- The fill-assist endpoint needs plan 09 gateway unit. See the blocked note on that unit.

## depends_on_plans
02, 03
