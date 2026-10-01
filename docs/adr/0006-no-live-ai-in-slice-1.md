# ADR 0006: No live AI in slice 1

- Status: Superseded by 0008 (2026-10-01)

## Context
The manifesto describes AI-assisted moderation, but spec section 14 gates any public-facing AI behind a data protection impact assessment, privacy gateway, evaluations and founder approval. None exist yet. Slice 1 data is fictional but the design must not teach contributors that raw text goes to a provider.

## Decision
Slice 1 uses deterministic checks (patterns and word lists for names, addresses, contact details, individual-case language, duplicates via salted fingerprints) plus human review of everything published. An `AiGatewayPort` interface exists and a `NoopAiGateway` is bound; the flag `AI_ENABLED` defaults to false and slice 1 has no code path that sets it true. The product says so plainly: "Rules-based checks and human review today. AI assistance is planned; people make and answer for every decision."

## Consequences
- Every decision has a named human and cited rule ids; appeals are straightforward.
- Review is slower and does not scale; the honest wait statement covers this.
- Later AI work plugs in behind the port, subject to the gateway spec and its approval gates.

## How to reverse
Implement the port with a privacy-gateway adapter, add evaluation fixtures, obtain the required approvals, then enable per environment via the flag. No schema change is needed because decisions already record `rule_ids` and `policy_version`.
