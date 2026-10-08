/** Reading progress bar driven by `animation-timeline: scroll()` — no JavaScript. */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress fixed inset-x-0 top-0 z-[150] h-0.5 bg-accent"
    />
  );
}
