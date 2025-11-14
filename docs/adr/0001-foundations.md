# ADR 0001 — Frontend-Only Dual-App Foundations

- **Status:** Proposed
- **Date:** 2024-11-14
- **Context:** `docs/specs/spec.md`

## Decision
Opticum will ship as two standalone Next.js 14 TypeScript applications (`./apps/customer`, `./apps/admin`) managed within the same repository but installed and run independently. Each app uses identical npm scripts (dev/build/test/lint/typecheck), Tailwind CSS for styling, and can reference shared config templates stored under `config/` (e.g., `tsconfig.base.json`) when alignment is needed. All state management is handled via Redux Toolkit slices local to each app until a shared package becomes necessary.

## Rationale
- Mirrors the spec’s emphasis on separate customer and admin experiences.
- Keeps build artifacts isolated so each app can be deployed independently later.
- Shared config templates prevent configuration drift without forcing a monorepo workspace.

## Consequences
- Contributors must `npm install` inside both apps to work across experiences.
- Tooling changes should first be reflected in `config/` templates, then copied into each app.
- Future backend integration work (Prompt 13) can treat each app as an independent client while reusing shared mock infrastructure contracts.
