---
id: "10-u56"
plan: "10"
title: "Topic index and article retrieval: only relevant articles enter a prompt, within context budgets"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 56
depends_on: ["10-u55"]
writes: ["src/policy/legal/retrieval/**", "src/policy/legal/index.ts", "test/policy-legal/retrieval*.spec.ts"]
spec: ["docs/design/ai/legal-stack.md#3-retrieval-never-whole-codes", "docs/spec/15-ai-inference.md", "docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/design/components/can-policy.md"]
verify: ["npm run verify", "npx vitest run test/policy-legal"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A deterministic retriever over the topic indexes so a prompt never contains a whole code or treaty. It returns the few articles per layer that bind the item, with ids, versions and hashes.

## Steps
1. `retrieveLegal({jurisdiction, at, typedFields: {topic, place, responsible_roles, mechanism, authority}, dp, budgetTokens})`: select layers from `LegalRegistry.stackFor`; per layer look up candidates in the topic index by topics, actors, actions and constraint kinds (deterministic scoring, ties by article id); take `legal.retrieval.max_articles_per_layer`; always include articles with `always_for_dps` containing the DP; stop at `legal.retrieval.token_budget_per_run` (estimate by character count with a documented ratio).
2. Return `{layers: [{layer, corpus_version, corpus_hash, articles: [{article_id, text_sha256, text}], noneFound: boolean}], retrievalConfidence, escalate}`. A layer with no match returns `noneFound: true` rendered as "no applicable article found in L4 (version)" (a recorded fact, not a pass).
3. `escalate: true` when confidence is under `legal.retrieval.low_confidence_floor` and the topic is in `risky_topics` (the caller escalates to a stronger model, then hold). Optional embedding ranking is out of scope; leave a documented seam.
4. Provide `legalCacheKeyPart(result)` = sorted article ids with corpus versions and hashes, for the stage-output cache key (09-u19 consumes it) so a corpus change invalidates cached decisions.
5. Tests on the fiktiva fixtures: the L4 solution-blocking article is retrieved for the matching mechanism and not for an unrelated one; budget truncation is deterministic; `always` articles survive truncation; noneFound recorded; whole-code prompt is impossible (property test: output tokens never exceed budget).

## Acceptance
- Only relevant articles are returned, deterministically, within budget (tests).
- No-article layers are explicit facts, not passes.
- `npm run verify` green.

## Out of scope
- Prompt assembly and DP use (09-u56).
