import Image from "next/image";
import Text from "@/components/shared/Typography/Text";
import Title from "@/components/shared/Typography/Title";
import ProfilePhoto from "public/me.png";
import Icon, { Technology } from "@/components/Icon";

import Button from "@/components/shared/Button/Button";

import { Technologies } from "./technologies";
import { companies } from "./companies";

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
                I have a passion for building scalable software, creating
                effective solutions, and learning new technologies. I am
                currently open to new opportunities.
              </Text>
              <div className="hidden md:flex items-center gap-10 mt-4">
                <Button isPrimary variant="outlined">
                  Download CV
                </Button>
                <Button isPrimary>Contact Me</Button>
              </div>
            </div>
            <div className="flex-1">
              <Image priority src={ProfilePhoto} alt="Ogbonna Sunday" />
            </div>
            <div className="flex md:hidden items-center gap-10 mt-4">
              <Button isPrimary variant="outlined">
                Download CV
              </Button>
              <Button isPrimary>Contact Me</Button>
            </div>
          </div>
        </section>
      </div>
      <section className="py-10 container">
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
    </div>
  );
};

export default About;
