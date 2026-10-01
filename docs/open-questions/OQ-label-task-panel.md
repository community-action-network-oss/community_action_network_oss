# OQ-label-task-panel: How big is a label-task panel, and how is it randomized?

- **ID:** OQ-label-task-panel
- **Status:** open

## Question

How many people label each appeal or eval example, how are they chosen and masked, and what agreement ends the task?

## Why it matters

Label tasks turn disputed appeals into policy examples. Panel design decides how robust and how capture-resistant that is.

## Current default (what we built meanwhile)

Randomized, context-masked assignment with at least three independent labels collected before the aggregate is shown, matched by jurisdiction where needed. Disagreement is recorded and escalates to a ratification panel. Tests simulate labelers.

## Who can help

Crowdsourcing and annotation researchers; community organizers.

## What a good answer looks like

Panel size by stakes, masking rules, agreement threshold, conflict declaration, and calibration on known cases.

## Spec links

- `docs/spec/constitution/ch05-ai-review-appeals.md` (V.5, V.6)
- `docs/spec/06-moderation-geo-governance.md`
- `docs/design/ai/appeals.md`
