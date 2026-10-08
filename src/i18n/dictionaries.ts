import "server-only";

import type { Locale } from "./config";
import type es from "./messages/es.json";

export type Dictionary = typeof es;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("./messages/es.json").then((m) => m.default),
  en: () => import("./messages/en.json").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
