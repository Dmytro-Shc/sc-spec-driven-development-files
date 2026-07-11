# Phase 1 — Hello Hono: Implementation Plan

## Task Group 1 — Install Dependencies

- [ ] 1.1 Install `hono` as a runtime dependency (`npm install hono`)
- [ ] 1.2 Install `tsx` as a dev dependency (`npm install -D tsx`)

## Task Group 2 — Configure Scripts

- [ ] 2.1 Add `"dev": "tsx watch src/index.ts"` to `package.json` scripts (auto-restart on file changes)
- [ ] 2.2 Add `"typecheck": "tsc --noEmit"` to `package.json` scripts (verify types without emitting output)
- [ ] 2.3 Verify `tsc --noEmit` passes on the current codebase before any route changes (baseline check)

## Task Group 3 — Build the Home Page (`src/index.ts`)

- [ ] 3.1 Replace `src/index.ts` contents with a Hono app:
      - Import `Hono` from `hono`
      - Import `serve` from `@hono/node-server`
      - Create a `new Hono()` instance
      - Define a `GET /` handler that returns an inline HTML page via `c.html()`
      - Start the server listening on port `3000` with a startup log message

- [ ] 3.2 The home page HTML must include, at minimum:
      - An `<h1>` with the clinic name: **AgentClinic**
      - A subtitle or tagline conveying the mission (e.g., _"Wellness for AI agents"_)
      - A welcome message that fits the project's whimsical tone
      - A simple `<footer>` with the text _"AgentClinic — caring for the agents that power your world"_

- [ ] 3.3 Run `tsc --noEmit` and confirm zero type errors

<details>
<summary>Expected home page structure (reference)</summary>

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AgentClinic</title>
</head>
<body>
  <h1>AgentClinic</h1>
  <p>Wellness for AI agents</p>
  <p>Welcome. The therapists are in.</p>
  <footer>AgentClinic — caring for the agents that power your world</footer>
</body>
</html>
```

*Inline HTML only — no external CSS, JS, or JSX. Shared layout comes in Phase 2.*
</details>

## Task Group 4 — Smoke Test

- [ ] 4.1 Start the dev server (`npm run dev`)
- [ ] 4.2 Open `http://localhost:3000` in a browser (or `curl` with no additional flags)
- [ ] 4.3 Verify the page renders:
      - The `<h1>` says **AgentClinic**
      - The page has a tagline and welcome message
      - The footer is present
      - The HTTP response is `200 OK` with `Content-Type: text/html`
- [ ] 4.4 Stop the dev server (Ctrl+C)

## Dependencies Between Groups

```
Group 1 (deps) → Group 2 (scripts) → Group 3 (home page) → Group 4 (smoke test)
```

Each group must be completed before the next group begins.