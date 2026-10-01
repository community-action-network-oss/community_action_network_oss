---
id: "04-u03"
plan: "04"
title: "Contribution moderation, appeals restore, evidence tier recompute"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 72
depends_on: ["04-u02","03-u13","03-u11"]
writes: ["src/moderation/**","src/contributions/**","src/problems/app/**","test/contribution-moderation.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/01-slice-1-brief.md#6-contributions","docs/spec/constitution/rules.md#MOD-EXPLAIN-1","docs/spec/constitution/rules.md#APPEAL-1","docs/spec/constitution/rules.md#INTERIM-1","docs/open-questions/OQ-cooldown-lengths.md"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/contribution-moderation.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Close the loop on contributions: moderators accept or hide them with explainable decisions, a hidden contribution can be appealed and restored, and accepted evidence updates the problem investigation_needed flag.

## Steps
1. Extend GET /v1/moderation/queue (type=contributions) to list pending contributions oldest first; extend POST /v1/moderation/decisions to accept target {contributionId} with outcome contribution_accepted or contribution_hidden (hidden needs rule ids, field ref, revision hint, public explanation per MOD-EXPLAIN-1; accepted needs rule ids too for the audit trail). Interim true, appealable_until 14 days. A moderator cannot decide their own contribution.
2. Accepted: status accepted, reviewed_at; hidden: status hidden (author still sees it with the reason); a hidden decision stores last_rejected_at semantics by query (cooldown afterRejection uses the latest hidden decision time for that author and problem).
3. Appeals: allow appeals on contribution_hidden decisions by the contribution author (extend the allowed outcomes constant and the author check); overturn restores the contribution to accepted (brief table: "contribution restored"); upheld changes nothing (APPEAL-2).
4. Evidence tier: pure function recomputeEvidenceTier(urlRefs) (reuse evidenceTierFromUrls from plan 03 and extend with attestation presence: verification evidence is never counted here) run after accept; update problem.evidence_tier and investigation_needed (true for tiers 1 and 2, D-30) in the same transaction and write a problem_event type "evidence_tier_changed" when it flips.
5. Email the author on hidden decisions via the plan 03 notifier (template contributionHidden without body text).
6. Tests: accept and hide flows, MOD-EXPLAIN-1 constraint applies to hidden, own-contribution refusal, appeal overturn restores, upheld leaves unchanged, investigation_needed flips after an official-page evidence contribution is accepted, cooldown uses the hidden decision time.
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Hidden contributions require the full explanation fields (DB constraint reused).
- Overturned appeal restores the contribution.
- investigation_needed is derived, never set by hand.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Contribution UI.
- Reputation or sanctions (not in slice 1).
