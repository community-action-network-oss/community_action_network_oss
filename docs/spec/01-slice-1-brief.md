# Slice 1 brief

Load this file with `02-agent-rules.md` for any slice-1 work. It is the **single owner** of the slice-1 scope and defaults, the moderation decision fields, the contribution-type enum, the slice-1 defaults and the minimal entity list. The lifecycle state and transition table is owned by `01a-lifecycle.md` (split out; `#4-lifecycle` here points to it). Other files link here.

Every default below is reversible and logged in `DECISIONS.md` (D-12 to D-18, D-22, D-51 to D-58). Questions the community can help answer are in `docs/open-questions/`. The binding, testable rules are in `constitution/rules.md` (rule IDs such as `MOD-EXPLAIN-1`, `DRAFT-TTL-1`, `OWN-1`, `LEGAL-GATE-1`, `PUB-FAILCLOSED-1`, `POLICY-CITE-1`, `INTERIM-1`, `APPEAL-1`, `DECENT-1`, and from D-58 `STRUCT-ONLY-1`, `ASSUMP-1`, `COMPLETE-1`, `SIM-GATE-1`); the precedence order is Constitution I.2.

## 1. What slice 1 is

Slice 1 is the smallest build that runs one complete, honest problem lifecycle end to end.

- Invite-only writes, public reads. Real participants join only after the simulation graduates (below, `SIM-GATE-1`).
- Seed problems use the real framings with **synthetic evidence** and Amsterdam (NL) as the first real jurisdiction overlay, with the full legal layer stack (D-61): L0 CAN rules, L1 UN human rights, L2 the EU Charter, EU law and the ECHR, L3 the Dutch constitution, L4 Dutch law, L5 Noord-Holland, L6 Amsterdam (D-56, which supersedes the fictional-jurisdiction wording of D-12 for seeds). English only at first (`OQ-launch-jurisdiction-language`). No individuals are named. Every seed is labelled "Seed problem, synthetic evidence".
- **Structured content only (D-58):** no free-form posting. Every content type is a structured response to a schema in the policy pack. `DP-ASSUMPTIONS` and `DP-COMPLETENESS` hold back incomplete or wrongly assumed posts.
- **The slice-1 proof is a persona simulation (D-55):** AI persona agents (submitters, contributors, proposers, appellants, adversaries) drive full lifecycles through the real pipeline on seeds 1 and 2, red-team the policy pack and feed the amendment loop. Design: `docs/design/ai/simulation.md`.
- Flow: intake, AI moderation run under the ratified policy pack, typed contributions, proposals, decision record, tasks, verification, terminal state, plus appeals that feed the policy loop.
- The full AI moderation pipeline is in slice 1 (D-51, D-53): privacy gateway, decision points, moderation runs, run records, replay diff, appeal-to-example loop. Tests and night runs use a deterministic `FakeModel` plus recorded responses, so they make no paid calls. The live Anthropic provider is founder-gated by an API key and a spend cap (`15-ai-inference.md`).
- Seeds: (1) "Amsterdam residents face recurring explosions and violent incidents that may reduce actual and perceived public safety." (2) "Amsterdam city centre remains dirty despite substantial government cleaning activity and expenditure." Seeds 3 (continuous AI capability risk) and 4 (climate change) wait for the problem graph (`07-systemic-evidence.md`).
- Not in slice 1: playbooks, governance issues, stewardship groups, live provider calls without the founder gate, uploads, the problem graph (only `duplicate_of`), federation, election features, payments.
- Verified on web only (D-8). Native builds must still bundle. Native sessions and device tests are founder-gated.
- Done means: (a) an end-to-end script over seeds 1 and 2 with synthetic evidence walks one problem from `draft` to `solved`, plus one rejection with a revise-and-resubmit, one `needs_revision` from `DP-ASSUMPTIONS`, one appeal that ends in a labeled example and a policy-pack change fixture, and one `stuck` path (including a legally blocked solution), one re-resolution reopening (T23) after a policy or legal-corpus change, and passes on `FakeModel`; (b) the persona simulation meets the graduation criteria below.
- **Graduation criteria gate public participation (`SIM-GATE-1`).** Public participation (real members posting) opens only when the criteria G1 to G13 in `docs/design/ai/simulation.md` section 8 hold on a recorded run set of the simulation of seeds 1 and 2 (`SIM-GATE-1`). The criteria and their default values live there and become pack values; open points are `OQ-graduation-criteria`, `OQ-persona-realism-bias`.

Pilot-ready and Gate X (`18-phases-gates.md`) are later, stricter bars.

## 2. Slice-1 defaults

1. **Scope:** section 1 above. Real personal data and real participants stay out until graduation (`SIM-GATE-1`) and the blockers in `docs/open-questions/` (emergency routing, Amsterdam legal review) are resolved. Seed evidence is synthetic and labelled.
2. **AI:** deterministic checks plus a moderation run (`06-moderation-geo-governance.md`) at every decision point before publication, on every update and after publication. The privacy gateway is mandatory (`14`). Fail closed (`PUB-FAILCLOSED-1`). Live model calls need the founder gate (API key, spend cap); until then `FakeModel` and recorded responses. Public wording: "People make every rule. AI applies it, explains it and answers to appeal."
3. **Accounts:** see section 8.
4. **Lifecycle:** see section 4 and `01a-lifecycle.md`. Status styling is neutral.
5. **Authority:** the initiator is provisional steward. The moderation run decides publish, `needs_revision`, `reject`, route, solved, closed and redirected under policy pack v1, which transitional founder stewardship ratifies (Constitution V.4, VIII.2, rule `INTERIM-1`). Every decision cites rule ids and the policy version. Humans change the policy, never a single outcome, except the logged emergency/legal lane (`NO-INSTANCE-OVERRIDE-1`). Appeals: section 5.
6. **Moderation decisions:** carry explanation fields (section 5).
7. **Drafts:** section 9.
8. **Pending review screen:** section 9.
9. **Decentralization seams only** (D-22): UUIDv7 ids, `origin_node_id`, `protocol_version`, an append-only events table with a nullable `prev_hash`. Signing, export and AT Protocol are deferred (`12-decentralization-ready.md`).
10. **Accessibility and RTL baseline:** section 11.

Other defaults:
- **Eligibility:** a public problem, submitted through the problem schema, that passes the deterministic checks and the moderation run. Placeholder category list: public services, infrastructure, environment, safety, accessibility. The real list is `OQ-eligible-categories`.
- **Decision method:** a recorded decision, no vote (`OQ-decision-method`).
- **Visitors and core participants:** a self-declared coarse area, display only (`OQ-location-verification`). Nobody is excluded.
- **Visibility classes:** `private` (draft, submitted, needs_revision, rejected: initiator, the emergency/legal lane, and auditors on sampled, context-masked decisions), `public` (published problems, readable by guests). Auditor-only notes exist but are never public (`OQ-visibility-classes`).
- **Search indexing:** all pages `noindex` (`OQ-guest-read-search-indexing`).
- **Evidence:** URL references only, no uploads. **Links between problems:** `duplicate_of` only.
- **Language:** English only at first (`OQ-launch-jurisdiction-language`). Text that looks non-English (script check) is held with a "language not yet supported" label (fail closed) and may get `needs_revision` (`OQ-unsupported-language`).
- **Age:** 18+, self-declared (`OQ-age-default`).
- **Cooldowns** (`OQ-cooldown-lengths`): 2 minutes between contributions by one account on one problem; 10 minutes after a rejected contribution; none for progress updates and verification evidence.
- **Emergency:** every form shows a static "If someone is in danger, contact your local emergency number" notice (`OQ-emergency-routing`).
- **Email provider, domain, hosting:** none chosen. Hosting is undecided but every service is portable (D-57: production Docker image, env contract, health checks, backup and restore; `11-architecture.md`, `OQ-hosting-region`). Local only meanwhile (`OQ-domain`).

## 3. Roles in slice 1

`guest` (reads public problems), `member` (signed in), `initiator` (member who submitted a problem; provisional steward of that problem, owns nothing), `moderator`. A `moderator` no longer decides single items. It is the small emergency/legal lane, an auditor of sampled decisions, or a labeler of appeal and eval tasks. Legislators and `can_policy` maintainers act through policy PRs (`docs/design/ai/amendment-loop.md`). Experts, institutional representatives, stewardship groups, reviewers and election roles are deferred (`04-roles-stewardship.md`). The initiator does not own the problem and decides for no one but themselves.

## 4. Lifecycle

The state classes, the transition table (T00 to T24) and the rules that apply to it live in [`01a-lifecycle.md`](01a-lifecycle.md), the single owner. In one line: `draft`, `submitted` and `needs_revision` are private; `eligible` through `verification` are the public working states; `paused` and `stuck` are resting states; `solved`, `closed`, `redirected` and `withdrawn` are terminal (`rejected` and a pre-publication `withdrawn` are private). Every decision point (`DP-*`) and every transition id (`T01`, `T14`, ...) is defined there. Outcomes: `publish`, `needs_revision`, `reject`, `route_external`, `hold` (fail closed), `escalate_human`.

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
| `jurisdiction` | id, name, synthetic-evidence flag, emergency notice text, rule set version |
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
