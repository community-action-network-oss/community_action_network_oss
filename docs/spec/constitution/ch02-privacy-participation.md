# Chapter II. Privacy, participation, and publication

Binds slice 1. Rewritten from Arts 18, 39-40, 47-49, 53, 60, 63, 65-67, 73, 77, 79, 80 and 96.

### II.1 PSEUDONYM-ZONES: Pseudonymity and data zones
*Status: Drafted (Art 18); Position (Art 47); Decided (Art 65) · Old: Art 18, 47, 65 · First phase: S1*

Transparency covers process, rules, evidence standards, decisions, uncertainty, conflicts of interest, model behavior, and governance. It does not require exposing personal data, precise private locations, vulnerable people, security-sensitive evidence, or confidential expert information.

Names are one of many identifiers. Free text, location, occupation, timing, photographs, voice, rare events, writing style, and combinations of facts can re-identify a person, so privacy is contextual, not just name removal.

- Participation is pseudonymous by default. Slice 1 uses a generated public handle (one regenerate before first publish). The email address is encrypted at rest and never shown. One handle per account is the slice-1 default; per-problem pseudonyms are an open question.
- Reviewer identity is never public.
- Identifiers differ across contexts (purpose-bound).
- No raw identity documents or biometric templates are stored.
- No bulk export and no cross-context joins.
- Re-identification risk is tested before publication.
- There is no exceptional-disclosure path inside public content. A person may take their own information to a competent authority outside the platform.

Storage zones keep these apart, with separate encryption domains where they exist: identity and uniqueness proof; transient unpublished drafts; moderation and review records; public problem evidence records; outcome attestations; public problems; public playbooks (not slice 1); constitutional and audit records. The content layer maximizes reusable knowledge. The identity layer minimizes linkability. The two goals are not conflated. Breached content cannot be promised useless. The enforceable goal is minimal linkability and external utility.

Rules: IDENT-1, PRIV-GATE-1

### II.2 ASSURANCE-ANTIBOT: Assurance and anti-bot
*Status: Position (Art 39); Drafted (Art 48, 49, 53) · Old: Art 39, 48, 49, 53 · First phase: S1-min, P5*

Assurance is proportional to what an action can do. Identity confidence decides which claims, labels, votes, or powers carry consequential weight. It never decides whether a genuine problem deserves help.

| Action | Assurance |
|---|---|
| Read public content | None (guest read) |
| Submit a problem | An account (invite redeemed at sign-up, email-code sign-in) plus rate limits. A human-presence mechanism beyond that is an open question. No conventional identity document. |
| Public contribution | Persistent pseudonymous account, anti-Sybil controls |
| Affected-party claim | Privacy-preserving evidence suited to context |
| Expert claim | Credential, work, assessment, or peer evidence (VII.1) |
| High-impact labeling | Stronger uniqueness, integrity, competence, conflict checks |
| Constitutional governance | Highest assurance without public identity |

Principles:

- A plain hash of an identity document is not an identity system. Reusable identity needs issuer-signed credentials, selective disclosure, pairwise identifiers, device-bound keys, and revocation without retaining the credential.
- Biometrics, liveness, device integrity, and passkeys are signals. None alone proves one human, one account, or trustworthiness.
- No IMEI, hardware serial, or raw biometric template is ever tied to a user ID. On-device biometrics may unlock a registered device, and that is not remote identity proofing.
- No single provider, face model, device identifier, government credential, or reputation score becomes the universal gatekeeper. False rejection, demographic performance, accessibility, provider concentration, and coercion are measured before any identity signal gains weight.
- A clear alternative exists for people who cannot or will not use facial verification.

- **Private location attestation (D-73, D-75).** Whether a message was sent from inside a problem's affected area is checked on the device. Exact coordinates, cells and location derived from an IP address never leave the device or reach a log. The server learns only "inside area X (version v) at time T", verifies the proof and discards it. The result is a per-message label (IV.2). Location signals are signals about a message, never a verdict about a person: any doubt downgrades the message to guest, and no sanction ever rests on a location signal alone. The attestation never enters a moderation input (`LOC-PRIV-1`, `LOC-DOUBT-1`).

Rules: ACCT-REQ-1, DEVICE-0, LOC-PRIV-1, LOC-DOUBT-1

### II.3 RECOVERY-USER: Recovery
*Status: Decided · Old: Art 63 · First phase: S1*

No administrator can recover an account unilaterally. Recovery rests on methods the user configured or on privacy-preserving re-verification: multiple passkeys or devices, authenticator apps, one-time backup codes, encrypted recovery keys, trusted contacts under threshold approval, or an accepted credential provider.

- No single trusted contact, provider, employee, node operator, or AI can recover an account alone.
- Recovery never reveals legal identity, problem history, labels, or private participation to contacts.
- A user who configures no recovery method may lose access permanently.
- Slice 1: the six-digit email code is the only sign-in and recovery path.

Rules: none yet.

### II.4 AGE-YOUTH: Age and youth
*Status: Drafted (Art 60, 73); Decided (Art 77) · Old: Art 60, 73, 77 · First phase: S1*

There is no universal age threshold. Each enabled jurisdiction pack defines eligibility separately for: reading, submitting, commenting, providing evidence, joining a stewardship group, moderating or labeling, claiming expertise, and governance. Age eligibility looks at statutes, child-data rules, contractual capacity, platform obligations, and safeguarding standards, not just a national constitution.

- If a capability has no jurisdiction age rule, it is denied, except public read.
- Age data is minimized. A young person is not punished for attempting constructive participation. Where age cannot be established, the safest lawful capability set applies.
- Child-safety and safeguarding duties are mandatory even for an adult-intended launch. Minors are never identified in public problems. A structural problem affecting children may be discussed without exposing any child's case.
- There is no private messaging, no direct contact channel, and no individualized youth service. Adding one requires an amendment.
- Slice-1 default before a jurisdiction pack sets age: writes are for invited adults (18 or older, attested at sign-up). This is an assumption, flagged as an open question.

Rules: AGE-DENY-1

### II.5 DELIBERATE-PARTICIPATION: Deliberate participation
*Status: Decided · Old: Art 40 · First phase: S1*

Every participant is part of the problem-solving team. The platform makes careful participation easier than impulsive participation. It rewards relevance, evidence, reflection, accuracy, constructive disagreement, correction, and responsibility over speed, outrage, volume, virality, or performative certainty.

Useful friction includes: reflection prompts before consequential submissions; declared contribution type and intended effect; evidence and uncertainty fields; stage-specific rules; cooldowns after repeated or heated contributions; revision before publication; plain reminders of affected people and applicable rules; independent labeling before exposure to group opinion; delayed or hidden popularity signals where they distort judgment; and recognition for corrections, restraint, and calibration.

Cooldowns attach to repeated or heated contributions only. There is no flat waiting period for ordinary comments. Cooldown length is a policy-pack number. This is the **deliberate participation standard**, and it describes observable conduct, not a preferred personality.

Rules: none yet.

### II.6 OPEN-PUBLICATION-GATE: Open publication and the privacy gate
*Status: Decided · Old: Art 66, 96 · First phase: S1*

The platform is open by design. Submitting a problem that is then accepted is the publication decision.

**Reuse and consent.** Public problem content needs no separate opt-in for constitutional uses: linking, aggregation, translation, summary, systemic-pattern detection, and routing knowledge. Notifications and any processing of a person's personal data do need consent. Advertising, identity profiling, sale, unrelated model training, and external behavioral tracking stay prohibited. Accepted problems are platform-wide. There is no per-problem visibility setting. Search-engine indexing is off by default (II.7).

**Before submitting, the interface says:** the problem becomes available across the platform; it may be analyzed, linked, aggregated, translated, summarized, and used for systemic detection and playbooks; withdrawal stops future use but cannot recall copies already viewed or made; personal and third-party identifying information is prohibited.

**Privacy gate.** A draft moves from `draft` to `in_review` (and so becomes visible to volunteers, masked) only after the gate checks direct and indirect identifiers: names and contact details; exact addresses and precise locations; identity, account, medical, employment, education, and legal reference numbers; faces, voices, signatures, document images, and metadata; unique job titles or role combinations; exact dates, rare events, relationship details, and narrative combinations; third-party information. `Contains no names` does not mean `cannot identify a person`. If a problem cannot be made non-identifying without losing what safe routing needs, it does not enter the platform in that form, and the person gets general resources.

**Drafts.** There is no hidden private problem that later goes public. Drafts are short-lived and exist only for checks. A rejected or withdrawn draft is hard-deleted within 30 days, and the UI shows the deletion date. A salted fingerprint is kept for 90 days to detect reposts.

**AI and personal data.** Every AI interaction assumes inputs and outputs may contain personal data. Raw intake stays private and transient. Restricted evidence, identity material, and private drafts never enter general-purpose AI environments. Production AI runs only through an approved privacy gateway with minimum context, bounded retention, non-training terms, output screening, minimal logging, deletion controls, and a non-AI fallback. AI output is untrusted. Publication follows the moderation run and its privacy checks (V.4), and the run fails closed (the item stays in `draft` or `submitted`) when privacy assurance is short. No model call happens without the gateway.

Rules: PRIV-GATE-1, DRAFT-TTL-1, NOTIFY-CONSENT-1, PRIV-GATEWAY-1

### II.7 NO-BULK-EXTRACTION: No bulk extraction
*Status: Drafted · Old: Art 79 · First phase: S1*

Accepted problems are open to participants without being auto-indexed by public search engines, served through unrestricted APIs, downloadable in bulk, or replicated with full context to every node. Access controls may limit scraping, bulk export, cross-problem re-identification, and hostile archival, while ordinary open participation and transparent rules stay intact. Slice-1 default: public pages carry `noindex`, list endpoints are paginated with a hard page cap, and no export endpoint exists.

Rules: none yet.

### II.8 WITHDRAWAL: Withdrawal
*Status: Drafted · Old: Art 80 · First phase: S1*

A participant may withdraw a problem or a contribution. Ordinary display and future use of the original text stop, subject to lawful retention and integrity needs.

**Withdrawal rule (new).**

- If no other account has an accepted contribution on the problem, the whole problem is withdrawn (state `withdrawn`) and the draft rules in II.6 apply.
- If at least one other account has an accepted contribution, the initiator's text is tombstoned ("Original report withdrawn by its author") and the problem stays. The moderation run may replace the title and summary with a non-identifying neutral text drawn from what remains. Contributions, decisions, and tasks by others are untouched.
- Deleting an account is treated as withdrawing everything that account authored, under the same rule. The handle is detached from remaining records.
- No `owner` field exists. Stewardship is IV.8.

Previously derived non-identifying aggregates, systemic conclusions, and playbooks may remain when they no longer expose or depend on the withdrawn text. Withdrawal propagates to compliant nodes (decentralization track), and recall of independent copies cannot be guaranteed.

Rules: OWN-1

### II.9 AGGREGATION-SAFE: Aggregation
*Status: Drafted · Old: Art 67 · First phase: P7*

Accepted non-identifying content may feed aggregate detection automatically, with safeguards, since combinations of open records can re-identify people or stigmatize a group:

- Minimum cohort and independence thresholds
- Suppression of rare combinations
- Coarsened geography and time windows
- No drill-down from a pattern to an individual problem when that creates linkability
- No quotation of uniquely identifying fragments
- Professional review for sensitive health, crisis, abuse, religion, ethnicity, sexuality, or political patterns
- A clear line between frequency on the platform and prevalence in the real population
- Defense against coordinated fake reports manufacturing a systemic problem

The platform may say "the platform received a pattern of reports meeting defined criteria". It may not claim that this proves prevalence, causation, guilt, or institutional responsibility without further evidence. Not in slice 1.

Rules: none yet.

### II.10 CAPABILITY-PROFILE-LOCAL: The private capability profile
*Status: Decided (D-80) · Old: none · First phase: P2*

A person may describe what they know, what they can give, the languages they use, the places they are connected to and what affects them, so the platform can show them the public problems they can help with. This capability profile is kept only on the person's own device. The platform never receives it, stores it, joins it with anything, or infers it from behaviour, and it holds no name, contact detail, exact location or identifier. Matching runs on the device against the public problem list. A profile kept this way is not a person profile in the sense of III and VII. Showing a person public problems on their own device is neither private matching (Art 59) nor assignment (Art 72): nobody is contacted, ranked or obliged, and taking part in a problem stays a public act under the ordinary rules. The person can view, edit, export and delete the whole profile at any time.

Rules: PROFILE-LOCAL-1
