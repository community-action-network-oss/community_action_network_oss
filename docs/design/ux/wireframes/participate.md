# Wireframes: contributions, proposals, decision record, tasks

Available to signed-in members on published problems. Contributions are grouped by declared type (never one comment stream). Signed-out visitors see these read-only with a sign-in prompt in place of the action buttons.

## WF-CONTRIB-1  Contributions grouped by type
Tab "Contributions" of WF-DETAIL-1.
```
+--------------------------------------+
| Contributions  [ Add to this problem]|
| Type [ All v ]   Sorted: oldest first|
|                                      |
| Questions awaiting answers (2)       |
|  Q  Who runs the shelters?           |
|     QuietHeron42, 3 Oct  [ Answer ]  |
| Evidence and sources (3)             |
|  E  City report, page 4              |
|     https://example.org/report       |
| Constraints (1)  Root causes (0)     |
|  (empty group shows {contrib.group.empty}) |
| Withdrawn items show as tombstones   |
+--------------------------------------+
```
Each item: type label, body, author handle, date, a "Report a concern" action (opens moderation feedback type). No reaction counts.

## WF-CONTRIB-2  Add a contribution
```
+--------------------------------------+
| {contrib.add.title}                  |
| What kind of contribution is this?   |
| ( ) Question  ( ) Answer  ( ) Source |
| ( ) Root cause ( ) Constraint        |
| ( ) Perspective ( ) Risk ( ) Update  |
| (list comes from the brief)          |
| {contrib.add.hint} per type hint     |
| [                                  ] |
| Links (https only) [ + Add link ]    |
| (!) inline privacy flags as intake   |
| {contrib.add.review} A volunteer may |
| review before it appears.            |
| [ Cancel ]            [ Post ]       |
+--------------------------------------+
```
A reflection pause is a text prompt, not a timer: "Read it once more before posting." (`contrib.add.reflect`).

## WF-PROPOSAL-1  Proposals and comparison
Tab "Proposals".
```
+--------------------------------------+
| Proposals (2)     [ Propose a fix ]  |
| Compare side by side (desktop)       |
|--------------------------------------|
| Proposal A: Reinstate the shelter    |
|  Mechanism: ward budget line         |
|  Outcome measure: shelter in place   |
|  Risks: cost, delay                  |
|  Status: Open for feedback           |
| Proposal B: ...                      |
| Table columns: Mechanism | Outcome   |
| measure | Risks | Status | Feedback  |
+--------------------------------------+
```
No vote counts and no ranking. Mobile shows one proposal at a time with a "Next proposal" control and a text summary of differences.

## WF-PROPOSAL-2  Create or edit a proposal
```
+--------------------------------------+
| {proposal.new.title} Propose a fix   |
| Summary        [                   ] |
| How would it work (mechanism) [    ] |
| How will we know it worked?    [    ]|
| Who would need to act? [            ]|
| Risks or side effects  [            ]|
| Is it lawful and safe? {proposal.new.lawful} |
| [ Save draft ]       [ Publish ]     |
+--------------------------------------+
```

## WF-DECREC-1  Decision record
Tab "Decision". Empty until a decision is recorded: `decrec.empty` ("No decision yet. Proposals are still open for feedback.").
```
+--------------------------------------+
| Decision record                      |
| Chosen: Proposal A                   |
| Decided by: QuietHeron42 (initiator, |
|   provisional steward)               |
| Confirmed by: a volunteer moderator  |
| Under: transitional stewardship rule |
| (Interim decision, will be re-       |
|  reviewed)  <- badge when interim    |
| Why: lowest cost, lawful, ...        |
| Decided 20 Oct 2026                  |
| [ See tasks ]                        |
+--------------------------------------+
```

## WF-TASK-1  Tasks
Tab "Tasks".
```
+--------------------------------------+
| Tasks (3)        [ Add a task ]      |
| [ ] Ask the ward office for budget   |
|     (Open) Assigned: Birch12         |
| [x] Share the meeting notes          |
|     (Done, awaiting verification)    |
| Nothing assigned? [ I can do this ]  |
+--------------------------------------+
```

## WF-TASK-2  Task detail and verification
```
+--------------------------------------+
| Ask the ward office for budget       |
| Status [ In progress v ]             |
| Update [                           ] |
| Verification: how can others check?  |
| Link  [ https://example.org/minutes ]|
| Note  [                            ] |
| {task.verify.hint} Verification is   |
| checked by someone other than the    |
| person who did the task.             |
| [ Save ]                             |
+--------------------------------------+
```
When all tasks are verified the status panel offers the transition to solved (confirmed by a moderator, per the brief). The final screen is WF-DETAIL-3 variants or the entry in WF-RESOLUTION-1.
