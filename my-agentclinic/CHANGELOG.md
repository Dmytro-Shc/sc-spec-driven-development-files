# Changelog

## 2026-07-18

- **Responsive design** — Updated specs (roadmap, tech-stack, requirements, plan, validation) and CSS with mobile-first media queries for mobile (< 640px), tablet (640–1024px), and desktop (> 1024px) breakpoints.
- **Test infrastructure** — Added Vitest test suites for the app, index routes, and Home component. Updated `package.json` scripts.
- **Roadmap consolidation** — Combined old Phases 2–5 (Base Layout, Agent List, Agent Detail, Ailments Catalog) into a single Phase 2 (Agents & Ailments). Renumbered remaining phases.

## 2026-07-17

- **Phase 1 merged** — Merged `phase-1-hello-hono` into `main`. Phase 1 is complete.
- **Layout components** — Added `Layout`, `Header`, `Main`, and `Footer` JSX components. All routes render inside the shared layout.
- **Home page** — Hono JSX home page with `<h1>` tagline, served from the `/` route.

## 2026-07-15

- **Project cleanup** — Removed old spec folders after renaming to date-based convention.

## 2026-07-11

- **Project scaffold** — Initial setup: Hono server, TypeScript strict mode, `tsx` dev server, static file serving, CSS.
- **Phase 1 specs** — Created `requirements.md`, `plan.md`, and `validation.md` for the Hello Hono phase.
- **Product specs** — Created `mission.md`, `roadmap.md`, and `tech-stack.md`.