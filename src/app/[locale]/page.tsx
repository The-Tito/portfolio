import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Profile } from "@/components/sections/profile";
import { Projects } from "@/components/sections/projects";
import { SectionIndex } from "@/components/sections/section-index";
import { Stack } from "@/components/sections/stack";
import { TechMarquee } from "@/components/sections/tech-marquee";

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <TechMarquee />
        <SectionIndex />
        <Profile />
        <Experience />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
