import { ArrowRightIcon } from "@/components/ui/icons";
import { sectionIds } from "@/content/site";
import { getCurrentDictionary } from "@/i18n/server";

const order = ["profile", "experience", "projects", "stack", "contact"] as const;

/** Big typographic table of contents. */
export async function SectionIndex() {
  const { t } = await getCurrentDictionary();
  const index = t.index;

  return (
    <nav aria-label={index.label} className="py-[clamp(96px,11vw,176px)]">
      <div className="container-page grid gap-[clamp(24px,4vw,64px)] min-[761px]:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
        <div className="reveal relative pl-7 max-[760px]:hidden">
          <span
            aria-hidden="true"
            className="absolute top-1.5 bottom-0 left-0 w-px bg-line after:absolute after:-bottom-0.5 after:-left-1 after:size-[9px] after:rotate-45 after:border-r after:border-b after:border-muted after:content-['']"
          />
          <p className="label-mono">{index.label}</p>
          <p className="mt-4 max-w-[260px] text-[15px] text-muted">{index.description}</p>
        </div>

        <ol className="border-t border-line">
          {order.map((key, i) => (
            <li key={key}>
              <a
                href={`#${sectionIds[key]}`}
                className="group flex items-center gap-[clamp(14px,2vw,28px)] border-b border-line py-[clamp(10px,1.2vw,18px)] text-[clamp(40px,6.4vw,104px)] leading-none font-semibold tracking-[-0.05em] text-subtle no-underline transition-[color,padding] duration-700 ease-out-expo hover:pl-[clamp(12px,2vw,32px)] hover:text-fg"
              >
                <span className="w-9 self-start pt-[0.6em] label-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {index.items[key]}
                <ArrowRightIcon
                  strokeWidth={1.4}
                  className="ml-auto size-[clamp(36px,4vw,64px)] -translate-x-6 text-accent-ink opacity-0 transition-[opacity,translate] duration-700 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
