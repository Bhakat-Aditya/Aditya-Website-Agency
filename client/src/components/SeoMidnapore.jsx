import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SeoMidnapore = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Starts when the section enters the view
        },
      });

      // Animate the Heading with a slide-up mask effect
      tl.from(".seo-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      // Stagger the paragraphs coming in from the side
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

      // Add a subtle glowing line animation at the bottom
      tl.from(
        ".seo-divider",
        {
          scaleX: 0,
          duration: 1.5,
          ease: "expo.inOut",
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
    >
      {/* Subtle background glow to match the 'Empire' theme */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 bg-zinc-900/30 border border-white/5 p-8 md:p-16 rounded-[2.5rem] backdrop-blur-sm">
        <div className="overflow-hidden mb-8">
          <h1 className="seo-title text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
            Website Developer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
              in Midnapore
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed">
          <div className="space-y-6">
            <p className="seo-text text-lg">
              Aditya Web Agency is a professional website developer in Midnapore
              helping local businesses like cafes, gyms, clinics, and shops
              build a strong online presence. We create modern, responsive, and
              fast-loading websites designed to attract customers and grow your
              business.
            </p>

            <p className="seo-text">
              Our websites are fully mobile-friendly and optimized for
              performance, ensuring a smooth user experience across all devices.
              We focus on clean design, fast speed, and conversion-driven
              layouts.
            </p>
          </div>

          <div className="space-y-6">
            <p className="seo-text">
              We offer website development at an affordable one-time cost with
              no hidden charges. Whether you need a business website, landing
              page, or service showcase, we deliver solutions tailored to your
              needs.
            </p>

            <p className="seo-text text-white/80 italic border-l-2 border-amber-500 pl-4">
              If you are looking for a reliable web developer in Midnapore,
              Aditya Web Agency is here to help you grow online and reach more
              customers.
            </p>
          </div>
        </div>

        {/* Cinematic Divider */}
        <div className="seo-divider w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent mt-16" />
      </div>
    </section>
  );
};

export default SeoMidnapore;
