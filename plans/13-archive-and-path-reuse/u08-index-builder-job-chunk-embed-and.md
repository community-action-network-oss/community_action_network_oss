---
id: "13-u08"
plan: "13"
title: "Index builder job: chunk, embed and upsert on archive.published, re-embed on model change"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 407
depends_on: ["13-u07","13-u04","09-u05"]
writes: ["src/archive/app/index-builder/**","src/archive/infra/index/**","test/archive-index-builder.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#4-retrieval-hybrid","docs/design/flows/archive-on-terminal.md","docs/design/flows/background-jobs.md","docs/design/components/server.md"]
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
Make a published record findable: chunks, full-text rows and vectors, with the failure behaviour of the flow doc (publish without a vector when the embedding provider is down, retry later) and a background re-embed when the embedding model changes.

## Steps
1. Chunker (pure): the `condition` chunk (problem type, condition, affected, context text), one chunk per executed stage (goal, criteria, outcome, chosen option summary), one per `challenge` (tried, why, resolution). Each chunk gets its language (the record language) and a stable `ref`.
2. Job `archive.index` on the payload queue, triggered by `archive.published`: upsert chunks and `tsv` first (full-text works immediately), then embeddings in batches via `EmbeddingPort` with `purpose: "archive_record"`; on a provider failure the record stays searchable without vectors and the job is retried with backoff (the queue contract of 09-u05); a `vector_pending` gauge is exposed.
3. Job `archive.reembed` started by a register change or an operator: embeds all chunks with the new model while keeping the old vectors live; flips the active model id only when coverage is 100 percent and the eval gate (13-u19) result for the model is recorded; the old vectors are deleted after a configurable grace period. Both are idempotent per (chunk, model).
4. Index version: `index_version` increments when the chunker or the full-text configuration changes; the retrieval cache key of 13-u13 includes it.
5. Tests with FakeEmbedding: publish creates the expected chunks, an embedding outage leaves a searchable record and a retry fills vectors, re-embed keeps both vectors and flips only at full coverage, a withdrawn record is removed from the index, jobs are idempotent.

## Acceptance
- A published record is searchable by text at once and by vector when the provider is up.
- Changing the embedding model never leaves a window with no vectors.
- `npm run verify` is green.

## Out of scope
- Retrieval (13-u09).
- Choosing the model (13-u19).
