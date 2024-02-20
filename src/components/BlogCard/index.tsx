import Image from "next/image";
import Link from "next/link";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import { format } from "date-fns";

import { cn, humanizeNumber, truncateString } from "@/libs/utils";
import Title from "../shared/Typography/Title";
import Avatar from "../Avatar";

interface BlogCardProps {
  title: string;
  description?: string;
  cover_image?: string;
  created_at: string;
  reading_time_minutes: number;
  tags?: string[];
  id: number;
  slug: string;
  page_views_count: number;
  user: {
    name: string;
    avatar_url: string;
  };
}
const BlogCard = ({
  title,
  page_views_count,
  cover_image,
  slug,
  id,
  created_at,
  reading_time_minutes,
  user,
}: BlogCardProps) => {
  return (
    <Link
      href={`/blog/${slug}_${id}`}
      className={cn(
        "rounded-xl p-4 max-w-72 bg-highlight-black text-white flex flex-col gap-3"
      )}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          className="object-cover"
          src={cover_image ?? ""}
          alt={title}
          fill
        />
      </div>
      <Title title={title} level={3} className="text-white leading-7">
        {truncateString(title, 55)}
      </Title>

      <div>
        <div className="flex items-center justify-between mt-6 text-xs">
          <span className="bg-primary-white/10 rounded-full px-4 py-1">
            {format(new Date(created_at), "MMM dd yyyy")}
          </span>
          <p className="text-white/50 flex gap-2 items-center text-sm">
            <HiOutlineBookOpen className="text-xl" /> {reading_time_minutes} min
            read
          </p>
        </div>
        <div className="mt-6 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Avatar
              src={user.avatar_url ?? ""}
              alt={""}
              size="sm"
              className=""
            />
            <span>{user.name}</span>
          </div>

          <p className="flex items-center gap-2">
            <FiEye className="text-lg" /> {humanizeNumber(page_views_count)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
