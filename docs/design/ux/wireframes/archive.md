# Wireframes: archive and reuse (D-76)

The Archive keeps every ended problem with its full journey. While a poster prepares a new problem, matching archived problems appear as suggested paths. After publication the poster may start from an AI-drafted stage plan. Rules on every screen here: a suggestion is never applied automatically (REUSE-CONTEXT-1), credit to the source cases is always visible (REUSE-CREDIT-1), suggestions never replace volunteer review (REUSE-NOBLOCK-1), badges are text plus icon and never colour alone, and no red. Copy ids are in `../copy-deck-archive.md`. Flows: [path-suggestion](../../flows/path-suggestion.md), [stage-draft](../../flows/stage-draft.md), [archive-on-terminal](../../flows/archive-on-terminal.md). AI side: [archive-reuse](../../ai/archive-reuse.md), [decision-points](../../ai/decision-points.md).

## WF-SUGGEST-1  Suggested paths panel (inside WF-PREP-1)
Route `/me/problems/{id}`, state `draft` or `needs_revision`. A collapsible panel below the parts list on phones, a side column at 1280 px. It refreshes a moment after the poster stops typing (not on every key), as problem type, place, scale, resources, institutions and constraints are filled in. The panel is private: only the poster sees it.
```
+--------------------------------------+
| {suggest.title}                      |
| {suggest.help}                       |
| {suggest.updating}   (live region)   |
|--------------------------------------|
| Path 1  {suggest.confidence} Medium  |
| Neighbourhood waste points with      |
| shared funding                       |
| {suggest.card.sources} 3 archived    |
|   problems                           |
| {suggest.card.similar} problem type, |
|   scale, institutions                |
| {suggest.card.differs} climate,      |
|   budget                             |
| [Allowed where you are] (icon: tick) |
| [Partly fits your resources] (icon)  |
| [ {suggest.card.view} ]              |
| [ {suggest.dismiss} ]                |
|--------------------------------------|
| Path 2 ...                           |
|--------------------------------------|
| {suggest.showHidden}                 |
| {suggest.notAdvice}                  |
+--------------------------------------+
```
Cards are ordered by fit, not by how many cases support them, and show no scores, ranks or counts as status. Each card shows: title, source count, similarity summary (which dimensions match), key differences, and two badges: legality (`suggest.badge.legal.*`) and resource fit (`suggest.badge.fit.*`). A path that is not allowed where the poster is stays visible with its badge and the reason, because the reason is useful; it has no "use" action. "Hide this suggestion" hides it for this draft only and can be undone.

States: loading (`suggest.updating`, announced once), empty (`suggest.empty`), too few fields (`suggest.fewFields`), unavailable (`suggest.unavailable`, the form keeps working), offline (the last suggestions stay with a "may be out of date" line). Suggestions do not block "Send for volunteer review". Moving focus: new results never take focus; the live region says how many paths were found.

## WF-SUGGEST-2  Suggestion detail
Route `/me/problems/{id}/suggestions/{suggestionId}`. Private to the poster.
```
+--------------------------------------+
| < {suggest.close}                    |
| {suggest.detail.title}               |
| Neighbourhood waste points with      |
| shared funding                       |
| {suggest.detail.intro}               |
| {suggest.confidence} Medium          |
|--------------------------------------|
| {suggest.detail.similarity}          |
|  Problem type: same, public waste    |
|  Scale: similar, 20,000 residents    |
|  Institutions: city office, ward     |
|    council                           |
|--------------------------------------|
| {suggest.detail.differences}         |
|  Climate: source cold and wet, yours |
|    hot and dry                       |
|  Budget: source medium, yours small  |
| {suggest.detail.adaptations}         |
|  Use shaded bins. Replace paid       |
|  trucks with volunteer rounds.       |
|--------------------------------------|
| {suggest.detail.legal}               |
|  L2 national: Allowed. ...           |
|  L4 city: Needs a legal check. ...   |
|  (one row per layer in force)        |
| {suggest.detail.fit}                 |
|  Collection vehicle: needed 1, you   |
|    listed 0. (Partly fits)           |
|--------------------------------------|
| {suggest.detail.draft}               |
|  1 Agree sites  2 Fund  3 Install    |
|  [ Show as list ]                    |
|--------------------------------------|
| {suggest.detail.credit}              |
|  {credit.line}                       |
|  {credit.license}                    |
|  [ {credit.link} ] per source case   |
|--------------------------------------|
| [ {suggest.use} ]                    |
| {suggest.notAdvice}                  |
+--------------------------------------+
```
Rules: every difference is shown before the "use" action, in plain words with the dimension name. Legality has one row per legal layer in force (L0 to L6), each with a text result (Allowed, Needs a legal check, Not allowed) and the reason; sources are linked. Resource fit lists each needed item against what the poster listed. Draft stages use the graph and list pair from WF-STAGEMAP-1 (list is default for screen readers). "Use as starting point" opens a confirm sheet (`suggest.use.confirm`); only after confirming are the draft stages copied into WF-PREP-3 as editable stages with their credit. It never touches facts or criteria. The action is disabled, with the reason beside it, when legality says Not allowed.

## WF-ARCHIVE-1  Archive browse and search
Route `/archive`, public, readable without an account. Replaces the old resolution records screen. Sorted by date ended, newest first, unless a search is typed (then by match). No ranking, no counts as status, no infinite scroll.
```
+--------------------------------------+
| {archive.title}                      |
| {archive.body}                       |
| {archive.honest}                     |
| [ {archive.search}                 ] |
|                                      |
| {archive.filter.type}   [ Any v ]    |
| {archive.filter.region} [ Any v ]    |
| {archive.filter.budget} [ Any v ]    |
| {archive.filter.outcome}[ Any v ]    |
| [ {archive.filter.clear} ]           |
|--------------------------------------|
| Neighbourhood waste points           |
|  Solved. Ended 14 Sep 2026 in        |
|  Amsterdam.                          |
|  {archive.item.paths} 2 challenges   |
|--------------------------------------|
| Street lighting on route 12          |
|  Tried, did not work. Ended 2 Mar    |
|  2026 in a coastal town.             |
|  {archive.item.paths} 4 challenges   |
| ...                                  |
| [ Load more ]                        |
+--------------------------------------+
```
Filters: problem type, region, resource band (small, medium, large), outcome (solved, closed, redirected, stuck, tried and did not work). Failures are listed alongside successes with the same weight and the same card design. Filters are keyboard operable selects, remembered per viewer, and shown as removable chips with text. Search is full text plus meaning match and works across languages (the result card shows the original language and a translated title when available). Examples shown to designers are fictional.

States: loading, empty (`archive.empty` with filters, `archive.emptyAll` without), error with retry, offline (cached pages stay readable). The same data is read-only in `can_gallery` as static pages.

## WF-ARCHIVE-2  Archived case
Route `/archive/{id}`, public, personal data already removed.
```
+--------------------------------------+
| < {archive.title}                    |
| Neighbourhood waste points           |
| Solved. Ended 14 Sep 2026.           |
| {archive.case.stripped}              |
| {archive.case.old} (when it applies) |
| [ {archive.case.useThis} ]           |
| {archive.case.useHint}               |
|--------------------------------------|
| {archive.case.context}               |
|  Type, scale, climate, place class,  |
|  budget band, institutions (roles),  |
|  legal layers in force, language     |
|--------------------------------------|
| {archive.case.stageMap}              |
| [ Show as graph | Show as list ]     |
|  {archive.case.stage} Agree sites:   |
|   Done. Took 6 weeks, cost small.    |
|  {archive.case.stage} Fund: ...      |
|--------------------------------------|
| {archive.case.options}               |
|  {archive.case.chosen}               |
|--------------------------------------|
| {archive.case.challenges}            |
|  {archive.case.challenge}            |
|  (Not resolved) shown as text + icon |
|--------------------------------------|
| {archive.case.outcome}               |
| {archive.case.criteria}              |
| {archive.case.costs}                 |
| {archive.case.versions}              |
|--------------------------------------|
| {archive.case.license}               |
|  {credit.license}                    |
| [ {archive.case.cite} ]              |
+--------------------------------------+
```
Rules: the whole journey is shown, including options not chosen and each challenge with what was tried, why it failed or what blocked it, and how it was resolved or that it was not. Stage map follows the graph and list rules in `ui-unit-template.md` 3c. Evidence is shown as links to sources, never as uploaded files. "Use this as a starting point" goes to the poster's new problem and shows the same adaptation view as WF-SUGGEST-2; it never creates a problem silently. Withdrawn or taken-down items follow WF-DETAIL-2.

## WF-STAGEDRAFT-1  AI-drafted stage plan after publication
Route `/me/problems/{id}/stage-draft`. Shown to the poster after publication (state `active`) when the poster accepted at least one suggestion, or when matching paths exist. The poster can ignore it and build a plan in WF-PREP-3.
```
+--------------------------------------+
| {stagedraft.title}   (Draft, only    |
|   you see this)                      |
| {stagedraft.body}                    |
|--------------------------------------|
| [ Show as graph | Show as list ]     |
| 1 Agree sites                        |
|   {stagedraft.source} Case A, Case B |
|   Starts after: nothing              |
|   Criteria: 3 sites agreed           |
|   [ {stagedraft.edit} ]              |
|   [ {stagedraft.remove} ]            |
| 2 Fund (Edited by you)               |
|   Starts after: 1                    |
|   [ {stagedraft.edit} ]              |
| [ {stagedraft.add} ]                 |
|--------------------------------------|
| {credit.line}                        |
| {credit.carried}                     |
|--------------------------------------|
| {stagedraft.community}               |
| [ {stagedraft.apply} ]               |
| [ {stagedraft.discard} ]             |
+--------------------------------------+
```
Rules: nothing is applied until the poster presses apply; editing uses the stage editor of WF-PREP-3 (checkboxes and selects, no drag only). Each stage keeps its source and shows "Edited by you" after a change. Apply runs the plan check (DP-STAGE-PLAN) and shows `stagedraft.checking`; a failure is `stagedraft.checkFailed` with the stage named and nothing is lost. Credit is carried into the applied stages and is visible on the public stage map. States: loading, unavailable (`stagedraft.unavailable`), not permitted (only the poster), offline (edits kept on the device).
