import Image from "next/image";

import { Chip, ChipList } from "@/components/ui/chip";
import { SectionHeader, SectionTitle } from "@/components/ui/section-header";
import { experiences, type Experience as ExperienceEntry } from "@/content/experience";
import { sectionIds } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { getCurrentDictionary } from "@/i18n/server";

type Copy = Dictionary["experience"]["items"][ExperienceEntry["slug"]];

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-bg-2 shadow-soft">
      <div
        className="flex items-center gap-[7px] border-b border-line px-3.5 py-[11px]"
        aria-hidden="true"
      >
        <i className="size-[9px] rounded-full bg-bg-3" />
        <i className="size-[9px] rounded-full bg-bg-3" />
        <i className="size-[9px] rounded-full bg-bg-3" />
        <span className="ml-3 label-mono">{url}</span>
      </div>
      {children}
    </div>
  );
}

function Entry({ entry, copy }: { entry: ExperienceEntry; copy: Copy }) {
  return (
    <article className="grid gap-[clamp(24px,4vw,64px)] min-[761px]:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
      <div>
        <div className="reveal min-[761px]:sticky min-[761px]:top-[120px]">
          <p className="label-mono">{copy.period}</p>
          <p className="mt-2.5 text-[15px] text-muted">{copy.type}</p>
          <ChipList className="mt-6">
            {entry.stack.map((tech) => (
              <Chip key={tech.name} core={tech.core}>
                {tech.name}
              </Chip>
            ))}
          </ChipList>
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="timeline absolute top-0 bottom-0 -left-7 w-px bg-line max-[760px]:hidden"
        >
          <span className="timeline-fill absolute inset-0 origin-top bg-accent" />
          <span className="absolute -top-px -left-[5px] size-[11px] rounded-full bg-accent" />
        </div>

        <h3 className="reveal text-[clamp(30px,3.4vw,52px)] leading-[1.02] font-semibold tracking-[-0.04em]">
          {copy.role}
        </h3>
        <p className="reveal mt-3.5 text-lg">
          {copy.company} <span className="text-muted">— {copy.product}</span>
        </p>
        <p className="reveal mt-[18px] max-w-[640px] text-muted">{copy.summary}</p>

        <ol className="reveal mt-8">
          {copy.highlights.map((item, i) => (
            <li
              key={item.title}
              className="grid grid-cols-[40px_1fr] gap-3 border-t border-line py-4 text-base text-muted"
            >
              <span className="label-mono">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <b className="font-medium text-fg">{item.title}</b> {item.text}
              </span>
            </li>
          ))}
        </ol>

        {entry.images && (
          <figure className="reveal mt-12">
            <div className="relative min-[761px]:pr-[12%]">
              <div className="parallax">
                <BrowserFrame url={entry.images.url}>
                  <Image
                    src={entry.images.desktop.src}
                    width={entry.images.desktop.width}
                    height={entry.images.desktop.height}
                    alt={copy.imageAltDesktop}
                    sizes="(min-width: 1080px) 760px, 100vw"
                    className="h-auto w-full"
                  />
                </BrowserFrame>
              </div>
              <div className="float-soft absolute right-0 -bottom-12 w-[24%] min-w-[120px] overflow-hidden rounded-[28px] border-[6px] border-bg-3 shadow-soft max-[760px]:-bottom-9 max-[760px]:w-[34%]">
                <Image
                  src={entry.images.mobile.src}
                  width={entry.images.mobile.width}
                  height={entry.images.mobile.height}
                  alt={copy.imageAltMobile}
                  sizes="240px"
                  className="h-auto w-full"
                />
              </div>
            </div>
            <figcaption className="mt-[72px] label-mono">{copy.caption}</figcaption>
          </figure>
        )}
      </div>
    </article>
  );
}

export async function Experience() {
  const { t } = await getCurrentDictionary();
  const section = t.experience;

  return (
    <section
      id={sectionIds.experience}
      aria-labelledby="experience-title"
      className="border-t border-line py-[clamp(96px,11vw,176px)]"
    >
      <div className="container-page">
        <SectionHeader number="02" label={section.label}>
          <div id="experience-title" className="reveal">
            <SectionTitle strong={section.titleStrong} muted={section.titleMuted} />
          </div>
        </SectionHeader>

        <div className="grid gap-24">
          {experiences.map((entry) => (
            <Entry key={entry.slug} entry={entry} copy={section.items[entry.slug]} />
          ))}
        </div>
      </div>
    </section>
  );
}
