import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { sectionIds } from "@/content/site";
import { getCurrentDictionary } from "@/i18n/server";

import { SystemDiagram } from "./system-diagram";

/** One masked line of the headline; `index` staggers its entrance (phase 3 motion). */
function Line({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <span
      className="hero-line block overflow-hidden pb-[0.06em]"
      style={{ "--line": index } as React.CSSProperties}
    >
      <span className="inline-block">{children}</span>
    </span>
  );
}

export async function Hero() {
  const { t } = await getCurrentDictionary();
  const hero = t.hero;

  return (
    <section
      id={sectionIds.top}
      className="relative flex min-h-dvh items-center pt-[140px] pb-[120px] max-[760px]:items-start max-[760px]:pt-[120px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_70%_60%_at_72%_45%,#000_10%,transparent_72%)]"
      />

      <div className="relative container-page grid items-center gap-[clamp(32px,5vw,80px)] min-[761px]:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div>
          <h1 className="text-[clamp(38px,4.4vw,68px)] leading-none font-semibold tracking-[-0.045em]">
            <Line index={0}>{hero.line1}</Line>
            <Line index={1}>{hero.line2}</Line>
            <Line index={2}>
              <span className="text-subtle">{hero.line3Before} </span>
              <span className="text-accent-ink">{hero.line3Accent}</span>
            </Line>
            <Line index={3}>
              <span className="text-subtle">{hero.line4}</span>
            </Line>
          </h1>

          <p className="hero-fade mt-9 max-w-[560px] text-[clamp(17px,1.35vw,20px)] leading-[1.55] text-muted">
            {hero.lead}
          </p>

          <div className="hero-fade mt-10 flex flex-wrap gap-3 [--fade:1]">
            <ButtonLink
              href={`#${sectionIds.projects}`}
              variant="solid"
              icon={<ArrowUpRightIcon />}
            >
              {hero.ctaProjects}
            </ButtonLink>
            <ButtonLink href={`#${sectionIds.contact}`}>{hero.ctaContact}</ButtonLink>
          </div>
        </div>

        <div className="hero-fade [--fade:2]">
          <SystemDiagram nodes={hero.diagram} />
          <p className="mt-5 flex items-center gap-2.5 label-mono">
            <span
              aria-hidden="true"
              className="size-2 animate-[pulse-ring_2.4s_ease-out_infinite] rounded-full bg-ok"
            />
            {hero.status}
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 max-[760px]:hidden"
      >
        <span className="label-mono">{hero.scroll}</span>
        <span className="scroll-cue relative block h-12 w-px overflow-hidden bg-line" />
      </div>
    </section>
  );
}
