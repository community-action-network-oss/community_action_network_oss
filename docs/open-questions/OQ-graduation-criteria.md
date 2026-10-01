# OQ-graduation-criteria: Are graduation criteria G1 to G13 the right bar for opening public participation?

- **ID:** OQ-graduation-criteria
- **Status:** open

## Question

Are the criteria and default thresholds in `docs/design/ai/simulation.md` section 8 (G1 to G13) the right bar, who ratifies them, and who confirms a run set truly meets them?

## Why it matters

They decide when real people may post (`SIM-GATE-1`). A bar that is too low exposes real people to a weak pipeline; too high delays the project forever. Deterministic `FakeModel` runs cannot satisfy the quality criteria, so the bar also decides when live runs are paid for.

## Current default (what we built meanwhile)

The defaults in `simulation.md` section 8, stored as pack values, ratified by founder stewardship with a public record (`FOUNDER-TRANS-1`). Live runs stay founder-gated. Any critical miss (a leak, an injection success, a fail-open) resets the counters.

## Who can help

Evaluation and red-team specialists; statisticians; safety and privacy engineers; independent auditors.

## What a good answer looks like

A review of each criterion with a reasoned threshold, the confidence bound or sample size needed to trust it, and which criteria need an independent reviewer rather than the founder.

## Spec links

- `docs/design/ai/simulation.md`
- `docs/spec/18-phases-gates.md`
- `docs/spec/constitution/rules.md (SIM-GATE-1)`
