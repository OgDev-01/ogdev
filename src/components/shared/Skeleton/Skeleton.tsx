import { cn } from "@/libs/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * Base skeleton component with pulse animation
 */
function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-secondary-black/10 dark:bg-primary-white/10",
        className
      )}
      aria-hidden="true"
    />
  );
}

Skeleton.displayName = "Skeleton";

export default Skeleton;
