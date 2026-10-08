import { sectionIds } from "@/content/site";
import { getCurrentDictionary } from "@/i18n/server";

/** Phase 1 scaffold: placeholder sections to exercise the layout chrome. Replaced in phase 2. */
export default async function HomePage() {
  const { t } = await getCurrentDictionary();

  return (
    <main id="main">
      <section id={sectionIds.top} className="grid min-h-dvh place-items-center">
        <h1 className="text-5xl font-semibold tracking-tight">{t.meta.title}</h1>
      </section>
      <section id={sectionIds.projects} className="min-h-dvh border-t border-line" />
      <section id={sectionIds.contact} className="min-h-dvh border-t border-line" />
    </main>
  );
}
