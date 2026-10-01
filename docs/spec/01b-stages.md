# Stage plan, stage states and gating

This file is the **single owner** of the stage level of the lifecycle (lifecycle v2, D-72, ADR 0015): the stage plan as a DAG, the stage states, the stage transition table (ST01 to ST11), stage gating, the stage work flow, contributions ahead to planned stages and the `classic-5` template. `01a-lifecycle.md` owns the problem states and the T-table. Link here; never copy the tables elsewhere.

## 4b.1 The stage plan

A problem has a **stage plan**: a directed acyclic graph (DAG) of stage nodes joined by `depends_on` edges. Stages can run in series, in parallel or mixed. The plan is prepared by the poster (the plan editor is `WF-PREP-3`), checked by volunteers (they may recommend changes to stages and stage criteria) and by `DP-STAGE-PLAN`, and published with the problem (T04). It has a `plan_version` that changes only through T22 `PLAN-CHANGE` (`PLAN-CHANGE-1`).

A stage node has:

| Field | Meaning |
|---|---|
| `name`, `goal` | Plain words for the stage chip and the stage page. |
| `acceptance_criteria[]` | One or more measurable statements of when the stage is done. Each is an `acceptance_criterion` owned by the stage (`CRITERIA-1`, `DP-CRITERIA`). |
| `decision_method` | How the stage's choice is made: `poster_after_input` (default: the poster chooses after community input), `community_vote`, `steward`, `other_named` (`OQ-stage-decision-method`). |
| `depends_on[]` | Names of stages that must be resolved first. Empty means the stage has no predecessor and is `ready` at publication. |
| `required` | Default true. A non-required stage does not have to resolve before `solved`. |
| `needs_choice` | Default true. False for stages that go straight to steps. |
| `auto_start` | Default true. When false, a `ready` stage waits for the steward to start it. |

Plan rules (`DP-STAGE-PLAN`): the graph has no cycle; every stage has at least one criterion; every required stage leads to the final criteria; a stage with no successor must serve a final criterion or be non-required. The problem also holds the **final acceptance criteria** (what "solved" means), which are separate from stage criteria (`CRITERIA-1`).

### The `classic-5` template

The old fixed sequence survives as an optional default template, offered at T00 and editable like any plan. Stages run in series. Criteria below are starting wording the poster edits.

| Stage | `depends_on` | `needs_choice` | Starting criteria |
|---|---|---|---|
| `facts` (Gathering facts) | none | false | What is established and what is disputed is summarized, with 1+ evidence URL or a documented missing-evidence note |
| `solutions` (Developing solutions) | `facts` | true | 2+ options, each with mechanism, success metric, risks and verification plan, or 1 option plus a documented "no alternatives" note |
| `choose` (Choosing a solution) | `solutions` | true | A decision record: chosen option, method, rationale, decider, authority, dissent notes (optional) and a legal-gate record |
| `implement` (Doing the work) | `choose` | false | Every required task done or dropped with a reason |
| `verify` (Checking the result) | `implement` | false | Verification evidence matches the chosen option's success metric |

A poster may instead choose a one-stage plan (one stage `resolve` whose criteria equal the final criteria) or build a custom DAG.

## 4b.2 Stage states

| State | Meaning | Chip |
|---|---|---|
| `planned` | Not reachable yet because a predecessor is unresolved. People can still contribute ahead of time (`STAGE-PREP-1`). | Planned |
| `ready` | All predecessors are `resolved` (or `skipped`). Waiting to start. | Ready |
| `active` | Options are gathered, a choice is made, steps are done, evidence is posted. | In progress |
| `resolving` | Evidence is submitted and `DP-STAGE-RESOLUTION` is judging it against the stage's criteria. | Checking evidence |
| `resolved` | The criteria are met. Successor stages are re-evaluated. | Done |
| `blocked` | A constraint or blocker is cited (`DP-BLOCKER`). | Blocked |
| `skipped` | No longer needed, through an accepted plan change, with a reason. | Skipped |

Chips are exact text. They never use red; colour is never the only signal. The problem chip is "Active: stage {name}", or "Active: {n} stages in progress" when several are active (`01a-lifecycle.md`).

## 4b.3 Stage transition table

Same columns as the problem table. "Steward" is the poster after publication. Every transition writes a `stage_event` in the same transaction and fails atomically.

| id | from | to | actor | required fields | side effects | public label | plain explanation | next action |
|---|---|---|---|---|---|---|---|---|
| ST01 | (none) | planned | system, at preparation (private) or when T22 adds a stage | stage node with name, goal, 1+ criterion, `decision_method`, `depends_on[]` | stage row created; public only after T04 | Planned | "This stage is part of the plan and will start after the stages before it." | Contribute ahead of time. |
| ST02 | planned | ready | system (the gating engine) | every predecessor `resolved` or `skipped` (`STAGE-GATE-1`); root stages at T04 | event; successors recomputed in the same transaction; a successor becomes ready exactly once | Ready | "The stages before this one are done. This one can start." | Start it, or wait if it starts by itself. |
| ST03 | ready | active | steward, or system when `auto_start` is true | stage has criteria and a `decision_method`; the problem is `active` (not paused or stuck) | event; stage workspace opens (`WF-STAGE-1`); contributions kept ahead are shown | In progress | "Work on this stage has started." | Add options, then choose, do the steps and post evidence. |
| ST04 | active | resolving | steward | the choice recorded when `needs_choice` (`CHOICE-GATE`); all required tasks done or dropped with a reason; 1+ `stage_evidence` mapped to the stage's criteria | event; evidence frozen for this judgement; `DP-STAGE-RESOLUTION` queued | Checking evidence | "The evidence is being checked against the stage's criteria." | Wait for the result. |
| ST05 | resolving | resolved | moderation run (`DP-STAGE-RESOLUTION`, `DP-EVIDENCE-TIER`, `DP-SOURCE-TRUST` on cited sources) | decision with rule_ids, per-criterion result, policy version | event; policy version shown; successors re-evaluated (ST02); when every required stage is `resolved` or `skipped`, the final check is queued (T15); appealable (`STAGE-RESOLVE-1`) | Done | "The evidence meets this stage's criteria, using the evidence shown." Decided under policy vX. | Read the result; the next stages open. |
| ST06 | resolving | active | moderation run (`DP-STAGE-RESOLUTION` outcome `needs_revision`) | per-criterion result naming the unmet criteria with revision hints | event; hints shown beside the criteria; evidence can be added again; appealable | In progress | "The evidence does not yet meet: [criteria]. Each note says what is missing." | Add the missing evidence and resubmit (ST04). |
| ST07 | ready, active or resolving | blocked | steward or moderation run (`DP-BLOCKER`, `DP-LEGALITY`) | the blocking constraint, its source and version, blocked actions, recheck condition, next lawful route, 1+ documented attempt (`BLOCKER-1`) | event; blocker shown on the stage; only this stage and the stages after it stop; parallel branches go on; when no required stage can proceed, T13 (problem `stuck`) applies | Blocked | "Documented work hit a blocker. The blocker and the next route are shown." | Follow the route or add information. |
| ST08 | blocked | prior state (ready or active) | steward or moderation run (`DP-BLOCKER`, `DP-LEGALITY`) | blocker-cleared note with evidence | event; if the problem was `stuck`, T14 applies first | (previous chip) | "The blocker was cleared." | Continue the stage. |
| ST09 | planned, ready, active or blocked | skipped | moderation run through an accepted plan change (T22, `DP-STAGE-PLAN`); or the system when T16, T17 or T18 ends the problem | reason; for T22 the proposal | event; counts as `resolved` for gating (its successors are re-evaluated); contributions kept ahead stay on record | Skipped | "This stage is no longer needed: [reason]." | Follow the updated stage map. |
| ST10 | resolved | active | re-resolution (T20 or T21), an accepted plan change (T22), or an overturned appeal of a stage decision | the changed rule or reason, the criteria affected | event; notice on the page; unstarted successors (`ready`) go back to `planned`; started successors keep running unless the problem is reopened by T20 or T21; history and the old result stay on record | Reopened | "This stage was reopened: [reason]. The earlier result is kept." | Add evidence under the new rule. |
| ST11 | skipped | planned | moderation run through an accepted plan change (T22) | reason; the proposal | event; the gating engine recomputes | Planned | "This stage is back in the plan." | Contribute ahead of time. |

## 4b.4 Gating

- **`STAGE-GATE-1`:** a stage becomes `active` only when all of its predecessors are `resolved` or `skipped`. A person who tries to start a `planned` stage gets `not_ready`.
- The gating engine runs in the same transaction as the change that triggers it. Concurrent resolutions of two predecessors lock the successor row, so it becomes `ready` exactly once.
- A `skipped` stage counts as resolved for gating, only through an accepted plan change.
- A `blocked` stage stops its own branch and the stages after it. Parallel branches continue.
- While the problem is `paused` or `stuck`, no stage starts or resolves; stage states are kept. A closed, redirected or withdrawn problem skips its unresolved stages.
- `solved` is never a stage state. When every required stage is `resolved` or `skipped`, the final check `DP-VERIFICATION` judges the final acceptance criteria (T15). A "not met" result changes no state; new work needs a plan change (T22).

## 4b.5 Work inside a stage

1. **Options.** People contribute `stage_option` items (structured, with mechanism, success metric, risks). Contribution types are the enum in `01-slice-1-brief.md` section 6, targeted at the stage.
2. **Choice.** The stage's `decision_method` picks an option or a set of steps: by default the poster after community input. The `stage_choice` records the chosen option or steps, method, rationale, decider, authority and dissent notes (optional).
3. **Choice gate (`CHOICE-GATE`).** Recording a `stage_choice` runs `DP-DECISION-RECORD` and `DP-LEGALITY` (`DECISION-REC-1`, `LEGAL-GATE-1`). It holds if a required part is missing and it never decides which option is best. Tasks cannot start until the gate passes. A choice can be withdrawn while the stage is `active` (new information); options then reopen with no state change.
4. **Steps and tasks.** The chosen steps become tasks belonging to the stage; each has a required flag and an optional owner.
5. **Evidence.** People and the steward post `stage_evidence`: URL references only, each mapped to the criteria it supports. `DP-SOURCE-TRUST` checks the cited sources. A completed task alone is not evidence (`VERIFY-1`).
6. **Resolution.** ST04 then `DP-STAGE-RESOLUTION` (`STAGE-RESOLVE-1`). The decision is an AI decision on evidence against the criteria, with the policy version and rule ids shown. It is appealable by the poster or the contributor who submitted the evidence (brief section 5). An appeal on a resolved stage does not pause live successor stages. Only an overturn triggers the re-resolution notice path (ST10, which returns unstarted successors to `planned`).

## 4b.6 Contributions ahead of time (`STAGE-PREP-1`)

Contributions to a `planned` or `ready` stage are allowed and kept ready. They are checked on submit like any contribution (deterministic checks, then `DP-CONTRIB-RELEVANCE` before they are shown), carry a "for a later stage" label, and open in the stage workspace when the stage starts (ST03). A contribution made ahead is never `stage_evidence` and cannot resolve a stage until the steward attaches it in an `active` stage.

Allowed contribution types per stage state (the enum itself is `01-slice-1-brief.md` section 6). Every contribution has exactly one type and targets a stage or the problem.

| Stage state | Allowed types |
|---|---|
| `planned`, `ready` | `clarifying_question`, `observation`, `evidence`, `constraint`, `risk`, `stakeholder_perspective`, `proposed_solution`, `proposal_improvement`, `implementation_offer` (never `progress_update` or `verification_evidence`) |
| `active` | all types |
| `resolving` | `clarifying_question`, `risk` (the evidence under judgement is frozen) |
| `blocked` | `clarifying_question`, `progress_update`, `evidence`, `constraint` |
| `resolved`, `skipped` | none |

Problem-level contributions that target no stage follow the problem state: all types in `active`, only `clarifying_question` and `progress_update` while `paused` or `stuck`, nothing after a terminal state. A disallowed pair is refused with no row written (`STAGE-1`).

## 4b.7 Appeals and re-resolution on stages

- An appealed stage decision follows `APPEAL-1` (brief section 5). The effect of an overturn is in the brief's table.
- A rule or policy change re-runs `DP-STAGE-RESOLUTION` asynchronously on resolved stages whose evidence rule changed. A flipped result reopens through ST10 with a visible notice and the full history (`RERESOLVE-1`), never silently.
