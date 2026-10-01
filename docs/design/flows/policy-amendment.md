# Flow: policy amendment

## Purpose
Change moderation by changing policy: a PR to `can_policy` goes through eval, replay diff, ratification, staged rollout and re-moderation. The community acts after the fact on outcomes, and before the fact on rules.

## Trigger
A PR to `can_policy` (prompt, rule, example, threshold, jurisdiction overlay), often prompted by an appeal label, an audit finding or a law change.

## Status
plan 09 (pending). Repo creation is a founder-gated plan unit (D-52); until then packs are fixtures inside `can_server`.

## Sequence
```mermaid
sequenceDiagram
  participant Author
  participant PolicyRepo as can_policy PR
  participant CI
  participant Replay as replay runner (can_server)
  participant Panel as ratifying panel
  participant Reg as policy registry
  participant Mod as moderation runtime
  Author->>PolicyRepo: open PR (pack change + changelog)
  PolicyRepo->>CI: schema lint
  CI->>CI: eval on labeled sets, per-DP thresholds
  CI->>Replay: replay diff over sampled past decisions (fixtures in CI)
  Replay-->>PolicyRepo: report: what would flip
  PolicyRepo->>Panel: randomized, context-masked, cross-jurisdiction panel + maintainers
  Panel-->>PolicyRepo: ratification record
  PolicyRepo->>Reg: tag release (semver + content hash)
  Reg->>Mod: rollout shadow, then canary percent, then full
  Mod->>Mod: re-moderate affected content (post-publication-recheck)
```

```mermaid
flowchart LR
  PR[PR] --> L[schema lint] --> E[eval thresholds] --> D[replay diff] --> V[ratification] --> S[shadow] --> C[canary] --> F[full] --> R[re-moderation]
  E -->|below threshold| X[blocked]
  S -->|disagreement above limit| X
```

## Failure paths
- Eval below threshold or lint failure: PR blocked.
- Shadow or canary shows excess disagreement: rollout halted, previous version stays active; rollback is selecting the prior version.
- Hash mismatch when the server loads a pack: pack refused, previous active version kept.
- Transitional: founder stewardship approves v1 (constitution VIII.2); recorded in `ratifications/`.

## Data written
In `can_policy`: pack, `ratifications/`, `CHANGELOG.md`. In `can_server`: `policy_pack_version` (version, hash, state), rollout row, replay report, `audit_event`.

## Events emitted
`policy.version.ratified`, `policy.rollout.stage_changed`, `policy.rollout.halted` (planned).

## DPs invoked
Every DP touched by the change runs in eval and replay. See [../ai/amendment-loop.md](../ai/amendment-loop.md), [../ai/policy-pack.md](../ai/policy-pack.md), [../ai/evaluation.md](../ai/evaluation.md).

## Related
[../components/can-policy.md](../components/can-policy.md), [post-publication-recheck.md](post-publication-recheck.md).
