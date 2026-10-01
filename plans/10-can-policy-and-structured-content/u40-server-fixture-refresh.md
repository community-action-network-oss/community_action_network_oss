---
id: "10-u40"
plan: "10"
title: "Refresh the server fixture pack from can_policy v1.0.0 and pin it in test config"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 0.8
priority: 40
depends_on: ["10-u27","10-u29"]
writes: ["test/fixtures/policy/**","test/policy/**",".env.example","package.json"]
reads: ["../can_policy/**"]
spec: ["docs/design/ai/policy-pack.md#how-the-server-loads-packs","docs/design/components/can-policy.md","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "If ../can_policy is absent, skip the sync with an explicit message and keep the existing fixture; the parity test then runs against the committed copy only."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Replace the miniature fixture pack with the real v1.0.0 candidate output of `can_policy` (`npm run export:fixture`-style tool from 10-u27), prove the hash algorithms agree across the two repos, and pin the hash in test config. The server still never reads can_policy at runtime in tests.

## Steps
1. Add `scripts/sync-policy-fixture.mjs` (stdlib only): runs `node ../can_policy/tools/export-fixture.mjs --out test/fixtures/policy-v1` when the sibling repo exists, otherwise exits 0 with "skipped: can_policy not present".
2. Commit the exported tree under `test/fixtures/policy-v1/` (size under 2 MB; if larger, export only base, constitution and fiktiva-city as the tool does by default) with the pinned expected hashes in `test/fixtures/policy-v1/PINS.json`.
3. Parity test: the server's `hash.ts` (10-u04) over each exported pack equals the `pack_hash` in its manifest. A failure means the two implementations of the hash contract diverged; the test message points at can_policy README "Hash contract".
4. Switch the default `POLICY_PACKS_DIR` for tests to `test/fixtures/policy-v1` and update `.env.example`; keep the miniature fixture for negative tests.
5. Re-run the problem schema e2e: `GET /v1/content-schemas/problem` returns the 14-field v1 schema.

## Acceptance
- Hash parity test passes for every exported pack.
- The v1 problem schema (14 fields) is served in the e2e test.
- `npm run verify` is green; no test reads `../can_policy` at runtime.

## Out of scope
- Fetching packs from GitHub at deploy time.
- Moderation behaviour (plan 09).
