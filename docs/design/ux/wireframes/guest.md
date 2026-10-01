# Wireframes: impacted and guest labels (D-73)

Each problem has an affected geography. A contribution is impacted if it was sent from inside that area at the time of sending, and guest otherwise. The client checks the area on the device and sends only an attestation of "inside area X at time T"; exact coordinates never leave the device. How the attestation works is in [`docs/design/location/attestation.md`](../../location/attestation.md). A suspect or missing attestation downgrades to guest and is never an accusation. Copy ids are in `../copy-deck-lifecycle.md`.

Marker choice: guest content gets a visible "Guest" badge; impacted content shows no badge. Reason: guest is the exception that needs explaining, a second badge on most content adds noise, and an "Impacted" mark could read as a status or ranking. Impacted state is stated in words where it matters: the list counts (`{filter.impacted.counts}`) and the screen reader label of each item ("From inside the affected area").

## WF-GUEST-1  Guest badge and explanation
Applies to every contribution, option, choice comment, evidence item and volunteer recommendation, wherever it is listed (WF-STAGE-1, WF-STAGE-3, WF-CONTRIB-1, WF-VREVIEW-2, WF-VREVIEW-3, WF-DETAIL-1).
```
+--------------------------------------+
| Add 40 street bins                   |
| Birch12   (Guest) [?]                |
| {guest.badge}                        |
|--------------------------------------|
| Weekly collection on route 12        |
| Maple7  (no badge: impacted)         |
|--------------------------------------|
| Explanation sheet, opened by [?]     |
| {guest.badge.why}                    |
| {guest.badge.help}                   |
| {guest.reason.outside}               |
|   (or {guest.reason.noPermission},   |
|    {guest.reason.failed},            |
|    {guest.reason.unavailable})       |
| {guest.area} Amsterdam centre        |
| {guest.area.version} 2               |
| [ Close ]                            |
+--------------------------------------+
```
Poster view of their own item:
```
| {guest.mine.title}                   |
| {guest.mine.body}                    |
| [ {locperm.allow} ] [ {guest.failed.retry} ] |
```
Rules: the badge is a neutral outlined pill with the text "Guest" and an info icon (not red, not a warning; token family slate, same as other markers). The explanation opens on tap, click, focus or Enter, never on hover only, and is a sheet on mobile, so it works with a screen reader and touch. The text states the reason class but never the person's location, and never says the person did anything wrong. Guests are welcome to contribute: no contribution is blocked or hidden by default because of the label. The reason shown is the class only (outside, no permission, not confirmed, unavailable).

States for the sender and for readers:
```
| (Checking location) {guest.pending}  |
|   {guest.pending.help}               |
| (Waiting for a connection)           |
|   {guest.offline}  {guest.offline.help}|
| (Location check not confirmed)       |
|   {guest.failed}  [ {guest.failed.retry} ] |
```
Attestation pending, offline and failed all display as Guest until confirmed; when the check succeeds the badge disappears, with a live region announcement to the sender only. A failed check never shows a raw error code (`common.error.title` pattern); input is kept. Readers see only "Guest" with the help text, not the pending detail.

## WF-FILTER-1  Impacted only filter
On every content list: contributions and options on the problem page (WF-DETAIL-1, WF-CONTRIB-1), the stage workspace (WF-STAGE-1, WF-STAGE-3: options, evidence, steps, choice comments) and the volunteer review view (WF-VREVIEW-2, WF-VREVIEW-3 recommendations).
```
+--------------------------------------+
| Options                              |
| [ ] {filter.impacted.label}          |
|     Show impacted only (12 of 30)    |
|     {filter.impacted.counts}         |
|     12 impacted, 18 guest            |
|--------------------------------------|
| (when on)                            |
| [x] Show impacted only (12 of 30)    |
| {filter.impacted.on}                 |
|   18 guest items are hidden.         |
| [ {filter.impacted.showAll} ]        |
| {filter.impacted.remembered}         |
|--------------------------------------|
| (when none)                          |
| {filter.impacted.empty}              |
|   No impacted contributions here yet.|
|   18 guest items are hidden.         |
| [ {filter.impacted.showAll} ]        |
+--------------------------------------+
```
Rules: off by default, a checkbox switch with a text label (no colour only). The counts are exact and shown in the label, as plain information, not a ranking or an engagement figure. The choice is remembered per viewer and per device (local storage, with the account setting synced when signed in); it applies to all lists of the same kind and can always be turned off. The filter hides guest items from the list but never deletes them, and `{filter.impacted.on}` always says how many are hidden, so nothing is removed silently. Changing the filter announces the new count in a live region and keeps focus on the control. A stage resolution, a volunteer recommendation and every decision still record guest items; the filter is a view only. Filtered counts never include private data.

## WF-LOCPERM-1  Location permission prompt
Shown before the first contribution to a problem with an affected area, and from "Check again". A pre-prompt in the app, before the system dialog.
```
+--------------------------------------+
| {locperm.title}                      |
| {locperm.body}                       |
|  - {locperm.detail1}                 |
|  - {locperm.detail2}                 |
|  - {locperm.detail3}                 |
|  - {locperm.detail4}                 |
| {guest.area} Amsterdam centre        |
| [ {locperm.allow} ]                  |
| [ {locperm.allowOnce} ]              |
| [ {locperm.deny} ]                   |
| {locperm.learn}  (link to the        |
|   attestation explainer)             |
+--------------------------------------+
| (After denial or no permission)      |
| {locperm.denied}                     |
| {locperm.denied.settings}            |
| (Guest) contributions go ahead       |
+--------------------------------------+
```
Rules: the explanation comes before the system permission dialog and says plainly that exact location never leaves the device and only "inside the area or not" is shared. "Not now" is as prominent as "Allow", no dark patterns, and contributing is never blocked: denial, no permission, or an unavailable check (some browsers) means the contribution is labelled Guest (`{guest.reason.noPermission}`). Where only an approximate location can be granted, it is used on the device the same way. The sender sees the label before posting. Offline, the check is queued on the device and shown as `{guest.offline}`. Learn more links to `docs/design/location/attestation.md` rendered for the public.
