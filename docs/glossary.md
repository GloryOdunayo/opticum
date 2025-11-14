# Opticum Glossary

| Term | Description | Spec Reference |
| --- | --- | --- |
| Customer App | Borrower-facing Next.js client that handles onboarding, loan discovery, applications, repayment tracking, and support interactions using mock data. | §4 |
| Admin App | Internal operations client for support, compliance, credit, collections, finance, and product configuration workflows. | §5 |
| Fake API | Client-side abstraction that simulates backend CRUD/state transitions with latency, persistence, and reset hooks. | §7 |
| Redux Slice | Redux Toolkit reducer + actions responsible for tracking mock auth, loan pipelines, tickets, etc., within each app. | §§4–5 |
| Local Persistence | Utilities that wrap `localStorage` for storing seeds/sessions while remaining SSR-safe. | §7 |
