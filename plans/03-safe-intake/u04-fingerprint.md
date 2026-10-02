---
id: "03-u04"
plan: "03"
title: "Draft fingerprint: normalisation, salted HMAC and repost match"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 41
depends_on: ["02-u10"]
writes: ["src/problems/domain/fingerprint.ts","src/problems/domain/fingerprint.spec.ts","src/problems/infra/fingerprint.repo.ts","src/db/schema.ts","drizzle/**","test/fixtures/reposts.json","test/fingerprint.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#9-drafts-fingerprints-and-the-pending-screen","docs/design/system-design.md#3-slice-1-erd","docs/spec/constitution/rules.md#DRAFT-TTL-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/fingerprint.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["88b33d9"]
actual_hours: 0.1
---
## Objective
Detect reposts of rejected or withdrawn drafts without keeping text: a salted HMAC fingerprint of normalised text, kept 90 days, with no link to an account or problem.

## Steps
1. Pure src/problems/domain/fingerprint.ts: normalise(text) (NFKC, lowercase, collapse whitespace, strip punctuation), shingles(normalised, 5 words), fingerprint(text, key) returning a small set of HMAC-SHA256 hashes of the shingles (a minhash style sample of at most 16 hashes) and similarity(a, b) as overlap ratio. The HMAC call may use node:crypto in infra only: the domain file takes a hash function parameter.
2. Schema: draft_fingerprint (id uuid, hashes bytea[] or jsonb of hex strings, reason "rejected" | "withdrawn", created_at, expires_at). NO foreign keys, no account id, no problem id (system-design section 3). Generated migration; also grant the restricted role like other tables.
3. Repo: store(fingerprint, reason, now) with expires_at = now + 90 days; findSimilar(hashes, threshold 0.6) returns match booleans only (never stored text); purgeExpired(now); purgeForPublished is a no-op by design because there is no link (document why: purge by expiry only; T04 "fingerprint purged" is satisfied by matching on content at publish time: findSimilar then delete matching rows, implement deleteMatching(hashes, threshold)).
4. Corpus test/fixtures/reposts.json: pairs {id, a, b, similar: bool, note} (near-duplicates with small edits, reordered sentences, unrelated texts), at least 20 pairs; spec runs with a fixed test key.
5. e2e: store, findSimilar true for a near duplicate and false for unrelated, purgeExpired removes after FixedClock + 91 days, the table has no foreign key columns (query information_schema).

## Acceptance
- No text and no account or problem id is persisted.
- A repost match is advisory only (returns a boolean passed to the moderation run as an input, never blocks).
- Expiry is 90 days from creation.
- `npm run verify` is green.

## Out of scope
- Calling it from transitions (checks unit).
- Scheduling the purge (retention unit).
