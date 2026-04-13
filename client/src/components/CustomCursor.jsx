import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect if device supports mouse (not touch)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    const handleChange = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useGSAP(() => {
    if (!isDesktop) return; // ❌ Don't run on mobile

    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("pointermove", moveCursor);

    const handleMouseOver = (e) => {
      if (e.target.closest(".cursor-hover")) {
        gsap.to(cursor, {
          scale: 3,
          opacity: 0.5,
          duration: 0.2,
        });
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest(".cursor-hover")) {
        gsap.to(cursor, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isDesktop]);

  // ❌ Don't render at all on mobile
  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: "transform" }}
    />
  );
}