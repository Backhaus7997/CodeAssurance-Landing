import { describe, expect, it } from "vitest";
import { stepAt } from "./stepper";

describe("stepAt", () => {
  it("starts at 0 and advances one step per interval", () => {
    expect(stepAt(0, 4, 500, 1500)).toBe(0);
    expect(stepAt(499, 4, 500, 1500)).toBe(0);
    expect(stepAt(500, 4, 500, 1500)).toBe(1);
    expect(stepAt(2000, 4, 500, 1500)).toBe(4);
  });

  it("holds the last step during the pause, then starts over", () => {
    expect(stepAt(3400, 4, 500, 1500)).toBe(4);
    expect(stepAt(3500, 4, 500, 1500)).toBe(0);
    expect(stepAt(4000, 4, 500, 1500)).toBe(1);
  });
});
