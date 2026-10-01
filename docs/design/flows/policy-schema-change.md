# Flow: policy schema change

## Purpose
Change what a content type asks for (add a field, tighten a required one) without rewriting history. Schemas are versioned inside the policy pack (D-58), so a change is a policy amendment with extra steps.

## Trigger
A PR to `can_policy` that edits a content schema, usually after an audit finding or an appeal label showing the form misses something.

## Status
plan 10 (pending). Detail: [../ai/structured-content.md](../ai/structured-content.md).

## Sequence
```mermaid
sequenceDiagram
  participant Author
  participant CI as can_policy CI
  participant Panel as ratifying panel
  participant Reg as schema registry
  participant App
  participant DB
  Author->>CI: PR: schema vN to vN+1 (+ DP-COMPLETENESS prompt and examples)
  CI->>CI: schema lint, form snapshots, dry-run on published content, eval, replay diff
  CI->>Panel: normal ratification (policy-amendment)
  Panel-->>Reg: tagged pack with schema vN+1
  Reg->>Reg: shadow, canary, then new drafts pin vN+1
  Reg->>DB: minor: drafts auto-migrate; major: drafts keep pinned vN for the grace window
  App->>App: migration view: carried-over answers, new fields marked
  Note over DB: published content keeps its schema version, forever
```

## Rules
- Semver: patch for wording or examples, minor for added optional fields or changed bounds, major for added or removed required fields. Rules: [../ai/structured-content.md](../ai/structured-content.md) section 8.
- Minor bump: in-flight drafts auto-migrate (new optional fields empty, new bounds apply at next submit).
- Major bump: drafts stay on the old version for a pack-set grace window (default 30 days); the app offers a migration screen where the poster confirms each field mapping and unmapped required fields are asked fresh. After the window the draft must migrate before submit.
- Published content keeps its schema version and is never rewritten. An owner edit opens the current version and runs DP-ASSUMPTIONS and DP-COMPLETENESS on the diff ([content-update.md](content-update.md)). Items that predate a newly required field get a non-blocking "predates field Y" marker, never a takedown.
- Extra CI gates: rendered-form snapshots (a form that cannot be completed cannot ship) and a dry-run re-validation of published content to count what would be incomplete.
- Rollback is the previous schema version, one config change away.

## Failure paths
- Major bump without a field-mapping map: CI fails.
- Canary shows a spike in `needs_revision`: halted like any rollout; new drafts stay on vN.
- Registry hash mismatch: pack refused, previous version kept.

## Data written
`content_schema_version` rows (type, version, pack version, hash), draft rows with pinned `schema_version`, `audit_event`.

## Events emitted
`policy.version.ratified`, `schema.version.activated`, `draft.schema_migrated` (planned).

## DPs invoked
DP-COMPLETENESS and DP-ASSUMPTIONS are the DPs most affected; eval and replay run them over past decisions.

## Related
[policy-amendment.md](policy-amendment.md), [structured-submission.md](structured-submission.md), [../components/can-policy.md](../components/can-policy.md).
