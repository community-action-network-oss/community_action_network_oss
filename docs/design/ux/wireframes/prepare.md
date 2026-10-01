# Wireframes: preparation and volunteer review (lifecycle v2, D-72)

A poster prepares the problem privately (`draft`), volunteers recommend changes (`in_review`), the poster answers each recommendation, then the AI publication check runs. Fields come from the content schema (WF-FORM-*); none of these screens hard-codes a field. Copy ids are in `../copy-deck-lifecycle.md`.

## WF-PREP-1  Preparation workspace
Route `/me/problems/{id}`. State `draft` (chip `{lifecycle.chip.draft}`), and `needs_revision` with hints beside fields.
```
+--------------------------------------+
| {prep.title}  (Draft)                |
| {prep.private}                       |
| {prep.progress} 2 of 4 parts ready   |
|--------------------------------------|
| 1 {prep.part.facts}   (Ready)        |
|   [ Open: WF-FORM-1 section form  ]  |
| 2 {prep.part.sources} (Not finished) |
|   {prep.sources.title}               |
|   {prep.sources.body}                |
|   https://example.org/report         |
|     (Official or primary source)     |
|     {prep.trust.high}                |
|   https://blog.example/post          |
|     (Not verified) {prep.trust.low}  |
|   {prep.trust.help}                  |
|   [ {submit.evidence.add} ]          |
| 3 {prep.part.criteria} (Ready)       |
|   2 criteria     [ Edit: WF-PREP-2 ] |
| 4 {prep.part.stages}  (Not finished) |
|   Optional       [ Edit: WF-PREP-3 ] |
|--------------------------------------|
| {prep.sendReview.missing}            |
|   Trusted sources                    |
| {prep.sendReview.masked}             |
| [ Check my draft ] [ Save draft ]    |
| [ {prep.sendReview} ] (disabled)     |
+--------------------------------------+
```
Rules: every part has a text status (Ready or Not finished), never colour alone. Sources are a URL list field (WF-SUBMIT-2) plus a trust hint beside each link: a text label and an icon, advice only, never blocking. In `needs_revision`, hints appear beside the fields as in WF-FORM-3, with rule id and policy version. Send is enabled when facts, at least one source (or "I do not have a source yet", which stays marked "needs evidence") and the final criteria are ready; the stage plan is optional (`{plan.optional}`). The privacy check (WF-SUBMIT-3) and the exact preview (WF-SUBMIT-4) run before the send. Sending moves the problem to `in_review`.

## WF-PREP-2  Acceptance criteria editor (final criteria)
Route `/me/problems/{id}/criteria`. The same editor is reused per stage inside WF-PREP-3.
```
+--------------------------------------+
| {crit.title}                         |
| {crit.body}                          |
| {crit.count} 2 criteria              |
|--------------------------------------|
| Criterion 1                          |
| {crit.statement}                     |
|  [ Every ward bin on route 12 is    ]|
|  [ emptied at least twice a week    ]|
| {crit.measure}                       |
|  [ Count of collections in the city  |
|    open data log                    ]|
| {crit.target}  [ 2 per week, 8 weeks]|
| {crit.evidence}                      |
|  [ Link to the published log        ]|
| {crit.example}                       |
|  Example, synthetic: "Reported       |
|  response time under 5 days for 90   |
|  percent of cases over 3 months."    |
| (Needs a closer look) {crit.hint.vague}|
| [ {crit.remove} ]                    |
|--------------------------------------|
| [ {crit.add} ]                       |
| {crit.required}                      |
| [ Back ]   [ Save draft ]            |
+--------------------------------------+
```
Rules: one measurable statement per criterion, with measure, target and evidence fields (the schema may rename them). Examples are labelled synthetic. A vague statement gets a neutral hint with text and an icon, never red. No free text box without structure. At least one final criterion is required to send for review (`{crit.required}`). DP-VERIFICATION later judges the problem solved against these criteria, so volunteers can recommend changes to any of them (WF-VREVIEW-2).

## WF-PREP-3  Stage plan editor
Route `/me/problems/{id}/stages`. Optional. Starting choice first, then the plan as a graph with an equivalent list.
```
+--------------------------------------+
| {plan.title}                         |
| {plan.optional}                      |
| ( ) {plan.start.template}            |
|     {plan.template.help}             |
| ( ) {plan.start.blank}               |
|--------------------------------------|
| [ {plan.view.graph} | {plan.view.list} ]|
| {plan.graph.title}  {plan.graph.help}|
|                                      |
|  [Facts] --> [Solutions] --> [Choose]|
|                  \                   |
|                   +-> [Pilot] -+     |
|  [Funding] -------------------+-> [Final criteria]
|  Facts and Funding run at the same   |
|  time ({plan.graph.parallel}).       |
|--------------------------------------|
| Stage 2 of 5: Solutions   [ Edit v ] |
| {plan.stage.name} [ Developing sol.. ]|
| {plan.stage.dependsOn}               |
|   [x] Facts   [ ] Funding            |
|   ({plan.stage.dependsNone} if none) |
| {plan.stage.method}                  |
|   (o) {plan.method.poster}           |
|   ( ) {plan.method.community}        |
| {plan.stage.criteria}                |
|   1 criterion  [ Edit: WF-PREP-2 ]   |
| [ {plan.stage.remove} ]              |
|--------------------------------------|
| {plan.graph.cycle} (shown if needed) |
| {plan.graph.noEnd} (shown if needed) |
| [ {plan.stage.add} ]                 |
| [ Back ]   [ Save draft ]            |
+--------------------------------------+
```
List view (the equivalent of the graph, always available and the default for screen readers):
```
| Stages (5)                           |
| 1 Facts       Starts after: nothing  |
| 2 Solutions   Starts after: Facts    |
| 3 Choose      Starts after: Solutions|
| 4 Pilot       Starts after: Choose   |
| 5 Funding     Starts after: nothing  |
| Final criteria: after Pilot, Funding |
```
Rules: `depends_on` is edited as checkboxes of other stages (keyboard operable), not by dragging lines; the graph only displays it. Serial, parallel and mixed shapes all work. Cycles and stages that cannot lead to the final criteria are flagged inline with text and an icon, and block saving the plan only (not the draft). Decision method is per stage and defaults to the poster after community input. classic-5 fills five stages in a row that the poster can rename, reorder, split or delete. After publication, changes go through a proposal checked by DP-STAGE-PLAN (WF-STAGEMAP-1, `{stagemap.change}`), never silently.

## WF-VREVIEW-1  Volunteer review queue (opt-in)
Route `/review/problems`. Signed-in members only, and only after opting in.
```
+--------------------------------------+
| {vreview.queue.title}                |
|--------------------------------------|
| (not opted in)                       |
| {vreview.optin.title}                |
| {vreview.optin.body}                 |
| [ {vreview.optin.on} ]               |
|--------------------------------------|
| (opted in)  [ {vreview.optin.off} ]  |
| {vreview.masked}                     |
| Amsterdam, 4 parts, 2 recommendations|
|   {vreview.queue.item}               |
|   [ {vreview.open} ]                 |
| Rotterdam, 4 parts, no               |
|   recommendations yet                |
|   [ {vreview.open} ]                 |
| (empty) {vreview.queue.empty}        |
+--------------------------------------+
```
Rules: order is random, with no counts as status, no rankings and no streaks. Each item shows place and structure only; the poster's handle, account and any detail the privacy gateway masked never appear. A volunteer cannot review a problem they posted. Opt-in and opt-out take effect at once; open drafts of recommendations are kept.

## WF-VREVIEW-2  Review a problem and make recommendations
Route `/review/problems/{id}`. Masked copy of the structured problem, with a recommend control on every field, stage and criterion.
```
+--------------------------------------+
| (In volunteer review)                |
| {vreview.masked}                     |
| [ ] {vreview.conflict}               |
|     {vreview.conflict.help}          |
|--------------------------------------|
| Facts (field label from the schema)  |
|  "Bins on route 12 are not emptied"  |
|  (Source: Official or primary)       |
|  [ {vreview.rec.add} ]               |
| Final criterion 1                    |
|  "Every bin emptied twice a week"    |
|  [ {vreview.rec.add} ]               |
| Stage 2: Solutions (after Facts)     |
|  Criterion 1 [ {vreview.rec.add} ]   |
|  [ {vreview.rec.add} ]               |
| (list view of the stage map, as in   |
|  WF-STAGEMAP-1)                      |
|--------------------------------------|
| Recommend a change                   |
| {vreview.rec.target}                 |
|   Final criterion 1                  |
| {vreview.rec.change}  [            ] |
| {vreview.rec.why}     [            ] |
| [ {vreview.rec.send} ]               |
| {vreview.rec.sent}                   |
|--------------------------------------|
| {vreview.rec.mine} 2                 |
| [ {vreview.finish} ]                 |
+--------------------------------------+
```
Rules: a recommendation names its target (a field, a stage, a stage criterion, a final criterion or a source), the change and the reason, all through a schema form. Recommendations are checked for personal data before they are shared. A volunteer sees only their own recommendations and the poster's answers to them, then the aggregate after they finish. Many volunteers can recommend on the same target. The conflict declaration comes first and is recorded.

## WF-VREVIEW-3  Poster resolves recommendations
Route `/me/problems/{id}/review`. Each recommendation must be accepted or declined, with a reason.
```
+--------------------------------------+
| (In volunteer review)                |
| {vreview.resolve.title}              |
| {vreview.resolve.unresolved}         |
|--------------------------------------|
| {vreview.resolve.reviewer} 1         |
| Applies to: Final criterion 1        |
| Why: "Collections can be logged but  |
|   not shown to be on time."          |
| {vreview.resolve.diff}               |
|  - Every bin emptied twice a week    |
|  + Every bin emptied twice a week,   |
|  +   with a public log               |
| (Open) {vreview.resolve.status.open} |
| {vreview.resolve.reason} [         ] |
| [ {vreview.resolve.accept} ]         |
| [ {vreview.resolve.decline} ]        |
| {vreview.resolve.reasonRequired}     |
|--------------------------------------|
| {vreview.resolve.reviewer} 2         |
| (Declined) {vreview.resolve.status.declined}|
| Reason: "Already covered by criterion|
|   2."                                |
|--------------------------------------|
| [ {vreview.publish} ]                |
+--------------------------------------+
```
Rules: the diff preview shows old and new text with the markers "Removed:" and "Added:" in words as well as the plus and minus signs, so colour is never the only cue. Accepting applies the change to the draft at once and the poster can still edit it; declining keeps the draft as is. Reviewers are shown as "Volunteer n", never by handle. The poster can ask for the publication check with open recommendations; the check weighs any still unresolved (`{vreview.resolve.unresolved}`). Declines are kept with their reasons and are visible to the AI check.
