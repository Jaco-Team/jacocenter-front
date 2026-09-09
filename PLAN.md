# Call Center Frontend API and quality plan

## Goal

Deliver a Docker-spinnable, case-safe, typed Next.js operator frontend that consumes the existing `/api/v1` Call Center API without changing the API database schema.

## Baseline review

Completed in the stabilization pass:

- consolidated the duplicate `features/Order` and `features/order` trees into one lowercase feature namespace;
- corrected Linux case-sensitive imports;
- preserved Next standalone production output;
- added a separate Docker development image with source mounts and named dependency/build volumes;
- made public API and map configuration explicit in Compose and documentation;
- added a single documented verification path for host and Docker execution.

Known architectural gaps:

- only authentication currently calls the API at runtime;
- orders, kitchen, clients, catalog, delivery, promos, and new-order flows still depend on page-local mocks;
- API DTOs and UI DTOs are mixed in `entities/Order` and need explicit mapping boundaries;
- stateful workflows are spread across page components and Zustand stores;
- no focused unit test suite exists for transport, session recovery, DTO mapping, or workflow state;
- runtime API errors need consistent loading, empty, retry, and authorization states;
- production public environment values must be supplied at image build time.

## Implementation sequence

### 1. Foundation and repository hygiene

- enforce lowercase directory/import policy in CI on a case-sensitive filesystem;
- split runtime code from story fixtures and remove page-to-entity mock imports;
- introduce shared result/pagination/error types matching the API envelopes;
- keep API URL construction and authentication in `shared/api`;
- add unit tests for `apiRequest`, error envelopes, unauthorized handling, and query serialization.

### 2. Session and access boundary

- keep login, logout, `/me`, refresh, and expiry handling in the auth entity;
- expose a small `RequireAuth` boundary for protected routes;
- define the operator/user DTO once and map API responses at the boundary;
- test bootstrap with no token, valid token, expired token, network failure, refresh, and logout.

### 3. Reference data

- add typed clients and hooks for cities and points;
- load authorized points from the API and remove static cafe/city data from runtime pages;
- add catalog and item-detail clients, including allergens and modifier links;
- define explicit loading, empty, stale, and error states;
- test authorization filtering and response mapping with mocked HTTP.

### 4. Customer workspace

- wire phone lookup and customer profile;
- wire address list/create/update/delete and delivery street validation;
- wire customer order history and promo history where supported by the API;
- preserve point/customer authorization in the API and treat 403/404 as user-facing states;
- test normalization, cache invalidation, and object-level access failures.

### 5. Order lifecycle

- replace mock order tables with `/orders` and `/orders/{id}` queries;
- map legacy numeric statuses to a single UI status model;
- wire cart replacement, validation, draft creation, confirm, and cancellation;
- preserve idempotency keys and server totals; never calculate authoritative prices in the UI;
- keep operator status transitions outside this frontend until the owning Chef workflow is explicitly exposed;
- test the complete draft-to-confirm/cancel state machine and duplicate-submit behavior.

### 6. Delivery, promotions, and payment display

- wire delivery zones, street search, address validation, and preorder slots;
- wire promo listing/check/evaluation and display server-provided fixed prices/discounts;
- display YooKassa/refund status as returned by the API; do not implement bank-side refund logic in the frontend;
- test invalid addresses, unavailable slots, exhausted/reused promos, and stale cart prices.

### 7. Kitchen, notifications, and reporting

- replace kitchen mocks with `/kitchen/orders` and detail queries;
- add durable notification polling with bounded backoff and read/read-all actions;
- wire reports with explicit date/point filters;
- test polling stop/start, authorization loss, and empty result behavior.

### 8. Quality gates and delivery

- unit tests for API clients, mappers, stores, and workflow reducers;
- component tests for loading/error/empty/success states;
- Storybook tests for reusable UI states and accessibility;
- Docker build and runtime smoke test against the local API;
- CI checks: TypeScript, build, unit/component tests, case-sensitive import audit, and Docker image build;
- document local API, production API, CORS, and frontend-only secrets.

## Definition of done

- `docker compose -f docker-compose.dev.yml up --build` starts the FE with hot reload;
- production `docker compose up --build -d` serves the standalone image;
- all runtime screens use typed API clients or are explicitly marked as pending in this plan;
- no duplicate case-variant paths remain;
- tests cover transport, auth recovery, DTO mapping, and each user workflow;
- no frontend credential can access Chef or MariaDB directly.
