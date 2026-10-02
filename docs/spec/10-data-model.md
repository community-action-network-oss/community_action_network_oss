## 13. Data model baseline

The **slice-1 entity set** (15 entities) is in `01-slice-1-brief.md`, section 10, and its ERD is in `docs/design/`. The list below is the long-term list to evaluate as later phases arrive. It is a menu, not a commitment: add an entity only when a phase needs it.

Produce an entity-relationship model before implementation. At minimum evaluate these entities:

- User, profile, consent, authentication factor, role, scoped permission
- Geography, boundary, jurisdiction, legal layer (L0 to L6), legal corpus version and source, location claim, verification
- Problem, systemic parent, incident child, stakeholder, lifecycle transition, follow, duplicate link, causal link, dependency link, recurrence link
- Claim, claim status, contradiction, contribution, revision, evidence, evidence provenance, restricted evidence reference, attachment, citation, verification, correction
- Timeline event, institutional notice, acknowledgment, procedural action, deadline, commitment, commitment revision, missed commitment
- Institution, public asset, office, designation, jurisdictional term, authority, duty, responsibility attribution, dependency, response
- Solution proposal, comparison, decision record
- Implementation plan, task, owner, blocker, escalation route, permission, inspection, contractor, procurement record, funding source, cost distribution, update, outcome metric
- Candidate, elected officeholder, party, election, constituency, official candidacy source, candidate proposal, voter brief, civic report, report-card dimension, prominence policy
- Moderation decision, policy rule, policy pack, model run, escalation, appeal
- Expert claim, credential evidence, verification, expiry
- Review task, assignment, label, disagreement, quality score
- Governance issue, experiment, change decision
- Playbook, version, step, follower, feedback
- Notification, preference, delivery attempt
- Audit event, security event, retention action, deletion request

The capability profile is device-side only and never a server entity (`26-capability-profile.md`). Public problems gain a `help_needed` set (skill groups, languages, coarse place, topic), proposed by the poster and checked in volunteer review.

Classify fields by sensitivity. Define retention, deletion, export, anonymization, and access rules before storing production personal data.

