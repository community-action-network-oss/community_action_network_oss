# ADR 0014: OpenRouter with free-first, eval-chosen models

- Status: Accepted, 2026-10-01 (D-64, D-65). Supersedes only the Anthropic-first part of D-53 and [0008](0008-ai-executed-community-policy.md) ("the first live provider, Claude via the Anthropic API, is founder-gated"). The rest of 0008 stands.

## Context
The first live provider was to be Claude via the Anthropic API, gated on a key and a spend cap. The founder now has an OpenRouter key (stored as `OPEN_ROUTER_KEY` in the gitignored superproject `.env`, $50 hard limit on the account side, paid account for higher free-model rate limits). Cost is the constraint, and quality differs per decision point.

## Decision
- OpenRouter is the provider, through its OpenAI-compatible endpoint, behind the existing `ModelProvider` interface. The Anthropic adapter becomes optional.
- Free (`:free`) models first, then cheap. Per decision point the router uses the cheapest model that passes that DP's eval thresholds; escalation only on low confidence or eval failure.
- A model register records model id, price and per-DP eval score with dates. A 429 or outage backs off, then falls through to the next registered model; if all fail, the item is held (`FAIL-CLOSED-AI-1`).
- Spend: `AI_SPEND_CAP_MONTHLY_USD` defaults to 10, plus per-run budgets, both under the key's $50 limit.
- Privacy: free endpoints may log or train on inputs, so they are allowed only for synthetic data (simulation, seeds, evals). Real member content goes only to endpoints with data collection denied (`data_collection: "deny"` or zero-data-retention), always behind the privacy gateway.
- Founder gates lifted within the caps: the provider implementation, live record runs and live persona runs. Still gated: the graduation review (11-u40) and anything that sends real member data.

## Consequences
- Live runs can happen in night runs, cheaply, with synthetic data only.
- Model quality is evidence, not reputation; the register is auditable and must be re-selected on a cadence (`docs/design/ai/evaluation.md`).
- Free-tier models are unstable, so fallback and hold paths get real use.
- Real-member-data processing has an extra hard filter on top of the existing hosted-provider requirements (spec 14).

## How to reverse
Set `AI_PROVIDER=fake`, or bind the optional Anthropic adapter and re-gate units 09-u13, 09-u47, 11-u38 and 11-u39. The register and router are provider-neutral.
