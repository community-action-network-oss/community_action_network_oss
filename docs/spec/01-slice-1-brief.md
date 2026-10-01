# Slice 1 brief

Load this file with `02-agent-rules.md` for any slice-1 work. This file is the **single owner** of the slice-1 lifecycle state and transition table, the contribution-type enum, the slice-1 defaults and the minimal entity list. Other spec files link here instead of repeating them.

Every default below is reversible and logged in `DECISIONS.md` (D-12 to D-18, D-22). Questions the community can help answer are in `docs/open-questions/`. The binding, testable rules for slice 1 are in `constitution/rules.md` (rule IDs such as `MOD-EXPLAIN-1`, `DRAFT-TTL-1`, `OWN-1`, `LEGAL-GATE-1`, `PUB-FAILCLOSED-1`, `INTERIM-1`, `APPEAL-1`, `DECENT-1`); the precedence order is Constitution I.2.

## 1. What slice 1 is

Slice 1 is the smallest build that runs one complete, honest problem lifecycle end to end. It replaces three earlier, conflicting definitions of "first slice" (the initial-release hypothesis, the Phase 2 to 5 list, and the months 3 to 5 list).

- Invite-only writes, public reads.
- Fictional data only, one fictional jurisdiction, English only.
- Flow: intake, human review, typed contributions, proposals, decision record, tasks, verification, terminal state, plus appeals of moderation decisions.
- Not in slice 1: playbooks, governance issues, stewardship groups, live AI, uploads, the problem graph (only `duplicate_of`), federation, election features, payments.
- Verified on web only (D-8). Native builds must still bundle (`expo export -p ios` and `-p android`). Native session paths and device smoke tests are founder-gated.
- Done means: an end-to-end script over fictional seed data walks one problem from `draft` to `solved`, plus one rejection with a revise-and-resubmit, one appeal and one `stuck` path, and passes.

Pilot-ready (`18-phases-gates.md`, "Definition of pilot-ready") and Gate X (same file) describe later, stricter bars. Slice 1 done is not either of them.

## 2. Slice-1 defaults

1. **Scope:** section 1 above. Any non-fictional data is out of scope until the blockers in `docs/open-questions/` (emergency routing, license, legal review) are resolved.
2. **AI:** deterministic checks plus human review of everything published. The AI gateway interface exists behind a flag that stays off. Public wording: "Rules-based checks and human review today. AI assistance is planned; people make and answer for every decision."
3. **Accounts:** see section 8.
4. **Lifecycle:** see section 4. Status styling is neutral, never red.
5. **Authority:** the initiator is provisional steward. A `moderator` confirms publish, solved, closed and redirected. Interim-moderator clause (Constitution V.4, rule `INTERIM-1`): every such decision is audited and shown as "Interim decision, will be re-reviewed". The appeal reviewer must differ from the original decider (and the appellant) when the moderator pool has two or more people; otherwise the page discloses that the same interim moderator reviewed it.
6. **Moderation decisions:** carry explanation fields (section 5).
7. **Drafts:** section 9.
8. **Pending review screen:** section 9.
12. **Decentralization seams only** (D-22): UUIDv7 ids, `origin_node_id`, `protocol_version`, an append-only events table with a nullable `prev_hash`. Signing, export and AT Protocol are deferred (`12-decentralization-ready.md`).
14. **Accessibility and RTL baseline:** section 11.

Other defaults:

- **Eligibility:** a fictional public problem that passes the deterministic checks and moderator review. Placeholder category list: public services, infrastructure, environment, safety, accessibility. The real list is `OQ-eligible-categories`.
- **Decision method:** a recorded decision with rationale and no vote (`OQ-decision-method`).
- **Visitors and core participants:** a self-declared coarse area, for display only, never verified (`OQ-location-verification`). Nobody is excluded in slice 1.
- **Visibility classes:** `private` (draft, submitted, needs_revision, rejected: initiator and moderators), `public` (published problems, readable by guests). Moderator-only notes exist but are never public (`OQ-visibility-classes`).
- **Search indexing:** all pages `noindex` in slice 1 (`OQ-guest-read-search-indexing`).
- **Evidence:** URL references only. No uploads.
- **Links between problems:** `duplicate_of` only.
- **Language:** English only. Text that looks non-English (script check) is accepted for human review with a "language not yet supported" label and may get `needs_revision` (`OQ-unsupported-language`).
- **Age:** 18+, self-declared at sign-up (`OQ-age-default`).
- **Cooldowns:** targeted reflection delays, not a flat wait (`OQ-cooldown-lengths`). Defaults: 2 minutes between contributions by the same account on one problem; 10 minutes after a contribution is rejected before the next one on that problem; no delay for progress updates and verification evidence.
- **Emergency:** every form shows a static "If someone is in danger, contact your local emergency number" notice. The platform is not an emergency service (`OQ-emergency-routing`).
- **Real email provider, domain, hosting region:** none. Local development only (`OQ-hosting-region`, `OQ-domain`).

## 3. Roles in slice 1

`guest` (reads public problems), `member` (signed in), `initiator` (member who submitted a problem; provisional steward of that problem, owns nothing), `moderator`. Experts, institutional representatives, stewardship groups, reviewers and election roles are deferred (`04-roles-stewardship.md`). The initiator does not own the problem and decides for no one but themselves.

## 4. Lifecycle

### 4.1 State classes

- **Pre-publication (private):** `draft`, `submitted`, `needs_revision`.
- **Working (public):** `eligible`, `solution_development`, `solution_selection`, `implementation`, `verification`.
- **Resting (public, not terminal):** `paused`, `stuck`.
- **Terminal:** `solved`, `closed`, `redirected`, `withdrawn` (public, T21); `rejected`, `withdrawn` before publication (private, never published).

Notes on the model:

- `automated_review` is a synchronous check inside T01, not a state. A hard failure keeps the problem in `draft` with field hints and creates no moderation decision.
- `eligible` means human review passed and the problem is published. In slice 1 it is also the discovery stage (clarify and gather evidence). `discovery` and `root_cause_analysis` split out later.
- `needs_revision` replaces the earlier `needs_clarification`.
- `appealed` is not a state. An appeal attaches to a moderation decision (section 5).
- `investigation_needed` is not a state or a tier. It is a **derived flag**, true when the strongest evidence tier on a published problem is below the investigation threshold. Evidence tiers are defined in the constitution (Constitution III.4, `EVIDENCE-TIERS`).
- `paused` is not terminal: it requires a reason and a resume condition. `stuck` means documented effort has hit a blocker; it is the public "accountable unresolved record".
- Reopening terminal states is deferred. Pre-publication states are only visible to the initiator and moderators.
- Invalid transitions fail atomically. Every transition writes a `problem_event` (actor, time, from, to, reason, evidence ids) in the same transaction.
- `W` below means any working state: `eligible`, `solution_development`, `solution_selection`, `implementation`, `verification`.
- "Proposes / confirms": the initiator (provisional steward) records a pending transition; a moderator confirms or declines it. A moderator may also propose, and then a different moderator confirms when the pool has two or more; otherwise the interim self-confirmation is disclosed.

### 4.2 Transition table

| id | from | to | actor | required fields | side effects | public label | plain explanation | next action |
|---|---|---|---|---|---|---|---|---|
| T01 | draft | submitted | initiator | title, structural statement, affected scope, coarse area, 1+ evidence URL or a "no evidence yet" note, no-identifiers confirmation; synchronous checks pass | checks run (identifiers and contact details, secrets, URL scheme, length, language script, repost fingerprint); version snapshot; event; fingerprint stored | Awaiting volunteer review | "Your problem is waiting for a volunteer to check it. Nothing is public yet." | Edit or withdraw while you wait. |
| T02 | submitted | needs_revision | moderator | moderation decision (rule_ids, field refs, revision hints, appealable_until) | email to initiator; draft kept; hints shown beside fields | Changes requested | "A volunteer asked for changes before this can be published. Each note sits next to the part it is about." | Edit the marked fields and resubmit. |
| T03 | needs_revision | submitted | initiator | at least one flagged field changed | new version snapshot; checks re-run; hints marked addressed | Awaiting volunteer review | "Your changes are back with a volunteer." | Wait for the decision email. |
| T04 | submitted | eligible | moderator | decision with rule_ids; jurisdiction; `investigation_needed` flag computed | published; handle shown; initiator becomes provisional steward; guests can read; email to initiator; fingerprint purged | Open: gathering facts | "A volunteer checked this and published it. Anyone can now ask questions and add evidence." | Add evidence or answer questions. |
| T05 | submitted | rejected | moderator | decision with rule_ids, public explanation, optional revision hint, appealable_until | email; deletion date = decision date + 30 days shown to initiator; fingerprint kept 90 days | Not accepted | "This was not accepted, for the reasons given. Your text is deleted on the date shown." | Appeal before the date shown, or copy your text and start a new draft. |
| T06 | submitted | withdrawn | initiator | none (reason optional) | deletion date + 30 days; fingerprint kept 90 days | Withdrawn | "You withdrew this. It was never public." | Start a new draft if you wish. |
| T07 | needs_revision | withdrawn | initiator, or system after 30 days without activity (reminder at day 23) | none | as T06 | Withdrawn | "Withdrawn by you, or after 30 days without changes." | Start a new draft. |
| T08 | eligible | solution_development | initiator | stage summary: what is established, what is disputed; 1+ evidence URL or a documented missing-evidence note | event | Open: developing solutions | "Enough is known to start proposing fixes." | Add proposals. |
| T09 | solution_development | solution_selection | initiator | 2+ proposals each with mechanism, success metric, risks and verification plan, or 1 proposal plus a documented "no alternatives" note | event | Open: choosing a solution | "Proposals are ready to compare." | Review the proposals and the decision. |
| T10 | solution_selection | solution_development | initiator | reason (new information or objection) | event | Open: developing solutions | "New information reopened the options." | Revise or add proposals. |
| T11 | solution_selection | implementation | initiator | decision record: chosen proposal, method, rationale, decider, authority, dissent notes (optional); legal-gate check record (`LEGAL-GATE-1`); 1+ task | decision record published; tasks visible | In progress | "A solution was chosen and the reason is on record. Work is being tracked." | Claim a task. |
| T12 | implementation | verification | initiator | all required tasks done or dropped with a reason; verification plan present | event | Checking the result | "Work is done. People are checking whether it fixed the problem." | Add verification evidence. |
| T13 | verification | implementation | initiator or moderator | failed-check note with evidence | event; new tasks allowed | In progress | "The check showed more work is needed." | Pick up the new tasks. |
| T14 | verification | solved | initiator proposes, moderator confirms | verification evidence (1+ URL tagged `verification_evidence`) and an outcome statement against the chosen proposal's success metric | Resolution record created; followers emailed; interim label | Solved | "A volunteer confirmed the result matches the goal, using the evidence shown." Interim decision, will be re-reviewed. | Read the Resolution record. |
| T15 | W | stuck | initiator or moderator | blocker statement (the blocking constraint), its source and version, blocked actions, recheck condition (the review date), next lawful escalation route, 1+ documented attempt (task, evidence or the legal-gate record) | event; blocker shown publicly | Stuck | "Documented work hit a blocker. The blocker and the next route are shown." | Follow the escalation route or add information. |
| T16 | stuck | implementation | initiator or moderator | blocker-cleared note with evidence | event | In progress | "The blocker was cleared." | Continue the tasks. |
| T17 | W | paused | initiator or moderator | reason code, resume condition, review date (default at most 90 days) | stores the state to resume; event | Paused | "On hold: [reason]. Resumes when: [condition]." | Wait, or meet the condition. |
| T18 | paused | resume state | initiator or moderator | resume-condition-met note | event | (previous label) | "The condition for resuming was met." | Continue. |
| T19 | W, paused or stuck | closed | initiator proposes, moderator confirms | reason code (duplicate, invalid, out of scope, no longer relevant, initiator request, rule violation), plain explanation; `duplicate_of` if duplicate | Resolution record (closed); interim label; followers emailed | Closed | "Closed because: [reason]." Interim decision, will be re-reviewed. | Read the reason; appeal if you disagree. |
| T20 | W, paused or stuck | redirected | initiator proposes, moderator confirms | destination (institution, partner project or emergency channel) and route text, reason | Resolution record (redirected); interim label | Redirected | "This is better handled by [destination]. Their route is shown." | Use the route shown. |
| T21 | W | withdrawn | initiator, only if no other account has an accepted contribution | none (reason optional) | problem kept visible as withdrawn; initiator text tombstoned (`OWN-1`) | Withdrawn | "The person who raised this withdrew it before anyone else took part." | Start a new problem if you wish. |
| T22 | draft | (deleted) | initiator | none | draft removed immediately; no event | n/a | A never-submitted draft is just discarded. | n/a |

Rules that apply to the table:

- **Withdrawal after publication** (T21) is allowed only while nobody else has an accepted contribution. Once another person has contributed, the initiator can only tombstone their own text (`tombstoned_at`) and may ask for closure with reason "initiator request" (T19). The initiator owns nothing, so the problem stays (`OWN-1`).
- **Pause review:** when the review date passes, the system flags the problem to moderators. It never changes state by itself.
- **Appeals** change state only through the effects in section 5.
- Public labels are the exact chip text. Explanations appear on the problem page and in the email. Labels never use red.

## 5. Moderation decisions and appeals

Every moderation decision (including decisions on a contribution) stores:

| Field | Meaning |
|---|---|
| `rule_ids[]` | The platform rules applied (one or more). |
| `field_ref` | The field, and optionally a text span (start, end), the decision is about. |
| `revision_hint` | Plain text telling the person what to change. Shown next to its field. Null only for a safety-sensitive decision. |
| `policy_version` | Version of the rule set applied. |
| `public_explanation` | Text the initiator or contributor may see. |
| `internal_note` | Moderator-only. Never shown. |
| `appealable_until` | Default 14 days after the decision, always earlier than draft deletion. |
| `interim` | True for every slice-1 decision, shown as "Interim decision, will be re-reviewed". |
| decider, time, target | Who decided, when, and the problem or contribution it is about. |

The UI offers "revise and resubmit", which keeps the draft. It never asks the person to retype.

**Appeals** attach to a decision. Fields: appellant, grounds, reviewer, outcome (upheld or overturned), outcome explanation, decided time. One appeal per decision. The reviewer differs from the appellant and from the decider when the pool has two or more moderators; otherwise the page discloses "same interim moderator" (`APPEAL-1`).

| Overturned decision | Effect |
|---|---|
| T02 (changes requested) | back to `submitted`; hints struck through |
| T05 (rejected) | back to `submitted`; draft restored and deletion cancelled if still held, otherwise the person resubmits |
| T19 or T20 (closed or redirected) | back to the state before, with the reason recorded |
| Contribution removed or hidden | contribution restored |

## 6. Contributions

One enum for the whole platform (this replaces two earlier lists). A contribution has exactly one type.

`clarifying_question`, `observation`, `personal_experience`, `factual_claim`, `evidence`, `interpretation`, `root_cause`, `constraint`, `stakeholder_perspective`, `proposed_solution`, `proposal_improvement`, `risk`, `implementation_offer`, `progress_update`, `verification_evidence`, `moderation_feedback`.

- `factual_claim` also covers answers to a clarifying question (optional `answers_contribution_id`).
- `evidence` carries a URL reference, never a file.
- `root_cause` is always a hypothesis unless an `evidence` contribution supports it.
- `risk` covers risks, objections and unintended consequences.
- `personal_experience` is evidence of the public condition. It must pass the identifier checks.
- `moderation_feedback` is reserved. In slice 1 people use appeals.
- Allowed per state: all types in `eligible` and `solution_development`; `proposed_solution`, `proposal_improvement`, `risk`, `constraint`, `stakeholder_perspective`, `clarifying_question` in `solution_selection`; `implementation_offer`, `progress_update`, `risk`, `clarifying_question` in `implementation`; `verification_evidence`, `progress_update`, `clarifying_question` in `verification`; only `clarifying_question` and `progress_update` while `paused` or `stuck`; nothing after a terminal state.
- Contributions are shown grouped by type, never ranked by popularity. No like counts.
- Each contribution is checked on submit by the deterministic checks, then reviewed by a moderator before it is shown (pending-review behaviour: section 9).

## 7. What "solved" means

The steward (initiator) **proposes** `solved` with verification evidence: at least one URL tagged `verification_evidence` and an outcome statement that answers the success metric in the chosen proposal. A **moderator confirms** (T14). The confirmation is interim and labelled so. Verification evidence may be an official page, a record, a dated observation by a named public role, or an independent statement. A promise is not an achievement: a completed task alone does not make a problem solved. The final threshold is `OQ-solved-evidence-threshold`.

## 8. Accounts and sign-in (D-14)

- Writes need an invite. The invite is redeemed at sign-up, not at submit. Drafts autosave locally before sign-up.
- Sign-in is a **6-digit email code**: one backend path for every client. The link is a web convenience only.
- Development mail goes to Mailpit in docker compose. A real email provider is founder-gated.
- Email is encrypted at rest and never shown anywhere.
- The public handle is generated from curated word lists. One regenerate is allowed before first publish. Onboarding says: "Your public name is X. Your email is never shown."
- Web sessions use an httpOnly cookie. Native session handling is founder-gated.
- Codes expire in 10 minutes, allow 5 attempts, and are rate limited per email and per IP.
- Pseudonyms are allowed. No identity documents are collected. This was never an open question.

## 9. Drafts, fingerprints and the pending screen

- **Draft retention (D-18):** rejected or withdrawn drafts are hard-deleted 30 days after the decision. The UI shows the exact deletion date.
- **Repost detection:** a salted fingerprint (HMAC over normalized text, with a server-side secret) is kept 90 days after rejection or withdrawal, and purged at publish. It holds no text and no account id. A repost match adds a note for the moderator and never auto-rejects.
- **Pending review screen:** "Submitted, awaiting volunteer review". It states the honest wait ("Volunteers review in the order received. There is no guaranteed time. Today the median wait is X."), offers Withdraw and Edit, and says an email arrives when there is a decision.
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
| `appeal` | decision, appellant, grounds, reviewer, outcome, explanation |
| `audit_event` | actor, action, object, time, interim flag; never raw personal data |
| `draft_fingerprint` | salted hash, reason (rejected or withdrawn), expires_at (90 days) |

## 11. Accessibility and RTL baseline (from day one)

- `eslint-plugin-react-native-a11y` runs in `verify`.
- Civic wrapper components require a label or role through their types.
- Logical start and end properties only. A lint grep forbids physical left and right.
- ICU messages. No string concatenation for text.
- Per UI unit: works at 200% text size, 44pt minimum touch targets, AA contrast, a sensible web focus order.
- Status styling is neutral. Colour is never the only signal.

## 12. Where the rest lives

- Roles, stewardship: `04-roles-stewardship.md`. Evidence and systemic graph: `07-systemic-evidence.md`. Moderation pipeline: `06-moderation-geo-governance.md`. Architecture and the three repositories: `11-architecture.md`.
- System design, ERD and UX: `docs/design/`. Decisions: `docs/adr/` and `DECISIONS.md`. Open questions: `docs/open-questions/`.
