---
id: "15-u05"
plan: "15"
title: "File news as a contribution by the news_watch actor"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 504
depends_on: ["15-u04", "04-u01", "09-u40", "09-u28"]
writes: ["src/news/app/file/**", "src/contributions/**", "test/news-file.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/25-news-watch.md#256-how-news-changes-a-problem-news-no-direct-1", "docs/spec/25-news-watch.md#254-what-is-stored", "docs/design/flows/post-publication-recheck.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/news-file.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Turn an `evidence` or `progress` verdict into an ordinary contribution, and let the existing pipeline do the rest. This unit never writes a problem state, a stage state or a criterion result.

## Steps
1. Add the system actor `news_watch` to the contribution author model (an `author_kind` of `member` or `system` plus `system_actor` text, or the existing system-actor convention if 04-u01 already has one; read it first). Public responses show `authorKind: "system"` and `systemActor: "news_watch"`, never a handle.
2. `evidence` verdict: create an `evidence` contribution on `stageId` (or the problem), with a `source_ref` holding only `url`, `title`, `publisher`, `published_at`, `retrieved_at`, `category` (`reputable_media` by default) and `establishes` from the verdict. `progress` verdict: a `progress_update` with the same `source_ref`. The body is the run's plain-words rationale, linked to the run id.
3. Validate against the pack schema for the contribution type like any submission; a validation failure records the run and files nothing.
4. Submit through the same path as a member contribution so 09-u40 moderation runs; on acceptance emit the `context_changed` event (09-u28, kind `evidence`) so the re-check queues the affected DPs.
5. Skip filing when the same URL hash is already a `source_ref` on this problem.
6. Regenerate `openapi/openapi.json` (never hand-edit).
7. E2E: an evidence verdict files one contribution with the system author and only the allowed `source_ref` fields; moderation runs; the re-check job is queued; problem and stage states are unchanged until a DP decides; a duplicate URL files nothing.

## Acceptance
- A test asserts no problem, stage or criterion row is written by `src/news/**` (spy on the transition engines).
- `npm run verify` is green.

## Out of scope
- App display (15-u10).
