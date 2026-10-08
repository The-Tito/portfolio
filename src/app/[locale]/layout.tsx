import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { locale as getLocaleParam } from "next/root-params";

import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import "@/styles/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

async function currentLocale(): Promise<Locale> {
  const value = await getLocaleParam();
  if (!isLocale(value)) notFound();
  return value;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getDictionary(await currentLocale());
  return { title: meta.title, description: meta.description };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await currentLocale();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
