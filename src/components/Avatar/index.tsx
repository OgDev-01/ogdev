import { cn } from "@/libs/utils";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}
const Avatar = ({ src, alt, size, className }: AvatarProps) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <picture>
      <img
        src={src}
        alt={alt}
        className={cn("rounded-full", sizes[size ?? "md"], className)}
      />
    </picture>
  );
};

export default Avatar;
