# OQ-news-ledger: Should the news pipeline become a self-hostable, shared node service?

- **ID:** OQ-news-ledger
- **Status:** open

## Question

Should the news pipeline (periodic feed fetching, translation, embeddings, topic matching) become an open, self-hostable service that CAN nodes run, with the work of keeping a shared news corpus split across nodes, so that the larger the network the less each node has to do?

## Why it matters

Today news comes from one partner (Mera News, D-79) behind `NewsSourcePort`. That is the cheapest start, but a self-hosted node without a partner key has no news watch, and one operator holds the corpus. A shared, node-run ledger would remove both limits. It also raises costs and legal questions that one partner currently carries.

## Current default (what we built meanwhile)

Mera News is the only real adapter. Its pipeline stays closed. CAN depends only on the port, runs fully without any adapter, and stores only publisher URLs and a few fields (spec 25, section 25.4). No CAN code assumes a particular pipeline.

The question is reopened when any one of these becomes true:

1. Self-hosted CAN nodes need news watch without a partner key, and someone will maintain a portable adapter.
2. Federation milestone D1 (`13-decentralization-track.md`) starts, and nodes want shared ingest.
3. Serving CAN costs the partner more than it can carry.
4. There is a legal answer on redistributing publishers' feed snippets between nodes.

## Who can help

Federation and peer-to-peer engineers; media lawyers (feed terms, snippet rights by jurisdiction); people who run news archives or open-data portals.

## What a good answer looks like

A minimal node-run pipeline that fits CAN's stack (Postgres jobs, pgvector, free-first models, no GPU required), a work-split scheme across nodes, and a per-jurisdiction note on what feed content may be stored and shared.

## Spec links

- `docs/spec/25-news-watch.md`
- `docs/integrations/mera-news.md`
- `docs/spec/13-decentralization-track.md`
- `docs/open-questions/OQ-mera-disclosure.md`
