---
id: "03-u02"
plan: "03"
title: "Privacy detector with fixture corpus (PRIV-GATE-1, NAME-1)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 16
depends_on: []
writes: ["src/problems/domain/privacy/**","test/fixtures/privacy-flags.json"]
reads: ["docs/spec/constitution/rules.md"]
spec: ["docs/spec/constitution/rules.md#PRIV-GATE-1","docs/spec/constitution/rules.md#NAME-1","docs/design/system-design.md#9-test-strategy","docs/spec/01-slice-1-brief.md#2-slice-1-defaults","docs/spec/constitution/rules.md"]
needs: []
verify: ["npm run lint","npm run build","npm test","npx vitest run src/problems/domain/privacy"]
founder_gate: false
defaults: "If a heuristic cannot meet a row, record that row as known_gap with a note instead of weakening other rows."
status: done
attempts: 0
commits: ["2d6ae94"]
actual_hours: 0.1
---
## Objective
A deterministic detector that flags personal data in free text with spans, plus a versioned fixture corpus where every row names the RULE-ID it tests. No AI, no network.

## Steps
1. src/problems/domain/privacy/detect.ts: detectPrivacyFlags(text): Flag[] where Flag = {kind: "person_name" | "phone" | "email" | "government_id" | "street_address" | "vehicle_plate" | "first_person_about_named", ruleId: "PRIV-GATE-1" | "NAME-1", start, end, suggestion?}. Normalise first: NFKC, strip zero-width characters, fold common digit look-alikes and spaced or dotted digit runs so "5 5 5 . 0 1 0 0" is still a phone.
2. Rules: emails by pattern; phones (7 to 15 digits with common separators and country prefixes); government id shapes (generic fictional patterns such as AAA-123456 and 9 to 12 digit runs labelled id/ssn/passport); street address = a number followed by one to three words and a street suffix (street, st, road, rd, avenue, ave, lane, drive, close, way, court) in English; plates = 2 to 3 letters + 3 to 4 digits patterns; person name = a Title (Mr, Ms, Mrs, Dr, Cllr, Councillor ...) followed by a capitalised word, or two adjacent capitalised words that are neither at sentence start alone nor in an institution allowlist (src/problems/domain/privacy/allowlist.ts: Council, Department, Ministry, Office, Board, Authority, Hospital, School, Station, Street names are NOT allowed); first_person_about_named = "I" or "my" clause within 40 characters of a person_name flag.
3. NAME-1 suggestion string: "{office} of {jurisdiction}, officeholder as of {YYYY-MM}" for flags that follow a role word like Mayor or Councillor; otherwise a generic "Describe the role or institution instead of the person".
4. Each flag is span-accurate (offsets into the original text, not the normalised text: keep an index map).
5. Corpus test/fixtures/privacy-flags.json: array of {id, text, expected: [{kind, start, end}], ruleId, category: "positive" | "negative" | "multilingual" | "adversarial", note}. At least 60 rows, all fictional, covering: names (with and without titles), role aliases that must NOT flag ("the Mayor of Eastvale"), institutions that must NOT flag, phones in many formats incl. spaced and spelled digits, emails incl. obfuscated "name at example dot test", addresses, plates, mixed-direction text (Arabic or Hebrew words around Latin names, escape as unicode in JSON), non-English text that must not crash, indirect identifiers ("the only red house at the end of the road") expected NOT flagged but listed in a category "known_gap" with a note (documents honest limits).
6. Runner src/problems/domain/privacy/corpus.spec.ts loads the JSON, asserts each row (known_gap rows assert the current non-detection so a future improvement is a conscious change), and asserts every row has a ruleId present in docs/spec/constitution/rules.md (read at test time).
7. Tests that read files under ../docs (the superproject) resolve the path from the superproject root and skip with an explicit reason when it is absent, because can_server may be checked out alone.

## Acceptance
- Every corpus row cites a RULE-ID that exists in the rule registry (test).
- Spans are correct in the original text including after normalisation.
- No false positive on the role-alias and institution rows.
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- Image and EXIF checks (no uploads in slice 1).
- Any ML or AI call.
