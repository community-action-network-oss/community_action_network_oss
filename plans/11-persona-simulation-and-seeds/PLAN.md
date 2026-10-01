---
id: "11"
title: "Persona simulation harness and seed problems"
approved: true
status: todo
depends_on_plans: ["09","10"]
spec: ["docs/design/ai/simulation.md","docs/design/flows/persona-simulation-run.md","docs/design/flows/seed-bootstrap.md","docs/design/ai/evaluation.md","docs/design/ai/amendment-loop.md","docs/design/components/can-policy.md","docs/design/components/server.md","docs/design/ux/wireframes/policy.md","docs/spec/constitution/rules.md","docs/adr/0011-persona-simulation-proof.md","docs/open-questions/OQ-graduation-criteria.md","docs/open-questions/OQ-amsterdam-overlay-review.md","docs/design/ux/ui-unit-template.md"]
---
# Plan 11: Persona simulation harness and seed problems

## Goal
The slice-1 proof (D-55): AI persona agents drive the real pipeline over its public API, play every role and try to break it. The harness lives in `can_server/test/simulation` (HTTP only). Personas and seeds are data in `can_policy/simulation`. Seeds 1 and 2 use the real Amsterdam framings with synthetic evidence (D-56). Deterministic runs on FakeModel run in CI. Misses become labeled example candidates and policy PR drafts. A graduation report evaluates criteria G1 to G13, and a maintainers screen shows it (WF-SIM-1). Live runs, the adversarial campaign and the opening of public participation are founder-gated.

## Spec refs
- docs/design/ai/simulation.md (all sections, graduation criteria G1 to G13 in section 8)
- docs/design/flows/persona-simulation-run.md, seed-bootstrap.md, appeal.md
- docs/design/components/server.md "Where the simulation harness lives"
- docs/design/ai/evaluation.md, amendment-loop.md
- docs/design/ux/wireframes/policy.md (WF-SIM-1)
- docs/spec/constitution/rules.md: SIM-GATE-1, SIM-LABEL-1, SIM-NOSECRET-1
- docs/open-questions: OQ-graduation-criteria, OQ-amsterdam-overlay-review

## Acceptance for the whole plan
Without network or paid calls, `npm run sim:ci` in can_server starts the test stack in simulation mode, bootstraps seeds 1 and 2 through the normal pipeline, runs all scenarios (both seeds with happy, revise, appeal, stuck and attack variants, the fail-closed matrix, rollout and rollback, 10 appeals with one full loop, parity, regression) on FakeModel, writes a schema-valid report and a graduation report whose verdict is "not ready" because live criteria are not assessable, and two runs with the same seed are byte-identical after masking. Every miss becomes a valid candidate file. The maintainers screen renders the report. Founder-gated and not part of the green bar: live seed runs, the 200+ run adversarial campaign, the graduation review and seeds 3 and 4.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [11-u01](u01-persona-seed-formats.md) | Persona and seed file formats with schemas and lint | can_policy | 1.2 | 101 | 10-u03 | - |
| [11-u02](u02-personas-submitters.md) | Submitter personas: wellmeaning-wrong, vague, careful, nonnative, revising | can_policy | 1.5 | 102 | 11-u01, 10-u08, 10-u19 | - |
| [11-u03](u03-personas-contributors.md) | Contributor and other personas: expert, resident, skeptic, implementer, institution, proposer, appellant | can_policy | 1.5 | 103 | 11-u01, 10-u10, 10-u11, 10-u12 | - |
| [11-u04](u04-personas-adv-doxx-inject.md) | Adversarial personas A: doxxing and prompt injection, with seeded variant generators | can_policy | 1.5 | 104 | 11-u01, 10-u19, 10-u16 | - |
| [11-u05](u05-personas-adv-flood-hate.md) | Adversarial personas B: spam, hate, brigade, off-topic | can_policy | 1.5 | 105 | 11-u01, 10-u15, 10-u16 | - |
| [11-u06](u06-personas-adv-case-crisis-schema.md) | Adversarial personas C: individual-case, crisis-bait, assumption-smuggle, schema-bypass | can_policy | 1.5 | 106 | 11-u01, 10-u15, 10-u16, 10-u19 | - |
| [11-u07](u07-seed-1-amsterdam-safety.md) | Seed 1 files: Amsterdam public safety, synthetic evidence | can_policy | 1.5 | 107 | 11-u01, 10-u21, 10-u08, 11-u03 | - |
| [11-u08](u08-seed-2-amsterdam-cleanliness.md) | Seed 2 files: Amsterdam city centre cleanliness, synthetic evidence | can_policy | 1.5 | 108 | 11-u01, 10-u21, 10-u08, 11-u03 | - |
| [11-u09](u09-graduation-thresholds.md) | simulation/thresholds.yaml: graduation criteria G1 to G13 as pack values | can_policy | 1 | 109 | 10-u03 | - |
| [11-u10](u10-candidate-intake-format.md) | Labeled example candidates and policy PR draft format | can_policy | 1 | 110 | 10-u14, 11-u01 | - |
| [11-u11](u11-harness-skeleton.md) | Simulation harness skeleton: HTTP-only runner, run store, import-boundary test | can_server | 1.5 | 111 | 10-u04 | - |
| [11-u12](u12-sim-data-sync.md) | Simulation data sync and loaders: personas, seeds and thresholds from can_policy | can_server | 1.2 | 112 | 11-u11, 11-u01 | - |
| [11-u13](u13-synthetic-labeling-server.md) | Server simulation mode: synthetic flag on accounts and content, public-surface guard (SIM-LABEL-1) | can_server | 1.5 | 113 | 10-u29, 02-u04, 04-u01, 04-u04, 04-u05, 09-u33, 10-u32 | - |
| [11-u14](u14-observer-feed.md) | Read-only observer feed of run records for the harness | can_server | 1.5 | 114 | 11-u13, 09-u22, 09-u04 | - |
| [11-u15](u15-evidence-fixture-host.md) | Fixture evidence host for synthetic evidence URLs | can_server | 0.8 | 115 | 11-u11 | - |
| [11-u16](u16-persona-api-driver.md) | Persona API driver: sessions, schema-form filler, hint answering | can_server | 1.5 | 116 | 11-u11, 10-u29, 11-u13, 10-u40 | - |
| [11-u17](u17-script-executor.md) | Deterministic script executor: seeded order, expectations, FakeModel binding | can_server | 1.5 | 117 | 11-u16, 11-u12, 09-u12 | - |
| [11-u18](u18-seed-bootstrap-loader.md) | Seed bootstrap loader: idempotent seed submission through the normal pipeline | can_server | 1.5 | 118 | 11-u12, 11-u16, 11-u13, 09-u25, 10-u40 | - |
| [11-u19](u19-scenario-seed1-happy-revise.md) | Seed 1 scenarios: happy path and the revise loop | can_server | 1.5 | 119 | 11-u17, 11-u18, 11-u07, 11-u02, 11-u03 | - |
| [11-u20](u20-scenario-seed1-appeal-stuck.md) | Seed 1 scenarios: appeal, stuck proposal, decision and tasks to terminal state | can_server | 1.5 | 120 | 11-u19, 09-u33, 09-u34 | - |
| [11-u21](u21-scenario-seed2-all.md) | Seed 2 scenarios: happy, revise, appeal, stuck and attack variants | can_server | 1.5 | 121 | 11-u17, 11-u18, 11-u08, 11-u02, 11-u03 | - |
| [11-u22](u22-attack-wave-runner.md) | Attack wave runner: all adversarial families with pass conditions | can_server | 1.5 | 122 | 11-u17, 11-u04, 11-u05, 11-u06, 11-u18 | - |
| [11-u23](u23-report-writer.md) | Run reports: report.json, schema and readable summary | can_server | 1.5 | 123 | 11-u17, 11-u14 | - |
| [11-u24](u24-metrics-per-dp.md) | Metrics: per-DP precision and recall, false rejects, revision effectiveness, calibration, parity, cost | can_server | 1.5 | 124 | 11-u23, 10-u23 | - |
| [11-u25](u25-leak-injection-checker.md) | Privacy leak and injection checker: canaries across public pages, notices, logs, gateway bodies | can_server | 1.5 | 125 | 11-u22, 11-u23, 09-u09, 09-u10 | - |
| [11-u26](u26-failures-to-candidates.md) | Failures to labeled example candidates and policy PR drafts | can_server | 1.5 | 126 | 11-u24, 11-u10 | - |
| [11-u27](u27-regression-rerun.md) | Regression rerun: every prior failure becomes a persona script | can_server | 1 | 127 | 11-u26, 11-u17 | - |
| [11-u28](u28-graduation-engine.md) | Graduation engine: evaluate G1 to G13 over a run set and write the graduation report | can_server | 1.5 | 128 | 11-u09, 11-u23, 11-u24, 11-u25, 11-u27 | - |
| [11-u29](u29-fail-closed-matrix.md) | Fail-closed matrix scenarios (G9): every failure row triggered, zero publishes | can_server | 1.5 | 129 | 11-u17, 09-u25, 09-u12 | - |
| [11-u30](u30-rollout-rollback-scenario.md) | Rollout and rollback scenario (G10): shadow to full, then rollback, kill switch | can_server | 1.5 | 130 | 11-u17, 09-u27, 09-u29 | - |
| [11-u31](u31-appeal-loop-scenario.md) | Appeal loop scenario (G8): 10 appeals, an overturn that becomes a ratified example and a re-decision | can_server | 1.5 | 131 | 11-u20, 09-u34, 09-u35, 09-u36, 09-u37, 11-u26 | - |
| [11-u32](u32-parity-scenario.md) | Parity scenario (G11): same persona content across synthetic jurisdictions and language markers | can_server | 1.2 | 132 | 11-u24, 11-u02, 10-u20 | - |
| [11-u33](u33-ci-mode-wiring.md) | CI mode: npm run sim:ci, determinism check, night-run entry | can_server | 1 | 133 | 11-u19, 11-u21, 11-u22, 11-u28, 11-u29, 11-u30, 11-u31, 11-u32 | - |
| [11-u34](u34-reports-api.md) | Simulation reports API for maintainers | can_server | 1.2 | 134 | 11-u23, 11-u28 | - |
| [11-u35](u35-live-persona-driver.md) | Live persona mode: model-driven personas via the gateway, transcripts, spend cap guard | can_server | 1.5 | 135 | 11-u17, 09-u09, 09-u15, 09-u14, 11-u25 | - |
| [11-u36](u36-recorded-replay-mode.md) | Recorded replay mode: rerun a live finding from its transcript | can_server | 1.2 | 136 | 11-u35 | - |
| [11-u37](u37-sim-report-view.md) | Simulation run report and graduation progress view for maintainers (WF-SIM-1) | can_app | 1.5 | 137 | 11-u34, 10-u39 | - |
| [11-u38](u38-live-run-seeds.md) | Live seed runs: seeds 1 and 2, three consecutive runs, API key and spend cap (founder action) | can_server | 1 | 138 | 11-u35, 11-u28, 11-u36 | yes |
| [11-u39](u39-live-adversarial-campaign.md) | Live adversarial campaign: 200+ runs for G2 to G5 (founder action) | can_server | 1 | 139 | 11-u38, 11-u25 | yes |
| [11-u40](u40-graduation-review.md) | Founder graduation review and stewardship record for the run set (G13, founder action) | can_policy | 0.5 | 140 | 11-u38, 11-u39, 10-u28 | yes |
| [11-u41](u41-seed-3-ai-risk.md) | Seed 3 files: continuous AI capability risk, needs the problem graph (founder gate until then) | can_policy | 1.5 | 141 | 11-u07 | yes |
| [11-u42](u42-seed-4-climate.md) | Seed 4 files: climate change decomposition, needs the problem graph (founder gate until then) | can_policy | 1.5 | 142 | 11-u41 | yes |

Key decisions: (1) personas and seeds are data in can_policy and copied into can_server by a sync step (11-u12), so neither repo needs the other at runtime; (2) attack variants are generated by a seeded generator and committed (11-u04); (3) hate content uses placeholder tokens, never real slurs; (4) evidence URLs use the reserved host `evidence.sim.test` and agents never fetch them; (5) the graduation engine never returns "open": opening participation is a founder action (11-u40); (6) seeds 3 and 4 wait for the problem graph (spec 07 has no plan yet).

Plan 09 dependency map is recorded in each unit that uses it (moderation runtime, FakeModel, gateway, appeals, fail-closed, rollout).

## Risks
- Deterministic runs prove machinery only; FakeModel behaviour is derived from can_policy eval cases, so they cannot satisfy quality criteria. The reports and the graduation engine say so.
- Scenarios depend on plan 09 controls (fault injection, rollout config, gateway spy). If a control is missing the scenario lists the row as uncovered rather than faking it.
- The Amsterdam overlay may be unreviewed during simulation (OQ-amsterdam-overlay-review); reports must state it.
- Seed content and attack corpora are large data files; keep each under the 256 KB file limit of can_policy lint or split by directory.

## depends_on_plans
09, 10
