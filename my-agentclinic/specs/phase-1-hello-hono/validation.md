# Phase 1 — Hello Hono: Validation

## Merge Criteria

All of the following must be true before this phase can be merged into `main`:

### 1. Dev server starts without errors

```bash
npm run dev
```

Expected: The server starts and prints a message indicating it's listening (e.g., `Server is running on http://localhost:3000`). No crashes, no unhandled rejections, no import errors.

### 2. `/` route returns the expected response

```bash
curl http://localhost:3000
```

Expected:
- **HTTP status:** `200 OK`
- **Response body:** `AgentClinic is open for business`
- **Content-Type:** `text/plain; charset=UTF-8` (or equivalent)

### 3. TypeScript type-check passes

```bash
npm run typecheck
```

Expected: `tsc --noEmit` exits with code 0 and prints no errors.

### 4. No regressions

```bash
npm run build
```

Expected: `tsc` produces valid JavaScript in `dist/` with no errors.

## Manual Test Procedure

1. Ensure `node_modules` is up to date (`npm install`)
2. Run `npm run typecheck` — expect zero errors
3. Run `npm run dev` in one terminal
4. Wait for the startup message to appear
5. In a second terminal, run `curl http://localhost:3000`
6. Verify the response matches the criteria above
7. Press Ctrl+C in the dev server terminal to stop it
8. Run `npm run build` — expect zero errors and valid output in `dist/`

## What "Done" Looks Like

```text
$ curl http://localhost:3000
AgentClinic is open for business
$ npm run typecheck
<no output, exit code 0>
```

That's it. Phase 1 is intentionally small — a clean foundation for everything that follows.