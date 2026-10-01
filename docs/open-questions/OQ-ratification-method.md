# OQ-ratification-method: How are policy changes ratified, and what is the quorum?

- **ID:** OQ-ratification-method
- **Status:** open

## Question

How does the community ratify a change to the policy pack (a PR to `can_policy`): who sits on the panel, how many must approve, and what makes a ratification legitimate?

## Why it matters

Ratification is the step where the community, not the AI and not one person, makes the law. Too loose lets a small group capture the rules. Too strict freezes them while appeals pile up.

## Current default (what we built meanwhile)

A randomized, context-masked, cross-jurisdiction review panel plus `can_policy` maintainers. Transitional founder stewardship ratifies policy pack v1 and each version until a panel exists (Constitution VIII.2, V.5). In tests the panel is simulated by fixtures.

## Who can help

Governance designers; sortition and deliberation researchers; open-source maintainers.

## What a good answer looks like

A proposal for panel size, selection, quorum, tie rules, conflict-of-interest rules and a waiting period, with the capture risks it accepts.

## Spec links

- `docs/spec/constitution/ch05-ai-review-appeals.md` (V.5, V.6)
- `docs/spec/constitution/ch08-governance.md` (VIII.2)
- `docs/design/ai/amendment-loop.md`
