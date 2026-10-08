import type { Dictionary } from "@/i18n/dictionaries";

export type FeaturedSlug = keyof Dictionary["projects"]["items"];
export type OtherSlug = keyof Dictionary["projects"]["others"];
type LinkKey<S extends FeaturedSlug> = keyof Dictionary["projects"]["items"][S]["links"];

export type ProjectImage = { src: string; width: number; height: number };

type FeaturedProjectOf<S extends FeaturedSlug> = {
  slug: S;
  name: string;
  /** Swatch shown next to the project tag. */
  color: string;
  image: ProjectImage;
  secondaryImage?: ProjectImage;
  architecture?: string[];
  links: { key: LinkKey<S>; href: string; primary?: boolean }[];
};

/** Union over every slug, so each project's link keys match its own copy. */
export type FeaturedProject = { [S in FeaturedSlug]: FeaturedProjectOf<S> }[FeaturedSlug];

export type OtherProject = { slug: OtherSlug; stack: string; year: number };

const screenshot = (src: string): ProjectImage => ({ src, width: 1600, height: 1000 });

export const featuredProjects = [
  {
    slug: "readflow",
    name: "ReadFlow",
    color: "#3b5bdb",
    image: screenshot("/projects/readflow-summary.jpg"),
    secondaryImage: screenshot("/projects/readflow-spaced-quiz.jpg"),
    architecture: ["Next.js", "Express API", "Gemini 2.5", "PostgreSQL · Prisma"],
    links: [
      { key: "live", href: "https://www.readflow.lat/", primary: true },
      { key: "backend", href: "https://github.com/The-Tito/readflow-backend" },
      { key: "infra", href: "https://github.com/The-Tito/readflow-infra" },
    ],
  } satisfies FeaturedProjectOf<"readflow">,
  {
    slug: "warik",
    name: "Warik",
    color: "#f5a524",
    image: screenshot("/projects/warik.jpg"),
    links: [{ key: "live", href: "https://warikapp.pages.dev/", primary: true }],
  } satisfies FeaturedProjectOf<"warik">,
  {
    slug: "laberinto",
    name: "Laberinto",
    color: "#9bcb1e",
    image: screenshot("/projects/laberinto.jpg"),
    links: [{ key: "live", href: "https://juego-laberintos.pages.dev/", primary: true }],
  } satisfies FeaturedProjectOf<"laberinto">,
] as const;

export const otherProjects: OtherProject[] = [
  { slug: "antropometrico", stack: "Kotlin · Ktor · PostgreSQL", year: 2025 },
  { slug: "finanzapp", stack: "Kotlin · Compose · Firebase", year: 2025 },
  { slug: "municipal", stack: "Flutter", year: 2025 },
  { slug: "delivery", stack: "JavaScript · MySQL", year: 2025 },
];
