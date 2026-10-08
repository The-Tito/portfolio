import { Chip, ChipList } from "@/components/ui/chip";
import { SectionHeader, SectionTitle } from "@/components/ui/section-header";
import { sectionIds } from "@/content/site";
import { localize, stackGroups } from "@/content/stack";
import { getCurrentDictionary } from "@/i18n/server";

export async function Stack() {
  const { locale, t } = await getCurrentDictionary();
  const section = t.stack;

  return (
    <section
      id={sectionIds.stack}
      aria-labelledby="stack-title"
      className="border-t border-line py-[clamp(96px,11vw,176px)]"
    >
      <div className="container-page">
        <SectionHeader number="04" label={section.label}>
          <div id="stack-title" className="reveal">
            <SectionTitle strong={section.titleStrong} muted={section.titleMuted} />
          </div>
        </SectionHeader>

        <div className="grid gap-x-[clamp(24px,3vw,48px)] gap-y-[clamp(28px,3.5vw,56px)] min-[761px]:grid-cols-2 min-[1081px]:grid-cols-3">
          {stackGroups.map((group, i) => (
            <div key={group.id} className="reveal">
              <p className="label-mono">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 mb-[18px] text-[22px] font-medium tracking-[-0.02em]">
                {section.groups[group.id]}
              </h3>
              <ChipList>
                {group.items.map((item) => {
                  const label = localize(item.label, locale);
                  return (
                    <Chip key={label} core={item.core}>
                      {label}
                    </Chip>
                  );
                })}
              </ChipList>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(80px,9vw,140px)] grid gap-[clamp(24px,4vw,64px)] min-[761px]:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
          <h3 className="reveal label-mono">{t.education.label}</h3>
          <ul>
            {t.education.items.map((item) => (
              <li
                key={item.title}
                className="reveal grid items-baseline gap-5 border-t border-line py-[22px] min-[761px]:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto]"
              >
                <p className="text-[clamp(20px,1.8vw,24px)] font-medium tracking-[-0.02em]">
                  {item.title}
                </p>
                <p className="text-[15px] text-muted">{item.org}</p>
                <p className="label-mono">{item.meta}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
