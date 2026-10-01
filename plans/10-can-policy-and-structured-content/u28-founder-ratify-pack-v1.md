---
id: "10-u28"
plan: "10"
title: "Founder stewardship ratification of pack v1.0.0 (founder action)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 0.5
priority: 28
depends_on: ["10-u27","10-u22"]
writes: ["ratifications/**","CHANGELOG.md","packs/**/pack.yaml","packs/**/manifest.json","release.json"]
reads: []
spec: ["docs/design/ai/amendment-loop.md#4-ratification","docs/open-questions/OQ-ratification-method.md","docs/spec/constitution/rules.md#FOUNDER-TRANS-1","DECISIONS.md"]
verify: ["npm run verify"]
founder_gate: true
defaults: "If the Amsterdam overlay is still unreviewed, ratify with `unreviewed_acknowledged: true` and the banner, scoped to synthetic evidence only; never ratify a pack with failing eval gates."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The transitional step of constitution VIII.2: the founder reviews the public v1 pack and signs a ratification record for the exact version and hash. Publication and legitimacy are founder decisions, so this is gated.

## Steps
1. Founder reads the 10-u27 candidate: rules, one prompt per DP, schemas, limits, overlays, the eval and replay summaries, and the CHANGELOG limits statement.
2. Create `ratifications/base-1.0.0.md` (and constitution, fiktiva-city, nl-amsterdam if used) from the format in docs/ratification.md: scope, `approved_by`, `approved_at`, `expires_at`, `method: founder_stewardship`, rule ids, `unreviewed_acknowledged` as needed, rollback plan, and the public log entry text.
3. Set pack `status: ratified`, rebuild manifests (`npm run build:pack`), run `npm run verify`, tag `v1.0.0`, publish the log entry (repo release notes).

## Acceptance
- A ratification record exists for each pack in the tag and passes the record lint.
- Pack hashes in the records equal the built hashes.
- The tag exists and the record says it is founder-stewarded and interim.

## Out of scope
- Panel ratification (OQ-ratification-method).
- Opening public participation (SIM-GATE-1, plan 11).
