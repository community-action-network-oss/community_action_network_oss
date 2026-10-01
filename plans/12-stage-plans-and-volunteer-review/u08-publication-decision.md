---
id: "12-u08"
plan: "12"
title: "Publication decision adapter: DP-PUBLISH on the in_review problem, open recommendations weighed, T02, T04, T05 and T09 applied"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 51
depends_on: ["12-u03", "12-u04", "09-u23", "09-u24", "09-u18", "03-u11", "10-u62", "10-u63"]
writes: ["src/problems/app/publication/**", "src/problems/domain/publish-aggregation.ts", "src/problems/domain/publish-aggregation.spec.ts", "src/review/app/**", "test/publication-decision.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01a-lifecycle.md", "docs/spec/01-slice-1-brief.md#43-publication-decision", "docs/design/flows/publication-decision.md", "docs/design/flows/volunteer-review.md", "docs/spec/constitution/rules.md#REVIEW-1", "docs/spec/constitution/rules.md#RECO-1", "docs/spec/constitution/rules.md#PUB-FAILCLOSED-1", "docs/design/ai/decision-points.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/publication-decision.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Connect volunteer review to the publication decision (D-72 step 3). When the poster requests publication (12-u03 enqueues it), a moderation run decides `DP-PUBLISH`, which aggregates the other decision points plus the recommendations still open, and the outcome applier applies T04 (publish), T02 (needs_revision), T05 (reject) or T09 (hold). Recommendations still open are weighed and cited, never hidden and never counted as accepted.

## Steps
1. `PublishTarget`, the problem's moderation target for `in_review` (extends 09-u24): input is the masked structured problem (facts, sources, final criteria, stage plan), the `source_ref` list, the accepted and declined recommendations with the poster's reasons, the open recommendations with their `impact`, and the review facts (count of finished reviews, days in review). Decision points run through 09-u22: `DP-CRISIS` first (short-circuits to the emergency and legal lane, 09-u38), then `DP-SOURCE-TRUST`, `DP-CRITERIA`, `DP-STAGE-PLAN`, `DP-COMPLETENESS`, `DP-ASSUMPTIONS`, `DP-PRIVACY`, `DP-ELIGIBILITY`, `DP-LEGALITY`, `DP-FRAMING`, `DP-DUPLICATE`, `DP-NAMING`, `DP-TONE`, `DP-EVIDENCE-TIER`. The DP definitions and prompts are plan 09 and 10 content; this unit only requests them.
2. `src/problems/domain/publish-aggregation.ts`, pure and table tested (reversible default; if 09-u18 and the pack gain a `DP-PUBLISH` rule table, delete this file and use it): any `DP-PRIVACY`, `DP-LEGALITY` or `DP-ELIGIBILITY` failure blocks `publish` (a locally forbidden topic is `reject` with the legal basis, `TOPIC-FORBIDDEN-1`, otherwise `needs_revision`); a failing `DP-SOURCE-TRUST`, `DP-CRITERIA`, `DP-STAGE-PLAN` or `DP-COMPLETENESS` gives `needs_revision` with hints by field path; open high-impact recommendations lower confidence and push to `needs_revision` (cited in the hints), open low-impact ones are noted in the decision explanation; every other failure or a missing or low-confidence DP gives `hold`. Zero finished reviews can never publish (`REVIEW-1`; the guard 03-u01 also refuses T04).
3. Outcome mapping through the outcome applier (09-u23): publish to T04 (the effects of 12-u04 instantiate the stage plan, email 03-u11, handle shown, poster becomes provisional steward, fingerprint purged, only the review count stays public), needs_revision to T02 (hints beside fields with rule id, policy version and `appealable_until`; the recommendations whose path is cited are linked), reject to T05 (appealable; volunteer access ends), hold to T09 (resume_state in_review, retry job, no public row, `PUB-FAILCLOSED-1`).
4. `GET /v1/me/problems/{id}/decision` (poster) returns the latest publication decision with hints; review data in the response is limited to counts and the poster's own recommendation ids.
5. Tests (e2e, FakeModel recorded fixtures, one per branch): publish with 3 reviews and all resolved; publish with 1 review after 14 days and an open low-impact recommendation (noted, still publishes); open high-impact recommendation gives needs_revision citing it; zero reviews refused before any run; privacy failure blocks; forbidden topic rejects; run failure holds and resumes to in_review; the public detail shows only the review count; aggregation table tests (including the PREC-1 precedence of 09-u18).
6. `npm run openapi`, then `git add -- openapi/openapi.json`.

## Acceptance
- Nothing publishes without a completed review and a recorded `DP-PUBLISH` run.
- Open recommendations are cited in the decision, never counted as accepted.
- A failed run holds (T09) and never publishes.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- The DP prompts, schemas and eval sets (plans 09 and 10) and the aggregator core (09-u18).
- AI stage drafting after publication (plan 13).
- Appeals (09-u33).
