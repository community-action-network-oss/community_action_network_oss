# Wireframes: auditors, labelers, the emergency and legal lane

There are no per-item moderators. People change the rules (policy.md); an automated moderation run applies them. This file covers the human work that remains: auditors sample-check decisions, labelers answer label tasks from appeals and evals, and a small lane handles emergencies and legal matters. Desktop first (two panes), stacked on mobile.

Visibility rule: everything before publication (draft, awaiting review, changes requested, not accepted) is visible to the initiator only. Auditors and labelers see only masked copies: redacted text, no handles, no accounts, no author identity, and only the context the question needs. The lane sees the minimum redacted record for its case. Nobody in this file can publish, reject, or overturn one item by hand.

## WF-AUDIT-1  Review work list
Route `/review`. Auditors and labelers. Random order, no counts as status.
```
+----------------------------------------------+
| {review.title} Review work                   |
| {review.body} You see masked copies.         |
| {review.noCounts} Offered in random order.   |
| Audit samples                                |
|  Sample 1  Decision on privacy, Amsterdam    |
|    Why picked: random    [ Open ]            |
|  Sample 2  Near threshold    [ Open ]        |
| Label tasks                                  |
|  Task 1  Does rule R apply to this text?     |
|    [ Open ]                                  |
| {review.empty} Nothing is waiting. (empty)   |
+----------------------------------------------+
```
Not permitted for other roles: `common.notPermitted.body` with role auditor or labeler.

## WF-AUDIT-2  Audit a sampled decision
Route `/review/audit/{id}`. Context-masked.
```
+----------------------+-----------------------+
| MASKED INPUT         | DECISION UNDER AUDIT  |
| {audit.why}          | Outcome: needs_revision|
| Picked at random.    | Rules: RULE-PRIV-NAME |
| Redacted text with   | Field and span marked |
| the span marked      | Hint given            |
| (no handle, no       | Policy 1.0.0, run id  |
|  account, no place   | Model class, prompt   |
|  beyond jurisdiction)| hash                  |
|                      |-----------------------|
| The rule text        | {audit.q.agree} Does  |
|  as written          | the decision follow   |
|                      | the rule as written?  |
|                      | ( ) {audit.agree}     |
|                      | ( ) {audit.disagree}  |
|                      | ( ) {audit.unclear}   |
|                      | {audit.note} What     |
|                      | should the rule say?  |
|                      | [                   ] |
|                      | [ ] {audit.conflict}  |
|                      | [ {audit.send} ]      |
+----------------------+-----------------------+
```
Your review is recorded before the group result is shown. A disagreement is tracked per rule and decision point and can seed a policy proposal (WF-POLICY-1). It does not change the item. After sending: `audit.sent`.

## WF-LABEL-1  Label task
Route `/review/label/{id}`. From appeals and eval sets. Randomized, context-masked, quorum and rule fixed before labels arrive.
```
+--------------------------------------+
| {label.title} Label task             |
| {label.q} Does rule R apply to this  |
| text?                                |
| The rule as written                  |
| Redacted text (no identity)          |
| {label.masked} Context is limited to |
| what the question needs.             |
| ( ) {label.yes} Yes  ( ) {label.no}  |
| ( ) {label.unsure} Not sure          |
| {label.independent} Your label is    |
| recorded before the group result.    |
| [ ] {audit.conflict}                 |
| [ {label.send} ]                     |
+--------------------------------------+
```
The label becomes an example or rule change only through a policy proposal.

## WF-LANE-1  Emergency and legal lane console
Route `/lane`. Small, trained group. Least privilege.
```
+----------------------------------------------+
| {lane.title} Emergency and legal lane        |
| {lane.scope} Every action is logged.         |
| {lane.noPublish} Cannot publish or overturn. |
| Case (redacted record, rule ids, run record) |
|  Trigger: DP-CRISIS or DP-LEGAL              |
|  Jurisdiction pack route: emergency channel  |
| {lane.action} Action                         |
|  ( ) Contact the channel the pack names      |
|  ( ) Record a safety or legal hold           |
|  ( ) Answer a legal request                  |
| {lane.reason} Reason (required) [          ] |
| [ {lane.record} Record action ]              |
| {lane.logged} A second member reviews it.    |
| {lane.empty} No cases waiting. (empty)       |
+----------------------------------------------+
```
Each action writes an audit event (actor, time, case ref, rule ids, action, reason) with no raw personal data. A redacted example candidate is produced for the policy so the lane shrinks over time.

## WF-MOD-INVITE-1  Issue invite
Route `/review/invites`. Steward and maintainer function, unchanged in behaviour.
```
+--------------------------------------+
| {mod.invite.title} Issue an invite   |
| Expires in [ 14 days v ]             |
| [ Create code ]                      |
| Code (shown once): ABCD-EFGH         |
| [ Copy ]                             |
| {mod.invite.note} Share it directly. |
+--------------------------------------+
```
