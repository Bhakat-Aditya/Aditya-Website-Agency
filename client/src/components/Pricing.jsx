import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pricingData = [
  {
    id: 1,
    name: "Digital Identity",
    price: "₹1,500",
    billing: "Basic Plan",
    desc: "Ekta perfect 'Digital Visiting Card'.",
    pros: ["Google Search Visibility", "Dokaner Details & Map"],
    cons: ["No Gallery", "Manual Updates Only"],
    color: "#94a3b8",
    bgAlpha: "rgba(148, 163, 184, 0.1)", // Reduced opacity for performance
  },
  {
    id: 2,
    name: "Business Suite",
    price: "₹3,500+",
    billing: "Standard Plan",
    desc: "Gym, Cafe ba boro dokaner jonno best.",
    pros: ["Multi-Page React Site", "WhatsApp Integration"],
    cons: ["Static Content"],
    color: "#3b82f6",
    bgAlpha: "rgba(59, 130, 246, 0.1)",
  },
  {
    id: 3,
    name: "Animated Premium",
    price: "₹7,000+",
    billing: "Elite Plan",
    desc: "International level GSAP animations.",
    pros: ["Awwwards Level Visuals", "Ultra Smooth UX"],
    cons: ["No Admin Panel"],
    color: "#10b981",
    bgAlpha: "rgba(16, 185, 129, 0.1)",
  },
  {
    id: 4,
    name: "Backend System",
    price: "₹11,000+",
    billing: "Full Software",
    desc: "ID/Password diye puro control apnar hate.",
    pros: ["Self Update System", "Zero Maintenance Cost"],
    cons: ["Higher Initial Investment"],
    color: "#f59e0b",
    bgAlpha: "rgba(245, 158, 11, 0.1)",
  },
];

const terms = [
  "1. Hosting & Server: Domain 1st Year free thakbe tar por apna pay korte hobe",
  "2. Payment: Kaj shuru korar age 30% advance mandatory.",
  "3. Maintenance: Site 24/7 chalu rakhar jonno mashik charge thakbe.",
  "4. Updates: Backend plan chara onno plan e manual update charge lagbe.",
  "5. Basic Maintenance: ₹50/mo",
  "6. Standard/Premium Maintenance: ₹75/mo",
  "7. Software Maintenance: ₹100/mo",
  "8. Photo Update: ₹5 per copy",
  "9. Video Update: ₹8 per copy",
  "10. Minor Text Changes: Always FREE!",
];

export default function Pricing() {
  const containerRef = useRef(null);
  const vignetteRef = useRef(null);

  useGSAP(
    () => {
      // 1. Smoothly reveal the cards without heavy stagger
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      // 2. Optimized Movie Credit Scroll
      gsap.to(".terms-scroller", {
        y: "-50%",
        ease: "none",
        duration: 25, // Slower is smoother
        repeat: -1,
      });
    },
    { scope: containerRef },
  );

  const handleHover = (color) => {
    gsap.to(vignetteRef.current, {
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity: 1,
      duration: 0.4,
    });
  };

  const handleLeave = () => {
    gsap.to(vignetteRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-zinc-950 py-32 overflow-hidden"
    >
      {/* PERFORMANCE VIGNETTE (Radial gradient is much faster than Blur filter) */}
      <div
        ref={vignetteRef}
        className="vignette-overlay pointer-events-none absolute inset-0 opacity-0 z-0"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white italic">
            Pick Your <span className="text-zinc-700">Plan</span>
          </h1>
        </div>

        {/* PRICING GRID */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
          {pricingData.map((plan) => (
            <div
              key={plan.id}
              onMouseEnter={() => handleHover(plan.bgAlpha)}
              onMouseLeave={handleLeave}
              className="pricing-card group relative p-1 bg-zinc-900/80 border border-white/5 rounded-[2rem] overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
              style={{ willChange: "transform, opacity" }} // Force GPU
            >
              <div className="relative p-8 h-full flex flex-col pointer-events-none">
                <p className="text-sm font-mono tracking-[0.3em] uppercase text-zinc-500 mb-2">
                  {plan.billing}
                </p>
                <h3 className="text-3xl mt-2 font-black text-white mb-1 uppercase tracking-tighter">
                  {plan.name}
                </h3>
                <div
                  className="text-3xl font-black mb-6"
                  style={{ color: plan.color }}
                >
                  {plan.price}
                </div>

                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  {plan.desc}
                </p>

                <div className="space-y-3 mb-10 flex-grow">
                  {plan.pros.map((p) => (
                    <div
                      key={p}
                      className="text-sm font-bold uppercase text-emerald-400/80"
                    >
                      ✓ {p}
                    </div>
                  ))}
                  {plan.cons.map((c) => (
                    <div
                      key={c}
                      className="text-sm font-bold uppercase text-red-500/40"
                    >
                      ✕ {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOVIE ENDING TERMS */}
        <div className="relative w-full h-[400px] border-t border-b border-white/5 overflow-hidden">
          <div className="terms-scroller flex flex-col items-center gap-4 py-10">
            {[...terms, ...terms].map((term, i) => (
              <p
                key={i}
                className="text-2xl font-mono tracking-widest text-zinc-600 uppercase text-center"
              >
                {term}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
