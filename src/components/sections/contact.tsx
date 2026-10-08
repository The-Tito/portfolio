import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon, DownloadIcon } from "@/components/ui/icons";
import { sectionIds, site } from "@/content/site";
import { getCurrentDictionary } from "@/i18n/server";

const socials = [
  { name: "LinkedIn", href: site.links.linkedin, handle: "/in/selvas-de-leon" },
  { name: "GitHub", href: site.links.github, handle: "@The-Tito" },
  { name: "Instagram", href: site.links.instagram, handle: "@_antonio.selvas" },
] as const;

/** Contact section; the client-side form is injected so this stays a Server Component. */
export async function Contact({ form }: { form: React.ReactNode }) {
  const { locale, t } = await getCurrentDictionary();
  const contact = t.contact;

  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="border-t border-line py-[clamp(96px,11vw,176px)]"
    >
      <div className="container-page">
        <p className="mb-6 label-mono">
          <span className="text-accent-ink">05</span> · {contact.label}
        </p>
        <h2
          id="contact-title"
          className="reveal text-[clamp(52px,9vw,150px)] leading-[0.92] font-semibold tracking-[-0.055em]"
        >
          {contact.titleStrong}
          <br />
          <span className="text-subtle">{contact.titleMuted}</span>
        </h2>
        <p className="reveal mt-7 max-w-[560px] text-[clamp(17px,1.35vw,20px)] text-muted">
          {contact.lead}
        </p>

        <a
          href={`mailto:${site.email}`}
          className="group mt-10 inline-flex items-center gap-4 bg-[linear-gradient(var(--accent),var(--accent))] bg-[length:0%_2px] bg-bottom-left bg-no-repeat pb-1.5 text-[clamp(22px,3vw,44px)] tracking-[-0.03em] no-underline transition-[background-size] duration-700 ease-out-expo hover:bg-[length:100%_2px]"
        >
          {site.email}
          <ArrowUpRightIcon
            strokeWidth={1.6}
            className="size-[clamp(22px,2.6vw,38px)] transition-transform duration-500 ease-out-expo group-hover:rotate-45"
          />
        </a>

        <div className="mt-[clamp(56px,7vw,104px)] grid items-start gap-[clamp(32px,5vw,80px)] min-[761px]:grid-cols-2">
          <div className="reveal">
            <ul className="border-b border-line">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 border-t border-line py-5 text-xl tracking-[-0.02em] no-underline transition-[padding,color] duration-500 ease-out-expo hover:pl-3.5 hover:text-accent-ink"
                  >
                    {social.name}
                    <span className="sr-only"> {t.common.opensInNewTab}</span>
                    <span className="ml-auto label-mono">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
            <ButtonLink
              href={site.cv[locale]}
              download
              variant="solid"
              className="mt-8"
              icon={<DownloadIcon />}
            >
              {contact.cv}
            </ButtonLink>
          </div>
          {form}
        </div>
      </div>
    </section>
  );
}
