"use client";

import React, { useEffect, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount after a small delay to ensure paint
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
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

  const styles: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : getInitialTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
  };

  return (
    <div className={cn(className)} style={styles}>
      {children}
    </div>
  );
}

FadeIn.displayName = "FadeIn";

export default FadeIn;
