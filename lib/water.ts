// A water surface on a grid, simulated with the discrete 2D wave equation. Used by the site's
// background: every cell is one square, and its height pushes the square toward the viewer.

/** speed² of the waves (stable below 0.5) and how much energy each step keeps. */
export const WAVE = { speed: 0.2, damping: 0.986 } as const;

export type Water = { cols: number; rows: number; cur: Float32Array; prev: Float32Array; next: Float32Array };

export function createWater(cols: number, rows: number): Water {
  const size = cols * rows;
  return { cols, rows, cur: new Float32Array(size), prev: new Float32Array(size), next: new Float32Array(size) };
}

function poke(w: Water, c: number, r: number, amount: number) {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const cc = c + dc;
      const rr = r + dr;
      // the border stays still, so waves never wrap around the screen
      if (cc > 0 && cc < w.cols - 1 && rr > 0 && rr < w.rows - 1) w.cur[rr * w.cols + cc] += dr === 0 && dc === 0 ? amount : amount / 2;
    }
  }
}

/** Drops `amount` of energy on every cell along the segment from (c0, r0) to (c1, r1), in grid units. */
export function pokePath(w: Water, c0: number, r0: number, c1: number, r1: number, amount: number) {
  const steps = Math.max(1, Math.ceil(Math.hypot(c1 - c0, r1 - r0)));
  for (let s = 0; s <= steps; s++) {
    poke(w, Math.round(c0 + ((c1 - c0) * s) / steps), Math.round(r0 + ((r1 - r0) * s) / steps), amount);
  }
}

export function stepWater(w: Water) {
  const { cols, rows, cur, prev, next } = w;
  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      const i = r * cols + c;
      const laplacian = cur[i - 1] + cur[i + 1] + cur[i - cols] + cur[i + cols] - 4 * cur[i];
      next[i] = (2 * cur[i] - prev[i] + WAVE.speed * laplacian) * WAVE.damping;
    }
  }
  w.prev = cur;
  w.cur = next;
  w.next = prev;
}
