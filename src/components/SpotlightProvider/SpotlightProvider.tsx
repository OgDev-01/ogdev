import { useEffect, useRef, useState, useCallback } from "react";

interface SpotlightProviderProps {
  children: React.ReactNode;
}

const CIRCLE_SIZE = 80;
const CROSSHAIR_SIZE = 20;

function SpotlightProvider({ children }: SpotlightProviderProps) {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [crosshairPosition, setCrosshairPosition] = useState({
    x: -200,
    y: -200,
  });
  const [targetPosition, setTargetPosition] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringContent, setIsHoveringContent] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const rafRef = useRef<number | null>(null);
  const circleLerpFactor = 0.12;
  const crosshairLerpFactor = 0.4; // Crosshair follows faster

  // Smooth lerp animation loop
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      // Circle follows with more lag
      setMousePosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * circleLerpFactor,
        y: prev.y + (targetPosition.y - prev.y) * circleLerpFactor,
      }));
      // Crosshair follows more closely
      setCrosshairPosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * crosshairLerpFactor,
        y: prev.y + (targetPosition.y - prev.y) * crosshairLerpFactor,
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

      const target = e.target as HTMLElement;

      // Check if hovering over links/buttons
      const isLink = target.closest("a, button") !== null;
      setIsHoveringLink(isLink);

      // Check if hovering over content
      const isContent =
        target.closest(
          "p, h1, h2, h3, h4, h5, h6, a, button, li, span, img"
        ) !== null;
      setIsHoveringContent(isContent);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setIsHoveringContent(false);
    setIsHoveringLink(false);
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
      {/* Crosshair cursor - only visible on large screens */}
      <div
        className="pointer-events-none fixed z-[60] hidden lg:block"
        style={{
          width: CROSSHAIR_SIZE,
          height: CROSSHAIR_SIZE,
          left: crosshairPosition.x - CROSSHAIR_SIZE / 2,
          top: crosshairPosition.y - CROSSHAIR_SIZE / 2,
          opacity: isVisible && !isHoveringLink ? 1 : 0,
          transition: "opacity 0.15s ease-out",
          willChange: "left, top",
        }}
        aria-hidden="true"
      >
        {/* Horizontal line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: "white",
            mixBlendMode: "difference",
            transform: "translateY(-50%)",
          }}
        />
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: "white",
            mixBlendMode: "difference",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Inverted circle - only visible on large screens */}
      <div
        className="pointer-events-none fixed z-50 hidden rounded-full lg:block"
        style={{
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          left: mousePosition.x - CIRCLE_SIZE / 2,
          top: mousePosition.y - CIRCLE_SIZE / 2,
          backgroundColor: "white",
          mixBlendMode: "difference",
          opacity: isVisible ? 1 : 0,
          transform: isHoveringContent ? "scale(1)" : "scale(0.15)",
          transition:
            "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-out",
          willChange: "left, top, transform",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

SpotlightProvider.displayName = "SpotlightProvider";

export default SpotlightProvider;
