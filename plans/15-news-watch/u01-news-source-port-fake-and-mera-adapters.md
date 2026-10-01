---
id: "15-u01"
plan: "15"
title: "NewsSourcePort, FakeNewsSource and MeraNewsSource"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 500
depends_on: ["02-u02"]
writes: ["src/news/domain/**", "src/news/infra/**", "src/news/news.module.ts", "src/config.ts", "src/config.spec.ts", ".env.example", "test/fixtures/news/**"]
reads: ["src/**"]
spec: ["docs/spec/25-news-watch.md#251-sources-are-adapters-news-port-1", "docs/integrations/mera-news.md", "docs/spec/12-decentralization-ready.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The port every other news unit depends on, with two adapters: `FakeNewsSource` (synthetic fixtures) and `MeraNewsSource` (the contract in docs/integrations/mera-news.md section 2). With no news config the module provides no adapter and news watch is off.

## Steps
1. `src/news/domain/news-source.port.ts`: `NewsSourcePort` with `findCandidates(watchText, since)`, `readCandidates(refs)` and `describe()` exactly as spec 25.1. Domain types only; no Nest or Drizzle imports.
2. `src/news/infra/fake/fake-news-source.ts`: serves articles from `test/fixtures/news/*.json` (synthetic, every title prefixed per `SIM-LABEL-1`), with scripted failures (timeout, error) for tests. `describe()` returns null.
3. `src/news/infra/mera/mera-news-source.ts`: plain `fetch` to the GraphQL endpoint, the two operations of the contract, `x-api-key` header, 10 s timeout via `AbortSignal.timeout`. Maps `article_url`, `title`, `title_en`, `description_en`, `publication_name`, `country_code`, `language_code`, `pubDate`. Treats non-200, GraphQL `errors` and `dailyLimitReached: true` as a failed call (typed result, never a throw into the caller). `describe()` returns `{ name: "Mera News", url: "https://mera.news" }`. Nothing outside `src/news/infra/mera/` names Mera.
4. Config: `NEWS_SOURCE` (`off` default, `fake`, `mera`), `MERA_NEWS_API_URL`, `MERA_NEWS_API_KEY`; `mera` without both values fails startup with a clear message. Document them in `.env.example` with empty values.
5. `NewsModule` provides `NEWS_SOURCE` (the port token) as null when off. Do not register it in `app.module.ts` here; 15-u03 does.
6. Tests: the fake returns fixtures and its scripted failures; the Mera adapter against a stubbed `fetch` maps fields, sends the key, and turns each failure kind into a failed result; config rejects `mera` without keys.

## Acceptance
- `grep -ri mera src` matches only `src/news/infra/mera/` and `src/config.ts`.
- With `NEWS_SOURCE` unset the app boots and no adapter exists.
- `npm run verify` is green.

## Out of scope
- Jobs, tables and DPs (15-u02 to 15-u05).
- Any change in a Mera repository (founder, docs/integrations/mera-news.md section 1).
