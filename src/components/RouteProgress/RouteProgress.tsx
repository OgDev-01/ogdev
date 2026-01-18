"use client";

import { useEffect, useState, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

const RouteProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoading = useRouterState({ select: (s) => s.isLoading });

  useEffect(() => {
    if (isLoading) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Start the progress animation
      setIsVisible(true);
      setProgress(0);

      // Quickly animate to ~70%
      const timer1 = setTimeout(() => setProgress(30), 50);
      const timer2 = setTimeout(() => setProgress(60), 200);
      const timer3 = setTimeout(() => setProgress(70), 400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      // Complete the animation
      setProgress(100);

      // Hide after animation completes
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 300);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isLoading]);

  if (!isVisible && progress === 0) {
    return null;
  }

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-0.5 w-full"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading"
    >
      <div
        className="h-full bg-gradient-to-r from-primary-button via-secondary-button to-primary-button transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  );
};

RouteProgress.displayName = "RouteProgress";

export default RouteProgress;
