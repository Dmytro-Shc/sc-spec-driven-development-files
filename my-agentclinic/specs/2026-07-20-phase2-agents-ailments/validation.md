# Phase 2 — Agents & Ailments: Validation

## How to confirm the implementation is complete and correct

Run these checks to determine whether Phase 2 is ready to merge.

---

### 1. Dev Server Starts Without Errors

```bash
npm run dev
```

- No TypeScript compilation errors
- No database migration errors
- Server starts and listens on the expected port

### 2. Home Page Still Works

Visit `http://localhost:PORT/`

- The "AgentClinic is open for business" message from Phase 1 is **not broken**
- The page now renders inside the shared layout (header, nav, footer visible)

### 3. Nav Links Present and Functional

- Nav contains links to: Home (`/`), Agents (`/agents`), Ailments (`/ailments`)
- All links render as clickable HTML `<a>` elements (no client-side routing)
- Clicking each link navigates to the correct page

### 4. `/agents` — Agent Listing Page

- Lists all seeded agents (name, model type, status)
- Each agent entry is a link to `/agents/:id`
- Page renders inside the shared layout

### 5. `/agents/:id` — Single Agent Profile

- Opens a valid agent ID → shows name, model type, status, and linked ailments
- Opens an invalid agent ID (e.g., `/agents/999`) → returns a 404 response
- Each linked ailment is displayed as text (at minimum; links to `/ailments` are nice-to-have)

### 6. `/ailments` — Ailment Listing Page

- Lists all seeded ailments (name, description)
- Shows the count of affected agents per ailment
- Page renders inside the shared layout

### 7. Database Schema

- `data/agentclinic.db` exists after first server start
- Tables present: `agents`, `ailments`, `agent_ailments`
- Migrations are tracked (e.g., a `migrations` tracking table or file-based check)
- Re-running the seed script does not duplicate data (idempotent)

### 8. CSS & Responsive Layout (PicoCSS)

- Open the app at 320px viewport width → no horizontal scroll, content is readable
- Expand to 768px → layout enhances via PicoCSS container/grid responsiveness
- Expand to 1200px+ → layout is comfortable with max-width constraint
- PicoCSS is loaded from the local npm install (not from a CDN)
- The app-specific stylesheet (`src/style.css`) is loaded after PicoCSS and overrides theme tokens via `--pico-*` custom properties
- No additional CSS framework is present

### 9. TypeScript Integrity

```bash
npx tsc --noEmit
```

- No TypeScript errors
- No `any` types in database or route code

### 10. Merge Checklist

- [ ] All validation checks above pass
- [ ] Code reviewed (either by another developer or via AI code review)
- [ ] Branch is up to date with `main` (or base branch)
- [ ] This spec directory (`specs/2026-07-20-phase2-agents-ailments/`) is committed alongside the implementation