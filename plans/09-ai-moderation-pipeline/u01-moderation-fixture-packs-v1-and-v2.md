---
id: "09-u01"
plan: "09"
title: "Moderation fixture packs v1 and v2 with every DP section"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 230
depends_on: ["10-u04"]
writes: ["test/fixtures/moderation/**","test/support/moderation-fixtures.ts","test/moderation-fixtures.e2e-spec.ts"]
reads: ["src/policy/**","test/fixtures/policy/**"]
spec: ["docs/design/ai/policy-pack.md","docs/design/ai/decision-points.md","docs/design/ai/structured-content.md","docs/design/ai/evaluation.md","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals"]
needs: []
verify: ["npm run verify","npx vitest run test/moderation-fixtures"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Give every later plan 09 unit one place for pack fixtures. The 10-u04 fixture pack under test/fixtures/policy is a miniature (3 rules, a 4-field problem schema, no decision points) and 10-u40 later rewrites that folder, so plan 09 owns its own full copies under test/fixtures/moderation: pack v1 with every DP section, and pack v2 for the policy-change and appeal re-decision tests. Plan 09 tests always select packs through moderationFixtures(), never through the default POLICY_PACKS_DIR.

## Steps
1. Read plans/10-can-policy-and-structured-content/u04-server-policy-module.md and its result: src/policy/, test/policy/build-fixture.ts (builds manifest.json per pack with the hash contract) and the ratification record format (`ratifications/<pack>-<version>.md` naming version and hash, `approved_by: test-founder`, `expires_at: 2999-01-01`). Copy the miniature pack tree (base, constitution, fiktiva-city) into test/fixtures/moderation/pack-v1/ and build manifests with that script (call its exported function from your own script test/support/build-moderation-fixtures.ts; never edit test/fixtures/policy/** or the script itself). Any change to a pack file changes its hash, so regenerate manifest.json AND the ratification record for every pack you touch.
2. In pack-v1 add `decision-points/<DP>/` for each DP below, each with `prompt.md`, `prompt.alt.md` (the appeal variant), `schema.json` (outcome, rule_ids, field_ref, revision_hint, confidence, reasons; unknown keys fail), `examples/` and `eval/thresholds.yaml` (confidence floors per outcome). Required set: DP-CRISIS, DP-LEGAL, DP-ELIGIBILITY, DP-PRIVACY, DP-NAMING, DP-TONE, DP-FRAMING, DP-ASSUMPTIONS, DP-COMPLETENESS, DP-APPEAL. Real prompts and examples live in can_policy (plan 10); these are minimal fixtures that exercise the pipeline, not policy content.
3. All text in fixtures is synthetic and fictional. No real names. Seed framing 1 and 2 of D-56 may be used verbatim as inputs.
4. Create test/fixtures/moderation/pack-v2/: a full copy of pack-v1 with version bumped (minor), one new labeled example in DP-NAMING, and one changed threshold so exactly one fixture input flips outcome between v1 and v2 (a borderline office-alias case), with its own manifest and ratification record. Document the flipping input in test/fixtures/moderation/README.md (the only README this unit may add). Expose both packs through `moderationFixtures()` in test/support/moderation-fixtures.ts: directories, versions, hashes, the flipping input, and `policyActiveEnv(version)` returning the POLICY_ACTIVE JSON string (name, version, hash) plus POLICY_PACKS_DIR for tests to set.
5. Test: the 10-u04 PolicyStore loads both packs with their pinned hashes and reports different hashes; every DP in the required set resolves for the fiktiva-city fixture jurisdiction (no Amsterdam content in fixtures); v2 differs from v1 only in the documented files.

## Acceptance
- Pack v1 has every DP the catalog marks as applying to a problem, plus DP-ASSUMPTIONS, DP-COMPLETENESS, DP-APPEAL, and ratification records the loader accepts.
- Pack v2 loads with its own hash and exactly one documented fixture flips.
- Nothing under test/fixtures/policy/** or test/policy/** is modified.
- `npm run verify` is green.

## Out of scope
- Real prompts or real policy text (that belongs to can_policy).
- Eval-quality example volume.
- The loader itself (10-u04) and the real policy content (plan 10).
