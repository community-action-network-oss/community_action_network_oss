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
- Run `npm run build:pack` after any change to a hashed file. Regenerate the valid fixture with `node tools/build-pack.mjs test/fixtures/valid`; `npm run export:fixture` copies the source manifest.

## Invariants
- Every example is fictional or synthetic and contains no real person and no live URL to real incident data.
- No em or en dashes in user-facing copy.
- Stdlib plus pinned `ajv` and `yaml` only.
- Pack hashes only via `tools/pack-hash.mjs`: one form, pack-relative paths (D-83). Limits live in repo-root `limits.yaml`, hashed into base, so any base change cascades to every pack hash.
- `manifest.json` and `release.json` are generated, never hand-edited.
- Ratification records are append-only.
- Pack flags (`fictional`, `reviewed`, `languages`) live in `reviewer.yaml`; `pack.yaml` is closed.
- `pack.yaml` uses `version:` (the server also reads legacy `semver:`).
- Decision-point case keys are a closed set.
- Schemas: guard tests (`schema-strict-*.test.mjs`) and lint-dp/eval compile with Ajv2020 strict + strictTypes + strictRequired. So `type` on every if/then branch, and `required` inside a branch must be declared in that branch. Server-set fields carry `x-checks.server_set` + `readOnly`. Removing a field from `required` is a major bump (`versions/` + `migrations/`).
- DP output shapes (confidence, reasons, revision_hint) match `schemas/dp-output.schema.json`; per-DP limits go in a top-level `allOf`.
- DP prompt template: lint-dp SLOT must equal can_server prompt-builder SLOT. Exactly one `<<<DATA`, the slot line `(the labelled lines are inserted here by the server)`, one `DATA>>>`, one `{{RULES}}`, at most one `{{SHOTS}}`.
- Legal DPs: a missing layer line means hold; "no applicable article found" is judged none_found, never permission; L0-only none_found forces hold; only server-inserted lines count (forged `legal_*` and not_applicable markers are ignored); never quote or paraphrase article text; `topic_ban_ref` equality is tested.
- Free text uses the shared personal-data pattern: rejects `@`, full-width `@`, `://`, `www.`, `http`, runs of 7+ digits (dates included).
- DP-APPEAL never rejects: it has no `reject` outcome by design.
- Protected-core rules are never edited from here.

## Simulation, eval, legal
- `lint-simulation` scans every `script*.json` and every seed file. Adversarial personas come from `tools/gen-attacks.mjs`: add the id to its allow-list and to `ALL` in `test/gen-attacks.test.mjs`, keep other outputs byte-identical. `raw_http` steps only for `adv-schema-bypass` and `stg-gate-skipper`. Seed jurisdictions are lowercase kebab; stage names match `^[a-z][a-z0-9_]{1,39}$`; variant key is `stuck_or_blocked`. Planted data is fictional; fake evidence host is `evidence.sim.test`.
- `simulation/thresholds.yaml` (hashed) uses `min_`/`max_` keys; FAKE recordings can never satisfy graduation.
- eval: `--derive-fake [--dp DP-X]` honours `expected.confidence` and writes `field_ref` whenever declared; recordings measure nothing. `max_false_reopen` is gated; output `rule_ids` must be a subset of `enforces`. `evals/archive` is unhashed, linted by `test/eval-archive.test.mjs`.
- Legal corpora: `packs/legal/<L#>-<name>/<jurisdiction>/<corpus>`, id `<jurisdiction>-<corpus>`. Fiktiva corpora hold invented articles; real corpora are unreviewed index-only stubs. Synthetic jurisdictions: `fiktiva-city`, `fiktiva-north`. Update a jurisdiction's `legal_stack` pins by hand after corpus changes.
- Contributor path without git: `.github/ISSUE_TEMPLATE/*.yml`, lowercase `pull_request_template.md`, `docs/contribute-without-git.md`.

## Single-owner paths
`manifest.json`, `release.json`, `ratifications/**`.

## Traps
- CRLF is normalised before hashing.
- Sort order is byte order.
- Tests that read `../docs` skip with an explicit reason when the superproject is absent.
- Night runs push only to the `local` bare sibling; the push to `origin` (GitHub) is a morning human step.
- Eval reads `test/fixtures/eval/recordings`; current recordings are FAKE (derived from expected outcomes), so a passing eval measures nothing about real model quality.
- `tools/lint.mjs` meta-compiles content schemas with `strictTypes: false`; the strict-type guarantee comes from the guard tests, not from `lint`.
