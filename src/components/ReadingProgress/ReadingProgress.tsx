"use client";

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  targetRef?: React.RefObject<HTMLElement | null>;
}

const ReadingProgress = ({ targetRef }: ReadingProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const target = targetRef?.current;

      if (target) {
        // Calculate progress based on target element
        const rect = target.getBoundingClientRect();
        const targetTop = window.scrollY + rect.top;
        const targetHeight = target.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        // Start tracking when target enters viewport
        const startPoint = targetTop - windowHeight;
        const endPoint = targetTop + targetHeight - windowHeight;

        if (scrollY <= startPoint) {
          setProgress(0);
        } else if (scrollY >= endPoint) {
          setProgress(100);
        } else {
          const progressValue =
            ((scrollY - startPoint) / (endPoint - startPoint)) * 100;
          setProgress(Math.min(100, Math.max(0, progressValue)));
        }
      } else {
        // Fallback: Calculate based on full page
        const windowHeight = window.innerHeight;
        const documentHeight =
          document.documentElement.scrollHeight - windowHeight;
        const scrollY = window.scrollY;

        if (documentHeight <= 0) {
          setProgress(0);
        } else {
          const progressValue = (scrollY / documentHeight) * 100;
          setProgress(Math.min(100, Math.max(0, progressValue)));
        }
      }
    };

    // Initial calculation
    calculateProgress();

    // Add scroll listener
    window.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, [targetRef]);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-1 w-full bg-secondary-black/10 dark:bg-primary-white/10"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-primary-button to-secondary-button transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

ReadingProgress.displayName = "ReadingProgress";

export default ReadingProgress;
