# Wireframes: contributions, proposals, decision record, tasks

Available to signed-in members on published problems. Every form here is rendered from its content schema (forms.md). Contributions are grouped by declared type (never one comment stream). Signed-out visitors see these read-only with a sign-in prompt in place of the action buttons.

## WF-CONTRIB-1  Contributions grouped by type
**Retired (D-72):** per-type contributions move into stages: options in WF-STAGE-1, ahead of time in WF-STAGE-3. The schema forms still apply.
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

## WF-CONTRIB-2  Add a contribution (schema form)
Renders WF-FORM-1 from the contribution schema for the chosen type. The type list comes from the brief; each type has its own fields (for example a `root_cause` asks for the cause, the evidence that supports it, and what is assumed).
```
+--------------------------------------+
| {contrib.add.title}                  |
| {contrib.add.type} What kind?        |
| ( ) Question  ( ) Observation        |
| ( ) Evidence  ( ) Root cause ...     |
| (types from the brief; allowed types |
|  depend on the problem's state)      |
|--------------------------------------|
| Fields for the chosen type (schema)  |
|  Field label, why we ask, example    |
|  [ structured answer               ] |
|  How do you know? ( ) seen ( ) source|
|  [ Suggest an answer ] (Assisted)    |
|  Links (https only) [ + Add link ]   |
| (!) privacy flags and hints beside   |
|     the field (WF-FORM-3)            |
| {contrib.add.review}                 |
| {contrib.add.reflect}                |
| [ Cancel ] [ Save draft ] [ Post ]   |
+--------------------------------------+
```
Post runs the moderation run (`pending.checking`); the contribution shows to others only on `publish`. A held contribution uses the WF-HOLD-1 copy.

## WF-PROPOSAL-1  Proposals and comparison
**Retired (D-72):** replaced by Options in WF-STAGE-1. Comparison stays as a view inside it.
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

## WF-PROPOSAL-2  Create or edit a proposal (schema form)
```
+--------------------------------------+
| {proposal.new.title} Propose a fix   |
| Section 1 of 4: What it does         |
|  Summary  [ structured             ] |
|  Mechanism (how it would work)       |
| Section 2: Evidence it would work    |
|  Outcome measure (how will we know)  |
| Section 3: Lawful options            |
|  {proposal.new.lawful}               |
|  Law or rule that allows it [      ] |
|  ( ) I do not know yet               |
| Section 4: Risks and assumptions     |
|  Who must act, side effects, what is |
|  assumed (WF-FORM-4)                 |
| [ Suggest an answer ] per field      |
| [ Save draft ]       [ Publish ]     |
+--------------------------------------+
```
Publish runs DP-LEGALITY, DP-COMPLETENESS and DP-ASSUMPTIONS. A blocked proposal returns hints beside fields; a legality block shows the constraint, its source and version, and what could be done instead.

## WF-DECREC-1  Decision record
**Retired (D-72):** replaced by Choice in WF-STAGE-1. The record, dissent and policy badge are kept there.
Tab "Decision". Empty until a decision is recorded: `decrec.empty`.
```
+--------------------------------------+
| Decision record                      |
| Chosen: Proposal A                   |
| Decided by: QuietHeron42 (initiator, |
|   provisional steward)               |
| Method and authority                 |
| Why: lowest cost, lawful, ...        |
| {decrec.dissent} Dissent kept        |
| {decrec.checked} Checked for         |
|   completeness under policy 1.0.0    |
| {status.decidedUnder} or             |
|   {status.transitional} (badge)      |
| Decided 20 Oct 2026                  |
| [ See tasks ]                        |
+--------------------------------------+
```

## WF-DECREC-2  Record a decision (schema form)
```
+--------------------------------------+
| {decrec.new.title} Record the decision|
| Chosen proposal [ Proposal A v ]     |
| Method used (select + describe)      |
| Why this one (reasons, one per line) |
| Who decided and on what authority    |
| Dissent and concerns raised          |
|   ( ) none were raised               |
| Legal check: law and version cited   |
| Assumptions made (WF-FORM-4)         |
| [ Suggest an answer ] per field      |
| [ Save draft ]    [ Record ]         |
+--------------------------------------+
```
Record runs DP-DECISION-RECORD and DP-LEGALITY (gate T11). The check is for completeness and consistency, never whether the decision is good.

## WF-TASK-1  Tasks
**Retired (D-72):** replaced by Steps in WF-STAGE-1. WF-TASK-2 stays as the step detail and verification form.
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

## WF-TASK-2  Task detail and verification (schema form)
```
+--------------------------------------+
| Ask the ward office for budget       |
| Status [ In progress v ]             |
| Update (schema: what was done, what  |
|  is next, what blocks it)  [       ] |
| Verification (schema)                |
|  {task.verify.evidence} What shows   |
|  the task is done?                   |
|  Link  [ https://example.org/minutes ]|
|  What the source shows [           ] |
|  Assumptions (WF-FORM-4)             |
| {task.verify.hint}                   |
| [ Save draft ]  [ Submit update ]    |
+--------------------------------------+
```
Update and verification run DP-STAGE and DP-VERIFICATION. When all tasks are verified, the initiator may propose solved with the outcome statement (schema form); the moderation run decides (T14) and the page shows the policy version. A completed task alone is not solved. Final screens are WF-DETAIL-3 variants or the entry in WF-RESOLUTION-1.
