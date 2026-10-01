---
id: "09-u69"
plan: "09"
title: "DP-SOURCE-TRUST handler: category allowlist, corroboration, authenticity (SOURCE-1)"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 297
depends_on: ["09-u20","09-u16","09-u01","09-u09","03-u03","10-u62"]
writes: ["src/moderation/app/dp-source-trust.ts","src/moderation/domain/source-trust/**","src/moderation/app/source-trust-writer.ts","test/fixtures/moderation/source-trust/**","test/dp-source-trust.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/decision-points.md#shared-contract","docs/design/ai/decision-points.md#per-dp-notes","docs/spec/constitution/ch03-discourse-evidence.md","docs/spec/constitution/rules.md#SOURCE-1","docs/design/ai/runtime.md","docs/spec/01a-lifecycle.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Judge the `sources[]` of a problem (and cited stage evidence at ST05): is every cited URI from a trusted category or corroborated, and does it establish that the issue is real (SOURCE-1, D-72). Runs on the draft-to-review gate, the publish run and when `sources[]` is edited.

## Steps
1. Deterministic layer first, pure and table tested in src/moderation/domain/source-trust: https only, no credentials or private addresses in the URL, the secret scan of 03-u03, duplicate and shortener detection, category in the pack allowlist (`sources.trusted_categories`: official record, statistics body, court or legislature, reputable media, research, civil society; `other` needs corroboration), and corroboration (at least two sources of different registrable domains, one of them in a trusted category). A problem with only the "no source yet" note returns `needs_revision` with the hint to add a source or ask reviewers, never a reject.
2. Model layer through the DAG (09-u16, no tools, no live fetch): the model reads the stored `uri`, `category`, `establishes` and `authenticity_note` plus the redacted claim each source is meant to support, and judges whether the description establishes authenticity and supports the claim. Registered in the DP registry (09-u06) with outcomes publish, needs_revision, hold only (never reject; aggregate validator test as in 09-u21).
3. Output `per_source[]` {index, verdict (`trusted`, `corroborated`, `weak`, `unsupported`), reason code, hint}; the writer `SourceTrustWriter` stores each item on `source_ref.trust_result` (12-u04 table) through the source repository in the outcome applier step, never from inside the DP.
4. On ST05 the same handler runs on the sources cited by stage evidence (the invocation of 12-u07); the stage evidence `source_trust` result is stored the same way.
5. Use FakeModel keyword-table files added under the unit's own fixtures directory (do not edit the fake table of 09-u12; add a second table file it loads via config), and moderationFixtures() packs (never the 10-u04 default pack).
6. Tests: trusted statistics body passes; a single unknown blog is `weak` and gets a hint; two independent unknown-category sources corroborate; a restated claim presented as its own proof fails authenticity; a look-alike domain fixture; a source description carrying instructions to the model does not change the output (canary, 09-u17); no live network call.

## Acceptance
- The DP never emits reject and never fetches a URL.
- Every source gets a stored per-item result with a reason code.
- `npm run verify` is green.

## Out of scope
- Prompt and thresholds (10-u62).
- Where the DP is invoked from (12-u08, 12-u07).
