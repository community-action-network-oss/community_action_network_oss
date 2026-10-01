---
id: "10-u38"
plan: "10"
title: "Policy proposal form on the schema renderer (WF-POLICY-1)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 38
depends_on: ["10-u32","10-u05","10-u12"]
writes: ["src/features/policy/**","app/policy/**","src/i18n/en.json","__tests__/policy/**","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/policy.md#WF-POLICY-1","docs/design/ux/wireframes/forms.md#WF-FORM-1","docs/design/ai/amendment-loop.md","docs/design/ai/structured-content.md"]
verify: ["npm run gen:api","npm run verify"]
founder_gate: false
defaults: "Route `/policy/new`; the form is the `policy_proposal` schema, nothing hard-coded. Show the protected-core refusal text returned by the server."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Anyone signed in can propose a policy change through a structured form that follows WF-POLICY-1: what changes, why, who is affected, lawful basis and risks.

## Steps
1. Route and nav entry (signed-in only, copy from the copy deck ids `policy.new.title`, `policy.new.body`); render with `SchemaForm` and `useContentSchema("policy_proposal")`; assist and hints reuse 10-u36 when present, otherwise absent without error.
2. Submit to `POST /v1/policy-proposals`; on success go to the proposal view route (10-u39); on 422 `protected_core` show the reason beside the rule ids field.
3. Tests: renders from schema, protected-core refusal shown, per-account cap message, a11y and RTL.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-POLICY-1.
- The form renders only from the policy_proposal schema (grep test).
- The protected-core refusal is shown with its reason (test).
- `npm run verify` is green on web.

## Out of scope
- The proposal view (10-u39).
- Opening a GitHub PR.
