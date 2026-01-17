import { createFileRoute, Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";

import FadeIn from "@/components/FadeIn/FadeIn";
import ContactForm from "./-ContactForm";

const SITE_URL = "https://www.ogbonna.dev";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About - Sunday Ogbonna" },
      {
        name: "description",
        content:
          "Learn more about Sunday Ogbonna, a software engineer with 5+ years of experience building web and mobile applications.",
      },
      { property: "og:title", content: "About - Sunday Ogbonna" },
      {
        property: "og:description",
        content:
          "Learn more about Sunday Ogbonna, a software engineer with 5+ years of experience building web and mobile applications.",
      },
      { property: "og:url", content: `${SITE_URL}/about` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: About,
});

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

function About() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24">
      {/* Person Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Hero Section */}
      <section className="mb-16 md:mb-24">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16 lg:gap-20">
          {/* Content */}
          <div className="flex flex-1 flex-col gap-6">
            <FadeIn delay={0} direction="up">
              <h1 className="text-4xl font-bold tracking-tight text-secondary-black dark:text-primary-white sm:text-5xl">
                Hi, I'm Sunday
              </h1>
            </FadeIn>
            <FadeIn delay={100} direction="up">
              <p className="text-lg leading-relaxed text-secondary-black/80 dark:text-primary-white/80 md:text-xl">
                I'm a Software Engineer based in Nigeria with 5+ years of
                experience building web and mobile applications.
              </p>
            </FadeIn>
            <FadeIn delay={200} direction="up">
              <p className="leading-relaxed text-secondary-black/70 dark:text-primary-white/70">
                I thrive on creating optimized and interactive digital
                experiences, drawing from my experience as a former maintainer
                of an open-source project. I approach every line of code as a
                chance to evolve and enhance your digital experience.
              </p>
            </FadeIn>
            <FadeIn delay={300} direction="up">
              <p className="leading-relaxed text-secondary-black/70 dark:text-primary-white/70">
                When I'm not coding, you'll find me writing{" "}
                <Link
                  to="/blog"
                  className="font-medium text-primary-button hover:underline dark:text-secondary-button"
                >
                  technical articles
                </Link>
                , contributing to open source, or exploring new technologies.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={400} direction="up">
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href="/OGBONNA-SUNDAY.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center rounded-full border-2 border-primary-button px-6 py-2.5 font-medium text-primary-button transition hover:bg-primary-button hover:text-white dark:border-secondary-button dark:text-secondary-button dark:hover:bg-secondary-button dark:hover:text-white"
                >
                  View Resume
                  <FiArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
                <Link
                  to="/about"
                  hash="contact"
                  className="inline-flex items-center rounded-full bg-primary-button px-6 py-2.5 font-medium text-white transition hover:bg-primary-button/90 dark:bg-secondary-button dark:hover:bg-secondary-button/90"
                >
                  Contact Me
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Image */}
          <FadeIn delay={200} direction="right" className="flex-1">
            <img
              src="/me.png"
              alt="Sunday Ogbonna"
              className="w-full rounded-2xl"
            />
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-2xl">
        <FadeIn delay={100}>
          <h2 className="text-center text-3xl font-bold tracking-tight text-secondary-black dark:text-primary-white md:text-4xl">
            Get in touch
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="mx-auto mt-4 text-center text-secondary-black/70 dark:text-primary-white/70 md:text-lg">
            Got a question or proposal, or just want to say hello?
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <ContactForm />
        </FadeIn>
      </section>
    </div>
  );
}
