import { FaGithub, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

type IconType = React.ElementType;

const Socials = () => {
  const socials = [
    {
      name: "github",
      url: "https://github.com/OgDev-01",
    },
    {
      name: "youtube",
      url: "https://www.youtube.com/@Ogdev_01",
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/ogbonna-sunday-06a86116b",
    },
    {
      name: "twitter",
      url: "https://twitter.com/OgDev_01",
    },
  ];

  const IconMap: { [key: string]: IconType } = {
    github: FaGithub,
    youtube: FaYoutube,
    linkedin: FaLinkedinIn,
    twitter: RiTwitterXFill,
  };

  return (
    <div className="flex items-center gap-8 text-lg md:text-2xl text-white">
      {socials.map((social, i) => {
        const Icon = IconMap[social.name];
        return (
          <a
            key={i}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-secondary-black rounded-full"
            href={social.url}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

export default Socials;
