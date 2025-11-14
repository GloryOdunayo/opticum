# Contributing to Opticum

Thanks for helping build Opticum, a dual customer/admin loan-management experience powered entirely by client-side apps and stewarded by **Queola**, a Dev agency owned by EnnovateLab. This guide explains how we collaborate, the expectations for code and documentation changes, and the path to getting work merged.

---

## 1. Understand the Product Context
- Start with `README.md` (once available) and `docs/specs/spec.md` for the full platform specification. Every change must map to a requirement outlined there.
- Remember Opticum currently ships **only client-facing Next.js applications** plus mock infrastructure (fake API, local persistence). Do not introduce real backend dependencies without a proposal.
- If a spec gap blocks you, open an issue first so we can align documentation and implementation before coding.

---

## 2. Development Environment
- Required toolchain: Node.js LTS, npm, Git, and a modern browser. Docker is optional unless you add preview tooling.
- Repo layout (per spec):
  - `apps/customer` & `apps/admin` — Next.js 14 App Router apps (create-next-app + Tailwind).
  - `docs/` — specs, prompt plans, RFCs.
  - Shared configs/lib packages will live under `packages/` as the project matures.
- Bootstrap commands:

  ```bash
  git clone <repo-url> && cd opticum
  npm install
  npm run dev --workspace customer   # start customer app
  npm run dev --workspace admin      # start admin app
  ```

- Linting/testing scripts must be runnable via npm; keep README up to date as tooling evolves.

---

## 3. Issues & Planning
- Search existing issues before filing new ones. Reference the relevant spec section (e.g., “Spec §4.1 — Loan application wizard”) in every issue/PR.
- Use labels: `feature`, `bug`, `docs`, `tooling`, `design`, `infra-mock`.
- When proposing large changes, attach a short plan (or link to `docs/plans/`) so reviewers understand sequencing.

---

## 4. Branching & Commit Style
- Branch from `main` (unless otherwise instructed):
  - Features: `feat/<area>-<summary>`
  - Fixes: `fix/<area>-<summary>`
  - Docs/tooling: `docs/<subject>` or `chore/<subject>`
- Follow [Conventional Commits](https://www.conventionalcommits.org/) with scopes tied to app/area, e.g.:
  - `feat(customer): add onboarding wizard step`
  - `fix(admin): correct collections promise-to-pay`
- Keep PRs focused. Squash noisy commits before requesting review.

---

## 5. Coding Standards
- **Next.js/TypeScript (client apps)**
  - Enable `strict` TypeScript. Avoid `any`.
  - Prefer React Server Components where viable, but remember mocked persistence lives in the browser. Isolate browser-only logic to client components/hooks.
  - Use shared component libraries/tokens; do not fork design language per app, and keep Tailwind utility classes aligned with the shared tokens.
  - Mock APIs must stay in `lib/fakeApi` (or equivalent) and support latency simulation plus reset semantics.
  - Shared state belongs in Redux Toolkit slices (`src/state/`); keep reducers, thunks, and selectors mirrored between customer/admin apps.
- **Testing**
  - Use Jest/Vitest + React Testing Library for units/components.
  - Use Playwright/Cypress for end-to-end customer/admin golden paths.
- **Documentation**
  - Update specs, prompt plans, and TODO trackers when behaviour changes.
  - Stick to ASCII Markdown unless the file already includes extended characters.

---

## 6. Testing & Verification
- Minimum before pushing:

  ```bash
  npm run lint
  npm test
  npm run typecheck
  ```

- Run Playwright/Cypress suites when touching multi-step flows or integration points.
- Document any manual verification (e.g., “Customer onboarding wizard tested on Chrome/Safari”) inside the PR description.
- Ensure fake API reset tools still operate after data model changes.

---

## 7. Pull Request Checklist
Before requesting review, confirm:
- [ ] Issue link and spec section references.
- [ ] Lint/typecheck/unit tests green; relevant integration/e2e suites run when applicable.
- [ ] Docs updated (`docs/specs`, `docs/plans`, README, TODO tracker).
- [ ] No real backend dependencies or secrets were added; fake API contracts intact.
- [ ] PR description summarizes the change, testing evidence, and follow-ups.

Expect at least one maintainer approval for minor UI tweaks and two for architectural changes (mock infra, shared tooling, integration readiness).

---

## 8. Security & Data Handling
- Never commit secrets or production data. Mock assets only.
- Treat seed data as non-sensitive but anonymised; do not include real customer information.
- Because Opticum is client-only, avoid introducing server runtimes or exposing privileged tokens. If you need new capabilities, discuss early.

---

## 9. Communication & Support
- Use GitHub issues/PRs for async communication so the history is searchable.
- When debating architecture, cite the spec section and capture the conclusion in docs.
- Reach the Queola engineering team at `engineering@queola.com` for roadmap or urgent questions.

---

## 10. Thank You
Opticum’s goal is to demonstrate complete borrower and admin journeys using only client-side tech. Your contributions—tests, docs, designs, or code—make these experiences trustworthy and demo-ready. Thanks for keeping the mock ecosystem healthy and coherent.
