"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = { index: number; labelledBy: string; className?: string; children: ReactNode };

/**
 * Wraps a project card and exposes its rendered height as `--card-h`, so the
 * sticky offset (see `.project-card` in globals.css) always lets the whole card
 * scroll into view before it pins — regardless of copy length or viewport.
 */
export function StickyCard({ index, labelledBy, className, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize ?? el.offsetHeight;
      el.style.setProperty("--card-h", `${Math.ceil(height)}px`);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      aria-labelledby={labelledBy}
      style={{ "--stack-index": index } as CSSProperties}
      className={`project-card ${className ?? ""}`}
    >
      {children}
    </article>
  );
}
