import type { Locale } from "@/i18n/config";

/** Public, non-secret site facts shared across sections. */
export const site = {
  name: "Antonio Selvas",
  fullName: "Luis Antonio Selvas de León",
  email: "selvas.leon029@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/selvas-de-leon",
    github: "https://github.com/The-Tito",
    instagram: "https://www.instagram.com/_antonio.selvas/",
  },
  cv: {
    es: "/cv/antonio-selvas-cv-es.pdf",
    en: "/cv/antonio-selvas-cv-en.pdf",
  } satisfies Record<Locale, string>,
} as const;

/** Stable anchor ids, shared by sections and navigation. */
export const sectionIds = {
  top: "top",
  profile: "profile",
  experience: "experience",
  projects: "projects",
  stack: "stack",
  contact: "contact",
} as const;
