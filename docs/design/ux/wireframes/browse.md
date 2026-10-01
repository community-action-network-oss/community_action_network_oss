# Wireframes: browse, detail, resolution records

Public reads need no account. Seed problems (D-56, real framings with synthetic evidence, no named people, Amsterdam NL first) carry the label `list.card.seed` in lists and `detail.seed.explain` on the page. Status badges use the neutral palette in `../tokens.json` (no red). Lists use "Load more", never infinite scroll.

## WF-LIST-1  Problem list
Route `/`. Tab "Discover".
```
+--------------------------------------+
| CAN            [Sign in] / [Handle]  |
| {common.seedBanner} (banner)         |
|--------------------------------------|
| Problems in [ Amsterdam (NL)       v]|
| Show [All stages v]  [ Search... ]   |
|                                      |
| +----------------------------------+ |
| | Amsterdam residents face recurring| |
| | explosions and violent incidents..| |
| | (Seed problem, synthetic evidence)| |
| | (Needs evidence) (Open: gathering facts)|
| | Amsterdam, 12 contributions      | |
| | Next: share a source             | |
| +----------------------------------+ |
| +----------------------------------+ |
| | ...                              | |
| +----------------------------------+ |
| [ Load more ]  Showing 20 of 43      |
| [ Report a public problem ]          |
+--------------------------------------+
```
Card parts: title (condition), seed label when it applies, stage badge, flag badge when `investigation_needed`, place, count, one "Next" line from the brief's next action. No like counts, no trending. Sort is newest activity, stated in text ("Sorted by recent activity").

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
**Retired (D-72):** the single "Stage:" line and "Open: ..." chips in the status panel are replaced by the stage map, WF-STAGEMAP-1. Tabs for proposals, decision and tasks are replaced by the stage workspace, WF-STAGE-1.
Route `/problems/{id}`. Sections are tabs on mobile, a two column layout on desktop (main plus a sticky status panel at the end side).
```
+--------------------------------------+
| < Problems                           |
| Amsterdam city centre remains dirty  |
| despite substantial cleaning activity|
| Amsterdam  {detail.bylineSeed}       |
| (Seed problem, synthetic evidence)   |
| (Open: gathering facts)              |
| (Needs evidence)                     |
|--------------------------------------|
| STATUS PANEL                         |
| Stage: Open: gathering facts         |
| {detail.stage.explain} plain words   |
| Known: 3 contributions               |
| Uncertain: how much is spent, and on |
|   what                               |
| Assumptions made (marked)            |
| Needed next: a source for ridership  |
| [ Add to this problem ]              |
|--------------------------------------|
| Overview | Contributions | Proposals |
| Decision | Tasks | History           |
|--------------------------------------|
| Facts and causes (from the schema)   |
| Who is affected / Where              |
| Known             | Not yet known    |
| Assumptions made, each marked        |
| (Assisted) on fields filled with help|
| Sources (links, open in new tab)     |
|  - https://example.org/report        |
+--------------------------------------+
```
`History` is the public problem_event timeline with plain labels. Decisions display the badge "Decided under policy {version}", or "Policy {version}, transitional stewardship" while only founder stewardship approves the pack (WF-DECREC-1). A re-reviewed item shows the WF-REMOD-1 public notice at the top. A published item with an edit under review shows `detail.editUnderReview` and the last approved version.

## WF-DETAIL-2  Tombstone (never a 404)
Shown for withdrawn contributions and for public items taken out of view by a moderation run. Problems that were never published (draft, submitted, needs_revision, rejected, withdrawn) are private and never show a public tombstone.
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
Variants: `tombstone.removed` (taken out of view under a rule id and policy version, linking the rule text and the appeal route; never silent, see WF-REMOD-1), `tombstone.notFound` only for ids that never existed.

## WF-DETAIL-3  Status panel variants: paused, stuck, withdrawn, closed, redirected
Neutral wording from the copy deck. Same panel position as WF-DETAIL-1.
```
+--------------------------------------+
| (Paused)                             |
| {status.paused.title}  Paused        |
| Reason: waiting for the council      |
|   meeting calendar (synthetic)       |
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
| Routes that can help                    |
+--------------------------------------+
```
Closed shows the reason code and plain explanation, and `duplicate_of` as a link when it applies. Redirected lists the destination and route text. Panel text for every state comes from the brief's table. Solved, closed and redirected carry the policy badge (decided under policy {version}, or transitional stewardship). Closed and redirected also show "Appeal this decision" to the initiator until `appealable_until`.

## WF-DETAIL-4  Reopened under policy vX (re-resolution, T20 and T21)
Same panel position as WF-DETAIL-1 and WF-DETAIL-3. Shown while a problem reopened by re-resolution is active again; the old Resolution record stays linked (`RERESOLVE-1`).
```
+--------------------------------------+
| (Reopened)                           |
| {reopen.title}  Reopened under       |
|   policy {version}                   |
| Earlier result: {reopen.old}         |
|   (Solved, decided under policy      |
|   {oldVersion}) [ Read the old record ]|
| What changed: {reopen.changed}       |
|   rule {ruleId}, corpus or policy    |
|   {oldVersion} to {newVersion}       |
| {reopen.body.t20}                    |
| What happens next: {reopen.next.t20}|
| [ Add a proposal or evidence ]       |
| [ Appeal this decision ]             |
+--------------------------------------+
```
Variants: `reopen.body.t20` and `reopen.next.t20` (changed legal conclusion or solution rule, continues from solution development, or from eligible when eligibility changed) and `reopen.body.t21` and `reopen.next.t21` (changed evidence rule, continues from verification, asks for evidence that meets the new rule). Never silent: the same notice goes to the initiator or a steward (WF-REMOD-1 wording). Appeal runs to `appealable_until` and uses WF-APPEAL-1. Neutral wording, no blame.

## WF-RESOLUTION-1  Resolution records
Route `/resolutions`. A plain archive of solved or closed problems. No ranking, no counts, sorted by date resolved, newest first, with a date filter.
```
+--------------------------------------+
| {resolution.title} Resolution records|
| {resolution.body}                    |
| A plain archive. Not a leaderboard.  |
| Resolved in [ Any year v ]           |
|                                      |
| Seed example, synthetic evidence     |
|  Solved 14 Sep 2026, Amsterdam       |
|  Outcome: result verified           |
| ...                                  |
| [ Load more ]                        |
+--------------------------------------+
```
Empty state: `resolution.empty`.
