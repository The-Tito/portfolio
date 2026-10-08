import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

type Props = { locale: Locale; description: string };

/** schema.org Person, escaped against `</script>` injection as recommended by Next. */
export function PersonJsonLd({ locale, description }: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    alternateName: site.name,
    url: `${getSiteUrl()}/${locale}`,
    email: `mailto:${site.email}`,
    jobTitle: locale === "es" ? "Desarrollador Backend" : "Backend Developer",
    description,
    sameAs: Object.values(site.links),
    knowsAbout: ["Node.js", "TypeScript", "PostgreSQL", "REST APIs", "LLM integration", "Flutter"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
