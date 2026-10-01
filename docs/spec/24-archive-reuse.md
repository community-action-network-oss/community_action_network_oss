# Archive and reuse

Second main goal of CAN (D-76): open, reusable infrastructure for solving common problems. Every problem that ends goes into the **Archive**, and new problems start from what worked, or failed, elsewhere. The Archive supersedes the "Resolution records" naming of D-20. This file is the single owner of the archive record, the context profile, path suggestions and the reuse decision points. Lifecycle triggers are in `01a-lifecycle.md`. Principles: Constitution IV.7. Vocabulary follows `.claude/skills/can-code-large/briefs/archive-v1.md`.

## 24.1 The archive record

An `archive_record` is the full journey of an ended problem with personal data stripped. It is public, never ranked, scored or rewarded, and listed chronologically and by jurisdiction.

| Part | Holds |
|---|---|
| Snapshot | the problem as it stood at the end: facts, sources, final acceptance criteria |
| `context_profile` | problem type and category, affected population scale, geography and climate class, resource and budget band, institutions involved (roles, never names), legal stack layers in force, language, constraints |
| `executed_path` | the stage DAG as run, each stage's outcome, duration band and cost band |
| Options and choices | options considered, choices made, the decision method and the reasons |
| Evidence | evidence references (URLs) mapped to criteria |
| `challenge` list | each thing that failed, was blocked or was rejected: what was tried, why it failed or what blocked it, and how it was resolved, if it was |
| Costs and resources | what the path took, in bands |
| Outcome | the final criteria result and the terminal state |
| Versions | policy, schema and legal corpus versions in force |
| License and attribution | the content license (`OQ-contribution-license`) and the credit line |

**What is archived.** Every problem that reaches `solved`, `closed`, `redirected` or `withdrawn` after publication, and a `stuck` problem (its record is flagged as unresolved and is updated if it reopens). Failed paths and blocked stages are kept on purpose: a path that failed is as useful as one that worked. `rejected`, `needs_revision`, `held` and pre-publication `withdrawn` problems are private and never archived.

**Building it (`DP-ARCHIVE`).** When a problem enters a terminal or `stuck` state (`01a-lifecycle.md`: T13, T15 to T18), `DP-ARCHIVE` builds the record: the privacy gateway runs again to strip personal data, the record is checked for completeness (path, choices, evidence, outcome), and challenges are captured from `blocked` stages, declined or failed attempts and appeals. A hold keeps the problem's own state unchanged and retries (`ARCHIVE-1`). A reopened problem (T20, T21) keeps its old record and gets a new one when it ends again.

**Retention.** The archive is a permanent public record. Withdrawal and account deletion tombstone the author's own text (`OWN-1`, Constitution II.8) and keep the path structure (`OQ-archive-retention`).

## 24.2 Suggestions while preparing

While a poster fills in a problem, the AI keeps retrieving archived problems that resemble it by `context_profile` (structured matching on the same dimensions, plus full-text and embedding retrieval; `OQ-cross-language-reuse`). Retrieval runs through the privacy gateway and the model register (D-65), on the poster's draft only, never on other drafts.

A `path_suggestion` is a candidate path from one or more archive records, adapted to the new problem. It carries source references, similarity explained per context dimension, the differences and the adaptations needed, legality and resource-fit results, a draft stage plan and a confidence.

- **`DP-REUSE-FIT`** checks each suggestion against the new problem: legality under the new problem's legal stack (L0 to L6, `LEGAL-STACK-1`), resource and budget fit, and context differences flagged. A suggestion that fails legality is shown as unusable here with the reason, never hidden. It never adopts a suggestion (`REUSE-CONTEXT-1`).
- **Never automatic.** The poster chooses "use as starting point". Nothing enters the problem unless the poster accepts it, and accepted material is still edited and confirmed like AI-filled fields (`AI-ASSIST-1`).
- **Credit always.** The `attribution` to the source archive records is shown with every suggestion and carried into any stage plan derived from it (`REUSE-CREDIT-1`).
- **High-stakes domains** (medicine, agriculture, law, finance, mental health, engineering) show uncertainty plainly and need stronger expert review (Constitution IV.7).

## 24.3 After publication: the drafted stage plan

When a poster publishes with accepted suggestions and no custom plan, `DP-STAGE-DRAFT` drafts the stage plan from them (`01b-stages.md`). The poster edits the draft and submits it as a plan change (T22, `DP-STAGE-PLAN`, `PLAN-CHANGE-1`), then starts work straight away. The drafted plan carries attribution.

## 24.4 Speed without skipping review

Strong archive evidence can speed up volunteer review: reviewers see the similar archived paths and the fit results. It never replaces review. At least one completed volunteer review is still required, and the community is invited to take part but is not a blocker (`REUSE-NOBLOCK-1`, `REVIEW-1`).

## 24.5 Slice 1

Default: yes, archive and suggestions are in slice 1. Seeds 1 and 2 produce the first archive records through the persona simulation (`docs/design/ai/simulation.md`), labelled "Seed problem, synthetic evidence" (`SIM-LABEL-1`). Suggestions in slice 1 use the simulation archive. Records from real problems start only after public participation opens (`SIM-GATE-1`).

## 24.6 License

Contributed content is offered under CC BY 4.0 by default, so anyone may reuse it with credit to the source problem (`OQ-contribution-license`). Attribution is what makes reuse traceable: a community that adopts a path can always follow it back to where it was proven. Code stays MIT (D-49).
