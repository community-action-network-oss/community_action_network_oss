# Integration: Mera News (news pipeline partner)

Mera News supplies CAN's first news data (D-79, spec `25-news-watch.md`). It is **one adapter behind `NewsSourcePort`**, never a dependency: CAN builds, tests and runs with no Mera configuration, and news watch is then off. Mera code is not part of CAN and is not vendored; CAN agents never edit any Mera repository.

## 1. Handoff: what the founder changes and deploys in Mera

CAN starts with `FakeNewsSource`. The Mera adapter goes live only after the founder has done the following and supplied the URLs and key (unit 15-u11).

1. **Deploy `apps/mera-server-news-api`** (already built in mera-server: its own GraphQL schema, `x-api-key` guard, `NoopArticleQuota`, Dockerfile; not deployed today).
   - mera-infra `cloud-run.tf`: a `news-api` Cloud Run service. Public ingress through the existing load balancer, with a Cloud Armor throttle for this host (suggested 60 requests per minute per IP).
   - mera-infra `cloud-build.tf`: a build trigger for the app on push to `main`.
   - mera-infra `secrets.tf`: the API key secret.
   - Staging first, then prod.
2. **Allow more than one key.** `apps/mera-server-news-api/src/guards/api-key.guard.ts` accepts a comma-separated list in `MERA_NEWS_API_KEY`, so CAN's key can be revoked without touching mera-node's.
3. **No new GraphQL operation is needed** (section 2 lists the two CAN uses).
4. **Hand CAN:** the staging URL, the prod URL, and one key per environment. They go in CAN's gitignored `.env` as `MERA_NEWS_API_URL` and `MERA_NEWS_API_KEY`.
5. **Optional, later:** a stable public attribution URL for the badge (default `https://mera.news`).
6. **Check, optional:** confirm that warm-path `articleIdsForPersona` queries refresh `lastRequestedAt` on the topic. If they don't and the extra embeds matter, refresh it there.

## 2. Contract CAN relies on

`MeraNewsSource` (15-u01) uses exactly these operations of the news-api schema. If any of them changes shape, update the adapter and this section together.

| Use | Operation | Arguments CAN sends | Fields CAN reads |
|---|---|---|---|
| Find candidates for a problem | `articleIdsForPersona(query: PersonaQueryInput!)` | `topics: [{ text }]` with one topic (the problem's watch text, at most 512 characters), `limitPerTopic: 10` | `topicResults[0].articleIds` (rank order) and `matchMeta[].vectorScore` / `textScore` |
| Read the candidates | `articlesForTopicsByIds(articleIds: [ID!]!)` | the ids from the first call | `article_url`, `title`, `title_en`, `description_en`, `publication_name`, `country_code`, `language_code`, `pubDate` |

- `description_en` is read for the relevance assessment only and is never stored (section 4).
- `dailyLimitReached` should always be false, because the news-api uses `NoopArticleQuota`. If it is true, the poll is treated as failed.

- **Headers:** `x-api-key: <MERA_NEWS_API_KEY>`, `content-type: application/json`.
- **Errors:** any non-200 response, GraphQL `errors`, or a timeout (10 s) is a failed poll. CAN retries on the next poll and never fails a problem because of it.
- **Retention:** Mera deletes articles after 48 hours. CAN polls at least every 12 hours and copies what it keeps (spec 25, section 4).
- **Topic warmth:** the first query for a new watch text embeds it and upserts it as a topic with `lastRequestedAt` (`libs/mera-news-core/src/articles-for-topics/articles-for-topics.service.ts`). The hourly linker then precomputes its matches. Topics expire after 14 days without a request. If warm-path queries do not refresh `lastRequestedAt`, an unchanged watch text falls back to a fresh embed every 14 days, which costs one Jina call and is otherwise harmless (handoff item 6).

## 3. What CAN sends and never sends

- **Sends:** only the watch text of a published, public problem (built from its public title and summary). The privacy gateway (spec 14) runs on it first.
- **Never sends:** drafts, member identities, handles, contributions, locations, or anything not already public on CAN.
- Mera keeps no user link for these topics; its topics are anonymous text.

## 4. What CAN stores from Mera

Only the publisher's own article URL (`article_url`), the title, the publisher name, the published time and the retrieval time, in `source_ref` (spec 25, section 4). CAN never stores a Mera article id, `description_en` or any snippet text, cluster data, or images.

## 5. Attribution

While the Mera adapter is configured, CAN shows "Powered by Mera News, news pipeline partner" (WF-PARTNER-1). This is recognition of in-kind support under spec 20 (supporter independence). It buys no prominence: news found through Mera is weighed like any other source (Constitution III.5).

## 6. Replacing Mera

Any service that implements `NewsSourcePort` can replace or join Mera; nothing outside the adapter folder changes. The longer-term idea, a self-hostable news pipeline that nodes run and share, is tracked in `OQ-news-ledger`.
