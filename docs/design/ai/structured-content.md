# Structured content: no free-form posting (D-58)

Nothing a person posts is a blank text box. Every content type has a **schema** the community decided in advance. The schema is part of the policy pack, so it is versioned, ratified and replayable like any rule. The poster is led through the aspects of the problem that most posts leave out: facts, causes, who is affected, scope, lawful options, uncertainty and assumptions.

Lifecycle v2 adds `CRITERIA-1`, `REVIEW-1`, `RECO-1`, `STAGE-GATE-1`, `STAGE-PREP-1`, `STAGE-RESOLVE-1`, `PLAN-CHANGE-1` (D-72); DPs for them are in `decision-points.md`. Review recommendations are private content: never public, personal data masked.

Proposed rule ids (the spec owner adds them): `STRUCT-ONLY-1` (no free-form content type exists), `SCHEMA-1` (the app renders only from a pack schema version), `ASSUMP-1` (stated and detected assumptions are checked before publication), `COMPLETE-1` (required fields are meaningfully answered), `AI-ASSIST-1` (AI-suggested values need poster confirmation and are flagged).

## 1. Content types and their schemas

Each type has one `schema.json` under `content-schemas/<type>/` in `can_policy`. Free text exists only inside a typed, length-bounded field with guidance.

| Type | Schema `id` | Core fields (all required unless marked optional) |
|---|---|---|
| Problem | `problem` | condition, affected, place, since, observed facts, uncertain claims, sources, evidence refs, causal hypothesis, scope, responsible roles, desired public outcome, final acceptance criteria, assumptions, out of scope, lawful options; optional `stage_plan` |
| Contribution | `contribution.<type>` | common: `type`, `target` (problem, task or contribution id), `claim`, `basis` (`firsthand`, `cited`, `inferred`), `evidence_refs`, `uncertainty`, `assumptions`. Plus the per-type fields below |
| Proposal | `proposal` | mechanism, responsible role, authority and legal basis, cost estimate and funding, success metric, risks and rights impact, dependencies, verification plan, lawful alternatives considered, assumptions |
| Decision record | `decision_record` | chosen proposal, method, rationale, decider role, authority, dissent notes, legal-gate record, assumptions, review date |
| Task and verification | `task`, `verification` | task: question answered, deliverable, done criteria, owner role. Verification: success metric restated, evidence refs with tier, outcome statement, what the evidence does not show |
| Appeal | `appeal` | decision ref, rule ids disputed, which fact or reading is wrong, what outcome is sought, new evidence refs (never new personal data) |
| Stage option | `stage_option` | stage ref, option statement, mechanism, responsible role, authority and legal basis, cost, how it would meet the stage criteria, risks, lawful alternatives, assumptions |
| Stage choice | `stage_choice` | stage ref, chosen option ids or steps, decision method, decider role and authority, rationale, dissent notes, legal-gate record, steps (each: step, owner role, done criterion) |
| Stage evidence | `stage_evidence` | stage ref, criterion ref each item addresses, evidence refs with tier, observation date, outcome statement, what the evidence does not show |
| Review recommendation | `review_recommendation` | problem ref, `path` (field or metadata path, including stage, stage criteria and final criteria), `recommendation` (change asked), `reason`, `status` (`open`, `accepted`, `declined`), poster `resolution_reason` (required on accept or decline, RECO-1) |
| Policy proposal | `policy_proposal` | rule ids and DPs touched, reason, motivating labeled examples, expected flips, protected-core check, rollback plan |

Per-type contribution fields (on top of the common ones):

| Contribution type | Extra required fields |
|---|---|
| `clarifying_question` | `missing_information`, `why_it_matters`, `who_could_answer` (role) |
| `observation` | `what_observed`, `when`, `where_coarse`, `how_observed` |
| `personal_experience` | `pattern_illustrated` (the structural point), `period`; passes DP-PRIVACY; no case narrative |
| `factual_claim` | `statement`, `source_ref` or `none_stated`, `answers_contribution_id` (optional) |
| `evidence` | `url`, `source_description`, `claim_supported`, `what_it_does_not_show` |
| `interpretation` | `reading_of`, `alternatives_considered` |
| `root_cause` | `hypothesis`, `mechanism`, `supporting_evidence_refs`, `test_that_would_disprove_it` |
| `constraint` | `constraint`, `source` (law, budget, physical, institutional), `source_ref`, `recheck_condition` |
| `stakeholder_perspective` | `group` (a group, never a person), `concern`, `basis`, `what_would_help` |
| `proposed_solution`, `proposal_improvement` | mechanism, responsible role, authority, cost, success metric, risks, lawful alternatives (improvement adds `improves` and `change`) |
| `risk` | `risk`, `likelihood_basis`, `who_bears_it`, `mitigation_idea` |
| `implementation_offer` | `offered_work`, `role_capacity`, `limits`, `lawful_basis` |
| `progress_update` | `task_ref`, `done`, `not_done`, `blockers`, `next_step` |
| `verification_evidence` | `url`, `metric_addressed`, `observation_date`, `source_role`, `what_it_does_not_show` |
| `moderation_feedback` | reserved (appeals are used in slice 1) |

## 2. Schema format

A schema is JSON Schema 2020-12 plus three extension keys, so one file drives validation, the form and the AI check:

```json
{
  "id": "problem", "version": "1.0.0", "pack": "base@1.0.0",
  "properties": {
    "causal_hypothesis": {
      "type": "object", "required": ["statement", "status"],
      "x-ui": {"widget": "textarea", "label_msg": "schema.problem.causal.label",
               "help_msg": "schema.problem.causal.help", "order": 8},
      "x-guidance": {"why": "Separates what is known from what is guessed about causes.",
                     "good": "Collection frequency may be too low on market days (hypothesis, untested).",
                     "bad": "The city does not care.",
                     "min_chars": 40, "max_chars": 600},
      "x-checks": {"dps": ["DP-ASSUMPTIONS", "DP-COMPLETENESS"], "enum_status": ["untested", "partly_supported", "supported"]}
    }
  }
}
```

- `x-ui`: widget, label and help as message ids (copy lives in the UX copy deck, not in the schema, so translation stays in one place), order, grouping, conditional visibility.
- `x-guidance`: `why` (shown to the poster), a good and a bad example, length bounds. Examples are fictional or synthetic and are also eval cases.
- `x-checks`: which DPs read the field and field-specific rules (enums, `none_stated` allowed or not).
- Versioned in `can_policy` beside prompts. The schema `version` follows the pack semver rule: patch for wording or examples, minor for added optional fields or changed bounds, major for added or removed required fields.
- The server exposes `GET /content-schemas/{type}` with the active version and hash for the jurisdiction. The app renders forms from it and never hard-codes a field (SCHEMA-1). A submission carries `schema_id`, `schema_version` and `schema_hash`; the server validates against exactly that version and rejects an unknown or retired one with a prompt to reload.
- The structured body is stored as typed fields. The "text" shown on a page is a rendering of fields, so every DP can address a `field_ref`, and a revision hint always sits beside its field.

## 3. The problem schema, field by field

Order is the order of the form. The rationale is shown to the poster as the field's `why`.

| # | Field | Content | Rationale: what the poster becomes aware of |
|---|---|---|---|
| 1 | `condition` | One shared public condition, one or two sentences, no individual case | Forces the shift from complaint to condition (DP-ELIGIBILITY, DP-FRAMING) |
| 2 | `affected` | Groups affected, rough size or "unknown", how they are affected | Who bears the harm, and that the poster may not know the size |
| 3 | `place` | Jurisdiction and coarse area, never an address | Which law and which institution apply; protects privacy |
| 4 | `since` | When it started or was first noticed, and whether it is recurring, worsening or stable | Trend matters for causes and for success metrics |
| 5 | `observed_facts[]` | Each: statement, source ref or `firsthand`, date | Separates what is known from what is believed |
| 6 | `uncertain_claims[]` | Each: statement, why uncertain, what would settle it | Makes uncertainty a normal, required part of a post |
| 6a | `sources[]` | Each: `source_ref` (URI), `category`, what it establishes about the issue | A trusted source shows the issue is real (DP-SOURCE-TRUST); needs at least one |
| 7 | `evidence_refs[]` | URLs with a short description and which fact each supports | Evidence tier (DP-EVIDENCE-TIER); a link is not proof of the fact |
| 8 | `causal_hypothesis` | Statement and status (`untested`, `partly_supported`, `supported`) | Causes stay hypotheses until supported (brief section 6) |
| 9 | `scope` | Boundaries in place, time, sector; what is a child problem | Stops one thread from becoming "everything" (seeds 3 and 4 later) |
| 10 | `responsible_roles[]` | Offices and institutions, never named people (NAME-1) | Who could act; accountability without targeting a person |
| 11 | `desired_outcome` | The public outcome and how anyone could tell it happened | Becomes the success metric that DP-VERIFICATION checks |
| 11a | `final_acceptance_criteria[]` | Each: a measurable statement of what "solved" means, how it is observed, optional deadline | Required (CRITERIA-1); DP-CRITERIA checks it, DP-VERIFICATION judges against it |
| 12 | `assumptions[]` | Each: statement, kind (`factual`, `causal`, `legal`, `scope`), confidence | The poster states what they are taking for granted; DP-ASSUMPTIONS then checks it |
| 13 | `out_of_scope[]` | What this problem does not cover | Prevents scope creep and duplicate overlap |
| 14 | `lawful_options` | Options the poster knows of that are lawful, or `unknown`; and acknowledgement that unlawful action is not part of the problem | Awareness of the legal frame early, so proposals later are not blocked by surprise (DP-LEGALITY) |

Optional: `stage_plan`, a DAG of stage nodes. Each node: `name`, `goal`, `acceptance_criteria[]` (at least one), `decision_method` (`poster_after_input` default, `community_vote`, `steward`, `other_named`), `depends_on[]` (stage names; empty means ready at publication). A missing plan means the `classic-5` template or one stage, offered at preparation. DP-STAGE-PLAN checks it; volunteers may recommend changes to it; after publication it changes only by proposal (PLAN-CHANGE-1).

Schema ids for `sources[]` items: `source_ref` = `{uri, category, establishes, authenticity_note}`; the server stamps the DP-SOURCE-TRUST result per item.

Optional: `existing_efforts` (what institutions already do or spend). Strongly encouraged by guidance because it fixes the "nothing is being done" assumption, but a missing value is `none_stated`, not a block.

## 4. DP-ASSUMPTIONS

**Trigger:** every content type at submit and at every update (diff-aware: only changed or newly relevant fields are re-read, plus any field the change makes inconsistent). Mode: blocking. Allowed outcomes: `publish`, `needs_revision`, `hold`. It never emits `reject` on its own: a wrong assumption is a revision, not a violation.

It examines four kinds, both those the poster lists in `assumptions[]` and those implied elsewhere:

| Kind | Checks | Example hint (synthetic) |
|---|---|---|
| Factual | A stated fact has a source or is marked firsthand; a figure is not contradicted by retrieved public data in the pack's reference set | "You state a figure with no source. Add a source or move it to uncertain claims." |
| Causal | A cause is presented as fact when the evidence supports only correlation | "Marked as fact, but only a hypothesis is supported. Set status to untested or add evidence." |
| Legal | A claimed power or prohibition conflicts with the jurisdiction pack, or the proposal assumes an unlawful route | "This assumes the city can do X directly. The jurisdiction rules say Y. Name the competent body." |
| Scope | The statement is wider or narrower than its fields; the place, group or time does not match the evidence | "Condition says the whole country, evidence covers one district. Narrow it or add a child problem." |

Rules: the outcome is `needs_revision` with one hint per field (`field_ref`), never silent rejection and never a silent edit. The hint names the assumption, the rule id (`ASSUMP-1`) and what would make it acceptable. The poster may keep an assumption by marking it explicitly as an assumption with a confidence; an honest, stated assumption passes. What is held back is an assumption presented as fact. The model gets only retrieved references from the pack, no tools and no live lookup. Legal readings are never legal advice and cite the pack version (spec 06). Unsure about a legal point: `needs_revision` asks the poster to mark it as unverified, it does not guess.

## 5. DP-COMPLETENESS

**Trigger:** every content type at submit and update. Blocking. Outcomes: `publish`, `needs_revision`, `hold`. It runs in two layers:

1. **Deterministic (in the gateway or server, before any model call):** required fields present, enums valid, length within `min_chars` and `max_chars`, URL shape, list sizes, repeated-text and filler detectors (the same sentence in two fields, lorem text, only punctuation or stopwords, the same string in every field).
2. **Model read:** is each required field a meaningful answer to its own question, in this type's terms? A field answered with "n/a", "see above", "unknown" where unknown is not allowed, or an answer that addresses a different field, is not meaningful. `unknown` and `none_stated` are valid only where the schema lists them, and they require the paired "what would settle it" field.

The goal is a post that someone else can act on, not a long post. Length minimums exist to stop one-word answers, never to reward padding: padding is a COMPLETENESS finding. Hints name the field and the question it did not answer.

## 6. Applying other DPs to structured content

The rest of the catalog applies per field, not per blob: DP-PRIVACY and DP-NAMING read every text field with its `field_ref`; DP-TONE and DP-CRISIS read all text; DP-FRAMING and DP-ELIGIBILITY read `condition`, `affected`, `scope`, `desired_outcome`; DP-DUPLICATE reads `condition`, `place`, `scope`. The mapping table is in `decision-points.md`.

## 7. AI fill-assist

AI may help a poster fill fields. It is assistance, not authorship (AI-ASSIST-1).

- The poster pastes or types rough notes into one **private notes box** that is never published. Assist suggests values for schema fields, plus questions for fields it cannot fill.
- Every suggestion arrives as a proposal beside its field. Nothing is written until the poster accepts or edits it. Accepting is one action per field; there is no "accept all".
- Assist runs through the privacy gateway like any model call: the notes are redacted or pseudonymized first, the provider sees no raw identifiers, and notes are not retained beyond the draft's retention rule.
- A field filled or edited by an accepted suggestion carries `assisted: true` in the record, with `assist_run_id`, `policy_version` and `prompt_hash`. Assisted fields are visible as such to auditors and appear in the public explanation of the decision as "suggested by AI, confirmed by the poster". The poster remains the author of every value.
- Assisted values go through the same DPs as typed ones. Assist is an extra prompt in the pack (`decision-points/ASSIST-FILL/`), evaluated for leakage and for inventing facts: an assist that invents a source or number is a regression case.
- Assist cannot submit, cannot pick the schema, and has no tools. Its spend counts against the same caps.

## 8. How schemas change

Schemas change only by the amendment loop (`amendment-loop.md`): a PR touching `content-schemas/`, with eval and replay, ratification and staged rollout. Extra gates for schemas:

- **Form test:** the PR includes rendered-form snapshots from the schema (accessibility and RTL baseline), so a schema cannot ship a form that cannot be completed.
- **Replay on content:** old published content is re-validated against the new schema as a dry run to count what would be incomplete. Published content is not edited by this.
- **In-flight drafts** (`draft`, `in_review`, `needs_revision`): keep their schema version until submit. A minor bump auto-migrates a draft: new optional fields appear empty, changed bounds apply at next submit. A major bump keeps the draft on the old version for a grace window set in the pack (default 30 days); the app offers a migration screen that maps old fields to new ones, the poster confirms each mapping, and unmapped required fields are asked fresh. After the window the draft must migrate before submit.
- **Published content keeps its schema version.** It is never rewritten. An edit by the owner opens the current version and passes through DP-ASSUMPTIONS and DP-COMPLETENESS on the diff. If the change is only newly required fields, the page shows "updated to schema vX" and the old version stays in history.
- **Re-moderation:** when a new schema version adds a required field, existing published items are not removed. They get a non-blocking "this problem predates field Y" marker and a gentle prompt to the owner; they are never taken down for missing a field added later.
- Rollback follows the pack: the previous schema version is one config change away.

## 9. Policy-pack values tied to schemas

Per-type caps, minimum and maximum lengths and cooldowns live in the pack, as set out in `decision-points.md` (policy-pack values table). They are values, not code (D-58, and the Notion principle "limits must be policy-driven, measurable, and adjustable").
