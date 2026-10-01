---
id: "09-u46"
plan: "09"
title: "GitHub adapter for PolicyProposalPort (founder-gated)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 275
depends_on: ["09-u36"]
writes: ["src/proposal-candidates/adapters/github/**",".env.example","src/proposal-candidates/adapters/github/*.spec.ts"]
reads: ["src/proposal-candidates/**"]
spec: ["docs/design/ai/amendment-loop.md","docs/design/ai/appeals.md#steps","docs/design/flows/policy-amendment.md","docs/open-questions/OQ-policy-pr-rights.md"]
needs: []
verify: ["npm run verify","npx vitest run src/proposal-candidates/adapters/github"]
founder_gate: true
defaults: "Keep the fake adapter as the default. The GitHub adapter is constructible only with a token and the can_policy repo name in env, and is never exercised in CI."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The real adapter that opens a redacted pull request in can_policy for an example or rule change. Founder-gated because it needs the can_policy GitHub repo (10-u01) and a token.

## Steps
1. Implement `GithubPolicyProposalAdapter` against the GitHub REST API through a small injected HTTP client (no new heavy SDK): branch, add `decision-points/<DP>/examples/<id>.json` from the redacted proposal, open a PR whose body states rule ids, DPs, reason and provenance (no raw text).
2. Config: `POLICY_PROPOSAL_ADAPTER=github`, `GITHUB_TOKEN`, `CAN_POLICY_REPO`; refuse to construct without them. Token never logged.
3. Unit tests with a mocked HTTP client: PR body content has no PII (scan), branch naming, idempotency by proposal id (second call returns the same PR), failure maps to a retry and leaves the appeal awaiting_policy.

## Acceptance
- Cannot be constructed without token and repo (test).
- No test touches the network.
- `npm run verify` is green.

## Out of scope
- Creating the can_policy repo (10-u01).
- Ratification and merge.
