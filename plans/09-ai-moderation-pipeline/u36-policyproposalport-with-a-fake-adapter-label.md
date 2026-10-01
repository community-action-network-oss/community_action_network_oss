---
id: "09-u36"
plan: "09"
title: "PolicyProposalPort with a fake adapter: label and audit seed to a proposal candidate file"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 265
depends_on: ["09-u35","09-u32"]
writes: ["src/proposal-candidates/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/proposal-candidates.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/appeals.md#steps","docs/design/ai/amendment-loop.md","docs/design/ai/safety-and-privacy.md#abuse-of-the-policy-process","docs/design/flows/policy-amendment.md","docs/spec/constitution/rules.md#APPEAL-1","docs/spec/constitution/rules.md#NO-INSTANCE-OVERRIDE-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/proposal-candidates.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The aggregate label (and an auditor disagreement) becomes a proposal candidate, an example or rule change, through a port. The real adapter that opens a PR in can_policy needs a GitHub token and is founder-gated (separate unit); here a fake adapter writes a redacted proposal file so no can_policy repo is needed.

## Steps
1. Port `PolicyProposalPort.propose({kind: example|rule_change, ruleId, dpId, redactedInput, expectedOutcome, provenance, disagreement})` returning `{proposalRef}`. Table proposal_candidate (id, source label|audit|lane, kind, rule_id, dp_id, provenance jsonb, status proposed|ratified|rejected, proposal_ref, appeal_id null, created_at). Names are deliberately not policy_proposal or /v1/policy-proposals: plan 10 (10-u32) owns the member-facing policy_proposal table, routes and src/policy-proposals/**; a candidate is system-made from a label, audit or lane example and is not that API.
2. Redaction: input passes the masked view and a final PII scan; a proposal with any detector hit is refused (privacy-reviewed, redacted, provenance recorded). Prompt-injection note: example and label text is untrusted quoted data forever.
3. FakeProposalAdapter writes JSON under a configured directory (default tmp in tests) and returns a ref; production wiring selects the adapter by `POLICY_PROPOSAL_ADAPTER` (default `fake`, no network).
4. Consumers: on `label_task.aggregated` with a decisive label create the proposal and move the appeal to awaiting_policy; auditor seeds are proposed only when a steward calls `POST /v1/review/proposal-candidates/from-seed/{id}` (no automatic spam).
5. APPEAL-1 row-count check: an appeal outcome writes zero rows to grounding tables directly; only the proposal path produces proposals (test counts rows before and after).
6. No loosening-in-the-same-PR is a can_policy CI concern; record the flag `loosens: boolean` from the label direction on the proposal for later.

## Acceptance
- A decisive label produces exactly one redacted candidate file via the fake adapter.
- A candidate containing detector hits is refused.
- Nothing here edits a pack or a decision.
- No name collides with plan 10 policy_proposal routes or tables.
- `npm run verify` is green.

## Out of scope
- GitHub PR adapter (founder-gated unit).
- Ratification (can_policy and plan 10).
