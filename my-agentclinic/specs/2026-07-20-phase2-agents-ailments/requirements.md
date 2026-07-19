# Phase 2 — Agents & Ailments: Requirements

## Scope

Full Phase 2 of the roadmap: server-side JSX layout, CSS foundation, SQLite database, agents and ailments tables with seed data, listing pages, and linking.

## Stakeholder Context

From the [mission](../mission.md):
- **Agents** are the "patients" — tired, over-prompted AI models in need of support
- **Therapists** treat them (Phase 3)
- **Staff** (especially Mary) manage the platform — they need clean, functional dashboards

## Functional Requirements

### FR1 — Shared Layout
- Every page renders inside a consistent layout with header, nav, main, and footer.
- The nav includes links to Home (`/`), Agents (`/agents`), and Ailments (`/ailments`).
- The layout is implemented as a Hono JSX component (no client-side framework).

### FR2 — CSS Foundation (PicoCSS)
- [PicoCSS](https://picocss.com) (`@picocss/pico`) is the CSS framework — class-light, semantic HTML-driven, responsive.
- PicoCSS is installed via npm and served as a static asset (no CDN, no build step).
- An app-specific stylesheet (`src/style.css`) provides brand theming via PicoCSS's CSS custom property overrides (e.g., `--pico-primary`, `--pico-font-family`, `--pico-spacing`).
- All pages remain responsive and mobile-first — PicoCSS's container and grid system handles this out of the box.

### FR3 — SQLite Database
- Database file stored at `data/agentclinic.db`.
- Connection module (`src/db.ts`) provides a singleton `better-sqlite3` instance.
- Migrations stored as numbered `.sql` files in `src/migrations/`, applied in order on startup.
- Seed script (`src/seed.ts`) populates the database with fictional data; must be idempotent.

### FR4 — Agents Table
- Columns: `id` (integer PK), `name` (text), `model_type` (text), `status` (text), `created_at` (datetime).
- Seed data: at least 5 fictional agents with varied model types and statuses.

### FR5 — Ailments Table
- Columns: `id` (integer PK), `name` (text), `description` (text), `created_at` (datetime).
- Seed data: at least 4 fictional ailments relevant to AI agents.

### FR6 — Agent-Ailment Linking
- Join table `agent_ailments` with `agent_id` and `ailment_id` foreign keys.
- Each agent may have one or more ailments.
- Linking is visible on the agent detail page.

### FR7 — `/agents` Page
- Lists all agents with name, model type, and status.
- Each entry links to the agent's detail page.

### FR8 — `/agents/:id` Page
- Shows agent name, model type, current status, and presenting complaints (linked ailments).
- Returns a 404-like page if the agent does not exist.

### FR9 — `/ailments` Page
- Lists all ailments with name, description, and count of affected agents.

## Non-Functional Requirements

- **NFR1** — All pages must render in under 200ms on a local dev server.
- **NFR2** — The database schema must be forward-compatible with Phase 3 (therapies table) and Phase 4 (appointments table).
- **NFR3** — CSS must be responsive down to 320px viewport width.
- **NFR4** — TypeScript strict mode: no `any` types in database or route code.

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Database driver | `better-sqlite3` | Synchronous API, fast, no ORM overhead |
| Migrations | Plain SQL files, numbered | Simple, transparent, no migration framework needed |
| Seed idempotency | `INSERT OR IGNORE` with unique constraints | Safe to re-run during development |
| CSS framework | PicoCSS (`@picocss/pico`) | Class-light, semantic HTML-driven, responsive grid out of the box; reduces custom CSS to brand theming only |
| App-specific styling | `src/style.css` with PicoCSS custom property overrides | Framework handles reset, typography, layout; we handle colors, fonts, and brand touches |
| 404 handling | Inline check at route handler | Simple, no middleware needed for v1 |