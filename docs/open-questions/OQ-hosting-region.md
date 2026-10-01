# OQ-hosting-region: Where is the first deployment hosted, and which email provider sends sign-in codes?

- **ID:** OQ-hosting-region
- **Status:** open

## Question

Which hosting provider and region, and which real email provider, should the first deployment use? D-57: hosting is undecided, and every service must be portable whichever answer is chosen.

## Why it matters

Region sets data-protection obligations and latency. The email provider sees every sign-in address. Both involve cost and legal terms.

## Current default (what we built meanwhile)

No deployment and no provider chosen. GCP was an early lean in planning notes, not a decision (D-57). Every service ships a production Docker image, an environment-variable contract, health checks and a backup and restore path, so any container host works. Local development uses Postgres and Mailpit in docker compose. Provisioning and a real email provider are founder-gated.

## Who can help

Site reliability engineers; data-protection specialists; nonprofit infrastructure donors.

## What a good answer looks like

A comparison of 2 or 3 options with region, data terms, cost band and exit path, and confirmation that each runs the portable images unchanged.

## Spec links

- `docs/spec/11-architecture.md` (Portable hosting)
- `docs/spec/16-security-a11y-ops-testing.md`
- `docs/open-questions/OQ-mera-disclosure.md`
- `docs/spec/12-decentralization-ready.md`
