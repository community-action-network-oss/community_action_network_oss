---
name: can-spec
description: Read or edit the CAN specification in docs/spec, the open-questions register, or the manifesto. Use when a task touches product scope, the slice-1 lifecycle or state table, contribution types, moderation or appeal fields, constitution rules, or when you must log a question you cannot answer.
---

# can-spec

Weight: 24 spec files in `docs/spec/` (about 215KB in total, each 25KB or less), the constitution (chapters ch01 to ch11, `map.tsv`, `rules.md`) beside them, 33 files in `docs/open-questions/`, plus `manifesto.md`. Never load it all. Start with `docs/spec/00-index.md` ("What to load"). Slice-1 work always loads `01-slice-1-brief.md` and `02-agent-rules.md` first.

## Layout

- `docs/spec/00-index.md`: what each file covers, which to load for which work, glossary.
- `docs/spec/01..23-*.md`: the specification. `01` is the slice-1 brief. `23` maps the original question list to the register.
- `docs/spec/constitution/`: owned by the constitution work. Start at its `README.md`. Rule IDs live in `rules.md`; old to new article numbers in `map.tsv`.
- `docs/spec/split-map.tsv`, `docs/spec/tools/`: provenance and check scripts.
- `docs/open-questions/`: one `OQ-<slug>.md` per undecided item, plus `README.md`.
- `docs/design/`: system design, ERD, UX (written by the design work, not by spec edits).
- `docs/adr/`: architecture decision records.
- `DECISIONS.md`: the decision log.

## Editing rules

- `01-slice-1-brief.md` alone owns the lifecycle state and transition table, the public labels, the contribution-type enum, the moderation decision fields and the minimal entity list. Other files link there. Never copy the table elsewhere.
- Do not rename the `## 4. Lifecycle` heading in `01`. Design docs link to `#4-lifecycle`.
- Every file in `docs/spec/` (excluding `constitution/`) stays at 25KB or less. Split before you exceed it.
- No em dashes or en dashes in the manifesto, the spec or the open-questions files. No `<aside>`, emoji or empty `> ` lines. Say "problem", never "case", for a public problem. Say "Resolution records", never "Hall of fame". Ladder roles are "Watcher" and "Project steward"; platform roles are "Observer" and "Steward".
- Cross-reference by file and section name instead of repeating content. Cite the constitution by new ID (for example `Constitution V.4`) or rule ID (`MOD-EXPLAIN-1`).
- `split-map.tsv` maps ORIGINAL `build_spec.md` line numbers to the split files, and only resolves against commit `7f61360`. After edits, line numbers in the spec no longer match it. `build_spec.md` was removed from the tree and stays in history (`git show 7f61360:build_spec.md`).
- OQ file format is enforced: `# OQ-<slug>: title`, a line `**ID:** OQ-<slug>`, a line `**Status:** open|proposed|decided|withdrawn`, and the sections Question, Why it matters, Current default (what we built meanwhile), Who can help, What a good answer looks like, Spec links. Every OQ states its current default. Resolution flow: proposal, discussion, founder or governance decision, logged in `DECISIONS.md`.
- `DECISIONS.md` is written only by the orchestrator. Agents and unattended runs never write to it. Log unanswered questions as OQ files, apply a reversible default, or skip.
- Founder-operated agents commit only to `night/*` branches; the founder merges (`02-agent-rules.md`). The external AI-contribution policy (`22`) is separate and unchanged.
- The manifesto keeps its voice: a developer should think "Yes, finally, we can solve problems." Keep the stage line, the non-goals, the emergency exclusion and the AI sentence "Rules-based checks and human review today. AI assistance is planned, and people make and answer for every decision."

## Commands (from the superproject root)

- `node docs/spec/tools/check-spec.mjs`: sizes, no `<aside>`, no empty quote lines, no dashes, manifesto rules, OQ format.
- `node docs/spec/tools/split-check.mjs . 7f61360`: proves the verbatim split against the split commit. The ref argument is required now that `build_spec.md` is gone.
- `node docs/spec/constitution/tools/check.mjs`: constitution map, sizes and rule ID parity.
- `git -C . show 7f61360:docs/spec/22-ai-contribution-policy.md`: the pre-edit AI tool and reference lists, which belong in `CONTRIBUTING.md`.
