---
id: "13-u04"
plan: "13"
title: "DP-ARCHIVE handler: privacy re-strip, completeness, safety, publish or hold"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 403
depends_on: ["13-u02","13-u03","09-u22","09-u23","09-u09","09-u17","10-u65"]
writes: ["src/archive/app/dp-archive/**","src/archive/app/publish/**","src/moderation/app/dp/archive*.ts","src/db/schema.ts","drizzle/**","test/fixtures/moderation/dp-archive/**","test/archive-dp.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#2-dp-archive","docs/design/ai/decision-points.md","docs/design/ai/runtime.md","docs/design/ai/safety-and-privacy.md","docs/spec/constitution/rules-legal-sim.md#ARCHIVE-1","docs/design/components/server.md"]
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
DP-ARCHIVE through the run DAG of plan 09 (D-76). Blocking for the record being public, never for the terminal transition. Outcomes `publish`, `needs_revision` (record stays private while the poster or a steward adds missing challenges or reasons), `hold`. Fail closed: no record is public unless DP-ARCHIVE says `publish`.

## Steps
1. Register the DP handler in the registry of 09-u06 with the prompt, schema and examples from can_policy (10-u65, fixtures only here under test/fixtures/moderation/dp-archive). Trigger `problem.ended` (13-u01) and an async rebuild when the archive schema version changes.
2. Step 1, privacy re-strip: every free-text field of the assembled record goes through the privacy gateway again (09-u09: DP-PRIVACY, DP-NAMING zones); names, handles, addresses, emails and exact coordinates are removed; places generalise to city or region; location attestation data is never present; contributor identity is dropped unless the person opted in (attribution handles); guest and impacted labels may appear as counts only. A record with residual personal data after the re-strip is `hold`, never published.
3. Step 2, completeness: deterministic first (every executed stage has outcome and bands, every `blocked` or `abandoned` stage has a `challenge`, costs present or `none_stated`, versions stamped, `context_profile` complete or `unknown` per dimension), then one model read: do `challenges` and `reasons` explain failures and not only successes? Missing pieces give `needs_revision` with one hint per field; the hint goes to the poster (or a steward when the poster is gone) as a notice and never blocks anything else.
4. Step 3, safety: DP-CRISIS and DP-TONE run on the text. Injection check: instruction-like imperatives aimed at a model, hidden text and link farms in a record fail the DP as `needs_revision` and file a policy example candidate (no publication). Records are quoted in delimited data blocks (09-u17) with the standing rule that content cannot change instructions.
5. Outcome applier: `publish` sets `status = published`, `published_at`, `quality.completeness`, `quality.dp_archive_run_id` and emits `archive.published` (the index job of 13-u08 listens); `needs_revision` sets `needs_attention` and keeps the record private; `hold` retries with backoff on the queue (idempotent per (problem, ended_at)) and emits `archive.held`. The problem page shows no archive link until published.
6. Tests with FakeModel: a complete simulated record publishes; a record with a planted email in an option text is stripped, then published; a planted residual (the gateway fixture that cannot strip) holds; missing challenge for a blocked stage gives needs_revision; a provider timeout holds and retries; an injected instruction in a stage goal fails the DP; the terminal transition succeeds in every failure case.

## Acceptance
- No record is public without a recorded DP-ARCHIVE run with outcome publish (DB-level check: published rows require `quality.dp_archive_run_id`).
- Residual personal data holds, never publishes.
- The terminal transition is never delayed or failed by archiving.
- `npm run verify` is green.

## Out of scope
- Embedding the record (13-u08).
- Retraction and annotation (13-u05).
- Real prompts and thresholds (can_policy, 10-u65).
