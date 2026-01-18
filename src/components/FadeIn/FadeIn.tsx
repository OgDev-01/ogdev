"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

import { cn } from "@/libs/utils";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
}

function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 400,
}: FadeInProps) {
  const isNavigating = useRouterState({ select: (s) => s.isLoading });
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Skip animation if already animated or if we're navigating away
    if (hasAnimated.current) {
      return;
    }

    // Trigger animation on mount after a small delay to ensure paint
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
      hasAnimated.current = true;
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(16px)";
      case "down":
        return "translateY(-16px)";
      case "left":
        return "translateX(16px)";
      case "right":
        return "translateX(-16px)";
      case "none":
        return "none";
    }
  };

  // During navigation, keep elements visible to prevent flash
  // Once animated, always show without animation
  const shouldShow = isVisible || hasAnimated.current || isNavigating;

  const styles: React.CSSProperties = {
    opacity: shouldShow ? 1 : 0,
    transform: shouldShow ? "none" : getInitialTransform(),
    transition:
      hasAnimated.current || isNavigating
        ? "none"
        : `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
  };

  return (
    <div className={cn(className)} style={styles}>
      {children}
    </div>
  );
}

FadeIn.displayName = "FadeIn";

export default FadeIn;
