# Backend API Implementation Plan

This document outlines the development plan for creating a backend API that replicates and extends the functionality of `jsonplaceholder.typicode.com`. The project is structured into four main milestones, each with clear objectives and acceptance criteria.

## Technology Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Containerization:** Docker & Docker Compose
- **Testing:** Jest & Supertest
- **Linting/Formatting:** ESLint & Prettier
- **Validation:** Zod

---

## Milestone 1: Project Foundation & Basic Server

**Goal:** Establish the project's structure and development environment. This includes setting up Node.js with TypeScript, a basic Express server, and all the necessary tooling for testing, linting, and formatting.

**Acceptance Criteria:**

- A `package.json` file is created and contains all necessary dependencies for this milestone.
- TypeScript is configured with a `tsconfig.json` file.
- An Express server is running.
- A `GET /api/health` endpoint is implemented and returns a `200` status with `{ status: 'ok' }`.
- Jest and Supertest are configured for testing.
- ESLint and Prettier are configured for code quality and formatting.
- NPM scripts for `start`, `dev`, `build`, `test`, `lint`, and `format` are present in `package.json`.
- All tests for this milestone pass.
- `npm run lint` and `npm run format` complete without errors.

---

## Milestone 2: Database & Containerization

**Goal:** Dockerize the application and set up the database using Prisma as the ORM. This milestone ensures a reproducible development and production environment.

**Acceptance Criteria:**

- A `Dockerfile` is present and successfully builds a container image for the application.
- A `docker-compose.yml` file is present and can start both the application and a PostgreSQL database container.
- Prisma is initialized and the schema (`prisma/schema.prisma`) is defined to match the `User`, `Address`, `Geo`, and `Company` models, plus an `AuthUser` table.
- A Prisma migration file exists to create the database schema.
- A Prisma seed script exists and populates the database with initial user data from `jsonplaceholder`.
- The application connects to the database specified in the `docker-compose.yml` file.
- On `docker-compose up`, the database migrations and seeding are applied automatically.
- All tests for this milestone pass.
- `npm run lint` and `npm run format` complete without errors.

---

## Milestone 3: Users CRUD API

**Goal:** Implement the core functionality of the API: full Create, Read, Update, and Delete (CRUD) operations for the `/users` resource.

**Acceptance Criteria:**

- The following endpoints are implemented:
  - `GET /api/users`: Returns a list of all users and a `200` status.
  - `GET /api/users/:id`: Returns a single user by ID and a `200` status, or `404` if not found.
  - `POST /api/users`: Creates a new user, returns the created user, and a `201` status.
  - `PUT /api/users/:id`: Updates an existing user, returns the updated user, and a `200` status, or `404` if not found.
  - `DELETE /api/users/:id`: Deletes a user and returns a `204` status, or `404` if not found.
- Input validation using `zod` is implemented for `POST` and `PUT` requests. Invalid requests return a `400` status with a descriptive error message.
- The code is structured logically (e.g., routes, controllers, services).
- Comprehensive integration tests exist for all CRUD operations, covering success and failure scenarios.
- All tests for this milestone pass.
- `npm run lint` and `npm run format` complete without errors.

---

## Milestone 4: JWT Authentication

**Goal:** Secure the API by implementing a robust authentication system using JSON Web Tokens (JWT).

**Acceptance Criteria:**

- The following authentication endpoints are implemented:
  - `POST /api/auth/register`: Creates a new `AuthUser` with a hashed password and returns a `201` status.
  - `POST /api/auth/login`: Authenticates a user and returns a JWT on success with a `200` status.
- A JWT authentication middleware is created.
- The `POST`, `PUT`, and `DELETE` endpoints for `/api/users` are protected and require a valid JWT.
  - Requests to protected endpoints without a token return `401 Unauthorized`.
  - Requests with an invalid or expired token return `401 Unauthorized`.
  - Requests with a valid token are processed successfully.
- The `GET` endpoints for `/api/users` remain public.
- Integration tests are written for registration, login, and accessing protected/public routes.
- All tests for this milestone pass.
- `npm run lint` and `npm run format` complete without errors.
