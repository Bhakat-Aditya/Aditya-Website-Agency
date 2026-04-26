import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const dotRef = useRef(null);
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
    if (!isDesktop) return; // Don't run on mobile

    // Smooth tracking for the entire cursor wrapper
    const xMove = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.15,
      ease: "power3.out",
    });
    const yMove = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.15,
      ease: "power3.out",
    });

    const moveCursor = (e) => {
      xMove(e.clientX);
      yMove(e.clientY);
    };

    window.addEventListener("pointermove", moveCursor);

    // 🌟 CONTINUOUS MOTION: This provides the "GIF/Video" alive feeling with ZERO loading cost
    gsap.to(textRef.current, {
      rotation: 360,
      duration: 12, // Slow, elegant, premium spin
      repeat: -1,
      ease: "none",
    });

    // Subtle Hover Effects (No massive enlargement)
    const handleMouseOver = (e) => {
      if (e.target.closest(".cursor-hover")) {
        // Dot turns amber and scales just slightly
        gsap.to(dotRef.current, {
          scale: 1.5,
          backgroundColor: "#fbbf24", // Tailwind Amber 500
          duration: 0.3,
          ease: "back.out(2)",
        });
        // Text ring subtly shrinks and fades to clear visual noise
        gsap.to(textRef.current, {
          opacity: 0.15,
          scale: 0.7,
          duration: 0.3,
        });
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest(".cursor-hover")) {
        // Return to default state
        gsap.to(dotRef.current, {
          scale: 1,
          backgroundColor: "#ffffff",
          duration: 0.3,
        });
        gsap.to(textRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
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

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      {/* Crisp Central Dot */}
      <div
        ref={dotRef}
        className="absolute w-2.5 h-2.5 bg-white rounded-full z-10"
        style={{ willChange: "transform, background-color" }}
      />

      {/* Rotating SVG Typographic Ring */}
      <div
        ref={textRef}
        className="absolute w-[100px] h-[100px]"
        style={{ willChange: "transform, opacity" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <path
            id="cursorTextPath"
            fill="none"
            d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
          />
          <text className="text-[15.5px] font-bold uppercase fill-white tracking-[0.2em]">
            <textPath href="#cursorTextPath" startOffset="0%">
              ADITYA WEB AGENCY 
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
