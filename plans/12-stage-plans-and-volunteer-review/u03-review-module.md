---
id: "12-u03"
plan: "12"
title: "Review module: opt-in volunteers, masked review view, review_recommendation, poster accept or decline, quorum"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 48
depends_on: ["12-u04", "12-u02", "09-u09", "02-u04", "10-u60"]
writes: ["src/review/**", "src/db/schema.ts", "drizzle/**", "src/app.module.ts", "test/review.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#42-volunteer-review-private", "docs/spec/01a-lifecycle.md", "docs/design/flows/volunteer-review.md", "docs/design/components/server.md#lifecycle-v2-modules-d-72", "docs/spec/constitution/rules.md#REVIEW-1", "docs/spec/constitution/rules.md#RECO-1", "docs/open-questions/OQ-review-quorum.md", "docs/open-questions/OQ-reviewer-eligibility.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/review.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build the `review` module (lifecycle v2, D-72 step 2): opt-in volunteers, a queue of `in_review` problems with personal data masked, `review_recommendation` records, the poster's accept or decline with a reason (`RECO-1`), and the quorum check that makes a problem ready for the publication decision (`REVIEW-1`). Review content is never public.

## Steps
1. Schema: `review_recommendation` (id, problem_id fk, reviewer_id fk, `path` (a field or metadata path such as `facts`, `final_criteria[2]`, `stages[solutions].criteria[0]`, `sources[1]`), `recommendation` (the proposed change, structured), `reason`, `status` open|accepted|declined, `resolution_reason` null, `impact` low|high (DP-set later, default low), `resolved_at`, timestamps, `impact_label` and `proof_type` columns reserved for 14-u02), `review_session` (problem_id, reviewer_id, conflict_declared_at, finished_at null, outcome `recommendations|no_changes`), and the account opt-in column `volunteer_reviewer` (added by 02-u04) used here. UPDATE and DELETE on `review_recommendation` keep history through `status` only (no delete). Nothing in these tables is ever returned by a public route (REVIEW-1; asserted by a route scan in 07-u03).
2. Opt-in: `POST /v1/me/review-opt-in` and `DELETE /v1/me/review-opt-in` (take effect at once; open drafts of recommendations are kept, finished reviews stay counted). A member cannot review their own problem (403) and must declare no conflict first (`POST /v1/review/{problemId}/session` records `conflict_declared_at`).
3. Queue and masked view: `GET /v1/review/queue` (opt-in members only; random order, no counts as status, no rank: items give place and structure only), `GET /v1/review/{problemId}` returns the structured problem, sources, final criteria and the stage plan after the privacy gateway (09-u09) masked personal data; handle, account id and anything the gateway masked never appear. A `MaskedProblemView` builder is a port (`ProblemMasker`) so tests use a deterministic fake.
4. Recommendations: `POST /v1/review/{problemId}/recommendations` validates `path` against the problem's real paths, checks the text for personal data before storing (the deterministic privacy detector 03-u02, then masked), limits spam (default 10 per day per reviewer, constants in one file), and sets `open`. `POST /v1/review/{problemId}/finish` ends the session (`recommendations` or `no_changes`). A volunteer sees only their own recommendations and the poster's answers, and after finishing the aggregate counts.
5. Poster resolution: `GET /v1/me/problems/{id}/recommendations` (poster; reviewers shown as "Volunteer n"), `POST /v1/recommendations/{id}/resolve` {decision: accept|decline, reason (required)}; accept applies the change to the draft at `path` through the problems draft update (the poster can still edit afterwards) and declines keep the draft as is; both keep the reason. A resolved recommendation is never reopened except by T03 on a changed field.
6. Quorum (`OQ-review-quorum` default, constants in one file `src/review/domain/quorum.ts`, pure and unit tested with an injected clock): 3 distinct volunteers have finished a review and no recommendation has been open for more than 7 days; after 14 days from T01 with at least 1 finished review the poster may send it anyway; zero finished reviews always keeps the problem `in_review` and sets `needsReviewers` true (the visible call, `REVIEW-1`). `GET /v1/me/problems/{id}/review-status` returns review count, day count, open recommendations, `quorumMet`, `canRequestPublication` and `needsReviewers`. `POST /v1/me/problems/{id}/request-publication` enqueues the publication decision (the adapter is 12-u08); refused with `not_permitted` when the rule above does not allow it.
7. Tests (e2e and unit): own problem refused; masked view has no handle or email (exact key set); conflict declaration is required; recommendation with an email address is masked or refused; accept changes the draft, decline does not; decline without a reason is a 422; quorum table (0, 1, 2, 3 reviews, with and without an open recommendation older than 7 days, day 13 and day 14); opt-out keeps finished reviews; no public route returns review data.
8. `npm run openapi`, then `git add -- openapi/openapi.json`.

## Acceptance
- Nothing publishes without at least one completed review; `needsReviewers` is true with none.
- Every recommendation ends accepted or declined with a reason before the quorum counts it as resolved (`RECO-1`).
- Review data is private and masked (`REVIEW-1`), proven by exact key sets and a route scan.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- The publication decision itself (12-u08) and DP-PUBLISH (plan 09).
- Review screens (12-u15 to 12-u17).
- The impacted and guest label on recommendations (14-u02).
