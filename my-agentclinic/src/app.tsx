import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { runMigrations } from "./migrate";
import { runSeed } from "./seed";
import { getDb } from "./db";
import { Home } from "./pages/Home";
import { AgentsList, AgentDetail } from "./pages/Agents";
import { AilmentsList } from "./pages/Ailments";
import { Layout } from "./components/Layout";

const app = new Hono();

// Run migrations and seed on startup
try {
  runMigrations();
  runSeed();
} catch (err) {
  console.error("Failed to initialize database:", err);
  process.exit(1);
}

app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  try {
    return c.html(<Home />);
  } catch (err) {
    console.error("Error rendering home page:", err);
    return c.text("Internal server error", 500);
  }
});

app.get("/agents", (c) => {
  try {
    return c.html(<AgentsList />);
  } catch (err) {
    console.error("Error rendering agents list:", err);
    return c.text("Internal server error", 500);
  }
});

app.get("/agents/:id", (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      c.status(404);
      return c.html(
        <Layout>
          <div class="not-found">
            <h1>404</h1>
            <p>Agent not found.</p>
            <a href="/agents">&larr; Back to agents</a>
          </div>
        </Layout>
      );
    }
    // Check existence to set the proper status code before rendering
    const db = getDb();
    const exists = db.prepare("SELECT id FROM agents WHERE id = ?").get(id);
    if (!exists) c.status(404);
    return c.html(<AgentDetail id={id} />);
  } catch (err) {
    console.error("Error rendering agent detail:", err);
    return c.text("Internal server error", 500);
  }
});

app.get("/ailments", (c) => {
  try {
    return c.html(<AilmentsList />);
  } catch (err) {
    console.error("Error rendering ailments list:", err);
    return c.text("Internal server error", 500);
  }
});

export default app;