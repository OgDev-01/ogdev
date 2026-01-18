import { useEffect, useRef, useState, useCallback } from "react";

interface SpotlightProviderProps {
  children: React.ReactNode;
}

const CIRCLE_SIZE = 80;
const CROSSHAIR_SIZE = 20;
const IDLE_TIMEOUT_MS = 150; // Stop animation after 150ms of no movement

function SpotlightProvider({ children }: SpotlightProviderProps) {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [crosshairPosition, setCrosshairPosition] = useState({
    x: -200,
    y: -200,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringContent, setIsHoveringContent] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const rafRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetRef = useRef({ x: -200, y: -200 });

  const circleLerpFactor = 0.12;
  const crosshairLerpFactor = 0.4; // Crosshair follows faster

  // Start the animation loop (only when cursor is moving)
  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const animate = () => {
      if (!isAnimatingRef.current) return;

      const target = targetRef.current;

      // Circle follows with more lag
      setMousePosition((prev) => ({
        x: prev.x + (target.x - prev.x) * circleLerpFactor,
        y: prev.y + (target.y - prev.y) * circleLerpFactor,
      }));
      // Crosshair follows more closely
      setCrosshairPosition((prev) => ({
        x: prev.x + (target.x - prev.x) * crosshairLerpFactor,
        y: prev.y + (target.y - prev.y) * crosshairLerpFactor,
      }));

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // Stop the animation loop when cursor is idle
  const stopAnimation = useCallback(() => {
    isAnimatingRef.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // Update target position ref (no state update needed for target)
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Start animation if not already running
      startAnimation();

      // Reset idle timeout
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      idleTimeoutRef.current = setTimeout(stopAnimation, IDLE_TIMEOUT_MS);

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
    },
    [startAnimation, stopAnimation]
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setIsHoveringContent(false);
    setIsHoveringLink(false);
    stopAnimation();
  }, [stopAnimation]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      stopAnimation();
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave, stopAnimation]);

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
