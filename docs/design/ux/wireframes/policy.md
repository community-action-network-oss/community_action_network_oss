# Wireframes: policy proposals and simulation reports

People legislate by proposing changes to the policy pack (a PR to `can_policy`). Every proposal goes through automated tests, a replay diff over past decisions, ratification, and staged rollout (`docs/design/ai/amendment-loop.md`). Anyone signed in may propose. Maintainers see the simulation report.

## WF-POLICY-1  Policy proposal form (schema form)
Renders WF-FORM-1 from the policy proposal schema. It is structured like every other type.
```
+--------------------------------------+
| {policy.new.title} Propose a policy  |
| change                               |
| {policy.new.body}                    |
| Section 1 of 4: What changes         |
|  Rule ids touched, decision points   |
|  affected, the change in one sentence|
| Section 2: Why                       |
|  Motivating examples (masked links   |
|  to audit or appeal findings)        |
|  Facts, assumed causes (WF-FORM-4)   |
| Section 3: Who is affected           |
|  Jurisdictions, content types        |
| Section 4: Lawful basis and risks    |
|  Which law or rule, what could go    |
|  wrong, what is uncertain            |
| [ Suggest an answer ] per field      |
| [ Save draft ]       [ Submit ]      |
+--------------------------------------+
```
Protected-core changes are refused with the reason shown (constitution I.2).

## WF-POLICY-2  Policy proposal view
Route `/policy/{id}`. Read by anyone; ratification actions only for panel members.
```
+----------------------------------------------+
| {policy.title} Policy proposal               |
| {policy.stage} Stage: Replay                 |
| Proposal summary (fields from the form)      |
|----------------------------------------------|
| {policy.eval.title} Automated test results   |
|  Harmful-class recall      {policy.eval.pass}|
|  False-reject rate         {policy.eval.pass}|
|  Injection suite           {policy.eval.fail}|
|  Per-jurisdiction parity   {policy.eval.pass}|
|----------------------------------------------|
| {policy.replay.title} Replay over past       |
| decisions                                    |
|  {policy.replay.body} 14 of 400 would change |
|  {policy.replay.expected} 11 expected        |
|  {policy.replay.unexpected} 3 unexpected     |
|  Stricter 9, more permissive 5               |
|  Examples (masked): {policy.replay.masked}   |
|----------------------------------------------|
| {policy.ratify.title} Ratification           |
|  {policy.ratify.panel}                       |
|  {policy.ratify.status} Waiting for the panel|
|  {policy.ratify.transitional}                |
|  {policy.ratify.dissent}                     |
| Rollout: shadow, canary, full (stage list)   |
+----------------------------------------------+
```
Results show as text with an icon (Passed, Did not pass), never colour alone, never red for a failed test of a proposal. A failed gate shows "Did not pass. This blocks the change." Rollout stages and the version number are shown with dates. While founder stewardship approves the pack the badge `status.transitional` appears.

## WF-SIM-1  Simulation run report (maintainers)
Route `/policy/simulations/{id}`. Maintainers only (`common.notPermitted.body`, role maintainer). Persona agents run against the real pipeline with synthetic content (D-55).
```
+----------------------------------------------+
| {sim.title} Simulation runs                  |
| {sim.body} Personas, not real people.        |
| Run id, policy version, model: recorded      |
|  responses  {sim.live.gated}                 |
|----------------------------------------------|
| Persona runs                                 |
|  {sim.persona} submitter         120 runs    |
|  {sim.persona} appellant          40 runs    |
|  {sim.persona} adversarial        60 runs    |
|----------------------------------------------|
| Metrics (this run, previous run)             |
|  {sim.metric.flip}            4 %   6 %      |
|  {sim.metric.falseReject}     2 %   3 %      |
|  {sim.metric.overturn}        8 %   9 %      |
|  {sim.metric.injection}     100 % 100 %      |
|  {sim.metric.cost}          0.4   0.5        |
|  (synthetic example values)                  |
|----------------------------------------------|
| {sim.graduation.title} Progress toward       |
| opening public participation                 |
|  Criterion 1  {sim.graduation.met} Met       |
|  Criterion 2  {sim.graduation.notMet} Not yet|
|  Findings that became policy proposals: link |
+----------------------------------------------+
```
Graduation criteria are listed with their thresholds from the plan; the page states met or not met in text and never ranks personas. Numbers in the wireframe are illustrative.
