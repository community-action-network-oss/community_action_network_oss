---
id: "03-u10"
plan: "03"
title: "Moderation decisions: publish, request changes, reject"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 47
depends_on: ["03-u09","03-u08"]
writes: ["src/moderation/**","src/problems/app/**","test/moderation-decisions.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/constitution/rules.md#MOD-EXPLAIN-1","docs/spec/constitution/rules.md#INTERIM-1","docs/spec/constitution/rules.md#PRIV-GATE-1","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1","docs/design/ux/wireframes/moderation.md#WF-MOD-REVIEW-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-decisions.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
POST /v1/moderation/decisions turns a moderator decision into T02, T04 or T05 through the transition engine, in one transaction with the decision row, the problem event and the audit event.

## Steps
1. Body: {problemId, outcome: "needs_revision" | "published" | "rejected", ruleIds, fieldRef?, spanStart?, spanEnd?, revisionHint?, safetyUnsafe?: boolean, publicExplanation, internalNote?, jurisdictionId (required for published)}. Server sets policy_version, interim true, needs_rereview true, decidedBy from the session, appealable_until = now + 14 days (always earlier than purge_after; assert this), reviewer_disclosure text when pool is 1 ("Interim decision by the only active moderator").
2. published (T04): re-run the deterministic checks (PRIV-GATE-1 applies at T04 too) and refuse if a hard flag exists; set jurisdiction, compute investigation_needed (true when strongest evidence tier is below the threshold; with only intake URLs set tier from a small pure function evidenceTierFromUrls and mark true for tiers 1 and 2 per D-30; default tier 1 for plain "other" URLs, 2 for news, 3 for official pages), published_at, delete matching fingerprint rows, the initiator becomes provisional steward (no owner field; just the initiator_id). needs_revision (T02): field_ref and revision hint required. rejected (T05): purge_after = now + 30 days, store a fingerprint (reason rejected, 90 days), keep appealable_until.
3. A moderator cannot decide a problem they initiated (403 not_permitted with message). All three call the engine inside one transaction together with the decision insert, so a failed write leaves no decision and no state change (PUB-FAILCLOSED-1).
4. Audit event per decision with interim true and detail {decisionId, outcome, ruleIds} (no text). Define the DecisionNotifier port calls (implemented in the emails unit).
5. The problem moderation GET shows the new decision. Update GET /v1/me/problems to include appealableUntil from the latest decision.
6. Tests: three outcomes happy path (state, event, audit, interim flag, dates); missing field_ref or hint rejected with fieldErrors; T04 blocked by a hard privacy flag; own problem refused; atomic failure injection; decisions on a problem in the wrong state give invalid_transition; policy_version stored.
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Every decision row satisfies MOD-EXPLAIN-1 (DB constraint).
- appealable_until is exactly 14 days and earlier than the deletion date.
- INTERIM-1: a decision with a single moderator is flagged, audited and queued for re-review.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Emails (next unit).
- Decisions on contributions (plan 04).
- Appeals.
