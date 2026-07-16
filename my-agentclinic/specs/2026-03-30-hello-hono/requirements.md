# Phase 1 Requirements — Hello Hono

## Scope

Install and configure Hono with a `tsx` dev server. Expose a single `/` route that renders a minimal HTML home page via Hono JSX. Confirm TypeScript types work end-to-end.

## Layout Components

A shared `<Layout>` component provides the page shell (`<html>`, `<head>`, `<body>`). It composes three subcomponents, each in its own file:

- `src/components/Header.tsx` — site header with a link to `/`
- `src/components/Main.tsx` — wraps page content in a `<main>` element; accepts `children`
- `src/components/Footer.tsx` — site footer with copyright text

`<Layout>` imports and assembles these three. Pages only need to import `<Layout>` and pass their content as children — they do not import `<Header>`, `<Main>`, or `<Footer>` directly.

## Out of Scope

- No navigation menu or routing beyond `/` (Phase 2)
- No test framework setup (Vitest deferred to a later phase)
- No database or additional routes
- No CI/CD pipeline

## Decisions

### Pin Hono version
Record the exact Hono version in `package.json` with no range prefix (e.g., `"hono": "4.x.y"`). Future phases must not silently upgrade without deliberate review.

### Enforce strict TypeScript
`tsconfig.json` must include `"strict": true`. This is non-negotiable from the first commit so the codebase never accumulates loose types.

### Static assets served via Hono
A `static/` directory at the project root holds CSS and other static files. Hono serves them via `@hono/node-server/serve-static` at the `/static/*` path. The layout `<head>` links to `/static/style.css`.

## Context

This phase exists to prove the baseline works: Node runs TypeScript, Hono serves a response, and the dev loop is functional. Nothing more.

The home page should render an `<h1>` containing "AgentClinic" and a short tagline that reflects the mission. The route returns HTML, not a plain string — Hono JSX handles the rendering.

This is the first visible page a developer sees when they clone and run the project.

## Stakeholder Notes

- **Mary** needs TypeScript end-to-end (satisfied by `strict: true` + successful `tsc --noEmit`)
- **Steve** has no requirements yet; this phase is plumbing only
