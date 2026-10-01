---
id: "09-u74"
plan: "09"
title: "Review content guard: recommendations are checked by the always-on DPs only, never published"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.2
priority: 302
depends_on: ["09-u22","09-u30","12-u03"]
writes: ["src/moderation/app/review-guard.ts","src/moderation/domain/review-guard/**","test/fixtures/moderation/review-guard/**","test/review-guard.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/decision-points.md#which-dps-apply-to-which-content-type","docs/spec/constitution/rules.md#REVIEW-1","docs/design/flows/volunteer-review.md","docs/design/ai/safety-and-privacy.md"]
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
A volunteer must not leak or abuse through a recommendation, and a recommendation is never judged on merit. Each `review_recommendation` is checked only by the always-on DPs (DP-PRIVACY, DP-NAMING, DP-TONE, DP-CRISIS), is never public and is never an input to a decision except as a count and the poster's reasons.

## Steps
1. `ReviewRecommendationTarget` (a moderation target, 09-u23 port): on create and edit of a recommendation run only the four always-on DPs through 09-u22 with `trigger: review`; no merit DP (DP-CRITERIA, DP-STAGE-PLAN and the rest) ever sees a recommendation (test over the DP selector of 09-u06: the selector for content type `review_recommendation` returns exactly the four).
2. Outcomes: a failing recommendation is hidden from the poster and other volunteers and the author sees the hint (needs_revision); crisis content goes to the lane (09-u38); hold keeps it private. A recommendation that passes is shown to the poster only (masked view of 09-u30); never public, not even after publication (the public API has no route; route-table test).
3. Leak guards: a recommendation containing text copied from the masked view that the gateway had pseudonymized (token patterns) or an attempt to recover personal data fails DP-PRIVACY (fixtures for `vol-leaker`, docs/design/ai/simulation.md); burst detection counts recommendations per path per hour and flags `vol-brigade` patterns to the lane as a signal without ranking people.
4. DP-PUBLISH (09-u72) receives only counts and the poster's reasons, never recommendation text (type-level test on its input builder).
5. Use FakeModel keyword-table files added under the unit's own fixtures directory (do not edit the fake table of 09-u12; add a second table file it loads via config), and moderationFixtures() packs (never the 10-u04 default pack).
6. Tests: the four DPs only; a leaked token is blocked; crisis routes to the lane; merit DP never runs; no public route for recommendations; brigade fixture flags without ranking.

## Acceptance
- Only the always-on DPs ever run on a recommendation (selector test).
- Recommendation text never reaches DP-PUBLISH or any public route.
- `npm run verify` is green.

## Out of scope
- The review module (12-u03).
- Auditor sampling of recommendations.
