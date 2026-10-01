# OQ-hosting-region: Where is the first deployment hosted, and which email provider sends sign-in codes?

- **ID:** OQ-hosting-region
- **Status:** open

## Question

Which hosting region and provider, and which real email provider, should the first deployment use?

## Why it matters

Region sets data-protection obligations and latency. The email provider sees every sign-in address. Both involve cost and legal terms.

## Current default (what we built meanwhile)

No deployment. Local development only, with Postgres and Mailpit in docker compose. A real email provider is founder-gated.

## Who can help

Site reliability engineers; data-protection specialists; nonprofit infrastructure donors.

## What a good answer looks like

A comparison of 2 or 3 options with region, data terms, cost band and exit path.

## Spec links

- `docs/spec/11-architecture.md`
- `docs/spec/12-decentralization-ready.md`
