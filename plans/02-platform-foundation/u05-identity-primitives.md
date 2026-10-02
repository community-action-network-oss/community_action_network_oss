---
id: "02-u05"
plan: "02"
title: "Email crypto, code hashing and handle generator"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 13
depends_on: ["02-u02"]
writes: ["src/accounts/domain/**","src/accounts/infra/crypto.ts","src/accounts/infra/crypto.spec.ts","package.json","package-lock.json"]
reads: ["src/config.ts"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#5-auth-flow","docs/spec/constitution/rules.md#IDENT-1","docs/open-questions/OQ-handle-word-lists.md","docs/open-questions/OQ-handle-scope.md"]
needs: []
verify: ["npm run lint","npm run build","npm test","npx vitest run src/accounts/infra/crypto.spec.ts"]
founder_gate: false
defaults: "The wordlists are a reversible default for OQ-handle-word-lists; if blocked, ship the minimum 120 each and log the question."
status: done
attempts: 0
commits: ["c89ea08"]
actual_hours: 0.1
---
## Objective
The pure building blocks of accounts, tested alone: encrypt and blind-index an email, hash codes and tokens, generate curated handles. No database in this unit.

## Steps
1. src/accounts/infra/crypto.ts (uses node:crypto only): encryptEmail(plain, key) returns AES-256-GCM bytes as iv(12) + tag(16) + ciphertext; decryptEmail(bytes, key); emailBlindIndex(plain, indexKey) = HMAC-SHA256 over the lowercased trimmed email; hashSecret(value, key) = HMAC-SHA256 for invite codes, login codes and session tokens (tokens: plain SHA-256 is enough because they are 256 bits of entropy, document the choice); newToken() = 32 random bytes base64url; newLoginCode() = 6 digits using crypto.randomInt, zero padded; constantTimeEqual(a, b) via timingSafeEqual on equal-length buffers.
2. Normalise email once: trim, lowercase, NFC. The blind index uses the normalised value so lookups are case-insensitive.
3. src/accounts/domain/handle.ts (pure, no node imports): ADJECTIVES and NOUNS curated lists of at least 120 entries each in src/accounts/domain/wordlists.ts (lowercase ascii, 3 to 8 letters, calm and neutral, no names, no places, no political, religious, body or slur-adjacent words, no real-person names); generateHandle(rng) returns adjective-noun-NN (two digits); the rng is injected as a function returning [0,1) so tests are deterministic.
4. Wordlist tests: no duplicates, all match /^[a-z]{3,8}$/, a small blocklist test (an array of at least 30 sensitive substrings checked case-insensitively against every word and against all adjective-noun combinations is too large, so check every word individually), 10000 seeded handles are unique enough (collision rate under 1 percent) and match /^[a-z]+-[a-z]+-\d{2}$/.
5. Crypto tests: encrypt then decrypt round trips; tampering with one byte fails (GCM tag); the same email always gives the same blind index and a different key gives a different one; two encryptions of the same email differ (random iv); codes are always 6 digits (1000 samples); constantTimeEqual handles unequal lengths without throwing.

## Acceptance
- AES-256-GCM with a random 12 byte iv per encryption and a tamper test.
- The domain folder imports nothing from node:*, Nest or Drizzle.
- Wordlists pass the checks above; reviewers can read them in one screen each (keep them compact).
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- Key rotation.
- Database access or HTTP.
