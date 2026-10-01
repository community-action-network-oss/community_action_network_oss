# Flow: task and verification

> **D-72 (W10):** tasks belong to a stage. "Verification" of a stage is DP-STAGE-RESOLUTION on its evidence against that stage's criteria; the problem-level "solved" is DP-VERIFICATION against the final criteria, run once every required stage is resolved ([stage-advancement.md](stage-advancement.md)). T12 to T14 below read as the stage-level loop; a failed check returns the stage to `active` with hints, not the problem to a fixed `implementation` state.

## Purpose
Track implementation tasks, collect verification evidence from someone other than the implementer, and decide "solved" against the chosen proposal's success metric.

## Trigger
`PATCH /v1/tasks/{id}`, verification contribution, T12, T13, T14.

## Status
planned: 05-u01 (tasks, T11 and T12), 05-u02 (verification, T13, T14, resolution records), 05-u05 (screens). Solved-evidence DP: plan 09 (pending).

## Sequence
```mermaid
sequenceDiagram
  participant Assignee
  participant Verifier
  participant API
  participant UC as tasks UC
  participant Eng as transition engine
  participant Mod as moderation runtime
  participant DB
  Assignee->>API: PATCH task status, verification note
  API->>UC: authz assignee or initiator, update moderated (content-update)
  Assignee->>API: T12 implementation to verification
  Verifier->>API: verification_evidence contribution (URL)
  API->>UC: verifier must differ from implementer
  Verifier->>API: T14 propose solved
  API->>Eng: T14 request
  Eng->>Mod: gate DP-VERIFICATION (evidence vs success metric)
  alt evidence sufficient
    Mod-->>Eng: publish
    Eng->>DB: tx: state=solved, resolution record, event; email followers
  else insufficient
    Mod-->>Eng: needs_revision with hint (what evidence is missing)
  else check failed
    Eng->>DB: T13 back to implementation with failed-check note
  end
```

## Failure paths
- Same person verifies own work: `not_permitted`.
- Evidence URL unreachable or not https: sync check rejects.
- Model failure: `hold`, the problem stays in `verification`.
- Solved flagged later by sampling: re-review notice, appeal ([post-publication-recheck.md](post-publication-recheck.md)).

## Data written
`task`, `contribution` (verification_evidence), resolution record, `moderation_run`, `audit_event`.

## Events emitted
`task.updated`, `problem.verification`, `problem.solved` (resolution record created), `problem.implementation` (T13) (planned).

## DPs invoked
DP-VERIFICATION, DP-PRIVACY, DP-NAMING on task text; DP-COMPLETENESS and DP-ASSUMPTIONS on task and verification-evidence fields (schema-structured, D-58). See [../ai/decision-points.md](../ai/decision-points.md).

## Related
[lifecycle-transition.md](lifecycle-transition.md), [ux/journeys.md](../ux/journeys.md) J2 steps 6 and 7.
