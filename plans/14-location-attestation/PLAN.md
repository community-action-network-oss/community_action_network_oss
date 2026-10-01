---
id: "14"
title: "Location attestation"
approved: true
status: todo
depends_on_plans: ["02", "04", "09"]
spec: ["docs/design/location/attestation.md", "docs/adr/0016-private-location-attestation.md", "docs/spec/constitution/rules-legal-sim.md", "docs/design/ux/wireframes/guest.md", "docs/design/components/server.md", "docs/design/ux/ui-unit-template.md"]
---
# Plan 14: Location attestation

## Goal
Label each contribution `impacted` or `guest` from where the app is used when sending, without anyone learning where a person is (D-73, D-75, ADR 0016). Slice 1 is option C: a versioned affected area per problem, a client check on the device, a server challenge that is single use and bound to the account and area version, App Attest or Play Integrity tokens where native, a self-asserted result on web, rate limits and downgrade rules, and only four stored fields (`impact_label`, `attestation_result`, `area_version`, `proof_type`). The target is `zk_cell_v1`, a blinded H3 cell-membership proof, adopted only after a spike meets: proof at most 3 s median on a mid-range Android browser, at most 20 KB, verification at most 50 ms, and a clean external privacy review. Nothing here stores or logs coordinates, cells or network-derived location, and attestation never enters a moderation input.

## Spec refs
- docs/design/location/attestation.md (sections 1 to 8), ADR 0016
- docs/spec/constitution/rules-legal-sim.md: IMPACT-1, GUEST-LABEL-1, LOC-PRIV-1, LOC-DOUBT-1
- docs/design/ux/wireframes/guest.md: WF-GUEST-1, WF-FILTER-1, WF-LOCPERM-1
- Decisions D-73, D-75, D-8 (web first, native bundle only), D-72; open questions OQ-impacted-label-web, OQ-h3-resolution, OQ-boundary-data, OQ-location-verification, OQ-native-device-testing

## Contracts with other plans
- Anchors 14-u01 (area model) and 14-u02 (attestation option C, implementing the `ContributionAttestationPort` that 04-u02 defines) are depended on by plan 12.
- Plan 12 owns the UI and read side that were first planned here: the Guest badge (12-u22), the Impacted only filter (12-u23), the permission pre-prompt (12-u24) and the label read side with exact counts on every list (12-u11). This plan adds the hardened on-device library that consolidates 12-u24's local check (14-u04), the proof-type wording (14-u06), the downgrade rules and counters (14-u03), native adapters (14-u09, 14-u10), the simulation fakes (14-u11) and the privacy conformance suite (14-u12). Plan 12 lists this plan in depends_on_plans; this plan therefore does not list 12 (cycle), and the unit edges in the table are the truth.
- Plan 09 run inputs never contain attestation fields (14-u12 tests the input builder); plan 11 uses the fakes (14-u11) and the location scenarios (11-u50).
- Rate limits: the new routes are listed as follow-ups for 07-u02 in 14-u01 and 14-u02; nothing here edits the limits table. The per-account and per-area counters of 14-u03 are part of the attestation decision, not the HTTP limiter.

## Acceptance for the whole plan
Slice 1 (units 14-u01 to 14-u14, no device, no network): the area of a problem is a versioned polygon with at least 25 H3 cells at resolution 8 and an immutable history; a challenge is single use and dead after 2 minutes; an inside claim gives `impacted` with a self-asserted result, and no permission, outside, stale, replayed, invalid, rate-limited or an outage gives `guest` and a posted message; a surge from new accounts is downgraded per area; no restriction or reputation row ever follows a location signal; the same account can be impacted on one problem and guest on another; the schema scan, the log scan and the moderation-input scan pass; impacted and guest copies of the same content get identical moderation outcomes. The spike units (14-u20 to 14-u31) produce a measured report under spikes/zk-cell in the superproject; numbers from headless runs are labelled provisional. Founder-gated and not part of the green bar: the external privacy review (14-u28), native device round trips (14-u29), real mid-range Android measurements (14-u30), and the adoption decision (14-u32). Every zk_cell_v1 implementation unit (14-u40 to 14-u45) depends on 14-u32 and never runs before it.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [14-u01](u01-area-model-versioned-affected-area-with.md) | Area model: versioned affected_area with H3 cell set and fetch API | can_server | 1.5 | 450 | 02-u03, 02-u10 | - |
| [14-u02](u02-attestation-option-c-single-use-challenge.md) | Attestation option C: single-use challenge, verification, label on contributions | can_server | 1.5 | 451 | 14-u01, 02-u04, 04-u01, 04-u02 | - |
| [14-u03](u03-downgrade-rules-rate-limits-and-per.md) | Downgrade rules, rate limits and per-area surge caps (LOC-DOUBT-1) | can_server | 1.5 | 452 | 14-u02 | - |
| [14-u04](u04-client-area-check-library-cached-cell.md) | Client area check library: cached cell set, plausibility history, assertion prover (consolidates 12-u24) | can_app | 1.5 | 453 | 14-u01, 14-u02, 12-u24, 02-u13 | - |
| [14-u06](u06-impact-label-wording-by-proof-type.md) | Impact label wording by proof type: "Reported impacted" while self-asserted (D-75) | can_app | 1 | 455 | 12-u22, 14-u04 | - |
| [14-u09](u09-native-integrity-verifiers-app-attest-and.md) | Native integrity verifiers: App Attest and Play Integrity adapters | can_server | 1.5 | 458 | 14-u02 | - |
| [14-u10](u10-native-attestation-client-wrappers-bundle-only.md) | Native attestation client wrappers: bundle only, unverified on device | can_app | 1.2 | 459 | 14-u04, 14-u09 | - |
| [14-u11](u11-fakes-for-the-persona-simulation-controllable.md) | Fakes for the persona simulation: controllable label on the test server | can_server | 1 | 460 | 14-u02, 14-u03 | - |
| [14-u12](u12-privacy-conformance-suite-schema-scan-log.md) | Privacy conformance suite: schema scan, log redaction, moderation inputs, API keys | can_server | 1.2 | 461 | 14-u03, 12-u11, 09-u22 | - |
| [14-u14](u14-e2e-inside-denied-replayed-stale-surge.md) | E2E: inside, denied, replayed, stale, surge and outage give the right labels | can_server | 1.3 | 462 | 14-u03, 12-u11, 14-u11, 14-u12 | - |
| [14-u20](u20-spike-e0-shared-harness-test-vectors.md) | Spike E0: shared harness, test vectors and result format | . | 1.5 | 470 | 14-u01 | - |
| [14-u21](u21-spike-e1-noir-and-barretenberg-ultrahonk.md) | Spike E1: Noir and Barretenberg (UltraHonk) cell-membership circuit | . | 1.5 | 471 | 14-u20 | - |
| [14-u22](u22-spike-e2-circom-and-groth16-variant.md) | Spike E2: Circom and Groth16 variant with a ceremony plan | . | 1.5 | 472 | 14-u20 | - |
| [14-u23](u23-spike-e3-point-in-polygon-circuit.md) | Spike E3: point-in-polygon circuit (option A) at 32 and 64 vertices | . | 1.5 | 473 | 14-u20 | - |
| [14-u24](u24-spike-e4-bundle-size-and-lazy.md) | Spike E4: bundle size and lazy loading of WASM and keys | . | 1.2 | 474 | 14-u21, 14-u22 | - |
| [14-u25](u25-spike-e6-spoof-test-matrix-for.md) | Spike E6: spoof test matrix for the location signals | . | 1.2 | 475 | 14-u04, 14-u03 | - |
| [14-u26](u26-spike-e8-verifier-throughput-on-one.md) | Spike E8: verifier throughput on one core | . | 1 | 476 | 14-u21, 14-u22 | - |
| [14-u27](u27-spike-e5a-privacy-review-package-for.md) | Spike E5a: privacy review package for the external reviewers | . | 1.5 | 477 | 14-u21, 14-u22, 14-u25 | - |
| [14-u28](u28-spike-e5b-external-privacy-review-two.md) | Spike E5b: external privacy review (two reviewers), founder-gated | . | 0.5 | 478 | 14-u27 | yes |
| [14-u29](u29-spike-e7-native-app-attest-and.md) | Spike E7: native App Attest and Play Integrity round trips on devices, founder-gated | . | 1 | 479 | 14-u09, 14-u10 | yes |
| [14-u30](u30-spike-real-device-measurements-on-the.md) | Spike: real-device measurements on the reference mid-range Android phone, founder-gated | . | 1 | 480 | 14-u21, 14-u22, 14-u24, 14-u25 | yes |
| [14-u31](u31-spike-report-numbers-comparison-and-a.md) | Spike report: numbers, comparison and a recommendation for B or not | . | 1.2 | 481 | 14-u21, 14-u22, 14-u23, 14-u24, 14-u25, 14-u26, 14-u27 | - |
| [14-u32](u32-adoption-decision-for-zk-cell-v1.md) | Adoption decision for zk_cell_v1 (founder gate) | . | 0.5 | 482 | 14-u31, 14-u28, 14-u29, 14-u30 | yes |
| [14-u40](u40-zk-cell-v1-server-side-poseidon.md) | zk_cell_v1 server side: Poseidon area root and circuit and key registry | can_server | 1.5 | 490 | 14-u32, 14-u01, 14-u02 | - |
| [14-u41](u41-zk-cell-v1-circuit-package-reproducible.md) | zk_cell_v1 circuit package: reproducible build, keys and vectors | can_app | 1.5 | 491 | 14-u32, 14-u40 | - |
| [14-u42](u42-zk-cell-v1-prover-adapter-lazy.md) | zk_cell_v1 prover adapter: lazy WASM, plausibility bit, fallback to option C | can_app | 1.5 | 492 | 14-u41, 14-u04, 14-u40 | - |
| [14-u43](u43-zk-cell-v1-verifier-public-inputs.md) | zk_cell_v1 verifier: public inputs, verify then discard, unknown proof types to guest | can_server | 1.5 | 493 | 14-u40, 14-u41, 14-u02, 14-u03 | - |
| [14-u44](u44-label-wording-and-explanation-for-verified.md) | Label wording and explanation for verified proofs | can_app | 1 | 494 | 14-u42, 14-u06 | - |
| [14-u45](u45-e2e-with-a-real-proof-fixture.md) | E2E with a real proof fixture: zk_cell_v1 through the HTTP API | can_server | 1.3 | 495 | 14-u43, 14-u41, 14-u12 | - |

## Risks
- Web assertions are self-asserted: the honest label is "Reported impacted" and no copy may claim a verified location (14-u06 scans the strings).
- The spike needs toolchains (Noir, Barretenberg, Circom, snarkjs) and a real phone; headless numbers can mislead, so the adoption unit demands the device numbers and the external review before anything ships.
- Small areas make "inside" close to an address: K_MIN_CELLS (25 by default, a pack value) and neighbourhood-scale areas are the mitigation; OQ-h3-resolution stays open.
- Intersection of overlapping areas could narrow a person's region: no public API lists areas per person (tested in 12-u11 and 14-u12).
- Native attestation is bundle-only in slice 1 (D-8): its code is unverified on a device until 14-u29.
- Server units share src/db/schema.ts and openapi.json with plans 12 and 13; keep the lane serial and never hand-edit generated files.
