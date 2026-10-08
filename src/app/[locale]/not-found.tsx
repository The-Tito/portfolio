import { ButtonLink } from "@/components/ui/button-link";
import { getCurrentDictionary } from "@/i18n/server";

export default async function NotFound() {
  const { locale, t } = await getCurrentDictionary();

  return (
    <main id="main" className="container-page grid min-h-dvh content-center gap-8 py-32">
      <p
        aria-hidden="true"
        className="font-display text-[clamp(160px,24vw,320px)] leading-[0.78] text-accent-ink"
      >
        404
      </p>
      <h1 className="text-[clamp(36px,4.6vw,72px)] leading-none font-semibold tracking-[-0.045em]">
        {t.notFound.title}
      </h1>
      <p className="max-w-[520px] text-muted">{t.notFound.text}</p>
      <div>
        <ButtonLink href={`/${locale}`} variant="solid">
          {t.notFound.back}
        </ButtonLink>
      </div>
    </main>
  );
}
