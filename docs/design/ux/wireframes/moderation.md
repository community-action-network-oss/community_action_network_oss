# Wireframes: moderator queue, review, appeals, invites

Moderator role only. Desktop first (two panes), usable on mobile as stacked screens. Interim moderator disclosure appears wherever a decision is made while the pool is below the panel threshold.

## WF-MOD-QUEUE-1  Review queue
Route `/mod`.
```
+----------------------------------------------+
| Review queue   (Interim: 1 active moderator) |
| [ Submissions (4) ] [ Appeals (1) ] [Invites]|
| Oldest first. Waiting longest at the top.    |
| Waiting  Title                  Place        |
| 5 days   Bus shelter missing    Northfield   |
| 3 days   Water fountain broken  Northfield   |
| 1 day    ...                                 |
| Flags: 2 privacy flags kept by author        |
| [ Open ]                                     |
| {mod.queue.empty} Nothing waiting. (empty)   |
+----------------------------------------------+
```
No gamified counts. The wait column helps keep the honest wait statement true.

## WF-MOD-REVIEW-1  Review a submission
```
+----------------------+-----------------------+
| SUBMISSION           | DECISION              |
| Condition            | Outcome               |
| [text with flagged   | ( ) Publish           |
|  spans highlighted]  | ( ) Ask for changes   |
| Affected / Where     | ( ) Not eligible,     |
| Observed / Uncertain |     redirect          |
| Sources (open links) | Rules applied         |
| Author kept flags:   | [ RULE-PRIV-NAME v ]+ |
|  Condition: "Mr. Rao"| Field  [ Condition v ]|
| Duplicates: none     | Text span [select]    |
|                      | Hint to the author    |
| History: submitted,  | [                   ] |
|  edited once         | {mod.review.hint}     |
|                      | Written for the person|
|                      | not for the rulebook. |
|                      | Appealable until      |
|                      |  [ 15 Oct 2026 ] (14 d) |
|                      | [x] Interim decision  |
|                      |  (auto when pool < 2) |
|                      | [ Record decision ]   |
+----------------------+-----------------------+
```
Appeal window defaults to 14 days and must end before the draft deletion date. Record decision requires at least one rule id; "Ask for changes" and "Not eligible" also require a field or span reference and a hint. Publish needs no hint. The server rejects an incomplete decision (`decision_incomplete`).

## WF-MOD-APPEAL-1  Review an appeal
```
+--------------------------------------+
| Appeal on: Bus shelter (Changes requested)|
| Original: RULE-PRIV-NAME by Moderator A|
| Reviewer: you (differs: yes)         |
| {mod.appeal.same} shown if the same  |
| interim moderator must review        |
| Author statement: ...                |
| Original hint and text span          |
| Outcome ( ) Uphold ( ) Overturn      |
| Rules [ ... ]  Note [             ]  |
| [ Resolve appeal ]                   |
+--------------------------------------+
```
The queue hides appeals from the original decider when two or more moderators exist.

## WF-MOD-INVITE-1  Issue invite
```
+--------------------------------------+
| Issue an invite                      |
| Expires in [ 14 days v ]             |
| [ Create code ]                      |
| Code (shown once): ABCD-EFGH         |
| [ Copy ]                             |
| {mod.invite.note} Share it directly. |
| Recent invites: 3 issued, 1 redeemed |
+--------------------------------------+
```
