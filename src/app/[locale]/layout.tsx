import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Six_Caps } from "next/font/google";

import { Dock } from "@/components/layout/dock";
import { IntroLoader } from "@/components/layout/intro-loader";
import { RevealFallback } from "@/components/layout/reveal-fallback";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ThemeScript } from "@/components/layout/theme-script";
import { TopBar } from "@/components/layout/top-bar";
import { site } from "@/content/site";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { getCurrentDictionary } from "@/i18n/server";
import { getSiteUrl } from "@/lib/site-url";

import "@/styles/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const sixCaps = Six_Caps({ variable: "--font-six-caps", subsets: ["latin"], weight: "400" });

const ogLocale: Record<Locale, string> = { es: "es_MX", en: "en_US" };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getCurrentDictionary();

  return {
    metadataBase: new URL(getSiteUrl()),
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: site.name }],
    creator: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      url: `/${locale}`,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
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
        <RevealFallback />
        <TopBar
          locale={locale}
          labels={{
            brand: t.common.brand,
            language: t.common.language,
            theme: t.common.theme,
          }}
        />
        {children}
        <Dock labels={t.nav} cvHref={site.cv[locale]} />
        {/* Vercel serves these endpoints only on its platform; skip them elsewhere. */}
        {process.env.VERCEL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
