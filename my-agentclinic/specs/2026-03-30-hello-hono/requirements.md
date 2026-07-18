# Phase 1 Requirements — Hello Hono

## Scope

Install and configure Hono with a `tsx` dev server. Expose a single `/` route that renders a minimal HTML home page via Hono JSX. Confirm TypeScript types work end-to-end.

## Out of Scope

- No shared layout or navigation (Phase 2)
- No test framework setup (Vitest deferred to a later phase)
- No database or additional routes
- No CI/CD pipeline

## Decisions

### Pin Hono version
Record the exact Hono version in `package.json` with no range prefix (e.g., `"hono": "4.x.y"`). Future phases must not silently upgrade without deliberate review.

### Enforce strict TypeScript
`tsconfig.json` must include `"strict": true`. This is non-negotiable from the first commit so the codebase never accumulates loose types.

## Context

This phase exists to prove the baseline works: Node runs TypeScript, Hono serves a response, and the dev loop is functional. Nothing more.

The home page should render an `<h1>` containing "AgentClinic" and a short tagline that reflects the mission. The route returns HTML, not a plain string — Hono JSX handles the rendering.

This is the first visible page a developer sees when they clone and run the project.

## Responsive Design

The layout must be responsive from the start. The CSS uses a mobile-first approach with breakpoints:

- **Mobile** (< 640px): single-column, stacked layout, full-width content
- **Tablet** (640–1024px): comfortable reading width, slightly relaxed spacing
- **Desktop** (> 1024px): centered content with a max-width constraint, generous whitespace

The `<meta name="viewport">` tag must be present in the layout. The layout must be usable and readable at any viewport width with no horizontal scrolling.

## Stakeholder Notes

- **Mary** needs TypeScript end-to-end (satisfied by `strict: true` + successful `tsc --noEmit`)
- **Steve** needs the site to work on modern browsers at any screen size (satisfied by responsive CSS)
