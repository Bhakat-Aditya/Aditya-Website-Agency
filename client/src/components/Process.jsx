import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: "01",
    title: "The Chat",
    desc: "We discuss your business goals and exactly what you want to show your customers. No tech jargon, just plain talk about how to get you more clients.",
  },
  {
    id: "02",
    title: "The Build",
    desc: "I design and code your custom website using modern, high-performance tech (MERN stack). You do nothing but relax while the magic happens.",
  },
  {
    id: "03",
    title: "The Review",
    desc: "You check out the live preview. We tweak the colors, text, and layout until it perfectly matches your vision and brand.",
  },
  {
    id: "04",
    title: "Go Live",
    desc: "Your business is officially on the map! Visible to anyone searching online, optimized for local search, and perfectly sized for mobile devices.",
  },
];

export default function Process() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Animate Header
      gsap.from(".process-header", {
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // 2. Animate the glowing vertical line
      gsap.to(".process-line-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-container",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      // 3. Animate each step card and dot
      const steps = gsap.utils.toArray(".process-step");
      steps.forEach((step) => {
        const card = step.querySelector(".process-card");
        const dot = step.querySelector(".process-dot");
        const dotText = step.querySelector(".process-dot-text");

        // Card slide up
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Dot lights up amber when the line reaches it
        gsap.to(dot, {
          borderColor: "#f59e0b", // amber-500
          boxShadow: "0 0 15px rgba(245,158,11,0.5)",
          scrollTrigger: {
            trigger: step,
            start: "top center",
            toggleActions: "play none none reverse",
          },
        });

        // Text inside dot turns amber
        gsap.to(dotText, {
          color: "#f59e0b",
          scrollTrigger: {
            trigger: step,
            start: "top center",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-zinc-950 py-32 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="process-header text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white italic">
            How It <span className="text-zinc-600">Works</span>
          </h2>
          <p className="mt-6 text-zinc-400 text-lg md:text-xl font-medium tracking-wide uppercase">
            From idea to a live website in 4 simple steps
          </p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="process-container relative max-w-5xl mx-auto">
          {/* Background Line */}
          <div className="absolute top-0 bottom-0 left-[35px] md:left-1/2 md:-translate-x-1/2 w-1 bg-zinc-800 rounded-full" />

          {/* Animated Glow Line */}
          <div className="process-line-fill absolute top-0 bottom-0 left-[35px] md:left-1/2 md:-translate-x-1/2 w-1 bg-amber-500 rounded-full origin-top scale-y-0 shadow-[0_0_15px_rgba(245,158,11,0.8)] z-0" />

          {processSteps.map((step, i) => (
            <div
              key={step.id}
              className={`process-step relative flex items-center mb-16 md:mb-32 w-full ${
                i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* THE DOT */}
              <div className="absolute left-[35px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-zinc-950 border-4 border-zinc-800 flex items-center justify-center z-10 transition-colors duration-300">
                <div className="process-dot absolute inset-0 rounded-full border-4 border-zinc-800 transition-colors duration-300" />
                <span className="process-dot-text text-zinc-500 font-black text-lg tracking-tighter z-10 transition-colors duration-300">
                  {step.id}
                </span>
              </div>

              {/* THE CONTENT CARD */}
              <div
                className={`w-full pl-[90px] md:pl-0 md:w-1/2 ${
                  i % 2 === 0
                    ? "md:pr-20 md:text-right"
                    : "md:pl-20 md:text-left"
                }`}
              >
                <div className="process-card bg-zinc-900/60 p-8 rounded-3xl border border-white/5 hover:border-zinc-700 transition-colors duration-300 shadow-xl group">
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-amber-500 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
