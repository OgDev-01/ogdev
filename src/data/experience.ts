export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  link: string;
};

export const experiences: Experience[] = [
  {
    company: "Golivwell Inc",
    role: "Mobile Engineer Lead",
    period: "03/2024 — Present",
    location: "Saudi Arabia",
    description:
      "Led the mobile engineering team in developing a gym client management application. Overhauled the app's architecture and implemented foundational infrastructure to support stable deployment pipelines. Revived a previously stagnant codebase, enabling the team to resume consistent feature delivery within weeks.",
    technologies: ["React Native", "Expo", "TypeScript", "CI/CD"],
    link: "https://golivwell.com",
  },
  {
    company: "Medijobs.co",
    role: "Software Engineer",
    period: "04/2024 — Present",
    location: "Romania",
    description:
      "Led frontend web development for a medical recruitment platform connecting healthcare professionals to leading institutions. Built scalable, user-centric interfaces and introduced modern frontend architecture with reusable components.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://medijobs.co",
  },
  {
    company: "OpenSauced",
    role: "Software Engineer",
    period: "09/2022 — 02/2024",
    location: "United States",
    description:
      "Played a pivotal role as one of the early employees, contributing significantly to front-end development. Transitioned to full-stack, working on both API and frontend. Collaborated with senior engineers from AWS, Netlify, and Ngx. Authored a blog post about open-source hiring that hit top-5 for the month with 30k+ views.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    link: "https://opensauced.pizza",
  },
  {
    company: "Vessel Labs",
    role: "Frontend Web Engineer Lead",
    period: "10/2022 — 09/2023",
    location: "Nigeria",
    description:
      "Led the frontend team, orchestrating successful execution of diverse and complex projects. Conceptualized and built My Native Tree, a family tree repository, showcasing adept project management skills in navigating one of the most complex endeavors.",
    technologies: ["React", "TypeScript", "Next.js", "GraphQL"],
    link: "https://vessel-labs.com",
  },
  {
    company: "Softkodes LLC",
    role: "Frontend Web Engineer",
    period: "05/2020 — 07/2022",
    location: "Nigeria",
    description:
      "Developed and maintained user-facing features using modern web technologies. Translated UI/UX wireframes into high-quality, responsive code. Optimized applications for maximum speed, scalability, and cross-browser compatibility.",
    technologies: ["React", "JavaScript", "CSS", "HTML", "REST APIs"],
    link: "https://softkodes.com",
  },
];

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github?: string;
  image?: string;
  featured: boolean;
  year: string;
  madeAt?: string;
  // Mobile app specific links
  appStore?: {
    ios?: string;
    android?: string;
  };
};

export const projects: Project[] = [
  {
    title: "Zed REST Client",
    description:
      "A powerful HTTP client extension for Zed editor that brings professional API testing directly into your workflow. Features include request chaining, environment management, GraphQL support, and code generation.",
    technologies: ["Rust", "WebAssembly", "LSP", "Tree-sitter"],
    link: "https://github.com/OgDev-01/zed-restclient",
    github: "https://github.com/OgDev-01/zed-restclient",
    featured: true,
    year: "2025",
  },
  {
    title: "Tire Spot Solutions",
    description:
      "A comprehensive automotive service app combining customer membership, service scheduling, e-commerce, and roadside assistance in one platform. Led mobile development with focus on user convenience and reliability.",
    technologies: ["React Native", "Expo", "TypeScript", "Node.js"],
    link: "https://tirespotsolutions.com",
    featured: true,
    year: "2024",
    madeAt: "Freelance",
    appStore: {
      ios: "https://apps.apple.com/us/app/tire-spot/id6746969376",
      android:
        "https://play.google.com/store/apps/details?id=com.tirespotsolutions",
    },
  },
  {
    title: "Golivwell App",
    description:
      "A client management app for gyms and wellness centers focused on bookings, member tracking, and personalized fitness programs. Re-architected the mobile codebase to resolve technical debt and improve scalability.",
    technologies: ["React Native", "TypeScript", "Expo", "REST APIs"],
    link: "https://golivwell.com",
    featured: true,
    year: "2024",
    madeAt: "Golivwell Inc",
    appStore: {
      ios: "https://apps.apple.com/us/app/golivwell-client/id6670273595",
      android: "https://play.google.com/store/apps/details?id=com.livwellinc",
    },
  },
  {
    title: "LifeLab App",
    description:
      "A white-label wellness application powered by Golivwell's platform, offering custom branding for fitness and wellness businesses. Built as a customizable solution for partners seeking their own branded client experience.",
    technologies: ["React Native", "TypeScript", "Expo", "White-label"],
    link: "https://golivwell.com",
    featured: true,
    year: "2024",
    madeAt: "Golivwell Inc",
    appStore: {
      ios: "https://apps.apple.com/us/app/lifelab-client/id6751045169",
      android: "https://play.google.com/store/apps/details?id=com.lifelabinc",
    },
  },
  {
    title: "Medijobs Platform",
    description:
      "Medical recruitment platform connecting healthcare professionals to leading institutions across Europe.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://medijobs.co",
    featured: false,
    year: "2024",
    madeAt: "Medijobs.co",
  },
  {
    title: "OpenSauced Insights",
    description:
      "An open-source platform that helps maintainers and contributors understand their open-source ecosystem. Built contributor insights, repository analytics, and community engagement features.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    link: "https://opensauced.pizza",
    github: "https://github.com/open-sauced/app",
    featured: true,
    year: "2023",
    madeAt: "OpenSauced",
  },
  {
    title: "OpenSauced Design System",
    description:
      "Component library and design system for the OpenSauced platform, ensuring consistent UI across products.",
    technologies: ["React", "TypeScript", "Storybook", "Tailwind CSS"],
    link: "https://design.opensauced.pizza",
    github: "https://github.com/open-sauced/design-system",
    featured: false,
    year: "2023",
    madeAt: "OpenSauced",
  },
  {
    title: "My Native Tree",
    description:
      "A family tree repository application allowing users to build, explore, and share their genealogy.",
    technologies: ["React", "Next.js", "TypeScript", "GraphQL"],
    link: "https://mynativetree.com",
    featured: true,
    year: "2023",
    madeAt: "Vessel Labs",
  },
];

export const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "Next.js",
  "Node.js",
  "NestJS",
  "Expo",
  "Tailwind CSS",
  "PostgreSQL",
  "Git/GitHub",
  "Docker",
  "CI/CD",
  "Figma",
];
