---
id: "10-u27"
plan: "10"
title: "Build pack v1.0.0 candidate: manifests, release.json, CHANGELOG, server fixture export"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.2
priority: 27
depends_on: ["10-u13","10-u15","10-u16","10-u17","10-u18","10-u19","10-u20","10-u21","10-u26","10-u25"]
writes: ["packs/**/manifest.json","release.json","CHANGELOG.md","tools/export-fixture.mjs","test/pack-build.test.mjs","package.json","docs/release.md"]
reads: ["packs/**","content-schemas/**","decision-points/**"]
spec: ["docs/design/ai/policy-pack.md#version-and-hash","docs/design/components/can-policy.md#ci","docs/design/ai/amendment-loop.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "The candidate version is 1.0.0 and the pack status stays `draft` until 10-u28 records ratification. If `npm run eval -- --strict` fails on a DP, fix the content (examples, thresholds only when stricter), do not exclude the DP."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Assemble everything into a releasable v1.0.0 candidate: set pack versions, generate manifests and `release.json`, write the changelog, prove eval and replay are green on the whole pack, and export a copy shaped for can_server's fixture directory.

## Steps
1. Set `version: 1.0.0` in every `pack.yaml`, `schema.json` version fields remain 1.0.0 (lint compares), run `npm run build:pack` to write manifests and `release.json`; run with `--check` to confirm no drift.
2. Run `npm run eval -- --derive-fake --strict`, `npm run replay` on the fixtures and `npm run verify`; paste the summary numbers (per DP pass table, flip count 0 for an initial release) into `CHANGELOG.md` under `1.0.0 candidate`, with a line "met on fictional fixtures with recorded responses; no live model has scored this pack" (honest limits per docs/design/ai/evaluation.md).
3. `tools/export-fixture.mjs --out <dir>`: copies the hashed files plus manifests and ratification records of the base, constitution and `fiktiva-city` packs into a directory laid out as can_server expects (10-u04: one directory per pack name and version), excluding `nl-amsterdam` unless `--with-amsterdam`. Used by 10-u40.
4. Test: building twice gives identical hashes; changing one byte of a schema changes `pack_hash` and the version string suffix; the exported tree reloads through `canonicalManifest` to the same hash.
5. `docs/release.md`: how a tag is cut, what must exist (ratification record) and how the server pins the hash.

## Acceptance
- `build:pack --check` passes and hashes are stable (test).
- Eval strict and replay are green on the full pack.
- CHANGELOG states the fixture-only evidence limit.
- `npm run verify` green.

## Out of scope
- Creating the git tag (after ratification, 10-u28).
- Syncing into can_server (10-u40).
