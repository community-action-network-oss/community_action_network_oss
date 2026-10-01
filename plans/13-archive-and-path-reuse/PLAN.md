---
id: "13"
title: "Archive and path reuse"
approved: true
status: todo
depends_on_plans: ["02", "03", "09", "10"]
spec: ["docs/spec/24-archive-reuse.md", "docs/design/ai/archive-reuse.md", "docs/adr/0017-archive-and-path-reuse.md", "docs/design/flows/archive-on-terminal.md", "docs/design/flows/path-suggestion.md", "docs/design/flows/stage-draft.md", "docs/design/ux/wireframes/archive.md", "docs/design/ai/decision-points.md", "docs/spec/01a-lifecycle.md", "docs/spec/01b-stages.md", "docs/design/components/server.md", "docs/design/ux/ui-unit-template.md"]
---
# Plan 13: Archive and path reuse

## Goal
CAN's second main goal (D-76): every problem that ends, solved or not, is kept in a public Archive with personal data stripped, and a new problem can start from what worked or failed elsewhere. While a poster prepares a problem, the AI retrieves similar archived problems by context, explains the differences, checks the legal setting and the resources of the new place, and proposes an adapted path; the poster decides, nothing is adopted automatically, the source case is always credited, and one completed volunteer review is still required. After publication the AI drafts a stage plan from the suggestions the poster accepted. Everything is verified with FakeModel and a fake embedding first; embedding models and weights are chosen by eval against the simulation archive (D-65: free or cheap first, or a small local model).

## Spec refs
- docs/spec/24-archive-reuse.md, docs/design/ai/archive-reuse.md, ADR 0017
- docs/design/flows: archive-on-terminal, path-suggestion, stage-draft
- docs/design/ux/wireframes/archive.md: WF-SUGGEST-1, WF-SUGGEST-2, WF-ARCHIVE-1, WF-ARCHIVE-2, WF-STAGEDRAFT-1
- Rules: ARCHIVE-1, REUSE-CONTEXT-1, REUSE-CREDIT-1, REUSE-NOBLOCK-1, REVIEW-1, LEGAL-STACK-1
- Decisions D-61, D-65, D-72, D-74, D-76; open questions OQ-contribution-license, OQ-cross-language-reuse, OQ-archive-retention

## Contracts with other plans
- Anchor 13-u01 (archive tables, the TransitionEffects handler on T13 and T15 to T18, public read API) is depended on by plans 03 and 05 (the terminal transitions and archive links). Its table names are the vocabulary of .claude/skills/can-code-large/briefs/archive-v1.md.
- Plan 12 (stages, review, preparation, plan change): 13-u02 reads stage rows, stage events and recommendations; 13-u03 and 13-u13 hang off the preparation API (12-u04); 13-u14 adds a summary to the masked review view (12-u03); applying a stage draft is the plan change path of 12-u09; the screens mount inside 12-u12 and reuse 12-u05, 12-u14 and 12-u21. Plan 12 does not list this plan in depends_on_plans (and this plan does not list 12) to avoid a plan-level cycle through plans 03 and 05; unit edges in the table are the truth.
- Plan 09: DP-ARCHIVE, DP-REUSE-FIT and DP-STAGE-DRAFT are registered handlers on the run DAG, gateway, router, budget guard and model register (09-u68 gains an embedding kind); DP-STAGE-PLAN and DP-CRITERIA handlers (09-u70, 09-u71) check an applied draft. Re-resolution (09-u60 to 09-u66) reads the archive record built here.
- Plan 10: schemas archive_record, path_suggestion, stage_draft (10-u61), problem schema parts incl. context_profile (10-u69), DP content (10-u65), pack values for weights, debounce and thresholds (10-u66), the second synthetic jurisdiction fiktiva-north (10-u67). Eval data lives in can_policy (13-u18).
- Plan 11 produces the cold-start simulation records (11-u48) and runs the reuse scenario (11-u49).
- Plan 14 never feeds this plan: attestation data is never carried into an archive record (13-u04 strips and 13-u21 scans).
- Rate limits: this plan's routes are listed as follow-ups for 07-u02 in each route unit; nothing here edits the limits table.

## Acceptance for the whole plan
With FakeModel and FakeEmbedding only (no network, provider counter asserted at zero real calls): a seeded problem in fiktiva-city is driven to `solved` and its archive record is published by DP-ARCHIVE with the label "Seed problem, synthetic evidence" (13-u22). A poster preparing a similar problem in fiktiva-north gets a suggestion that credits the source, shows the differences per dimension, flags the option that is unlawful at L4 with layer, article and corpus version, shows resource fit, proposes adaptations, and cannot be used unadapted; accepting it never changes the problem; publication still needs a completed volunteer review; after publication a private stage draft with credit is offered, edited and applied through DP-STAGE-PLAN, and the credit survives later edits. Poisoned records are never retrieved or obeyed (13-u17), only ratified records are retrievable (database invariant, 13-u05), embedding outage degrades to structured plus text matches, and the retrieval eval gates the embedding model (13-u19). The app screens cite their wireframes and the UI unit template; the web journey passes (13-u28). Founder-gated and not part of the green bar: live model runs for embeddings and prompts (budget capped, D-65).

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

## Risks
- Retrieval quality on a tiny simulation archive is not evidence of quality on real problems: the honest empty state and the eval floors matter more than the first model choice; real archive text raises the bar later.
- Legality fail-closed means many suggestions are held when the corpus of a layer is missing (only fiktiva and the unreviewed Amsterdam skeleton exist): that is intended, and the empty state says so.
- Cross-language retrieval depends on the embedding model; machine-translated displays are labelled and the translation fallback goes through the privacy gateway.
- pgvector needs the pgvector image in docker compose and in the deploy target (13-u06 documents it); without the extension retrieval runs on structured plus full text.
- A large unit list shares src/db/schema.ts and openapi.json with plans 12 and 14: server units are serial in the lane; never hand-edit generated files.
- The default license (CC BY 4.0) is an open question (OQ-contribution-license): attribution is stored and shown either way.
