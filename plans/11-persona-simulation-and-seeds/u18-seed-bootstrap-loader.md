---
id: "11-u18"
plan: "11"
title: "Seed bootstrap loader: idempotent seed submission through the normal pipeline"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 118
depends_on: ["11-u12","11-u16","11-u13","09-u25"]
writes: ["scripts/seed-bootstrap.ts","test/simulation/seeds/**","package.json"]
reads: []
spec: ["docs/design/flows/seed-bootstrap.md","docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/adr/0011-persona-simulation-proof.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "The loader never bypasses moderation: a seed that fails is reported, not force-published. It refuses on any check named in the flow (names a person, overlay missing, label missing)."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Implement docs/design/flows/seed-bootstrap.md: a maintainer runs one command with a pack version and seed ids and the seeds enter the product through `structured-submission` as the labeled seed account, with an idempotent record by seed id and content hash.

## Steps
1. `npm run seed:bootstrap -- --pack <name@version> --seeds 1,2` (a TypeScript script under `scripts/`, run with `node`): loads seeds (11-u12), checks locally before any request: framing equals the FRAMINGS entry, seed `label` constant present, every evidence item synthetic and marked, no person-name match (reuse the deterministic privacy detector from 03-u02 when present, else the simulation PII scan), the jurisdiction overlay named by the seed exists in the active pack (else refuse with "overlay missing").
2. Signs in as the labeled seed account (public handle `seed`, `synthetic` true only when SIMULATION_MODE; in a real deployment the account is a normal labeled maintainer account created by invite), submits each seed problem through the public submit path (draft, check, submit), waits for the moderation outcome and records `{seed_id, content_hash, outcome, policy_version}` in a local ledger file; a rerun with an unchanged hash and a published outcome is a no-op; a changed hash resubmits as an edit.
3. Report: published, revised, held per seed to stdout and `seed-report.json`; exit code 1 if any seed is not published.
4. Set `is_seed` and `synthetic_evidence` through the normal write path from 11-u13 (the loader sends the seed flag only in simulation mode).
5. Tests with FakeModel: both seeds publish; a seed containing a planted name is refused before any request; missing overlay refuses; rerun is idempotent; a failing seed is reported and not force-published.

## Acceptance
- Re-running changes nothing when hashes are unchanged (test).
- Pre-request refusals for name, missing overlay, missing label (tests).
- No seed is published without a normal moderation outcome (test).
- `npm run verify` is green.

## Out of scope
- Seeds 3 and 4.
- Production seeding approval (founder, DPIA).
