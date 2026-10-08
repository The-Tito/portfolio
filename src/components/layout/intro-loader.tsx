/** Intro curtain (counter 0 → 100). Pure CSS; hidden after the first visit and with reduced motion. */
export function IntroLoader({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="loader fixed inset-0 z-[200] flex items-end justify-between bg-fg p-[clamp(20px,4vw,48px)] text-bg"
    >
      <span className="font-mono text-xs tracking-[0.08em] uppercase opacity-70">{label}</span>
      <span className="loader-count font-display text-[clamp(160px,26vw,380px)] leading-[0.78]" />
    </div>
  );
}
