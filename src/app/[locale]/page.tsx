import { Footer } from "@/components/layout/footer";
import { PersonJsonLd } from "@/components/layout/person-json-ld";
import { Contact } from "@/components/sections/contact";
import { ContactForm } from "@/components/sections/contact-form";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Profile } from "@/components/sections/profile";
import { Projects } from "@/components/sections/projects";
import { SectionIndex } from "@/components/sections/section-index";
import { Stack } from "@/components/sections/stack";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { getCurrentDictionary } from "@/i18n/server";

export default async function HomePage() {
  const { locale, t } = await getCurrentDictionary();

  return (
    <>
      <PersonJsonLd locale={locale} description={t.meta.description} />
      <main id="main">
        <Hero />
        <TechMarquee />
        <SectionIndex />
        <Profile />
        <Experience />
        <Projects />
        <Stack />
        <Contact form={<ContactForm locale={locale} copy={t.contact.form} />} />
      </main>
      <Footer />
    </>
  );
}
