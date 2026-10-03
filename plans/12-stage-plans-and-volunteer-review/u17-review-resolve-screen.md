---
id: "12-u17"
plan: "12"
title: "Poster resolves recommendations and requests publication (WF-VREVIEW-3)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 42
depends_on: ["12-u03", "12-u12", "10-u05", "02-u24", "02-u25"]
writes: ["app/me/problems/**", "src/review/resolve/**", "src/i18n/en.json", "__tests__/review-resolve-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/prepare.md#WF-VREVIEW-3", "docs/design/ux/wireframes/submit.md#WF-PENDING-1", "docs/spec/constitution/rules.md#RECO-1", "docs/spec/constitution/rules.md#REVIEW-1", "docs/spec/01-slice-1-brief.md#9-drafts-fingerprints-and-the-pending-screen", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/review-resolve-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["ab3e75e"]
actual_hours: null
---
## Objective
Build WF-VREVIEW-3 at `/me/problems/{id}/review`: the poster accepts or declines each recommendation with a reason (`RECO-1`), sees the review status (review count, day count, `needsReviewers` call, whether the quorum is met) and requests the publication check. This is also the "In volunteer review" status screen of the brief (section 9), with Withdraw and Edit.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. Header status from `GET /v1/me/problems/{id}/review-status`: "In volunteer review", review count and day count, `{vreview.resolve.unresolved}` when recommendations are open, a visible "needs reviewers" call when none is finished (the problem stays `in_review`), the wait statement ("Reviews run in the order received. A held item waits rather than lowers the standard. Today the median wait is X.", `OQ-review-wait-statement`), Withdraw (T06 with confirmation) and Edit (back to WF-PREP-1). Held shows "Waiting for the check" (WF-HOLD-1 is 09-u48).
3. Recommendation cards: reviewer as "Volunteer n" (never a handle), applies-to path, why, a diff preview with the words "Removed:" and "Added:" as well as the markers, status text (Open, Accepted, Declined), a reason field (schema form), `{vreview.resolve.accept}` and `{vreview.resolve.decline}`; a decline or accept without a reason shows `{vreview.resolve.reasonRequired}`. Accepting applies the change to the draft at once and the poster can still edit; declining keeps the draft; declines stay visible with their reasons.
4. `{vreview.publish}` calls `POST /v1/me/problems/{id}/request-publication`; it is enabled when `canRequestPublication` is true (the poster may send with open recommendations after the quorum or after 14 days with one finished review; the check weighs the unresolved ones); disabled with the reason in words otherwise.
5. Slots for the Guest badge and Impacted only filter (12-u22, 12-u23) are props. Live region announces status changes; no numeric badge.
6. States: loading, error, offline, session expired, not permitted, empty (no recommendations yet, with the needs-reviewers call).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Every recommendation ends accepted or declined with a reason before it counts as resolved.
- The publication request is enabled only by the API flag, never by a client rule.
- Reviewers are never named (query assertion).
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The publication result screens (09-u49) and the held screen (09-u48).
- Reviewer-side screens (12-u15, 12-u16).
