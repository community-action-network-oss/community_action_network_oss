# Wireframes: staged intake, pending review, decision, appeal

Staged intake order (fixed): condition, affected, where, observed vs uncertain, evidence URLs, privacy review, mandatory preview. One question per screen, a progress line "Step n of 7" (text, not just a bar), Back always available, autosave to local storage on every change (`submit.autosaved`). Signed-out visitors can start; sign-in is requested only at WF-SUBMIT-7 submit, and the draft survives it (invite redeemed at sign-up, not at submit, so a visitor without an account sees WF-SIGNUP-1 first).

Inline privacy flags: every free-text field runs the deterministic checks (names, addresses, phone, email, plates, identifiers, "I" narrative about a named person). A flag appears under the field in a neutral note with the offending text marked, never blocking typing: `submit.flag.name`, `.address`, `.contact`, `.individual`. Each flag offers [ Generalise it for me ] (manual edit hint, no AI) and [ Keep as is ] (kept flags go to the reviewer).

## WF-SUBMIT-1  Condition
```
+--------------------------------------+
| Step 1 of 7                          |
| {submit.condition.title}             |
| What public condition needs to change|
| {submit.condition.hint}              |
| Describe a shared situation, not a   |
| person. Example (fictional): "The    |
| bus shelter on Route 9 is missing."  |
| [                                  ] |
| [                                  ] |
| 0 / 300 characters                   |
| (!) Flag: this looks like a name.    |
|     [ Generalise ] [ Keep as is ]    |
| [ Back ]              [ Next ]       |
+--------------------------------------+
```
Individual crisis language triggers WF-EXTERNAL-1 offered inline, never forced.

## WF-SUBMIT-2  Who is affected
```
+--------------------------------------+
| Step 2 of 7                          |
| {submit.affected.title}              |
| Who or what is affected?             |
| ( ) Residents  ( ) Workers           |
| ( ) Students   ( ) Other group       |
| Describe the group, not individuals  |
| [                                  ] |
| How many, if you know?  [ about 100 ]|
| ( ) I do not know                    |
| [ Back ]              [ Next ]       |
+--------------------------------------+
```

## WF-SUBMIT-3  Where (fictional jurisdiction picker)
```
+--------------------------------------+
| Step 3 of 7                          |
| {submit.where.title}                 |
| Where does this happen?              |
| {submit.where.fictional}             |
| This preview has one made up place.  |
| Place   [ Northfield (fictional)  v ]|
| Area    [ Optional: ward or district ]|
| {submit.where.privacy}               |
| Pick the widest area that is useful. |
| Never enter a street address.        |
| [ Back ]              [ Next ]       |
+--------------------------------------+
```
Picker is a plain native select (accessible); list from `GET /v1/jurisdictions`.

## WF-SUBMIT-4  Observed versus uncertain
```
+--------------------------------------+
| Step 4 of 7                          |
| {submit.observed.title}              |
| What have you seen, and what is not  |
| yet known?                           |
| What has been observed               |
| [ Shelter removed in March. Photos ] |
| What is uncertain or still unknown   |
| [ Why it was removed.              ] |
| {submit.observed.hint}               |
| Mark guesses as guesses. That helps. |
| [ Back ]              [ Next ]       |
+--------------------------------------+
```
Both fields have separate flags; "uncertain" may be empty only after confirming `submit.observed.nothingUncertain`.

## WF-SUBMIT-5  Evidence links (URLs only)
```
+--------------------------------------+
| Step 5 of 7                          |
| {submit.evidence.title}              |
| Where can others check this?         |
| {submit.evidence.body}               |
| Links only. Uploads are not part of  |
| this version.                        |
| Link  [ https://example.org/report ] |
| Note  [ City report, page 4        ] |
| [ + Add another link ]  (max 5)      |
| ( ) I do not have a source yet       |
|   {submit.evidence.none}             |
|   That is fine. It will be marked    |
|   "needs evidence".                  |
| [ Back ]              [ Next ]       |
+--------------------------------------+
```
Validation: https only; no link to a social profile or private document host warning `submit.evidence.private`; flagged names in URLs allowed to be kept after confirm.

## WF-SUBMIT-6  Privacy review
```
+--------------------------------------+
| Step 6 of 7                          |
| {submit.privacy.title}               |
| Check for private details            |
| {submit.privacy.body}                |
| We found 2 things to look at.        |
| 1 Condition: "Mr. Rao" (a name)      |
|   [ Edit ] [ Keep as is ]            |
| 2 Observed: a street address         |
|   [ Edit ] [ Keep as is ]            |
|                                      |
| [x] {submit.privacy.confirm}         |
| I removed names, identifiers and     |
| private case details.                |
| [ Back ]              [ Next ]       |
+--------------------------------------+
```
Zero flags: shows `submit.privacy.none` ("Nothing flagged. A volunteer still checks everything") and the confirmation. Next stays disabled until confirmed.

## WF-SUBMIT-7  Preview and what publishing means (mandatory)
```
+--------------------------------------+
| Step 7 of 7                          |
| {submit.preview.title}               |
| This is exactly what people would see|
| ---- PREVIEW (read only) -------     |
| Bus stop shelter missing on Route 9  |
| Northfield (fictional) by QuietHeron |
| Observed: ...  Uncertain: ...        |
| Sources: example.org/report          |
| Evidence tier: Needs evidence        |
| --------------------------------     |
| {submit.preview.explain}             |
| What happens next                    |
|  * A volunteer reviews it first.     |
|  * Only then is it public.           |
|  * You can edit or withdraw before.  |
|  * If it is not published, the draft |
|    is deleted 30 days later.         |
|  * Your email is never shown.        |
| Possible duplicates: none found      |
| [ Back to edit ]  [ Submit for review]|
+--------------------------------------+
```
The Submit button is the only way to leave the flow forward; the preview cannot be skipped by deep link (route guard redirects to step 7 until all earlier steps validate). If duplicates are found, they list with links and the choice "This is different" or "Add to that problem instead".

## WF-PENDING-1  Submitted, awaiting volunteer review
Route `/me/problems/{id}`.
```
+--------------------------------------+
| (Waiting) {pending.title}            |
| Submitted, awaiting volunteer review |
| {pending.wait}                       |
| Volunteers review in the order they  |
| arrive. Right now that can take a few|
| days. We do not know exactly when.   |
| Submitted 1 Oct, 14:05               |
| Place in line: about 6th (estimate)  |
| {pending.email}                      |
| We will email you when there is a    |
| decision.                            |
| [ Edit draft ] [ Withdraw ]          |
| What you submitted (collapsed) v     |
+--------------------------------------+
```
Withdraw opens a confirm (`pending.withdraw.confirm`) that states the deletion date. Edit sends it back to the draft and keeps the queue position only if the reviewer has not started (copy states which). No fake progress bars.

## WF-DECISION-1  Moderation decision with hints beside fields
Route `/me/problems/{id}/decision`. Outcome "needs changes" or "not published".
```
+--------------------------------------+
| (Needs changes) {decision.title}     |
| A volunteer asked for changes        |
| {decision.interim}                   |
| Interim decision, will be re-reviewed|
| (shown only when interim)            |
| Reviewed under: RULE-PRIV-NAME (v1)  |
|                                      |
| Condition                            |
| [ Mr. Rao refused to fix the shelter]|
|   Hint: remove the name; describe the|
|   role or office instead. (RULE-..)  |
| Observed                             |
| [ ...                              ] |
|   (no hint)                          |
|                                      |
| Your draft is kept. {decision.keep}  |
| It will be deleted on 31 Oct 2026 if |
| you do nothing. {decision.deleteDate}|
| [ Revise and resubmit ]              |
| [ Appeal this decision ] until 8 Oct |
| [ Withdraw ]                         |
+--------------------------------------+
```
Hints are anchored to the fields and use the span reference to mark the text. Fields without hints are shown plain. "Revise and resubmit" returns to the staged form at the first field with a hint, keeping all content.

## WF-DECISION-2  Decision: not published (redirect or ineligible)
```
+--------------------------------------+
| {decision.notPublished.title}        |
| This was not published as a problem  |
| {decision.notPublished.body}         |
| Reason: RULE-SCOPE-INDIV (v1)        |
| It describes one person's case. A    |
| public problem needs a shared        |
| condition.                           |
| Places that can help (fictional):    |
|  * Legal aid line  * Ward office     |
| Deleted on 31 Oct 2026               |
| [ Revise as a shared condition ]     |
| [ Appeal ]  [ Delete now ]           |
+--------------------------------------+
```

## WF-APPEAL-1  Appeal
```
+--------------------------------------+
| {appeal.title}  Appeal this decision |
| {appeal.body}                        |
| A different volunteer will review    |
| this when more than one is available.|
| {appeal.sameReviewer}                |
| Disclosure: only one volunteer is    |
| active, so the same person may review|
| (shown only then).                   |
| Which rule do you think was misapplied?|
| [ RULE-PRIV-NAME  v ]  (optional)    |
| Why? [                             ] |
| [ Send appeal ]  Closes 8 Oct        |
+--------------------------------------+
```
After sending: status line "Appeal received" with the same honest wait statement and an email promise. Outcome screen reuses WF-DECISION-1 layout with `appeal.outcome.upheld` or `.overturned`.

## WF-MYACT-1  My problems and drafts
Route `/me`. Lists drafts, submitted, decisions, with purge dates.
```
+--------------------------------------+
| {me.title}  My activity (@handle)    |
| Drafts                               |
|  Bus shelter...  Draft  [Continue]   |
| Submitted                            |
|  Water fountain...  (Waiting) [Open] |
| Needs your attention                 |
|  Library hours...  (Needs changes)   |
|    Deleted on 31 Oct 2026  [Open]    |
| [ Sign out ]                         |
+--------------------------------------+
```

## WF-EXTERNAL-1  Routes for an individual or urgent situation
Offered inline (never blocking). Static, jurisdiction-appropriate, fictional in slice 1.
```
+--------------------------------------+
| {external.title}  If this is urgent  |
| {external.body}                      |
| This place is for shared public      |
| problems, not individual help.       |
| Emergency: call your local number    |
| Legal aid (fictional): 000 0000      |
| Counselling (fictional): 000 0001    |
| [ Continue my draft ] [ Delete it ]  |
+--------------------------------------+
```
