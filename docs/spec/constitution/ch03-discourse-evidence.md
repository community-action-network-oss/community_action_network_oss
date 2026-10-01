# Chapter III. Public discourse and evidence

Binds slice 1. Rewritten from Arts 54-55, 61, 67-70, 74-76, 81-84.

### III.1 ROLES-NOT-NAMES: Roles not names, with a time-bound alias
*Status: Decided (Art 54, 69); Drafted (Art 81) · Old: Art 54, 69, 81 · First phase: S1*

The shared platform does not discuss identifiable private individuals by name. When a responsible person must be referenced, use the functional public or institutional role, with jurisdiction and time:

`{office} of {jurisdiction}, officeholder as of {YYYY-MM}`, for example "Minister of Education of Examplestan (fictional), officeholder as of 2026-05".

- Use the least identifying reference that still routes the problem. A role can identify one person in a small office, so references must be necessary, relevant, and phrased around duties and procedures.
- Include jurisdiction and period wherever officeholders change. Historical records keep the role's time context.
- No relatives, associates, private individuals, or identifying personal details.
- Institutions and organizations may be named, because they are public structural actors.
- Role aliases must not become coded harassment or unsupported accusation.
- The only exception is the election layer (XI.2), which applies only where the jurisdiction enables it.

Public text that contains a PERSON entity is rejected with a suggested role alias.

Rules: NAME-1

### III.2 NO-ADJUDICATION: No adjudication of individuals
*Status: Drafted · Old: Art 70 · First phase: S1*

The platform is not a speculation, personality, trial, or defense forum. It never decides whether an individual is good, bad, guilty, innocent, truthful, corrupt, competent, or blameworthy. It does not build person profiles from public files, rank alleged offenders or victims, invite crowdsourced guilt findings, treat appearance in a public file as proof, or make a named person the organizing object of a problem.

Discussion stays on structural conditions, institutional responsibilities, verifiable procedures and outcomes, root causes, safeguards and incentives, lawful routes, and implementation and verification. Where an individual legal case matters, competent authorities handle identifiable evidence, and the platform asks only what it reveals about systems.

Rules: NAME-1, TONE-1

### III.3 EXTERNAL-EVIDENCE: External and restricted evidence
*Status: Drafted (Art 55); Decided (Art 61) · Old: Art 55, 61 · First phase: S1-min, P7*

Evidence that identifies people, alleges misconduct, or belongs in a legal, regulatory, employment, medical, safeguarding, or investigative process stays out of ordinary discussion.

- **Slice 1 stores evidence as a URL plus an attestation, never as an identifying file.** There are no uploads. The record holds the URL, an evidence category, a date, and a non-identifying procedural attestation such as "evidence submitted to competent authority".
- An external source may contain names. The platform may cite its existence and provenance, and discussion turns the content into roles, patterns, mechanisms, institutional failures, and root causes. It does not copy lists of names. Repeated names are detected and redacted from contributions even when public elsewhere.
- Every extracted claim says whether it is an allegation, verified fact, judicial finding, institutional record, or interpretation.
- The platform may explain what evidence is relevant, how to preserve originals and provenance, which authority should receive it, and what redaction precautions apply. It never stores identifying evidence to make a problem more persuasive, and it does not determine guilt, run public investigations, replace legal discovery, or encourage trial by opinion.
- A restricted evidence-reference layer for identifying sources does not exist in slice 1. Identifying sources stay at their authoritative external location. Any later layer needs its own approved design (phase 7).

Rules: EVID-URL-1, NAME-1

### III.4 EVIDENCE-TIERS: Evidence tiers and the investigation flag
*Status: Decided (Art 68, 75); Drafted (Art 76) · Old: Art 68, 75, 76 · First phase: S1, P7*

Any participant may propose a systemic problem from a single report. A rare, isolated, or minority problem is not denied for affecting one known person. Every problem displays its evidence status, and a report without support is kept in a lower tier, not discarded.

The record separates: existence; systemic hypothesis; evidence strength; prevalence; severity; activity; prominence.

Tiers:

1. Unverified signal
2. Corroboration requested
3. Documented problem
4. Independently reported
5. Authoritatively established
6. Outcome verified

A higher tier raises confidence, not moral importance. Tier labels identify which claims are supported and never give one blanket truth score. Multiple reports do not automatically equal corroboration.

`investigation_needed` is a flag derived from the tier (tier 1 or 2 by default). It is not a category or a separate store in slice 1. In phase 7 it feeds a discovery layer for journalists, researchers, auditors, and qualified community investigators. That layer must not become a rumor feed, must name no private individuals, must require conflict disclosure, and must assess retaliation risk before raising visibility. No direct-contact relay exists. Adding one requires an amendment. Journalists gain no authority by occupation, and publication does not validate every claim.

Ranking: low-evidence or inactive problems may get less prominence and are never deleted or declared invalid. Severe minority problems are not buried for lack of engagement. Default lists use no engagement field and expose their criteria.

Rules: RANK-1

### III.5 CLAIM-SOURCES: Claim-specific sources and public memory
*Status: Decided · Old: Art 82, 84 · First phase: S1-min, P7*

External links to authoritative sources are allowed. Government records, judicial records, established institutions, credible reporting, and well-supported research generally weigh more than unsourced posts, but weight is claim-specific:

- A government source is authoritative on what was officially published, not on whether every assertion is true.
- A judicial finding differs from an allegation filed in court.
- A news article's weight depends on sourcing, independence, corrections, and method.
- A social post can prove a statement was made, not that it is true.
- A paper's relevance depends on methods, replication, scope, and validity.
- Any organization may have conflicts of interest.

Lower-ranked sources may be submitted and are not treated as equally reliable. Source policy is a policy pack governed under VIII.2, not a constitutional amendment. Source ranking is transparent, evidence-based, appealable, resistant to coordinated voting, and tested on known cases.

The public memory is durable and source-backed: claims, evidence, procedural actions, institutional responses, commitments, blockers, outcomes, corrections, and recurrence. Each material assertion identifies scope, time, jurisdiction, evidence, uncertainty, supporting and contradicting sources, verification status, and correction history. Volume, repetition, virality, and confidence never substitute for evidence. Durability does not override privacy, lawful deletion, safety, or source protection. Sensitive originals stay with competent custodians while the platform keeps a limited procedural attestation.

Rules: EVID-URL-1

### III.6 DURABLE-MEMORY: Durable memory and reactivation
*Status: Decided (Art 74); Drafted (Art 83) · Old: Art 74, 83 · First phase: P3*

A problem may remain with no active discussion. If a similar problem appears later, the system may link them, reactivate discussion, and notify previous participants that related activity exists.

- Retained: the non-identifying description, classification and scope, routes attempted, blockers, systemic hypotheses, related problems, outcome status and uncertainty, and lessons.
- Inactivity lowers prominence and never erases a problem. A later match compares context, not surface similarity.
- Notifications are opt-in. They carry no new sensitive context and support mute, unfollow, and leave. Sensitive categories never appear in lock-screen text, email subjects, or other external previews.

Rules: NOTIFY-CONSENT-1
