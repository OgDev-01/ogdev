import { createFileRoute, Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";

import SidebarHeader from "@/components/SidebarHeader/SidebarHeader";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ExperienceCard from "@/components/ExperienceCard/ExperienceCard";
import ProjectCardNew from "@/components/ProjectCardNew/ProjectCardNew";
import BlogSection from "@/components/BlogSection/BlogSection";
import SpotlightProvider from "@/components/SpotlightProvider/SpotlightProvider";
import FadeIn from "@/components/FadeIn/FadeIn";
import Newsletter from "@/components/Newsletter/Newsletter";
import { experiences, projects } from "@/data/experience";

const SITE_URL = "https://www.ogbonna.dev";

// Person JSON-LD Schema
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sunday Ogbonna",
  jobTitle: "Software Engineer",
  url: SITE_URL,
  image: `${SITE_URL}/me.png`,
  sameAs: [
    "https://github.com/OgDev-01",
    "https://www.linkedin.com/in/ogbonna-sunday-06a86116b",
    "https://twitter.com/OgDev_01",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sunday Ogbonna - Software Engineer" },
      {
        name: "description",
        content:
          "Sunday Ogbonna is a software engineer who builds accessible, pixel-perfect digital experiences for the web and mobile.",
      },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Home,
});

function Home() {
  return (
    <SpotlightProvider>
      {/* Person Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Sticky Sidebar - Left Column */}
          <SidebarHeader />

          {/* Main Content - Right Column */}
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section
              id="about"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="About me"
            >
              <SectionHeader title="About" />
              <FadeIn delay={100}>
                <div className="space-y-4">
                  <p className="text-secondary-black/80 dark:text-primary-white/80">
                    Results-driven software developer with 5+ years of
                    experience in frontend and mobile technologies. I specialize
                    in building scalable applications, optimizing
                    infrastructure, and improving deployment processes to
                    accelerate feature delivery.
                  </p>
                  <p className="text-secondary-black/80 dark:text-primary-white/80">
                    I've had the privilege of working at{" "}
                    <a
                      href="https://opensauced.pizza"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary-button hover:underline dark:text-secondary-button"
                    >
                      an open-source startup
                    </a>
                    , collaborating with senior engineers from companies like
                    AWS, Netlify, and Ngx. Currently, I'm focused on building
                    mobile experiences and leading engineering teams.
                  </p>
                  <p className="text-secondary-black/80 dark:text-primary-white/80">
                    When I'm not coding, you'll find me writing{" "}
                    <Link
                      to="/blog"
                      className="font-medium text-primary-button hover:underline dark:text-secondary-button"
                    >
                      technical articles
                    </Link>
                    , contributing to open source, or exploring new
                    technologies.
                  </p>
                </div>
              </FadeIn>
            </section>

            {/* Experience Section */}
            <section
              id="experience"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Work experience"
            >
              <SectionHeader title="Experience" />
              <FadeIn delay={150}>
                <div>
                  <ol className="group/list">
                    {experiences.map((experience, index) => (
                      <FadeIn
                        key={experience.company}
                        delay={200 + index * 100}
                      >
                        <ExperienceCard experience={experience} />
                      </FadeIn>
                    ))}
                  </ol>
                  <div className="mt-12">
                    <a
                      href="/OGBONNA-SUNDAY.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center font-medium text-secondary-black transition-colors hover:text-primary-button dark:text-primary-white dark:hover:text-secondary-button"
                    >
                      View Full Resume
                      <FiArrowRight
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </FadeIn>
            </section>

            {/* Projects Section */}
            <section
              id="projects"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Selected projects"
            >
              <SectionHeader title="Projects" />
              <FadeIn delay={150}>
                <div>
                  <ol className="group/list">
                    {projects
                      .filter((p) => p.featured)
                      .slice(0, 3)
                      .map((project, index) => (
                        <FadeIn key={project.title} delay={200 + index * 100}>
                          <ProjectCardNew project={project} />
                        </FadeIn>
                      ))}
                  </ol>
                  <div className="mt-12">
                    <Link
                      to="/projects"
                      className="group inline-flex items-center font-medium text-secondary-black transition-colors hover:text-primary-button dark:text-primary-white dark:hover:text-secondary-button"
                    >
                      View Full Project Archive
                      <FiArrowRight
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </section>

            {/* Blog Section */}
            <section
              id="blog"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Blog posts"
            >
              <SectionHeader title="Blog" />
              <FadeIn delay={150}>
                <div>
                  <BlogSection />
                  <div className="mt-12">
                    <Link
                      to="/blog"
                      className="group inline-flex items-center font-medium text-secondary-black transition-colors hover:text-primary-button dark:text-primary-white dark:hover:text-secondary-button"
                    >
                      View All Posts
                      <FiArrowRight
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </section>

            {/* Newsletter Section */}
            <section
              id="newsletter"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Newsletter signup"
            >
              <FadeIn delay={150}>
                <Newsletter />
              </FadeIn>
            </section>

            {/* Footer */}
            <FadeIn delay={300}>
              <footer className="max-w-md pb-16 text-sm text-secondary-black/50 dark:text-primary-white/50 sm:pb-0">
                <p>
                  Design inspired by{" "}
                  <a
                    href="https://brittanychiang.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-secondary-black/70 hover:text-primary-button dark:text-primary-white/70 dark:hover:text-secondary-button"
                  >
                    Brittany Chiang
                  </a>
                  . Coded in{" "}
                  <a
                    href="https://code.visualstudio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-secondary-black/70 hover:text-primary-button dark:text-primary-white/70 dark:hover:text-secondary-button"
                  >
                    VS Code
                  </a>{" "}
                  by yours truly. Built with{" "}
                  <a
                    href="https://tanstack.com/start"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-secondary-black/70 hover:text-primary-button dark:text-primary-white/70 dark:hover:text-secondary-button"
                  >
                    TanStack Start
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://tailwindcss.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-secondary-black/70 hover:text-primary-button dark:text-primary-white/70 dark:hover:text-secondary-button"
                  >
                    Tailwind CSS
                  </a>
                  , deployed with{" "}
                  <a
                    href="https://coolify.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-secondary-black/70 hover:text-primary-button dark:text-primary-white/70 dark:hover:text-secondary-button"
                  >
                    Coolify
                  </a>
                  . All text is set in the{" "}
                  <a
                    href="https://rsms.me/inter/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-secondary-black/70 hover:text-primary-button dark:text-primary-white/70 dark:hover:text-secondary-button"
                  >
                    Inter
                  </a>{" "}
                  typeface.
                </p>
              </footer>
            </FadeIn>
          </main>
        </div>
      </div>
    </SpotlightProvider>
  );
}
