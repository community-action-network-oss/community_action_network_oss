# Flow: appeal-to-example loop

## Purpose
A person who disagrees with an AI decision gets an independent re-run, then a community label if still disputed. The label becomes a policy change, and the instance is re-decided by AI under the new version. Humans do not override single instances (D-51).

## Trigger
`POST /v1/moderation/decisions/{id}/appeals` before `appealable_until`.

## Status
planned. Filing and statuses: 03-u12, 03-u13 (written for human reviewers, to be reworked); loop plan 09 (pending).

## Sequence
```mermaid
sequenceDiagram
  participant User
  participant API
  participant Mod as moderation runtime
  participant GW as privacy gateway
  participant Lab as label task pool
  participant PolicyRepo
  participant DB
  User->>API: appeal with grounds
  API->>DB: appeal row, one per decision
  API->>Mod: independent re-run (different model or prompt variant)
  Mod->>GW: same inputs, variant route
  GW-->>Mod: outputs
  alt variant disagrees with original
    Mod->>DB: overturn effect per brief section 5, notify
  else still disputed
    Mod->>Lab: label_task (randomized, context-masked, cross-jurisdiction)
    Lab-->>DB: labels with disagreement tracking
    Lab->>PolicyRepo: example or rule change PR
    PolicyRepo-->>Mod: new version ratified (see policy-amendment)
    Mod->>DB: instance re-decided under new version, appeal closed
  end
  Mod->>User: outcome, rule, policy version, explanation
```

Screens: WF-APPEAL-1, WF-APPEAL-2 (appellant timeline), WF-LABEL-1 (labeler).

## Failure paths
- Window closed: `appeal_window_closed`, no row.
- Independent run cannot complete: appeal stays open, retried; never auto-upheld.
- Labelers (a human role, masked and randomized) split: recorded as disagreement; goes to the amendment loop as an ambiguous-rule signal, instance stays decided as is with an explanation.
- Appeal on an emergency or legal item: routed to [emergency-legal-lane.md](emergency-legal-lane.md).

## Data written
`appeal`, `moderation_run` (variant), `label_task`, label rows, `moderation_decision` (re-decision), `audit_event`.

## Events emitted
`appeal.filed`, `appeal.rerun.completed`, `label_task.created`, `appeal.resolved`, then the effect events of the brief's overturn table (planned).

## DPs invoked
The DP whose decision is appealed, on the variant route. See [../ai/appeals.md](../ai/appeals.md).

## Related
[policy-amendment.md](policy-amendment.md), spec brief section 5, constitution rule `APPEAL-1` (now satisfied by an independent model or prompt, not a different moderator).
