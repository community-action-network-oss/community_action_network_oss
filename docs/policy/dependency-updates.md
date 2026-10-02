# Dependency update policy

How dependencies change in the four CAN repositories (`can_server`, `can_app`, `can_gallery`, `can_policy`), so that pinned decisions are not undone by drive-by bumps and every update is reviewable. Binding decisions are in `DECISIONS.md`; this file does not reopen them.

## Snapshot (2026-10-02)

Read from each `package.json` on this date. If a row and the file disagree, the file wins; fix the row in the same pull request.

| Repo | Pinned major or exact version | Why |
| --- | --- | --- |
| all | npm, `engines.node` `>=24`, no `.nvmrc` | D-5 |
| `can_server` | NestJS 12 (`^12.0.1`), TypeScript 6 (`^6.0.2`), Drizzle ORM 0.45 (`^0.45.3`), Vitest 4, oxlint 1, Node types 24 | D-6: Nest 12 defaults are ESM, Vitest and oxlint, not Jest and ESLint |
| `can_app` | Expo SDK 57 (`~57.0.26`), React Native 0.86.3, React 19.2.3, TypeScript `~6.0.3`, ESLint 9 (`^9.39.5`), Jest 29 (`~29.7.0`, tied to jest-expo 57) | D-7, D-33: Expo SDK sets the React Native and React versions |
| `can_app` | gluestack core 5.0.15 and utils 5.0.6 (exact), UniWind 1.12.1 (exact), Tailwind CSS 4.3.3 (exact); `gluestack-ui` CLI labels itself v5 alpha | D-7: gluestack v5 runs on UniWind, which needs Tailwind 4. Exact because v5 is alpha |
| `can_gallery` | Next 16 (`16.3.8`, exact), React 19.2.8, gluestack CLI 3.0.12, core 3.0.25, NativeWind 4.2.7, Tailwind CSS 3.4.19, react-native-web 0.21.2, ESLint 9, TypeScript 5 | Gluestack v5 has no Next.js support, so the gallery stays on gluestack v3 with NativeWind and Tailwind 3. Moving to v5 is a major bump (see below) |
| `can_policy` | `ajv` 8.20.0 and `yaml` 2.9.1 (exact), no dev dependencies | Smallest possible runtime surface for a policy pack tool |
| `can_server` | No YAML library; a hand-written YAML subset parser | A new dependency was avoided on purpose (see the new dependency rule) |

Notes for people updating:

- The gluestack CLI writes a `.npmrc` containing `legacy-peer-deps`. Delete it. A committed `.npmrc` that hides peer conflicts is a defect, not a fix.
- `can_app` carries an npm `overrides` entry so `eslint-plugin-react-native-a11y` accepts ESLint 9. Do not remove it without re-running lint.
- Version ranges are not the policy. Exact pins in the table mean "do not bump without the major-bump process", even though the bump is minor on paper.

## Cadence

- **Routine updates: monthly**, in the same rhythm as the monthly release or status report in `docs/spec/21-open-source-governance.md`. One maintainer or contributor opens the batch; it is reviewed like any other change.
- Patch and minor bumps inside an existing range are routine. Anything that changes an exact pin, or crosses a major, is a major bump.
- Between monthly windows, only security advisories justify an update.

## Security advisories

- Run `npm audit` in each repo weekly (a human or a scheduled CI job that only reports; it never edits or merges).
- **Critical and high advisories that reach code we ship are handled out of band**, without waiting for the monthly window. Medium and low wait for the monthly window unless a maintainer says otherwise.
- Advisories in dev-only tooling are judged on whether they can touch CI secrets or build output.
- Reports of vulnerabilities in CAN itself, or a suspected malicious package, follow `SECURITY.md`: private, human-verified, no public issue first. Do not paste secrets or private evidence into hosted AI services while investigating.
- A fix that needs a pinned major to move still needs the major-bump process, shortened: the issue with a plan can be written after the emergency fix, within a week.

## Major bumps

A major bump, or any change to an exact pin in the snapshot, needs one of:

- an ADR (when it changes architecture, for example moving the gallery to gluestack v5), or
- an issue with a plan: what changes, what breaks, how it is verified, how it is rolled back.

Pins that came from a decision (D-5, D-6, D-7, D-33) change only by a new decision that says so. A pull request cannot quietly supersede them. Expo SDK moves are one bump: use the Expo SDK upgrade path and move `expo-*`, React Native and React together, never one by one.

## Lockfiles

`package-lock.json` is always committed and always changes in the same pull request as `package.json`. Use `npm ci` in CI and in verification. Review the lockfile diff for packages you did not ask for. Contributors and agents never run `npm update` as a casual fix; run an explicit `npm install <package>@<version>` for the one thing being changed.

## New dependency rule

Before adding a package, the pull request description must answer:

1. **Why:** what need does it meet, and why not the standard library, the platform, or code we already have? Prefer standard library. The server's YAML subset parser and the policy tool's small footprint are the model.
2. **License:** it must be compatible with the MIT license (D-49). No copyleft that would bind users of CAN, no "source available" or non-commercial terms. State the license in the pull request.
3. **Weight and health:** size, maintenance activity, transitive dependencies, and whether it runs install scripts.
4. **Where it runs:** the gallery is a static, read-only public site. It ships no third-party runtime code beyond what the pages need to render, and no analytics, trackers or remote scripts. Adding any runtime dependency to `can_gallery` needs a maintainer to confirm that.
5. **Pinning:** pin exact for alpha or fast-moving packages and for anything the table lists as exact; otherwise use the repo's existing range style.

## Grouping

One concern per pull request: one security fix, one framework bump, or one monthly batch of routine patch and minor updates within a single repo. Do not mix dependency changes with feature work. Do not touch two repos' dependencies in one pull request. A submodule pointer bump in the superproject is its own commit.

## AI-generated dependency changes

Per `docs/spec/22-ai-contribution-policy.md`, generated dependency changes get explicit human review of intent, licensing, lockfile contents and deletion or migration consequences. Passing CI is necessary, not sufficient. Unexplained dependencies are a prohibited behavior; an agent or contributor must be able to say why each added package exists. A second model reviewing the output is not human review.

## No auto-merge

No bot and no person merges a dependency change automatically or without review. This covers Dependabot, Renovate, scheduled workflows and maintainers merging their own work unseen. Bots may open pull requests only if the founder enables them (below); every such pull request goes through the same review as a human one.

## Who approves

Maintainers approve dependency pull requests. Security fixes and major bumps want a second maintainer where more than one exists (docs/spec/21: major technical changes are approved by multiple maintainers). While the founder is the only maintainer (founder stewardship, transitional), the founder approves and records the reason in the pull request.

## Rollback

Every dependency pull request is revertable as one commit: it contains the `package.json` and lockfile change and nothing else. To roll back, revert the commit and run `npm ci`. If the update already shipped or ran a migration, say so in the revert pull request. For a bad advisory fix, revert first, then redo the work with a plan.

## Left to the founder

Dependabot or Renovate configuration is an option now that the repositories are on GitHub. This policy does not add config files. If enabled, use grouped monthly schedules, security updates only for critical and high, no auto-merge, and ignore rules that mirror the exact pins in the snapshot so bots do not propose bumps the major-bump process has not approved.
