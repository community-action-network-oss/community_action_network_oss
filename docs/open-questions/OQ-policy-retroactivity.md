# OQ-policy-retroactivity: Do policy changes apply to content already published?

- **ID:** OQ-policy-retroactivity
- **Status:** open

## Question

When a ratified policy change would flip the outcome for content already published or decided, is that content re-moderated, grandfathered, or left to appeal?

## Why it matters

Retroactivity decides whether the rules are the same for everyone at one time, and whether people can be surprised by a removal.

## Current default (what we built meanwhile)

Re-moderate affected content under the new version. A flipped item gets a visible "re-reviewed under policy vX" notice with an explanation and an appeal path. Nothing is removed silently (`REMOD-NOTICE-1`).

## Who can help

Trust-and-safety practitioners; legal reviewers; people who have been moderated.

## What a good answer looks like

A rule per outcome type (publish to hold, reject to publish), a notice period, and how appeals interact, tested against replay-diff examples.

## Spec links

- `docs/spec/constitution/rules.md` (REMOD-NOTICE-1)
- `docs/spec/01-slice-1-brief.md` (section 4.2 notes)
- `docs/design/ai/amendment-loop.md`
