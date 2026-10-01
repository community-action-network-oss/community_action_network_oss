---
id: "09-u72"
plan: "09"
title: "DP-PUBLISH handler: weigh unresolved recommendations and the review summary into the publication run"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 300
depends_on: ["09-u22","09-u18","12-u08","10-u63"]
writes: ["src/moderation/app/dp-publish.ts","src/moderation/domain/publish/**","test/fixtures/moderation/publish/**","test/dp-publish.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/decision-points.md#shared-contract","docs/design/ai/decision-points.md#per-dp-notes","docs/spec/01a-lifecycle.md","docs/spec/constitution/rules.md#REVIEW-1","docs/spec/constitution/rules.md#RECO-1","docs/spec/24-archive-reuse.md#244-speed-without-skipping-review"]
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
The registered DP-PUBLISH handler that 12-u08 calls: it takes the typed outcomes of the other blocking DPs and the volunteer review summary (counts only, no volunteer identities), weighs the recommendations still open and cites them, and produces the publication outcome. 12-u08 owns the deterministic aggregation floor; this DP can only be stricter, never more permissive.

## Steps
1. Read 12-u08 first (the `PublishTarget`, `publish-aggregation.ts`, the review facts). If 12-u08 left a deterministic aggregation file, keep it as the floor and run it before the model; where the pack gains a DP-PUBLISH rule table, 12-u08 says to delete its file and use it: this unit provides that table in the DP registry (09-u06) and the aggregator of 09-u18 and removes the duplicate in the same commit.
2. Inputs (all through the privacy gateway, no raw text): outcomes and rule ids of DP-SOURCE-TRUST, DP-CRITERIA, DP-STAGE-PLAN, DP-COMPLETENESS, DP-ASSUMPTIONS, DP-PRIVACY, DP-ELIGIBILITY, DP-FRAMING, DP-DUPLICATE, DP-NAMING, DP-TONE, DP-EVIDENCE-TIER, DP-LEGALITY, DP-CRISIS; the review summary (completed reviews, days in review, open, accepted and declined recommendation counts with the poster's reasons by path); accepted archive suggestions with their fit summary (an input to confidence only, REUSE-NOBLOCK-1: never a substitute for a review); community guideline text from the pack.
3. Hard rules in code, before and after the model: zero completed volunteer reviews can never publish (REVIEW-1; test); recommendations still open are weighed and cited in the hint, never counted as accepted (RECO-1); the model cannot upgrade a deterministic `needs_revision` or `reject`; `escalate_human` is not available.
4. Outcomes publish, needs_revision, reject, route_external, hold; output keys `open_recommendations_cited[]` {path, weight_reason} and `speedup_cited` (bool, informational). PREC-1 precedence applies through 09-u18.
5. Use FakeModel keyword-table files added under the unit's own fixtures directory (do not edit the fake table of 09-u12; add a second table file it loads via config), and moderationFixtures() packs (never the 10-u04 default pack).
6. Tests: all-clear with three resolved reviews publishes; open high-impact recommendation yields needs_revision citing it; zero reviews refuses before any model call; an archive suggestion with strong fit never replaces the review requirement; a poster declining everything with empty reasons does not publish silently (hint cites it); privacy failure blocks; hold on provider failure resumes to `in_review` (T09 then T10, applied by 12-u08).

## Acceptance
- No publish with zero completed reviews (test, before and after the model).
- The DP is never more permissive than the deterministic floor.
- `npm run verify` is green.

## Out of scope
- Publication application (12-u08).
- Prompt (10-u63).
