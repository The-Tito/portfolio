import { Fragment } from "react";

import { marqueeTech } from "@/content/stack";
import { getCurrentDictionary } from "@/i18n/server";
import { cn } from "@/lib/cn";

function Set({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex items-center gap-11 pr-11">
      {marqueeTech.map((name, i) => (
        <Fragment key={name}>
          <span
            className={cn(
              "text-[clamp(30px,4.4vw,64px)] leading-none font-medium tracking-[-0.035em] whitespace-nowrap",
              i % 2 === 1 && "text-outline",
            )}
          >
            {name}
          </span>
          <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-accent" />
        </Fragment>
      ))}
    </div>
  );
}

export async function TechMarquee() {
  const { t } = await getCurrentDictionary();

  return (
    <div
      aria-label={t.marquee.aria}
      role="region"
      className="marquee overflow-hidden border-y border-line py-[26px]"
    >
      <div className="marquee-track flex w-max">
        <Set />
        <Set hidden />
      </div>
    </div>
  );
}
