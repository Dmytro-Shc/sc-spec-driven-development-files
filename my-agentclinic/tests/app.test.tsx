import { describe, it, expect } from "vitest";
import app from "../src/app";

describe("GET /", () => {
  it("returns 200 OK", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
  });

  it("returns HTML content type", async () => {
    const res = await app.request("/");
    expect(res.headers.get("content-type")).toContain("text/html");
  });

  it("contains the AgentClinic heading", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain("<h1>AgentClinic</h1>");
  });

  it("contains a tagline", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain("<p>Where AI agents come to get better.</p>");
  });

  it("links both PicoCSS and the app stylesheet", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain('href="/static/pico.min.css"');
    expect(html).toContain('href="/static/style.css"');
  });
});

describe("GET /agents", () => {
  it("returns 200 OK", async () => {
    const res = await app.request("/agents");
    expect(res.status).toBe(200);
  });

  it("returns HTML", async () => {
    const res = await app.request("/agents");
    expect(res.headers.get("content-type")).toContain("text/html");
  });

  it("lists seeded agents", async () => {
    const res = await app.request("/agents");
    const html = await res.text();
    expect(html).toContain("Claude Sonnet");
    expect(html).toContain("GPT-4o-mini");
    expect(html).toContain("Llama 3.1 8B");
  });
});

describe("GET /agents/:id", () => {
  it("returns 200 for a valid agent", async () => {
    const res = await app.request("/agents/1");
    expect(res.status).toBe(200);
  });

  it("shows agent details with ailments", async () => {
    const res = await app.request("/agents/1");
    const html = await res.text();
    expect(html).toContain("Claude Sonnet");
    expect(html).toContain("Context-Window Claustrophobia");
  });

  it("returns 404 for a non-existent agent", async () => {
    const res = await app.request("/agents/999");
    expect(res.status).toBe(404);
  });

  it("returns 404 for a non-numeric id", async () => {
    const res = await app.request("/agents/abc");
    expect(res.status).toBe(404);
  });

  it("renders 404 page within the layout for missing agent", async () => {
    const res = await app.request("/agents/999");
    const html = await res.text();
    expect(html).toContain('class="not-found"');
    expect(html).toContain("Back to agents");
  });
});

describe("GET /ailments", () => {
  it("returns 200 OK", async () => {
    const res = await app.request("/ailments");
    expect(res.status).toBe(200);
  });

  it("returns HTML", async () => {
    const res = await app.request("/ailments");
    expect(res.headers.get("content-type")).toContain("text/html");
  });

  it("lists seeded ailments with agent counts", async () => {
    const res = await app.request("/ailments");
    const html = await res.text();
    expect(html).toContain("Context-Window Claustrophobia");
    expect(html).toContain("Prompt Fatigue");
    expect(html).toContain("Hallucination Anxiety");
  });
});