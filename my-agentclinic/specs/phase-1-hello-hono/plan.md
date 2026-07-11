# Phase 1 — Hello Hono: Implementation Plan

## Task Group 1 — Install Dependencies

- [ ] 1.1 Install `hono` as a runtime dependency (`npm install hono`)
- [ ] 1.2 Install `tsx` as a dev dependency (`npm install -D tsx`)

## Task Group 2 — Configure Scripts

- [ ] 2.1 Add `"dev": "tsx watch src/index.ts"` to `package.json` scripts (auto-restart on file changes)
- [ ] 2.2 Add `"typecheck": "tsc --noEmit"` to `package.json` scripts (verify types without emitting output)
- [ ] 2.3 Verify `tsc --noEmit` passes on the current codebase before any route changes (baseline check)

## Task Group 3 — Implement the `/` Route

- [ ] 3.1 Replace `src/index.ts` contents with a Hono app:
      - Import `Hono` from `hono`
      - Import `serve` from `@hono/node-server` (or use the Node.js adapter)
      - Create a `new Hono()` instance
      - Define a `GET /` handler returning `c.text('AgentClinic is open for business')`
      - Start the server listening on port `3000` with a startup log message
- [ ] 3.2 Run `tsc --noEmit` and confirm zero type errors

## Task Group 4 — Smoke Test

- [ ] 4.1 Start the dev server (`npm run dev`)
- [ ] 4.2 In a separate terminal, `curl http://localhost:3000` and verify the response body is `AgentClinic is open for business`
- [ ] 4.3 Confirm the server responds with HTTP `200 OK`
- [ ] 4.4 Stop the dev server (Ctrl+C)

## Dependencies Between Groups

```
Group 1 (deps) → Group 2 (scripts) → Group 3 (route) → Group 4 (smoke test)
```

Each group must be completed before the next group begins.