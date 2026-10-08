import Image from "next/image";
import { Fragment } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { SectionHeader, SectionTitle } from "@/components/ui/section-header";
import { featuredProjects, otherProjects, type FeaturedProject } from "@/content/projects";
import { sectionIds } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { getCurrentDictionary } from "@/i18n/server";

import { StickyCard } from "./sticky-card";

type CardCopy = {
  tag: string;
  tagline: string;
  description: string;
  facts: { label: string; value: string }[];
  highlights: string[];
  links: Record<string, string>;
  imageAlt: string;
  secondaryImageAlt?: string;
};

type CardProps = {
  project: FeaturedProject;
  copy: CardCopy;
  index: number;
  labels: { architecture: string; newTab: string };
};

function Architecture({ steps, label }: { steps: readonly string[]; label: string }) {
  return (
    <ol aria-label={label} className="mb-[22px] flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <Fragment key={step}>
          {i > 0 && <li aria-hidden="true" className="pipe h-0.5 w-[34px] shrink-0" />}
          <li className="rounded-[10px] border border-line bg-bg px-3 py-2 font-mono text-xs whitespace-nowrap">
            {step}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

function ProjectCard({ project, copy, index, labels }: CardProps) {
  const number = String(index + 1).padStart(2, "0");
  const headingId = `project-${project.slug}`;

  return (
    <StickyCard
      index={index}
      labelledBy={headingId}
      className="mb-14 grid gap-[clamp(28px,4vw,64px)] rounded-[30px] border border-line bg-bg-2 p-[clamp(22px,3.4vw,48px)] shadow-soft max-[760px]:rounded-[22px] min-[1081px]:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
    >
      <div>
        <p className="flex items-center gap-2 label-mono">
          <i
            aria-hidden="true"
            className="size-2.5 rounded-[3px]"
            style={{ background: project.color }}
          />
          {number} · {copy.tag}
        </p>
        <h3
          id={headingId}
          className="mt-[22px] text-[clamp(44px,5vw,76px)] leading-[0.95] font-semibold tracking-[-0.055em]"
        >
          {project.name}
        </h3>
        <p className="mt-3.5 text-[clamp(18px,1.6vw,22px)] tracking-[-0.01em]">{copy.tagline}</p>
        <p className="mt-[18px] max-w-[520px] text-base text-muted">{copy.description}</p>

        <dl className="mt-7 grid grid-cols-3 gap-3 border-y border-line py-[18px] max-[760px]:grid-cols-2">
          {copy.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="label-mono">{fact.label}</dt>
              <dd className="mt-1.5 text-[15px]">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-[22px] grid gap-2.5 text-[15px] text-muted">
          {copy.highlights.map((item) => (
            <li
              key={item}
              className="grid grid-cols-[18px_1fr] gap-2.5 before:mt-[9px] before:size-1.5 before:rounded-full before:bg-accent before:content-['']"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {project.links.map((link) => (
            <ButtonLink
              key={String(link.key)}
              href={link.href}
              variant={link.primary ? "solid" : "outline"}
              icon={link.primary ? <ArrowUpRightIcon /> : undefined}
              newTabLabel={labels.newTab}
            >
              {copy.links[String(link.key)]}
            </ButtonLink>
          ))}
        </div>
      </div>

      <div className="group relative self-center max-[1080px]:order-first">
        {project.architecture && (
          <Architecture steps={project.architecture} label={labels.architecture} />
        )}
        <div className="overflow-hidden rounded-2xl border border-line shadow-soft">
          <Image
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            alt={copy.imageAlt}
            sizes="(min-width: 1080px) 640px, 100vw"
            className="h-auto w-full transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
        {project.secondaryImage && copy.secondaryImageAlt && (
          <div className="float-soft absolute -right-[4%] -bottom-[10%] w-[58%] rotate-[2.5deg] overflow-hidden rounded-[14px] border border-line shadow-soft max-[760px]:w-[52%]">
            <Image
              src={project.secondaryImage.src}
              width={project.secondaryImage.width}
              height={project.secondaryImage.height}
              alt={copy.secondaryImageAlt}
              sizes="(min-width: 1080px) 380px, 50vw"
              className="h-auto w-full"
            />
          </div>
        )}
      </div>
    </StickyCard>
  );
}

function OtherProjects({ t }: { t: Dictionary["projects"] }) {
  return (
    <div className="mt-[clamp(64px,8vw,120px)]">
      <h3 className="mb-5 label-mono">{t.othersLabel}</h3>
      <ul className="border-b border-line">
        {otherProjects.map((project, i) => {
          const copy = t.others[project.slug];
          return (
            <li
              key={project.slug}
              className="grid grid-cols-[56px_minmax(0,1.2fr)_minmax(0,1.6fr)_minmax(0,1.1fr)_70px] items-center gap-5 border-t border-line px-2 py-6 transition-[background-color,padding] duration-500 ease-out-expo hover:bg-bg-2 hover:px-5 max-[1080px]:grid-cols-[44px_minmax(0,1fr)_minmax(0,1fr)] max-[760px]:grid-cols-[36px_minmax(0,1fr)] max-[760px]:px-1"
            >
              <span className="label-mono">
                {String(featuredProjects.length + i + 1).padStart(2, "0")}
              </span>
              <h4 className="text-[clamp(20px,1.9vw,26px)] font-medium tracking-[-0.025em]">
                {copy.name}
              </h4>
              <p className="text-[15px] text-muted max-[760px]:col-start-2">{copy.description}</p>
              <p className="text-[15px] text-muted max-[1080px]:hidden">{project.stack}</p>
              <span className="label-mono max-[1080px]:hidden">{project.year}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function Projects() {
  const { t } = await getCurrentDictionary();
  const section = t.projects;

  return (
    <section
      id={sectionIds.projects}
      aria-labelledby="projects-title"
      className="border-t border-line py-[clamp(96px,11vw,176px)]"
    >
      <div className="container-page">
        <SectionHeader number="03" label={section.label}>
          <div id="projects-title" className="reveal">
            <SectionTitle strong={section.title} />
          </div>
        </SectionHeader>

        <div>
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              copy={section.items[project.slug]}
              index={i}
              labels={{ architecture: section.architectureAria, newTab: t.common.opensInNewTab }}
            />
          ))}
        </div>

        <OtherProjects t={section} />
      </div>
    </section>
  );
}
