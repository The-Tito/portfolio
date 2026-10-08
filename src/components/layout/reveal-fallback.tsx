"use client";

import { useEffect } from "react";

/**
 * Scroll reveals are pure CSS (`animation-timeline: view()`). Browsers without
 * that feature get an IntersectionObserver that toggles `.is-visible` instead,
 * so content is never left hidden. No-op when the user prefers reduced motion.
 */
export function RevealFallback() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("reveal-fallback");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-fallback");
    };
  }, []);

  return null;
}
