# Wireframes: the schema-driven form pattern (WF-FORM)

Every content type (problem, contribution, proposal, decision record, task and verification, appeal, policy proposal) is entered through one form renderer (D-58). Fields, order, labels, guidance, examples, required flags and allowed answers all come from the **content schema version** in the policy pack. The app never hard-codes a field. There are no free text boxes without structure: every long answer sits inside a field with a prompt, a basis choice and, where the schema says so, a minimum shape (for example "one cause per line").

Each schema covers the same ground: facts, causes, affected people, scope, lawful options, uncertainty and explicit assumptions. Two decision points read the answers: DP-COMPLETENESS (is every required field meaningfully answered) and DP-ASSUMPTIONS (does a factual, causal, legal or scope assumption look wrong). Both return `needs_revision` with a hint per field.

## WF-FORM-1  Form shell and section
```
+--------------------------------------+
| {form.progress}                      |
| Section 2 of 7: Causes               |
| {form.progress.fields}               |
| 5 of 9 needed fields answered        |
| {form.version}  Form version 1.2.0   |
|--------------------------------------|
| Field label (from the schema)        |
|  {form.field.why} Why we ask: ...    |
|  {form.field.example}                |
|   Example, synthetic: "..."          |
| [ answer control by field type      ]|
| {form.field.basis} How do you know?  |
|  ( ) I saw it myself                 |
|  ( ) A source reports it             |
|  ( ) I worked it out                 |
|  ( ) I am assuming it                |
| ( ) {form.field.unknown} I do not    |
|     know this yet                    |
|    {form.field.unknownWhy} What would|
|    help find out? [                ] |
|--------------------------------------|
| [ Back ] [ {form.saveDraft} ] [ Next ]|
| {form.saved}                         |
+--------------------------------------+
```
Rules: progress is text ("Section n of N"), not only a bar. Labels are always visible. Each field shows its guidance and its example (examples are labelled synthetic). "I do not know this yet" is a valid, explicit answer with a reason prompt, and counts as answered for completeness. Choosing "I am assuming it" adds the answer to the assumptions list shown on the published page. Back is always available. Autosave on every change, to the device first, then the account (`form.savedLocal` when offline). Answer controls by field type: short text, long text with structure, single or multi select, number or range with "unknown", place (native select), date, yes/no/unknown, URL list (https only, WF-SUBMIT-2), list of items (one per line), assumption list (WF-FORM-4).

## WF-FORM-2  AI fill-assist with confirm per field
```
+--------------------------------------+
| Who is affected?                     |
| [ answer control                   ] |
| [ {form.assist.offer} Suggest an     |
|   answer ]                           |
| {form.assist.privacy} Personal       |
| details are hidden first.            |
|--------------------------------------|
| after tapping:                       |
| {form.assist.working} nothing filled |
|--------------------------------------|
| {form.assist.suggestion}             |
| +----------------------------------+ |
| | Suggested text (read only)       | |
| +----------------------------------+ |
| [ {form.assist.accept} Use this ]    |
| [ {form.assist.edit} Edit then use ] |
| [ {form.assist.discard} Discard ]    |
|--------------------------------------|
| after Use or Edit then use:          |
| (Assisted) {form.assist.marker}      |
| {form.assist.markerHelp}             |
+--------------------------------------+
```
Rules: suggestions are made from what the person already entered, never from other people's drafts. A suggestion never fills a field by itself. Confirmation is per field: there is no "accept all". The "Assisted" marker stays on the field, shows in the preview and on the published page (`detail.assisted`), and is removed only if the person clears the field and writes it again. If the suggestion service is down, `form.assist.unavailable` replaces the button and the field still works. Assisted answers go through the same DP checks as any other answer.

## WF-FORM-3  Hints beside fields (needs_revision)
```
+--------------------------------------+
| {form.hint.count}                    |
| 2 fields need a closer look.         |
|--------------------------------------|
| Causes                               |
| [ The council cut cleaning to save   |
|   money.                           ] |
| (!) {form.hint.assumption}           |
|   "This rests on an assumption that  |
|   may not hold: a budget cut is not  |
|   shown in your sources. Mark it as  |
|   an assumption or add a source."    |
|   {form.hint.rule} RULE-ASSUMP-1 (example id),|
|   policy 1.0.0                       |
|   [ Mark as assumption ] [ Add source]|
|--------------------------------------|
| Scope                                |
| [ (empty meaningful answer) ]        |
| (!) {form.hint.incomplete}           |
|   "This needs a fuller answer: say   |
|   which area and which period."      |
|--------------------------------------|
| Affected people     ({form.hint.fixed}|
|   Changed since the last check)      |
| [ check ]  no hint                   |
+--------------------------------------+
```
Hints are anchored to the field (and the text span when there is one), use a text plus icon marker, never red, and are written for the person (`revision_hint`). They come from DP-ASSUMPTIONS and DP-COMPLETENESS. "Check my draft" (`form.check`) runs an advisory pass at any time; submit runs the blocking pass. Fields without hints stay plain. Focus moves to the first hinted field after a check. The same layout is used on the decision screen (WF-DECISION-1).

## WF-FORM-4  Assumption prompt
```
+--------------------------------------+
| Assumptions made (Section 7 of 7)    |
| {form.assumption.prompt}             |
| What are you taking for granted here?|
| {form.assumption.item} Assumption 1  |
| [ The ward still owns the bins     ] |
|   Type [ Fact v ] [ Cause ] [ Legal ]|
|        [ Scope ]                     |
|   How could we check it? [         ] |
| [ {form.assumption.add} Add one ]    |
| ( ) {form.assumption.none}           |
|     I checked and assume nothing     |
+--------------------------------------+
```
Each assumption is typed (fact, cause, legal, scope) so DP-ASSUMPTIONS can check it against the right sources. The none option is allowed only after the person has seen the prompts, and DP-COMPLETENESS may still ask for more.

## WF-FORM-5  Schema version change and unknown field types (fail safe)
```
+--------------------------------------+
| {form.version.pinned}                |
| You started on version 1.1.0. We keep|
| your draft on that version.          |
| {form.version.newer}                 |
| A newer version is available.        |
| New or changed: Scope (new field)    |
| [ {form.version.move} Move ]         |
| [ {form.version.stay} Stay ]         |
|--------------------------------------|
| Unknown field type                   |
| [ (field label from the schema)    ] |
| {form.field.unsupported}             |
| {form.field.unsupportedBlocks}       |
+--------------------------------------+
```
A draft stays on the schema version it started on until the person moves. Moving keeps all answers and lists what is new. An unknown field type renders a read-only placeholder with its label and the message above, never a blank gap and never a crash. Submit stays disabled if a required field cannot be shown. The server re-validates against the version stamped on the draft.
