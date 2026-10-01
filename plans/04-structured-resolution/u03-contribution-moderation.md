---
id: "04-u03"
plan: "04"
title: "Contribution evidence tier recompute and cooldown from hold decisions"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 72
depends_on: ["04-u02", "03-u11", "03-u09"]
writes: ["src/contributions/**", "src/problems/app/**", "test/contribution-evidence-tier.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#6-contributions", "docs/spec/constitution/rules.md#MOD-EXPLAIN-1", "docs/spec/constitution/rules.md#EVID-URL-1", "docs/open-questions/OQ-cooldown-lengths.md"]
needs: ["docker","db","mail"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/contribution-evidence-tier.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Keep only what is not moderation: recompute the problem's evidence tier and investigation_needed flag when a contribution becomes public, and derive the after-rejection cooldown from the latest non-publish decision. Accepting, hiding and restoring contributions is done by moderation runs and appeals (09-u40, 09-u33, 09-u34), not by a moderator here.

## Steps
1. Pure function recomputeEvidenceTier(urlRefs) (reuse evidenceTierFromUrls from plan 03 and extend with attestation presence: verification evidence is never counted here). It is called by the contribution adapter 09-u40 through a small port ContributionPublishedHook exported here (no-op until wired), after a run publishes an evidence-bearing contribution.
2. The hook updates problem.evidence_tier and investigation_needed (true for tiers 1 and 2, D-30) in the same transaction and writes a problem_event type "evidence_tier_changed" when it flips. DP-EVIDENCE-TIER (09-u40) may override the deterministic tier; store which source set the tier.
3. Cooldown input: the afterRejection delay of 04-u01 reads the latest moderation_decision (03-u09) with outcome rejected or needs_revision for that author and problem (query only; no new table).
4. Tests: investigation_needed flips after the hook is called for an official-page evidence contribution, stays derived (no endpoint sets it), event written once, cooldown uses the latest rejected decision time.
5. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- investigation_needed is derived, never set by hand.
- No route here accepts, hides or restores a contribution.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Moderation of contributions, appeals and restore (09-u40, 09-u33, 09-u34, 09-u37).
- Contribution UI.
- Reputation or sanctions (not in slice 1).
