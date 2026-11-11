/**
 * Which step a looping visual shows after `elapsed` ms: one step every `stepMs` up to `count`, then it holds
 * the last step for `pauseMs` and starts over.
 */
export function stepAt(elapsed: number, count: number, stepMs: number, pauseMs: number): number {
  const cycle = count * stepMs + pauseMs;
  const t = elapsed % cycle;
  return Math.min(count, Math.floor(t / stepMs));
}
