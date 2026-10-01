---
id: "13"
title: "Archive and path reuse"
approved: true
status: todo
depends_on_plans: ["02", "09"]
spec: ["docs/spec/24-archive-reuse.md", "docs/design/ai/archive-reuse.md"]
---
# Plan 13: Archive and path reuse

## Goal
Placeholder, rewritten in full by this planner.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [13-u01](u01-archive-module-tables-terminal-state-hook.md) | Archive module: tables, terminal-state hook and public read API | can_server | 1.5 | 400 | 02-u03, 02-u10, 03-u05, 09-u05 | - |
| [13-u02](u02-archive-record-assembler-deterministic-build-from.md) | Archive record assembler: deterministic build from the ended problem | can_server | 1.5 | 401 | 13-u01, 12-u02, 12-u03, 12-u06 | - |
| [13-u03](u03-context-profile-builder-and-api-deterministic.md) | context_profile builder and API: deterministic mapping, fixed taxonomy, poster confirms | can_server | 1.5 | 402 | 13-u01, 10-u08, 10-u69, 12-u04, 09-u56 | - |
| [13-u04](u04-dp-archive-handler-privacy-re-strip.md) | DP-ARCHIVE handler: privacy re-strip, completeness, safety, publish or hold | can_server | 1.5 | 403 | 13-u02, 13-u03, 09-u22, 09-u23, 09-u09, 09-u17, 10-u65 | - |
| [13-u05](u05-archive-provenance-ratified-flag-simulation-label.md) | Archive provenance, ratified flag, simulation label, annotation and retraction | can_server | 1.2 | 404 | 13-u04 | - |
| [13-u06](u06-pgvector-and-the-context-index-schema.md) | pgvector and the context index schema with full-text and hnsw indexes | can_server | 1.2 | 405 | 13-u01 | - |
| [13-u07](u07-embeddingport-with-openrouter-local-small-model.md) | EmbeddingPort with OpenRouter, local small model and fake adapters; model register entries | can_server | 1.5 | 406 | 13-u06, 09-u68, 09-u09, 09-u12, 09-u13, 09-u14 | - |
| [13-u08](u08-index-builder-job-chunk-embed-and.md) | Index builder job: chunk, embed and upsert on archive.published, re-embed on model change | can_server | 1.5 | 407 | 13-u07, 13-u04, 09-u05 | - |
| [13-u09](u09-hybrid-retrieval-structured-filter-full-text.md) | Hybrid retrieval: structured filter, full text, vectors, reciprocal rank fusion | can_server | 1.5 | 408 | 13-u08, 13-u03 | - |
| [13-u10](u10-ranking-and-explanation-per-dimension-similarity.md) | Ranking and explanation: per-dimension similarity, pack-value weights, diversity | can_server | 1.3 | 409 | 13-u09, 10-u66 | - |
| [13-u11](u11-dp-reuse-fit-deterministic-checks-legality.md) | DP-REUSE-FIT deterministic checks: legality under the new stack, resource fit, differences | can_server | 1.5 | 410 | 13-u10, 09-u56, 09-u57, 10-u56 | - |
| [13-u12](u12-dp-reuse-fit-handler-adaptations-outcomes.md) | DP-REUSE-FIT handler: adaptations, outcomes, wiring into the run DAG | can_server | 1.5 | 411 | 13-u11, 09-u22, 09-u16, 09-u17, 10-u65 | - |
| [13-u13](u13-path-suggestion-service-lifecycle-debounce-privacy.md) | path_suggestion service: lifecycle, debounce, privacy gateway, cache, budget | can_server | 1.5 | 412 | 13-u12, 09-u14, 09-u19, 09-u09, 12-u04 | - |
| [13-u14](u14-suggestion-api-events-list-detail-accept.md) | Suggestion API: events, list, detail, accept, dismiss and the review speed-up summary | can_server | 1.5 | 413 | 13-u13, 12-u03 | - |
| [13-u15](u15-stage-draft-and-dp-stage-draft.md) | stage_draft and DP-STAGE-DRAFT: private AI-drafted plan after publication | can_server | 1.5 | 414 | 13-u12, 12-u02, 12-u06, 09-u71, 10-u65, 13-u14 | - |
| [13-u16](u16-apply-a-stage-draft-as-a.md) | Apply a stage draft as a plan-change proposal; attribution survives edits | can_server | 1.3 | 415 | 13-u15, 12-u09, 09-u70, 09-u59 | - |
| [13-u17](u17-poisoned-record-defenses-data-blocks-injection.md) | Poisoned-record defenses: data blocks, injection tests, ratified-only SQL, retraction effects | can_server | 1.3 | 416 | 13-u09, 13-u04, 13-u05, 09-u17 | - |
| [13-u18](u18-retrieval-and-fit-eval-set-on.md) | Retrieval and fit eval set on the simulation archive: pairs, paraphrases, translations, distractors | can_policy | 1.5 | 417 | 10-u61, 10-u20, 10-u67, 10-u23 | - |
| [13-u19](u19-archive-eval-runner-recall-ndcg-cross.md) | Archive eval runner: recall, nDCG, cross-language gap, explanation accuracy, register gate | can_server | 1.5 | 418 | 13-u18, 13-u10, 13-u11, 09-u68 | - |
| [13-u20](u20-online-metrics-for-reuse-acceptance-edit.md) | Online metrics for reuse: acceptance, edit distance, time to publish, outcomes (aggregates only) | can_server | 1.2 | 419 | 13-u14, 13-u16, 09-u39 | - |
| [13-u21](u21-archive-and-suggestion-openapi-audit-key.md) | Archive and suggestion OpenAPI audit: key sets, no leaks, privacy invariants | can_server | 1.2 | 420 | 13-u14, 13-u16, 13-u05, 13-u20, 09-u43 | - |
| [13-u22](u22-e2e-a-seed-problem-archive-record.md) | E2E: a seed problem archive record suggests a path to a new problem elsewhere, with legality differences flagged | can_server | 1.5 | 421 | 13-u14, 13-u16, 13-u19, 13-u21, 10-u20, 10-u67, 09-u56, 10-u56 | - |
| [13-u23](u23-suggested-paths-panel-in-the-preparation.md) | Suggested paths panel in the preparation workspace (WF-SUGGEST-1) | can_app | 1.5 | 430 | 13-u14, 12-u12, 12-u05, 02-u13, 02-u24, 02-u25 | - |
| [13-u24](u24-suggestion-detail-and-use-as-starting.md) | Suggestion detail and "use as starting point" sheet (WF-SUGGEST-2) | can_app | 1.5 | 431 | 13-u23, 12-u05, 12-u14 | - |
| [13-u25](u25-archive-browse-and-search-wf-archive.md) | Archive browse and search (WF-ARCHIVE-1) | can_app | 1.5 | 432 | 13-u01, 13-u05, 02-u13, 02-u15, 02-u24, 02-u25 | - |
| [13-u26](u26-archived-case-view-the-full-journey.md) | Archived case view: the full journey, challenges and outcome (WF-ARCHIVE-2) | can_app | 1.5 | 433 | 13-u25, 12-u05 | - |
| [13-u27](u27-ai-drafted-stage-plan-screen-review.md) | AI-drafted stage plan screen: review, edit, apply (WF-STAGEDRAFT-1) | can_app | 1.5 | 434 | 13-u16, 12-u05, 12-u14, 12-u21 | - |
| [13-u28](u28-web-journey-test-suggest-use-publish.md) | Web journey test: suggest, use, publish, draft, apply (Playwright, fakes) | can_app | 1.2 | 435 | 13-u24, 13-u26, 13-u27, 02-u21, 12-u26 | - |

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [13-u01](u01-archive-module-tables-terminal-state-hook.md) | Archive module: tables, terminal-state hook and public read API | can_server | 1.5 | 400 | 02-u03, 02-u10, 03-u05, 09-u05 | - |
