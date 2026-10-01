## 5. Problem lifecycle

Model lifecycle transitions explicitly. Every transition must record actor, timestamp, reason, previous state, new state, and relevant evidence.

### Suggested states

1. `draft`
2. `submitted`
3. `automated_review`
4. `needs_clarification`
5. `human_review`
6. `eligible`
7. `redirected`
8. `discovery`
9. `root_cause_analysis`
10. `solution_development`
11. `solution_selection`
12. `implementation`
13. `verification`
14. `solved`
15. `paused`
16. `closed`
17. `appealed`

The final state machine must define allowed transitions, required fields, authorized actors, timeouts, reopening rules, and side effects. Invalid transitions must fail atomically.

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
- Confirmation that names, personal identifiers, individualized allegations, and private case material have been removed

A personal disclosure that cannot be transformed into a non-identifying public problem is not published. The interface may show static, jurisdiction-appropriate external routes before deleting the transient draft.

## 6. Structured participation

Avoid one undifferentiated comment stream. Contributions should have a declared function:

- Clarifying question
- Factual answer
- Evidence or source
- Root cause
- Constraint
- Stakeholder perspective
- Proposed solution
- Improvement to proposal
- Risk or unintended consequence
- Implementation offer
- Progress update
- Verification evidence
- Moderation or governance feedback

Each contribution should support citations or attachments, scope, status, moderation outcome, and revision history. Design rate limits and reflection delays to reduce impulsive posting without preventing urgent legitimate updates.

### Ranking and visibility

Do not optimize for total engagement. Ranking should prioritize relevance, evidence quality, local applicability, safety, novelty, and contribution to the current stage. Keep core-participant, visitor, and expert signals distinguishable. Provide chronological or transparent alternative views where practical.

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

Do not assume majority voting is the correct decision rule. The founder must approve how local legitimacy, expertise, feasibility, minority rights, legal constraints, and problem-owner preferences interact. The system should support a configurable and explainable decision record rather than a single universal score.

