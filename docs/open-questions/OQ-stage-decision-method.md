# OQ-stage-decision-method: How is the choice inside a stage made, and who may override the default?

- **ID:** OQ-stage-decision-method
- **Status:** open

## Question

Inside a stage, what decision method turns the contributed options into a chosen option or set of steps, and who may set a different method for one stage?

## Why it matters

The choice decides what work is done. Letting the poster always choose risks capture. Voting risks popularity over evidence and rights.

## Current default (what we built meanwhile)

The method is set per stage in its metadata. The default is `poster_after_input`: the poster chooses after community input, and records the rationale, authority and any dissent. A stage may instead set `community_vote`, `steward` or `other_named`. The choice gate (`DP-DECISION-RECORD`, `DP-LEGALITY`) checks the record, never which option is best. The per-problem method is still `OQ-decision-method`.

## Who can help

Governance and deliberation researchers; facilitators; mediators; community organizers.

## What a good answer looks like

A written rule for when each method fits, who may change a stage's method after publication (today a plan change, `PLAN-CHANGE-1`), and worked fictional examples with failure cases.

## Spec links

- `docs/spec/01b-stages.md` (section 4b.1, 4b.5)
- `docs/open-questions/OQ-decision-method.md`
- `docs/spec/constitution/rules.md` (DECISION-REC-1, PLAN-CHANGE-1)
