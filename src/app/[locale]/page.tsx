import { locale as getLocaleParam } from "next/root-params";

import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage() {
  const locale = await getLocaleParam();
  const { meta } = await getDictionary(isLocale(locale) ? locale : "en");

  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <h1 className="text-2xl font-semibold tracking-tight">{meta.title}</h1>
    </main>
  );
}
