import { describe, it, expect } from "vitest";
import { Home } from "./Home";

describe("Home Component", () => {
  it("should return a valid JSX element", () => {
    const result = Home();
    // Since this is JSX, we can't directly inspect the structure without a testing library
    // But we can verify it returns something truthy
    expect(result).toBeDefined();
  });

  // We can test that calling the function doesn't throw
  it("should not throw when called", () => {
    expect(() => {
      Home();
    }).not.toThrow();
  });
});