import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PremiumScroll() {
  const coreRef = useRef(null);
  const trailRef = useRef(null);
  const starRef = useRef(null);

  useGSAP(() => {
    gsap.to(coreRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "max",
        scrub: 0.1,
      },
    });

    gsap.to(trailRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "max",
        scrub: 0.8,
      },
    });

    // Continuous Rotation
    gsap.to(starRef.current, {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: "linear",
    });
  });

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[10000] pointer-events-none">
      {/* Background Track */}
      <div className="absolute top-0 left-0 w-full h-full bg-zinc-900/40 backdrop-blur-sm" />

      {/* The Ambient Trail Glow */}
      <div
        ref={trailRef}
        className="absolute top-0 left-0 h-full bg-amber-500/50 blur-[6px]"
        style={{ width: "0%", willChange: "width" }}
      />

      {/* The Main Crisp Progress Line */}
      <div
        ref={coreRef}
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-700 via-amber-400 to-white shadow-[0_0_10px_#fbbf24]"
        style={{ width: "0%", willChange: "width" }}
      >
        {/* THE UPGRADED GLOWING STAR */}
        <div
          ref={starRef}
          // Increased size from w-5/h-5 to w-8/h-8 (32px) and added a vibrant amber drop-shadow
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-8 h-8 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)] filter"
          style={{ willChange: "transform" }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
            {/* Define the Multi-Color Gradient */}
            <defs>
              <linearGradient
                id="premium-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fef08a" /> {/* Light Yellow */}
                <stop offset="35%" stopColor="#fde047" /> {/* Bright Yellow */}
                <stop offset="70%" stopColor="#f59e0b" />{" "}
                {/* Your Agency Amber */}
                <stop offset="100%" stopColor="#ea580c" />{" "}
                {/* Deep Orange/Red */}
              </linearGradient>

              {/* Custom Radial Glow for the Core */}
              <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* The main star shape using the new gradient */}
            <path
              d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"
              fill="url(#premium-gradient)"
            />
            {/* A larger, intensely bright white/amber core */}
            <circle
              cx="12"
              cy="12"
              r="3.5"
              fill="url(#core-glow)"
              className="blur-[1px]"
            />
          </svg>
        </div>
      </div>
    </div>

    // asss wed awtge  tgjaa  vite 
  );
}
