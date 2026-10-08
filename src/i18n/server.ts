import "server-only";

import { notFound } from "next/navigation";
import { locale as localeParam } from "next/root-params";

import { isLocale, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";

/** Current locale from the root `[locale]` segment; unknown values render the 404 page. */
export async function getCurrentLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!isLocale(value)) notFound();
  return value;
}

export async function getCurrentDictionary(): Promise<{ locale: Locale; t: Dictionary }> {
  const locale = await getCurrentLocale();
  return { locale, t: await getDictionary(locale) };
}
