import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { runMigrations } from "./migrate";
import { runSeed } from "./seed";
import { getDb } from "./db";
import { Home } from "./pages/Home";
import { AgentsList, AgentDetail } from "./pages/Agents";
import { AilmentsList } from "./pages/Ailments";

const app = new Hono();

// Run migrations and seed on startup
runMigrations();
runSeed();

app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  return c.html(<Home />);
});

app.get("/agents", (c) => {
  return c.html(<AgentsList />);
});

app.get("/agents/:id", (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.notFound();
  const db = getDb();
  const agent = db.prepare("SELECT id FROM agents WHERE id = ?").get(id);
  if (!agent) {
    c.status(404);
    return c.html(<AgentDetail id={id} />);
  }
  return c.html(<AgentDetail id={id} />);
});

app.get("/ailments", (c) => {
  return c.html(<AilmentsList />);
});

export default app;