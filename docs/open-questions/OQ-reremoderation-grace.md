# OQ-reremoderation-grace: How long is the grace period when a policy change flips a published item?

- **ID:** OQ-reremoderation-grace
- **Status:** open

## Question

When re-moderation under a new policy version flips a published item, how long does the item stay visible with its "re-reviewed under policy vX" notice before the flip takes effect, and how do appeals interact with that period?

## Why it matters

Immediate removal feels like silent censorship; a long wait leaves content that the community has decided should not be public (`REMOD-NOTICE-1`). Safety and privacy flips may need no grace at all.

## Current default (what we built meanwhile)

The notice is shown immediately and nothing is removed silently. For flips on privacy, crisis or safety grounds the item is hidden at once with the notice. For other flips the item stays visible with the notice for 7 days or until the appeal is decided, whichever is first. Numbers are pack values.

## Who can help

Trust and safety practitioners; platform-governance researchers; human-rights lawyers.

## What a good answer looks like

A grace table by flip reason (privacy, safety, legality, framing, tone) with the reasoning, and a rule for the appeal window.

## Spec links

- `docs/spec/01-slice-1-brief.md (section 5)`
- `docs/spec/constitution/rules.md (REMOD-NOTICE-1)`
- `docs/design/ai/triggers.md`
