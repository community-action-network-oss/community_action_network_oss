# OQ-trusted-sources: What makes a cited URI a trusted source?

- **ID:** OQ-trusted-sources
- **Status:** open

## Question

Which sources count as trusted when a poster cites URIs to show a problem is real, and what must a source show to establish authenticity?

## Why it matters

Trusted sources are the first line against invented or distorted problems. Too narrow a list shuts out local and community knowledge. Too wide a list lets anything through.

## Current default (what we built meanwhile)

Default source categories that count as trusted: official records, statistics bodies, courts and legislatures, reputable media with editorial standards, research (peer-reviewed), and civil society organizations with a public track record. Anything in the category `other` needs corroboration by a second independent source. Every source states what it establishes and why it is authentic (`source_ref`: `uri`, `category`, `establishes`, `authenticity_note`). `DP-SOURCE-TRUST` applies the list under `SOURCE-1`.

## Who can help

Librarians and fact-checkers; journalists; researchers; archivists; open-data practitioners.

## What a good answer looks like

A category list with entry tests, an authenticity checklist per category, a rule for corroboration, and how local sources are handled in places with few official records.

## Spec links

- `docs/spec/01-slice-1-brief.md` (section 4, Preparation)
- `docs/spec/constitution/ch03-discourse-evidence.md` (III.3)
- `docs/spec/constitution/rules.md` (SOURCE-1, EVID-URL-1)
