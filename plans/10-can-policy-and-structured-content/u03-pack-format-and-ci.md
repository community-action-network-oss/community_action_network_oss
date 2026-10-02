---
id: "10-u03"
plan: "10"
title: "Pack format, JSON schemas, hash tool and CI skeleton with npm run verify"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 3
depends_on: ["10-u02"]
writes: ["package.json","package-lock.json","tools/**","schemas/**","ci/**","test/**",".github/workflows/**","README.md","CHANGELOG.md"]
reads: []
spec: ["docs/design/ai/policy-pack.md","docs/design/components/can-policy.md","docs/design/ai/evaluation.md","docs/design/ai/amendment-loop.md","docs/adr/0009-can-policy-repo.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "Dependencies are exactly `ajv` (JSON Schema 2020-12 via `ajv/dist/2020`) and `yaml`, pinned to exact versions, plus Node built-in test runner. If ajv cannot do 2020-12 strictly with the `x-` keywords, register them with `ajv.addKeyword`; do not add another validator."
status: done
attempts: 0
commits: ["f24106c"]
actual_hours: 0.1
---
## Objective
Define the on-disk pack format and make it checkable: JSON Schemas for `pack.yaml`, `manifest.json`, `release.json`, DP output and content schemas meta-validation, the single hash tool, a lint that enforces the layout, and CI with an eval runner stub and a replay-diff stub that run against fixtures. `npm run verify` is the gate every later can_policy unit uses.

## Steps
1. Dependency policy: `package.json` with exact-pinned `ajv` and `yaml` only. Scripts: `verify` (runs `lint`, `test`), `lint` (`node tools/lint.mjs`), `test` (`node --test test/`), `eval` (`node tools/eval.mjs`, a stub that prints "eval: no cases" and exits 0), `replay` (`node tools/replay.mjs`, stub, same), `build:pack` (`node tools/build-pack.mjs`).
2. Format decisions (write them into README under "Pack format"): ONE repo wide semver per git tag `vX.Y.Z`; every pack in a tag carries that version. Packs: `base` (= `packs/base/**` + `content-schemas/**` + `decision-points/**` + `limits.yaml` + `simulation/thresholds.yaml`), `constitution` (= `packs/constitution/**`), and one per `packs/jurisdictions/<id>/**` and `packs/local/<id>/**`. Layer order and parents: base, constitution (parent base), jurisdiction (parent constitution), local (parent jurisdiction).
3. `schemas/pack.schema.json` for `pack.yaml`: `name`, `version` (semver), `layer` (base|constitution|jurisdiction|local), `parent` (null or `{name, version}`), `effective_from` (date), `jurisdiction` (required for layer jurisdiction and local), `status` (`draft|ratified`). `schemas/manifest.schema.json`: `{pack, version, layer, parent: null|{name, version, pack_hash}, files: [{path, sha256, bytes}], pack_hash}`. `schemas/release.schema.json`: `{version, packs: [{name, pack_hash}], released_at}`.
4. `tools/pack-hash.mjs` exports `canonicalManifest(packDir...)` and `packHash`. The algorithm is the contract with can_server (10-u04 re-implements it from this text): collect hashed files; read as bytes; for text files (`.json .yaml .yml .md .txt`) replace CRLF with LF before hashing; sha256 hex per file; sort entries by path in byte order; `pack_hash = sha256_hex(join("\n", [ "parent:" + (parent_pack_hash or "none"), ...entries.map(e => e.path + "\t" + e.sha256) ]))`. Excluded from hashing: `manifest.json`, `release.json`, `ratifications/**`, `CHANGELOG.md`, `ci/**`, `tools/**`, `test/**`, `node_modules/**`, dotfiles. The policy version string is `<name>@<semver>+<first 12 hex of pack_hash>`.
5. `tools/build-pack.mjs`: writes `manifest.json` per pack directory and `release.json` at the root from the sources; `--check` mode recomputes and fails on any drift (used by lint, so a hand edit of a hashed file without rebuilding fails CI).
6. `tools/lint.mjs`: checks every `pack.yaml` against its schema; every `decision-points/<DP-id>/` has `prompt.md`, `schema.json`, `examples/`, `eval/`, `eval/thresholds.yaml` once at least one DP directory exists (the checks are no-ops on an empty tree); `content-schemas/<type>/schema.json` parses and passes the meta check in step 6; no file over 256 KB; the banned-character check: no U+2014 or U+2013 in any `.md`, `.yaml` or message JSON under the repo.
7. `schemas/dp-output.schema.json`: the shared DP output contract from docs/design/ai/policy-pack.md (`outcome` enum of the six, `rule_ids[]`, `field_ref {field, span?}`, `revision_hint`, `confidence` 0..1, `reasons[]`, `additionalProperties: false`). `schemas/content-schema.meta.json`: JSON Schema 2020-12 plus the `x-ui`, `x-guidance`, `x-checks` shapes from docs/design/ai/structured-content.md section 2 (x-ui: widget, label_msg, help_msg, order; x-guidance: why, good, bad, min_chars, max_chars; x-checks: dps[]). Unknown top-level `x-` keys fail.
8. Fixtures under `test/fixtures/`: one tiny valid pack tree and several broken ones (missing pack.yaml, bad semver, hash drift, banned dash, DP dir missing eval). Tests assert lint passes the valid tree and fails each broken tree with the expected message, and that `pack-hash` is stable across CRLF and LF checkouts.
9. `.github/workflows/ci.yml`: on pull_request and push to main: setup-node 24, `npm ci`, `npm run verify`, then `npm run eval` and `npm run replay` as separate named steps (stubs now; 10-u23 to 10-u25 fill them). Replay stub reads `test/fixtures/replay-decisions.json` (a 3-row placeholder with the final column set from docs/design/ai/evaluation.md) so the step is wired to real input.
10. README: a "Verify" section and a "Hash contract" section stating the algorithm above verbatim. CHANGELOG `Unreleased` entry.

## Acceptance
- `npm run verify` is green from a clean `npm ci`.
- Each broken fixture fails lint with a distinct, readable error.
- Hashing the same tree on CRLF and LF produces the same `pack_hash` (test).
- The CI workflow file runs verify, eval and replay as separate steps.

## Out of scope
- Real rules, schemas, prompts or examples (later units).
- Eval and replay logic beyond stubs (10-u23, 10-u24).
- Ratification records (10-u26).
