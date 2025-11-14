# Opticum Implementation Blueprint (Spec 2025-02)

## Context & Objectives
- Opticum delivers dual interfaces (Customer + Admin) built on Next.js 14 App Router, maintained as two standalone apps (`./apps/customer`, `./apps/admin`) with strict TypeScript, Tailwind CSS, ESLint, and Prettier (`docs/specs/spec.md` §§1–3, 6).
- Client-side state must be coordinated via Redux Toolkit stores + slices in each app to keep mock auth, applications, and operations synchronized.
- No backend exists; all flows must rely on mock infrastructure: fake API client, local persistence, seed data, simulated latency, and optional route handlers (`spec.md` §§2, 3, 7).
- Customer journeys include onboarding, loan discovery, calculator, multi-step applications, status tracking, repayment simulation, and support/ticketing (`spec.md` §4).
- Admin workflows span dashboards, RBAC, KYC/KYB, underwriting, collections, compliance, finance/operations, and product configuration, all sharing the fake backend (`spec.md` §5).
- Delivery must be incremental, test-driven, and wired at each step—no orphaned UI/logic, strong developer tooling, deterministic seeds, and documentation for future backend integration (`spec.md` §§3, 7, 8).

## 1. Blueprint Overview (Tracks & Focus Areas)

### Track A — Workspace Foundations & Governance (Spec §§3.1, 6)
- Establish consistent npm tooling across both standalone apps, shared configs, lint/test scripts, husky hooks, documentation, and onboarding materials.
- Provide developer tooling (Storybook optional), test harnesses (Vitest/Jest/Playwright), and CI scripts ensuring fast feedback.

### Track B — Mock Infrastructure & Domain Modeling (Spec §§3.2, 7)
- Define domain models (users, products, loans, applications, tickets), seed data, local persistence helpers, Redux stores/slices, fake API client, simulated latency, reset tools, and diagnostics.

### Track C — Customer Experience & Loan Lifecycle (Spec §4)
- Implement borrower authentication mock, onboarding wizard, dashboards, product discovery, calculators, application flows, status tracking, repayment simulation, and support center.

### Track D — Admin Operations & RBAC (Spec §5)
- Deliver admin shell, RBAC guard, dashboards, customer management, KYC review, underwriting pipelines, collections tooling, compliance auditing, finance/operations surfaces, and product configuration.

### Track E — Shared Experience, Observability & Developer Utilities (Spec §§3, 7)
- Provide shared UI component library, design tokens, logging/analytics hooks, developer inspector/reset views, test data visibility, and instrumentation for fake API calls.

### Track F — Integration Readiness & Hardening (Spec §§3.5, 8)
- Abstract fake API behind interfaces, add adapter toggles, document backend expectations, produce demo scripts, regression suites, and smoke/end-to-end coverage to ease backend swap.

## 2. Incremental Delivery Plan (Milestones)

**Milestone M0 — Planning, Workspace & Tooling (Track A)**  
Goal: Codify architecture decisions, scaffold both standalone apps, align shared configs, lint/test/format scripts, CI skeleton, and developer docs.  
Scope highlights: Dual Next.js bootstraps (`./apps/customer`, `./apps/admin`), shared tsconfig/eslint/prettier guidance, husky hooks, README/ADR seeds, Storybook/Testing Library scaffolds.  
Exit criteria: `npm run lint`, `npm test`, `npm run typecheck` succeed within each app’s CI workflow; developers understand repo layout via docs.

**Milestone M1 — Mock Infrastructure Backbone (Track B/E)**  
Goal: Provide domain contracts, seed data, local persistence, fake API client, simulated latency, reset/inspector utilities.  
Scope highlights: Type definitions, data fixtures, `localPersist` helper, fake API modules with CRUD/state transitions, developer tooling UI.  
Exit criteria: Unit/integration tests cover persistence + API flows; developer reset/instrumentation works inside both apps.

**Milestone M2 — Customer Foundations (Track C)**  
Goal: Implement mock auth, onboarding wizard, dashboard shell, design system, shared UI kit, and navigation for customer app.  
Scope highlights: Role picker, onboarding steps (phone, ID, profile), dashboard metrics, responsive layouts, design tokens, component tests.  
Exit criteria: Customer skeleton renders with jest/RTL tests; onboarding state persists through fake API/local storage.

**Milestone M3 — Customer Lending Workflow Completion (Track C)**  
Goal: Ship product discovery, calculator, application wizard, loan tracking timeline, repayment simulation, support center, and ticketing.  
Scope highlights: Filtering, validation, autosave drafts, repayment actions, timeline statuses, support ticket CRUD, integration tests.  
Exit criteria: Customer happy-path from onboarding → application → approval/disbursement → repayment runs with automated tests.

**Milestone M4 — Admin Foundations & RBAC (Track D/E)**  
Goal: Build admin shell, RBAC guard, dashboards, shared admin components (tables, kanban, activity feeds), and cross-app navigation parity.  
Scope highlights: Admin layout, metric cards, permission mapping, route guards, session persistence, component tests.  
Exit criteria: Admin dashboard loads per role; unauthorized routes redirect; tests verify guard logic.

**Milestone M5 — Admin Operational Modules (Track D)**  
Goal: Deliver KYC review queues, underwriting pipelines, collections tooling, compliance/audit views, finance dashboards, and product configuration management.  
Scope highlights: Workflow boards, approval actions, note taking, contact logging, audit log filtering, settlement/finance screens, config forms.  
Exit criteria: Admin staff can progress loans through lifecycle and update products; tests cover each module’s state transitions.

**Milestone M6 — Integration Readiness & Hardening (Track F/E)**  
Goal: Abstract fake API, add adapter toggles, create documentation/demos, add Playwright/Cypress flows, finalize reset tools, and ensure no orphaned code.  
Scope highlights: Interface wrappers, adapter injection, OpenAPI-style docs, environment controls, smoke scripts, release checklist.  
Exit criteria: Running backend swap stub only requires adapter config; e2e tests cover end-to-end customer/admin scenarios; docs articulate readiness.

## 3. Step Breakdown — Iteration 1 (Coarse)
- `S1` (M0) — Workspace bootstrap, tooling, CI, and governance docs.
- `S2` (M1) — Domain modeling, seeds, persistence utilities, fake API scaffolds.
- `S3` (M1) — Developer inspector/reset features, latency simulation, instrumentation.
- `S4` (M2) — Customer shell: design system, navigation, mock auth, onboarding, dashboard.
- `S5` (M3) — Customer lending: discovery, calculator, applications, tracking, repayment, support.
- `S6` (M4) — Admin shell: layout, dashboards, RBAC guard, shared components.
- `S7` (M5) — Admin modules: KYC, underwriting, collections, compliance, finance, product config.
- `S8` (M6) — Integration readiness: API abstraction, adapters, documentation, e2e/regression.

## 4. Step Breakdown — Iteration 2 (Right-Sized Tasks)

### M0 — Planning, Workspace & Tooling
- `M0.1` Record architecture decisions, glossary, and contribution guidelines referencing `docs/specs/spec.md`.
- `M0.2` Bootstrap `./apps/customer` and `./apps/admin` as separate Next.js 14 TypeScript apps with aligned npm scripts (`dev`, `build`, `lint`, `test`, `typecheck`).
- `M0.3` Configure husky, lint-staged, commitlint, GitHub Actions (or equivalent) to run lint/test/typecheck plus caching for each app.
- `M0.4` Author developer setup docs, CI badge info, and sample Storybook/test harness instructions to validate both component pipelines.

### M1 — Mock Infrastructure Backbone
- `M1.1` Define TypeScript types/interfaces for users, products, applications, loans, tickets, audit logs.
- `M1.2` Create seed data modules and deterministic fixture loader with snapshot/unit tests.
- `M1.3` Implement `localPersist` helper handling browser/server contexts, hydration, schema migrations, and tests.
- `M1.4` Build fake API client with CRUD + state transitions (approve, decline, disburse, repay, ticket reply) plus latency simulation and dev reset tools (UI + CLI).
- `M1.5` Stand up Redux Toolkit store configuration and initial slices (auth/session, loans/applications, support) for both apps, with selectors/tests.

### M2 — Customer Foundations
- `M2.1` Establish design tokens, typography scale, spacing, and global styles shared between apps.
- `M2.2` Implement shared component kit (buttons, cards, tables, status pills) with Storybook stories/tests.
- `M2.3` Create customer layout (navigation, dashboard shell), integrate mock role picker authentication, and persist session state.
- `M2.4` Build onboarding wizard (phone verification stub, ID upload mock, profile data) with autosave across steps and tests verifying flow.

### M3 — Customer Lending Workflow Completion
- `M3.1` Develop product discovery list, filtering, and detail panels with calculator hook and unit tests.
- `M3.2` Implement multi-step loan application wizard with validation, autosave drafts, and fake API submission integration tests.
- `M3.3` Render loan tracking timeline, underwriting status views, and notifications triggered by fake API state changes.
- `M3.4` Add repayment simulation, schedule visualization, pay action with optimistic updates, and support/ticket center CRUD flows.

### M4 — Admin Foundations & RBAC
- `M4.1` Build admin layout with sidebar/header, responsive panels, and shared metrics components.
- `M4.2` Map internal roles (Support, Compliance, Credit, Collections, Operations, SuperAdmin) to routes/permissions; implement guards + tests.
- `M4.3` Create admin dashboard summarizing portfolio metrics fed by fake API plus trend charts and alerts.
- `M4.4` Provide reusable admin components (kanban board, detail drawer, timeline) with accessibility-focused tests.

### M5 — Admin Operational Modules
- `M5.1` Deliver KYC/KYB review queue with approve/decline flows, document previews, and audit logs.
- `M5.2` Implement underwriting pipeline board, notes, decision actions, and integration with loan statuses.
- `M5.3` Build collections workspace (overdue queue, contact logging, promise-to-pay) and compliance/audit log browser.
- `M5.4` Add finance/operations dashboard (reconciliation, settlement simulation) plus product configuration forms impacting fake API seeds.

### M6 — Integration Readiness & Hardening
- `M6.1` Abstract fake API behind interface/adapters with environment toggles.
- `M6.2` Document backend expectations, OpenAPI-ready contracts, and integration checklist.
- `M6.3` Build Playwright/Cypress flows covering customer + admin golden paths, plus smoke/regression scripts.
- `M6.4` Finalize developer tools (state inspector, reset controls in UI), release notes, and demo scripts.

## 5. Step Breakdown — Iteration 3 (Validation & Coverage)
- Each milestone closes loops before advancing (e.g., onboarding data flows into lending flows, admin pipelines operate on same states, finance/product updates propagate back to fake API seeds).
- Shared UI + mock infrastructure (M1–M2) precede feature work to avoid rework and guarantee consistent design/accessibility.
- Tests accompany every artifact: unit (types/helpers), component (UI kit), integration (fake API + flows), and e2e (final milestone) for stable regression safety.
- Developer tooling (reset, inspector, docs) ensures safe iteration and easy demonstration, aligning with spec’s emphasis on mock reliability.

## 6. LLM Prompt Series (Sequential, Integrated)

### Prompt 01 — Workspace Bootstrap & Planning
```text
Goal: Initialize the twin Next.js apps, shared configs, and planning docs.
Context: Repository is empty; spec mandates two standalone client apps with consistent tooling.
Tasks:
1) Scaffold `./apps/customer` and `./apps/admin` via `npx create-next-app@latest --ts --tailwind`, ensuring npm scripts for dev/build/lint/test/typecheck remain aligned.
2) Create shared root assets: `.editorconfig`, `.gitignore`, base README, ADR/glossary stubs referencing docs/specs/spec.md, plus guidance on how the two apps stay in sync (tsconfig/eslint/prettier copies or templates).
3) Add placeholder pages and a lightweight smoke test in each app to ensure `npm test` exercises the default routes end-to-end.
Acceptance:
- Running `npm install && npm test` inside both `./apps/customer` and `./apps/admin` succeeds and hits each placeholder page.
- README documents architecture overview (dual-app layout) and next steps.
Outcome:
- _Completed (workspace restructured under `apps/` with Tailwind create-next-app scaffolds)_
```

### Prompt 02 — Tooling, CI, and Developer Workflow
```text
Goal: Configure linting, formatting, husky hooks, and CI automation.
Context: Workspace exists without enforced standards.
Tasks:
1) Wire ESLint (Next.js + accessibility), Prettier, lint-staged, commitlint, and husky pre-commit/pre-push hooks running lint/test/typecheck.
2) Add GitHub Actions (or similar) workflow executing install, lint, test, typecheck, and caching node_modules/.next artifacts.
3) Document contributing guide with coding standards, testing strategy, and CI badge references.
Acceptance:
- Hooks block lint/test failures; CI pipeline green.
- CONTRIBUTING.md/README describe workflow and verification commands.
Outcome:
- _Pending_
```

### Prompt 03 — Shared Design System & UI Shells
```text
Goal: Establish global styles, design tokens, shared components, and baseline layouts.
Context: Tooling ready; need consistent UI scaffolding.
Tasks:
1) Implement theme files (colors, typography, spacing), CSS reset, and global styles consumed by both apps.
2) Build shared components (Button, Card, Table, Badge, Layout shell) with Storybook stories and RTL tests.
3) Create responsive navigation shells (sidebar/header) for customer and admin apps, ensuring SSR compatibility and linking to placeholder routes.
Acceptance:
- Storybook/test suite passes; components documented.
- Both apps render shells without errors and share design tokens.
Outcome:
- _Pending_
```

### Prompt 04 — Mock Authentication & Session Handling
```text
Goal: Provide role picker authentication, session persistence, and route guards.
Context: UI shells exist, but access control is missing.
Tasks:
1) Implement auth context storing selected role/user in local storage via localPersist helper.
2) Build role picker modal with Customer/Admin role groups and session switcher.
3) Add route guards/hooks for both apps, redirecting unauthorized users and surfacing current role in the UI chrome.
Acceptance:
- Tests cover login/logout, persistence, and guard redirects.
- Role switching updates both apps’ navigation and data scopes.
Outcome:
- _Pending_
```

### Prompt 05 — Domain Models, Seeds, Persistence, and State Store
```text
Goal: Codify domain types, seed data, Redux store, and local persistence helper.
Context: Auth exists; need data backbone.
Tasks:
1) Define TypeScript types/interfaces for users, products, loans, applications, tickets, audit logs.
2) Create deterministic seed data modules with fixtures covering multiple borrowers, loan stages, and admin roles.
3) Implement `localPersist` helper handling serialization, schema versioning, SSR-safe guards, and hydration tests.
4) Configure Redux Toolkit store in each app (shared pattern) plus foundational slices (auth/session, onboarding, loans) wired to fake API thunks.
Acceptance:
- Type/unit tests validate interfaces, persistence helper behavior, and slice reducers/selectors.
- Seeds load without mutation across reloads; store initializes with seed-backed defaults.
Outcome:
- _Pending_
```

### Prompt 06 — Fake API Client & Developer Utilities
```text
Goal: Provide async fake API with latency, CRUD, state transitions, and tooling.
Context: Domain data exists but no API abstraction.
Tasks:
1) Build fakeApi module offering CRUD for users/products/applications/loans/tickets plus actions (approve, decline, disburse, repay, log contact).
2) Simulate latency/promises, include optimistic update helpers, and expose hooks for both apps.
3) Create developer inspector/reset UI (within a dev-only route) and CLI scripts to reset seeds; add tests using fake timers.
Acceptance:
- Tests cover CRUD/state transitions, latency, reset semantics.
- Developer UI toggles data and surfaces latency injection controls.
Outcome:
- _Pending_
```

### Prompt 07 — Customer Onboarding & Dashboard
```text
Goal: Implement onboarding wizard and dashboard surfaces powered by fake API.
Context: Infrastructure ready; customer flows need functionality.
Tasks:
1) Build multi-step onboarding (contact info, verification stubs, profile) with autosave and progress indicators.
2) Update dashboard to show onboarding completion, recommended products, and recent activity using shared components.
3) Add tests verifying multi-step progression, error states, and dashboard loading skeletons.
Acceptance:
- Onboarding data persists between steps/page reloads.
- Dashboard reflects onboarding status and displays seeded recommendations.
Outcome:
- _Pending_
```

### Prompt 08 — Loan Discovery, Calculator, and Application Wizard
```text
Goal: Deliver discovery tools and the main loan application experience.
Context: Onboarding done; need lending workflow core.
Tasks:
1) Implement product discovery list with filters/search + detail modals referencing fake API products.
2) Build loan calculator with real-time payment schedule outputs and validations tied to product constraints.
3) Create multi-step application wizard (eligibility, financials, documents, review) with validation, autosave drafts, and submission to fake API.
Acceptance:
- Integration tests cover submission success/failure, validation errors, and autosave.
- Calculator outputs match expected amortization logic for sample data.
Outcome:
- _Pending_
```

### Prompt 09 — Loan Tracking, Repayment Simulation, and Support Center
```text
Goal: Complete customer lifecycle with tracking, repayments, and support.
Context: Applications exist but post-submission flows missing.
Tasks:
1) Display loan status timeline, underwriting details, and disbursement info driven by fake API statuses.
2) Implement repayment schedule view plus “make payment” simulation updating balances and history.
3) Build support center with FAQ list and ticket CRUD integrated with fake API; show ticket status/threads.
Acceptance:
- Tests validate status transitions, repayment balance changes, and ticket persistence.
- UI handles latency states gracefully (loading/error).
Outcome:
- _Pending_
```

### Prompt 10 — Admin Shell, Dashboard, and RBAC Enforcement
```text
Goal: Provide admin experience foundation with role-aware routing.
Context: Customer flows ready; admin app needs baseline.
Tasks:
1) Implement admin dashboard metrics (portfolio summary, pipeline counts) via fake API aggregations.
2) Wire RBAC guards mapping roles to routes/components; show fallback messaging for insufficient access.
3) Build shared admin components (kanban board, detail drawer) plus tests verifying guard + component behavior.
Acceptance:
- Admin dashboard surfaces data per role; unauthorized routes redirect.
- Component/unit tests verify metrics accuracy and RBAC enforcement.
Outcome:
- _Pending_
```

### Prompt 11 — KYC, Underwriting, and Collections Modules
```text
Goal: Deliver core operational workflows for internal teams.
Context: Admin shell exists; need functional modules.
Tasks:
1) Implement KYC review queue with detail panels, document stubs, and approve/decline actions impacting borrower/application status.
2) Build underwriting pipeline (board or table) enabling notes, decisions, and transition to approval/disbursement.
3) Create collections workspace listing overdue loans, logging contacts/promise-to-pay, and reflecting updates in fake API.
Acceptance:
- Tests cover queue state changes, note persistence, and collection logs.
- Loan status updates propagate between customer/admin apps.
Outcome:
- _Pending_
```

### Prompt 12 — Compliance, Finance, Product Configuration, and Observability
```text
Goal: Round out admin tooling with compliance/finance + finalize shared utilities.
Context: Core modules live; remaining surfaces + observability needed.
Tasks:
1) Implement compliance hub (AML alerts, audit logs) with filtering, export stubs, and role-specific permissions.
2) Add finance/operations dashboard (reconciliation mock, settlement simulator) plus product configuration forms updating fake API seeds with validation.
3) Enhance observability/developer tooling: log viewers, performance overlay, Playwright smoke tests covering customer/admin golden paths, and adapter abstraction for backend readiness.
Acceptance:
- Compliance/finance/product flows read/write data successfully with tests.
- Playwright/Cypress suites pass and run via CI; adapter interface toggles between fake API and stub real API.
Outcome:
- _Pending_
```

### Prompt 13 — Integration Readiness & Final Hardening
```text
Goal: Ensure backend swap readiness, documentation, and demos.
Context: Features complete; need abstraction + docs.
Tasks:
1) Formalize API interface package, add adapter toggles/env config, and document expected backend endpoints/OpenAPI outline.
2) Expand developer tools (reset controls, inspector) with documentation + demo scripts referencing workflows.
3) Run full regression: unit/component/integration/e2e; capture artifacts, update release notes, and describe future backend handoff steps.
Acceptance:
- Switching adapters (fake vs placeholder real) requires config change only.
- Documentation details backend expectations, data contracts, and developer tooling usage.
- Regression report stored in docs with pass results.
Outcome:
- _Pending_
```

## 7. Second-Pass Spec Review Notes
- Re-reviewed `docs/specs/spec.md` §§1–7 after drafting prompts to confirm coverage of customer onboarding, lending, repayment, support, admin KYC/credit/collections/compliance/finance, and integration readiness—mapped across Milestones M0–M6 and Prompts 01–13.
- Verified fake infrastructure requirements (mock data, fake API, local persistence, latency simulation, reset tools) addressed in Track B, Milestone M1, and Prompts 05–06/12–13.
- Confirmed UI/UX expectations (mobile-first, clear status visualization, borrower-first flows) appear throughout Tracks C/D with dedicated prompts.
- Backend readiness (API abstraction, documentation, smoke tests) captured in Track F, Milestone M6, and Prompts 12–13, satisfying Phase 5 + §8 guidance.
- No outstanding spec mandates remain; plan ensures incremental, test-driven delivery without orphaned code, with final wiring/demos included.
