# Flow: seed bootstrap

## Purpose
Open the product with real framings and synthetic evidence (D-56). Seeds 1 and 2 first; 3 and 4 wait for the problem graph. No individual is named. Amsterdam (NL) is the first real jurisdiction overlay.

## Trigger
A maintainer runs the seed loader after the policy pack with the Amsterdam overlay is ratified.

## Status
plan 11 (pending). Seeds 3 and 4 not planned until the problem graph exists.

## Sequence
```mermaid
sequenceDiagram
  participant M as maintainer
  participant Seed as seed loader (script)
  participant Pol as can_policy simulation/seeds
  participant API as /v1 (seed account)
  participant Mod as moderation runs
  participant DB
  M->>Seed: run with pack version + seed ids 1, 2
  Seed->>Pol: seeds/seed-1..2: framing, schema-shaped fields, synthetic evidence; Amsterdam overlay pack
  Seed->>API: sign in as the seed account (labeled, public handle "seed")
  loop seed 1 then seed 2
    Seed->>API: submit through structured-submission
    API->>Mod: normal blocking run, nothing bypassed
    Mod-->>Seed: outcome
  end
  Seed->>DB: report: published, revised, held
```

The two framings are verbatim from D-56: (1) "Amsterdam residents face recurring explosions and violent incidents that may reduce actual and perceived public safety." (2) "Amsterdam city centre remains dirty despite substantial government cleaning activity and expenditure."

## Failure paths
- A seed fails the run: it is not force-published; the pack or seed text is fixed through a PR, then the loader is rerun (idempotent by seed id and content hash).
- Evidence is synthetic: every seed evidence item carries a visible "synthetic evidence" mark so nobody mistakes it for fact; its tier is capped by the pack.
- A seed text names a person: loader refuses (sync check) before any run.
- Overlay missing: loader refuses; Amsterdam law is a pack layer, never hard-coded.

## Data written
Seed problems (with `schema_version`, `is_seed`, `synthetic_evidence`), the usual run and decision rows.

## Events emitted
The normal submit and publish events; no special event type.

## DPs invoked
The normal set: [structured-submission.md](structured-submission.md).

Seed scenarios, expected decompositions and persona variants are defined in [../ai/simulation.md](../ai/simulation.md) section 3; the seed files hold data only.

## Related
[persona-simulation-run.md](persona-simulation-run.md), [../components/can-policy.md](../components/can-policy.md).
