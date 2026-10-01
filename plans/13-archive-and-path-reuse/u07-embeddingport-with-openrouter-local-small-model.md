---
id: "13-u07"
plan: "13"
title: "EmbeddingPort with OpenRouter, local small model and fake adapters; model register entries"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 406
depends_on: ["13-u06","09-u68","09-u09","09-u12","09-u13","09-u14"]
writes: ["src/ai/embedding/**","src/archive/app/embedding/**","src/config.ts",".env.example","test/embedding.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#4-retrieval-hybrid","docs/adr/0014-openrouter-free-first-models.md","docs/design/ai/runtime.md","docs/design/ai/safety-and-privacy.md","docs/open-questions/OQ-cross-language-reuse.md","docs/design/components/server.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Embeddings through the same rules as every model call (D-65): free or cheap first, chosen by eval, behind the privacy gateway, budget capped, with a small local model as the fallback. Archive text is public by design, a poster's draft text is not.

## Steps
1. Port `EmbeddingPort.embed(texts, {purpose: "archive_record" | "query_draft", lang})` returning `{modelId, dim, vectors}`. Calls go through `AiGatewayPort` (09-u08) so budgets (09-u14), the ledger and the no-direct-provider rule apply. No adapter imports a provider SDK outside src/ai.
2. Adapters: `OpenRouterEmbeddingAdapter` (OpenAI-compatible embeddings route, `data_collection: "deny"` for `query_draft` after graduation and for any real member text; free endpoints only for synthetic and public archive text, D-65), `LocalEmbeddingAdapter` (a small multilingual model of the e5 class run in-process through an ONNX runtime; the model file is fetched on first use into a cache directory from a config URL, never committed; the adapter is skipped with a printed reason when the file is absent), `FakeEmbeddingAdapter` (deterministic hash-based vectors with a controllable similarity table so tests assert ranking; scripted failures).
3. Routing: the model register of 09-u68 gains a `kind` of `embedding` and a per-model eval score for the retrieval eval of 13-u19; the router picks the cheapest registered model above the floor, with the local model as the last fallback; unregistered models are refused. Record side and query side use the same model id (a vector is only compared with vectors of its own model).
4. Cross-language: if the active model fails the cross-language eval floor (a pack value), the query is translated to the record language through the same gateway before embedding and the translation is cached with the query; displays of translated text are labelled as machine translation by the API (field `machineTranslated`).
5. Privacy: a `query_draft` call carries only the redacted field text plus context_profile text, never raw intake and never a private location; a test fixture with an email and a street address asserts neither reaches the adapter.
6. Config: `EMBEDDING_PROVIDER` (`fake|openrouter|local`), `EMBEDDING_MODEL`, `EMBEDDING_LOCAL_PATH`; document in .env.example (placeholders only).
7. Tests: fake ranking, budget exhaustion gives a typed `budget_exhausted` error (callers handle it as no suggestion, not a failure), unregistered model refused, redaction fixture, the router falls to the local adapter when OpenRouter 429s (FakeModel scripted failure), dimension mismatch is rejected before any insert.

## Acceptance
- Every embedding call goes through the gateway, the router and the budget guard.
- A draft query never carries raw intake or private location.
- Tests run offline with the fake adapter only.
- `npm run verify` is green.

## Out of scope
- Choosing the production model (13-u19 eval and the register).
- Indexing jobs (13-u08).
