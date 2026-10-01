# News watch

A published problem keeps up with the world even when nobody updates it. A recurring job looks for news about each active problem; an AI decision point judges whether an article is evidence or progress for that problem; a relevant article is filed as an ordinary contribution. From there the existing moderation run and decision points decide any change, exactly as they would for a human contribution. News watch never changes a problem's state, a stage's state, or a criterion's result by itself (D-79). This file is the single owner of news watch. Lifecycle rules are in `01a-lifecycle.md` and `01b-stages.md`. Evidence weighting is Constitution III.5.

## 25.1 Sources are adapters (`NEWS-PORT-1`)

The server depends only on `NewsSourcePort`:

```
findCandidates(watchText, since) -> [{ ref, rank, score }]
readCandidates(refs) -> [{ url, title, titleEn, summaryEn, publisher, country, language, publishedAt }]
describe() -> { name, url } | null
```

- `FakeNewsSource` serves synthetic fixtures for tests and the persona simulation.
- `MeraNewsSource` is the first real adapter (`docs/integrations/mera-news.md`). Mera News is a news pipeline partner, not a dependency.
- With no adapter configured, news watch is off and everything else works. No code outside the adapter folder names a provider.
- Future adapters, such as a self-hosted pipeline that nodes run and share, plug in behind the same port (`OQ-news-ledger`).

## 25.2 What is watched

- Only problems in `active` (and their non-terminal stages). Paused, stuck, terminal and pre-publication problems are never polled.
- The **watch text** is built deterministically from the problem's public title and summary, at most 512 characters, and passes the privacy gateway (spec 14) before it leaves the server. It never contains drafts, contributions or member data.
- The watch text is rebuilt when the public title or summary changes.

## 25.3 The loop

Three job kinds on the Postgres job queue (plan 09-u05, `docs/design/flows/background-jobs.md`):

1. **`news.poll_fanout`**, recurring every 12 hours: enqueues one `news.poll_problem` per watched problem. The interval is a config value; it must stay under 24 hours because the first adapter deletes articles after 48 hours.
2. **`news.poll_problem`**: calls `findCandidates`, drops anything already seen for this problem (dedupe by a hash of the normalized publisher URL), reads the rest, and enqueues `news.assess` for at most **3** new candidates by adapter rank. Seen hashes are kept 90 days.
3. **`news.assess`**: runs `DP-NEWS-RELEVANCE` on one (problem, article) pair. A failed source call is retried on the next poll; it never holds or fails a problem.

## 25.4 What is stored

For a filed article, a `source_ref` with the publisher's own URL, the title, the publisher name, the published time and the retrieval time, plus `category` and `establishes` as for any source (`OQ-trusted-sources`). Nothing else: no adapter-internal ids, no snippet or summary text, no images. The article stays readable at the publisher after the adapter forgets it. Seen hashes (25.3) are the only other record.

## 25.5 `DP-NEWS-RELEVANCE`

A bounded decision point in the moderation runtime (`docs/design/ai/runtime.md`): no tools, schema-bound output, cites rule ids and the policy version, records prompt hash and model id, at most the runtime's per-DP call budget.

- **Inputs:** the problem's public fields, its open stages with their acceptance criteria, and the article fields from 25.1. Article text is untrusted and is passed as data blocks with the injection defenses of 09-u17 and 13-u17.
- **Output:** `{ verdict: irrelevant | context | evidence | progress, stageId?, criterionRef?, establishes, rationale, confidence }`.
- **Effect:** `irrelevant` and `context` are recorded on the run and nothing else happens. `evidence` and `progress` file a contribution (25.6). Below the pack's confidence threshold (`OQ-dp-confidence-thresholds`) the verdict is downgraded to `context`.
- **Models:** chosen by the model register (09-u68). Article and problem text are real content, so only endpoints with data collection denied are used (ADR 0014); free endpoints only in simulation.

## 25.6 How news changes a problem (`NEWS-NO-DIRECT-1`)

- An `evidence` verdict files an `evidence` contribution on the stage named by `stageId` (or on the problem when none applies); a `progress` verdict files a `progress_update`. Both carry the `source_ref` from 25.4.
- The contribution's author is the system actor `news_watch`. It is labelled on every surface as added by news watch, with the source and the run's rationale (WF-NEWS-1, `AI-ASSIST-1` marker).
- The contribution goes through the same contribution moderation as a human one (09-u40). Its acceptance is a `context_change` (09-u28), so the post-publication re-check runs. Existing decision points then decide: `DP-STAGE-RESOLUTION` may resolve a stage whose criteria the evidence now meets, `DP-VERIFICATION` may confirm `solved`, `DP-BLOCKER` may find a blocker. Each of those decisions cites its rules and can be appealed.
- News watch itself never writes a state, a stage state or a criterion result. A wrong filing is corrected the normal way: any member may dispute the contribution, and the steward may hide it with a reason.

## 25.7 Limits and cost

- At most 3 assessments per problem per poll, and at most 1 filed contribution per problem per day (a pack value).
- Model calls count against the monthly spend cap (09-u14). At the cap, `news.assess` jobs are deferred, never dropped silently.
- Rough budget: 100 active problems, 3 candidates, 2 polls a day is about 18,000 calls a month.

## 25.8 Simulation and graduation

Until graduation (`SIM-GATE-1`) news watch runs only on `FakeNewsSource` with synthetic, labelled articles; seed problems never receive real news. Turning on a real adapter is a founder-gated step (unit 15-u11).

## 25.9 Attribution

While a real adapter is configured, the app shows its `describe()` result as a small partner badge (WF-PARTNER-1). The gallery shows "Powered by Mera News, news pipeline partner" (D-79). The badge is recognition of in-kind support under `20-participation-nonmonetary.md` (supporter independence): it buys no source prominence, no moderation say and no data access, and it is listed in the public support ledger and `OQ-mera-disclosure`.

## Proposed rule ids

The spec owner adds them to `constitution/rules.md`: `NEWS-PORT-1` (providers only behind the port; the platform runs without one), `NEWS-NO-DIRECT-1` (news watch files contributions, never writes state), `NEWS-STORE-1` (only the publisher URL and the fields in 25.4 are kept).
