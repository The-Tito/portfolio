import type { Locale } from "@/i18n/config";
import { sectionIds } from "@/content/site";

import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

type Props = {
  locale: Locale;
  labels: { brand: string; language: string; theme: string };
};

export function TopBar({ locale, labels }: Props) {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="container-page flex h-[84px] items-center justify-between gap-4">
        <a href={`#${sectionIds.top}`} className="label-mono no-underline">
          {labels.brand}
        </a>
        <div className="flex items-center gap-2">
          <LocaleSwitch current={locale} label={labels.language} />
          <ThemeToggle label={labels.theme} />
        </div>
      </div>
    </header>
  );
}
