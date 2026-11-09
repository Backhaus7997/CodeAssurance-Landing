"use client";

import { useEffect } from "react";

// Tells the failsafe in RootDocument that the app hydrated, so reveal-on-scroll can keep content hidden until it is seen.
export function HydrationMark() {
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);
  return null;
}
