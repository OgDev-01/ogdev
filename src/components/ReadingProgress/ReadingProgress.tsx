"use client";

import { useEffect, useRef, useCallback } from "react";

interface ReadingProgressProps {
  targetRef?: React.RefObject<HTMLElement | null>;
}

const ReadingProgress = ({ targetRef }: ReadingProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const calculateProgress = useCallback(() => {
    const target = targetRef?.current;
    let progressValue = 0;

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
        progressValue = 0;
      } else if (scrollY >= endPoint) {
        progressValue = 1;
      } else {
        progressValue = (scrollY - startPoint) / (endPoint - startPoint);
        progressValue = Math.min(1, Math.max(0, progressValue));
      }
    } else {
      // Fallback: Calculate based on full page
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollY = window.scrollY;

      if (documentHeight > 0) {
        progressValue = scrollY / documentHeight;
        progressValue = Math.min(1, Math.max(0, progressValue));
      }
    }

    // Directly update DOM for smooth performance (no React re-render)
    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${progressValue})`;
      progressRef.current.setAttribute(
        "aria-valuenow",
        Math.round(progressValue * 100).toString()
      );
    }
  }, [targetRef]);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      // Schedule update on next frame for smooth animation
      rafRef.current = requestAnimationFrame(calculateProgress);
    };

    // Initial calculation
    calculateProgress();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [calculateProgress]);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-1 w-full bg-secondary-black/10 dark:bg-primary-white/10"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        ref={progressRef}
        className="h-full w-full origin-left bg-gradient-to-r from-primary-button to-secondary-button will-change-transform"
        style={{ transform: "scaleX(0)" }}
        aria-valuenow={0}
      />
    </div>
  );
};

ReadingProgress.displayName = "ReadingProgress";

export default ReadingProgress;
