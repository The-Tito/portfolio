import type { ReactNode } from "react";

type Props = { number: string; label: string; children: ReactNode };

/** Two-column section opener: big Six Caps number + label on the left, title on the right. */
export function SectionHeader({ number, label, children }: Props) {
  return (
    <div className="mb-[clamp(48px,6vw,88px)] grid items-end gap-[clamp(24px,4vw,64px)] min-[761px]:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
      <div>
        <span
          aria-hidden="true"
          className="block font-display text-[clamp(120px,13vw,210px)] leading-[0.78] text-accent-ink"
        >
          {number}
        </span>
        <p className="mt-4 label-mono">{label}</p>
      </div>
      {children}
    </div>
  );
}

export function SectionTitle({ strong, muted }: { strong: string; muted?: string }) {
  return (
    <h2 className="text-[clamp(36px,4.6vw,72px)] leading-none font-semibold tracking-[-0.045em]">
      {strong}
      {muted && <span className="text-subtle"> {muted}</span>}
    </h2>
  );
}
