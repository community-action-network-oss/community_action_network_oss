## 14. Technical architecture requirements

### Approved implementation baseline

The approved default is a universal TypeScript platform with an Expo frontend and a NestJS backend. Treat this as the implementation baseline rather than reopening the framework decision during Phase 0. The engineering team may propose a change only through an architecture decision record that demonstrates a material security, accessibility, operability, performance, licensing, or maintenance advantage and includes migration and rollback consequences.

### Frontend stack

Use one universal Expo application for iOS, Android, tablet, and web:

- Expo and React Native
- Expo Router for file-based universal routing, deep links, Android App Links, and iOS Universal Links
- React Native Web for browser delivery
- TypeScript with strict checking
- gluestack UI v5 as the leading universal component foundation
- NativeWind v5 as the default styling engine
- Project-owned semantic design tokens and civic components wrapping gluestack primitives
- `expo-localization` for device locale, region, and text-direction signals
- FormatJS / `react-intl` for ICU messages, plurals, dates, numbers, units, and relative time
- `@internationalized/date` where calendar, timezone, and locale-sensitive date behavior require it
- TanStack Query for server-state fetching, caching, invalidation, and retry policy
- React Hook Form and Zod for forms and client-visible validation
- Minimal local state management, with Zustand permitted only for bounded client state that is not authoritative server data

The project should share domain vocabulary, protocol schemas, API clients, validation contracts, i18n messages, design tokens, and most feature components across platforms. Platform-specific files such as `.web.tsx`, `.native.tsx`, `.ios.tsx`, and `.android.tsx` are permitted when required for accessibility, navigation, native capabilities, large desktop workspaces, or platform conventions. One codebase does not require an identical layout or interaction model on every device.

Feature code should import project-owned components such as `CivicButton`, `EvidenceRecord`, `ProblemStatus`, `InstitutionRole`, `BlockerTimeline`, `StewardshipPanel`, and `ProposalComparison`, rather than importing gluestack components directly. Pin component and styling versions, retain copied component source in the repository, and maintain visual, accessibility, RTL, and cross-platform regression tests.

Before the component foundation is considered production-approved, the reference prototype must pass on iOS, Android, mobile web, and desktop web in representative LTR and RTL languages. Test forms, tables, timelines, dialogs, drawers, menus, selects, action sheets, mixed-direction content, keyboard navigation, screen readers, large text, reduced motion, and low-end Android performance. If gluestack fails the agreed acceptance thresholds, keep the Expo architecture and replace only the component layer.

### Backend stack

Use a Node.js and TypeScript modular monolith built with NestJS. NestJS should provide the application composition, dependency injection, transport adapters, validation boundary, authentication integration, authorization guards, background-job entry points, and operational health surfaces. Domain rules must remain in framework-light modules that can be tested without starting NestJS.

Backend defaults:

- NestJS on the current approved Node.js long-term-support release
- PostgreSQL as the primary relational database
- An ORM or typed query layer selected through a narrow architecture decision after testing migrations, transactions, complex reporting queries, row-level authorization patterns, and operational support; domain logic must not depend directly on ORM-specific models
- PostgreSQL full-text search for the initial release; add a separate search engine only after measured requirements justify it
- S3-compatible object storage for permitted files and evidence artifacts
- A background-job abstraction, with Redis and BullMQ or an equivalent introduced only when durable asynchronous work, retries, or scheduled processing require it
- REST and an OpenAPI contract as the initial public API style
- Generated TypeScript API clients for the Expo application and approved integrations
- Server-Sent Events or WebSockets only for workflows that demonstrably require live updates
- OpenTelemetry-compatible logs, metrics, and traces
- Containerized local and deployment environments

The backend remains authoritative for authentication, authorization, lifecycle transitions, moderation status, evidence visibility, stewardship permissions, responsibility attribution, commitment status, audit events, and every consequential mutation. The client may provide optimistic presentation only where rollback is safe and the server remains final.

### Repository structure

Prefer a monorepo with explicit boundaries:

```
apps/
  platform/             Expo Router application for iOS, Android, and web
services/
  api/                  NestJS modular monolith
  workers/              Optional separately deployed job runners using shared backend modules
packages/
  domain/               Framework-light domain rules and state machines
  protocol/             Versioned public schemas and identifiers
  api-client/           Generated and wrapped API client
  design-system/        Tokens and universal civic components
  i18n/                 Messages, locale metadata, and formatting utilities
  policy/               Machine-readable constitutional and jurisdiction policy schemas
  validation/           Shared input and output schemas where safe
  testing/              Fixtures, conformance suites, and adversarial cases
```

Do not import server secrets, persistence models, internal moderation signals, or private authorization logic into shared client packages.

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

