import Image from "next/image";
import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import Title from "../shared/Typography/Title";
import Text from "../shared/Typography/Text";

interface ProjectCardProps {
  id: number;
  title: string;
  slug: string;
  subtitle?: string;
  cover_image: string;
  content?: string;
  project_link: string;
  start_date: string;
  end_date: string;
  tags?: string;
  isEditable?: boolean;
}

const ProjectCard = ({
  id,
  title,
  slug,
  subtitle,
  cover_image,
  project_link,
  tags,
  isEditable,
}: ProjectCardProps) => {
  return (
    <div className="flex flex-col md:flex-row md:h-52  rounded-xl overflow-hidden gap-6 bg-highlight-grey/20 dark:bg-highlight-black hover:shadow-lg transition-all duration-300 ease-in-out">
      <Link
        href={`/projects/${slug}`}
        className="relative w-full md:w-[28%] md:min-w-[28%] h-48 md:h-auto flex-shrink-0 overflow-hidden"
      >
        <Image fill src={cover_image} className="object-cover" alt={title} />
      </Link>
      <div className="px-4 pt-0 pb-6 md:py-6 flex flex-col flex-wrap">
        <div className="flex justify-between items-center">
          <div className="px-3 py-1 text-sm rounded-full bg-[#E0EAF6] text-[#2E6BB5]">
            Website
          </div>
          <div className="flex gap-4 items-center">
            <a
              href={project_link}
              target="_blank"
              rel="noreferrer"
              className="text-sm flex items-center gap-2 text-primary-button dark:text-white"
            >
              View Live <TbExternalLink className="text-xl" />
            </a>
            {isEditable && (
              <Link className="" href={`/dashboard/projects/${slug}/edit`}>
                <BiEdit className="text-2xl " />
              </Link>
            )}
          </div>
        </div>

        <div>
          <Title level={4} className="text-xl mt-4 w-max">
            {title}
          </Title>
          {subtitle && <Text className="line-clamp-1 ">{subtitle}</Text>}
        </div>

        <div className="flex gap-2 flex-wrap justify-self-end mt-4 md:mt-auto">
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
    </div>
  );
};

export default ProjectCard;
