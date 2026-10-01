# Decision point catalog

A decision point (`DP-*`) is any place CAN would otherwise need a human consensus. Each has a trigger, inputs, a policy section in the pack, an output and a mode. Lifecycle transitions are referenced by id (T01 and so on) and defined only in [`docs/spec/01-slice-1-brief.md#4-lifecycle`](../../spec/01-slice-1-brief.md#4-lifecycle). Rule ids marked (proposed) do not yet exist in `docs/spec/constitution/rules.md`; the spec owner adds them when the DP ships.

Canonical ids follow the slice-1 brief. Names seen elsewhere that map here: DP-EMERGENCY is DP-CRISIS; DP-LAWFULNESS is DP-LEGALITY; DP-SOLVED is DP-VERIFICATION; DP-RELEVANCE is DP-CONTRIB-RELEVANCE.

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
| DP-DUPLICATE | problem submitted; new published problem (context change) | T01, T04, T19 | blocking at submit, async after | publish, needs_revision, route_external, hold | DUP-1 (proposed) |
| DP-CONTRIB-RELEVANCE | contribution submitted or edited | contribution accept | blocking | publish, needs_revision, reject, hold | RELEVANCE-1, SOLUTION-ONLY-1 (proposed), contribution-type rules of the brief section 6 |
| DP-TONE | any public text submitted or edited | T01, T03, contribution accept | blocking | publish, needs_revision, reject, hold | TONE-1 (proposed) |
| DP-NAMING | any public text submitted or edited | T01, T03, contribution accept | blocking | publish, needs_revision, reject, hold | NAME-1 |
| DP-LEGALITY | proposal marked ready; law pack change | T09, T11, T15 | blocking at T11, async on law change | publish, needs_revision, reject, hold | LEGAL-GATE-1 |
| DP-DECISION-RECORD | decision record submitted | T11 | blocking | publish, needs_revision, hold | DECISION-REC-1 (proposed), LEGAL-GATE-1 |
| DP-VERIFICATION | verification evidence added; solved proposed | T12, T13, T14 | blocking | publish, needs_revision, reject, hold | VERIFY-1 (proposed) |
| DP-CRISIS | any user text, every event | all text-bearing transitions | blocking, runs first | route_external, escalate_human, hold, publish (no signal) | CRISIS-STATIC-1, SCOPE-1 |
| DP-EVIDENCE-TIER | evidence URL added or edited; solved proposed | T01, T08, T14, evidence add | blocking at add, async on tier recompute | publish, needs_revision, hold | EVID-URL-1, EVIDENCE-TIERS (constitution III.4) |
| DP-STAGE | stage move proposed | T08, T09, T10, T12, T16, T17, T18 | blocking | publish, needs_revision, hold | STAGE-1 (proposed) |
| DP-BLOCKER | stuck proposed | T15 | blocking | publish, needs_revision, hold | LEGAL-GATE-1, BLOCKER-1 (proposed) |
| DP-CLOSURE | closed or redirected proposed | T19, T20 | blocking | publish, needs_revision, reject, route_external, hold | CLOSE-1 (proposed) |
| DP-LEGAL | text or request that looks like a legal or law-enforcement matter | any text-bearing transition | blocking | escalate_human, hold, publish (no signal) | LEGAL-LANE-1 (proposed) |
| DP-APPEAL | appeal filed | appeal re-run (spec section 5) | async, bounded | publish, needs_revision, reject, route_external, hold | the rules of the appealed decision, APPEAL-1 |

In the transition table, the "moderator confirms" actors (T02, T04, T05, T14, T19, T20) become the moderation run; the table's required fields and side effects are unchanged. A `publish` from all blocking DPs completes T04 automatically. `needs_revision` completes T02. `reject` completes T05. The contribution accept step uses the same DPs on the contribution instead of the problem.

## Per-DP notes

**DP-ELIGIBILITY.** Decides public structural condition versus individual matter. Inputs: title, structural statement, affected scope, desired outcome, coarse area, jurisdiction. `route_external` carries a route text from the jurisdiction pack (SCOPE-1: decline with a closed reason code and an external route, keep no narrative). Fail closed: `hold`; item stays `submitted`. Human lane: none.

**DP-PRIVACY.** Runs after deterministic redaction in the gateway; the DP judges residual and indirect identifiers (a rare combination of place, role and time) that patterns miss. Zero positives may become visible (PRIV-GATE-1). Any uncertainty on a person identifier gives `needs_revision` with the span, never `publish`. Human lane: none; a suspected exposed minor or victim routes through DP-CRISIS.

**DP-FRAMING.** Checks the statement describes a shared condition, an institutional failure or pattern, a scope and an outcome, not a single complaint. Revision hints are rewrites in the person's own terms. Never rewrites text itself: the AI suggests, the person edits (spec 14 output control).

**DP-DUPLICATE.** Inputs are salted-fingerprint matches (never text of other private drafts) and candidate published problems retrieved by authorized search (public only). Outcome `route_external` is not used; a match gives `needs_revision` with `duplicate_of` suggestion, or at T19 closes as duplicate. Post-publication: a new related problem triggers an async re-check of candidates.

**DP-CONTRIB-RELEVANCE.** Checks the contribution fits its declared type and the current state's allowed types (brief section 6), is relevant to the problem, and is solution-oriented where the type requires. Contribution `personal_experience` also passes DP-PRIVACY.

**DP-TONE.** Abuse, threats, incitement, escalation risk, conflict framing. A threat of violence also triggers DP-CRISIS (running first). Revision hints suggest restating the facts.

**DP-NAMING.** Detects PERSON entities in public text and suggests the office alias (NAME-1). Exception only when the election layer is on for the jurisdiction (constitution XI.2).

**DP-LEGALITY.** Dual legality gate on a proposal: constitution and jurisdiction pack. A blocked proposal yields the `stuck` payload (blocking constraint, source and version, blocked actions, recheck condition) which DP-BLOCKER then validates for T15. Never presented as legal advice (spec 06). On a law-pack update, async re-check can move an item to a re-review notice, not to a state change by itself (pause-review principle).

**DP-DECISION-RECORD.** Completeness and legitimacy of the record: chosen proposal, method, rationale, decider, authority, dissent notes, legal-gate record. Checks completeness and consistency, never whether the decision is good.

**DP-VERIFICATION.** Checks that evidence tagged `verification_evidence` actually bears on the proposal's success metric and that the outcome statement answers it. A completed task alone is not solved. Threshold is `OQ-solved-evidence-threshold`; the pack carries the current default. Confirmation at T14 is a run outcome, labeled with the policy version.

**DP-CRISIS.** Runs first on every text-bearing event, in parallel with a deterministic keyword layer so detection never depends on a model. Positive signal: `route_external` to static emergency resources (shown regardless of anything else), the text is not published, and, for credible imminent danger only, `escalate_human` to the emergency lane. Fails open for safety: if the model is down, the static crisis notice is already on every form (CRISIS-STATIC-1) and the item is held, not lost.

**DP-LEGAL.** Detects subpoena, law-enforcement or legal-process content, requests about specific people, and legally risky claims needing counsel. Emits `escalate_human` to the legal lane only; otherwise no signal.

**DP-EVIDENCE-TIER.** URL-only evidence (EVID-URL-1): scheme and category checks stay deterministic; the DP assigns a tier by constitution III.4 and checks the claim text matches the source description. It reads the URL's stored metadata, not the live page (no tools, no fetching by agents). Tier recompute is async and sets the derived `investigation_needed` flag.

**DP-STAGE.** Completeness of stage summaries (T08), proposal sets with mechanism, metric, risks and verification plan (T09), reasons for reopening (T10), task completion records (T12), cleared-blocker notes (T16), pause reason and resume condition (T17, T18). Structural checks plus a model read for sufficiency.

**DP-BLOCKER.** Verifies the stuck payload has a real blocking constraint with source and version, a recheck date and a next lawful route.

**DP-CLOSURE.** Verifies the closure reason code matches the facts (duplicate with `duplicate_of`, out of scope, no longer relevant) and that redirect destinations are institutions or approved partners, not individuals.

**DP-APPEAL.** Independent re-run of the appealed DP set with a different model or prompt variant, see `appeals.md`.

## Human-lane conditions (complete list)

1. DP-CRISIS credible imminent danger.
2. DP-LEGAL legal process, law-enforcement request, or a claim needing counsel.
3. An unresolvable PREC-1 conflict that also touches rights or crisis tier (the state stays unchanged and is queued to the lane).

Everything else that cannot be decided is `hold` and retried or waits for a better policy version; it never goes to a per-item human.
