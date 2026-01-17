import { useEffect, useRef, useState, useCallback } from "react";

interface SpotlightProviderProps {
  children: React.ReactNode;
}

function SpotlightProvider({ children }: SpotlightProviderProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lerpFactor = 0.15; // Smooth interpolation factor (0-1, lower = smoother)

  // Smooth lerp animation loop
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      setMousePosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * lerpFactor,
        y: prev.y + (targetPosition.y - prev.y) * lerpFactor,
      }));
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [targetPosition]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div className="relative">
      {/* Spotlight gradient overlay - only visible on large screens */}
      <div
        className="pointer-events-none fixed inset-0 z-30 hidden lg:block"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, hsla(248, 62%, 44%, 0.07), transparent 40%)`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

SpotlightProvider.displayName = "SpotlightProvider";

export default SpotlightProvider;
