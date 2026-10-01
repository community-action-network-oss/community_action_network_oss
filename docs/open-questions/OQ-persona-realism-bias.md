# OQ-persona-realism-bias: How realistic and how unbiased are the AI personas?

- **ID:** OQ-persona-realism-bias
- **Status:** open

## Question

Do AI persona agents behave enough like real submitters, adversaries and appellants to make graduation evidence meaningful, and how do we detect and correct their biases (language, culture, tone, tech fluency, local knowledge of Amsterdam) and the bias of the model that plays them?

## Why it matters

The simulation is the slice-1 proof (D-55). Personas that are too polite, too uniform or tuned to the judge model will pass a pipeline real people would break, and the pipeline may be unfair to people the personas do not resemble.

## Current default (what we built meanwhile)

Persona catalog and seeds as in `docs/design/ai/simulation.md`; a persona model separate from the decision-point model where possible; synthetic evidence only; every simulated item labeled (`SIM-LABEL-1`). Real-person feedback after graduation feeds new personas through the amendment loop. No claim that simulation replaces real users.

## Who can help

Behavioural and social scientists; people with lived experience of Amsterdam public services and safety issues; red teamers; fairness researchers; linguists.

## What a good answer looks like

A bias checklist for the persona catalog, a method to compare persona behaviour with real behaviour once it exists, and recommended additions to the catalog.

## Spec links

- `docs/design/ai/simulation.md`
- `docs/spec/16-security-a11y-ops-testing.md`
- `docs/open-questions/OQ-bias-monitoring.md`
