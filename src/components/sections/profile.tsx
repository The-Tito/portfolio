import { SectionHeader } from "@/components/ui/section-header";
import { sectionIds } from "@/content/site";
import { getCurrentDictionary } from "@/i18n/server";

export async function Profile() {
  const { t } = await getCurrentDictionary();
  const profile = t.profile;

  return (
    <section
      id={sectionIds.profile}
      aria-labelledby="profile-title"
      className="border-t border-line py-[clamp(96px,11vw,176px)]"
    >
      <div className="container-page">
        <SectionHeader number="01" label={profile.label}>
          <h2
            id="profile-title"
            className="fill-text text-[clamp(28px,3.5vw,54px)] leading-[1.14] font-medium tracking-[-0.035em]"
          >
            <span>{profile.statement}</span>
          </h2>
        </SectionHeader>

        <div className="grid gap-[clamp(24px,4vw,64px)] min-[761px]:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
          <p className="reveal label-mono">{profile.subLabel}</p>
          <div className="reveal grid gap-[clamp(24px,3vw,48px)] text-muted min-[761px]:grid-cols-2">
            {profile.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
