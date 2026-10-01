# Wireframes: browse, detail, resolution records

Public reads need no account. Status badges use the neutral palette in `../tokens.json` (no red). Lists use "Load more", never infinite scroll.

## WF-LIST-1  Problem list
Route `/`. Tab "Discover".
```
+--------------------------------------+
| CAN            [Sign in] / [Handle]  |
| Fictional data only (banner)         |
|--------------------------------------|
| Problems in [Northfield (fictional)v]|
| Show [All stages v]  [ Search... ]   |
|                                      |
| +----------------------------------+ |
| | Bus stop shelter missing on...   | |
| | (Needs evidence) (Open: gathering facts)|
| | Northfield, 12 contributions     | |
| | Next: share a source             | |
| +----------------------------------+ |
| +----------------------------------+ |
| | ...                              | |
| +----------------------------------+ |
| [ Load more ]  Showing 20 of 43      |
| [ Report a public problem ]          |
+--------------------------------------+
```
Card parts: title (condition), stage badge, flag badge when `investigation_needed`, place, count, one "Next" line from the brief's next action. No like counts, no trending. Sort is newest activity, stated in text ("Sorted by recent activity").

## WF-LIST-2  Empty and filtered-empty list
```
+--------------------------------------+
| {list.empty.title}                   |
| No problems here yet                 |
| {list.empty.body}                    |
| Be the first to describe one, or     |
| change the place or stage filter.    |
| [ Clear filters ] [ Report a problem]|
+--------------------------------------+
```
Error variant uses the shared error pattern (`common.error.title`, retry button). Offline shows cached items with `common.offline.banner`.

## WF-DETAIL-1  Problem workspace (published)
Route `/problems/{id}`. Sections are tabs on mobile, a two column layout on desktop (main plus a sticky status panel at the end side).
```
+--------------------------------------+
| < Problems                           |
| Bus stop shelter missing on Route 9  |
| Northfield (fictional)  by QuietHeron|
| (Open: gathering facts)              |
| (Needs evidence)                     |
|--------------------------------------|
| STATUS PANEL                         |
| Stage: Open: gathering facts         |
| {detail.stage.explain} plain words   |
| Known: 3 contributions               |
| Uncertain: how many riders affected  |
| Needed next: a source for ridership  |
| [ Add to this problem ]              |
|--------------------------------------|
| Overview | Contributions | Proposals |
| Decision | Tasks | History           |
|--------------------------------------|
| What is the condition                |
| text ...                             |
| Who is affected / Where              |
| Observed          | Not yet known    |
| text              | text             |
| Sources (links, open in new tab)     |
|  - https://example.org/report        |
+--------------------------------------+
```
`History` is the public problem_event timeline with plain labels. Interim decisions display the badge "Interim decision, will be re-reviewed" (WF-DECREC-1).

## WF-DETAIL-2  Tombstone (never a 404)
Shown for withdrawn contributions and for public items a volunteer removed. Problems that were never published (draft, submitted, needs_revision, rejected, withdrawn) are private and never show a public tombstone.
```
+--------------------------------------+
| {tombstone.title}                    |
| This item is no longer shown         |
| {tombstone.withdrawn}                |
| The author withdrew it on 3 Oct.     |
| Replies and decisions that refer to  |
| it are kept. [ Back to the problem ] |
+--------------------------------------+
```
Variants: `tombstone.removed` (removed by a volunteer under a rule id, linking the rule text), `tombstone.notFound` only for ids that never existed.

## WF-DETAIL-3  Status panel variants: paused, stuck, withdrawn, closed, redirected
Neutral wording from the copy deck. Same panel position as WF-DETAIL-1.
```
+--------------------------------------+
| (Paused)                             |
| {status.paused.title}  Paused        |
| Reason: waiting for the council      |
|   meeting calendar (fictional)       |
| Resumes when: the meeting is held    |
| [ I can help with this ]             |
+--------------------------------------+
| (Stuck)                              |
| {status.stuck.title}  Stuck          |
| No recent progress. This is not a    |
| judgement. {status.stuck.next}       |
| [ See what would help ]              |
+--------------------------------------+
| (Withdrawn)                          |
| {status.withdrawn.title}  Withdrawn  |
| {status.withdrawn.body}              |
| (shown only before anyone else took  |
|  part; later the author can only     |
|  tombstone their own text)           |
+--------------------------------------+
| (Redirected)                         |
| {status.redirected.title}  Redirected|
| {status.redirected.body}             |
| Routes that can help (fictional)     |
+--------------------------------------+
```
Closed shows the reason code and plain explanation, and `duplicate_of` as a link when it applies. Redirected lists the destination and route text. Panel text for every state comes from the brief's table. Solved, closed and redirected carry the "Interim decision, will be re-reviewed" badge while it applies. Closed and redirected also show "Appeal this decision" to the initiator until `appealable_until`.

## WF-RESOLUTION-1  Resolution records
Route `/resolutions`. A plain archive of solved or closed problems. No ranking, no counts, sorted by date resolved, newest first, with a date filter.
```
+--------------------------------------+
| {resolution.title} Resolution records|
| {resolution.body}                    |
| A plain archive. Not a leaderboard.  |
| Resolved in [ Any year v ]           |
|                                      |
| Bus shelter installed (fictional)    |
|  Solved 14 Sep 2026, Northfield      |
|  Outcome: shelter built, verified    |
| ...                                  |
| [ Load more ]                        |
+--------------------------------------+
```
Empty state: `resolution.empty`.
