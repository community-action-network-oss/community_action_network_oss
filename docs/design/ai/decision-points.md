# Decision point catalog

A decision point (`DP-*`) is any place CAN would otherwise need a human consensus. Each has a trigger, inputs, a policy section in the pack, an output and a mode. Lifecycle transitions are referenced by id (T01 and so on) and defined only in [`docs/spec/01-slice-1-brief.md#4-lifecycle`](../../spec/01-slice-1-brief.md#4-lifecycle). Rule ids marked (proposed) do not yet exist in `docs/spec/constitution/rules.md`; the spec owner adds them when the DP ships.

Canonical ids follow the slice-1 brief. Names seen elsewhere that map here: DP-EMERGENCY is DP-CRISIS; DP-LAWFULNESS is DP-LEGALITY; DP-SOLVED is DP-VERIFICATION; DP-RELEVANCE is DP-CONTRIB-RELEVANCE.

**Lifecycle v2 (D-72, ADR 0015).** The fixed public stage sequence is replaced by a per-problem stage plan. Five DPs are new (DP-SOURCE-TRUST, DP-CRITERIA, DP-STAGE-PLAN, DP-PUBLISH, DP-STAGE-RESOLUTION). The old DP-STAGE is redefined out: its stage-transition meaning moves to DP-STAGE-RESOLUTION (is a stage's evidence enough?) and DP-STAGE-PLAN (is the plan or a change to it sound?). DP-VERIFICATION now judges only the final solved state against the problem's final acceptance criteria. Problem and stage state names are in `docs/spec` and the W10 vocabulary; T-ids below name the old table and are mapped by the spec owner.

## Shared contract

- **Inputs** are always the privacy gateway's output: redacted or pseudonymized field text, field refs, typed metadata (jurisdiction, state, contribution type, evidence tier), and the resolved rule slice. Never raw intake, emails, handles or account ids.
- **Output** (schema in the pack): `outcome`, `rule_ids[]`, `field_ref`, `revision_hint`, `confidence`, plus server stamps `policy_version`, `prompt_hash`, `model_id`.
- **Outcomes** are the six: `publish`, `needs_revision`, `reject`, `route_external`, `hold`, `escalate_human`. Each DP lists the subset it may emit. `escalate_human` is emitted only by DP-CRISIS and DP-LEGAL.
- **Blocking** DPs must finish before the gated transition. **Async** DPs run after the transition and can only trigger a re-moderation notice (never silent removal; see `triggers.md`).
- **Fail closed** default for every blocking DP: timeout, schema failure after one retry, missing pack, budget exhausted, unsupported language, or confidence below the floor after escalation gives `hold`. The item stays in its pre-publication state. Safety routing is the exception: static crisis resources are always shown (CRISIS-STATIC-1).
- **Aggregation** across DPs is deterministic code, never a model: `escalate_human` > `route_external` (crisis) > `reject` > `needs_revision` > `hold` > `publish` (ties broken by PREC-1 tier). `publish` needs every blocking DP to say `publish` above its floor.

## Catalog

| DP id | Trigger events | Gates (T-ids) | Mode | Allowed outcomes | Rules enforced |
|---|---|---|---|---|---|
| DP-ELIGIBILITY | problem submitted or resubmitted | T01, T03 | blocking | publish, needs_revision, reject, route_external, hold | SCOPE-1 |
| DP-PRIVACY | any text field or contribution submitted or edited | T01, T03, T04, contribution accept | blocking | publish, needs_revision, reject, hold | PRIV-GATE-1 |
| DP-FRAMING | problem submitted or edited | T01, T03, T04 | blocking | publish, needs_revision, hold | FRAME-1 (proposed) |
| DP-DUPLICATE | problem submitted; new published problem (context change) | T01, T04, T16 | blocking at submit, async after | publish, needs_revision, route_external, hold | DUP-1 (proposed) |
| DP-CONTRIB-RELEVANCE | contribution submitted or edited | contribution accept | blocking | publish, needs_revision, reject, hold | RELEVANCE-1, SOLUTION-ONLY-1 (proposed), contribution-type rules of the brief section 6 |
| DP-TONE | any public text submitted or edited | T01, T03, contribution accept | blocking | publish, needs_revision, reject, hold | TONE-1 (proposed) |
| DP-NAMING | any public text submitted or edited | T01, T03, contribution accept | blocking | publish, needs_revision, reject, hold | NAME-1 |
| DP-LEGALITY | proposal marked ready; law pack change | ST05 (solutions stage), CHOICE-GATE, T13 | blocking at CHOICE-GATE, async on law change | publish, needs_revision, reject, hold | LEGAL-GATE-1 |
| DP-DECISION-RECORD | decision record submitted | CHOICE-GATE | blocking | publish, needs_revision, hold | DECISION-REC-1 (proposed), LEGAL-GATE-1 |
| DP-VERIFICATION | all required stages resolved and final evidence added; solved proposed | final solved (old T12, T13, T14) | blocking | publish, needs_revision, reject, hold | VERIFY-1 (proposed), CRITERIA-1 |
| DP-CRISIS | any user text, every event | all text-bearing transitions | blocking, runs first | route_external, escalate_human, hold, publish (no signal) | CRISIS-STATIC-1, SCOPE-1 |
| DP-EVIDENCE-TIER | evidence URL added or edited; solved proposed | T01, ST05, T15, evidence add | blocking at add, async on tier recompute | publish, needs_revision, hold | EVID-URL-1, EVIDENCE-TIERS (constitution III.4) |
| DP-SOURCE-TRUST | draft submitted to review; review to publish run; `sources[]` edited | draft to `in_review`, publish | blocking | publish, needs_revision, hold | SOURCE-1 (proposed), EVID-URL-1 |
| DP-CRITERIA | draft submitted to review; review to publish run; criteria edited; every plan-change proposal | draft to `in_review`, publish, plan change | blocking | publish, needs_revision, reject, hold | CRITERIA-1 |
| DP-STAGE-PLAN | draft submitted to review; review to publish run; every plan-change proposal | draft to `in_review`, publish, plan change | blocking | publish, needs_revision, hold | STAGE-GATE-1, PLAN-CHANGE-1 |
| DP-PUBLISH | review to publish run | `in_review` to `active` | blocking, aggregates | publish, needs_revision, reject, route_external, hold | REVIEW-1, RECO-1 |
| DP-STAGE-RESOLUTION | every stage evidence submission; rule or policy change on a resolved stage (async) | stage `resolving` to `resolved`, `active` or `blocked` | blocking, async on rule change | publish (resolved), needs_revision, hold | STAGE-RESOLVE-1, STAGE-GATE-1 |
| DP-BLOCKER | stuck proposed | T13 | blocking | publish, needs_revision, hold | LEGAL-GATE-1, BLOCKER-1 (proposed) |
| DP-CLOSURE | closed or redirected proposed | T16, T17 | blocking | publish, needs_revision, reject, route_external, hold | CLOSE-1 (proposed) |
| DP-LEGAL | text or request that looks like a legal or law-enforcement matter | any text-bearing transition | blocking | escalate_human, hold, publish (no signal) | LEGAL-LANE-1 (proposed) |
| DP-APPEAL | appeal filed | appeal re-run (spec section 5) | async, bounded | publish, needs_revision, reject, route_external, hold | the rules of the appealed decision, APPEAL-1 |
| DP-RERESOLUTION | policy or legal-corpus change (async job over past resolutions) | reopen transition (spec owner assigns T-id), annotate | async, bounded | keep, reopen, annotate (plus hold) | RERESOLVE-1 (proposed), LEGAL-STACK-1 (proposed) |
| DP-ASSUMPTIONS | every content type at submit and update | every gated transition and contribution accept | blocking | publish, needs_revision, hold | ASSUMP-1 (proposed) |
| DP-COMPLETENESS | every content type at submit and update | every gated transition and contribution accept | blocking | publish, needs_revision, hold | COMPLETE-1 (proposed), STRUCT-ONLY-1 (proposed) |
| DP-ARCHIVE | problem reaches a terminal state | archive record publication | blocking for the record | publish, needs_revision, hold | ARCHIVE-1 |
| DP-REUSE-FIT | path suggestion computed | suggestion display | blocking for display | publish, needs_revision, hold | REUSE-CONTEXT-1, REUSE-CREDIT-1 |
| DP-STAGE-DRAFT | problem `active`, suggestion accepted | stage plan draft offered | blocking for the draft | publish, needs_revision, hold | REUSE-CREDIT-1, REUSE-NOBLOCK-1 |

In the transition table, the "moderator confirms" actors (T02, T04, T05, T15, T16, T17) become the moderation run; the table's required fields and side effects are unchanged. A `publish` from all blocking DPs completes T04 automatically. `needs_revision` completes T02. `reject` completes T05. The contribution accept step uses the same DPs on the contribution instead of the problem.

## Which DPs apply to which content type

Content is structured (D-58, `structured-content.md`): DPs read typed fields with `field_ref`, not a text blob. `x` = applies; `f` = only on named fields; blank = does not apply. DP-CRISIS, DP-LEGAL, DP-TONE, DP-PRIVACY, DP-NAMING, DP-ASSUMPTIONS and DP-COMPLETENESS apply to every type.

| DP | Problem | Contribution | Proposal | Decision record | Task / verification | Appeal | Policy proposal | Stage | Stage option | Stage choice | Stage evidence | Review recommendation |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| DP-ELIGIBILITY | x | | | | | | | | | | | |
| DP-FRAMING | f | | | | | | | | | | | |
| DP-DUPLICATE | f | | | | | | | | | | | |
| DP-SOURCE-TRUST | f (`sources[]`) | | | | | | | | | | f (source refs) | |
| DP-CRITERIA | f (final criteria) | | | | | | | f (stage criteria) | | | | f (criteria paths) |
| DP-STAGE-PLAN | f (`stage_plan`) | | | | | | | x | | | | f (plan paths) |
| DP-PUBLISH | x | | | | | | | | | | | f (open ones weighed) |
| DP-CONTRIB-RELEVANCE | | x | | | | | | | x | | | |
| DP-LEGALITY | | f (solution types) | x | x | | | | | x | x | | |
| DP-DECISION-RECORD | | | | x | | | | | | x | | |
| DP-STAGE-RESOLUTION | | | | | | | | x | | | x | |
| DP-VERIFICATION | f (final solved) | f (verification) | | | x | | | | | | | |
| DP-EVIDENCE-TIER | f | f (evidence types) | f | | x | f | | | | | x | |
| DP-BLOCKER, DP-CLOSURE | x (transitions) | | x | x | x | | | f (blocked) | | | | |
| DP-APPEAL | | | | | | x | | | | | | |
| DP-RERESOLUTION | past resolutions (all types) | | | decision record rechecked | | | | resolved stages (re-resolution) | | | | |
| DP-ASSUMPTIONS | x | x | x | x | x | x | x | x | x | x | x | x |
| DP-COMPLETENESS | x | x | x | x | x | x | x | x | x | x | x | x |
| DP-ARCHIVE, DP-REUSE-FIT, DP-STAGE-DRAFT | x (terminal state, `context_profile`) | | | | | | | f (draft plan) | | | | |

Archive DPs (D-76) work on `archive_record` and `path_suggestion`; see `archive-reuse.md`.

Review recommendations (`review_recommendation`) are private volunteer content. They are only checked by the always-on DPs (privacy, naming, tone, crisis) so a volunteer cannot leak or abuse through them; they are never published and never moderated for merit. The DPs that judge a recommendation's target (DP-CRITERIA, DP-STAGE-PLAN) run on the poster's accepted edit, not on the recommendation.

Policy proposals are checked by CI and the panel (`amendment-loop.md`); the DPs above run on their text fields only for privacy, naming, tone and crisis, so the proposal channel cannot be used to leak or abuse.

## Policy-pack values: scarcity and minimum effort

The slice-1 brief and Notion's principle ("limits must be policy-driven, measurable and adjustable rather than hard-coded") become **pack values** in `can_policy` (`limits.yaml` per layer and jurisdiction, with a version and hash like any other pack file). Code reads them; it never contains a number. A change is a policy PR with replay (what would have been blocked). Rate-limit explanations never disclose anti-abuse internals. Initial values are slice-1 defaults; final lengths are `OQ-cooldown-lengths` and `OQ-eligible-categories`.

| Value key | Meaning | Slice-1 default |
|---|---|---|
| `caps.problems_per_account_per_period` | Problems one account may submit | 3 per 7 days |
| `caps.contributions_per_account_per_day` | All contribution types | 20 (per problem: 8) |
| `caps.proposals_per_account_per_problem` | Proposals | 2 |
| `caps.open_drafts_per_account` | Unsubmitted drafts | 5 |
| `caps.appeals_per_account_per_period` | Appeals | 3 per 7 days |
| `fields.<type>.<field>.min_chars` / `max_chars` | Meaningful length bounds from the schema's `x-guidance` | e.g. `problem.condition` 40 to 400; `causal_hypothesis.statement` 40 to 600 |
| `fields.<type>.list.min` / `max` | List sizes (facts, evidence, assumptions) | e.g. observed facts 1 to 10; assumptions 1 to 8 |
| `cooldowns.between_contributions_same_problem` | Reflection delay (OQ-cooldown-lengths) | 2 minutes |
| `cooldowns.after_rejected_contribution` | After a `reject` | 10 minutes |
| `cooldowns.exempt_types` | Never delayed | `progress_update`, `verification_evidence` |
| `risk_period.burst_threshold` | Account or device burst that tightens caps | pack-defined, hidden from the public explanation |

Counters are keyed by account and the pack's identity tier or device signal as policy allows. Caps and bounds are measured: the report in `simulation.md` and the monitoring in `amendment-loop.md` track hit rates and false-block rates, so values can be tuned from simulation before real traffic ("authorize simulation-based tuning before values are fixed", Notion open item).

## Per-DP notes

**DP-ELIGIBILITY.** Decides public structural condition versus individual matter. Inputs: title, structural statement, affected scope, desired outcome, coarse area, jurisdiction. `route_external` carries a route text from the jurisdiction pack (SCOPE-1: decline with a closed reason code and an external route, keep no narrative). Fail closed: `hold`; item stays `submitted`. Human lane: none.

**DP-PRIVACY.** Runs after deterministic redaction in the gateway; the DP judges residual and indirect identifiers (a rare combination of place, role and time) that patterns miss. Zero positives may become visible (PRIV-GATE-1). Any uncertainty on a person identifier gives `needs_revision` with the span, never `publish`. Human lane: none; a suspected exposed minor or victim routes through DP-CRISIS.

**DP-FRAMING.** Checks the statement describes a shared condition, an institutional failure or pattern, a scope and an outcome, not a single complaint. Revision hints are rewrites in the person's own terms. Never rewrites text itself: the AI suggests, the person edits (spec 14 output control).

**DP-DUPLICATE.** Inputs are salted-fingerprint matches (never text of other private drafts) and candidate published problems retrieved by authorized search (public only). Outcome `route_external` is not used; a match gives `needs_revision` with `duplicate_of` suggestion, or at T16 closes as duplicate. Post-publication: a new related problem triggers an async re-check of candidates.

**DP-CONTRIB-RELEVANCE.** Checks the contribution fits its declared type and the current state's allowed types (brief section 6), is relevant to the problem, and is solution-oriented where the type requires. Contribution `personal_experience` also passes DP-PRIVACY.

**DP-TONE.** Abuse, threats, incitement, escalation risk, conflict framing. A threat of violence also triggers DP-CRISIS (running first). Revision hints suggest restating the facts.

**DP-NAMING.** Detects PERSON entities in public text and suggests the office alias (NAME-1). Exception only when the election layer is on for the jurisdiction (constitution XI.2).

**DP-LEGALITY.** Dual legality gate on a proposal: constitution and jurisdiction pack. A blocked proposal yields the `stuck` payload (blocking constraint, source and version, blocked actions, recheck condition) which DP-BLOCKER then validates for T13. Never presented as legal advice (spec 06). On a law-pack update, async re-check can move an item to a re-review notice, not to a state change by itself (pause-review principle).

**DP-DECISION-RECORD.** Completeness and legitimacy of the record, now written for each `stage_choice`: chosen option or steps, decision method (set in the stage metadata; default poster chooses after community input) and its authority, rationale, decider, authority, dissent notes, legal-gate record. Checks completeness and consistency, never whether the decision is good.

**DP-VERIFICATION.** Checks that evidence tagged `verification_evidence` actually bears on the proposal's success metric and that the outcome statement answers it. A completed task alone is not solved. Threshold is `OQ-solved-evidence-threshold`; the pack carries the current default. Confirmation at T15 is a run outcome, labeled with the policy version.

**DP-CRISIS.** Runs first on every text-bearing event, in parallel with a deterministic keyword layer so detection never depends on a model. Positive signal: `route_external` to static emergency resources (shown regardless of anything else), the text is not published, and, for credible imminent danger only, `escalate_human` to the emergency lane. Fails open for safety: if the model is down, the static crisis notice is already on every form (CRISIS-STATIC-1) and the item is held, not lost.

**DP-LEGAL.** Detects subpoena, law-enforcement or legal-process content, requests about specific people, and legally risky claims needing counsel. Emits `escalate_human` to the legal lane only; otherwise no signal.

**DP-EVIDENCE-TIER.** URL-only evidence (EVID-URL-1): scheme and category checks stay deterministic; the DP assigns a tier by constitution III.4 and checks the claim text matches the source description. It reads the URL's stored metadata, not the live page (no tools, no fetching by agents). Tier recompute is async and sets the derived `investigation_needed` flag.

**DP-SOURCE-TRUST.** Judges `sources[]` of the problem: each `source_ref` carries a URI and a `category` (official record, statistics body, court or legislature, reputable media, research, civil society, other). Deterministic checks first (scheme, category allowlist, EVID-URL-1). The model reads the stored metadata (not the live page, no fetching) and asks: is the source trusted for its category, and does it establish that the issue is real (authenticity), not merely mention it? A problem needs at least one trusted source that establishes the condition. `needs_revision` names the source and the gap. It does not replace DP-EVIDENCE-TIER, which tiers evidence offered later.

**DP-CRITERIA.** Checks acceptance criteria, final (problem) or per stage: each criterion is measurable (a way to tell it happened), lawful (no criterion requires an unlawful act, DP-LEGALITY layers apply), fitting the problem (the final criteria restate `desired_outcome` in testable form; stage criteria serve their stage goal), and not satisfied by an unrelated event. A problem without final criteria never passes (CRITERIA-1). Hints rewrite vague criteria as testable ones in the poster's terms.

**DP-STAGE-PLAN.** Structural and coherence checks on `stage_plan`: a well-formed DAG (no cycle, no dangling `depends_on`, one reachable path to every required stage), every node has a name, goal, `decision_method` and at least one criterion, stages cover the final criteria (each final criterion is served by some stage), and parallel stages do not contradict each other. An absent optional plan passes: the default is the `classic-5` template or a single stage chosen at publication. It runs on draft submit, the review to publish run, and every plan-change proposal after publication (PLAN-CHANGE-1); a change that would un-resolve a resolved stage or drop one with evidence is `needs_revision` unless the proposal states a reason.

**DP-PUBLISH.** The publication decision (D-72 step 3). Inputs: the typed outcomes of the other blocking DPs on the whole structured problem, the volunteer review summary (counts of open, accepted and declined recommendations, with the poster's reasons, no volunteer identities), and community guidelines from the pack. Deterministic aggregation first; then a model read weighs unresolved recommendations: an open recommendation on a field a DP also flagged forces `needs_revision` there; an open recommendation alone never blocks, but is shown as a hint (REVIEW-1, RECO-1). Publish requires that review ran and every recommendation has an accept or decline with a reason, or the pack's review window has closed with none open. `needs_revision` completes the move to `needs_revision` with hints beside fields; `reject` is appealable; `hold` leaves the problem in `in_review`. Never emits `escalate_human` (DP-CRISIS and DP-LEGAL do).

**DP-STAGE-RESOLUTION.** Judges one stage after `stage_evidence` is submitted: do the evidence and the recorded `stage_choice` meet the stage's acceptance criteria? Inputs: stage criteria, the chosen option and steps, evidence refs with tiers (DP-EVIDENCE-TIER) and the poster's statements. Outcomes: `publish` (stage resolved; successors with all predecessors resolved become `ready`, STAGE-GATE-1), `needs_revision` (criteria not met; hints name the criterion, the stage goes back to `active`), `hold`. Evidence that cites a blocker routes to DP-BLOCKER. Runs on every evidence submission and, async, when rules change for an already resolved stage (feeds DP-RERESOLUTION). Resolution is appealable (STAGE-RESOLVE-1).

**DP-VERIFICATION.** Final solved only. Runs when every required stage is `resolved` and a solved proposal carries final evidence. It checks the final evidence and the stage outcomes against the problem's final acceptance criteria, criterion by criterion; a resolved stage or a completed task alone is not solved. Threshold is `OQ-solved-evidence-threshold`; the pack carries the default. Confirmation is a run outcome labeled with the policy version. A failed run lists the unmet criteria and leaves the problem `active`.

**DP-BLOCKER.** Verifies the stuck payload has a real blocking constraint with source and version, a recheck date and a next lawful route.

**DP-CLOSURE.** Verifies the closure reason code matches the facts (duplicate with `duplicate_of`, out of scope, no longer relevant) and that redirect destinations are institutions or approved partners, not individuals.

**DP-RERESOLUTION.** Runs in the re-resolution review job (`triggers.md`), not on a user event. Inputs: the archive record (`archive_record`: terminal or `stuck` state, decision record, legal-gate record with its layer citations, policy version) and a **diff of the rules** (changed articles, rules, thresholds between the version decided under and the new active version). It asks one question: does the new rule change the conclusion? Outcomes: `keep` (conclusion stands; a note is stored, nothing shown unless the owner asks), `annotate` (the record gains a visible note, "Re-checked under policy vX, conclusion unchanged but see Y", or the conclusion changes but reopening is infeasible), `reopen` (conclusion changes and reopening is feasible), or `hold` (cannot decide, retried under backoff). It never emits `reject` or deletes anything. A `reopen` outcome requires every feasibility criterion: the problem still exists, the jurisdiction is still enabled, the initiator or a steward can be notified, and reopening does not undo a lawful completed implementation without a new proposal (OQ-reresolution-feasibility, proposed; these are the defaults). Fail closed: `hold`, record unchanged. Appealable under DP-APPEAL.

**DP-ASSUMPTIONS.** Holds back factual, causal, legal and scope assumptions stated as fact. Returns `needs_revision` with one hint per field, never a silent reject or edit. An honestly marked assumption passes. Detail in `structured-content.md`.

**DP-COMPLETENESS.** Deterministic field, enum, length and filler checks, then a model read that each required field is a meaningful answer to its own question. Detail in `structured-content.md`.

**DP-APPEAL.** Independent re-run of the appealed DP set with a different model or prompt variant, see `appeals.md`.

## Human-lane conditions (complete list)

1. DP-CRISIS credible imminent danger.
2. DP-LEGAL legal process, law-enforcement request, or a claim needing counsel.
3. An unresolvable PREC-1 conflict that also touches rights or crisis tier (the state stays unchanged and is queued to the lane).

Everything else that cannot be decided is `hold` and retried or waits for a better policy version; it never goes to a per-item human.
