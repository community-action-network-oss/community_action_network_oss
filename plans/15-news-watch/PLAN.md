---
id: "15"
title: "News watch"
approved: false
status: todo
depends_on_plans: ["02", "04", "09", "12", "13"]
spec: ["docs/spec/25-news-watch.md", "docs/integrations/mera-news.md", "docs/design/flows/background-jobs.md", "docs/design/ai/runtime.md", "docs/design/ux/wireframes/browse.md", "docs/design/ux/ui-unit-template.md"]
---
# Plan 15: News watch

## Goal
Active problems keep up with the news without anyone updating them (D-79, spec 25). A recurring job polls a news source for each active problem; `DP-NEWS-RELEVANCE` judges up to 3 new articles per poll; an article judged evidence or progress is filed as an ordinary contribution by the `news_watch` system actor. The existing contribution moderation and decision points then decide any state change. News watch never writes state. The server depends only on `NewsSourcePort`: `FakeNewsSource` for tests and the simulation, `MeraNewsSource` as the first real adapter. With no adapter configured, everything works and news watch is off. A "Powered by Mera News, news pipeline partner" badge credits the partner (WF-PARTNER-1).

## Spec refs
- docs/spec/25-news-watch.md (all sections), docs/integrations/mera-news.md (the Mera contract and handoff)
- docs/design/flows/background-jobs.md, docs/design/ai/runtime.md, docs/design/flows/post-publication-recheck.md
- docs/design/ux/wireframes/browse.md: WF-NEWS-1, WF-PARTNER-1; copy deck section "News watch and partner"
- Decisions D-79, D-31, ADR 0014; open questions OQ-news-ledger, OQ-mera-disclosure, OQ-trusted-sources, OQ-dp-confidence-thresholds

## Contracts with other plans
- Jobs run on the 09-u05 queue. Nothing here owns the scheduler tick; that conflict between 03-u14 and 09-u05 is tracked in plan 09 (PLAN.md risks). 15-u03 registers its recurring enqueue the same way 03-u14 does.
- `DP-NEWS-RELEVANCE` is a new DP in the 09 runtime (registry 09-u06, executor 09-u16, defenses 09-u17 and 13-u17, FakeModel 09-u12). The pack entry for the DP and its rule ids is a follow-up for plan 10, listed in 15-u04; this plan does not edit `can_policy`.
- Filing reuses the contribution domain (04-u01), contribution moderation (09-u40) and context-change triggers (09-u28). No unit here writes a problem, stage or criterion state.
- Mera is never edited from CAN. The Mera changes in docs/integrations/mera-news.md section 1 are the founder's; 15-u11 is the founder gate that turns the live adapter on.

## Acceptance for the whole plan
With no news environment set, `npm run verify` is green in every lane and no news job runs. With `FakeNewsSource`: an active problem gets polled, at most 3 articles are assessed, an evidence verdict files exactly one labelled contribution with a `source_ref` holding only the publisher URL and the spec 25.4 fields, the re-check runs, and no state changes without a decision point. Paused, stuck, terminal and draft problems are never polled. `grep -ri mera can_server/src` matches only the adapter folder, config and the adapter registration. The badge shows on the gallery always, and in the app only when the server reports a news source.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [15-u01](u01-news-source-port-fake-and-mera-adapters.md) | NewsSourcePort, FakeNewsSource and MeraNewsSource | can_server | 1.5 | 500 | 02-u02 | - |
| [15-u02](u02-news-watch-tables-and-watch-text.md) | News watch tables and the watch text builder | can_server | 1.2 | 501 | 15-u01, 02-u10, 12-u04, 09-u09 | - |
| [15-u03](u03-poll-jobs-fanout-poll-and-dedupe.md) | Poll jobs: fanout, poll and dedupe | can_server | 1.3 | 502 | 15-u02, 09-u05 | - |
| [15-u04](u04-dp-news-relevance.md) | DP-NEWS-RELEVANCE: bounded DP with data-block inputs | can_server | 1.5 | 503 | 15-u03, 09-u06, 09-u12, 09-u16, 09-u17, 13-u17 | - |
| [15-u05](u05-file-news-as-a-contribution.md) | File news as a contribution by the news_watch actor | can_server | 1.5 | 504 | 15-u04, 04-u01, 09-u40, 09-u28 | - |
| [15-u06](u06-limits-spend-and-eval-fixtures.md) | Limits, spend cap deferral and eval fixtures | can_server | 1.2 | 505 | 15-u05, 09-u14 | - |
| [15-u07](u07-e2e-news-watch-with-fakes.md) | E2E: news watch on FakeNewsSource and FakeModel | can_server | 1.3 | 506 | 15-u06 | - |
| [15-u08](u08-news-source-on-health.md) | newsSource on GET /health | can_server | 0.6 | 507 | 15-u01 | - |
| [15-u09](u09-app-partner-badge.md) | App partner badge (WF-PARTNER-1) | can_app | 1 | 508 | 15-u08, 02-u13, 02-u15 | - |
| [15-u10](u10-app-news-contribution-label.md) | App label for contributions added by news watch (WF-NEWS-1) | can_app | 1 | 509 | 15-u05, 04-u08 | - |
| [15-u11](u11-turn-on-the-mera-adapter.md) | Turn on the Mera adapter (founder gate) | . | 0.5 | 510 | 15-u07 | yes |
| [15-u12](u12-gallery-partner-badge.md) | Gallery partner badge (WF-PARTNER-1) | can_gallery | 0.8 | 511 | - | - |

## Risks
- The first adapter deletes articles after 48 hours: a poll gap over a day loses candidates. The interval is config and the fanout logs its last run.
- Article text is untrusted input to a model: 15-u04 reuses the 09-u17 and 13-u17 defenses and adds injection fixtures.
- A wrong filing reaches a decision point only through moderation, and every decision is appealable; the per-day filing cap (15-u06) bounds noise.
- Real news before graduation would break `SIM-GATE-1`: the live adapter is founder-gated (15-u11) and seeds only see synthetic articles.
- Server units share src/db/schema.ts and openapi.json with plans 09, 12 and 13; keep the lane serial and never hand-edit generated files.
