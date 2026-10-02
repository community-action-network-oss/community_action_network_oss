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
| `packs/legal/` | legal corpora; a separate kind from policy packs |
| `content-schemas/<type>/` | one versioned schema per content type |
| `decision-points/<DP-id>/` | prompt, output schema, examples, eval sets |
| `simulation/personas`, `simulation/seeds` | data only |
| `ratifications/` | ratification records |
| `ci/`, `tools/` | checks and tooling |

## Commands
- `npm run verify` (lint, parity, tests)
- `npm run eval`, `npm run replay`, `npm run build:pack`
- Run `npm run build:pack` after any change to a hashed file.

## Invariants
- Every example is fictional or synthetic and contains no real person and no live URL to real incident data.
- No em or en dashes in user-facing copy.
- Stdlib plus pinned `ajv` and `yaml` only.
- Pack hashes only via `tools/pack-hash.mjs`.
- `manifest.json` and `release.json` are generated, never hand-edited.
- Ratification records are append-only.
- Pack flags (`fictional`, `reviewed`, `languages`) live in `reviewer.yaml`; `pack.yaml` is closed.
- `pack.yaml` uses `version:` (the server also reads legacy `semver:`).
- Decision-point case keys are a closed set.
- DP-APPEAL never rejects: it has no `reject` outcome by design.
- Protected-core rules are never edited from here.

## Single-owner paths
`manifest.json`, `release.json`, `ratifications/**`.

## Traps
- CRLF is normalised before hashing.
- Sort order is byte order.
- Tests that read `../docs` skip with an explicit reason when the superproject is absent.
- Night runs push only to the `local` bare sibling; the push to `origin` (GitHub) is a morning human step.
- Eval reads `test/fixtures/eval/recordings`; current recordings are FAKE (derived from expected outcomes), so a passing eval measures nothing about real model quality.
- `can_server` validates content with ajv `strictTypes: false` because some schemas lack `type` on if/then branches.
