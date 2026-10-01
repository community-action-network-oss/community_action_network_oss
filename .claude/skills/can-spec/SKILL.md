---
name: can-spec
description: Read or edit the CAN specification in docs/spec, the open-questions register, or the manifesto. Use when a task touches product scope, the slice-1 lifecycle or state table, contribution types, moderation or appeal fields, constitution rules, or when you must log a question you cannot answer.
---

# can-spec

Weight: 26 spec files in `docs/spec/` (about 240KB in total, each 25KB or less), the constitution (chapters ch01 to ch11, `map.tsv`, `rules.md` and `rules-legal-sim.md`) beside them, 58 files in `docs/open-questions/`, plus `manifesto.md`. Never load it all. Start with `docs/spec/00-index.md` ("What to load"). Slice-1 work always loads `01-slice-1-brief.md` and `02-agent-rules.md` first; lifecycle work also loads `01a-lifecycle.md` (problem states) and `01b-stages.md` (stage plan and stage states).

## Layout

- `docs/spec/00-index.md`: what each file covers, which to load for which work, glossary.
- `docs/spec/01..23-*.md`: the specification. `01` is the slice-1 brief and `01a-lifecycle.md` the problem state and transition table and `01b-stages.md` the stage plan and stage table (both split from 01). `23` maps the original question list to the register.
- `docs/spec/constitution/`: owned by the constitution work. Start at its `README.md`. Rule IDs live in `rules.md`; old to new article numbers in `map.tsv`.
- `docs/spec/split-map.tsv`, `docs/spec/tools/`: provenance and check scripts.
- `docs/open-questions/`: one `OQ-<slug>.md` per undecided item, plus `README.md`.
- `docs/design/`: system design, ERD, UX, and `docs/design/ai/` (written by the design work, not by spec edits).
- `docs/adr/`: architecture decision records.
- `DECISIONS.md`: the decision log.

## The AI model (D-51 to D-53)

Community-legislated, AI-executed moderation. The community never judges single items. It legislates policy, and AI agents apply it before publication, on every update and after publication. Slice 1 builds the full pipeline on `FakeModel` plus recorded responses; the live Anthropic provider is founder-gated (API key, spend cap). Vocabulary and where it lives:

- **Policy pack:** versioned bundle in the planned fifth repo `can_policy` (`11-architecture.md`, `docs/design/ai/policy-pack.md`).
- **Decision point (`DP-*`):** ids are in the `01` lifecycle table (`DP-ELIGIBILITY`, `DP-PRIVACY`, `DP-FRAMING`, `DP-DUPLICATE`, `DP-CONTRIB-RELEVANCE`, `DP-TONE`, `DP-NAMING`, `DP-LEGALITY`, `DP-DECISION-RECORD`, `DP-VERIFICATION`, `DP-CRISIS`, `DP-EVIDENCE-TIER`, plus `DP-ASSUMPTIONS` and `DP-COMPLETENESS` from D-58, `DP-RERESOLUTION` from D-59, and from D-72 `DP-SOURCE-TRUST`, `DP-CRITERIA`, `DP-STAGE-PLAN`, `DP-PUBLISH`, `DP-STAGE-RESOLUTION`; `DP-VERIFICATION` now judges only the final solved state, and `DP-STAGE` is retired). Defined in `01a-lifecycle.md` and `01b-stages.md`. Catalog: `docs/design/ai/decision-points.md`.
- **Moderation run, outcomes** (`publish`, `needs_revision`, `reject`, `route_external`, `hold`, `escalate_human`): `15-ai-inference.md`, `06`, `docs/design/ai/runtime.md`. Decision fields incl. `policy_version`, `prompt_hash`, `model_id`, `confidence`, `run_id`: `01` section 5.
- **Pre-decided and post-decided consensus, replay diff, amendment loop:** Constitution V.5, `docs/design/ai/amendment-loop.md`.
- **Label task, appeal-to-example loop:** Constitution V.5, V.6, `docs/design/ai/appeals.md`.
- **Privacy gateway** (mandatory before any model call): `14`. **Human roles:** legislators, auditors, labelers, the emergency/legal lane, maintainers. Per-item moderators no longer exist; the `moderator` role is the lane, auditor or labeler.
- **Rules:** `POLICY-CITE-1`, `FAIL-CLOSED-AI-1`, `NO-INSTANCE-OVERRIDE-1`, `REMOD-NOTICE-1`, `PRIV-GATEWAY-1`, `AGENT-NO-TOOLS-1`, `INTERIM-1` (interim policy stewardship) in `constitution/rules.md`. `AI-OFF-1` is gone. D-55 to D-58 added: `STRUCT-ONLY-1`, `SCHEMA-1`, `AI-ASSIST-1`, `ASSUMP-1`, `COMPLETE-1`, `SIM-GATE-1`, `SIM-LABEL-1`, `SIM-NOSECRET-1`, and the decision-point rules `FRAME-1`, `DUP-1`, `RELEVANCE-1`, `SOLUTION-ONLY-1`, `TONE-1`, `DECISION-REC-1`, `VERIFY-1`, `STAGE-1`, `BLOCKER-1`, `CLOSE-1`, `LEGAL-LANE-1`; from D-59 and D-61: `LEGAL-STACK-1`, `LEGAL-CITE-1`, `TOPIC-FORBIDDEN-1`, `LEGAL-CORPUS-1`, `LEGAL-SOURCE-1`, `RERESOLVE-1`. The legal layer stack L0 to L6 is in Constitution I.2; re-resolution is T20 `REOPEN-RULE` and T21 `REOPEN-EVIDENCE` in `01a-lifecycle.md` (old T23, T24).

## Lifecycle v2 (D-72, ADR 0015)

Prepare privately (facts, trusted sources, final acceptance criteria, optional stages), volunteer review (opt-in, masked, never public), the AI publication decision (`DP-PUBLISH`), then a per-problem stage plan (a DAG) where each stage runs options, a choice, steps, evidence and `DP-STAGE-RESOLUTION`. Problem states: `draft`, `in_review`, `needs_revision`, `held`, `rejected`, `active`, `paused`, `stuck`, `redirected`, `closed`, `withdrawn`, `solved` (T00 to T22, with an old to new map in `01a-lifecycle.md` section 4.3). Stage states: `planned`, `ready`, `active`, `resolving`, `resolved`, `blocked`, `skipped` (ST01 to ST11). Old states `eligible`, `solution_development`, `solution_selection`, `implementation`, `verification` are gone as problem states; they survive only as the stages of the optional `classic-5` template. Rules: `CRITERIA-1`, `REVIEW-1`, `RECO-1`, `SOURCE-1`, `STAGE-GATE-1`, `STAGE-PREP-1`, `STAGE-RESOLVE-1`, `PLAN-CHANGE-1`. Open questions: `OQ-review-quorum`, `OQ-stage-decision-method`, `OQ-trusted-sources`, `OQ-reviewer-eligibility`.

## Impacted and guest (D-73 to D-75)

Each contribution is labelled `impacted` or `guest` by a private location attestation (`IMPACT-1`, `GUEST-LABEL-1`, `LOC-PRIV-1`, `LOC-DOUBT-1`, in `constitution/rules-legal-sim.md`). Constitution IV.2 and II.2. No location is ever stored or logged; doubt downgrades to guest. Web label "Reported impacted" until `zk_cell_v1` passes its spike. Open questions: `OQ-impacted-label-web`, `OQ-h3-resolution`, `OQ-boundary-data`, `OQ-impact-decision-weight`, `OQ-zk-setup`.

## Simulation, seeds and structured content (D-55 to D-58)

- **Persona simulation is the slice-1 proof.** AI personas drive lifecycles through the real pipeline on seeds 1 and 2 and red-team the pack. Graduation criteria G1 to G13 (`docs/design/ai/simulation.md` section 8; link, never restate) gate public participation (`SIM-GATE-1`). CI uses `FakeModel`; live persona runs are founder-gated.
- **Seeds:** four real framings with synthetic evidence, labelled "Seed problem, synthetic evidence"; Amsterdam (NL) is the first jurisdiction overlay. Seeds 1 and 2 first; 3 and 4 wait for the problem graph (`07`). D-12's fictional-jurisdiction wording is superseded for seeds.
- **Hosting undecided, services portable (D-57):** `11-architecture.md` (Portable hosting). GCP was a lean, not a decision.
- **Structured content (D-58):** no free-form posting; schemas live in the policy pack; `05`, `17`, `docs/design/ai/structured-content.md`.

## Editing rules

- `01a-lifecycle.md` alone owns the problem state classes, the T-table (T00 to T22), the old to new T-id map and the problem public labels. `01b-stages.md` alone owns the stage plan, stage states, the ST-table and stage chips. `01-slice-1-brief.md` owns the scope and defaults, the preparation and review flow, the contribution-type enum, the moderation decision fields and the minimal entity list. Other files link there. Never copy the table elsewhere.
- Do not rename the `## 4. Lifecycle` heading in `01`; it points to `01a` and `01b` and holds the preparation and review flow. Design docs link to `01-slice-1-brief.md#4-lifecycle`.
- Every file in `docs/spec/` (excluding `constitution/`) stays at 25KB or less. Split before you exceed it.
- No em dashes or en dashes in the manifesto, the spec or the open-questions files. No `<aside>`, emoji or empty `> ` lines. Say "problem", never "case", for a public problem. Say "Resolution records", never "Hall of fame". Ladder roles are "Watcher" and "Project steward"; platform roles are "Observer" and "Steward".
- Cross-reference by file and section name instead of repeating content. Cite the constitution by new ID (for example `Constitution V.4`) or rule ID (`MOD-EXPLAIN-1`).
- `split-map.tsv` maps ORIGINAL `build_spec.md` line numbers to the split files, and only resolves against commit `7f61360`. After edits, line numbers in the spec no longer match it. `build_spec.md` was removed from the tree and stays in history (`git show 7f61360:build_spec.md`).
- OQ file format is enforced: `# OQ-<slug>: title`, a line `**ID:** OQ-<slug>`, a line `**Status:** open|proposed|decided|withdrawn`, and the sections Question, Why it matters, Current default (what we built meanwhile), Who can help, What a good answer looks like, Spec links. Every OQ states its current default. Resolution flow: proposal, discussion, founder or governance decision, logged in `DECISIONS.md`.
- `DECISIONS.md` is written only by the orchestrator. Agents and unattended runs never write to it. Log unanswered questions as OQ files, apply a reversible default, or skip.
- Founder-operated agents commit only to `night/*` branches; the founder merges (`02-agent-rules.md`). The external AI-contribution policy (`22`) is separate and unchanged.
- The manifesto keeps its voice: a developer should think "Yes, finally, we can solve problems." Keep the stage line, the non-goals, the emergency exclusion and the AI sentence "People make every rule. AI applies it, explains it and answers to appeal." The "idea at the heart of it" section carries the core innovation.

## Commands (from the superproject root)

- `node docs/spec/tools/check-spec.mjs`: sizes, no `<aside>`, no empty quote lines, no dashes, manifesto rules, OQ format.
- `node docs/spec/tools/split-check.mjs . 7f61360`: proves the verbatim split against the split commit. The ref argument is required now that `build_spec.md` is gone.
- `node docs/spec/constitution/tools/check.mjs`: constitution map, sizes and rule ID parity (reads `rules.md` and `rules-legal-sim.md`).
- `git -C . show 7f61360:docs/spec/22-ai-contribution-policy.md`: the pre-edit AI tool and reference lists, which belong in `CONTRIBUTING.md`.
