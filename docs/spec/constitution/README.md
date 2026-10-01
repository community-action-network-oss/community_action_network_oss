# CAN constitution

The charter for the Community Action Network, restructured from the original 99 articles into eleven chapters. It is readable, tagged by status, and paired with a registry of testable rules that bind slice 1.

- Old article numbers resolve to new IDs in [`map.tsv`](map.tsv). Every old article appears exactly once.
- Each article carries a status line: `Status · Old: Art N · First phase`.
- Machine-testable rules are in [`rules.md`](rules.md). Chapters cite them on a `Rules:` line.
- Run `node tools/check.mjs` to check the map, file sizes, banned wording, and rule ID parity.

## Status tags

- **Decided**: the founder stated this as a decision, position, clarification, or intent. Binding.
- **Position**: inferred from the founder's intent and refined by adversarial review. Binding for now, open to revision through the amendment process.
- **Drafted**: written during spec drafting with no founder attribution. Working text. It binds only where a chapter or rule says so, and the community can challenge it.

A merged article shows each source article's tag.

## Precedence

When rules conflict: rights > crisis and safety > privacy > legal gate > procedure > ranking (I.2). Beneath that, the constitution outranks a policy pack, a policy pack outranks the spec's mechanics, and the spec outranks code comments. A conflict that cannot be settled mechanically holds the item and queues a policy question for the maintainers.

## Amendment, in brief

Anyone may propose an amendment. It is mapped to affected articles and tests, reviewed independently with affected groups represented, deliberated during a waiting period, and approved by a quorum, with conformance tests before activation and rollback defined (VIII.2). The protected core (I.2) cannot be removed by an ordinary amendment. Until a quorum exists, the founder acts as a time-limited transitional steward under stated limits and a sunset condition (VIII.2).

## Chapters

Phase tags: S1 = slice 1, S1-min = a minimal core in slice 1, P3 to P8 = later phases, D = decentralization track.

| Chapter | File | Old articles | First phase |
|---|---|---|---|
| I. Purpose and scope | [ch01](ch01-purpose-scope.md) | 1-3, 19, 25, 29, 51, 52, 56-58, 71, 98 | S1 |
| II. Privacy, participation, publication | [ch02](ch02-privacy-participation.md) | 18, 39, 40, 47-49, 53, 60, 63, 65-67, 73, 77, 79, 80, 96 | S1 (II.9 P7) |
| III. Public discourse and evidence | [ch03](ch03-discourse-evidence.md) | 54, 55, 61, 68-70, 74-76, 81-84 | S1 / S1-min (some P3, P7) |
| IV. Resolution and lifecycle | [ch04](ch04-resolution-lifecycle.md) | 4-14, 16, 17, 21, 22, 24, 30, 37, 46 | S1 / S1-min (some P3, P4, P5) |
| V. AI, review, appeals | [ch05](ch05-ai-review-appeals.md) | 15, 20, 23, 26, 31, 32, 44, 45, 64, 97 | S1 (V.5, V.6 P5) |
| VI. Restrictions, sanctions, restoration | [ch06](ch06-sanctions.md) | 41-43, 50 | S1-min (P5) |
| VII. Expertise and reputation | [ch07](ch07-expertise-reputation.md) | 27, 33-35, 59, 72 (and 26 para 3) | P5 |
| VIII. Governance | [ch08](ch08-governance.md) | 36, 62, 78 | S1 (VIII.2, VIII.3), P5 |
| IX. Decentralization and nodes | [ch09](ch09-decentralization.md) | 28, 38, 95, 99 | S1 (IX.2 seams), D |
| X. Systemic problems and accountability | [ch10](ch10-systemic-accountability.md) | 85-88 | P7 (X.3 from P4) |
| XI. Election accountability | [ch11](ch11-elections.md) | 89-94 | P8, off by default |

Chapters I-VI were rewritten with mnemonic IDs. Chapters VII-XI keep the original text with light edits (status and provenance lines, "case" read as "problem", money and cross-reference fixes). Mechanics stay in the spec sections. Chapters hold the principle and the rule IDs.
