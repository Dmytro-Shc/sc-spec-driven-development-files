# Phase 1 Validation — Hello Hono

## Definition of Done

All of the following must be true before this branch is merged.

### 1. TypeScript compiles cleanly

```
npm run typecheck
```

Must exit with code 0 and produce no errors or warnings.

### 2. Server starts

```
npm run dev
```

Must start without errors. The terminal should show the server is listening (port 3000 or logged port).

### 3. Route returns an HTML home page

```
curl -s http://localhost:3000
```

HTTP status must be `200 OK`. Response body must be HTML and must contain:

- An `<h1>` element with the text `AgentClinic`
- A tagline (any short descriptive text; exact wording is implementation choice)

### 4. Hono version is pinned

`package.json` must list `hono` without a `^` or `~` range prefix.

### 5. Strict TypeScript is on

`tsconfig.json` must contain `"strict": true`.

### 6. Responsive layout is present

The HTML response must include:
- A `<meta name="viewport">` tag with `width=device-width, initial-scale=1.0`
- The CSS must use at least one media query for responsive breakpoints

### 7. No horizontal overflow at narrow widths

The layout must not require horizontal scrolling at viewport widths of 320px and above. Content must reflow to fit the available width.

## Not Required

- No automated tests needed for this phase
- No CI pipeline required
- Browser rendering not checked (curl is sufficient for items 1–6; item 7 checked via browser devtools or responsive design mode)
