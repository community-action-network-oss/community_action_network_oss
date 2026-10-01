# ADR 0012: Cumulative legal layer stack

- Status: Accepted, 2026-10-01 (D-61). Builds on [0008](0008-ai-executed-community-policy.md) and [0009](0009-can-policy-repo.md).

## Context
One jurisdiction law pack per place does not say how human rights, supranational law, constitutions, national, regional and city rules combine. CAN must not request or publish anything illegal anywhere, and must be defensible when someone tries to block it.

## Decision
- Layers L0 CAN rules, L1 UN human rights (UDHR, ICCPR, ICESCR), L2 supranational where binding (NL: EU Charter, EU law, ECHR), L3 national constitution, L4 national law, L5 regional, L6 city. Every moderation run and every DP judging legality applies all layers, cumulatively.
- Layers live in `can_policy` as versioned legal corpora with provenance: source URL, official publisher, retrieval date, version, hash, licence, lawyer review (constitution IV.6).
- Prompts get only relevant articles from a per-corpus topic index, never whole codes. Every legality decision cites layer, article and corpus version.
- Topic forbidden by local law: not published in that jurisdiction, refusal logged with legal basis. Only the solution illegal: the problem goes to `stuck` (legally blocked).
- A corpus update needs a lawyer review record and ratification, and triggers re-moderation and re-resolution (ADR 0013).
- Amsterdam is the first stack. Design: `docs/design/ai/legal-stack.md`.

## Consequences
- Lawyers, rights and policy experts are needed as `can_policy` contributors now.
- Corpus curation is ongoing work; retrieval quality becomes a safety property and is evaluated.
- Proposed rule ids: LEGAL-STACK-1, LEGAL-CITE-1, TOPIC-FORBIDDEN-1, LEGAL-CORPUS-1, LEGAL-SOURCE-1. Risk: false topic bans; mitigated by requiring a reviewed forbidding article and `hold` when unsure.

## How to reverse
Collapse layers into one jurisdiction pack per place by a major pack version; citations already stored keep resolving because old corpus versions stay loadable.
