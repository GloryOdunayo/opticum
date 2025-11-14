# Opticum Loan Management Platform — Project Specification

This **spec.md** document provides a complete, high-level project specification for the **Opticum Loan Management Platform**, including:

* Project purpose & vision
* System overview
* Execution phases & milestones
* Detailed requirements for the **Customer App** and **Admin App**
* Clarification that **no backend exists yet**, and the project will use **mock data, local persistence, and fake APIs**
* Full project folder structure following modern **Next.js + TypeScript (App Router)** best practices

---

# 1. Project Overview

Opticum is building a modern, scalable, digital loan management platform with two primary interfaces:

1. **Customer App** (for Borrowers — Retail & SME)
2. **Admin App** (for Internal staff — Support, Compliance, Credit, Collections, Operations, Super Admin)

The platform will initially operate **without a backend**. Instead, all interactions will be powered by:

* **Mock data**
* **Fake API layers** (simulated network latency + Promise-based async patterns)
* **LocalStorage persistence**
* **Next.js server & client components**
* **Route Handlers to emulate backend endpoints** (optional)

This allows UI, flows, and internal processes to be fully prototyped **before backend development begins**.

---

# 2. Project Vision

To create a functional, end-to-end **loan lifecycle simulation**, including:

* Customer onboarding
* Loan product discovery
* Loan application flows
* Underwriting workflows
* Loan management & repayment simulation
* Admin oversight (KYC, Compliance, Finance, Reporting)

All built using **Next.js + TypeScript**, **App Router**, and a fully mocked environment that accurately represents real-world usage.

---

# 3. Execution Phases & Milestones

### **PHASE 1 — Foundation Setup**

**Goal:** Establish the workspace, folder structure, and core scaffolding.

* Set up monorepo (`apps/admin`, `apps/customer`)
* Install Next.js 14+ with App Router
* Configure TypeScript, ESLint, Prettier
* Implement baseline layouts for both apps
* Implement mock authentication (role picker)

📌 **Deliverables:**

* Working folder structure
* Both apps running independently
* Basic navigation + sample pages

---

### **PHASE 2 — Mock Infrastructure Layer**

**Goal:** Build the fake backend and local persistence logic.

* Implement `fakeApi` client for CRUD operations
* Implement seed data for users, products, loans, applications
* Add `localPersist` utilities
* Build route handlers for simulating API-like behavior
* Seed reset mechanism

📌 **Deliverables:**

* Fully functional mock backend
* Data persisted across refresh
* Developer tools to inspect/reset state

---

### **PHASE 3 — Customer App Development**

**Goal:** Deliver a fully functional customer-facing lending workflow.

**Modules:**

* Onboarding + KYC (mock flows)
* Dashboard (products, recent activity)
* Loan product discovery
* Loan calculator
* Loan application (multi-step)
* Loan status tracking
* Repayment simulation
* Support & tickets

📌 **Deliverables:**

* Complete customer app with all flows working using mock data

---

### **PHASE 4 — Admin App Development**

**Goal:** Build the operational back office interface.

**Modules:**

* Dashboard (portfolio summary)
* Customer management
* KYC review
* Loan application pipeline
* Underwriting page
* Collections module
* Compliance (AML, audit logs)
* Finance (reconciliation simulation)
* Product configuration screens

📌 **Deliverables:**

* Full admin control panel with end-to-end simulated workflows

---

### **PHASE 5 — Integration Readiness**

**Goal:** Prepare front-end to be wired to a real backend in the future.

* Abstract API layer into an interface
* Introduce environment-driven API adapters
* Document expected endpoints
* Prepare OpenAPI-ready structure (optional)

📌 **Deliverables:**

* Frontend ready to plug into any backend
* Documentation for backend engineers

---

# 4. Customer App Specification

The Customer App is designed for **Retail & SME borrowers**. It should include:

## **4.1 Core Features**

* **Sign-in (mock)**
* **Onboarding flow** (phone verification, BVN/ID upload — simulated)
* **View loan products**
* **Loan calculator**
* **Loan application wizard** (multi-step; persisting in mock DB)
* **Loan tracking** (statuses: draft → submitted → underwriting → approved → disbursed)
* **Repayment simulation**
* **Support center** (tickets + FAQ)

## **4.2 Technical Requirements**

* All business logic must remain **client-side** or in **mock route handlers**
* Must behave as if calling a real backend (async operations, states)
* LocalStorage used for persistence
* Page transitions must reflect real-world flows

## **4.3 UI/UX Requirements**

* Simple borrower-first experience
* Mobile-first responsive layout
* Clean separation between onboarding and dashboard
* Clear visualization of loan status & repayment schedule

---

# 5. Admin App Specification

The Admin App is built for internal Opticum staff.

## **5.1 Core Features**

### **Support Team**

* View customer issues
* Respond to tickets (mock)
* Access customer summaries

### **Compliance Team**

* View KYC status
* View AML alerts
* Review audit logs

### **Credit/Underwriting**

* View loan applications
* Approve/Decline application
* Add underwriting notes

### **Collections**

* View overdue loans
* Log contact attempts
* Mark promises-to-pay
* Enter settlements or restructures (simulated)

### **Operations / Finance**

* Reconciliation dashboard (mock)
* Settlement simulation
* Export CSV/PDF (fake)

### **Super Admin**

* Manage loan product configurations
* Manage fees & eligibility
* Manage roles & permissions (mock)

## **5.2 Technical Requirements**

* Uses same mock backend as Customer
* Role-based access system (client side)
* Realistic pipeline views (Underwriting, Collections, Compliance)

---

# 6. Project Folder Structure

Below is the **complete project folder structure** with tree symbols and comments.

```
apps/
├─ customer/                               # Customer-facing borrower app
│  ├─ next.config.js                        # Next.js config
│  ├─ tsconfig.json                         # TS config
│  ├─ public/                               # Static assets
│  ├─ src/
│  │  ├─ app/                               # App Router
│  │  ├─ components/                        # Reusable components
│  │  ├─ hooks/                             # Data-fetching & utilities
│  │  ├─ lib/                               # fakeApi + local persistence
│  │  ├─ server/                            # SSR helper utilities
│  │  ├─ data/                              # Seed data for mocks
│  │  ├─ styles/                            # Global styles
│  │  └─ tests/                             # Unit tests
│  └─ package.json
│
├─ admin/                                  # Internal staff app
│  ├─ next.config.js
│  ├─ tsconfig.json
│  ├─ public/
│  ├─ src/
│  │  ├─ app/                               # App Router
│  │  ├─ components/                        # Feature modules
│  │  ├─ hooks/
│  │  ├─ lib/                               # fakeApi + rbac
│  │  ├─ data/
│  │  ├─ styles/
│  │  └─ tests/
│  └─ package.json
│
└─ package.json                             # Workspace root config
```

---

# 7. Fake Backend Specification

Since there is **no backend**, the fake backend must provide:

### **7.1 Core Services**

* CRUD for Users
* CRUD for Loan Products
* CRUD for Loan Applications
* CRUD for Loans
* CRUD for Tickets
* State change handlers (approve, decline, disburse, repay)

### **7.2 Features**

* Promise-based async operations
* Simulated network delay
* LocalStorage JSON database
* Seed reset support

---

# 8. Future Backend Integration

When backend development begins:

* Replace `fakeApi` with real API services
* Route handlers can be swapped to call APIs instead of mocks
* Domain types remain consistent
* Minimal refactoring required thanks to abstraction layer

---

# 9. Final Notes

This spec ensures:

* The project is scalable
* The frontend is fully demo-ready
* Backend engineers get a clear API expectation
* You can present workflows end-to-end without backend dependency

---

If you'd like, I can generate:

* A **system architecture diagram**
* A **backend API contract (OpenAPI-ready)**
* Wireframes for Admin and Customer apps
