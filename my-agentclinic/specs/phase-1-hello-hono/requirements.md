# Phase 1 — Hello Hono: Requirements

## Goal

Get a working Hono server on the desk, serving a single route, with TypeScript type-checking confirmed end-to-end. This is the foundation every subsequent phase builds on.

## Scope

1. **Install and configure Hono** with `tsx` as the dev server
2. **Single `/` route** returning the text `"AgentClinic is open for business"` (aligns with the mission's whimsical tone)
3. **TypeScript type check** passes via `tsc --noEmit`

## Out of Scope

- Any route other than `/` (no layout, no agents, no ailments)
- Database setup or migrations
- CSS or styling
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
| Response format | Plain text (not HTML) | Simplest possible return for Phase 1; JSX layout comes in Phase 2 |
| Route handler | `c.text()` | Hono's built-in text response helper; no template overhead |

## References

- [Hono docs — Getting Started](https://hono.dev/docs/getting-started/nodejs)
- [tsx — Node.js TypeScript runner](https://tsx.is/)
- [specs/roadmap.md](../roadmap.md) — Phase 1 definition
- [specs/tech-stack.md](../tech-stack.md) — technology choices and rationale
- [specs/mission.md](../mission.md) — project mission and tone