---
id: "15-u02"
plan: "15"
title: "News watch tables and the watch text builder"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 501
depends_on: ["15-u01", "02-u10", "12-u04", "09-u09"]
writes: ["src/db/schema.ts", "drizzle/**", "src/news/domain/watch-text.ts", "src/news/domain/watch-text.spec.ts", "src/news/app/watch-store.ts", "src/news/app/watch-store.spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/25-news-watch.md#252-what-is-watched", "docs/spec/25-news-watch.md#254-what-is-stored", "docs/spec/14-ai-privacy-gateway.md"]
needs: ["docker", "db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Store what news watch needs and nothing more: one `news_watch` row per watched problem and `news_seen` hashes for dedupe. Build the watch text deterministically from public fields and pass it through the privacy gateway.

## Steps
1. Tables (new migration via `npm run db:generate`; never edit an existing one): `news_watch` (problem_id pk fk, watch_text varchar(512), watch_text_hash, last_polled_at null, last_error null, updated_at) and `news_seen` (problem_id, url_hash, seen_at; pk on both; index on seen_at for the 90-day purge).
2. `buildWatchText(problem)`: the public title, then the public summary, whitespace collapsed, cut at a word boundary to 512 characters. Pure function; reads only fields visible on the public problem detail.
3. The store runs the text through the privacy gateway (09-u09) in the outbound zone before saving; a gateway refusal leaves the problem unwatched with `last_error` set.
4. `syncWatches()`: upsert a row for every `active` problem whose text hash changed, delete rows for problems no longer `active`. Called by 15-u03.
5. `normalizeUrl` + sha256 for `url_hash` (lowercase host, drop fragment and common tracking parameters such as `utm_*`).
6. Tests: text is stable for the same input, capped at 512, never includes draft or contribution fields; leaving `active` deletes the row; URLs differing only by tracking parameters hash the same.

## Acceptance
- Only `active` problems have a watch row (test).
- `npm run verify` is green.

## Out of scope
- Polling (15-u03).
