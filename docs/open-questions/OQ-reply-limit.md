# OQ-reply-limit: Should the daily reply limit be a constitution rule?

**ID:** OQ-reply-limit
**Status:** open

## Question

D-85 limits a person to 4 replies per problem per rolling 24 hours, as a community policy value. Should the principle (a cap on replies so each one counts) be written into the constitution, with the number staying a policy value?

## Why it matters

A policy value can be changed by a policy proposal. A constitution rule is harder to remove and would protect the "fewer, better replies" purpose from being weakened by a later pack. It would also bind every jurisdiction.

## Current default (what we built meanwhile)

4 replies per account per problem per rolling 24 hours, in can_policy `limits.yaml` as `caps.replies_per_account_per_problem_per_day` (provisional). The server falls back to 4 per day. It combines with the cooldowns in `OQ-cooldown-lengths`: both apply, the stricter wins. The constitution is not changed.

## Who can help

Community managers; constitution authors; accessibility advocates (people who need more than 4 replies to explain a complex problem).

## What a good answer looks like

A yes or no on a constitution rule, a view on the right number and window, and any exception, for example for the person who posted the problem or for access needs.

## Spec links

- `docs/spec/05-lifecycle-participation.md` (Reply allowance)
- `docs/spec/01-slice-1-brief.md` (cooldowns)
- `docs/open-questions/OQ-limits.md`
- `docs/open-questions/OQ-cooldown-lengths.md`
