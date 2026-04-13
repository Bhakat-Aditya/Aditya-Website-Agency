import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    // 1. Setup high-performance GSAP quickTo setters
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });

    // 2. Track mouse movement globally
    const moveCursor = (e) => {
      // Center the cursor dot on the mouse coordinates
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // 3. Global hover detection (The Magic Part)
    // This listens for mouse enter/leave on ANY element with the class 'cursor-hover'
    const handleMouseOver = (e) => {
      if (e.target.closest('.cursor-hover')) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e) => {
      if (e.target.closest('.cursor-hover')) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // 4. Animate the scale based on hover state
  useGSAP(() => {
    gsap.to(cursorRef.current, {
      scale: isHovering ? 3 : 1,
      opacity: isHovering ? 0.5 : 1,
      duration: 0.3,
      ease: "power2.out"
    });
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: "transform" }}
    ></div>
  );
}