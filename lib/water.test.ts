import { describe, expect, it } from "vitest";
import { createWater, pokePath, stepWater, WAVE } from "./water";

const maxAbs = (a: Float32Array) => a.reduce((m, v) => Math.max(m, Math.abs(v)), 0);

describe("water simulation", () => {
  it("starts flat", () => {
    const w = createWater(20, 10);
    expect(maxAbs(w.cur)).toBe(0);
    expect(w.cur).toHaveLength(200);
  });

  it("a poke spreads outward as a ripple", () => {
    const w = createWater(41, 41);
    pokePath(w, 20, 20, 20, 20, 1);
    const far = 20 * 41 + 26; // six cells to the right of the poke
    expect(w.cur[far]).toBe(0);
    for (let i = 0; i < 40; i++) stepWater(w);
    expect(Math.abs(w.cur[far])).toBeGreaterThan(0.001);
  });

  it("ripples die out instead of growing", () => {
    const w = createWater(41, 41);
    pokePath(w, 20, 20, 20, 20, 1);
    // A poke is a kick, so the first crests can rise above the poke itself; after that energy only drains.
    let early = 0;
    let late = 0;
    for (let i = 0; i < 3000; i++) {
      stepWater(w);
      if (i < 100) early = Math.max(early, maxAbs(w.cur));
      if (i >= 1500) late = Math.max(late, maxAbs(w.cur));
    }
    expect(late).toBeLessThan(early / 10);
    expect(maxAbs(w.cur)).toBeLessThan(0.01);
    expect(w.cur.every((v) => Number.isFinite(v))).toBe(true);
  });

  it("keeps the border still, so waves never wrap around", () => {
    const w = createWater(21, 21);
    pokePath(w, 1, 1, 19, 19, 1);
    for (let i = 0; i < 50; i++) stepWater(w);
    for (let c = 0; c < 21; c++) {
      expect(w.cur[c]).toBe(0);
      expect(w.cur[20 * 21 + c]).toBe(0);
    }
  });

  it("a moving cursor leaves energy along its whole path, not only at the end", () => {
    const w = createWater(60, 20);
    pokePath(w, 5, 10, 50, 10, 1);
    for (const c of [5, 20, 35, 50]) expect(w.cur[10 * 60 + c]).toBeGreaterThan(0);
  });

  it("ignores points outside the grid", () => {
    const w = createWater(10, 10);
    pokePath(w, -50, -50, -40, -40, 1);
    expect(maxAbs(w.cur)).toBe(0);
  });

  it("uses a stable wave speed", () => {
    expect(WAVE.speed).toBeGreaterThan(0);
    expect(WAVE.speed).toBeLessThan(0.5);
    expect(WAVE.damping).toBeLessThan(1);
  });
});
