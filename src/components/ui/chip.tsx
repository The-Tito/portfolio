import { cn } from "@/lib/cn";

type Props = { children: string; core?: boolean };

export function Chip({ children, core }: Props) {
  return (
    <li
      className={cn(
        "inline-flex min-h-9 items-center gap-2 rounded-full border border-line px-3.5 text-sm text-fg transition-[translate,border-color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-accent",
        core && "before:size-1.5 before:rounded-full before:bg-accent before:content-['']",
      )}
    >
      {children}
    </li>
  );
}

export function ChipList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={cn("flex flex-wrap gap-2", className)}>{children}</ul>;
}
