import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  // --- ROW 1: The Business Impact ---
  {
    id: 1,
    endValue: 30,
    suffix: "+",
    label: "Brands Scaled",
    description:
      "Delivering high-converting digital assets to businesses across multiple industries.",
    gradient: "from-emerald-500/20 to-emerald-500/0",
    iconColor: "text-emerald-400",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514"
        />
      </svg>
    ),
  },
  {
    id: 2,
    endValue: 7,
    suffix: " Days",
    label: "Max Delivery",
    description:
      "Lightning-fast development cycles. Launch your business online without the wait.",
    gradient: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-400",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    endValue: 100,
    suffix: "%",
    label: "Responsive",
    description:
      "Flawless architecture across all devices. Capture every segment of mobile traffic.",
    gradient: "from-purple-500/20 to-purple-500/0",
    iconColor: "text-purple-400",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    endValue: 10,
    suffix: "x",
    label: "ROI Focused",
    description:
      "Marketing-first development to turn your passive visitors into paying customers.",
    gradient: "from-orange-500/20 to-orange-500/0",
    iconColor: "text-orange-400",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },

  // --- ROW 2: The Technical Authority (New Additions) ---
  {
    id: 5,
    endValue: 99,
    suffix: "/100",
    label: "Performance Score",
    description:
      "Blazing fast page loads. I build for speed because speed equals retention and revenue.",
    gradient: "from-yellow-500/20 to-yellow-500/0",
    iconColor: "text-yellow-400",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: 6,
    endValue: 100,
    suffix: "%",
    label: "Custom Architecture",
    description:
      "Zero bloated templates. Pure, highly scalable code tailored precisely to your brand.",
    gradient: "from-cyan-500/20 to-cyan-500/0",
    iconColor: "text-cyan-400",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    id: 7,
    endValue: 99,
    suffix: ".9%",
    label: "Uptime Guaranteed",
    description:
      "Rock-solid server infrastructure. Your digital storefront stays open 24/7 without fail.",
    gradient: "from-indigo-500/20 to-indigo-500/0",
    iconColor: "text-indigo-400",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: 8,
    endValue: 5,
    suffix: "/5",
    label: "Client Satisfaction",
    description:
      "Consistently delivering beyond expectations, maintaining long-term partnerships.",
    gradient: "from-pink-500/20 to-pink-500/0",
    iconColor: "text-pink-400",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
];

const TrustMetrics = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const numbersRef = useRef([]);
  const iconsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;

    // Batch the animations slightly faster since there are 8 items now
    gsap.fromTo(
      cardsRef.current,
      { y: 80, opacity: 0, scale: 0.9, rotationX: -15 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1, // Faster stagger so the user doesn't wait too long
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        },
      },
    );

    // Number Counter
    numbersRef.current.forEach((numRef, index) => {
      const targetValue = metrics[index].endValue;
      gsap.fromTo(
        numRef,
        { innerText: 0 },
        {
          innerText: targetValue,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
          },
        },
      );
    });

    // Floating Icons
    iconsRef.current.forEach((icon, index) => {
      gsap.to(icon, {
        y: -6, // Slightly subtler float
        duration: 1.5 + index * 0.15,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-zinc-950 relative overflow-hidden perspective-1000"
    >
      {/* Background Ambience tailored for 2 rows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] translate-y-1/3 pointer-events-none mix-blend-screen"></div>
      {/* Center ambient glow to tie the 8 grid items together */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
            <span className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">
              The Aditya Agency Advantage
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Engineered for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-emerald-300">
              Dominance
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl">
            Combining MERN-stack architecture with marketing psychology to build
            digital experiences that out-perform your competition.
          </p>
        </div>

        {/* 8 Item Grid - Perfectly balances as 2 rows of 4 on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative group rounded-3xl bg-zinc-900/40 border border-white/5 overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:-translate-y-2 shadow-2xl shadow-black/50"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${metric.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              ></div>

              <div className="p-8 relative z-10 flex flex-col h-full">
                <div
                  ref={(el) => (iconsRef.current[index] = el)}
                  className={`mb-8 p-4 rounded-2xl bg-zinc-950/80 inline-block border border-white/5 shadow-xl ${metric.iconColor} self-start`}
                >
                  {metric.icon}
                </div>

                <div className="flex items-baseline mb-2 mt-auto">
                  <h3 className="text-5xl font-black text-white tracking-tighter">
                    <span ref={(el) => (numbersRef.current[index] = el)}>
                      0
                    </span>
                  </h3>
                  <span className="text-3xl font-bold text-zinc-300 tracking-tighter ml-1">
                    {metric.suffix}
                  </span>
                </div>

                <p className="text-xl font-bold text-white mb-3 tracking-wide">
                  {metric.label}
                </p>

                <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustMetrics;
