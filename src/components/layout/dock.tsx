"use client";

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";

import { DownloadIcon, GridIcon, HomeIcon, MailIcon } from "@/components/ui/icons";
import { sectionIds } from "@/content/site";
import { cn } from "@/lib/cn";

type Labels = { aria: string; home: string; projects: string; contact: string; cv: string };
type Props = { labels: Labels; cvHref: string };

type NavItem = {
  id: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/** Pixels of scroll needed before the dock reacts, so small jitters don't toggle it. */
const SCROLL_THRESHOLD = 6;
/** The dock always stays visible near the top of the page. */
const ALWAYS_VISIBLE_UNTIL = 240;

/** How long the dock ignores scroll after one of its links starts an anchor scroll. */
const NAVIGATION_LOCK_MS = 1400;

function useHideOnScrollDown() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const lockedUntil = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (Math.abs(delta) < SCROLL_THRESHOLD) return;
        lastY.current = y;
        if (performance.now() < lockedUntil.current) return;
        setHidden(delta > 0 && y > ALWAYS_VISIBLE_UNTIL);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /** Keeps the dock visible while it drives an anchor scroll. */
  const lock = () => {
    lockedUntil.current = performance.now() + NAVIGATION_LOCK_MS;
    setHidden(false);
  };

  return { hidden, lock };
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      // A section counts as active while it crosses the middle band of the viewport.
      { rootMargin: "-45% 0px -45% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const trackedIds = [sectionIds.top, sectionIds.projects, sectionIds.contact];

export function Dock({ labels, cvHref }: Props) {
  const { hidden, lock } = useHideOnScrollDown();
  const active = useActiveSection(trackedIds);

  const items: NavItem[] = [
    { id: sectionIds.top, label: labels.home, Icon: HomeIcon },
    { id: sectionIds.projects, label: labels.projects, Icon: GridIcon },
    { id: sectionIds.contact, label: labels.contact, Icon: MailIcon },
  ];

  return (
    <nav
      aria-label={labels.aria}
      className={cn(
        "fixed bottom-[22px] left-1/2 z-[120] max-w-[calc(100%-20px)] -translate-x-1/2 transition-[translate,opacity] duration-700 ease-out-expo max-[760px]:bottom-3.5",
        hidden && "pointer-events-none translate-y-[calc(100%+48px)] opacity-0",
      )}
    >
      <div className="flex animate-[rise-in_1s_var(--ease-out-expo)_both] items-center gap-1 rounded-full border border-line bg-dock p-1.5 shadow-soft backdrop-blur-[16px] backdrop-saturate-[1.4] [animation-delay:var(--intro-delay,2.4s)]">
        {items.map(({ id, label, Icon }) => {
          const current = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={label}
              aria-current={current ? "location" : undefined}
              onClick={lock}
              className={cn(
                "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3.5 text-sm font-medium transition-colors max-[760px]:px-2.5",
                current ? "bg-fg text-bg" : "text-fg hover:bg-bg-3",
              )}
            >
              <Icon />
              <span className="max-[760px]:sr-only">{label}</span>
            </a>
          );
        })}
        <span aria-hidden="true" className="mx-1 h-[22px] w-px bg-line" />
        <a
          href={cvHref}
          download
          className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-accent px-3.5 text-sm font-medium text-on-accent transition-colors hover:bg-fg hover:text-bg"
        >
          <DownloadIcon />
          <span>{labels.cv}</span>
        </a>
      </div>
    </nav>
  );
}
