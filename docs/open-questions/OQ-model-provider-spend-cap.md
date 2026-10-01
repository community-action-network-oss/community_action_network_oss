# OQ-model-provider-spend-cap: Which model provider and spend cap for live calls?

- **ID:** OQ-model-provider-spend-cap
- **Status:** open

## Question

Which provider, models and monthly spend cap switch live model calls on, and under what data-processing terms?

## Why it matters

Live calls cost money and send content to a third party. The cap and the terms decide who can run the platform and what leaves the trust boundary.

## Current default (what we built meanwhile)

Live calls are off. Tests and night runs use `FakeModel` with recorded responses. The first provider adapter is Claude via the Anthropic API, founder-gated by an API key and a spend cap (D-53). Hitting the cap holds items (`FAIL-CLOSED-AI-1`).

## Who can help

Founder (approval); privacy and security reviewers; cost and inference engineers.

## What a good answer looks like

A provider and model register entry meeting `docs/spec/14-ai-privacy-gateway.md` hosted-provider requirements, a cap in currency per month, and a cost-per-accepted-result target.

## Spec links

- `docs/spec/14-ai-privacy-gateway.md`
- `docs/spec/15-ai-inference.md`
- `docs/spec/constitution/rules.md` (PRIV-GATEWAY-1, FAIL-CLOSED-AI-1)
