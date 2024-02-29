import Image from "next/image";
import Link from "next/link";

import Text from "@/components/shared/Typography/Text";
import Title from "@/components/shared/Typography/Title";
import ProfilePhoto from "public/me.png";
import Icon, { Technology } from "@/components/Icon";

import { Technologies } from "./technologies";
import { companies } from "./companies";
import ContactForm from "./Form";

const About = () => {
  return (
    <div className="">
      <div className="bg-black">
        <section className="container py-6 dark:py-0 md:py-28 md:dark:py-16 text-white">
          <div className="flex flex-col md:flex-row gap-10  md:gap-20 ">
            <div className="flex-1 flex flex-col gap-8">
              <Title className="text-white" level={2}>
                Hi,
              </Title>
              <p className="text-xl md:text-2xl pr-10 break-words leading-8">
                I’m Ogbonna Sunday,
                <br /> a Software Engineer based in Nigeria. I enjoy creating
                optimized and interactive web applications.
              </p>
              <Text className="text-primary-white text-sm ">
                I thrive on creating optimized and interactive web applications,
                drawing from my experience as a former maintainer of an
                open-source project. I approach every line of code as a chance
                to evolve and enhance your digital experience.
              </Text>
              <div className="hidden md:flex items-center gap-10 mt-4">
                <a
                  href="/OGBONNA-SUNDAY.pdf"
                  className=" border-2 border-secondary-button text-white px-6 py-2 rounded-full  transition hover:bg-secondary-button hover:text-white"
                  download="OGBONNA-SUNDAY.pdf"
                >
                  Download CV
                </a>
                <Link
                  href="/about#contact"
                  className="bg-secondary-button px-6 py-2 rounded-full"
                >
                  Contact Me
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <Image priority src={ProfilePhoto} alt="Ogbonna Sunday" />
            </div>
            <div className="flex md:hidden items-center gap-10 mt-4">
              <a
                href="/OGBONNA-SUNDAY.pdf"
                className=" border-2 border-secondary-button text-white px-6 py-2 rounded-full  transition hover:bg-secondary-button hover:text-white"
                download="OGBONNA-SUNDAY.pdf"
              >
                Download CV
              </a>
              <Link
                href="/about#contact"
                className="bg-secondary-button px-6 py-2 rounded-full"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="py-20 container">
        <Title
          className="text-center text-xl break-words md:text-2xl"
          level={5}
        >
          Technologies I’ve been working with recently
        </Title>
        <div className="flex items-center gap-2 md:gap-4 md:justify-center flex-wrap mt-10">
          {Technologies.map((tech, idx: number) => (
            <div
              className="flex items-center gap-2 border-2 dark:border-primary-white/40 rounded-full px-4 py-2 text-sm"
              key={idx}
            >
              <Icon name={tech.toLowerCase() as Technology} /> {tech}
            </div>
          ))}
        </div>
      </section>
      <section className="container mt-10">
        <Title
          className="text-center text-xl break-words md:text-2xl"
          level={5}
        >
          Work Experience
        </Title>
        <div className="rounded-xl px-4 py-10 bg-black mt-10 text-white flex flex-col  [&>*:nth-child(odd)]:bg-white/5">
          {companies.map((company, idx) => (
            <div
              className="flex items-center justify-between px-4 py-4 rounded-md"
              key={idx}
            >
              <div className="flex flex-col gap-1.5">
                <Title className="text-white text-xl" level={4}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white no-underline hover:underline transition"
                    href={company.link}
                  >
                    {company.name}
                  </a>
                </Title>
                <Text className="text-white/70 text-sm">{company.role}</Text>
              </div>
              <div className="px-4 py-2 rounded-full text-xs md:text-sm bg-primary-white/10 shrink-0">
                {company.date}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="container mt-12">
        <Title
          className="text-center text-2xl break-words md:text-4xl"
          level={5}
        >
          Get in touch
        </Title>
        <Text className="text-center text-base md:text-xl md:w-3/6 mx-auto mt-4">
          Got a question or a proposal, or just want to say hello ?
        </Text>

        <ContactForm />
      </section>
    </div>
  );
};

export default About;
