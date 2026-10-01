## 5. Problem lifecycle

Model lifecycle transitions explicitly. Every transition must record actor, timestamp, reason, previous state, new state, and relevant evidence.

### States and transitions

The state list, allowed transitions, actors, required fields, side effects, public labels and next actions are owned by `01-slice-1-brief.md` (section 4). Do not copy them here.

Design rules that apply to every lifecycle:

- `automated_review` is a synchronous check, not a state.
- `stuck`, `paused` and `withdrawn` exist. `paused` is not terminal.
- `appealed` is not a problem state. Appeals attach to moderation decisions.
- `investigation_needed` is a flag derived from the evidence tier, not a state.
- Timeouts flag a problem for people. They never change a state silently.
- Reopening terminal states is deferred and needs its own rules.
- Invalid transitions fail atomically.

### Public problem submission requirements

A submission should capture:

- Concise structural problem statement
- Observable condition, recurring pattern, institutional failure, shared risk, or systemic hypothesis
- Affected population and geography at the safest useful level
- Public significance and potential severity
- Responsible roles, institutions, systems, or processes
- Evidence tier, claim-specific sources, and provenance
- What evidence is missing and who could investigate it
- Known root-cause hypotheses, clearly marked as hypotheses
- Existing public responses or attempted interventions
- Desired public outcome and success measures
- Legal, constitutional, safety, rights, and environmental constraints
- Direct and indirect affected groups, including absent stakeholders
- Language and accessibility needs
- Confirmation that names, personal identifiers, individualized allegations, and private-matter material have been removed

A personal disclosure that cannot be transformed into a non-identifying public problem is not published. The interface may show static, jurisdiction-appropriate external routes before the transient draft is deleted (retention and fingerprint rules: `01-slice-1-brief.md`, "Drafts, fingerprints and the pending screen").

## 6. Structured participation

Avoid one undifferentiated comment stream. Every contribution has exactly one declared type. The single canonical enum, with the rules for which types are allowed in which state, is in `01-slice-1-brief.md` (section 6). Do not keep a second list.

Each contribution should support citations, scope, status, moderation outcome, and revision history. Slice 1 allows URL citations only, no file attachments. Use **targeted reflection delays** (for example after a rejected contribution or in a heated exchange), not a flat wait on every comment, and never delay urgent legitimate updates. Default lengths: `01-slice-1-brief.md`; the open question is `docs/open-questions/OQ-cooldown-lengths.md`.

### Ranking and visibility

Do not optimize for engagement (canonical rules: `17-ux.md`, "Deliberate, not addictive"). Ranking should prioritize relevance, evidence quality, local applicability, safety, novelty, and contribution to the current stage. Keep core-participant, visitor, and expert signals distinguishable. Provide chronological or transparent alternative views where practical.

## 7. Solution development and decisions

A solution proposal should contain:

- Summary and mechanism
- Target outcome and success metric
- Applicable geography and stakeholders
- Preconditions and dependencies
- Legal and safety considerations
- Estimated cost, effort, and time
- Responsible parties
- Risks and mitigations
- Implementation plan
- Verification plan
- Status and revision history

Do not assume majority voting is the correct decision rule. The decision method is an open question (`docs/open-questions/OQ-decision-method.md`). It must define how local legitimacy, expertise, feasibility, minority rights, legal constraints, and the preferences of the initiator and affected parties interact. The slice-1 default is a recorded decision with rationale and no vote. The system should support a configurable and explainable decision record rather than a single universal score.

