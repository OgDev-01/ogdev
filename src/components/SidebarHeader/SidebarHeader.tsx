import { useEffect, useState, useCallback } from "react";

import Socials from "@/components/shared/Socials/Socials";
import FadeIn from "@/components/FadeIn/FadeIn";
import { cn } from "@/libs/utils";

type Section = {
  id: string;
  label: string;
};

const sections: Section[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
];

function SidebarHeader() {
  const [activeSection, setActiveSection] = useState("about");

  const handleScroll = useCallback(() => {
    const sectionElements = sections.map((section) => ({
      id: section.id,
      element: document.getElementById(section.id),
    }));

    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const { id, element } = sectionElements[i];
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Name and title */}
        <FadeIn delay={0} direction="left">
          <h1 className="text-4xl font-bold tracking-tight text-secondary-black dark:text-primary-white sm:text-5xl">
            <a href="/">Sunday Ogbonna</a>
          </h1>
        </FadeIn>
        <FadeIn delay={100} direction="left">
          <h2 className="mt-3 text-lg font-medium tracking-tight text-secondary-black dark:text-primary-white sm:text-xl">
            Software Engineer
          </h2>
        </FadeIn>
        <FadeIn delay={200} direction="left">
          <p className="mt-4 max-w-xs leading-relaxed text-secondary-black/70 dark:text-primary-white/70">
            I build accessible, pixel-perfect digital experiences for the web
            and mobile.
          </p>
        </FadeIn>

        {/* Navigation - Desktop only */}
        <FadeIn delay={300} direction="left">
          <nav
            className="nav mt-16 hidden lg:block"
            aria-label="In-page jump links"
          >
            <ul className="w-max">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={cn(
                      "group flex items-center py-3",
                      activeSection === section.id && "active"
                    )}
                  >
                    {/* Animated indicator line */}
                    <span
                      className={cn(
                        "mr-4 h-px bg-secondary-black/30 transition-all duration-300 ease-out group-hover:w-16 group-hover:bg-primary-button group-focus-visible:w-16 group-focus-visible:bg-primary-button dark:bg-primary-white/30 dark:group-hover:bg-secondary-button dark:group-focus-visible:bg-secondary-button",
                        activeSection === section.id
                          ? "w-16 bg-primary-button dark:bg-secondary-button"
                          : "w-8"
                      )}
                      aria-hidden="true"
                    />
                    {/* Nav text */}
                    <span
                      className={cn(
                        "text-xs font-bold uppercase tracking-widest transition-colors duration-200 ease-out group-hover:text-primary-button group-focus-visible:text-primary-button dark:group-hover:text-secondary-button dark:group-focus-visible:text-secondary-button",
                        activeSection === section.id
                          ? "text-primary-button dark:text-secondary-button"
                          : "text-secondary-black/50 dark:text-primary-white/50"
                      )}
                    >
                      {section.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </FadeIn>
      </div>

      {/* Social links */}
      <FadeIn delay={400} direction="up">
        <div className="ml-1 mt-8">
          <Socials />
        </div>
      </FadeIn>
    </header>
  );
}

SidebarHeader.displayName = "SidebarHeader";

export default SidebarHeader;
