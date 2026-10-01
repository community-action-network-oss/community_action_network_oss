# OQ-legal-corpus-sourcing: Who curates and verifies the legal corpus for each layer, and how often does it update?

- **ID:** OQ-legal-corpus-sourcing
- **Status:** open

## Question

For each layer of the legal stack (L1 UN human rights, L2 supranational, L3 national constitution, L4 national law, L5 regional, L6 city), who curates the corpus in `can_policy`, who verifies provenance, and how often is it refreshed?

## Why it matters

The legal layers are the checkable starting point for every legality decision (D-61). A stale or wrong corpus makes the AI approve something illegal or block something lawful, and every update triggers re-moderation and re-resolution (`RERESOLVE-1`).

## Current default (what we built meanwhile)

The project drafts L1 to L6 for the Amsterdam overlay from official sources only, with provenance fields (`LEGAL-SOURCE-1`), founder-approved under transitional stewardship, marked unreviewed until a qualified reviewer signs off (`OQ-amsterdam-overlay-review`). Refresh monthly for L4 to L6 and on notice for L1 to L3, each update shadow-tested before activation.

## Who can help

Lawyers and legal librarians; official-gazette and open-law data maintainers; Dutch and EU law specialists; translators.

## What a good answer looks like

A curation workflow per layer: official sources, who verifies, update cadence, how a change is detected, how disputes about interpretation are recorded, and the review capacity needed.

## Spec links

- `docs/spec/constitution/ch04-resolution-lifecycle.md (IV.6)`
- `docs/spec/06-moderation-geo-governance.md`
- `docs/open-questions/OQ-legal-policy-reviewers.md`
