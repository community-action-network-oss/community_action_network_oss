---
id: "10-u26"
plan: "10"
title: "Ratification record format, loader check fields and contributor docs"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1
priority: 26
depends_on: ["10-u03"]
writes: ["ratifications/**","schemas/ratification.schema.json","tools/lint-ratifications.mjs","tools/lint.mjs","test/ratifications.test.mjs","CONTRIBUTING.md","docs/ratification.md"]
reads: ["schemas/**"]
spec: ["docs/design/ai/amendment-loop.md#4-ratification","docs/open-questions/OQ-ratification-method.md","docs/design/ai/policy-pack.md#version-and-hash","docs/spec/constitution/rules.md#FOUNDER-TRANS-1","DECISIONS.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "The panel method is OQ-ratification-method; the format records whichever method was used in a `method` field and stays method-agnostic. Slice 1 uses `method: founder_stewardship`."
status: done
attempts: 0
commits: ["87b1336"]
actual_hours: 0.1
---
## Objective
A machine-checkable ratification record that the server loader (10-u04) and CI both read: it binds a pack name, version and hash to an approver, an expiry, the checklist of the amendment loop and the rollback plan.

## Steps
1. `ratifications/<pack>-<semver>.md` is markdown with frontmatter (same subset as plans) for machine fields: `pack`, `version`, `pack_hash` (64 hex), `method` (`founder_stewardship|panel`), `approved_by`, `approved_at`, `expires_at`, `rule_ids_touched[]`, `dps_touched[]`, `schemas_touched[]`, `protected_core_check` (true), `eval_report_sha256`, `replay_report_sha256`, `rollback {previous_version, previous_hash, triggers[], notice_text}`, `adversarial_gate` (`passed|deferred_with_reason`), `unreviewed_acknowledged` (bool, required true when a jurisdiction pack has `reviewed: false`), `dissent[]`. Body: human-readable log entry text. `schemas/ratification.schema.json` is the frontmatter schema.
2. `tools/lint-ratifications.mjs`: validates every record; a record may not exist for a `pack_hash` that does not match the pack built from the tagged sources (uses `build-pack --check` for the named version); records are append-only (CI compares against `origin/main` and fails on edits to existing records); `expires_at` in the past is a warning, `approved_by` or `expires_at` missing is an error (FOUNDER-TRANS-1 mirror).
3. Cross-check from 10-u21: a pack with `reviewed: false` requires `unreviewed_acknowledged: true` in its record (test).
4. `CONTRIBUTING.md`: how to open a policy PR (rule ids, DPs, reason, motivating examples), what CI checks, what ratification means today (founder stewardship, interim and public) and later (panel), the no-real-people rule for examples.
5. `docs/ratification.md`: field reference and an example record for a fictional pack. Tests: valid example passes; each missing field fails; edited existing record fails with `--against`.

## Acceptance
- Record schema and lint pass the example and fail each defect (tests).
- Append-only rule is enforced against a base ref (test with temp git repo).
- CONTRIBUTING explains the interim founder stewardship plainly.
- `npm run verify` green.

## Out of scope
- Panel selection tooling.
- Signatures (later).
