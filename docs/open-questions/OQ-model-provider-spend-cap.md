# OQ-model-provider-spend-cap: Which model provider and spend cap for live calls?

- **ID:** OQ-model-provider-spend-cap
- **Status:** decided (D-65, 2026-10-01; ADR 0014)

## Question

Which provider, models and monthly spend cap switch live model calls on, and under what data-processing terms?

## Why it matters

Live calls cost money and send content to a third party. The cap and the terms decide who can run the platform and what leaves the trust boundary.

## Decision (D-65)

OpenRouter is the provider. Free (`:free`) models first, then cheap, chosen per decision point as the cheapest model passing that DP's eval thresholds. App spend cap: **$10 per month** by default plus per-run budgets, under the key's $50 hard limit. Free endpoints take synthetic data only; real member content goes only to endpoints with data collection denied or zero data retention, behind the privacy gateway. Open remainder: the DPA and hosted-provider approvals for real member data (spec 14), which stay founder-gated, and the cost-per-accepted-result target.

## Current default (what we built meanwhile)

Live calls are off by default (`AI_PROVIDER=fake`). Tests and night runs use `FakeModel` with recorded responses. The first provider adapter is OpenRouter, per the decision above (the earlier Anthropic-first plan of D-53 is superseded). Hitting the cap holds items (`FAIL-CLOSED-AI-1`).

## Who can help

Founder (approval); privacy and security reviewers; cost and inference engineers.

## What a good answer looks like

A provider and model register entry meeting `docs/spec/14-ai-privacy-gateway.md` hosted-provider requirements, a cap in currency per month, and a cost-per-accepted-result target.

## Spec links

- `docs/spec/14-ai-privacy-gateway.md`
- `docs/spec/15-ai-inference.md`
- `docs/spec/constitution/rules.md` (PRIV-GATEWAY-1, FAIL-CLOSED-AI-1)
