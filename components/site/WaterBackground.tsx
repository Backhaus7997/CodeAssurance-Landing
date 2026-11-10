"use client";

import { useEffect, useRef } from "react";
import { useLiveMotion } from "@/hooks/use-live-motion";
import { createWater, pokePath, stepWater, type Water } from "@/lib/water";

// The look the user picked on the prototype (2026-11-10): densest grid, shallow waves, low intensity.
const LOOK = { spacing: 14, intensity: 0.55, depth: 0.25, camera: 700, maxSpacing: 28 };
const MINT = "103,214,158";
const LEVELS = 16; // squares are drawn in a few alpha buckets, so the canvas changes fill style rarely
const STYLES = Array.from({ length: LEVELS }, (_, i) => `rgba(${MINT},${(((i + 0.5) / LEVELS) * 0.9).toFixed(3)})`);

/**
 * Water made of small mint squares, fixed behind every page. It moves on its own (a slow swell and a
 * drop here and there), and the cursor leaves ripples that spread out and fade. Decorative only:
 * aria-hidden, never takes clicks, one still frame under reduced motion, paused while the tab is hidden.
 */
export function WaterBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const live = useLiveMotion();

  useEffect(() => {
    const canvas = ref.current;
    // A browser without 2D canvas simply shows the plain black background.
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const coarse = matchMedia("(hover: none)").matches; // touch screens: no cursor, half the frame rate
    let width = 0;
    let height = 0;
    let spacing = LOOK.spacing;
    let water: Water = createWater(1, 1);
    const pointer = { x: 0, y: 0, px: 0, py: 0, seen: false };
    const buckets = Array.from({ length: LEVELS }, () => [] as number[]);

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      water = createWater(Math.ceil(width / spacing) + 2, Math.ceil(height / spacing) + 2);
    };

    const draw = (time: number) => {
      const { cols, rows, cur } = water;
      const cx = width / 2;
      const cy = height / 2;
      const base = Math.max(2, spacing * 0.12);
      for (const bucket of buckets) bucket.length = 0;
      for (let r = 1; r < rows - 1; r++) {
        const y0 = (r - 0.5) * spacing;
        for (let c = 1; c < cols - 1; c++) {
          const x0 = (c - 0.5) * spacing;
          const i = r * cols + c;
          // a slow swell under everything so the water never looks frozen
          const swell = live ? (Math.sin(x0 * 0.008 + time * 0.7) + Math.sin(y0 * 0.011 - time * 0.55)) * 0.12 * LOOK.depth : 0;
          const h = cur[i] + swell;
          const scale = LOOK.camera / (LOOK.camera - h * 30); // higher water comes toward the viewer
          const sx = cx + (x0 - cx) * scale + (cur[i - 1] - cur[i + 1]) * 5;
          const sy = cy + (y0 - cy) * scale + (cur[i - cols] - cur[i + cols]) * 5;
          const size = base * scale * (1 + Math.max(0, h) * 0.25);
          const slope = Math.abs(cur[i - 1] - cur[i + 1]) + Math.abs(cur[i - cols] - cur[i + cols]);
          const alpha = Math.min(0.9, (0.09 + Math.max(0, h) * 0.38 + slope * 0.16) * LOOK.intensity);
          if (alpha < 0.012) continue;
          buckets[Math.min(LEVELS - 1, Math.floor((alpha / 0.9) * LEVELS))].push(sx - size / 2, sy - size / 2, size);
        }
      }
      ctx.clearRect(0, 0, width, height);
      buckets.forEach((bucket, level) => {
        if (bucket.length === 0) return;
        ctx.fillStyle = STYLES[level];
        for (let j = 0; j < bucket.length; j += 3) ctx.fillRect(bucket[j], bucket[j + 1], bucket[j + 2], bucket[j + 2]);
      });
    };

    layout();
    if (!live) {
      draw(0);
      const still = () => {
        layout();
        draw(0);
      };
      window.addEventListener("resize", still);
      return () => window.removeEventListener("resize", still);
    }

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!pointer.seen) {
        pointer.px = pointer.x;
        pointer.py = pointer.y;
        pointer.seen = true;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", layout);

    let frame = 0;
    let raf = 0;
    let lastDrop = 0;
    let slowFrames = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (coarse && ++frame % 2) return;
      const started = performance.now();
      const time = now / 1000;
      if (pointer.seen) {
        // the cursor drops energy along the path it moved since the last frame: no movement, no ripples
        const moved = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py);
        if (moved > 0) {
          const amount = Math.min(1.5, moved / 30) * 2 * LOOK.depth;
          pokePath(water, pointer.px / spacing + 0.5, pointer.py / spacing + 0.5, pointer.x / spacing + 0.5, pointer.y / spacing + 0.5, amount);
        }
        pointer.px = pointer.x;
        pointer.py = pointer.y;
      }
      if (time - lastDrop > 0.35) {
        lastDrop = time;
        const c = Math.random() * (width / spacing);
        const r = Math.random() * (height / spacing);
        pokePath(water, c, r, c, r, (0.9 + Math.random() * 0.9) * LOOK.depth);
      }
      stepWater(water);
      draw(time);
      // A slow machine gets a coarser grid instead of a choppy page.
      slowFrames = performance.now() - started > 10 ? slowFrames + 1 : 0;
      if (slowFrames > 30 && spacing < LOOK.maxSpacing) {
        spacing = Math.min(LOOK.maxSpacing, spacing * 1.4);
        slowFrames = 0;
        layout();
      }
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", layout);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [live]);

  return (
    <canvas
      ref={ref}
      data-water=""
      data-animating={live ? "true" : "false"}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
