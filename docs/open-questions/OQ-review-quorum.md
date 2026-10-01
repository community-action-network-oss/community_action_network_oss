# OQ-review-quorum: How many volunteer reviews, or how long, before the publication decision can run?

- **ID:** OQ-review-quorum
- **Status:** open

## Question

How many volunteers must finish a review, and how long must a private problem wait in volunteer review, before the poster can send it to the publication decision (`DP-PUBLISH`)?

## Why it matters

Too strict a quorum leaves problems waiting with nobody to review them. Too loose a quorum makes the review a formality and lets weak facts or sources reach the AI unchecked.

## Current default (what we built meanwhile)

The quorum is 3 distinct volunteers who finished a review (at least one recommendation, or an explicit "no changes") and no recommendation left open more than 7 days. After 14 days with at least 1 finished review the poster may send it anyway. `DP-PUBLISH` weighs every recommendation still open. The numbers are pack values, not code.

## Who can help

Community moderators and reviewers from open-source or civic projects; people who run peer-review queues; UX researchers.

## What a good answer looks like

A recommendation per number with the reason, an estimate of how many opted-in volunteers are needed to keep the median wait acceptable, and what to do when nobody reviews.

## Spec links

- `docs/spec/01-slice-1-brief.md` (section 4, Volunteer review)
- `docs/spec/01a-lifecycle.md` (T04)
- `docs/spec/constitution/rules.md` (REVIEW-1, RECO-1)
