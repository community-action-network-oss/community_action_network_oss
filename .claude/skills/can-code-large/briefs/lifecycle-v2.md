# Lifecycle v2 canonical vocabulary (D-72, binding for wave W10)

Every W10 agent uses these exact names. When a new name is unavoidable, the agent reports it instead of inventing one silently.

## Problem states (problem level)

| State | Public? | Meaning |
|---|---|---|
| `draft` | private | The poster is preparing the structured problem. |
| `in_review` | not public; visible to opted-in volunteers with personal data masked | Volunteers recommend changes. The poster accepts or declines each recommendation, with a reason. |
| `needs_revision` | private | The publication run asks for changes, with hints shown beside the fields. |
| `held` | private | Fail-closed hold: a moderation run could not complete. |
| `rejected` | private | Appealable. |
| `active` | public | Published. The stage plan is running. |
| `paused` | public | Paused, with a reason and a resume condition. |
| `stuck` | public | Legally or materially blocked, with the constraint cited. |
| `redirected` | public | Sent to a better institution or route. |
| `closed` | public | Ended, with a reason. |
| `withdrawn` | depends on timing | Withdrawn by the initiator (rules OWN-1 and II.8). |
| `solved` | public | The final acceptance criteria are met, judged by DP-VERIFICATION. |

Reopening after a rule change keeps T23 and T24 semantics (D-59): a reopen returns the problem to `active` and reactivates the affected stages.

## Stage states (one stage node in the problem's stage plan)

| State | Meaning |
|---|---|
| `planned` | Not reachable yet, because a predecessor is unresolved. People can still contribute to it ahead of time. |
| `ready` | All predecessors are resolved; the stage is waiting to start. |
| `active` | Options are being gathered, a choice is made, steps are done, evidence is posted. |
| `resolving` | The evidence is submitted and DP-STAGE-RESOLUTION is judging it against the acceptance criteria. |
| `resolved` | The acceptance criteria are met. Successor stages become `ready`. |
| `blocked` | A constraint or blocker is cited (DP-BLOCKER). |
| `skipped` | No longer needed, through an accepted stage-plan change, with a reason. |

The stage plan is a DAG of stage nodes connected by `depends_on` edges, so it can be serial, parallel or mixed. The problem reaches `solved` only when every required stage is resolved and DP-VERIFICATION confirms the final acceptance criteria. The old fixed sequence (gathering facts, developing solutions, choosing a solution, in progress, checking the result) survives as the optional default stage template `classic-5`.

## Entities

- **New:** `stage`, `stage_edge`, `acceptance_criterion` (owned by a problem for final criteria, or by a stage), `stage_option` (an option contributed to a stage), `stage_choice` (the chosen option or steps, with the decision method and its authority), `stage_evidence`, `review_recommendation` (a volunteer recommendation on a field or metadata path, with its status: open / accepted / declined, and a reason), `source_ref` (a trusted URI with its source category and authenticity check).
- **Reused:** problem, contribution (still typed, and can target a stage), decision_record (now records `stage_choice`), task (belongs to a stage), moderation_run, appeal, label_task, notice.

## Decision points

These DP ids are new or changed:
- `DP-SOURCE-TRUST`: are the cited URIs trusted, and do they establish authenticity?
- `DP-CRITERIA`: are the acceptance criteria measurable, lawful and fitting the problem?
- `DP-STAGE-PLAN`: is the plan a well-formed DAG, are the stages coherent, does every stage have criteria? It runs on submit and on every plan-change proposal.
- `DP-PUBLISH`: the publication decision. It aggregates the other DPs plus any review recommendations still open.
- `DP-STAGE-RESOLUTION`: has a stage's evidence met its acceptance criteria? This replaces the old stage-transition meaning of DP-STAGE.
- `DP-VERIFICATION`: final solved, judged against the final acceptance criteria.

Every other existing DP id is kept.

## Rule ids (new)

| Rule | Requirement |
|---|---|
| `CRITERIA-1` | A problem cannot leave `draft` without final acceptance criteria. |
| `REVIEW-1` | Volunteer review is required before publication; review content is never public; personal data is masked. |
| `RECO-1` | Every recommendation gets an accept or decline from the poster, with a reason. |
| `STAGE-GATE-1` | No stage becomes `active` until all of its predecessors are `resolved`. |
| `STAGE-PREP-1` | Contributions to `planned` stages are allowed and kept ready. |
| `STAGE-RESOLVE-1` | A stage resolves only through DP-STAGE-RESOLUTION, with evidence. This is appealable. |
| `PLAN-CHANGE-1` | A stage-plan change after publication needs a proposal and DP-STAGE-PLAN. It is never silent. |

## Wireframe ids (new)

| Id | Screen |
|---|---|
| `WF-PREP-1` | Preparation workspace |
| `WF-PREP-2` | Acceptance criteria editor |
| `WF-PREP-3` | Stage plan editor (DAG) |
| `WF-VREVIEW-1` | Volunteer review queue (opt-in) |
| `WF-VREVIEW-2` | Review a problem and make recommendations |
| `WF-VREVIEW-3` | Poster resolves recommendations |
| `WF-STAGEMAP-1` | Stage map on the problem page |
| `WF-STAGE-1` | Stage workspace: options, choice, steps, evidence |
| `WF-STAGE-2` | Stage resolution result |
| `WF-STAGE-3` | Contributing ahead to a planned stage |

## Public labels

| Item | Label |
|---|---|
| draft | "Draft" |
| in_review | "In volunteer review" |
| active | "Active: stage {name}". When several stages are active: "Active: {n} stages in progress" |
| solved | "Solved" |
| Stage chips | "Planned", "Ready", "In progress", "Checking evidence", "Done", "Blocked", "Skipped" |

The existing labels for paused, stuck, redirected, closed, withdrawn and the reopen labels are kept.
