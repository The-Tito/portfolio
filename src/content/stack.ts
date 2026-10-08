import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Localized = string | Record<Locale, string>;

export type StackGroupId = keyof Dictionary["stack"]["groups"];
export type StackItem = { label: Localized; core?: boolean };

/** Technology names are not translated; descriptive chips are. */
export const stackGroups: { id: StackGroupId; items: StackItem[] }[] = [
  {
    id: "backend",
    items: [
      { label: "Node.js", core: true },
      { label: "TypeScript", core: true },
      { label: "Express" },
      { label: "Ktor" },
      { label: "Javalin" },
      { label: "REST" },
      { label: "Python" },
      { label: "Java" },
    ],
  },
  {
    id: "ai",
    items: [
      { label: "Gemini API", core: true },
      { label: { es: "Integración de LLMs", en: "LLM integration" } },
      { label: { es: "Generación de contenido", en: "Content generation" } },
      { label: { es: "Evaluación automática", en: "Automated assessment" } },
    ],
  },
  {
    id: "data",
    items: [
      { label: "PostgreSQL", core: true },
      { label: "Prisma ORM" },
      { label: "Supabase · RLS" },
      { label: "MySQL" },
      { label: "Firestore" },
      { label: { es: "Triggers y vistas", en: "Triggers & views" } },
    ],
  },
  {
    id: "mobile",
    items: [
      { label: "Flutter", core: true },
      { label: "Dart" },
      { label: "Riverpod" },
      { label: "Kotlin" },
      { label: "Jetpack Compose" },
    ],
  },
  {
    id: "frontend",
    items: [
      { label: "React" },
      { label: "Next.js" },
      { label: "Tailwind" },
      { label: "HTML · CSS" },
    ],
  },
  {
    id: "devops",
    items: [
      { label: "Docker", core: true },
      { label: "GitHub Actions" },
      { label: "AWS EC2 · RDS" },
      { label: "Render" },
      { label: "Nginx" },
      { label: "Linux" },
    ],
  },
];

export const marqueeTech = [
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Gemini AI",
  "Flutter",
  "Docker",
  "Kotlin",
  "Next.js",
];

export function localize(value: Localized, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}
