# Opticum Frontend Workspace

Opticum is a Queola-built prototype that simulates both borrower (customer) and operations (admin) journeys for a loan-management platform using **client-only** Next.js 14 apps backed by a shared mock data layer. Until a real backend exists, every interaction relies on fake APIs, local persistence, and deterministic seeds described in `docs/specs/spec.md`.

## Directory Layout

```
.
├─ apps/
│  ├─ admin/     # Internal staff Next.js app (create-next-app + Tailwind)
│  └─ customer/  # Borrower-facing Next.js app (create-next-app + Tailwind)
├─ config/       # Shared config templates (tsconfig, eslint, etc.)
├─ docs/         # Specs, ADRs, glossary, prompt plans
├─ CONTRIBUTING.md
├─ LICENSE
└─ todo.md
```

- Each app is completely standalone—run `npm install` inside `apps/admin` or `apps/customer` to install dependencies, then use the scripts below.
- Both apps were generated with `npx create-next-app@latest --ts --tailwind`, so Tailwind CSS is the primary styling mechanism everywhere.
- Shared configuration lives under `config/` for future reuse (e.g., tsconfig/eslint templates). Copy updates from there into each app to keep them aligned.

## Getting Started

1. Install root tooling dependencies (installs husky/lint-staged/etc.):
   ```bash
   npm install
   ```
2. Install dependencies per app:
   ```bash
   cd apps/customer && npm install
   cd ../admin && npm install
   ```
3. Run a development server:
   ```bash
   npm run dev        # from inside apps/customer or apps/admin
   ```
4. Verify linting, tests, and type-checks (either run inside each app or via root helpers):
   ```bash
   # From repo root executes both apps sequentially
   npm run lint
   npm test
   npm run typecheck
   ```

> NOTE: Smoke tests live in `tests/smoke.test.tsx` for each app and simply assert that the placeholder landing page renders. Update them as soon as real flows exist.

## Tooling & CI

- Husky hooks guard commits by running lint/test/typecheck (across both apps) and `lint-staged` formatting, followed by commitlint checks.
- GitHub Actions (`.github/workflows/ci.yml`) runs npm install/lint/test/typecheck for both apps on every push/PR using Node.js 20 with npm cache reuse.
- Formatting uses Prettier (`prettier.config.cjs`) and lint-staged (`.lintstagedrc.json`) so you can run `npm run format` for bulk formatting.

## Decisions & Glossary

- Architectural decisions are captured in `docs/adr/0001-foundations.md` and subsequent ADRs.
- Domain language lives in `docs/glossary.md`. Keep it aligned with `docs/specs/spec.md`.

## Next Steps

Prompt 02 in `docs/plans/prompt_plan.md` covers enforcing lint/format/CI tooling across both apps. Future prompts add the mock infrastructure, customer flows, and admin modules. Always reference the spec when implementing features and keep both apps’ configs in lockstep by editing the shared `config/` templates first.
