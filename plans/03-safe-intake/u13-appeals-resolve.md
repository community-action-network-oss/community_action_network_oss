---
id: "03-u13"
plan: "03"
title: "Appeals: resolve with uphold or overturn effects"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 50
depends_on: ["03-u12","03-u11"]
writes: ["src/moderation/**","src/problems/app/**","src/platform/mail/templates.ts","test/appeals-resolve.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/constitution/rules.md#APPEAL-1","docs/spec/constitution/rules.md#APPEAL-2","docs/spec/constitution/rules.md#DRAFT-TTL-1","docs/design/ux/wireframes/moderation.md#WF-MOD-APPEAL-1"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/appeals-resolve.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: skipped
attempts: 0
commits: []
actual_hours: null
blocked_reason: "superseded by 09-u34, 09-u37"
---
## Objective
SUPERSEDED: replaced by 09-u34, 09-u37. Resolving appeals by a human reviewer is replaced by DP-APPEAL and re-decision under the new policy. This unit is skipped and builds nothing; the text below is kept only as history.

POST /v1/moderation/appeals/{id}/resolve: the assigned reviewer upholds or overturns. Overturning applies the brief effect through the engine.

## Steps
1. Body {outcome: "upheld" | "overturned", ruleIds, explanation}. Only the assigned reviewer (403 for anyone else, including the decider when the pool has two or more). Sets outcome, explanation, decided_at.
2. Overturn effects per brief section 5: T02 overturned: problem back to submitted, hints marked struck through (store decision.revision_hint_struck true or an event payload; the app reads it from the moderation GET); T05 overturned: back to submitted, deletion cancelled (purge_after cleared and the matching fingerprint row deleted via deleteMatching) if the draft is still held; if already purged return outcome overturned with resubmitRequired true and write an event only. (T19 and T20 effects are added in plan 05; leave a typed switch with a not_implemented branch that returns a clear error for those outcomes.)
3. APPEAL-2: an upheld good-faith appeal makes zero changes to restrictions or reputation (there are no such tables in slice 1: assert by test that the only tables written are appeal, problem, problem_event, audit_event, moderation_decision flags). Original decisions stay immutable: the appeal outcome is stored beside them.
4. Emails: appealOutcome template to the appellant (outcome and plain explanation, no hints).
5. Audit event "appeal.resolved" with interim flag. Disclosure shown when same moderator.
6. Tests: both outcomes for T02 and T05; unauthorised reviewer; purged-draft overturn path; email sent; only expected tables written; atomicity.
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Overturn effects match the brief table for T02 and T05.
- APPEAL-2 test: upheld appeal leaves everything but the appeal row unchanged.
- Original decisions are never edited.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- T19 and T20 overturns (plan 05).
- Contribution restore (plan 04).
