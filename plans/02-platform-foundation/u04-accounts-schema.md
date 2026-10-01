---
id: "02-u04"
plan: "02"
title: "Accounts, audit and jurisdiction schema with insert-only grants"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 12
depends_on: ["02-u03"]
writes: ["src/db/schema.ts","drizzle/**","src/platform/audit/**","test/schema.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#3-slice-1-erd","docs/design/system-design.md#4-event-log","docs/spec/constitution/rules.md#IDENT-1","docs/spec/constitution/rules.md#DECENT-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/schema.e2e-spec.ts"]
founder_gate: false
defaults: "If the can_app_rw role cannot be created in the test database, keep the grants SQL, mark the role test with a skip reason, and note it in the commit message."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Create the tables for identity and audit, plus a restricted database role so the event tables are insert-only by grant, not by convention (system-design section 4).

## Steps
1. In src/db/schema.ts (single schema file, append) define with Drizzle: account (id uuid pk, email_ciphertext bytea, email_hmac bytea unique, handle text unique, handle_regenerations int default 0, role text check in member|moderator|admin default member (moderator is the steward and maintainer function only; per-item moderators do not exist, D-51; auditor, labeler and lane_member are additive roles added by 09-u02), age_confirmed_at, created_at, deleted_at, origin_node_id, protocol_version); session (id, account_id fk, token_hash bytea unique, expires_at, absolute_expires_at, revoked_at, client_kind text web|native, last_seen_at); invite (id, code_hash bytea unique, issued_by fk, redeemed_by fk null, expires_at, redeemed_at); login_code (id, account_id fk, code_hash bytea, expires_at, attempts int default 0, consumed_at); jurisdiction (id, name, kind, parent_id, is_fictional bool (true only for test fixtures such as fiktiva-city; real overlays such as Amsterdam NL are false and allowed, D-56), enabled bool default false (a jurisdiction accepts problems only when enabled, needed by the re-resolution feasibility check, D-59), emergency_notice text, rule_set_version text, origin_node_id, protocol_version); audit_event (id uuid pk, actor_id null, action, subject_type, subject_id null, detail jsonb, transitional bool default false (set when a run decided under a pack ratified only by transitional founder stewardship, INTERIM-1), ip_class text null, at timestamptz, origin_node_id, protocol_version, prev_hash null).
2. bytea needs a Drizzle customType; create it once in src/db/types.ts and reuse.
3. Run npm run db:generate (never hand-edit drizzle/**). Then npm run db:generate -- --custom --name=roles_and_grants and write SQL: create role can_app_rw if not exists (NOLOGIN); grant select, insert, update, delete on all tables except events and audit_event; grant only select, insert on events and audit_event; alter default privileges so later tables created by the owner get the same grants EXCEPT the append-only ones (document that each new append-only table needs an explicit revoke in its own migration).
4. src/platform/audit/audit.service.ts: AuditPort.record(tx, {actorId, action, subjectType, subjectId, detail, transitional, ipClass}) writes one audit_event row via the IdGenerator and Clock. Reject (throw) if detail contains keys matching /email|token|code|password|ciphertext/i at any depth (secrets never enter audit rows).
5. test/schema.e2e-spec.ts (needs db): migrations apply; as owner, SET ROLE can_app_rw then UPDATE and DELETE on events and audit_event fail with permission denied while INSERT works; jurisdiction rows accept both is_fictional values and default to enabled=false; no column named like email in any non-secret table (assert account has only email_ciphertext and email_hmac); AuditPort rejects an email key.

## Acceptance
- Fresh database migrates cleanly from empty with npm run db:migrate.
- Insert-only grants are proven by a test that runs under SET ROLE can_app_rw.
- DECENT-1 columns (origin_node_id, protocol_version, nullable prev_hash where listed) exist and are tested.
- `npm run verify` is green.

## Out of scope
- Wiring the app to connect as can_app_rw (plan 07 security checklist).
- problem tables (later unit).
