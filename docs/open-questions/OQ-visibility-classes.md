# OQ-visibility-classes: Which records are public, limited, auditor-only or transient?

- **ID:** OQ-visibility-classes
- **Status:** open

## Question

Which classes of record exist, who can see each, and what becomes public by default?

## Why it matters

What becomes public is the most consequential privacy decision. It is hard to take back.

## Current default (what we built meanwhile)

Two classes plus notes: `private` (draft, submitted, needs_revision, rejected: initiator, the emergency/legal lane and auditors on masked samples) and `public` (published problems). Auditor-only notes are never public.

## Who can help

Privacy engineers; data-protection officers; journalists; archivists.

## What a good answer looks like

A table of record types by class with a short rationale for each and the effect of each state change.

## Spec links

- `docs/spec/01-slice-1-brief.md` (defaults)
- `docs/spec/09-civic-protocol.md` (Public and restricted data boundary)
