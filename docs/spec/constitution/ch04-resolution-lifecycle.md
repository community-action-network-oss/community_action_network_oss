# Chapter IV. Resolution and lifecycle

Binds slice 1 in part. Rewritten from Arts 4-14, 16-17, 21-22, 24, 30, 37, 46. The problem state and transition table is owned by `01a-lifecycle.md` and the stage plan by `01b-stages.md`. This chapter holds principles only.

### IV.1 CONTRIBUTION-FRAMING: Contributions and contestable framing
*Status: Position · Old: Art 4, 5 · First phase: S1*

Everyone may contribute relevant experience, information, evidence, analysis, and possible solutions. Sensitive subjects, including religion and politics, may be discussed while the discussion stays civil, relevant, lawful, and solution-focused. Participation does not make all claims equally reliable or all participants equal in decision authority.

The platform distinguishes: lived experience; local knowledge; factual claims and evidence; professional expertise; legal authority; implementation responsibility; public preference; and rights that popularity cannot remove. Community support evidences legitimacy and willingness to act. It does not prove truth, safety, legality, fairness, feasibility, or effectiveness.

A submitter may define the initial problem but not permanently define reality, causation, affected populations, or the solution space. Contributions are typed so observations, interpretations, desired outcomes, causal hypotheses, and proposed solutions stay separate. Participants may challenge the framing with reasons and evidence. In slice 1 the only link between problems is `duplicate_of`.

**Structured content (D-58).** CAN has no free-form posting. Every content type (problem, contribution, proposal, decision record, task and verification, appeal, policy proposal) is a structured response to a schema the community decided in advance and ratified in the policy pack. A schema makes the poster confront the whole situation before posting: facts, causes, affected people, scope, lawful options, uncertainty and explicit assumptions. The decision points `DP-COMPLETENESS` and `DP-ASSUMPTIONS` check that every required field is meaningfully answered and hold back posts built on incorrect factual, causal, legal or scope assumptions, returning `needs_revision` with hints beside fields. AI may help fill fields; the poster confirms. Schemas change only through a policy proposal.

**Preparation and review (D-72).** A problem is prepared privately before anyone else sees it: facts, trusted sources, what solved means and, optionally, stages. Volunteers who opted in then help sharpen it, privately and with personal data masked (V.4). People can also prepare contributions for stages that have not started yet (`STAGE-PREP-1`): a contribution to a later stage is kept ready and never counts as evidence until that stage is active.

Rules: STRUCT-ONLY-1, SCHEMA-1, AI-ASSIST-1, ASSUMP-1, COMPLETE-1, FRAME-1, DUP-1, RELEVANCE-1, SOLUTION-ONLY-1, STAGE-PREP-1

### IV.2 SCOPE-AFFECTED: Scope, affected people, anti-gerrymandering, minorities
*Status: Decided (Art 11); Drafted (Art 12, 13); Position (Art 14) · Old: Art 11, 12, 13, 14 · First phase: S1-min, P3*

Impact is not only geographic. A problem distinguishes subject, direct-impact, indirect-impact, geographic, legal-jurisdiction, implementation-authority, visibility, contribution, and decision-participation scope. Slice 1 records geography and jurisdiction only, inside one jurisdiction overlay, Amsterdam (NL), on synthetic seed evidence.

- Scope decisions are reasoned, versioned, contestable, appealable, and revisable. No submitter, administrator, majority, government, supporter, or model may include or exclude populations to engineer a result.
- Affected people include those with material direct or indirect consequences: people outside the geography, absent stakeholders, vulnerable groups, future generations, and ecological interests. Weigh severity, concentration, directness, duration, reversibility, ability to avoid the impact, vulnerability, responsibility for implementation, and relevant expertise.
- Open contribution may be broad, but decision influence reflects impact, rights, evidence, expertise, and implementation responsibility, not headcount. Selection may be delayed while a materially affected group is unrepresented, except for temporary action against urgent harm.
- Numerical support alone never validates a solution. Examine rights, necessity, severity and distribution of harm, consent, alternatives, proportionality, and effects on people who did not or could not participate. A smaller group is not expendable. Residual harms stay visible, owned, mitigated, monitored, and, when distinct, tracked as linked problems.

- **Impacted and guest (D-73).** Each problem has a versioned affected area. A contribution is labelled **impacted** if it was sent from inside that area at the moment of sending, and **guest** otherwise. The label belongs to the message, not to a profile. Anyone anywhere may contribute as a guest. Guest content is always visibly labelled, and every content list has an "Impacted only" filter that hides guest content from the view without deleting it. The label never changes whether a message is lawful, safe or accepted, and never lowers its standing with moderation. Geography is the main test of impact today. Other material-connection claims (working in, using a service, being affected) may be added later through the same label. Doubtful attestation downgrades to guest and is never an accusation.

Rules: IMPACT-1, GUEST-LABEL-1

### IV.3 PROPOSAL-HYPOTHESIS: Proposals as hypotheses
*Status: Decided (Art 7); Position (Art 8) · Old: Art 7, 8 · First phase: P3*

Every solution is an option and every implementation is an experiment. The ladder: option; proposal (a hypothesis with assumptions and expected outcomes); experiment (a bounded trial); promising intervention; verified solution; solved problem. Confidence grows with evidence, implementation, observation, and verification, never with popularity or AI confidence.

A problem is never marked solved by concealing, externalizing, or unjustly transferring material harm to another person, community, generation, or ecosystem. Before implementation a proposal discloses benefits, uncertainty, risks, affected parties, cost distribution, alternatives, success criteria, monitoring, mitigation, stopping conditions, and rollback. Experiment scale is proportionate to the problem and the evidence. High-uncertainty interventions are limited and reversible where possible. Irreversible ones need stronger evidence, authority, consent, and review.

Rules: DECISION-REC-1

### IV.4 STATUS-VERIFICATION: Horizons, status, verification
*Status: Decided (Art 6); Drafted (Art 9, 17) · Old: Art 6, 9, 17 · First phase: S1-min, P4*

The platform optimizes for lawful resolution and minimizes unresolved harm. A fast fix for immediate harm may close the current problem while a linked problem tracks the root cause. Short-term success must not conceal structural causes, recurrence, or transferred harm. A linked problem is created only when evidence shows a materially distinct cause, consequence, population, authority, jurisdiction, or intervention. AI-generated causal claims stay hypotheses.

Status is multidimensional, never one `solved` label. Record separately: immediate harm; requested outcome; implementation; evidence strength; outcome verification; root cause; recurrence risk; residual and transferred harm; linked structural problems; unexpected consequences. Slice 1 states add `stuck` and `withdrawn`. The path to a resolved problem is a per-problem **stage plan**: stages (a graph, in series, in parallel or mixed), each with its own acceptance criteria. A stage does not start until the stages before it are resolved (`STAGE-GATE-1`), and it resolves only when its evidence meets its criteria (`STAGE-RESOLVE-1`). A problem is `solved` only when its final acceptance criteria are met, which every problem must define before it leaves draft (`CRITERIA-1`). `paused` is non-terminal and needs a reason and a resume condition. There is no `appealed` state, since appeals attach to decisions.

Work does not end at generated guidance. The platform tracks, with the participants' consent, the proposal chosen, implementation start, progress and blockers, reported outcome, independent verification, recurrence, and unknown or abandoned outcomes. A generated answer is not a solved problem.

**Re-resolution (D-59).** A resolution is never final against better rules. When a policy pack or legal corpus changes, a re-resolution review (`DP-RERESOLUTION`; outcomes `keep`, `annotate`, `reopen`, `hold`, never reject or delete) replays the new rule over past solved, closed, redirected and stuck problems and their decision records. Where the conclusion changes and reopening is feasible, the problem reopens with a visible notice and its full history; the decision can be appealed. Nothing is reopened or changed silently, and the old record is never deleted. Each rule change and appeal therefore improves the rules for every past and future problem.

Rules: VERIFY-1, STAGE-1, STAGE-GATE-1, STAGE-RESOLVE-1, CRITERIA-1, BLOCKER-1, CLOSE-1, RERESOLVE-1

### IV.5 LAW-GATE-STUCK: Law and reform tracks, the legality gate, and stuck
*Status: Decided · Old: Art 10, 21 · First phase: P4, S1*

An action facilitated by the platform may proceed only when it satisfies both the platform constitution and applicable law. Failure under either layer blocks it.

If law blocks a valid resolution, the problem enters a visible `stuck` state and is never falsely closed. The record names: the exact blocking constraint; jurisdiction and authoritative source; source version and effective date; blocked actions; lawful relief still available; the linked reform problem; the dependency for resuming; and a recheck condition.

Current law and legal reform are separate tracks. The platform distinguishes what law permits, disputed interpretation, constitutional or judicial challenge, policy reform, legislative reform, moral or rights-based criticism, and operational facilitation of unlawful conduct. It supports lawful challenge, advocacy, consultation, petitions, elections, and peaceful participation. Reform workflows are jurisdiction-specific, source-backed, versioned, and reviewed. An LLM's legal reading is never presented as legal advice.

The legality gate reads the legal layer stack (I.2, L0 to L6) cumulatively. If local law forbids discussing a topic at all, the problem is not published in that jurisdiction and the refusal is logged with its legal basis. If only the solution is illegal, the problem is published and enters `stuck` (legally blocked) with the blocking layer and source named, never rejected. A legal-corpus update triggers re-moderation and re-resolution (IV.4).

Rules: LEGAL-GATE-1, LEGAL-LANE-1, TOPIC-FORBIDDEN-1, LEGAL-CITE-1

### IV.6 LEGAL-SOURCES: Legal sources
*Status: Drafted · Old: Art 24, 37 · First phase: S1-min, P5*

Law changes, so the platform never assumes a constitution or statute is permanently unchanged. Legal grounding retrieves from official sources, preserves original text and URL, records jurisdiction, hierarchy, language, effective date, amendment status, and retrieval time, detects changes, and keeps prior versions. It distinguishes enacted, effective, repealed, proposed, stayed, disputed, and interpreted rules, and it exposes incomplete coverage.

A detected change never silently alters production behavior. The system may ingest, compare, preserve, and flag. Activation needs provenance checks, impact analysis, and qualified or distributed validation. Emergency changes stay auditable and get retrospective review. An LLM never rewrites source law into platform policy. Slice 1 carries one jurisdiction pack with source URL and version.

Each layer's corpus (L1 to L6) is held in `can_policy` with source provenance: official URL, original text, language, jurisdiction, layer, effective date, amendment status, retrieval time, content hash and the verifying reviewer. A corpus update is versioned, verified and shadow-tested before it goes live, then triggers re-moderation and re-resolution.

Rules: LEGAL-GATE-1, LEGAL-SOURCE-1, LEGAL-CORPUS-1

### IV.7 CONTEXTUAL-REUSE: Contextual reuse
*Status: Drafted · Old: Art 16 · First phase: P4*

Earlier resolution records are discoverable and reusable, but similarity does not prove applicability. Before reuse, compare geography, law, climate, culture, resources, affected populations, time, capacity, contraindications, and outcome quality. For high-stakes domains (medicine, agriculture, law, finance, mental health, engineering) communicate uncertainty plainly and use stronger expert review and escalation.

Rules: none yet.

### IV.8 STEWARDSHIP-AUTHORITY: Stewardship and authority
*Status: Drafted (Art 22, 46); Decided (Art 30) · Old: Art 22, 30, 46 · First phase: S1, P3*

No submitter owns a public problem or chooses for all affected people. The data model has no `owner` field.

- **Slice 1:** the initiator acts as provisional steward and may clarify the original report. The moderation run decides publish, solved, closed, and redirected under the ratified policy pack, and shows the policy version. Before a ratifying quorum exists the pack is under transitional stewardship (V.4).
- **Later:** stewardship belongs to a decentralized, capability-balanced group (phase 3). The group represents the capabilities the problem needs (affected geography, lived experience, domain expertise, implementation responsibility, rights and safety knowledge) and acts only by a defined consent threshold. The platform records how stewards were chosen, who they represent, conflicts, decision and quorum rules, scope and duration of authority, actions needing wider consent, dissent, and replacement and removal. Stewardship never transfers private information automatically and gives no authority over others' rights. Avoid single-person dependency through multiple members per critical capability, diversity, independent conflict checks, alternates and succession, no unilateral access to sensitive data, and limited auditable permissions.
- **Choosing and changing the plan (D-72).** Each stage sets its decision method; by default the poster chooses after community input, and the method is recorded with the choice. Volunteer recommendations are accepted or declined by the poster with a reason, never silently (`RECO-1`). After publication the stage plan changes only through a proposal checked by the moderation run, with the change shown publicly (`PLAN-CHANGE-1`).
- **Implementation authority** stays with the people, communities, institutions, or public bodies legally and practically responsible for the action.

The record separates: proposal created; community support; affected-party support or objection; expert assessment; authorized decision; implementation started; outcome reported; independently observed; supported by evidence; verified. Dissent stays visible. The platform records legitimacy and authority and does not manufacture them.

Rules: OWN-1, RECO-1, PLAN-CHANGE-1
