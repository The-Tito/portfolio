"use client";

import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { saveLocalePreference } from "@/lib/locale-preference";

type Props = { current: Locale; label: string };

/**
 * ES / EN segmented switch. Stores the explicit choice in a cookie so the proxy
 * respects it on later visits to `/`. Each locale has its own root layout, so a
 * plain anchor (full navigation) is the correct primitive here.
 */
export function LocaleSwitch({ current, label }: Props) {
  return (
    <nav aria-label={label} className="flex rounded-full bg-bg-3 p-[3px]">
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <a
            key={locale}
            href={`/${locale}`}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? "true" : undefined}
            onClick={() => saveLocalePreference(locale)}
            className={cn(
              "inline-grid h-[38px] min-w-11 place-items-center rounded-full font-mono text-xs tracking-[0.06em] uppercase transition-colors",
              active ? "bg-bg text-fg" : "text-muted hover:text-fg",
            )}
          >
            {locale}
          </a>
        );
      })}
    </nav>
  );
}
