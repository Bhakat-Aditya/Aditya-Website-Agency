import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import testiData from "../data/testi.json";

gsap.registerPlugin(ScrollTrigger);

// Helper function to extract initials
const getInitials = (name) => {
  if (!name) return "??";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

// --------------------------------------------------------
// Individual 3D Tilt Card Component
// --------------------------------------------------------
const TiltCard = ({ testi }) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });

    gsap.to(contentRef.current, {
      z: 30,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.7,
    });

    gsap.to(contentRef.current, {
      z: 0,
      ease: "power3.out",
      duration: 0.7,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className="testi-card snap-start bg-zinc-900/60 border border-white/5 rounded-[2rem] flex flex-col transition-shadow duration-300 h-[280px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      <div
        ref={contentRef}
        className="w-full h-full p-8 flex flex-col"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* TOP: Avatar, Name, and Stars */}
        <div className="flex items-center gap-4 mb-6 shrink-0">
          <div className="w-14 h-14 shrink-0 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner flex items-center justify-center text-xl font-black tracking-widest text-amber-500">
            {getInitials(testi.name)}
          </div>

          <div>
            <h3 className="text-xl font-bold text-white tracking-tight uppercase">
              {testi.name}
            </h3>
            <div className="flex text-amber-500 text-sm mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < testi.stars ? "opacity-100" : "opacity-20"}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: Review Text OR Default Badge */}
        <div
          className="flex-grow overflow-y-auto pr-2 
          [&::-webkit-scrollbar]:w-1.5 
          [&::-webkit-scrollbar-track]:bg-zinc-900/50 
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-zinc-700 
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          {testi.review && testi.review.trim() !== "" ? (
            <p className="text-zinc-400 text-base leading-relaxed italic">
              "{testi.review}"
            </p>
          ) : (
            <div className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="text-base">✨</span> One more happy customer
                served
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
// --------------------------------------------------------

export default function Testimonials() {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  // State to track scroll bounds
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Check current scroll position
  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    // Using Math.ceil to prevent fractional pixel issues on high DPI screens
    setCanScrollPrev(scrollLeft > 0);
    setCanScrollNext(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  };

  // Run on mount and window resize
  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useGSAP(
    () => {
      gsap.from(".testi-header", {
        scrollTrigger: {
          trigger: ".testi-header",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".testi-card", {
        scrollTrigger: {
          trigger: ".slider-container",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
      });
    },
    { scope: containerRef },
  );

  const slideNext = () => {
    if (sliderRef.current && canScrollNext) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const slidePrev = () => {
    if (sliderRef.current && canScrollPrev) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      style={{ perspective: "2000px" }}
      className="relative w-full bg-zinc-950 py-32 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="testi-header text-center mb-16">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white italic">
            Client <span className="text-amber-500">Love</span>
          </h2>
        </div>

        {/* SLIDER CONTAINER */}
        <div className="slider-container relative w-full mb-10">
          <div
            ref={sliderRef}
            onScroll={checkScroll} // Track scroll events
            className="grid grid-flow-col gap-6 overflow-x-auto snap-x snap-mandatory py-6 px-2 -mx-2
                       grid-rows-2 auto-cols-[100%] 
                       md:grid-rows-1 md:auto-cols-[calc(33.3333%-16px)]
                       [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {testiData.map((testi) => (
              <TiltCard key={testi.id} testi={testi} />
            ))}
          </div>
        </div>

        {/* SLIDER CONTROLS (BOTTOM) */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={slidePrev}
            disabled={!canScrollPrev}
            className={`w-14 h-14 flex items-center justify-center rounded-full border transition-all duration-300 focus:outline-none ${
              canScrollPrev
                ? "bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:scale-105 cursor-pointer"
                : "bg-zinc-900/40 border-zinc-800/40 text-white/30 cursor-not-allowed"
            }`}
            aria-label="Previous Testimonials"
          >
            ←
          </button>
          <button
            onClick={slideNext}
            disabled={!canScrollNext}
            className={`w-14 h-14 flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none ${
              canScrollNext
                ? "bg-amber-500 text-zinc-950 hover:bg-amber-400 hover:scale-105 shadow-[0_0_15px_rgba(245,158,11,0.4)] cursor-pointer"
                : "bg-amber-500/40 text-zinc-950/40 cursor-not-allowed shadow-none"
            }`}
            aria-label="Next Testimonials"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
