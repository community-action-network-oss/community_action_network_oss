# Wireframes: stage map and stage workspace (lifecycle v2, D-72)

After publication (`active`) the problem runs a per-problem stage plan: a DAG of stages joined by `depends_on`, serial, parallel or mixed. A stage cannot start until all stages it starts after are resolved (STAGE-GATE-1). People can contribute to planned stages ahead of time (STAGE-PREP-1). Stage states: planned, ready, active, resolving, resolved, blocked, skipped. Copy ids are in `../copy-deck-lifecycle.md`.

## WF-STAGEMAP-1  Stage map on the problem page
Replaces the single "Stage:" line of the old status panel in WF-DETAIL-1. Route `/problems/{id}`, tab "Overview" (the old tabs for proposals, decision and tasks fold into the stage workspace).
```
+--------------------------------------+
| Amsterdam city centre cleaning       |
| (Active: 2 stages in progress)       |
| {lifecycle.chip.activeMany}          |
|--------------------------------------|
| {stagemap.title}                     |
| {stagemap.help}                      |
| [ {plan.view.graph} | {plan.view.list} ]|
|                                      |
| [Facts: Done] --> [Solutions:        |
|                    In progress] *    |
|                      |               |
|                      +--> [Choose:   |
|                           Planned]   |
| [Funding: In progress] * ----------+ |
|                                    v |
|                  [Final criteria]    |
| * {stagemap.current}                 |
+--------------------------------------+
```
Accessible list view (equivalent to the graph, default for screen readers and one column phones; the toggle is always visible):
```
+--------------------------------------+
| Stages (5), list                     |
| 1 Facts           (Done)             |
|   Starts after: nothing              |
| 2 Solutions       (In progress)      |
|   {stagemap.current}                 |
|   {stagemap.after} Facts             |
|   [ {stagemap.open} ]                |
| 3 Funding         (In progress)      |
|   {stagemap.current}                 |
|   Starts after: nothing              |
|   [ {stagemap.open} ]                |
| 4 Choose          (Planned)          |
|   {stagemap.after} Solutions         |
|   [ {stagemap.open} ]                |
| 5 Pilot           (Blocked)          |
|   {stagemap.blockedWhy} permit       |
|     not yet granted                  |
| 6 Old survey      (Skipped)          |
|   {stagemap.skippedWhy} covered by   |
|     Facts                            |
| {stagemap.final}: after Choose,      |
|   Funding                            |
| [ {stagemap.change} ]                |
+--------------------------------------+
```
Rules: every node shows its stage name and a chip with the text label (Planned, Ready, In progress, Checking evidence, Done, Blocked, Skipped), never colour alone; current stages (ready, active, resolving) also carry the text "Current" and a thicker outline. Edges are drawn as arrows and are always also stated in words ("Starts after"). Tab and arrow keys move between nodes in the graph; Enter opens the stage. The list is ordered so a stage always appears after the stages it starts after, and is the same data as the graph. The problem chip reads "Active: stage {name}" for one active stage and "Active: {n} stages in progress" for several. Solved shows only after every required stage is Done and DP-VERIFICATION confirms the final criteria (`{lifecycle.chip.solved}`). A blocked stage cites its constraint; blocked and skipped use neutral colours. A plan change proposal opens a schema form checked by DP-STAGE-PLAN and is never applied silently (PLAN-CHANGE-1). A published problem with no stage plan shows only the final criteria and a "Propose a change to the plan" action.

## WF-STAGE-1  Stage workspace
Route `/problems/{id}/stages/{stageId}`. Shown for stages in state ready, active or resolving.
```
+--------------------------------------+
| < Stage map                          |
| Solutions  (In progress)             |
| {stagemap.after} Facts (Done)        |
|--------------------------------------|
| {stage.options}                      |
|  1 Weekly collection on route 12     |
|    Added by Birch12                  |
|  2 Add 40 street bins                |
|  [ {stage.option.add} ] -> schema form|
|  ({stage.option.empty} if none)      |
|--------------------------------------|
| {stage.choice}                       |
| {stage.choice.method}                |
|   The poster chooses, after input    |
| {stage.choice.pending}               |
| [ {stage.choice.make} ] (decider only)|
| (after) {stage.choice.chosen}        |
|--------------------------------------|
| {stage.steps}                        |
|  [ ] Ask the ward office for budget  |
|      (Open) Assigned: Birch12        |
|  [x] Share the meeting notes (Done)  |
|  [ {stage.step.add} ]                |
|  ({stage.step.empty} before choice)  |
|--------------------------------------|
| {stage.evidence}                     |
|  Meeting minutes, 3 Oct (link)       |
|  [ {stage.evidence.add} ]            |
|--------------------------------------|
| {stage.criteria}                     |
| {stage.criteria.progress} 1 of 2     |
|  [x] Costed options published        |
|      Evidence: minutes, 3 Oct        |
|  [ ] A choice is recorded            |
|      No evidence yet                 |
| [ {stage.submit} ]                   |
+--------------------------------------+
```
Rules: the decision method comes from the stage metadata (the poster after community input, or the community). Options, steps and evidence use the schema forms (WF-FORM-1) and are checked before they appear; steps reuse the task detail and verification form (WF-TASK-2), and verification is by someone other than the doer. Each criterion shows a text checklist state ("Has evidence" or "No evidence yet"), not a colour. Submitting evidence moves the stage to Checking evidence; while it runs the screen shows `{stage.checking}` and the criteria are read only. Dissent and concerns stay with the choice record (the old decision record, WF-DECREC-1, is now shown here).

## WF-STAGE-2  Stage resolution result
Route `/problems/{id}/stages/{stageId}/result`. Written by DP-STAGE-RESOLUTION; appealable (STAGE-RESOLVE-1).
```
+--------------------------------------+
| {stage.result.title}                 |
| Solutions  (Done)  or  (In progress) |
| Policy badge: Decided under policy v3|
|--------------------------------------|
| Costed options published             |
|   {stage.result.met} Met             |
|   {stage.result.why} Minutes show    |
|   three costed options.              |
| A choice is recorded                 |
|   {stage.result.notMet} Not met yet  |
|   {stage.result.why} The record does |
|   not say who chose or when.         |
|   {stage.result.next} Post the choice|
|   record, then submit again.         |
|--------------------------------------|
| {stage.result.rule}                  |
| {stage.result.done}                  |
|  (only when every criterion is met)  |
| [ {stage.result.appeal} ]            |
| [ Back to the stage ]                |
+--------------------------------------+
```
Rules: each criterion gets Met or Not met yet in words, with an explanation and, when not met, what would help. Not met is a normal result and uses a neutral note style, not red. The rule id and policy version are shown. When all criteria are met the stage becomes Done and its successors become Ready; otherwise it returns to In progress and the poster and contributors keep working. Appeal goes through WF-APPEAL-1 and is available to the poster and any contributor to that stage until `appealable_until`. The final problem result (solved) uses the same layout over the final criteria and the DP-VERIFICATION decision.

## WF-STAGE-3  Contribute ahead to a planned stage
Route `/problems/{id}/stages/{stageId}` when the stage is Planned.
```
+--------------------------------------+
| Choose  (Planned)                    |
| {stage.locked} Solutions             |
|--------------------------------------|
| {stage.ahead.title}                  |
| {stage.ahead.body}                   |
| {stage.ahead.waiting} Solutions      |
|--------------------------------------|
| {stage.options}                      |
|  1 Pick the lowest cost option       |
|    {stage.ahead.kept}                |
| [ {stage.ahead.add} ]                |
|  (options, evidence notes and        |
|   criteria suggestions)              |
| Not available yet: choosing,         |
|   steps, submitting evidence         |
+--------------------------------------+
```
Rules: contributions go through the same schema forms and automated checks as in an active stage, and are kept ready (STAGE-PREP-1). Choosing an option, creating steps and submitting evidence stay unavailable until the stage is Ready and then In progress, and say so in words. When the stage starts, ahead contributions appear in the stage workspace marked "Added ahead of time". A stage that is Skipped shows its reason and keeps ahead contributions readable.
