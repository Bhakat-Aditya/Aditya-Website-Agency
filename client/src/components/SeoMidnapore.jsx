import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SeoWestBengal — Hidden-in-plain-sight SEO content block.
 * Google loves reading this. Users see a polished section.
 * Keyword targets: web developer West Bengal, Midnapore, Kolkata,
 * Kharagpur, Howrah — all the cities that matter.
 */
const SeoWestBengal = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.from(".seo-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      tl.from(
        ".seo-text",
        {
          x: -30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5",
      );

      tl.from(
        ".seo-divider",
        {
          scaleX: 0,
          duration: 1.5,
          ease: "expo.inOut",
        },
        "-=1",
      );

      // City pills stagger in
      tl.from(
        ".city-pill",
        {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "back.out(2)",
        },
        "-=1",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 max-w-7xl mx-auto overflow-hidden"
      aria-label="Website Developer in West Bengal — Aditya Web Agency"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-48 bg-indigo-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 bg-zinc-900/30 border border-white/5 p-8 md:p-16 rounded-[2.5rem] backdrop-blur-sm">

        {/* Main H2 — primary SEO heading */}
        <div className="overflow-hidden mb-8">
          <h2 className="seo-title text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
            Best Website Developer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              in West Bengal
            </span>
          </h2>
        </div>

        {/* City coverage pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            "Midnapore", "Kolkata", "Kharagpur", "Howrah",
            "Durgapur", "Asansol", "Haldia", "Tamluk",
            "Baruipur", "Bankura", "Burdwan", "Siliguri",
          ].map((city) => (
            <span
              key={city}
              className="city-pill px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/8 text-amber-400/80 text-xs font-mono tracking-widest uppercase"
            >
              📍 {city}
            </span>
          ))}
        </div>

        {/* SEO body copy — naturally keyword-rich */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed">
          <div className="space-y-6">
            <p className="seo-text text-lg">
              Aditya Web Agency is a premium website development studio based in
              Midnapore, West Bengal — serving ambitious local businesses across
              the entire state. Whether you're in{" "}
              <strong className="text-white">Kolkata, Kharagpur, Howrah,</strong>{" "}
              or anywhere in West Bengal, we build websites that put you on the
              map — literally and on Google.
            </p>

            <p className="seo-text">
              We specialize in hand-coded, high-performance websites for{" "}
              <strong className="text-white">cafes, gyms, clinics, shops, and service businesses</strong>{" "}
              across West Bengal. Our websites load in under 2 seconds, rank on
              Google, and convert visitors into paying customers 24/7 — so your
              business never stops working.
            </p>
          </div>

          <div className="space-y-6">
            <p className="seo-text">
              Unlike generic template builders, every website we deliver is{" "}
              <strong className="text-white">built from scratch</strong> using
              modern technology (React, Node.js, MongoDB). That means faster
              loading, better SEO, and a unique look that no competitor in your
              city can copy. No Wix. No WordPress. No compromise.
            </p>

            <p className="seo-text text-white/80 italic border-l-2 border-amber-500 pl-4">
              Searching for a{" "}
              <strong className="not-italic text-amber-400">
                web developer in West Bengal
              </strong>{" "}
              who actually understands local business? You found him. Aditya Web
              Agency — the studio Midnapore built, trusted across West Bengal.
            </p>
          </div>
        </div>

        {/* Secondary keywords — naturally embedded */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Midnapore", sub: "Hometown Studio" },
            { label: "Kolkata", sub: "Serving Metro Clients" },
            { label: "Kharagpur", sub: "IIT City Ready" },
            { label: "Howrah", sub: "Industrial Hub" },
          ].map(({ label, sub }) => (
            <div
              key={label}
              className="seo-text p-4 rounded-2xl border border-white/5 bg-white/[0.02] text-center"
            >
              <div className="text-white font-bold text-sm">{label}</div>
              <div className="text-zinc-600 text-xs mt-1 font-mono">{sub}</div>
            </div>
          ))}
        </div>

        {/* Cinematic Divider */}
        <div className="seo-divider w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mt-16" />
      </div>
    </section>
  );
};

export default SeoWestBengal;
