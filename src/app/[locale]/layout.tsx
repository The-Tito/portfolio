import type { Metadata } from "next";
import { Geist, Geist_Mono, Six_Caps } from "next/font/google";

import { Dock } from "@/components/layout/dock";
import { IntroLoader } from "@/components/layout/intro-loader";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ThemeScript } from "@/components/layout/theme-script";
import { TopBar } from "@/components/layout/top-bar";
import { site } from "@/content/site";
import { locales } from "@/i18n/config";
import { getCurrentDictionary } from "@/i18n/server";

import "@/styles/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const sixCaps = Six_Caps({ variable: "--font-six-caps", subsets: ["latin"], weight: "400" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getCurrentDictionary();
  return { title: t.meta.title, description: t.meta.description };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const { locale, t } = await getCurrentDictionary();

  return (
    <html
      lang={locale}
      // The theme script adds `dark` / `loader-seen` before hydration.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${sixCaps.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[300] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.common.skipToContent}
        </a>
        <IntroLoader label={t.common.loader} />
        <ScrollProgress />
        <SmoothScroll />
        <TopBar
          locale={locale}
          labels={{
            brand: t.common.brand,
            home: t.nav.home,
            language: t.common.language,
            theme: t.common.theme,
          }}
        />
        {children}
        <Dock labels={t.nav} cvHref={site.cv[locale]} />
      </body>
    </html>
  );
}
