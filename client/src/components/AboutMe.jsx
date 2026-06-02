import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      // 1. Image wrapper reveal (slides up from the bottom revealing the image)
      tl.fromTo(
        ".about-image-wrapper",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power3.inOut",
        },
      );

      // 2. Image scale down effect (creates a parallax feel as it reveals)
      tl.from(
        ".about-image",
        {
          scale: 1.3,
          duration: 1.2,
          ease: "power3.out",
        },
        "<0.2", // Start slightly after the wrapper reveal begins
      );

      // 3. Stagger in the text elements
      tl.from(
        ".about-text",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.6", // Overlap with the image animation
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-zinc-950 py-32 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* LEFT: The Image */}
        <div className="w-full lg:w-5/12 relative flex justify-center lg:justify-end">
          {/* Decorative Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

          <div className="about-image-wrapper relative w-full max-w-[400px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/dp.jpg"
              alt="Aditya - Developer"
              className="about-image w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
            {/* Dark gradient overlay at the bottom so it blends with the dark theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

            {/* Floating Badge */}
            <div className="about-text absolute bottom-6 left-6 right-6 backdrop-blur-md bg-zinc-900/60 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-white font-bold tracking-tight">Aditya</p>
                <p className="text-zinc-400 text-xs font-mono tracking-widest uppercase mt-1">
                  Lead Developer
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30 text-amber-500">
                🚀
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: The Copy */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center text-center lg:text-left">
          <h2 className="about-text text-5xl md:text-7xl font-black tracking-tighter uppercase text-white italic mb-6 leading-none">
            Meet Your <br className="hidden md:block" />
            <span className="text-amber-500">Local Expert</span>
          </h2>

          <div className="space-y-6">
            <p className="about-text text-zinc-400 text-lg md:text-xl leading-relaxed">
              I build high-performance digital storefronts for local businesses
              across West Bengal — from Midnapore to Kolkata, Kharagpur to
              Howrah. My goal is simple: to make your business look like the
              most premium option in your city.
            </p>

            <p className="about-text text-zinc-400 text-lg md:text-xl leading-relaxed">
              I don't use slow, clunky drag-and-drop templates. Every website I
              build is hand-coded from scratch using industry-leading technology
              (the MERN stack).
            </p>

            <p className="about-text text-white font-medium text-lg md:text-xl leading-relaxed italic border-l-4 border-amber-500 pl-4 py-1">
              "What does that mean for you? Lightning-fast loading speeds,
              bulletproof security, and a custom design that makes your
              competitors look outdated."
            </p>
          </div>

          <div className="about-text flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-10">
            <div className="px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-mono tracking-widest uppercase text-zinc-300">
              📍 West Bengal, India
            </div>
            <div className="px-6 py-3 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono tracking-widest uppercase text-amber-400">
              ⚡ Custom Code (MERN)
            </div>
            <div className="px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono tracking-widest uppercase text-emerald-400">
              🤝 Long-Term Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
