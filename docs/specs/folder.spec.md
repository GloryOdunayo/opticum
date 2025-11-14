# Project Structure Spec — Opticum Loan Platform

This document describes the recommended project folder structure for **both** the Customer and Admin Next.js (App Router) apps. Each folder/file is preceded by a one-line comment describing its purpose, and includes **tree symbols (├─, └─, │)** for proper structure visualization.

---

# Customer App — `customer/`

```
customer/
├─ next.config.js                         # Next.js config for Customer app
├─ tsconfig.json                           # TypeScript config
├─ .env.local.example                      # Example environment variables
├─ README.md                               # Project readme
│
├─ public/                                 # Static assets
│  ├─ logo.svg                             # Customer logo
│  └─ placeholders/                        # Sample UI assets
│     ├─ avatar-placeholder.png
│     └─ doc-placeholder.pdf
│
├─ src/
│  ├─ app/                                 # Next.js App Router root
│  │  ├─ layout.tsx                        # Root layout (Server Component)
│  │  ├─ head.tsx                          # Global metadata
│  │  ├─ page.tsx                          # Landing page
│  │  ├─ error.tsx                         # App-level error boundary
│  │  ├─ not-found.tsx                     # 404 page
│  │  │
│  │  ├─ auth/                             # Authentication routes
│  │  │  ├─ page.tsx                       # Sign-in page
│  │  │  ├─ client-callback.tsx            # Client demo callback
│  │  │  └─ route.ts                       # Server route handler
│  │  │
│  │  ├─ dashboard/                        # Customer dashboard
│  │  │  ├─ page.tsx                       # Dashboard root
│  │  │  └─ components/                    # Dashboard widgets
│  │  │     ├─ recent-activity.client.tsx
│  │  │     └─ portfolio-summary.client.tsx
│  │  │
│  │  ├─ loans/                            # Loan discovery + application
│  │  │  ├─ page.tsx                       # Products list
│  │  │  ├─ calculator.client.tsx          # Loan calculator
│  │  │  ├─ apply/                         # Multistep loan application
│  │  │  │  ├─ page.client.tsx             # Apply flow root
│  │  │  │  ├─ step-amount.client.tsx
│  │  │  │  ├─ step-docs.client.tsx
│  │  │  │  ├─ step-review.client.tsx
│  │  │  │  └─ success.server.tsx
│  │  │  └─ [productId]/                   # Dynamic product details
│  │  │     ├─ page.tsx
│  │  │     └─ apply-button.client.tsx
│  │  │
│  │  ├─ my-loans/                         # Customer active loans
│  │  │  └─ [loanId]/
│  │  │     ├─ page.tsx
│  │  │     ├─ schedule.client.tsx
│  │  │     └─ make-payment.client.tsx
│  │  │
│  │  ├─ support/                          # Support center
│  │  │  ├─ page.tsx
│  │  │  └─ tickets/
│  │  │     ├─ page.tsx
│  │  │     └─ [ticketId]/page.tsx
│  │  │
│  │  └─ components/                       # Shared client components
│  │     ├─ topbar.client.tsx
│  │     ├─ footer.client.tsx
│  │     └─ sidebar.client.tsx
│  │
│  ├─ types/
│  │  └─ domain.d.ts                       # Customer domain types
│  │
│  ├─ components/                          # Reusable UI components
│  │  ├─ ui/
│  │  │  ├─ button.tsx
│  │  │  ├─ card.tsx
│  │  │  ├─ input.client.tsx
│  │  │  └─ spinner.client.tsx
│  │  └─ loan/
│  │     ├─ loan-card.tsx
│  │     └─ loan-badge.tsx
│  │
│  ├─ hooks/                               # Client hooks
│  │  ├─ useCustomer.ts
│  │  ├─ useLoanProducts.ts
│  │  └─ useApplications.ts
│  │
│  ├─ lib/                                 # Client utilities + mock API
│  │  ├─ fakeApi.client.ts                 # Client-side mock backend
│  │  ├─ localPersist.client.ts            # LocalStorage helpers
│  │  └─ demoAuth.client.ts                # Mock authentication
│  │
│  ├─ state/                               # Redux Toolkit store + slices
│  │  ├─ store.ts                          # configureStore + middleware
│  │  ├─ onboarding.slice.ts               # Onboarding state + thunks
│  │  ├─ loans.slice.ts                    # Loan + application state
│  │  └─ support.slice.ts                  # Support/ticket interactions
│  │
│  ├─ server/                              # Server utilities
│  │  ├─ seed.ts                           # SSR seed bootstrapping
│  │  └─ sampleLoader.ts                   # Load seed files
│  │
│  ├─ data/                                # Seed data
│  │  ├─ products.ts
│  │  ├─ users.ts
│  │  └─ applications.ts
│  │
│  ├─ styles/                              # CSS files
│  │  ├─ globals.css
│  │  ├─ variables.css
│  │  └─ components.module.css
│  │
│  └─ tests/                               # Tests
│     ├─ loan-calc.spec.ts
│     └─ fakeApi.spec.ts
│
└─ package.json
```

---

# Admin App — `admin/`

```
admin/
├─ next.config.js                           # Next.js config for Admin app
├─ tsconfig.json                             # TypeScript config
├─ .env.local.example                        # Example environment variables
├─ README.md                                 # Admin documentation
│
├─ public/                                   # Admin-specific static assets
│  ├─ logo-admin.svg
│  └─ icons/
│     ├─ search.svg
│     ├─ csv.svg
│     └─ warning.svg
│
├─ src/
│  ├─ app/                                   # Next.js App Router root
│  │  ├─ layout.tsx                          # Admin root layout
│  │  ├─ head.tsx                            # Metadata
│  │  ├─ page.tsx                            # Admin home / sign-in
│  │  ├─ error.tsx
│  │  └─ not-found.tsx
│  │
│  │  ├─ auth/                               # Admin authentication
│  │  │  ├─ page.tsx
│  │  │  └─ route.ts
│  │
│  │  ├─ dashboard/                          # Admin dashboard
│  │  │  ├─ page.tsx
│  │  │  └─ components/
│  │  │     ├─ portfolio-chart.client.tsx
│  │  │     └─ delinquency-chart.client.tsx
│  │
│  │  ├─ customers/                          # Customers management
│  │  │  ├─ page.tsx
│  │  │  └─ [customerId]/
│  │  │     ├─ page.tsx
│  │  │     └─ kyc-actions.client.tsx
│  │
│  │  ├─ applications/                       # Loan applications
│  │  │  ├─ page.tsx
│  │  │  └─ [applicationId]/
│  │  │     ├─ page.tsx
│  │  │     └─ underwriting-form.client.tsx
│  │
│  │  ├─ loans/                              # Loans, collections, restructuring
│  │  │  ├─ page.tsx
│  │  │  ├─ collections/
│  │  │  │  └─ page.tsx
│  │  │  └─ restructure/
│  │  │     └─ [loanId]/page.tsx
│  │
│  │  ├─ compliance/                         # Compliance
│  │  │  ├─ alerts/page.tsx
│  │  │  ├─ audit/page.tsx
│  │  │  └─ reports/page.tsx
│  │
│  │  ├─ finance/                            # Finance & reconciliation
│  │  │  ├─ page.tsx
│  │  │  ├─ reconciliation.client.tsx
│  │  │  └─ exports.route.ts
│  │
│  │  └─ api/                                # Admin route handlers
│  │     ├─ applications/route.ts
│  │     └─ reconciliation/route.ts
│  │
│  ├─ types/                                 # Types for admin system
│  │  ├─ domain.d.ts
│  │  └─ rbac.d.ts
│  │
│  ├─ components/                            # Reusable admin UI components
│  │  ├─ tables/
│  │  │  └─ pipeline-table.client.tsx
│  │  ├─ cards/
│  │  │  └─ metric-card.client.tsx
│  │  └─ layouts/
│  │     └─ admin-shell.client.tsx
│  │
│  ├─ hooks/                                 # Admin hooks
│  │  ├─ useRbac.ts
│  │  ├─ useQueues.ts
│  │  └─ useTickets.ts
│  │
│  ├─ lib/                                   # Shared utilities (fake API + RBAC)
│  │  ├─ fakeApi.client.ts
│  │  ├─ localPersist.client.ts
│  │  └─ roleMatrix.ts
│  │
│  ├─ server/                                # SSR helpers + mock tasks
│  │  ├─ seed.ts
│  │  └─ auditFeed.ts
│  │
│  ├─ state/                                 # Redux Toolkit store + slices
│  │  ├─ store.ts
│  │  ├─ kyc.slice.ts
│  │  ├─ underwriting.slice.ts
│  │  └─ collections.slice.ts
│  │
│  ├─ data/                                  # Seed data
│  │  ├─ loans.ts
│  │  ├─ applications.ts
│  │  └─ tickets.ts
│  │
│  ├─ styles/                                # CSS layers
│  │  ├─ globals.css
│  │  └─ admin.module.css
│  │
│  └─ tests/                                 # Tests
│     ├─ rbac.spec.ts
│     └─ fakeApi.spec.ts
│
└─ package.json
```
