# Flow: stage work

## Purpose
Inside one `active` stage: people contribute options, the stage's decision method picks a choice, steps and tasks are done, evidence is posted, and DP-STAGE-RESOLUTION judges it against the stage's acceptance criteria.

## Trigger
Stage becomes `active` ([stage-advancement.md](stage-advancement.md)); then WF-STAGE-1.

## Status
planned, W10. Replaces the fixed gathering, developing, choosing, in progress and checking steps with one repeatable loop.

## Sequence
```mermaid
sequenceDiagram
  participant Contrib as Contributors
  participant Poster
  participant API
  participant St as stages module
  participant Mod as moderation runtime
  participant DB
  Contrib->>API: POST /v1/stages/{id}/options
  St->>Mod: moderated like any contribution
  Poster->>API: POST /v1/stages/{id}/choice {optionId or steps, method, rationale}
  St->>Mod: DP-LEGALITY, DP-DECISION-RECORD
  St->>DB: stage_choice with decision method and authority; tasks created
  Contrib->>API: tasks done, POST /v1/stages/{id}/evidence
  Contrib->>API: POST /v1/stages/{id}/resolve (request)
  St->>DB: state=resolving
  St->>Mod: DP-STAGE-RESOLUTION(evidence, criteria)
  alt criteria met
    Mod-->>St: resolved, stage_evidence linked
  else not met
    Mod-->>St: back to active with hints
  end
```

Rules:
- Decision method is stage metadata (`poster`, `community_vote_advisory`, `named_authority`); default is the poster choosing after community input. The method and authority are recorded in `stage_choice` and shown.
- Evidence and verifier differ from the implementer for task work, as in [task-and-verification.md](task-and-verification.md).
- STAGE-RESOLVE-1: a stage resolves only through DP-STAGE-RESOLUTION with evidence. No person marks it done.
- Appeal: the poster or any follower can appeal a not-met or met decision ([appeal.md](appeal.md)); an independent re-run, then a label task if disputed. An appealed `resolved` stage that is overturned goes back to `active` and its successors that have not started return to `planned`.
- Constraints found during work: DP-BLOCKER sets `blocked` with the constraint cited, or the problem goes `stuck` per the lifecycle spec.

## Failure paths
- Model failure: `hold`, stage stays `resolving`, retried.
- Illegal choice: DP-LEGALITY gives `needs_revision` with hint; choice not stored as chosen.
- Stage skipped while work is open: only via [plan-change.md](plan-change.md).

## Data written
`stage_option`, `stage_choice`, `stage_evidence`, `task`, `contribution`, `decision_record`, `moderation_run`.

## Events emitted
`stage.option_added`, `stage.choice_recorded`, `stage.evidence_added`, `stage.resolving`, `stage.resolved` (planned).

## DPs invoked
DP-STAGE-RESOLUTION, DP-LEGALITY, DP-DECISION-RECORD, DP-CONTRIB-RELEVANCE, DP-TONE, DP-PRIVACY, DP-BLOCKER.

## Related
[stage-advancement.md](stage-advancement.md), [contribution-and-proposal.md](contribution-and-proposal.md).
