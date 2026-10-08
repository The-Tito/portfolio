import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  icon?: ReactNode;
  /** Visually hidden suffix announced for links that open a new tab. */
  newTabLabel?: string;
  download?: boolean;
  className?: string;
};

const base =
  "group inline-flex min-h-12 items-center gap-2.5 rounded-full border px-[22px] text-[15px] font-medium no-underline transition-[translate,background-color,border-color,color] duration-500 ease-out-expo hover:-translate-y-0.5";

const variants = {
  solid: "border-accent bg-accent text-on-accent hover:border-fg hover:bg-fg hover:text-bg",
  outline: "border-line text-fg hover:border-fg",
};

export function ButtonLink({
  href,
  children,
  variant = "outline",
  icon,
  newTabLabel,
  download,
  className,
}: Props) {
  const external = newTabLabel !== undefined;

  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(base, variants[variant], className)}
    >
      {children}
      {external && <span className="sr-only"> {newTabLabel}</span>}
      {icon && (
        <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </a>
  );
}
