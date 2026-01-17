import { cn } from "@/libs/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Loading = ({ className, size = "md" }: LoadingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={cn("flex items-center justify-center py-20", className)}
      role="status"
      aria-label="Loading"
    >
      <div
        className={cn(
          "animate-spin rounded-full border-primary-button border-t-transparent",
          sizeClasses[size]
        )}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
