---
id: "09"
title: "AI moderation pipeline"
approved: true
status: todo
depends_on_plans: ["02", "03", "04", "05", "10"]
spec: ["docs/design/ai/README.md", "docs/design/ai/runtime.md", "docs/design/ai/decision-points.md", "docs/design/ai/triggers.md", "docs/design/ai/legal-stack.md", "docs/design/flows/re-resolution.md", "docs/design/flows/legal-corpus-update.md", "docs/design/ai/appeals.md", "docs/design/ai/safety-and-privacy.md", "docs/design/ai/evaluation.md", "docs/design/ai/structured-content.md", "docs/design/ai/policy-pack.md", "docs/design/components/server.md", "docs/spec/01-slice-1-brief.md", "docs/spec/01a-lifecycle.md", "docs/spec/14-ai-privacy-gateway.md", "docs/spec/15-ai-inference.md", "docs/spec/constitution/rules.md", "docs/design/ux/ui-unit-template.md"]
---
# Plan 09: AI moderation pipeline

## Goal
Build CAN's core: community-legislated, AI-executed moderation (D-51). An AI moderation run applies the policy pack before anything becomes public, on every update, and after publication when policy or context changes or a sample is drawn. Appeals flow through an independent re-run and a community label task into a policy proposal and an AI re-decision. Auditors sample decisions. A small logged emergency and legal lane is the only place a person acts on a single case. Everything is verified deterministically with FakeModel first; the Anthropic adapter and any live run are founder-gated (D-53).

## Spec refs
- docs/design/ai/runtime.md, decision-points.md, triggers.md, appeals.md, safety-and-privacy.md, evaluation.md, structured-content.md, policy-pack.md
- docs/design/flows: intake-submit, content-update, post-publication-recheck, appeal, emergency-legal-lane, policy-amendment, background-jobs
- docs/design/ux/wireframes: WF-PENDING-1, WF-HOLD-1, WF-DECISION-1, WF-DECISION-2, WF-REMOD-1, WF-APPEAL-1, WF-APPEAL-2, WF-MYACT-1, WF-AUDIT-1, WF-AUDIT-2, WF-LABEL-1, WF-LANE-1
- Rules: PRIV-GATEWAY-1, PUB-FAILCLOSED-1, MOD-EXPLAIN-1, REMOD-NOTICE-1, APPEAL-1, APPEAL-2, NO-INSTANCE-OVERRIDE-1, CRISIS-STATIC-1, PREC-1
- docs/design/ai/legal-stack.md, docs/design/flows: re-resolution, legal-corpus-update
- Rules: LEGAL-STACK-1, LEGAL-CITE-1, LEGAL-SOURCE-1, LEGAL-CORPUS-1, TOPIC-FORBIDDEN-1, RERESOLVE-1; lifecycle transitions T23 and T24
- Decisions D-51 to D-61 (D-59 re-resolution, D-61 legal layer stack)

## Contracts with other plans
- Plan 10 (policy and forms): 10-u01 creates the can_policy repo, 10-u02 scaffolds it, 10-u03 pack format and CI, 10-u04 policy module in can_server (pack loader by version and hash, version registry, content-schema registry, PII-safe cache, fixture pack under test/fixtures/policy), 10-u05 schema-driven form renderer in can_app. Every server unit here that reads policy depends on 10-u04; app units that render structured forms depend on 10-u05.
- Plan 09 keeps its own full fixture packs under test/fixtures/moderation (09-u01: v1 with every DP section, v2 for the policy-change flip), because the 10-u04 pack is a miniature and 10-u40 rewrites test/fixtures/policy. Plan 09 tests select packs through moderationFixtures(), never the default POLICY_PACKS_DIR.
- Reuse, do not duplicate: the PII-safe cache store (src/policy/domain/cache.ts, 10-u04) and the deterministic completeness layer (src/policy/domain/completeness.ts, 10-u29). Plan 10 owns the member-facing policy_proposal API (10-u32); plan 09 uses the name proposal_candidate for system-made proposals.
- Plan 10 units that call this plan: 10-u30 (fill-assist) must depend on the gateway and FakeModel units here (09-u08, 09-u09, 09-u12); 10-u36 (hints) consumes the HintDto and advisory check of 09-u24 and 09-u26.
- Plan 11 (simulation harness) depends on this plan; nothing here plans simulation.
- Supersession: plan 09 replaces the human-moderator model of plans 03 to 05. Each affected unit carries a "supersession guard" step that deletes the older moderator path if it exists, so the result is correct whichever ran first.

- Legal stack (D-61) and re-resolution (D-59): units 09-u56 to 09-u59 apply the cumulative stack (LEGAL-STACK-1), store citations (LEGAL-CITE-1), refuse forbidden topics with a logged basis and send solution-only illegality to stuck (TOPIC-FORBIDDEN-1), and hold layer conflicts. 09-u60 to 09-u64 select, run, decide and reopen (T23, T24) past resolutions with notices; 09-u65 is the app notice and reopened state; 09-u66 and 09-u67 are the e2e extensions. They read the corpora of plan 10 (10-u55 loader, 10-u56 retrieval, 10-u57 corpus activation jobs, 10-u59 DP-RERESOLUTION content) and use only the synthetic fiktiva fixtures in tests.
- Real legal corpora (10-u43 to 10-u52) are largely founder-gated (vendoring from official sources needs network and licence confirmation, lawyer review). Plan 09 never waits for them.

## Acceptance for the whole plan
With FakeModel only (no network, provider counter asserted):
1. A seeded problem (D-56 framing 1, synthetic evidence) is submitted; the first vague draft gets needs_revision with a hint per field; after revision a blocking pre-publication run publishes it; nothing is public before a complete run; a provider timeout produces a visible hold that never becomes publish.
2. An edit of the published problem runs a diff-aware re-check; the previous version stays visible until the new run publishes it; a bad edit is rejected and the old version stays.
3. Activating a second pack version flips one documented item; the author sees a re-reviewed notice with rules, version and an appeal path; nothing is removed silently.
4. The author appeals; an independent re-run with a different model and prompt variant upholds; the author disputes; a label task with a fixed quorum is created and answered by labelers; the fake PolicyProposalPort writes a redacted proposal; a later version is activated and the instance is re-decided under it.
5. Crisis content never publishes and opens a lane case; every lane action is logged with a reason and second-member review; a route-table test proves no endpoint edits a single decision.
6. A seeded solved problem is reopened by a policy change or a legal-corpus change with a visible "Reopened under policy vX" notice, history intact, appealable; an infeasible case is annotated with no state change (09-u66).
7. Legality decisions always cite layer, article and corpus version; a forbidden topic is refused with a logged basis; an illegal-only proposal reaches stuck; a layer conflict holds (09-u67).
Units 09-u44, 09-u45, 09-u66 and 09-u67 (the e2e files) prove this in CI; the app screens cite their wireframes and the UI unit template.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [09-u01](u01-moderation-fixture-packs-v1-and-v2.md) | Moderation fixture packs v1 and v2 with every DP section | can_server | 1.2 | 230 | 10-u04 | - |
| [09-u02](u02-roles-for-auditor-labeler-and-lane.md) | Roles for auditor, labeler and lane member with guards | can_server | 1.2 | 231 | 02-u08, 02-u04 | - |
| [09-u03](u03-moderation-run-schema-and-decision-table.md) | moderation_run schema and decision table migration to the AI model | can_server | 1.5 | 232 | 03-u09, 02-u04 | - |
| [09-u04](u04-run-recorder-idempotency-and-stage-output.md) | Run recorder, idempotency and stage-output resume | can_server | 1.3 | 233 | 09-u03 | - |
| [09-u05](u05-postgres-payload-job-queue-with-priority.md) | Postgres payload job queue with priority classes and backoff | can_server | 1.5 | 234 | 02-u03 | - |
| [09-u06](u06-dp-registry-from-the-pack-and.md) | DP registry from the pack and the deterministic DP selector | can_server | 1.5 | 235 | 10-u04, 09-u01 | - |
| [09-u07](u07-event-relay-domain-events-to-jobs.md) | Event relay: domain events to jobs, plus policy_changed and sample_tick | can_server | 1.5 | 236 | 09-u05, 09-u06, 03-u05 | - |
| [09-u08](u08-aigatewayport-minimal-prompt-builder-and-the.md) | AiGatewayPort, minimal prompt builder and the no-direct-provider rule | can_server | 1.5 | 237 | 02-u02, 10-u04 | - |
| [09-u09](u09-privacy-gateway-redaction-pseudonymization-token-store.md) | Privacy gateway: redaction, pseudonymization, token store and zones | can_server | 1.5 | 238 | 09-u08, 03-u02 | - |
| [09-u10](u10-output-gate-re-screen-explanations-and.md) | Output gate: re-screen explanations and hints | can_server | 1 | 239 | 09-u09 | - |
| [09-u11](u11-dp-crisis-and-dp-legal-deterministic.md) | DP-CRISIS and DP-LEGAL deterministic layer that needs no model | can_server | 1.5 | 240 | 09-u08, 03-u02, 03-u03 | - |
| [09-u12](u12-fakemodel-provider-with-scripted-failures-and.md) | FakeModel provider with scripted failures and record/replay fixtures | can_server | 1.5 | 241 | 09-u08 | - |
| [09-u13](u13-anthropicprovider-behind-config-founder-gated.md) | AnthropicProvider behind config (founder-gated) | can_server | 1.2 | 242 | 09-u12, 09-u08 | yes |
| [09-u14](u14-budgets-and-spend-caps-ledger-guard.md) | Budgets and spend caps: ledger, guard and alerts | can_server | 1.5 | 243 | 09-u08 | - |
| [09-u15](u15-multi-model-router-small-first-escalation.md) | Multi-model router: small first, escalation, independent verifier | can_server | 1.5 | 244 | 09-u12, 09-u14 | - |
| [09-u16](u16-bounded-agent-dag-executor-classify-rule.md) | Bounded agent DAG executor: classify, rule checks, explain | can_server | 1.5 | 245 | 09-u15, 09-u10, 09-u06, 09-u04 | - |
| [09-u17](u17-prompt-injection-defenses-canary-checks-and.md) | Prompt-injection defenses, canary checks and deterministic vetoes | can_server | 1.5 | 246 | 09-u16, 09-u11 | - |
| [09-u18](u18-deterministic-aggregation-prec-1-precedence-and.md) | Deterministic aggregation: PREC-1 precedence and confidence floors | can_server | 1.2 | 247 | 09-u06 | - |
| [09-u19](u19-stage-output-cache-keys-hmac-and.md) | Stage-output cache keys (HMAC) and wiring on the 10-u04 cache | can_server | 1.2 | 248 | 09-u16 | - |
| [09-u20](u20-dp-completeness-handler-layer-1-from.md) | DP-COMPLETENESS handler: layer 1 from 10-u29, model read for any content type | can_server | 1.3 | 249 | 09-u16, 09-u01, 10-u29 | - |
| [09-u21](u21-dp-assumptions-factual-causal-legal-and.md) | DP-ASSUMPTIONS: factual, causal, legal and scope assumptions | can_server | 1.3 | 250 | 09-u20 | - |
| [09-u22](u22-run-orchestrator-event-and-dp-to.md) | Run orchestrator: event and DP to a recorded, aggregated result | can_server | 1.5 | 251 | 09-u16, 09-u18, 09-u19, 09-u04, 09-u17, 09-u11, 09-u21, 09-u09, 09-u14 | - |
| [09-u23](u23-outcome-applier-moderationtarget-port-and-decision.md) | Outcome applier: ModerationTarget port and decision write in the transition engine | can_server | 1.5 | 252 | 09-u22, 03-u05 | - |
| [09-u24](u24-problem-as-the-first-moderationtarget-with.md) | Problem as the first ModerationTarget with checks gate and decisions read | can_server | 1.5 | 253 | 09-u23, 03-u08, 02-u10 | - |
| [09-u25](u25-pre-publication-blocking-path-on-t01.md) | Pre-publication blocking path on T01 and T03, edit cancel and withdraw | can_server | 1.5 | 254 | 09-u24, 09-u07, 03-u07 | - |
| [09-u26](u26-on-update-path-diff-aware-runs.md) | On-update path: diff-aware runs and pending versions of published items | can_server | 1.5 | 255 | 09-u25 | - |
| [09-u27](u27-post-publication-re-check-on-policy.md) | Post-publication re-check on policy change: rollout state, batches, flips | can_server | 1.5 | 256 | 09-u07, 09-u24, 09-u26 | - |
| [09-u28](u28-context-change-triggers-related-problem-law.md) | Context-change triggers: related problem, law update, evidence tier | can_server | 1.2 | 257 | 09-u27 | - |
| [09-u29](u29-re-moderation-notices-read-model-remod.md) | Re-moderation notices read model (REMOD-NOTICE-1) and Decided-under notices | can_server | 1.5 | 258 | 09-u27 | - |
| [09-u30](u30-masked-view-builder-for-auditors-and.md) | Masked view builder for auditors and labelers | can_server | 1 | 259 | 09-u03, 09-u02, 09-u09 | - |
| [09-u31](u31-auditor-sampling-service-stratified-near-threshold.md) | Auditor sampling service: stratified, near-threshold, sample_tick | can_server | 1.5 | 260 | 09-u30, 09-u07 | - |
| [09-u32](u32-auditor-review-endpoints-with-independent-before.md) | Auditor review endpoints with independent-before-aggregate and disagreement tracking | can_server | 1.5 | 261 | 09-u31, 09-u02 | - |
| [09-u33](u33-appeals-schema-and-filing-replacing-the.md) | Appeals: schema and filing, replacing the human appeal queue | can_server | 1.5 | 262 | 09-u24, 09-u02 | - |
| [09-u34](u34-dp-appeal-independent-re-run-with.md) | DP-APPEAL: independent re-run with a different model and prompt variant | can_server | 1.5 | 263 | 09-u33, 09-u22, 09-u15 | - |
| [09-u35](u35-label-task-module-randomized-context-masked.md) | label_task module: randomized, context-masked, quorum fixed up front | can_server | 1.5 | 264 | 09-u34, 09-u30, 09-u02 | - |
| [09-u36](u36-policyproposalport-with-a-fake-adapter-label.md) | PolicyProposalPort with a fake adapter: label and audit seed to a proposal candidate file | can_server | 1.2 | 265 | 09-u35, 09-u32 | - |
| [09-u37](u37-re-decide-appealed-instances-under-the.md) | Re-decide appealed instances under the new policy version | can_server | 1.3 | 266 | 09-u36, 09-u27 | - |
| [09-u38](u38-emergency-and-legal-lane-module-with.md) | Emergency and legal lane module with NO-INSTANCE-OVERRIDE-1 route test | can_server | 1.5 | 267 | 09-u23, 09-u02, 09-u11 | - |
| [09-u39](u39-observability-metrics-without-content-alerts-and.md) | Observability: metrics without content, alerts and cost per accepted result | can_server | 1.3 | 268 | 09-u22 | - |
| [09-u40](u40-contribution-adapter-moderation-on-contribution-submit.md) | Contribution adapter: moderation on contribution submit and accept | can_server | 1.5 | 269 | 09-u24, 04-u02 | - |
| [09-u41](u41-proposal-and-decision-record-adapters-dp.md) | Proposal and decision-record adapters (DP-LEGALITY, DP-DECISION-RECORD, DP-STAGE) | can_server | 1.5 | 270 | 09-u40, 04-u04, 04-u05 | - |
| [09-u42](u42-task-and-verification-adapters-dp-verification.md) | Task and verification adapters (DP-VERIFICATION, DP-BLOCKER, DP-CLOSURE) | can_server | 1.5 | 271 | 09-u41, 05-u01, 05-u02 | - |
| [09-u43](u43-openapi-audit-operation-ids-response-key.md) | OpenAPI audit: operation ids, response key sets and no content leaks | can_server | 1.2 | 272 | 09-u25, 09-u29, 09-u34, 09-u35, 09-u32, 09-u38, 09-u37, 09-u39 | - |
| [09-u44](u44-e2e-with-fakemodel-part-1-seeded.md) | E2E with FakeModel part 1: seeded problem, pre-publication, update re-check | can_server | 1.5 | 273 | 09-u25, 09-u26, 09-u43, 02-u12 | - |
| [09-u45](u45-e2e-with-fakemodel-part-2-policy.md) | E2E with FakeModel part 2: policy change with notice, appeal, label task, re-decision | can_server | 1.5 | 274 | 09-u44, 09-u29, 09-u37, 09-u38 | - |
| [09-u46](u46-github-adapter-for-policyproposalport-founder-gated.md) | GitHub adapter for PolicyProposalPort (founder-gated) | can_server | 1.2 | 275 | 09-u36 | yes |
| [09-u47](u47-live-record-mode-run-of-the.md) | Live record-mode run of the pipeline with Claude (founder-gated) | can_server | 1 | 276 | 09-u13, 09-u44 | yes |
| [09-u48](u48-awaiting-review-and-held-screens-fail.md) | Awaiting review and held screens (fail closed) | can_app | 1.5 | 277 | 09-u25, 02-u25, 02-u24, 02-u16 | - |
| [09-u49](u49-decision-screens-hints-beside-fields-rules.md) | Decision screens: hints beside fields, rules, policy version | can_app | 1.5 | 278 | 09-u48, 09-u24, 10-u05, 02-u25 | - |
| [09-u50](u50-re-reviewed-under-a-new-policy.md) | Re-reviewed under a new policy version: notice, list and public short form | can_app | 1.5 | 279 | 09-u29, 09-u48, 02-u25 | - |
| [09-u51](u51-appeal-form-and-status-timeline.md) | Appeal form and status timeline | can_app | 1.5 | 280 | 09-u49, 09-u34, 09-u35, 09-u37, 10-u05 | - |
| [09-u52](u52-my-activity-drafts-awaiting-review-changes.md) | My activity: drafts, awaiting review, changes requested, notices | can_app | 1.2 | 281 | 09-u48, 09-u50, 02-u25 | - |
| [09-u53](u53-review-work-list-and-auditor-sample.md) | Review work list and auditor sample review | can_app | 1.5 | 282 | 09-u32, 02-u25, 02-u16 | - |
| [09-u54](u54-label-task-screen.md) | Label task screen | can_app | 1 | 283 | 09-u35, 09-u53 | - |
| [09-u55](u55-emergency-and-legal-lane-console.md) | Emergency and legal lane console | can_app | 1.2 | 284 | 09-u38, 09-u53 | - |
| [09-u56](u56-legal-stack-step-in-the-run-dag.md) | Legal-stack step in the run DAG: layers, retrieval, cumulative evaluation (LEGAL-STACK-1) | can_server | 1.5 | 285 | 09-u41, 10-u56, 09-u19 | - |
| [09-u57](u57-legal-cite-1-legal-finding-store-db.md) | LEGAL-CITE-1: legal_finding store, DB constraint, output schema and citation in every explanation | can_server | 1.3 | 286 | 09-u56 | - |
| [09-u58](u58-topic-forbidden-1-refuse-a-locally-forbidden.md) | TOPIC-FORBIDDEN-1: refuse a locally forbidden topic with a logged legal basis, per jurisdiction | can_server | 1.5 | 287 | 09-u57, 09-u24, 09-u25 | - |
| [09-u59](u59-dp-legality-outcomes-solution-only-illegal-goes.md) | DP-LEGALITY outcomes: solution-only illegal goes to stuck with layered payload; layer interpretation conflict holds with a conflict note | can_server | 1.3 | 288 | 09-u57, 09-u36, 09-u41 | - |
| [09-u60](u60-re-resolution-scan-rule-and-corpus-diff.md) | Re-resolution scan: rule and corpus diff, candidate selection, triggers (RERESOLVE-1) | can_server | 1.5 | 289 | 09-u27, 09-u57, 10-u57 | - |
| [09-u61](u61-re-resolution-review-job-run-dp-reresolution.md) | Re-resolution review job: run DP-RERESOLUTION through the DAG with retries and budgets | can_server | 1.5 | 290 | 09-u60, 09-u22, 09-u05, 10-u59 | - |
| [09-u62](u62-re-resolution-decision-feasibility-checks-keep-or.md) | Re-resolution decision: feasibility checks, keep or annotate or reopen, target state | can_server | 1.5 | 291 | 09-u61, 04-u07, 05-u04 | - |
| [09-u63](u63-t23-and-t24-reopen-transitions-in-the.md) | T23 and T24 reopen transitions in the transition engine, system-only, with history kept | can_server | 1.5 | 292 | 09-u62, 03-u05, 09-u23, 05-u04 | - |
| [09-u64](u64-reopen-and-annotation-notices-to-initiator-and.md) | Reopen and annotation notices to initiator and followers: extend the notices read model | can_server | 1.5 | 293 | 09-u63, 09-u29, 04-u07 | - |
| [09-u65](u65-reopened-under-policy-vx-notice-screen-and.md) | Reopened under policy vX: notice screen and reopened detail state | can_app | 1.5 | 294 | 09-u64, 09-u50, 05-u06 | - |
| [09-u66](u66-e2e-extension-a-policy-change-reopens-a.md) | E2E extension: a policy change reopens a solved seed problem, with notice, history, infeasible and appeal cases | can_server | 1.5 | 295 | 09-u45, 09-u64, 09-u63 | - |
| [09-u67](u67-e2e-the-legal-stack-end-to-end.md) | E2E: the legal stack end to end (cumulative layers, topic refusal versus stuck, conflict hold, citations) | can_server | 1.5 | 296 | 09-u59, 09-u58, 09-u45 | - |

## Risks
- Heavy shared files (src/db/schema.ts, drizzle/**, openapi/openapi.json) are single-owner paths: lane ordering and unit dependencies keep migrations sequential. Never hand-edit them.
- Unit overlap with plan 10 on the cache and fixture pack: the cache unit must read 10-u04 first and reuse its store if one exists; only the fixtures unit adds DP sections to the fixture pack.
- Superseded human-moderation units in plans 03 to 05 stay selectable until reworked; the supersession guards make order irrelevant but the rework planner should retire them.
- 03-u14 owns src/platform/jobs/** (cron lock table); this plan adds a payload queue under src/platform/queue/**. A single runner is intended later: 03-u14 should rebase onto the queue port.
- Prompts, thresholds and real rules live in can_policy; units use only fixtures. FakeModel can hide prompt quality problems: live record runs (founder-gated) and plan 11 personas cover that.
- A large unit list: 67 units, about 94 agent-hours. Run order is by priority and dependencies only.
