---
id: "13-u06"
plan: "13"
title: "pgvector and the context index schema with full-text and hnsw indexes"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.2
priority: 405
depends_on: ["13-u01"]
writes: ["docker-compose.yml","src/archive/infra/index/**","src/db/schema.ts","drizzle/**","test/archive-index-schema.e2e-spec.ts",".env.example","README.md"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#4-retrieval-hybrid","docs/adr/0017-archive-and-path-reuse.md","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The storage of the context index: pgvector for embeddings and Postgres full-text search, one row per record chunk (the condition, each stage, each challenge). No embedding is computed here.

## Steps
1. Switch the docker-compose postgres image to `pgvector/pgvector:pg16` (same major version, so existing volumes keep working) and document it in the README and .env.example; the migration runs `CREATE EXTENSION IF NOT EXISTS vector`. If the extension is unavailable the migration fails loudly with the hint (retrieval then degrades to structured plus full text, see 13-u09).
2. Table `archive_chunk`: id, record_id fk, `kind` condition|stage|challenge, `ref` (stage key or challenge id), `lang` (BCP 47), `text` (public archive text only, already stripped), `tsv` tsvector generated with a per-language configuration (`simple` fallback when the language has none), `index_version` int. Table `archive_embedding`: chunk_id fk, `model_id`, `dim`, `embedding vector` (dimension per row; one partial hnsw index per (model_id, dim) created by a migration helper), `created_at`. Both vectors of two models can coexist during a rollout. Indexes: GIN on `tsv`, hnsw cosine on each live embedding model.
3. A view `archive_retrievable` exposes only chunks whose record is `status = published`, `ratified = true` and not withdrawn (13-u05); every retrieval query selects from this view only (lint test greps src/archive/infra/index for any other FROM on the chunk tables).
4. A repository `ContextIndexRepository` with `upsertChunks`, `upsertEmbeddings`, `searchText(query, lang, k)`, `searchVector(embedding, modelId, k)`, `deleteForRecord`. Pure SQL, no model.
5. Tests (db): extension present, a chunk inserted and found by text in two languages, a vector inserted and found by nearest neighbour with a hand-made 8-dimension fixture, the view hides pending and withdrawn records, two embedding models coexist.

## Acceptance
- `docker compose up` gives a database with pgvector; the test suite runs on it.
- Every retrieval path reads only the `archive_retrievable` view (test).
- `npm run verify` is green.

## Out of scope
- Embedding models and jobs (13-u07, 13-u08).
- The retrieval algorithm (13-u09).
