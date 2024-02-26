import Image from "next/image";
import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";
import Title from "../shared/Typography/Title";
import Text from "../shared/Typography/Text";

interface ProjectCardProps {
  id: number;
  title: string;
  slug: string;
  subtitle?: string;
  cover_image: string;
  content: string;
  project_link: string;
  start_date: string;
  end_date: string;
  tags?: string;
}

const ProjectCard = ({
  id,
  title,
  slug,
  subtitle,
  cover_image,
  project_link,
  tags,
}: ProjectCardProps) => {
  return (
    <Link
      href={`/projects/${slug}`}
      className="flex flex-col md:flex-row  rounded-xl overflow-hidden gap-6 bg-highlight-grey/20 dark:bg-highlight-black hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <div className="relative w-full md:w-[28%] h-48 md:h-52">
        <Image fill src={cover_image} alt={title} />
      </div>
      <div className="flex-1 px-4 pt-0 pb-6 md:py-6 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="px-3 py-1 text-sm rounded-full bg-[#E0EAF6] text-[#2E6BB5]">
            Website
          </div>
          <a
            href={project_link}
            target="_blank"
            rel="noreferrer"
            className="text-sm flex items-center gap-2 text-primary-button dark:text-white"
          >
            View Project <TbExternalLink className="text-xl" />
          </a>
        </div>

        <div>
          <Title level={4} className="text-xl mt-4">
            {title}
          </Title>
          {subtitle && <Text>{subtitle}</Text>}
        </div>

        <div className="flex gap-2 flex-wrap justify-self-end mt-4 md:mt-auto ">
          {tags?.split(",").map((tag, idx) => (
            <div
              key={idx}
              className="px-4 py-1 text-xs rounded-full bg-highlight-grey/50 dark:bg-highlight-grey/10 "
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
