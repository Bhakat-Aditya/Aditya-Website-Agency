import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "../data/portfolio.json";

gsap.registerPlugin(ScrollTrigger);

// 1. Safe Image Loader
const SafeImage = ({ src, alt, accentColor }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full bg-zinc-900 rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-800">
      {!isLoaded && !hasError && (
        <div className="absolute flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-4 border-zinc-700 border-t-zinc-300 animate-spin"></div>
          <span className="text-xs font-mono text-zinc-500 tracking-widest">
            LOADING ASSET...
          </span>
        </div>
      )}
      {hasError && (
        <div className="absolute flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-zinc-600 tracking-widest">
            ASSET NOT FOUND
          </span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        decoding="async" /* THIS STOPS THE IMAGE FROM FREEZING THE SCROLL */
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ backgroundColor: accentColor }}
      ></div>
    </div>
  );
};

// 2. The Main Z-Axis Scroll Component
export default function WorksTunnel() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // The Slides Array
  const tunnelItems = [
    { id: "intro1", isIntro: true, title: "HERE ARE MY WORKS" },
    { id: "intro2", isBonglishPitch: true, title: "The Capability Pitch" },
    ...projectsData,
  ];

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".tunnel-item");
      const totalItems = items.length;

      // 0 EXISTENCE: Start everything tiny (scale 0) and invisible
      gsap.set(items, {
        opacity: 0,
        scale: 0,
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalItems * 120}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const currentIdx = Math.min(
              Math.floor(self.progress * totalItems),
              totalItems - 1,
            );
            setActiveIndex(currentIdx);
          },
        },
      });

      // Animate the Side Scale Progress Line
      tl.to(
        ".progress-fill",
        {
          height: "100%",
          width: "100%",
          ease: "none",
        },
        0,
      );

      // Step 1: The First Intro Title grows from 0 to 1 on first scroll
      tl.to(items[0], {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      });

      // Step 2: Loop through all items and make them fly past the camera
      for (let i = 0; i < totalItems - 1; i++) {
        tl.to(
          items[i],
          {
            scale: 5, // Flies past the screen
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          `sync${i}`,
        ).to(
          items[i + 1],
          {
            scale: 1, // Next item grows from 0 to 1
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          `sync${i}`,
        );
      }

      tl.to(items[totalItems - 1], { opacity: 1, duration: 0.5 });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-zinc-950 overflow-hidden flex items-center justify-center"
    >
      {/* THE SIDE SCALE TRACKER (Only handles the dots and progress line) */}
      <div
        className="
    absolute 
    
    /* ✅ MOBILE (top horizontal centered) */
    top-4 left-1/2 -translate-x-1/2 w-[80vw] h-1 flex-row
    
    /* ✅ DESKTOP (right vertical) */
    md:top-1/2 md:left-auto md:right-10 md:-translate-x-0 md:-translate-y-1/2 md:h-[40vh] md:w-1 md:flex-col
    
    bg-zinc-800 rounded-full z-50 flex justify-between items-center
  "
      >
        {/* Progress fill */}
        <div
          className="
      progress-fill 
      absolute 
      md:top-0 md:left-0 md:w-full md:h-[0%]
      
      top-0 left-0 h-full w-[0%]
      
      bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]
    "
        ></div>

        {/* Dots */}
        {tunnelItems.map((_, idx) => (
          <div
            key={`dot-${idx}`}
            className={`w-3 h-3 rounded-full z-10 transition-all duration-500 ${
              activeIndex === idx
                ? "bg-white shadow-[0_0_15px_white] scale-150"
                : "bg-zinc-700 scale-100"
            }`}
          />
        ))}
      </div>

      {/* THE TUNNEL ITEMS (Rendered in the center of the screen) */}
      {tunnelItems.map((item) => (
        <div
          key={item.id}
          className="tunnel-item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 md:w-[70vw] max-w-6xl flex items-center justify-center cursor-hover"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        >
          {item.isIntro ? (
            // 1st SLIDE: "SEE MY WORKS"
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-center tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
              {item.title}
            </h2>
          ) : item.isBonglishPitch ? (
            // 2nd SLIDE: NEW BONGLISH PITCH
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-center tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 max-w-4xl leading-tight drop-shadow-2xl">
              "Eta dekhle apni clear idea peye jaben ami apnar website koto
              bhalo banate pari."
            </h2>
          ) : (
            // REST OF SLIDES: THE PROJECT CARDS
            <div className="w-full flex flex-col md:flex-row gap-8 items-center bg-zinc-900 p-6 md:p-10 rounded-3xl border border-zinc-800 shadow-2xl">
              <div className="w-full md:w-1/2 h-48 md:h-[400px]">
                <SafeImage
                  src={item.imagePath}
                  alt={item.title}
                  accentColor={item.accentColor}
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <p
                  className="text-xs font-bold tracking-widest mb-2"
                  style={{ color: item.accentColor }}
                >
                  {item.clientType}
                </p>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-none tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-base md:text-lg mb-6">
                  {item.shortPitch}
                </p>
                <p className="text-xl text-yellow-500 font-semibold">
                  One-Time Price: ₹{item.price || "Custom"}
                </p>
                <p className="text-sm text-zinc-300">
                  Yearly Maintenance: ₹{item.maintenance || "Included"}
                </p>

                <div className="flex mt-4 flex-wrap gap-2 mb-8">
                  {item.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-zinc-950 text-zinc-300 text-xs rounded-full border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={item.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 w-fit px-6 py-3 bg-white text-black font-bold rounded-full transition-transform hover:scale-105"
                >
                  Explore Project
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
