# OQ-license: Which license should each repository carry?

- **ID:** OQ-license
- **Status:** decided (resolved 2026-10-01, D-49)

## Question

Which open-source license applies to `can_server`, `can_app`, `can_gallery`, the documentation and the protocol schemas?

## Why it matters

It is very hard to change once outside contributions land. It decides whether hosted forks must stay open, how easily companies and public bodies can adopt the code, and who can contribute. It blocks publishing the repositories and broad promotion, not building.

## Current default (what we built meanwhile)

Resolved: MIT for all four repositories, code and docs alike (D-49).

## Resolution (2026-10-01)

The founder chose MIT for all four repositories (code and docs), logged as D-49. Why: maximum reuse. CAN is meant to be copied and used by anyone, so the most permissive, widely recognized license fits. Copyright line: "Community Action Network contributors". No CLA; inbound = outbound. Earlier AGPL and Apache-2.0 recommendations (D-27) are superseded. Relicensing later would need the agreement of contributors, so this is effectively one-way once outside contributions land. This file is kept for history.

## Who can help

Open-source licensing lawyers; nonprofit counsel; maintainers of AGPL or Apache projects; public-sector procurement staff.

## What a good answer looks like

A one-page compatibility analysis covering the dependencies of all three repositories, a view on DCO versus CLA, and a clear recommendation with trade-offs.

## Spec links

- `docs/spec/21-open-source-governance.md` (Licensing strategy)
- `DECISIONS.md D-27`, `D-49`
