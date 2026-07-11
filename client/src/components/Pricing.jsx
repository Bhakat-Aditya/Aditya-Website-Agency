import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pricingData = [
  {
    id: 1,
    name: "Single-Page Site",
    price: "₹3,000",
    billing: "Basic Plan",
    desc: "Fast, elegant presence for small businesses.",
    pros: ["High Speed", "Mobile Responsive"],
    cons: ["Single Page Only"],
    color: "#94a3b8",
    bgAlpha: "rgba(148, 163, 184, 0.1)",
  },
  {
    id: 2,
    name: "Multi-Page",
    price: "₹5,000",
    billing: "Standard Plan",
    desc: "Tailored structure for shops and clinics.",
    pros: ["Multiple Pages", "Service Details"],
    cons: ["Static Layout"],
    color: "#3b82f6",
    bgAlpha: "rgba(59, 130, 246, 0.1)",
  },
  {
    id: 3,
    name: "Animated Site",
    price: "₹7,000",
    billing: "Premium Plan",
    desc: "High-end visual experiences with scroll physics.",
    pros: ["Awwwards Level GSAP", "Immersive UX"],
    cons: ["No Admin Dashboard"],
    color: "#10b981",
    bgAlpha: "rgba(16, 185, 129, 0.1)",
  },
  {
    id: 4,
    name: "Dashboard",
    price: "₹10,000",
    billing: "Backend Plan",
    desc: "Internal backend systems and portals.",
    pros: ["Data Management", "Admin Controls"],
    cons: ["No Public Website"],
    color: "#f59e0b",
    bgAlpha: "rgba(245, 158, 11, 0.1)",
  },
  {
    id: 5,
    name: "Dashboard + Simple Site",
    price: "₹15,000",
    billing: "Full Suite",
    desc: "Full business suite with public presence.",
    pros: ["Public Site", "Backend Control"],
    cons: ["Standard UI"],
    color: "#8b5cf6",
    bgAlpha: "rgba(139, 92, 246, 0.1)",
  },
  {
    id: 6,
    name: "Dashboard + Animated Site",
    price: "₹18,000",
    billing: "Elite Suite",
    desc: "Ultimate premium suite with immersive UI.",
    pros: ["Premium Animations", "Backend Dashboard"],
    cons: ["Higher Investment"],
    color: "#ec4899",
    bgAlpha: "rgba(236, 72, 153, 0.1)",
  },
  {
    id: 7,
    name: "CRM System",
    price: "₹25,000",
    billing: "Enterprise",
    desc: "Complete end-to-end business operations tool.",
    pros: ["API Integrations", "Full Automation"],
    cons: ["Longer Build Time"],
    color: "#ef4444",
    bgAlpha: "rgba(239, 68, 68, 0.1)",
  }
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

const PricingCard = ({ plan, onHover, onLeave }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // 12 deg max tilt
    const rotateY = ((x - centerX) / centerX) * 12;

    // 3D Parallax Tilt
    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });

    // Content parallax counter-movement
    gsap.to(contentRef.current, {
      x: (x - centerX) * 0.05,
      y: (y - centerY) * 0.05,
      ease: "power2.out",
      duration: 0.4,
    });

    // Dynamic mouse-following glare
    gsap.to(glowRef.current, {
      background: `radial-gradient(circle at ${x}px ${y}px, ${plan.color}50 0%, transparent 50%)`,
      opacity: 1,
      duration: 0.1,
    });
  };

  const handleMouseEnter = () => {
    onHover(plan.bgAlpha);
    gsap.to(cardRef.current, {
      scale: 1.05,
      z: 50,
      ease: "back.out(1.5)",
      duration: 0.5,
    });
  };

  const handleMouseLeave = () => {
    onLeave();
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      z: 0,
      ease: "elastic.out(1, 0.5)",
      duration: 1.2,
    });
    
    gsap.to(contentRef.current, {
      x: 0,
      y: 0,
      ease: "elastic.out(1, 0.5)",
      duration: 1.2,
    });

    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.4,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pricing-card group relative p-1 bg-zinc-900/80 border border-white/5 rounded-[2rem] overflow-hidden cursor-crosshair"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Glare/Glow following mouse */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-0"
      />

      {/* Static Border glow on hover */}
      <div
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          boxShadow: `inset 0 0 0 1px ${plan.color}, 0 10px 40px -10px ${plan.color}40`,
        }}
      />

      <div ref={contentRef} className="relative p-8 h-full flex flex-col pointer-events-none z-10" style={{ transformStyle: "preserve-3d" }}>
        <p className="text-sm font-mono tracking-[0.3em] uppercase text-zinc-500 mb-2" style={{ transform: "translateZ(20px)" }}>
          {plan.billing}
        </p>
        <h3 className="text-3xl mt-2 font-black text-white mb-1 uppercase tracking-tighter" style={{ transform: "translateZ(30px)" }}>
          {plan.name}
        </h3>
        <div
          className="text-3xl font-black mb-6"
          style={{ color: plan.color, transform: "translateZ(40px)" }}
        >
          {plan.price}
        </div>

        <p className="text-sm text-zinc-400 mb-6 leading-relaxed" style={{ transform: "translateZ(10px)" }}>
          {plan.desc}
        </p>

        <div className="space-y-3 mb-10 flex-grow" style={{ transform: "translateZ(20px)" }}>
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
  );
};

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
            <PricingCard key={plan.id} plan={plan} onHover={handleHover} onLeave={handleLeave} />
          ))}
        </div>

        {/* MOVIE ENDING TERMS */}
        <div className="relative w-full h-[400px] border-t border-b border-white/5 overflow-hidden">
          <div className="terms-scroller flex flex-col items-center gap-4 py-10">
            {[...terms, ...terms].map((term, i) => (
              <p
                key={i}
                className="text-sm md:text-2xl font-mono tracking-widest text-zinc-600 uppercase text-center"
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
