import { ImageResponse } from "next/og";

import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const alt = "Antonio Selvas — Backend & AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(isLocale(locale) ? locale : "en");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0b0c0e",
        color: "#f2f1ec",
        backgroundImage: "radial-gradient(rgba(242,241,236,0.09) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#8f939c" }}>
        {t.common.brand.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02 }}>
        <span>{t.hero.line1}</span>
        <span>{t.hero.line2}</span>
        <span style={{ color: "#5b5f68" }}>
          {t.hero.line3Before}&nbsp;<span style={{ color: "#ff5b23" }}>{t.hero.line3Accent}</span>
        </span>
        <span style={{ color: "#5b5f68" }}>{t.hero.line4}</span>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#8f939c" }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 7, background: "#34d399" }} />
        {t.hero.status}
      </div>
    </div>,
    size,
  );
}
