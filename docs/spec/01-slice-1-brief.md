# Slice 1 brief

Load this file with `02-agent-rules.md` for any slice-1 work. It is the **single owner** of the lifecycle state and transition table, the contribution-type enum, the slice-1 defaults and the minimal entity list. Other files link here.

Every default below is reversible and logged in `DECISIONS.md` (D-12 to D-18, D-22, D-51 to D-53). Questions the community can help answer are in `docs/open-questions/`. The binding, testable rules are in `constitution/rules.md` (rule IDs such as `MOD-EXPLAIN-1`, `DRAFT-TTL-1`, `OWN-1`, `LEGAL-GATE-1`, `PUB-FAILCLOSED-1`, `POLICY-CITE-1`, `INTERIM-1`, `APPEAL-1`, `DECENT-1`); the precedence order is Constitution I.2.

## 1. What slice 1 is

Slice 1 is the smallest build that runs one complete, honest problem lifecycle end to end.

- Invite-only writes, public reads.
- Fictional data only, one fictional jurisdiction, English only.
- Flow: intake, AI moderation run under the ratified policy pack, typed contributions, proposals, decision record, tasks, verification, terminal state, plus appeals that feed the policy loop.
- The full AI moderation pipeline is in slice 1 (D-51, D-53): privacy gateway, decision points, moderation runs, run records, replay diff, appeal-to-example loop. Tests and night runs use a deterministic `FakeModel` plus recorded responses, so they make no paid calls. The live Anthropic provider is founder-gated by an API key and a spend cap (`15-ai-inference.md`).
- Not in slice 1: playbooks, governance issues, stewardship groups, live provider calls without the founder gate, uploads, the problem graph (only `duplicate_of`), federation, election features, payments.
- Verified on web only (D-8). Native builds must still bundle. Native sessions and device tests are founder-gated.
- Done means: an end-to-end script over fictional seed data walks one problem from `draft` to `solved`, plus one rejection with a revise-and-resubmit, one appeal that ends in a labeled example and a policy-pack change fixture, and one `stuck` path, and passes on `FakeModel`.

Pilot-ready and Gate X (`18-phases-gates.md`) are later, stricter bars.

## 2. Slice-1 defaults

1. **Scope:** section 1 above. Non-fictional data stays out of scope until the blockers in `docs/open-questions/` (emergency routing, legal review) are resolved.
2. **AI:** deterministic checks plus a moderation run (`06-moderation-geo-governance.md`) at every decision point before publication, on every update and after publication. The privacy gateway is mandatory (`14`). Fail closed (`PUB-FAILCLOSED-1`). Live model calls need the founder gate (API key, spend cap); until then `FakeModel` and recorded responses. Public wording: "People make every rule. AI applies it, explains it and answers to appeal."
3. **Accounts:** see section 8.
4. **Lifecycle:** see section 4. Status styling is neutral.
5. **Authority:** the initiator is provisional steward. The moderation run decides publish, `needs_revision`, `reject`, route, solved, closed and redirected under policy pack v1, which transitional founder stewardship ratifies (Constitution V.4, VIII.2, rule `INTERIM-1`). Every decision cites rule ids and the policy version. Humans change the policy, never a single outcome, except the logged emergency/legal lane (`NO-INSTANCE-OVERRIDE-1`). Appeals: section 5.
6. **Moderation decisions:** carry explanation fields (section 5).
7. **Drafts:** section 9.
8. **Pending review screen:** section 9.
9. **Decentralization seams only** (D-22): UUIDv7 ids, `origin_node_id`, `protocol_version`, an append-only events table with a nullable `prev_hash`. Signing, export and AT Protocol are deferred (`12-decentralization-ready.md`).
10. **Accessibility and RTL baseline:** section 11.

Other defaults:
- **Eligibility:** a fictional public problem that passes the deterministic checks and the moderation run. Placeholder category list: public services, infrastructure, environment, safety, accessibility. The real list is `OQ-eligible-categories`.
- **Decision method:** a recorded decision, no vote (`OQ-decision-method`).
- **Visitors and core participants:** a self-declared coarse area, display only (`OQ-location-verification`). Nobody is excluded.
- **Visibility classes:** `private` (draft, submitted, needs_revision, rejected: initiator, the emergency/legal lane, and auditors on sampled, context-masked decisions), `public` (published problems, readable by guests). Auditor-only notes exist but are never public (`OQ-visibility-classes`).
- **Search indexing:** all pages `noindex` (`OQ-guest-read-search-indexing`).
- **Evidence:** URL references only, no uploads. **Links between problems:** `duplicate_of` only.
- **Language:** English only. Text that looks non-English (script check) is held with a "language not yet supported" label (fail closed) and may get `needs_revision` (`OQ-unsupported-language`).
- **Age:** 18+, self-declared (`OQ-age-default`).
- **Cooldowns** (`OQ-cooldown-lengths`): 2 minutes between contributions by one account on one problem; 10 minutes after a rejected contribution; none for progress updates and verification evidence.
- **Emergency:** every form shows a static "If someone is in danger, contact your local emergency number" notice (`OQ-emergency-routing`).
- **Email provider, domain, hosting region:** none; local only (`OQ-hosting-region`, `OQ-domain`).

## 3. Roles in slice 1

`guest` (reads public problems), `member` (signed in), `initiator` (member who submitted a problem; provisional steward of that problem, owns nothing), `moderator`. A `moderator` no longer decides single items. It is the small emergency/legal lane, an auditor of sampled decisions, or a labeler of appeal and eval tasks. Legislators and `can_policy` maintainers act through policy PRs (`docs/design/ai/amendment-loop.md`). Experts, institutional representatives, stewardship groups, reviewers and election roles are deferred (`04-roles-stewardship.md`). The initiator does not own the problem and decides for no one but themselves.

## 4. Lifecycle

### 4.1 State classes

- **Pre-publication (private):** `draft`, `submitted`, `needs_revision`.
- **Working (public):** `eligible`, `solution_development`, `solution_selection`, `implementation`, `verification`.
- **Resting (public, not terminal):** `paused`, `stuck`.
- **Terminal:** `solved`, `closed`, `redirected`, `withdrawn` (public, T21); `rejected`, `withdrawn` before publication (private).

Notes on the model:

- `automated_review` is a synchronous check inside T01, not a state. A hard failure keeps the problem in `draft` with field hints and creates no moderation decision.
- `eligible` means the moderation run passed it and the problem is published. In slice 1 it is also the discovery stage. `discovery` and `root_cause_analysis` split out later.
- `appealed` is not a state. An appeal attaches to a moderation decision (section 5).
- `investigation_needed` is not a state or a tier. It is a **derived flag**, true when the strongest evidence tier on a published problem is below the investigation threshold. Evidence tiers are defined in the constitution (Constitution III.4, `EVIDENCE-TIERS`).
- `paused` is not terminal: it requires a reason and a resume condition. `stuck` means documented effort has hit a blocker; it is the public "accountable unresolved record".
- Reopening terminal states is deferred. Pre-publication states are visible only to the initiator and the emergency/legal lane.
- Invalid transitions fail atomically. Every transition writes a `problem_event` (actor, time, from, to, reason, evidence ids) in the same transaction.
- `W` below means any working state: `eligible`, `solution_development`, `solution_selection`, `implementation`, `verification`.
- "Proposes / decides": the initiator (provisional steward) records a pending transition; the moderation run applies the policy and confirms or declines it, citing rule ids. No human confirms an ordinary transition. `escalate_human` (emergency, crisis, law enforcement) goes to the logged emergency/legal lane.
- Decision points are the `DP-*` ids in the table (twelve in slice 1; catalog: `docs/design/ai/decision-points.md`). Outcomes: `publish`, `needs_revision`, `reject`, `route_external`, `hold` (fail closed), `escalate_human`.

### 4.2 Transition table

| id | from | to | actor | required fields | side effects | public label | plain explanation | next action |
|---|---|---|---|---|---|---|---|---|
| T00 | (none) | draft | initiator | none | autosaved locally; saved to the server once signed in; no event until T01 | Draft | "Only you can see this. Nothing is shared until you submit." | Submit when ready, or discard (T22). |
| T01 | draft | submitted | initiator | title, structural statement, affected scope, coarse area, 1+ evidence URL or a "no evidence yet" note, no-identifiers confirmation; synchronous checks pass | checks run (identifiers and contact details, secrets, URL scheme, length, language script, repost fingerprint); version snapshot; event; fingerprint stored; blocking moderation run starts (fails closed to `hold`) | Awaiting review | "Your problem is being checked against the community's published rules. Nothing is public yet." | Edit or withdraw while you wait. |
| T02 | submitted | needs_revision | moderation run (`DP-FRAMING`, `DP-PRIVACY`, `DP-NAMING`, `DP-TONE`, `DP-CONTRIB-RELEVANCE`) | moderation decision (rule_ids, field refs, revision hints, appealable_until) | email to initiator; draft kept; hints shown beside fields | Changes requested | "The review asked for changes before this can be published. Each note names the rule and sits next to the part it is about." | Edit the marked fields and resubmit. |
| T03 | needs_revision | submitted | initiator | at least one flagged field changed | new version snapshot; checks re-run; hints marked addressed | Awaiting review | "Your changes are back in review." | Wait for the decision email. |
| T04 | submitted | eligible | moderation run (`DP-ELIGIBILITY`, `DP-PRIVACY`, `DP-FRAMING`, `DP-DUPLICATE`, `DP-NAMING`, `DP-TONE`, `DP-EVIDENCE-TIER`) | decision with rule_ids; jurisdiction; `investigation_needed` flag computed | published; handle shown; initiator becomes provisional steward; guests can read; email to initiator; fingerprint purged | Open: gathering facts | "The community's rules were applied and this was published. Anyone can now ask questions and add evidence." | Add evidence or answer questions. |
| T05 | submitted | rejected | moderation run (same `DP-*` set; `DP-CRISIS` routes to the emergency/legal lane) | decision with rule_ids, public explanation, optional revision hint, appealable_until | email; deletion date = decision date + 30 days shown to initiator; fingerprint kept 90 days | Not accepted | "This was not accepted, for the reasons given. Your text is deleted on the date shown." | Appeal before the date shown, or copy your text and start a new draft. |
| T06 | submitted | withdrawn | initiator | none (reason optional) | deletion date + 30 days; fingerprint kept 90 days | Withdrawn | "You withdrew this. It was never public." | Start a new draft if you wish. |
| T07 | needs_revision | withdrawn | initiator, or system after 30 days without activity (reminder at day 23) | none | as T06 | Withdrawn | "Withdrawn by you, or after 30 days without changes." | Start a new draft. |
| T08 | eligible | solution_development | initiator | stage summary: what is established, what is disputed; 1+ evidence URL or a documented missing-evidence note | event | Open: developing solutions | "Enough is known to start proposing fixes." | Add proposals. |
| T09 | solution_development | solution_selection | initiator | 2+ proposals each with mechanism, success metric, risks and verification plan, or 1 proposal plus a documented "no alternatives" note | event | Open: choosing a solution | "Proposals are ready to compare." | Review the proposals and the decision. |
| T10 | solution_selection | solution_development | initiator | reason (new information or objection) | event | Open: developing solutions | "New information reopened the options." | Revise or add proposals. |
| T11 | solution_selection | implementation | initiator, gated by moderation run (`DP-DECISION-RECORD`, `DP-LEGALITY`) | decision record: chosen proposal, method, rationale, decider, authority, dissent notes (optional); legal-gate check record (`LEGAL-GATE-1`); 1+ task | decision record published; tasks visible | In progress | "A solution was chosen and the reason is on record. Work is being tracked." | Claim a task. |
| T12 | implementation | verification | initiator | all required tasks done or dropped with a reason; verification plan present | event | Checking the result | "Work is done. People are checking whether it fixed the problem." | Add verification evidence. |
| T13 | verification | implementation | initiator or moderation run (`DP-VERIFICATION`) | failed-check note with evidence | event; new tasks allowed | In progress | "The check showed more work is needed." | Pick up the new tasks. |
| T14 | verification | solved | initiator proposes, moderation run decides (`DP-VERIFICATION`, `DP-EVIDENCE-TIER`) | verification evidence (1+ URL tagged `verification_evidence`) and an outcome statement against the chosen proposal's success metric | Resolution record created; followers emailed; policy version shown | Solved | "The rules for evidence were applied and the result matches the goal, using the evidence shown." Decided under policy vX. | Read the Resolution record. |
| T15 | W | stuck | initiator or moderation run (`DP-LEGALITY`) | blocker statement (the blocking constraint), its source and version, blocked actions, recheck condition (the review date), next lawful escalation route, 1+ documented attempt (task, evidence or the legal-gate record) | event; blocker shown publicly | Stuck | "Documented work hit a blocker. The blocker and the next route are shown." | Follow the escalation route or add information. |
| T16 | stuck | implementation | initiator or moderation run (`DP-LEGALITY`) | blocker-cleared note with evidence | event | In progress | "The blocker was cleared." | Continue the tasks. |
| T17 | W | paused | initiator or moderation run | reason code, resume condition, review date (default at most 90 days) | stores the state to resume; event | Paused | "On hold: [reason]. Resumes when: [condition]." | Wait, or meet the condition. |
| T18 | paused | resume state | initiator or moderation run | resume-condition-met note | event | (previous label) | "The condition for resuming was met." | Continue. |
| T19 | W, paused or stuck | closed | initiator proposes, moderation run decides (`DP-DUPLICATE`, `DP-ELIGIBILITY`) | reason code (duplicate, invalid, out of scope, no longer relevant, initiator request, rule violation), plain explanation; `duplicate_of` if duplicate | Resolution record (closed); policy version shown; followers emailed | Closed | "Closed because: [reason]." Decided under policy vX. | Read the reason; appeal if you disagree. |
| T20 | W, paused or stuck | redirected | initiator proposes, moderation run decides (`DP-ELIGIBILITY`, `DP-CRISIS`; emergency channel via the emergency/legal lane) | destination (institution, partner project or emergency channel) and route text, reason | Resolution record (redirected); policy version shown | Redirected | "This is better handled by [destination]. Their route is shown." | Use the route shown. |
| T21 | W | withdrawn | initiator, only if no other account has an accepted contribution | none (reason optional) | problem kept visible as withdrawn; initiator text tombstoned (`OWN-1`) | Withdrawn | "The person who raised this withdrew it before anyone else took part." | Start a new problem if you wish. |
| T22 | draft | (deleted) | initiator | none | draft removed immediately; no event | n/a | A never-submitted draft is just discarded. | n/a |

Rules that apply to the table:

- **Withdrawal after publication** (T21) only while nobody else has an accepted contribution. After that the initiator can only tombstone their own text (`tombstoned_at`) or ask for closure with reason "initiator request" (T19). The initiator owns nothing (`OWN-1`).
- **Pause review:** when the review date passes, the system queues a re-check by the moderation run and notifies the initiator. It never changes state by itself.
- **Appeals** change state only through the effects in section 5.
- **Re-moderation after a policy change** can flip an outcome on a published problem. It never removes silently: the page shows "re-reviewed under policy vX", the reason and an appeal path (`REMOD-NOTICE-1`).
- Public labels are the exact chip text; explanations appear on the problem page and in the email. Labels never use red.

## 5. Moderation decisions and appeals

Every moderation decision (including decisions on a contribution) is made by a moderation run and stores:

| Field | Meaning |
|---|---|
| `rule_ids[]` | The platform rules applied (one or more). |
| `field_ref` | The field, and optionally a text span (start, end), the decision is about. |
| `revision_hint` | Plain text telling the person what to change. Shown next to its field. Null only for a safety-sensitive decision. |
| `policy_version` | Policy pack version applied (semver plus content hash). |
| `prompt_hash` | Hash of the prompt template used. |
| `model_id` | Model (or `FakeModel` fixture) that produced it. |
| `confidence` | Calibrated confidence, compared with the decision point's threshold. |
| `run_id`, `decision_point` | The moderation run record and the `DP-*` id. |
| `public_explanation` | Text the initiator or contributor may see. |
| `internal_note` | Auditor-only. Never shown. |
| `appealable_until` | Default 14 days after the decision, always earlier than draft deletion. |
| `transitional` | True while the policy pack is approved only by founder stewardship (`INTERIM-1`). Shown as "Policy v1, transitional stewardship". |
| decider, time, target | The run, or an emergency/legal lane member, when, and the problem or contribution it is about. |

The UI offers "revise and resubmit", which keeps the draft. It never asks the person to retype.

**Appeals** attach to a decision and follow the appeal-to-example loop (`docs/design/ai/appeals.md`). Fields: appellant, grounds, independent re-run id (different model or prompt variant), label task id (if still disputed), outcome (upheld or overturned), outcome explanation, resulting `can_policy` PR (if any), decided time. One appeal per decision. Steps: independent re-run; if still disputed, a randomized, context-masked community label task; the label becomes an example or rule change through a policy PR; the instance is then re-decided by AI under the new version (`APPEAL-1`). Humans do not override the single instance.

| Overturned decision | Effect |
|---|---|
| T02 (changes requested) | back to `submitted`; hints struck through |
| T05 (rejected) | back to `submitted`; draft restored and deletion cancelled if still held, otherwise the person resubmits |
| T19 or T20 (closed or redirected) | back to the state before, with the reason recorded |
| Contribution removed or hidden | contribution restored |

## 6. Contributions

One enum for the whole platform (this replaces two earlier lists). A contribution has exactly one type.

`clarifying_question`, `observation`, `personal_experience`, `factual_claim`, `evidence`, `interpretation`, `root_cause`, `constraint`, `stakeholder_perspective`, `proposed_solution`, `proposal_improvement`, `risk`, `implementation_offer`, `progress_update`, `verification_evidence`, `moderation_feedback`.

- `factual_claim` also covers answers to a clarifying question (optional `answers_contribution_id`). `evidence` is a URL, never a file. `root_cause` is a hypothesis unless an `evidence` contribution supports it. `risk` covers objections and unintended consequences. `personal_experience` must pass the identifier checks.
- `moderation_feedback` is reserved. In slice 1 people use appeals.
- Allowed per state: all types in `eligible` and `solution_development`; `proposed_solution`, `proposal_improvement`, `risk`, `constraint`, `stakeholder_perspective`, `clarifying_question` in `solution_selection`; `implementation_offer`, `progress_update`, `risk`, `clarifying_question` in `implementation`; `verification_evidence`, `progress_update`, `clarifying_question` in `verification`; only `clarifying_question` and `progress_update` while `paused` or `stuck`; nothing after a terminal state.
- Contributions are shown grouped by type, never ranked by popularity.
- Each contribution is checked on submit by the deterministic checks, then by a moderation run before it is shown (pending-review behaviour: section 9).

## 7. What "solved" means

The steward (initiator) **proposes** `solved` with verification evidence: at least one URL tagged `verification_evidence` and an outcome statement that answers the success metric in the chosen proposal. The **moderation run decides** (T14, `DP-VERIFICATION`) and cites the policy version. Verification evidence may be an official page, a record, a dated observation by a named public role, or an independent statement. A promise is not an achievement: a completed task alone does not make a problem solved. The final threshold is `OQ-solved-evidence-threshold`.

## 8. Accounts and sign-in (D-14)

- Writes need an invite, redeemed at sign-up. Drafts autosave locally before sign-up.
- Sign-in is a **6-digit email code**: one backend path for every client. The link is a web convenience only.
- Development mail goes to Mailpit in docker compose. A real email provider is founder-gated. Email is encrypted at rest and never shown.
- The public handle is generated from curated word lists. One regenerate is allowed before first publish. Onboarding says: "Your public name is X. Your email is never shown."
- Web sessions use an httpOnly cookie. Native session handling is founder-gated. Codes expire in 10 minutes, allow 5 attempts, and are rate limited per email and per IP.
- Pseudonyms are allowed. No identity documents are collected.

## 9. Drafts, fingerprints and the pending screen

- **Draft retention (D-18):** rejected or withdrawn drafts are hard-deleted 30 days after the decision, with the date shown.
- **Repost detection:** a salted fingerprint (HMAC over normalized text, with a server-side secret) is kept 90 days after rejection or withdrawal, and purged at publish. It holds no text and no account id. A repost match is an input to `DP-DUPLICATE` and never auto-rejects.
- **Pending review screen:** "Submitted, awaiting review". It states the wait ("Reviews run in the order received. A held item waits rather than lowers the standard. Today the median wait is X."), offers Withdraw and Edit, and says an email arrives when there is a decision.
- **Data kept after a decision:** the moderation decision, the audit event and the fingerprint. Not the text.
- Numbers (30, 90, 14 days) are `OQ-draft-ttl`.

## 10. Minimal entity list

Persistence is in `can_server` (Drizzle, domain kept ORM-free behind repository interfaces). All ids are UUIDv7. Every table row that is externally meaningful carries `origin_node_id` and `protocol_version` (D-22).

| Entity | Purpose and key fields |
|---|---|
| `account` | encrypted email, email lookup hash, handle, role, age confirmation, created, deleted_at |
| `session` | account, token hash, expires, client kind |
| `invite` | code hash, issued_by, redeemed_by, expires |
| `jurisdiction` | id, name, fictional flag, emergency notice text, rule set version |
| `problem` | state, jurisdiction, coarse area, title, structural statement, affected scope, desired outcome, investigation_needed, pending_transition, resume_state, duplicate_of, initiator, published_at, tombstoned_at (no owner field) |
| `problem_event` | append-only: problem, type, actor, from, to, reason, evidence ids, `prev_hash` (nullable) |
| `contribution` | problem, author, type (section 6 enum), body, status, answers_contribution_id |
| `evidence_ref` | URL, kind, claim text, tier, submitted_by (URL only, no files) |
| `proposal` | problem, mechanism, success metric, risks, verification plan, status |
| `decision_record` | problem, proposal, method, rationale, decider, authority, dissent, interim |
| `task` | problem, proposal, title, owner (optional), status, required flag |
| `moderation_decision` | section 5 fields, target problem or contribution |
| `appeal` | decision, appellant, grounds, re-run id, label task, outcome, explanation |
| `audit_event` | actor, action, object, time, policy_version; never raw personal data |
| `moderation_run` | decision point, inputs hash, policy_version, prompt_hash, model_id, outputs, confidence, cost |
| `draft_fingerprint` | salted hash, reason (rejected or withdrawn), expires_at (90 days) |

## 11. Accessibility and RTL baseline (from day one)

- `eslint-plugin-react-native-a11y` runs in `verify`.
- Civic wrapper components require a label or role in their types.
- Logical start and end properties only (a lint grep forbids left and right). ICU messages, no string concatenation.
- Per UI unit: 200% text size, 44pt touch targets, AA contrast, sensible web focus order. Status styling is neutral; colour is never the only signal.

## 12. Where the rest lives

- Roles `04`, evidence `07`, moderation pipeline `06`, architecture `11` (all `NN-*.md` in this folder). AI design: `docs/design/ai/README.md`. System design, ERD and UX: `docs/design/`. Decisions: `docs/adr/`, `DECISIONS.md`. Open questions: `docs/open-questions/`.
