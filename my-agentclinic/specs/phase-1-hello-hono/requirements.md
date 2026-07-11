# Phase 1 — Hello Hono: Requirements

## Goal

Get a working Hono server on the desk, serving a minimal AgentClinic home page, with TypeScript type-checking confirmed end-to-end. This is the foundation every subsequent phase builds on.

## Scope

1. **Install and configure Hono** with `tsx` as the dev server
2. **Minimal AgentClinic home page** at `/` — an HTML page, not raw text, welcoming visitors to the clinic
3. **TypeScript type check** passes via `tsc --noEmit`

## Out of Scope

- Any route other than `/` (no agents, no ailments, no dashboard)
- Shared layout components, header/nav/footer (Phase 2)
- External CSS files, CSS custom properties, or a stylesheet (Phase 2)
- JSX rendering or template engine setup (Phase 2)
- Database setup or migrations
- Error handling or 404 pages
- Testing framework setup (Vitest comes later)
- Production build or deployment configuration

## Context

- The project is already a TypeScript scaffold with `tsconfig.json` and `src/index.ts`
- The existing `tsconfig.json` targets `es2016`, uses `commonjs` modules, and outputs to `dist/`
- Hono is chosen over Express/Fastify per the tech stack spec for its TypeScript-first DX and lightweight footprint
- `tsx` runs TypeScript directly with no build step — ideal for dev iteration
- `tsc` is already set up as the build script for production

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Dev server | `tsx` watch (via `tsx watch src/index.ts`) | Hot-reload during development; no build step needed |
| Server port | `3000` (Hono default) | Common convention; easy to change later |
| Response format | Inline HTML (via `c.html()`) | A real page, not raw text — visitors see a proper AgentClinic welcome. Still no external CSS/JS; that's Phase 2 |
| Route handler | `c.html()` | Hono's built-in HTML response helper; the page is small enough to inline until Phase 2 brings JSX layouts |

## References

- [Hono docs — Getting Started](https://hono.dev/docs/getting-started/nodejs)
- [tsx — Node.js TypeScript runner](https://tsx.is/)
- [specs/roadmap.md](../roadmap.md) — Phase 1 definition
- [specs/tech-stack.md](../tech-stack.md) — technology choices and rationale
- [specs/mission.md](../mission.md) — project mission and tone