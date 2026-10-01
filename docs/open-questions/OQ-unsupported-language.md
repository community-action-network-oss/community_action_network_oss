# OQ-unsupported-language: What happens to submissions in unsupported languages, and which languages come after English?

- **ID:** OQ-unsupported-language
- **Status:** open

## Question

How should the platform treat text in a language it cannot yet moderate, which languages come next, and who reviews translations and right-to-left layouts?

## Why it matters

Moderation quality must be evaluated per language. Silent rejection excludes people; silent acceptance skips safety review.

## Current default (what we built meanwhile)

English only. Text that looks non-English is held with a "language not yet supported" label (fail closed), and the run may ask for a translation.

## Who can help

Translators; linguists; right-to-left readers; labelers who read other languages.

## What a good answer looks like

A ranked list of the next 2 or 3 languages with named reviewers, and a plain-language message for the unsupported case.

## Spec links

- `docs/spec/01-slice-1-brief.md` (defaults)
- `docs/spec/16-security-a11y-ops-testing.md`
