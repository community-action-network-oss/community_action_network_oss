# Private location attestation (D-73)

Status: planned. Slice 1 ships option C (section 3); the target is option B after a spike; option A is researched but not on the critical path. Binding: D-73, D-8 (verification on Expo web only), D-57, D-61, D-72. Vocabulary follows `.claude/skills/can-code-large/briefs/lifecycle-v2.md`.

## 1. Goal and threat model

**Claim to prove.** "This message was sent from inside affected area A (version v) at time T." The server learns the claim and its verification result. It never learns the position, the cell, or anything that narrows the position inside A.

**Assets.** The sender's location history. The integrity of the `impacted` label (a filter people rely on, "Impacted only").

| Adversary | Can do | Goal | Position |
|---|---|---|---|
| Curious server operator | Reads every request, log, row | Learn where a person is | Must learn nothing beyond "inside A at T" |
| Database leak | Gets all stored rows | Reconstruct movements | Rows hold only label, result, area version, proof type |
| Other users | See public labels and timing | Locate or link posters | Label is binary; no per-message extra data |
| Spoofing poster | Fakes GPS, emulator, scripted client | Be labelled `impacted` while outside | Raise cost; downgrade to `guest` on doubt |
| Brigade from outside | Many accounts, VPNs, mock locations | Flood the impacted view | Rate limits, plausibility signals, per-area caps, label only affects filtering and weight, never moderation outcome |

**Out of scope.** A coerced person, a person whose device is seized, a state adversary with network-level and device-level control. Nothing here promises protection against them. Spoofing cannot be fully prevented (D-73); the design makes it costly and never turns suspicion into accusation (Constitution II.2, Art 49 principle: signals about a message, never a verdict about a person).

## 2. Area model

An **affected area** belongs to a problem and is versioned: `area_version` is a monotonically increasing integer per problem. A new version never edits an old one; old contributions keep the version they were verified against.

**Representation (one canonical form, two derived forms).**
- Canonical: a GeoJSON polygon or multipolygon in WGS84, simplified to a coarse boundary.
- Derived cell set: the set of H3 cells (default resolution 8, about 0.74 km2 per cell, edge about 460 m) whose centre lies inside the polygon, or that intersect it by more than 50 percent. Cell set is the object used by option B. Resolution is per area, stored in the version.
- Derived commitment: a Merkle root over the sorted cell ids (Poseidon hash for ZK, SHA-256 mirror for the server), published with the version.

**Authoring paths.**
1. From jurisdiction overlays: the poster picks an administrative unit (ward, municipality, district) from a vetted boundary dataset (for example OpenStreetMap administrative boundaries, ODbL; licence checked by DP-SOURCE-TRUST style provenance, recorded as a `source_ref`). Preferred, because it is reproducible and not drawn by one person.
2. Poster-drawn: a polygon on a map, snapped to cells at the chosen resolution. The draw tool never shows or stores the poster's own position; the map is browsed manually.
3. Volunteer review: the area is a reviewable field in `in_review` (a `review_recommendation` on path `affected_area`). Volunteers can recommend shrinking, growing or switching to an overlay. The poster accepts or declines with a reason (RECO-1). DP-PUBLISH weighs open recommendations as for any other field.

**Rules.**
- Minimum size: at least `K_MIN_CELLS` cells (default 25 at resolution 8, about 18 km2) or, for urban areas, a population floor from the overlay when known. Smaller affected places (a single building) are expressed as the surrounding neighbourhood; the problem text still names the specific place. This limits intersection attacks (section 5).
- Maximum: country-scale areas are allowed (labels still work) but flagged for review, since "impacted" loses meaning.
- Area change after publication is a plan-change-like proposal, never silent; a new version applies to new contributions only. Old labels are not recomputed (they cannot be: the location is gone).
- Areas are public data. They describe the problem, not people.

## 3. Candidates

### Comparison

| | A. ZK point-in-polygon | B. Blinded coarse-cell membership | C. Client boolean plus device attestation |
|---|---|---|---|
| What the client sends | ZK proof that a hidden (lat, lon) is inside the polygon | ZK proof that a hidden cell id is in the area's Merkle set, bound to the message | Boolean "inside" plus server challenge response, plus integrity token on native |
| Server learns | Inside A, nothing else | Inside A, nothing else | Inside A (claimed), device integrity verdict |
| Privacy | Strong (zero knowledge; polygon vertices public) | Strong (zero knowledge; cell hidden; resolution bounds precision) | Good for location (coordinates never sent), but nothing proves the claim |
| Spoofing resistance | Same as B: proof only shows the hidden input satisfies the predicate, not that the input is the real GPS fix | Same as A | Weakest: any client can send `true`; native integrity raises the cost; web has almost none |
| Client cost, low-end phone and web | High. Winding or ray-casting over N edges in-circuit with fixed-point arithmetic; circuit grows with vertex count (hundreds to thousands of constraints per edge); simple polygons of 20 to 60 vertices are realistic; proving seconds to tens of seconds in WASM on mid-range Android, large memory | Low to moderate. Merkle membership depth 8 to 14 with Poseidon, a few thousand constraints; proving well under a few seconds is plausible in WASM, to be confirmed by the spike | Negligible |
| Server verify cost | Milliseconds (Groth16 about 3 pairings; UltraHonk tens of ms) | Same | Token verification, one remote call (Play Integrity) or local (App Attest) |
| Proof size | Groth16 about 200 bytes; UltraHonk about 2 to 15 KB | Same ranges | Under 1 KB |
| Trusted setup | Groth16 needs a circuit-specific ceremony; Plonk-family with universal SRS does not need a per-circuit one | Same | None |
| Maturity | Research and hackathon level (for example GeoZK-style Circom point-in-polygon circuits); no audited production reference | Merkle membership is the most common ZK pattern (Semaphore-style); mature tooling | Mature, vendor-supported |
| Libraries | Circom with snarkjs (browser WASM), Noir with Barretenberg `bb.js` (UltraHonk; CHONK targets memory-constrained clients) | Same, plus `@zk-kit` or Semaphore-like Merkle gadgets; H3 via `h3-js` | `expo-app-integrity` style wrappers, Apple App Attest, Play Integrity API |
| Fit with D-8 (web first) | Possible, WASM | Good, WASM | Web has no device integrity |

Private set intersection was also considered for B. It needs interaction or a server-side set per query and leaks set structure to a curious server; the Merkle ZK form needs one non-interactive message and publishes only the root. PSI is not carried forward.

**Honest reading.** A and B both prove a predicate over a hidden input. Neither proves the input is a true GPS fix. The location source is a browser or OS API that a motivated user can fake. ZK buys privacy, not anti-spoofing. Anti-spoofing comes from section 4. B gives almost the same privacy as A at far lower cost, with bounded precision loss (cell width is already the privacy floor).

### Recommended staged path

**Slice 1: option C, no device integrity on web, web-first (D-8).**
- Why: smallest build, web is the only verified platform, no ZK toolchain in the critical path, and the coordinates never leave the device. The honest label is "reported from inside the area".
- Mechanics: client checks its position against the downloaded cell set locally, then sends `{claim: inside, area_version, challenge_response}`. The server issues a short-lived, single-use challenge bound to the account and area version, so claims cannot be replayed or pre-computed. Verification result is `client_assertion`.
- Because the web assertion is weak, slice 1 applies the downgrade rules of section 4 (rate caps, caps per area, `guest` on missing or stale challenge) and the UI copy never says "verified location". The label is shown as "Impacted" with a help text "Reported from inside the area, checked privately". Open question OQ-1 asks the founder whether that wording is acceptable or the label should read "Reported impacted" until target proof types land.
- Native (not verified in slice 1, must only bundle, D-8): the same message plus an App Attest assertion or Play Integrity token; verification result `device_attested`. The code path is specified but built after web.

**Target: option B, after a spike (section 8).** Proof type `zk_cell_v1`. Adopt when all hold:
1. Median proving time at most 3 s and p95 at most 8 s on the reference mid-range Android browser, with at most 150 MB peak memory.
2. Proof size at most 20 KB; server verify at most 50 ms single core.
3. Privacy review finds no leak of the cell, no stable per-user linker, and the nullifier design (section 6) is safe.
4. Toolchain licence and audit status acceptable to the contributor base (open source, permissive licence, no custom crypto).

**Option A** is revisited only if the spike shows B's cell precision is unacceptable (areas smaller than the cell grid cannot be expressed anyway, section 2) or a vendor offers an audited point-in-polygon gadget. It does not block B.

Reversal if B fails: stay on C with stronger signals, or fall back to self-declared coarse area (D-73 reverse).

## 4. Anti-spoofing: signals, not identity

Signals feed a per-message decision `impacted` or `guest`. They are never stored per person as a location trail and never shown to anyone as an accusation.

| Signal | Platform | Notes |
|---|---|---|
| App Attest (assertion per message, key attested once) | iOS native | Server verifies the assertion and counter locally. Proves genuine app on genuine device, not honest GPS. Not available on simulator. |
| Play Integrity (standard request bound to a message hash) | Android native | Needs Google Play services; server decodes the verdict through Google. Verdict is a signal, not a ban list. Devices without Play get `guest` weight, not rejection. |
| Web | Web | No equivalent. Use challenge freshness, origin check, and the plausibility and rate signals below. Optional WebAuthn presence is not a location proof. |
| Velocity and consistency | Client side only | The client keeps its own recent coarse history (cell ids, local storage, never uploaded) and refuses to assert `inside` if the jump from the last fix is physically implausible, or the position flips between regions within minutes. The client reports only "plausible: yes or no" as part of the proof statement (in B, as an additional public input). A modified client can lie, so this is a cost raiser against casual spoofing. |
| Mock-location flags | Android, browser permission quirks | Weak signal, used to downgrade only. |
| Rate limits | Server | Per account, per area, per time window; counters are keyed on account id and area, not on location. Per-area cap on `impacted` contributions per day beyond which new ones are `guest` pending review of the surge. |
| Account age and history | Server | May reduce weight of a newly created account; must not reveal identity or location. |

**Decision rule.** `impacted` only if the proof verifies, the challenge is fresh, rate limits pass, and no downgrade signal fires. Any doubt means `guest`. The message is accepted either way (guests contribute, labelled). The person sees "Shown as guest" with a neutral, actionable reason (no permission, location unavailable, not inside the area, could not check). The reason set is coarse and never says "suspected spoofing". No appeal on the label is needed because nothing is lost but a filter position; the contributor can resend after fixing permissions.

**Brigade handling.** The label does not change the legality, safety or moderation outcome of a message (D-61 layers apply equally). Brigading shows up as a surge in `impacted` claims from new accounts; mitigation is the per-area cap and the surge downgrade, plus review of area size.

## 5. Data stored and what the server can learn

**Per contribution, stored:**

| Field | Values |
|---|---|
| `location_label` | `impacted` or `guest` |
| `location_result` | `verified`, `asserted`, `no_permission`, `unavailable`, `outside`, `stale`, `rate_limited`, `invalid_proof` |
| `area_version` | integer |
| `proof_type` | `none`, `client_assertion`, `device_attested`, `zk_cell_v1`, `zk_polygon_v1` |

Never stored: coordinates, cells, geohashes, IP-derived location, Wi-Fi or cell-tower data, device id beyond what an attestation protocol needs transiently, user-agent location hints. Proofs themselves are verified and discarded; the proof bytes are not kept (they are not location data, but there is no reason to keep them).

**Logs.** Request logs redact the attestation payload field to its length and type. The IP address is used for abuse rate limiting as the platform allows, with the retention of the existing access-log policy, and is never joined to the label. Error logs must not contain request bodies of attestation endpoints. A lint or test checks that no logger formats the attestation DTO.

**Retention.** Label, result, area version and proof type live as long as the contribution. Challenges expire in 2 minutes and are deleted on use or expiry. Rate counters are kept for the window length only.

**What the server can learn.** The sender claims presence in A at the message time T (the message's existing timestamp). If sent with proof type C, it knows only a claim. With B, it knows the hidden cell is a member of the cell set.

**Residual risks and mitigations.**

| Risk | Detail | Mitigation |
|---|---|---|
| Intersection over many problems | The same person is `impacted` for several problems whose areas overlap in a small intersection, narrowing their region | Minimum area size, area resolution not finer than neighbourhood scale, label is public per problem only for that problem; avoid exposing a per-user "impacted for" list; do not link accounts to per-problem labels in any public API |
| Tiny areas | An area of one cell makes "inside" nearly equal to an address | `K_MIN_CELLS`; areas expressed at neighbourhood scale (section 2) |
| Timing | Message time T plus label correlates with a commute | Use only the existing contribution timestamps; no attestation timestamp or location fix time is stored or sent; challenge issued at send, not tied to GPS fix time |
| Stable linker in proof | A per-user nullifier or public key lets the server link proofs across messages | `zk_cell_v1` uses no persistent identifier; replay protection comes from the per-message server challenge and message-hash binding, not a nullifier |
| Challenge side channel | Challenge request time reveals activity | Challenge request already authenticated; no location sent |
| Client history store | Local recent-cell history is sensitive on a shared device | Stored only in app storage, short TTL (24 h), cleared on sign-out; documented in the privacy notice |
| Re-identification via area plus topic | A rare issue in a small area identifies the poster | Out of scope of this mechanism; handled by problem-level privacy review and area minimums |

## 6. UX hooks

Copy ids are added by the UX agent to the copy deck; this section states intent only. No em or en dashes in any string.

- **Permission prompt.** Ask only at the moment of sending a contribution, never at app start. Pre-prompt explains in plain words: "We check on your device whether you are in the affected area. Your location is not sent or saved. Only the result is." Offer "Send as guest" without prompting. Browser geolocation uses the one-time permission where the browser supports it.
- **Without permission, denied, or unavailable.** Contribution is sent as `guest`, labelled, with a small non-blaming reason and a link to retry. Permission denial is never remembered server-side.
- **Offline.** The area cell set is cached when the problem page is opened (a few KB). The check runs offline; the proof or assertion is made when the send is queued and the challenge fetched at send time. If the challenge cannot be fetched, the message queues and the label is decided at actual send; a message queued for more than the challenge TTL window is `guest` unless re-checked.
- **Travel.** Label is per message from presence at sending time (D-73). Someone who lives in the area but is travelling sends `guest`; the UI says so with a hint ("Impacted is based on where you are when you send. Others can see your message labelled guest."). Contribution types are not blocked.
- **Filter "Impacted only".** Present on every content view (D-73). It filters on `location_label = impacted`. Counts shown next to the toggle use the same label, never a per-user list. Default is unfiltered.
- **Label display.** Always show the label on guest content; `impacted` shown with the wording decided under OQ-1. Plain explanation reachable from the label.

## 7. Interfaces

```ts
// Shared types (OpenAPI schema owned by can_server, ADR 0002)
type ProofType = 'none' | 'client_assertion' | 'device_attested' | 'zk_cell_v1' | 'zk_polygon_v1';

interface AreaRef { problemId: string; areaVersion: number; }

interface AttestationRequest {
  proofType: ProofType;
  area: AreaRef;
  challengeId: string;          // single use, from POST /v1/problems/:id/location-challenge
  messageDigest: string;        // hash of the contribution payload, bound into the proof
  payload: string;              // base64 proof or assertion; opaque to everything but the verifier
  platformToken?: string;       // App Attest assertion or Play Integrity token (native)
}

interface AttestationResult {
  label: 'impacted' | 'guest';
  result: 'verified' | 'asserted' | 'no_permission' | 'unavailable' | 'outside' | 'stale' | 'rate_limited' | 'invalid_proof';
  areaVersion: number;
  proofType: ProofType;
}

// Client (can_app): runs on device, never network
interface LocationProverPort {
  supported(area: AreaPublicData): ProofType[];                 // best first
  prove(area: AreaPublicData, challenge: Challenge, messageDigest: string): Promise<AttestationRequest>;
}

// Server (can_server): pure verifier, no storage of inputs
interface LocationVerifierPort {
  verify(req: AttestationRequest, ctx: { accountId: string; now: Date }): Promise<AttestationResult>;
}
```

`LocationAttestationPort` is the pair above. Both ports have a fake for the persona simulation (D-72 sims) so tests assign labels without a device.

**Proof format.** Versioned by `proofType`: the string includes the circuit id and verifying key hash (`zk_cell_v1` implies circuit `cell_membership_v1`). Public inputs for B: area Merkle root, area version, message digest, challenge nonce, plausibility bit. The verifier checks that the root equals the stored root for `area.areaVersion`. Unknown proof types verify to `guest` with `invalid_proof`, not an error, so older clients keep working (fail toward guest).

**Versioning.** `area_version` pins root, resolution and polygon hash. Circuit upgrades add a new `proofType` suffix and keep the old verifier for a grace period. A key rotation is a pack-level event recorded like any other policy artifact.

**Where it plugs in.**
- Write path: `POST /v1/problems/:id/contributions` (and the stage variants) accepts an optional `attestation` object. The contribution service calls `LocationVerifierPort.verify` before insert, and writes `location_label`, `location_result`, `area_version`, `proof_type` on the contribution row. A verifier outage yields `guest` with `unavailable`, never a failed post.
- Moderation run: DP inputs never include the attestation payload, and never include any location data. The moderation run may receive the label as context only if a policy rule needs it; by default it does not, so labels cannot bias legal or safety outcomes (D-61). A message whose label is `guest` is not treated as lower trust for moderation, only for the "Impacted only" view and for any weight a later decision method may give (not in slice 1).
- Challenge: `POST /v1/problems/:id/location-challenge` returns `{challengeId, nonce, expiresAt}`; stored with account id, area version, expiry only.
- Area data: `GET /v1/problems/:id/area?version=n` public, cacheable, returns polygon, cell set (or a pointer to it) and Merkle root.

## 8. Spike plan

Timebox: 5 working days, inputs for plan units. Reference device set: a mid-range Android phone of about 3 years old (4 GB RAM, Chrome), a low-end phone (2 GB RAM), a recent iPhone Safari, a mid laptop browser.

| # | Experiment | Pass | Fail action |
|---|---|---|---|
| E1 | Noir plus Barretenberg `bb.js` (UltraHonk) membership circuit: H3 res 8 cell id in a Poseidon Merkle tree, depth 12 (about 4000 cells), message digest and nonce as public inputs | Median proving at most 3 s, p95 at most 8 s, peak memory at most 150 MB, on mid-range Android Chrome; proof at most 20 KB; verify at most 50 ms on a 1 vCPU container | Try the Circom plus Groth16 variant (E2) |
| E2 | Same circuit in Circom with snarkjs Groth16, with a per-circuit ceremony plan | Same thresholds; ceremony cost documented and contributors able to reproduce | If both fail, stay on C and re-evaluate in 6 months |
| E3 | Point-in-polygon circuit (option A) with 32 and 64 vertices, fixed-point | Report proving time and memory; pass if median at most 10 s on mid-range Android | A is parked; no further work |
| E4 | Bundle size and load: WASM and keys added to the web bundle; lazy loaded | At most 3 MB extra gzip, loaded only on first send with a location check | Host keys separately, fetched on demand |
| E5 | Privacy review (written, two reviewers): transcript of what each request, log and row contains; cell not derivable; no stable linker; timing; challenge side channels | No finding rated medium or higher left open | Fix, repeat; unresolved finding blocks B |
| E6 | Spoof test: mock-location app, browser devtools geolocation override, emulator | Documented which signals detect each case, and that every undetected case still produces only a `impacted` label, not other privileges | Record as accepted residual risk or add signal |
| E7 | Native check: App Attest and Play Integrity round trips on a test build, on a device without Play services | Verdict handling works; absent verdict maps to `guest` with no error | Native remains bundle-only for slice 1 |
| E8 | Verifier throughput under load | At least 50 verifies per second per vCPU | Queue and scale; or batch |

Outputs: a table of measured numbers per device, a recommendation (B or not), and the circuit and key artefacts only if E1 or E2 passes. The spike does not touch can_server or can_app mainline code; it lives in a throwaway directory or branch.

## Sources

- GeoZK, a Circom point-in-polygon geofence proof compiled to browser WASM: https://devpost.com/software/geozk
- Circom and Noir comparison notes: https://hackmd.io/@doulos819/circom-and-noir
- Noir and Barretenberg in the browser (bb.js, UltraHonk): https://barretenberg.aztec.network/docs/how_to_guides/on-the-browser
- Noir beta, faster browser applications: https://aztec.network/zh/blog/announcing-noir-beta-stabler-faster-zk-applications-in-the-browser
- Device attestation limits (App Attest, Play Integrity): https://blog.approov.io/limitations-of-apple-devicecheck-and-apple-app-attest and https://mas.owasp.org/MASWE/MASVS-RESILIENCE/MASWE-0100/
- Data minimisation with general-purpose ZK proofs in wallets (client proving cost context): https://arxiv.org/pdf/2301.00823

Performance figures in section 3 are expectations from these sources and general knowledge of the toolchains, not measurements. Section 8 replaces them with measurements.

## Open questions to log

1. OQ-1: Label wording for slice 1 (`Impacted` versus `Reported impacted`) while web proofs are self-asserted.
2. OQ-2: Default H3 resolution and `K_MIN_CELLS`, and a population floor for urban areas.
3. OQ-3: Boundary dataset and licence for jurisdiction overlays (OSM ODbL attribution).
4. OQ-4: Whether `impacted` may later carry decision weight (D-73 says other material connections may come, Constitution IV.2); out of scope for slice 1.
5. OQ-5: Groth16 per-circuit ceremony versus universal-SRS Plonk-family system for a contributor-run project.
