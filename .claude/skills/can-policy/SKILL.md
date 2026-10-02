---
name: can-policy
description: Work on can_policy, the community-legislated policy pack repo of CAN. Use when editing packs, content schemas, decision-point prompts, simulation data, ratifications or the pack tooling, or running its verify pipeline.
---

# can_policy

Fifth submodule of CAN (ADR 0009). Packs are loaded by `can_server` by version and content hash. Spec: `docs/design/components/can-policy.md`, `docs/design/ai/policy-pack.md`.

## Layout
| Path | Holds |
|---|---|
| `packs/base/` | platform rules and thresholds |
| `packs/constitution/` | constitution rules as a pack layer |
| `packs/jurisdictions/<id>/` | jurisdiction overlays |
| `content-schemas/<type>/` | one versioned schema per content type |
| `decision-points/<DP-id>/` | prompt, output schema, examples, eval sets |
| `simulation/personas`, `simulation/seeds` | data only |
| `ratifications/` | ratification records |
| `ci/`, `tools/` | checks and tooling |

## Commands
- `npm run verify` (stub until 10-u03)
- Later: `npm run eval`, `npm run replay`, `npm run build:pack`

## Invariants
- Every example is fictional or synthetic and contains no real person and no live URL to real incident data.
- No em or en dashes in user-facing copy.
- Stdlib plus pinned `ajv` and `yaml` only, once 10-u03 lands.
- Pack hashes only via `tools/pack-hash.mjs`.
- `manifest.json` and `release.json` are generated, never hand-edited.
- Ratification records are append-only.
- Protected-core rules are never edited from here.

## Single-owner paths
`manifest.json`, `release.json`, `ratifications/**`.

## Traps
- CRLF is normalised before hashing.
- Sort order is byte order.
- Tests that read `../docs` skip with an explicit reason when the superproject is absent.
- Night runs push only to the `local` bare sibling; the push to `origin` (GitHub) is a morning human step.
