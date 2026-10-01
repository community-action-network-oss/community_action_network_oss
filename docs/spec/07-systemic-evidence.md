## 6A. Systemic problems, public evidence, and accountable implementation

**Status:** the problem graph, claim ledger, blocker ledger and the rest of this file are Phase 7 design (`18-phases-gates.md`). Slice 1 has `evidence_ref` (URL only), `duplicate_of` as the only link type, and an append-only event table with a nullable `prev_hash` (`01-slice-1-brief.md`). Systemic-hypothesis detection waits for the graph.

### Evidence tiers and `investigation_needed`

Evidence tiers (six, defined in the constitution at Constitution III.4, `EVIDENCE-TIERS`) describe how well a claim is supported. `investigation_needed` is a **derived flag**: it is true when the strongest tier attached to a problem is below the investigation threshold. It is not a tier, a workflow or a layer, and it does not change the lifecycle state.

### Problem graph

The platform must support both bounded incident problems and broader systemic problems without collapsing them into one discussion. A systemic parent may link to incident, geographic, institutional, legal-reform, implementation, or recurrence problems. Each child retains its own jurisdiction, affected scope, evidence, stewardship, authority map, lifecycle, and outcome.

A parent problem may aggregate patterns and common reforms, but a linked incident does not automatically prove the parent hypothesis. Similarity, coordinated submissions, or high report volume does not establish independence, prevalence, causation, or institutional responsibility. Every cross-problem conclusion must identify the qualifying cases, comparison method, uncertainty, and evidence threshold.

The graph must support:

- Parent and child problems
- Duplicate, related, causal, dependency, recurrence, and reform links
- Different stewardship groups at parent and child levels
- Inherited context without inherited truth status
- Cross-problem summaries with drill-down and provenance
- Separate lifecycle and resolution states
- Partial closure of an incident while the systemic parent remains active
- Reopening when credible recurrence appears

### Claim and evidence ledger

Evidence must attach to a specific claim rather than merely to a problem or discussion. Each claim should record:

- Exact claim text and scope
- Whether it is an observation, allegation, hypothesis, interpretation, official position, verified fact, or outcome claim
- Relevant problem, geography, institution, role, and time period
- Supporting and contradicting evidence
- Evidence status and confidence
- Material uncertainty and missing evidence
- Reviewer decisions and appeals
- Revision and correction history

Each evidence record should include:

- Evidence category
- Source and provenance
- Authoritative external URL or restricted reference where appropriate
- Submitter relationship to the evidence
- Acquisition and publication dates
- Jurisdiction and language
- Integrity metadata where lawful and useful
- Redactions and access classification
- Claims supported or contradicted
- Verification status
- Retention and withdrawal rules

Legal and procedural material must distinguish reports, complaints, acknowledgments, first information reports or equivalent filings, allegations, charges, investigation findings, official records, judicial findings, appeals, and final outcomes. A filing proves that a filing exists; it does not prove every assertion within it.

### Evidence safety and restricted references

The platform must not interpret `share everything` as permission to publish every artifact. Public discussion must exclude identifying documents, private communications, raw credentials, candidate identifiers, confidential legal material, unsafe infrastructure details, active-investigation evidence, unlawfully obtained data, leaked examination content, and material that creates material retaliation or re-identification risk.

Where public storage is unsafe or unlawful, record a limited attestation such as:

- Evidence category
- Redacted non-identifying summary
- Provenance and integrity reference
- Competent external recipient
- Submission date
- Receipt or reference token where safe
- Procedural status
- Verification outcome

Sensitive originals should remain with the competent authority, court, lawyer, regulator, journalist, investigator, infrastructure owner, or other appropriate custodian. The platform tracks status and provenance without becoming an uncontrolled evidence repository.

### Tamper-evident event timeline

Every problem should have a structured, append-oriented timeline. Events may include:

- Problem or incident identified
- Evidence submitted or corrected
- Responsible institution notified
- Acknowledgment received
- Inspection or investigation opened
- Action or remedy requested
- Commitment made
- Deadline established, changed, met, or missed
- Funding or authorization requested
- Proposal accepted or rejected
- Implementation started, paused, or completed
- Court or administrative decision recorded
- Outcome observed, disputed, or verified
- Recurrence detected

Each event must record actor or source, time, jurisdiction, related claim, evidence, confidence, visibility, and correction history. Corrections must not silently erase the prior record. Preserve the original value, corrected value, reason, authorizing process, evidence, and timestamp, subject to privacy and lawful deletion obligations.

### Asset, authority, and responsibility map

For public infrastructure and institutional problems, distinguish:

- Asset owner
- Operator and maintainer
- Funding authority
- Permission or licensing authority
- Implementation authority
- Oversight institution
- Investigation or adjudication authority
- Contractor or delivery organization
- Affected-party representative roles
- Office that can provide the requested remedy

Responsibility must be source-backed and time-bounded. A problem occurring during an office term does not by itself establish responsibility. Attribution should evaluate formal duty, actual authority, notice, capacity, action or inaction, dependencies, inherited conditions, and verified outcomes.

### Blocker ledger

A blocker must describe an obstructed task or decision, not infer a person's character or motive. Each blocker should record:

- Blocked task, decision, or outcome
- Responsible institution and exact time-specific designation
- Source establishing responsibility or dependency
- Required action
- Date requested and response period
- Response, non-response, or disputed responsibility
- Evidence supporting the blocker classification
- Dependency and authority still required
- Current owner and review date
- Next lawful escalation route
- Resolution condition

Supported statuses should include awaiting acknowledgment, assigned role, records, jurisdiction determination, technical review, investigation, administrative decision, court outcome, funding, permission, implementation, or verification; missed documented deadline; institution disputes responsibility; no documented response; legally blocked; and resolved.

The platform may state a documented fact such as `the designated authority did not publish the promised status report by the recorded deadline`. It must not infer corruption, conspiracy, malicious intent, or guilt without appropriately authoritative evidence.

### Action and procedural tracker

Participants should record lawful work already performed or planned, including complaints, public-information requests, representations, inspections, meetings, public hearings, peaceful demonstrations, administrative appeals, public court records, technical assessments, funding requests, proposals, institutional commitments, and implementation follow-up.

Each action should record:

- Purpose
- Responsible participant or group
- Institutional destination
- Date and jurisdiction
- Receipt, source, or acknowledgment
- Current procedural status
- Deadline and next step
- Related blocker and dependency
- Whether qualified legal, engineering, safety, or domain review is required

The platform organizes public procedural information. It must not impersonate a lawyer, engineer, investigator, public authority, or emergency service.

### Community-led implementation paths

Every implementation proposal should identify one of these authority patterns:

1. **Public delivery:** The competent public institution authorizes, funds, executes, and maintains the intervention.
2. **Community-controlled delivery:** A community, association, or private owner implements work entirely within assets and authority it lawfully controls.
3. **Hybrid delivery:** The community funds or coordinates diagnosis, design, procurement, monitoring, or part of delivery while the competent public institution grants permission, performs regulated work, connects public assets, inspects, or accepts maintenance responsibility.
4. **Temporary mitigation:** A bounded, safe, reversible measure reduces immediate harm while permanent resolution proceeds.

Community support does not authorize modification of public assets, unsafe work, entry into hazardous infrastructure, handling of dangerous material, interference with an investigation, or actions requiring licensed competence. Proposals must identify permits, asset ownership, technical review, contractor qualifications, insurance or liability where applicable, downstream effects, maintenance responsibility, cost distribution, and stopping conditions.

The platform must prevent public delay from automatically transferring the cost of public obligations to residents. Funding decisions should disclose who benefits, who pays, ability to pay, public obligations, alternatives, conflicts, procurement method, and long-term maintenance.

### Mass participation architecture

Large systemic problems must not become million-person chat rooms. Mass reach should be converted into bounded contribution tasks, incident workspaces, evidence requests, review queues, translations, affected-party verification, implementation offers, and outcome checks.

At scale, support:

- Parent systemic stewardship and child incident stewardship
- Capability working groups
- Structured submission forms
- Duplicate detection and incident clustering
- Independent-source and coordination analysis
- Rate limits and anti-automation controls
- Multilingual moderation and translation review
- Context-masked distributed review
- Sampling and prioritization without treating popularity as truth
- Public summaries that preserve drill-down provenance
- Contribution queues such as evidence verification, timeline correction, authority mapping, translation, technical review, and outcome verification

Audience size, followers, reposts, signatures, and submission volume indicate reach or support, not evidence quality, affected-party legitimacy, expertise, or decision authority.

