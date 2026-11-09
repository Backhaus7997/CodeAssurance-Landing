"use client";

import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

/** False on the server and during the hydration render, true afterwards: renders that depend on it never mismatch. */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

/**
 * Whether animation may run: only after hydration and only when the person has not asked for
 * reduced motion. Server, no-JS and reduced-motion renders all get the static version.
 */
export function useLiveMotion(): boolean {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  return hydrated && !reduce;
}
