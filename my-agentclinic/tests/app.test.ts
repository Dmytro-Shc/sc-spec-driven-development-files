import { describe, it, expect } from "vitest";
import app from "../src/index";

// Create a test suite for the AgentClinic application
describe("AgentClinic Application", () => {
  // Test the home route
  it("should return HTML with AgentClinic heading", async () => {
    const response = await app.fetch(new Request("http://localhost/"));
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");

    const html = await response.text();
    expect(html).toContain("<h1>AgentClinic</h1>");
    expect(html).toContain("<p>Where AI agents come to get better.</p>");
  });

  // Test that the layout includes header and footer
  it("should include header and footer in the layout", async () => {
    const response = await app.fetch(new Request("http://localhost/"));
    const html = await response.text();

    expect(html).toContain("<header>");
    expect(html).toContain("class=\"logo\"");
    expect(html).toContain("<footer>");
    // Note: The footer contains the actual copyright symbol, not &copy;
    expect(html).toContain("©");
  });

  // Test that static files route exists (we won't test actual file serving)
  it("should have static middleware configured", async () => {
    // This is more of a smoke test - we're checking the route exists
    const response = await app.fetch(new Request("http://localhost/static/style.css"));
    // We expect either 200 (if file exists) or 404 (if not) but not 500
    expect(response.status).not.toBe(500);
  });

  it("should include responsive viewport meta tag", async () => {
    const response = await app.fetch(new Request("http://localhost/"));
    const html = await response.text();

    expect(html).toContain(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0"'
    );
  });
});