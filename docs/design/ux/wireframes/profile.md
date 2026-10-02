# Wireframes: capability profile and Problems you can move

Conventions as in the auth wireframes file. Owner spec: `docs/spec/26-capability-profile.md`; decision D-80; copy in `../copy-deck-profile.md`. The profile lives only on the device (`PROFILE-LOCAL-1`, Constitution II.10). Every step can be skipped and each says `{profile.later}`. No counts, badges, scores or urgency anywhere. Open questions and their defaults: `OQ-capability-taxonomy` (groups extended by policy packs), `OQ-profile-multi-device` (export file only, no sync), `OQ-match-notify-channel` (interest-blind push, in-app fallback), `OQ-help-needed-tags` (poster proposes, review checks).

## WF-PROFILE-1  Welcome
Route `/profile/welcome`. Reached from Discover when no profile exists, and from "Set up my profile".
```
+--------------------------------------+
| {profile.welcome.title}              |
| {profile.welcome.body}               |
| {profile.welcome.local}              |
|                                      |
| [ Set up my profile ]                |
| {profile.welcome.start}              |
| [ Not now ]  {profile.welcome.skip}  |
| {profile.later}                      |
+--------------------------------------+
```
"Not now" goes to WF-LIST-1. A person with no profile always sees the plain list.

## WF-PROFILE-2  What you know
Route `/profile/know`.
```
+--------------------------------------+
| {profile.step}                       |
| {profile.know.title}                 |
| {profile.know.body}                  |
| (Care and health) (Hospitality food) |
| (Public service) (Trades and repair) |
| (Law and rights) (Teaching)          |
| (Transport) (Technology) (Research)  |
| (Community organising)               |
| {profile.noneChosen}                 |
| {profile.later}                      |
| [ Next ]  [ Skip this step ]         |
+--------------------------------------+
```
Chips are toggles, labels from `{profile.know.care}` to `{profile.know.organising}`, the groups of spec 26. Groups come from the pack taxonomy, so the list can grow. Next button uses `{common.next}`, skip uses `{profile.skipStep}`.

## WF-PROFILE-3  What you can give
Route `/profile/give`.
```
+--------------------------------------+
| {profile.give.title}                 |
| {profile.give.time}                  |
| ( ) A few hours  ( ) Some hours      |
| ( ) A day or more                    |
| {profile.give.kinds}                 |
| (Evidence) (Local knowledge)         |
| (A skill) (Translation) (Review)     |
| {profile.later}                      |
| [ Next ]  [ Skip this step ]         |
+--------------------------------------+
```
Time is one of `{profile.give.time.few}`, `{profile.give.time.some}`, `{profile.give.time.lots}`. Kinds are `{profile.give.evidence}`, `{profile.give.local}`, `{profile.give.skill}`, `{profile.give.translation}`, `{profile.give.review}`. Bands are coarse and never leave the device.

## WF-PROFILE-4  Places you are connected to
Route `/profile/places`. The device check reuses ADR 0016 (see WF-LOCPERM-1): coordinates stay on the phone and doubt adds no place.
```
+--------------------------------------+
| {profile.places.title}               |
| {profile.places.body}                |
| [ Search a city or region        ]   |
| (Amsterdam (NL) x)                   |
| [ Check this place on this phone ]   |
| {profile.places.privacy}             |
| {profile.later}                      |
| [ Next ]  [ Skip this step ]         |
+--------------------------------------+
```
States: checking shows `{profile.places.checking}`; doubt shows `{profile.places.noAdd}` and nothing is added. Choosing a place by name without the check is allowed for matching only; it is never used as an impact label. Areas are coarse only.

## WF-PROFILE-5  Languages, what affects you, causes
Route `/profile/about`.
```
+--------------------------------------+
| {profile.about.title}                |
| {profile.about.languages}            |
| (English) (Nederlands) (Polski)  ... |
| {profile.about.affects}              |
| (Housing) (Air) (Waste) ...          |
| {profile.about.causes}               |
| (Safe streets) (Clean water) ...     |
| {profile.about.topics}               |
| {profile.later}                      |
| [ Next ]  [ Skip this step ]         |
+--------------------------------------+
```
Topic chips come from the list the public problems use, so they never identify a person.

## WF-PROFILE-6  Review, export, delete
Route `/profile`. Also the entry from settings.
```
+--------------------------------------+
| {profile.review.title}               |
| {profile.review.body}                |
| What you know     Care, Law  [Change]|
| What you can give A few hours [Chg]  |
| Places            Amsterdam  [Change]|
| Languages  Nederlands, English [Chg] |
| What affects you  Housing    [Change]|
| Causes            Clean water [Change]|
|                                      |
| [ Save to a file ] {profile.review.export} |
| {profile.review.exportNote}          |
| [ Load from a file ]                 |
| [ Delete my profile ]                |
| {profile.review.lost}                |
| [ Done ]                             |
+--------------------------------------+
```
Delete asks `{profile.review.delete.confirm}`, then wipes the key first and the store second, and shows `{profile.review.deleted}`. An empty profile shows `{profile.review.empty}`. Export is the only way to move a profile to another device (`OQ-profile-multi-device`).

## WF-MATCH-1  Problems you can move
Route `/` personal section on Discover, and `/match`. Named "Problems you can move", never a feed. Matching is a plain filter on the device against the public list; same profile and same list give the same result.
```
+--------------------------------------+
| {match.title}                        |
| {match.intro}                        |
| {match.local}                        |
|                                      |
| +----------------------------------+ |
| | Families near the canal cannot   | |
| | get help forms in Polish         | |
| | Amsterdam                        | |
| | {match.why}                      | |
| | You speak Polish. This problem   | |
| | needs Polish.                    | |
| | [ Open ]                         | |
| +----------------------------------+ |
| (two to five cards at most)          |
|                                      |
| [ See every public problem ]         |
| {match.plainList}                    |
| {match.edit}  Change my profile      |
+--------------------------------------+
```
Each card names the matched skill, language, place or topic through `{match.why.skill}`, `{match.why.language}`, `{match.why.place}` or `{match.why.topic}`. The list is short, ends, and has no counts, badges, scores or ranking by activity. The link goes to WF-LIST-1, always one tap away.
States: no profile shows `{match.noProfile}` with `{match.setup}`; no match shows `{match.empty.title}` and `{match.empty.body}`; offline shows the shared offline banner and the last loaded list. Notices are opt in (`NOTIFY-CONSENT-1`): `{match.notify.explain}`, and `{match.notify.off}` when off. The device raises its own notice only if something fits.
