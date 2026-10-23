import { useRef, useState, useEffect } from "react";
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

/* ── Floating Particle for the banner ── */
const PARTICLE_COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#ec4899", "#f59e0b"];

const FloatingParticle = ({ index }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const size = gsap.utils.random(3, 8);
    const startX = gsap.utils.random(0, 100);
    const startY = gsap.utils.random(0, 100);
    const color = PARTICLE_COLORS[index % PARTICLE_COLORS.length];

    gsap.set(ref.current, {
      width: size,
      height: size,
      left: `${startX}%`,
      top: `${startY}%`,
      background: color,
      boxShadow: `0 0 ${size * 3}px ${color}80`,
    });

    // Float animation — unique per particle
    gsap.to(ref.current, {
      y: gsap.utils.random(-80, 80),
      x: gsap.utils.random(-60, 60),
      opacity: gsap.utils.random(0.3, 1),
      scale: gsap.utils.random(0.5, 1.8),
      duration: gsap.utils.random(4, 9),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: gsap.utils.random(0, 3),
    });
  }, [index]);

  return (
    <div
      ref={ref}
      className="absolute rounded-full pointer-events-none z-0 opacity-0"
    />
  );
};



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
        <h3 className="text-3xl mt-2 font-black text-white mb-2 uppercase tracking-tighter" style={{ transform: "translateZ(30px)" }}>
          {plan.name}
        </h3>
        {/* Price section - commented out for now (uncomment to show) */}
        {/* <div
          className="text-3xl font-black mb-6"
          style={{ color: plan.color, transform: "translateZ(40px)" }}
        >
          {plan.price}
        </div> */}

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
  const bannerRef = useRef(null);
  const bannerContentRef = useRef(null);

  // Magnetic mouse-follow on the banner
  const handleBannerMove = (e) => {
    if (!bannerRef.current || !bannerContentRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(bannerContentRef.current, {
      rotateX: y * -8,
      rotateY: x * 8,
      transformPerspective: 1200,
      ease: "power2.out",
      duration: 0.6,
    });

    // Move glow orbs toward cursor
    gsap.to(".banner-glow-1", {
      x: x * 120,
      y: y * 80,
      ease: "power2.out",
      duration: 0.8,
    });
    gsap.to(".banner-glow-2", {
      x: x * -80,
      y: y * -60,
      ease: "power2.out",
      duration: 1,
    });
  };

  const handleBannerLeave = () => {
    gsap.to(bannerContentRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "elastic.out(1, 0.4)",
      duration: 1.5,
    });
    gsap.to(".banner-glow-1, .banner-glow-2", {
      x: 0,
      y: 0,
      ease: "elastic.out(1, 0.4)",
      duration: 1.5,
    });
  };

  useGSAP(
    () => {
      // 1. Smoothly reveal the cards
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

      // 2. Banner entrance — dramatic scale + clip reveal
      gsap.from(".pricing-banner", {
        scrollTrigger: {
          trigger: ".pricing-banner",
          start: "top 92%",
        },
        y: 100,
        opacity: 0,
        scale: 0.85,
        duration: 1.4,
        ease: "expo.out",
      });

      // 3. Rotating gradient border spin
      gsap.to(".banner-border-spin", {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      // 4. Badge — bouncy entrance
      gsap.from(".banner-badge", {
        scrollTrigger: {
          trigger: ".pricing-banner",
          start: "top 85%",
        },
        scale: 0,
        opacity: 0,
        rotation: -20,
        duration: 1,
        delay: 0.6,
        ease: "back.out(3)",
      });

      // 5. Headline reveal
      gsap.from(".banner-headline", {
        scrollTrigger: {
          trigger: ".pricing-banner",
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.5,
        ease: "expo.out",
      });

      // 6. Horizontal lines draw in from edges
      gsap.from(".banner-hr-left", {
        scrollTrigger: {
          trigger: ".pricing-banner",
          start: "top 85%",
        },
        scaleX: 0,
        transformOrigin: "right center",
        duration: 1.2,
        delay: 0.8,
        ease: "power3.inOut",
      });
      gsap.from(".banner-hr-right", {
        scrollTrigger: {
          trigger: ".pricing-banner",
          start: "top 85%",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        delay: 0.8,
        ease: "power3.inOut",
      });

      // 7. Subtitle reveal with stagger
      gsap.from(".banner-sub", {
        scrollTrigger: {
          trigger: ".pricing-banner",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 1,
        ease: "power3.out",
      });

      // 8. Shimmer sweep across subtitle
      gsap.to(".banner-shimmer", {
        x: "200%",
        duration: 3,
        repeat: -1,
        repeatDelay: 2,
        ease: "power2.inOut",
      });

      // 9. Multi-glow pulse
      gsap.to(".banner-glow-1", {
        opacity: 0.7,
        scale: 1.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".banner-glow-2", {
        opacity: 0.5,
        scale: 1.3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // 10. Domain badge float
      gsap.from(".domain-badge", {
        scrollTrigger: {
          trigger: ".pricing-banner",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 1.3,
        ease: "back.out(2)",
      });
      gsap.to(".domain-badge", {
        y: -6,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
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
      {/* PERFORMANCE VIGNETTE */}
      <div
        ref={vignetteRef}
        className="vignette-overlay pointer-events-none absolute inset-0 opacity-0 z-0"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white italic">
            Our <span className="text-zinc-700">Plans</span>
          </h1>
        </div>

        {/* PRICING GRID */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
          {pricingData.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onHover={handleHover} onLeave={handleLeave} />
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ── ONE-TIME PAYMENT — CINEMATIC BANNER ──────────────── */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div
          ref={bannerRef}
          onMouseMove={handleBannerMove}
          onMouseLeave={handleBannerLeave}
          className="pricing-banner relative w-full rounded-[2.5rem] cursor-crosshair"
          style={{ perspective: "1200px" }}
        >
          {/* ── Animated rotating conic-gradient border ── */}
          <div className="absolute inset-0 z-0 rounded-[2.5rem] p-[2px] overflow-hidden">
            <div
              className="banner-border-spin absolute inset-[-50%] z-0"
              style={{
                background: "conic-gradient(from 0deg, #8b5cf6, #3b82f6, #10b981, #f59e0b, #ec4899, #ef4444, #8b5cf6)",
                opacity: 0.6,
              }}
            />
            <div className="absolute inset-[2px] bg-zinc-950 rounded-[2.4rem] z-[1]" />
          </div>

          {/* ── Deep gradient base ── */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(59,130,246,0.1) 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 80%)",
            }}
          />

          {/* ── Floating particles ── */}
          <div className="absolute inset-0 z-[2] overflow-hidden rounded-[2.5rem]">
            {Array.from({ length: 20 }).map((_, i) => (
              <FloatingParticle key={i} index={i} />
            ))}
          </div>

          {/* ── Dual glow orbs (mouse-reactive) ── */}
          <div
            className="banner-glow-1 absolute top-1/3 left-1/3 w-[400px] h-[250px] rounded-full pointer-events-none z-[3]"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
              filter: "blur(80px)",
              opacity: 0.4,
            }}
          />
          <div
            className="banner-glow-2 absolute bottom-1/3 right-1/3 w-[350px] h-[200px] rounded-full pointer-events-none z-[3]"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
              filter: "blur(70px)",
              opacity: 0.3,
            }}
          />

          {/* ── Content with 3D perspective ── */}
          <div
            ref={bannerContentRef}
            className="relative z-20 py-20 md:py-32 px-6 flex flex-col items-center text-center"
          >
            {/* Badge */}
            <div
              className="banner-badge inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-10"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(139,92,246,0.15))",
                border: "1px solid rgba(16,185,129,0.25)",
                backdropFilter: "blur(10px)",

              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
                Zero Recurring Fees
              </span>
            </div>

            {/* ── Main Headline ── */}
            <h2
              className="banner-headline text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-center"
              style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #c084fc 25%, #818cf8 45%, #38bdf8 65%, #34d399 85%, #fbbf24 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-shift 6s ease infinite",
              }}
            >
              One-Time Payment
            </h2>

            {/* ── Decorative horizontal lines ── */}
            <div className="flex items-center gap-4 mb-8 w-full max-w-md">
              <div className="banner-hr-left flex-1 h-[1px]" style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.5))" }} />
              <span className="text-zinc-600 text-xs tracking-[0.4em] uppercase font-mono">✦</span>
              <div className="banner-hr-right flex-1 h-[1px]" style={{ background: "linear-gradient(to left, transparent, rgba(16,185,129,0.5))" }} />
            </div>

            {/* ── Subtitle with shimmer sweep ── */}
            <div className="banner-sub relative overflow-hidden mb-12">
              <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                Pay once.{" "}
                <span className="text-white font-semibold">Own it forever.</span>{" "}
                No monthly fees, no hidden charges, no surprises.
              </p>
              {/* Shimmer overlay */}
              <div
                className="banner-shimmer absolute top-0 left-[-100%] w-[50%] h-full pointer-events-none z-30"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                }}
              />
            </div>

            {/* ── Floating domain badge ── */}
            <div
              className="domain-badge flex items-center gap-4 px-8 py-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",

              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25))",
                  border: "1px solid rgba(59,130,246,0.2)",
                  boxShadow: "0 0 20px rgba(59,130,246,0.15)",
                }}
              >
                🌐
              </div>
              <div className="text-left">
                <p className="text-sm font-bold uppercase tracking-wider text-white/90">
                  Your Domain · Your Control
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  You provide the domain — we build on it. Full ownership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe for gradient animation */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}

