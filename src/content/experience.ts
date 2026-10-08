import type { Dictionary } from "@/i18n/dictionaries";

import type { ProjectImage } from "./projects";

export type ExperienceSlug = keyof Dictionary["experience"]["items"];

export type Experience = {
  slug: ExperienceSlug;
  /** Technologies used in the role; `core` ones get the accent dot. */
  stack: { name: string; core?: boolean }[];
  images?: { desktop: ProjectImage; mobile: ProjectImage; url: string };
};

export const experiences: Experience[] = [
  {
    slug: "ravantech",
    stack: [
      { name: "Flutter", core: true },
      { name: "Dart" },
      { name: "Riverpod" },
      { name: "go_router" },
      { name: "Dio" },
      { name: "Supabase", core: true },
      { name: "GitHub Actions" },
    ],
    images: {
      url: "trykotoba.com",
      desktop: { src: "/projects/kotoba-desktop.jpg", width: 1600, height: 1000 },
      mobile: { src: "/projects/kotoba-mobile.jpg", width: 739, height: 1600 },
    },
  },
];
