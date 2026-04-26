import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIBuild() {
  const containerRef = useRef(null);

  const services = [
    {
      id: "01",
      title: "Portfolio Websites",
      desc: "High-end personal branding and creative showcases with smooth animations.",
    },
    {
      id: "02",
      title: "E-Commerce Stores",
      desc: "Full-scale, high-conversion online shops with integrated payment gateways.",
    },
    {
      id: "03",
      title: "Cafe & Restaurants",
      desc: "Digital menus, online ordering, and seamless table reservation systems.",
    },
    {
      id: "04",
      title: "Gym & Fitness",
      desc: "Member portals, workout tracking, and automated class scheduling.",
    },
    {
      id: "05",
      title: "Clinics & Healthcare",
      desc: "Secure patient portals, appointment booking, and digital prescriptons.",
    },
    {
      id: "06",
      title: "Hospital Management",
      desc: "Complex dashboards for staff, ward, and complete medical facility ERP.",
    },
    {
      id: "07",
      title: "Stock Management",
      desc: "Real-time inventory tracking, alerts, and detailed analytics dashboards.",
    },
    {
      id: "08",
      title: "Booking Systems",
      desc: "Automated scheduling, calendar sync, and ticket generation platforms.",
    },
  ];

  useGSAP(
    () => {
      // Staggered fade-up animation for the cards
      gsap.fromTo(
        ".build-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Triggers when the top of the section hits 80% of the viewport height
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 bg-zinc-950 relative overflow-hidden"
    >
      {/* Background glow to match the amber accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 uppercase tracking-tighter mb-6">
            What I Build
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            From modern portfolios to complex automated management systems, I
            engineer custom web solutions tailored to scale your specific
            industry.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="build-card relative p-8 rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden group hover:border-amber-500 transition-colors duration-500 cursor-hover flex flex-col justify-between min-h-[220px]"
            >
              {/* Massive background number styling */}
              <div className="absolute -top-4 -right-2 text-7xl font-black text-zinc-800/30 group-hover:text-amber-500/10 transition-colors duration-500 pointer-events-none select-none">
                {service.id}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight relative z-10 group-hover:text-amber-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
                  {service.desc}
                </p>
              </div>

              {/* Decorative bottom line */}
              <div className="w-0 h-1 bg-amber-500 mt-6 group-hover:w-full transition-all duration-500 ease-out rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
