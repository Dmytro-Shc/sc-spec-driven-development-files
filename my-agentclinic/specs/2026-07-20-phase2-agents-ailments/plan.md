# Phase 2 — Agents & Ailments: Implementation Plan

> Branch: `phase2-agents-ailments`
> Base: Phase 1 (Hono + `tsx` dev server + `/` route)

---

## Task Group 1 — Shared Layout & PicoCSS Foundation

**1.1** Install `@picocss/pico` as a dependency.

**1.2** Create a server-side JSX layout component (`src/layout.tsx`) with:
  - Semantic HTML structure leveraging PicoCSS's class-light approach (containers, nav, main, footer)
  - `<header>` with site title and PicoCSS-styled nav
  - `<nav>` with links: Home, Agents, Ailments
  - `<main>` slot for page content
  - `<footer>` with minimal branding

**1.3** Create the app-specific stylesheet (`src/style.css`):
  - PicoCSS color theme overrides via CSS custom properties (e.g., `--pico-primary`, `--pico-font-family`)
  - Branding touches: header background, logo treatment, spacing refinements
  - Any layout tweaks beyond what PicoCSS containers provide

**1.4** Wire the layout and stylesheet into the existing `/` route and all new routes.

---

## Task Group 2 — SQLite Database Setup

**2.1** Install `better-sqlite3` and `@types/better-sqlite3`.

**2.2** Create database connection module (`src/db.ts`):
  - Open SQLite file (e.g., `data/agentclinic.db`) on module load
  - Export the `db` instance for use in route handlers

**2.3** Create migration system:
  - Directory: `src/migrations/`
  - First migration: `001_create_agents.sql` — `agents` table (id, name, model_type, status, created_at)
  - Second migration: `002_create_ailments.sql` — `ailments` table (id, name, description, created_at)
  - Third migration: `003_create_agent_ailments.sql` — join table (agent_id, ailment_id)
  - Migration runner applies unapplied migrations in order

**2.4** Create seed data (`src/seed.ts`):
  - Fictional agents (name, model type, status)
  - Fictional ailments (e.g., "context-window claustrophobia", "prompt fatigue")
  - Link agents to one or more ailments
  - Script is idempotent (can run multiple times)

---

## Task Group 3 — Agents Routes

**3.1** `/agents` — list all agents:
  - Query all agents from SQLite
  - Render inside the shared layout
  - Each agent card links to `/agents/:id`

**3.2** `/agents/:id` — single agent profile:
  - Query agent by id from SQLite
  - Include associated ailments (via join table)
  - Display: name, model type, current status, presenting complaints
  - 404 handling if agent not found

---

## Task Group 4 — Ailments Routes

**4.1** `/ailments` — list all ailments:
  - Query all ailments from SQLite
  - Render inside the shared layout
  - Show which agents are affected by each ailment

---

## Task Group 5 — Integration & Polish

**5.1** Wire nav links in layout to all routes.

**5.2** Audit that every page renders inside the shared layout.

**5.3** Confirm mobile-first responsive behavior at 320px+.

---

## References

- [Mission](../mission.md) — whimsical wellness platform for AI agents
- [Tech Stack](../tech-stack.md) — Hono, SQLite, JSX, PicoCSS, Vitest
- [Roadmap](../roadmap.md) — Phase 2 definition