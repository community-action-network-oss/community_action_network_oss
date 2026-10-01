---
id: "13-u02"
plan: "13"
title: "Archive record assembler: deterministic build from the ended problem"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 401
depends_on: ["13-u01","12-u02","12-u03","12-u06"]
writes: ["src/archive/domain/**","src/archive/app/assemble/**","src/archive/infra/**","test/archive-assemble.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/24-archive-reuse.md","docs/design/ai/archive-reuse.md#1-archive_record-schema","docs/design/flows/archive-on-terminal.md","docs/spec/01b-stages.md","docs/design/components/server.md"]
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
Turn the `pending` record of 13-u01 into a complete draft record, with no model call: pure assembly from structured data already in the database (ARCHIVE-1). No free text is invented.

## Steps
1. Pure domain in src/archive/domain: `buildSnapshot(problemVersion)`, `buildExecutedPath(stagePlanAsRun, stageEvents)` (per stage: name, goal, criteria, outcome `resolved|skipped|blocked|abandoned`, `duration_band`, `cost_band`, `depends_on`, chosen option), `buildOptions(stageOptions, stageChoices)` (summary, legality result recorded at the time by DP-LEGALITY, chosen or not, reason), `buildEvidenceRefs(stageEvidence)` (URIs and evidence tiers only, never uploads of people), `buildCosts(...)`, `buildOutcome(criteriaResults, terminalState)` (per final criterion result, `unresolved` for stuck), `buildVersions()` (policy, schema, per-layer legal corpus, archive schema). The band scales (duration and cost) are constants in one file `bands.ts`, with the cost bands equal to `budget_band` of the context profile (docs/design/ai/archive-reuse.md section 3).
2. Challenge capture (`captureChallenges`): from stages that were ever `blocked` (DP-BLOCKER payload: constraint, source, layer), stage options declined or marked unlawful by the choice gate, `review_recommendation` rows the poster declined (reason kept, reviewer identity dropped), failed or `needs_revision` stage resolutions (ST06), and appeals that overturned or upheld a decision. Each becomes a `challenge` row: `stage`, `tried`, `why_failed_or_blocked`, `kind`, `resolution` (text or `unresolved`), `layer` (L0 to L6 for legal). Any field that cannot be derived structurally is left empty and marked in `quality.missing[]` so DP-ARCHIVE (13-u04) can ask; nothing is generated.
3. Reopen chain: when the problem has an earlier archive record (T20 or T21 reopen then a new end), the new record sets `previous_record_id`; the old record is never edited (ARCHIVE-1).
4. Application service `AssembleArchiveRecord(problemId, endedAt)`: loads through the repositories of plan 12 (`StagePlanRepository`, stage options, choices, evidence, `stage_event`) and review_recommendation reads; runs inside one transaction; writes the rows of 13-u01 with `status = pending`; idempotent per (problem_ref, ended_at). The `problem_ref` is a fresh opaque uuid kept in a private mapping table `archive_problem_link` (problem_id to problem_ref) that no public query joins.
5. Personal data is not removed here (that is 13-u04, which runs the gateway again); this step only avoids carrying obvious identifiers: it never copies account ids, handles, emails or `attestation` fields, and a schema-driven allowlist per section decides which fields enter the snapshot.
6. Tests (db): a seeded problem with a parallel two-stage plan, one blocked stage, one declined recommendation and one unlawful option yields the expected `executed_path`, two challenges of the right kinds and `quality.missing` empty; a stuck problem yields `unresolved` outcome; a duplicate job creates nothing; no output key contains an account id or handle (key-set test); a reopened problem chains records.

## Acceptance
- The assembler is deterministic: the same inputs give byte-identical rows, with no model or network call (provider counter asserted at 0).
- Failures and blocked or abandoned stages are present as challenges.
- No person identifier or attestation field enters any row.
- `npm run verify` is green.

## Out of scope
- The privacy re-strip, completeness read and publication decision (13-u04).
- Embedding and indexing (13-u08).
- Gallery pages.
