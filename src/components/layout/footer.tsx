import { sectionIds, site } from "@/content/site";
import { getCurrentDictionary } from "@/i18n/server";

const linkClass = "text-muted no-underline transition-colors hover:text-fg";

export async function Footer() {
  const { locale, t } = await getCurrentDictionary();
  const footer = t.footer;

  const columns = [
    {
      title: footer.sections,
      links: [
        { label: t.nav.home, href: `#${sectionIds.top}` },
        { label: t.index.items.profile, href: `#${sectionIds.profile}` },
        { label: t.index.items.experience, href: `#${sectionIds.experience}` },
        { label: t.index.items.projects, href: `#${sectionIds.projects}` },
        { label: t.index.items.stack, href: `#${sectionIds.stack}` },
      ],
    },
    {
      title: footer.social,
      links: [
        { label: "LinkedIn", href: site.links.linkedin, external: true },
        { label: "GitHub", href: site.links.github, external: true },
        { label: "Instagram", href: site.links.instagram, external: true },
      ],
    },
    {
      title: footer.contact,
      links: [
        { label: footer.email, href: `mailto:${site.email}` },
        { label: t.nav.cv, href: site.cv[locale], download: true },
      ],
    },
  ];

  return (
    <footer className="border-t border-line pb-[140px]">
      <div className="container-page">
        <div className="grid gap-8 py-[clamp(48px,6vw,80px)] min-[761px]:grid-cols-2 min-[1081px]:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <p className="text-[22px] font-semibold tracking-[-0.02em]">{site.name}</p>
            <p className="mt-2 max-w-[320px] text-[15px] text-muted">{footer.role}</p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3.5 label-mono">{column.title}</h2>
              <ul className="grid gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={linkClass}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      {...("download" in link && link.download ? { download: true } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-line pt-6">
          <p className="label-mono">{footer.rights}</p>
          <a href={`#${sectionIds.top}`} className="label-mono no-underline hover:text-fg">
            {footer.backToTop} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
