## 14. Technical architecture requirements

### The repositories

The superproject holds the specification, plans and decisions. Code lives in three git submodules (D-1, D-2, ADR 0001 in `docs/adr/`), and a fifth repository, `can_policy`, is planned (D-52). The earlier monorepo layout is dropped.

| Repository | Stack | Owns |
|---|---|---|
| `can_server` | NestJS 12 (ESM, Vitest, oxlint), Drizzle on Postgres 16, class-validator | domain and state machines (`src/domain/`, ORM-free behind repository interfaces), policy rules, protocol schemas, and the **OpenAPI contract**, generated from code with `@nestjs/swagger` into `openapi/openapi.json` |
| `can_app` | Expo SDK 57, Expo Router, gluestack-ui (adopted by 02-u24 and 02-u25; RN-core civic wrappers until then), zod | the design system and civic components, i18n messages, and the typed API client **generated** from `can_server`'s OpenAPI file |
| `can_policy` (planned; not created yet, a founder-gated plan unit) | versioned packs (semver plus content hash), schema and eval CI | the **policy pack**: `packs/base/`, `packs/jurisdictions/<id>/`, `decision-points/<DP-id>/{prompt.md, schema.json, examples/, eval/}`, `ratifications/`, `CHANGELOG.md`. Rule ids move here from `constitution/rules.md` over time. CI: schema lint, eval, replay diff against fixtures. The server loads packs by version and hash. Layers apply base platform, constitution, jurisdiction law, local rules (Constitution I.2). Jurisdiction law is a stack of versioned, source-verified legal corpora L1 to L6 (UN human rights, supranational, national constitution, national law, regional, city; D-61); a corpus update triggers re-moderation and re-resolution (`RERESOLVE-1`) Community changes arrive as PRs (`docs/design/ai/policy-pack.md`) |
| `can_gallery` | Next.js 16 static export, gluestack-ui (target, adopted by 06-u15 and 06-u16; plain CSS until then) | the public gallery: the Phase 0A public concept page plus a read-only window into the project. No forms, no analytics, no third-party fetches |

Rules:

- Only `can_server`'s OpenAPI file is shared between repositories. `can_app` pins a `can_server` version through the submodule SHA and regenerates its client with `npm run gen:api`. A neutral protocol repository can be split out later when federation needs one (ADR 0002).
- Where the old `packages/*` went: domain and protocol schemas to `can_server` (`src/domain/`, `openapi/openapi.json`); api-client generated in `can_app`; design-system and i18n in `can_app`; policy rules in `can_server` until `can_policy` exists, then packs there; testing per repository.
- Never import server secrets, persistence models, internal moderation signals, or private authorization logic into `can_app` or the client.
- Server input is validated with class-validator and trimmed; the client validates with zod. The server is always final.
- API responses that return lists use `{ items: [...] }`.
- Tooling: npm only, Node 24 LTS (`engines.node >= 24`, no `.nvmrc`). Postgres and Mailpit run through docker compose for local development (Postgres on host port 5433). Ports: API 4000, Expo web 8081, gallery 3000.

### Portable hosting (D-57)

Where CAN runs is undecided (`docs/open-questions/OQ-hosting-region.md`); GCP was an early lean, not a decision. Every service must therefore be portable to any container host. Provisioning and any provider choice stay founder-gated plan units. Requirements for each service (`can_server`, `can_gallery`, any worker, and later the policy loader):

- A **production Docker image**: multi-stage, non-root, pinned base, no dev tooling, reproducible from the repo.
- An **environment-variable contract**: every setting documented with name, type, default and whether it is a secret; the service fails at start with a clear message if a required value is missing. No provider-specific SDK is required to boot.
- **Health checks**: liveness and readiness endpoints (readiness covers the database and the loaded policy pack version).
- **Backup and restore**: a documented, tested path for Postgres and any stored object, with a restore drill in CI against a fixture (`16-security-a11y-ops-testing.md`).
- **Stateless processes** apart from Postgres and object storage; configuration only through the environment; migrations run as an explicit step.
- The policy pack is loaded by version and hash from a path or URL given in the environment, not baked in.

### Approved implementation baseline

The approved default is a universal TypeScript platform with an Expo frontend and a NestJS backend. Treat this as the implementation baseline rather than reopening the framework decision during Phase 0. The engineering team may propose a change only through an architecture decision record that demonstrates a material security, accessibility, operability, performance, licensing, or maintenance advantage and includes migration and rollback consequences.

### Frontend stack

Use one universal Expo application for iOS, Android, tablet, and web:

- Expo and React Native
- Expo Router for file-based universal routing, deep links, Android App Links, and iOS Universal Links
- React Native Web for browser delivery
- TypeScript with strict checking
- gluestack-ui as the one design-system foundation for every CAN surface, `can_app` and `can_gallery` alike (D-50, ADR 0007). Version rule: the newest stable major that supports Expo SDK 57, React 19.2 and react-native-web 0.21; if only a pre-release supports the stack, pin that exact version and log it. No fallback to React Native core
- The styling engine (NativeWind or UniWind) is whatever the pinned gluestack version requires, configured from `tokens.json`; the gluestack theme is generated, never hand-edited
- Until units 02-u24 and 02-u25 land, `can_app` runs RN-core civic wrappers (D-33), and until 06-u15 and 06-u16 land the gallery uses plain CSS
- Project-owned semantic design tokens and civic components wrapping gluestack primitives
- `expo-localization` for device locale, region, and text-direction signals
- FormatJS / `react-intl` for ICU messages, plurals, dates, numbers, units, and relative time
- `@internationalized/date` where calendar, timezone, and locale-sensitive date behavior require it
- TanStack Query for server-state fetching, caching, invalidation, and retry policy
- React Hook Form and zod for forms and client-visible validation
- Minimal local state management, with Zustand permitted only for bounded client state that is not authoritative server data

Within `can_app`, share i18n messages, design tokens, the generated API client and most feature components across platforms. Platform-specific files such as `.web.tsx`, `.native.tsx`, `.ios.tsx`, and `.android.tsx` are permitted when required for accessibility, navigation, native capabilities, large desktop workspaces, or platform conventions. One codebase does not require an identical layout or interaction model on every device.

Feature code should import project-owned components such as `CivicButton`, `EvidenceRecord`, `ProblemStatus`, `InstitutionRole`, `BlockerTimeline`, `StewardshipPanel`, and `ProposalComparison`, rather than importing gluestack components directly. Pin component and styling versions, retain copied component source in the repository, and maintain visual, accessibility, RTL, and cross-platform regression tests.

**Verification stance (D-8, ADR 0005):** in slice 1 the app is verified on **Expo web only**. Native builds must still bundle (`expo export -p ios` and `-p android`). Native session paths and device smoke tests are founder-gated. Before the component foundation is considered production-approved, the reference prototype must also pass on iOS, Android, mobile web and desktop web in representative LTR and RTL languages, covering forms, tables, timelines, dialogs, drawers, menus, selects, action sheets, mixed-direction content, keyboard navigation, screen readers, large text, reduced motion and low-end Android performance. If gluestack fails the agreed thresholds, keep the Expo architecture and replace only the component layer (reversal path in ADR 0007).

**Gallery:** `can_gallery` uses the same gluestack-ui foundation and the same tokens. It stays a fully static export (`output: 'export'`) with no runtime third-party fetch, no tracking and the Phase 0A rules unchanged; the added client JavaScript is held to an explicit budget (06-u16, 06-u09).

### Backend stack

Use a Node.js and TypeScript modular monolith built with NestJS. NestJS should provide the application composition, dependency injection, transport adapters, validation boundary, authentication integration, authorization guards, background-job entry points, and operational health surfaces. Domain rules must remain in framework-light modules that can be tested without starting NestJS.

Backend defaults:

- NestJS on Node.js 24 LTS
- PostgreSQL as the primary relational database
- Drizzle (0.45.x) as the typed query layer, decided (D-4). Domain logic must stay ORM-free behind repository interfaces, so a change of ORM never touches the domain
- PostgreSQL full-text search for the initial release; add a separate search engine only after measured requirements justify it
- No object storage in slice 1: evidence is URL references only. Keep an S3-compatible storage interface for later permitted files
- A background-job abstraction, with Redis and BullMQ or an equivalent introduced only when durable asynchronous work, retries, or scheduled processing require it
- REST and an OpenAPI contract as the initial public API style. The contract is code-first (`@nestjs/swagger`) and owned by `can_server`
- A generated TypeScript API client in `can_app` (and in approved integrations)
- Server-Sent Events or WebSockets only for workflows that demonstrably require live updates
- OpenTelemetry-compatible logs, metrics, and traces
- Containerized local and deployment environments (docker compose for Postgres and Mailpit locally; portable production images per the section above)

The backend remains authoritative for authentication, authorization, lifecycle transitions, moderation status, evidence visibility, stewardship permissions, responsibility attribution, commitment status, audit events, and every consequential mutation. The client may provide optimistic presentation only where rollback is safe and the server remains final.

### Architecture style

The initial architecture must remain a modular monolith with clear domain boundaries, a relational database, optional background jobs, object storage, and replaceable AI providers. Justify any move to microservices with measured scaling, isolation, regulatory, team-ownership, or availability requirements. Federation is a later protocol and deployment capability, not a reason to begin with distributed microservices.

### API principles

- Version externally consumed APIs.
- Validate all inputs on the server.
- Use idempotency for retryable mutations.
- Use pagination and bounded queries.
- Enforce authorization at the data access boundary.
- Record audit events for consequential actions.
- Return stable machine-readable error codes and user-safe messages.
- Generate and validate an API contract where practical.

