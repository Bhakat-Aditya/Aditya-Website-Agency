import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// INLINE COMPONENT: Magnetic Button
// ============================================================================
const MagneticButton = ({ children, className, onClick, href }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const moveMagnet = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      gsap.to(button, {
        x: distanceX * 0.2,
        y: distanceY * 0.2,
        duration: 1,
        ease: "power3.out",
      });
    };

    const resetMagnet = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    };

    button.addEventListener("mousemove", moveMagnet);
    button.addEventListener("mouseleave", resetMagnet);

    return () => {
      button.removeEventListener("mousemove", moveMagnet);
      button.removeEventListener("mouseleave", resetMagnet);
    };
  }, []);

  const Component = href ? "a" : "button";

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      className={`relative inline-flex items-center justify-center overflow-hidden group ${className}`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  );
};

// ============================================================================
// INLINE COMPONENT: Live Clock
// ============================================================================
const LiveClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs md:text-sm tracking-widest bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800 backdrop-blur-md">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      MIDNAPORE, WB • {time || "00:00:00"}
    </div>
  );
};

// ============================================================================
// MAIN FOOTER COMPONENT
// ============================================================================
export default function Footer() {
  // References for GSAP Animations
  const containerRef = useRef(null);
  const sequenceWrapperRef = useRef(null);

  // Cinematic Sequence Refs
  const seqWord1 = useRef(null);
  const seqWord2 = useRef(null);
  const seqWord3 = useRef(null);
  const seqWord4 = useRef(null);

  // Layout Refs
  const bentoGridRef = useRef(null);
  const bentoCards = useRef([]);

  // Form State
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    requirement: "",
  });

  // Contact Links
  const email = "bhakataditya0@gmail.com";
  const phone = "+91 9476477956";
  const rawTemplate = `Hello Aditya,\n\nI am looking to get a website for my business. Here are my details:\n\nName: ${formData.name}\nBusiness Name: ${formData.business}\nRequirement: ${formData.requirement}\n\nThanks!`;
  const encodedTemplate = encodeURIComponent(rawTemplate);
  const whatsappLink = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodedTemplate}`;
  const callLink = `tel:${phone}`;
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Project%20Inquiry&body=${encodedTemplate}`;

  // ==========================================================================
  // GSAP ANIMATION LOGIC
  // ==========================================================================
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Sequence 1: "THINK BIGGER"
      tl.fromTo(
        seqWord1.current,
        {
          opacity: 0,
          scale: 0.5,
          z: -1000,
          rotationX: 45,
          filter: "blur(20px)",
        },
        {
          opacity: 1,
          scale: 1,
          z: 0,
          rotationX: 0,
          filter: "blur(0px)",
          ease: "power4.out",
          duration: 2,
        },
      ).to(
        seqWord1.current,
        {
          opacity: 0,
          scale: 5,
          filter: "blur(50px)",
          ease: "expo.in",
          duration: 1.5,
        },
        "+=0.5",
      );

      // Sequence 2: "CODE HARDER"
      tl.fromTo(
        seqWord2.current,
        { opacity: 0, x: "-100vw", skewX: 60, scaleY: 2, force3D: true },
        {
          opacity: 1,
          x: "0vw",
          skewX: 0,
          scaleY: 1,
          force3D: true,
          ease: "elastic.out(1, 0.4)",
          duration: 2.5,
        },
        "-=0.5",
      ).to(
        seqWord2.current,
        {
          opacity: 0,
          x: "100vw",
          skewX: -60,
          force3D: true,
          ease: "power3.in",
          duration: 1.5,
        },
        "+=0.5",
      );

      // Sequence 3: "ANIMATE FASTER"
      tl.fromTo(
        seqWord3.current,
        { opacity: 0, scale: 3, force3D: true },
        {
          opacity: 1,
          scale: 1,
          force3D: true,
          ease: "back.out(2)",
          duration: 2,
        },
        "-=1",
      ).to(
        seqWord3.current,
        {
          opacity: 0,
          scale: 0,
          rotationZ: 180,
          force3D: true,
          ease: "power4.in",
          duration: 1.5,
        },
        "+=0.5",
      );

      // PHASE 2: BENTO GRID REVEAL
      tl.fromTo(
        bentoGridRef.current,
        { opacity: 0, y: 200, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, ease: "power4.out", duration: 2 },
        "-=1",
      );

      tl.fromTo(
        bentoCards.current,
        { opacity: 0, y: 100, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.2,
          ease: "back.out(1.5)",
          duration: 1.5,
        },
        "-=1.5",
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] bg-[#020202] text-white overflow-hidden perspective-[1200px]"
    >
      {/* Background SVG Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Cinematic Sequence */}
      <div
        ref={sequenceWrapperRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      >
        <h1
          ref={seqWord1}
          className="absolute text-[12vw] md:text-[10vw] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 opacity-0 text-center leading-none"
          style={{
            willChange: "transform, opacity",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          Think Bigger.
        </h1>
        <h1
          ref={seqWord2}
          className="absolute text-[12vw] md:text-[10vw] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300 opacity-0 text-center leading-none"
          style={{
            willChange: "transform, opacity",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          Code Harder.
        </h1>
        <h1
          ref={seqWord3}
          className="absolute text-[12vw] md:text-[10vw] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-700 opacity-0 text-center leading-none"
          style={{
            willChange: "transform, opacity",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          Animate Faster.
        </h1>
        <h1
          ref={seqWord4}
          className="absolute text-[15vw] font-black tracking-tighter uppercase text-white opacity-0 mix-blend-difference"
          style={{
            willChange: "transform, opacity",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          Dominate.
        </h1>
      </div>

      {/* Bento Grid Layer */}
      <div
        ref={bentoGridRef}
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pt-16 pb-6 px-4 md:px-12 z-30 opacity-0 pointer-events-none"
      >
        <div className="w-full max-w-[100rem] mx-auto pointer-events-auto flex flex-col gap-6 h-full justify-between overflow-y-auto overflow-x-hidden no-scrollbar">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full border-b border-zinc-800 pb-4 gap-4 flex-shrink-0">
            <div>
              <h2 className="text-lg md:text-3xl font-light text-zinc-400">
                Ready to scale your digital presence?
              </h2>
              <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">
                Let's Build It.
              </h1>
            </div>
            <LiveClock />
          </div>

          {/* Grid Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 flex-1 min-h-0">
            {/* Box 1: Profile */}
            <div
              ref={(el) => (bentoCards.current[0] = el)}
              className="md:col-span-4 bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 rounded-3xl p-6 md:p-8 backdrop-blur-xl flex flex-col justify-between group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white text-black rounded-full flex items-center justify-center mb-6 overflow-hidden flex-shrink-0">
                  <img
                    src="/dp.jpg"
                    alt="Aditya"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  Aditya Bhakat
                </h3>
                <p className="text-zinc-400 text-sm md:text-base">
                  Full Stack MERN Developer crafting high-end digital
                  experiences.
                </p>
              </div>
              <div className="relative z-10 mt-6 md:mt-8">
                <div className="flex gap-2 flex-wrap">
                  {["React", "Node.js", "GSAP", "MongoDB"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] md:text-xs font-mono uppercase text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Box 2: Interactive Form */}
            <div
              ref={(el) => (bentoCards.current[1] = el)}
              className="md:col-span-8 bg-black border border-zinc-800 rounded-3xl p-6 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[300px]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] pointer-events-none"></div>

              <div className="relative z-10 w-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex gap-2">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`h-1 rounded-full transition-all duration-500 ${formStep >= step ? "w-10 md:w-12 bg-blue-500" : "w-4 bg-zinc-800"}`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    Project Intake
                  </span>
                </div>

                <div className="relative w-full h-[180px] md:h-[150px]">
                  {/* Step 1 */}
                  <div
                    className={`absolute top-0 w-full transition-all duration-500 ${formStep === 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                      What's your name?
                    </h3>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && formData.name && setFormStep(2)
                      }
                      placeholder="Type your name..."
                      className="w-full bg-transparent border-b-2 border-zinc-700 focus:border-blue-500 outline-none py-2 md:py-4 text-xl md:text-2xl transition-colors"
                    />
                    <button
                      onClick={() => formData.name && setFormStep(2)}
                      className={`mt-6 md:mt-8 px-6 md:px-8 py-3 rounded-full font-bold uppercase tracking-wide text-xs md:text-sm transition-all w-full md:w-auto ${formData.name ? "bg-white text-black hover:scale-105" : "bg-zinc-800 text-zinc-500 cursor-not-allowed"}`}
                    >
                      Next Step
                    </button>
                  </div>

                  {/* Step 2 */}
                  <div
                    className={`absolute top-0 w-full transition-all duration-500 ${formStep === 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"}`}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                      What's your business?
                    </h3>
                    <input
                      type="text"
                      value={formData.business}
                      onChange={(e) =>
                        setFormData({ ...formData, business: e.target.value })
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && formData.business && setFormStep(3)
                      }
                      placeholder="e.g. Sports Turf, Cafe..."
                      className="w-full bg-transparent border-b-2 border-zinc-700 focus:border-blue-500 outline-none py-2 md:py-4 text-xl md:text-2xl transition-colors"
                    />
                    <div className="flex gap-2 md:gap-4 mt-6 md:mt-8">
                      <button
                        onClick={() => setFormStep(1)}
                        className="px-4 md:px-6 py-3 rounded-full border border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition-colors uppercase text-xs md:text-sm tracking-wide"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => formData.business && setFormStep(3)}
                        className={`flex-1 md:flex-none px-6 md:px-8 py-3 rounded-full font-bold uppercase tracking-wide text-xs md:text-sm transition-all ${formData.business ? "bg-white text-black hover:scale-105" : "bg-zinc-800 text-zinc-500 cursor-not-allowed"}`}
                      >
                        Next Step
                      </button>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div
                    className={`absolute top-0 w-full transition-all duration-500 ${formStep === 3 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"}`}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                      What do you need built?
                    </h3>
                    <input
                      type="text"
                      value={formData.requirement}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirement: e.target.value,
                        })
                      }
                      placeholder="E-commerce, SaaS..."
                      className="w-full bg-transparent border-b-2 border-zinc-700 focus:border-blue-500 outline-none py-2 md:py-4 text-xl md:text-2xl transition-colors"
                    />
                    <div className="flex gap-2 md:gap-4 mt-6 md:mt-8 flex-wrap">
                      <button
                        onClick={() => setFormStep(2)}
                        className="px-4 md:px-6 py-3 rounded-full border border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition-colors uppercase text-xs md:text-sm tracking-wide"
                      >
                        Back
                      </button>
                      <MagneticButton
                        href={whatsappLink}
                        className="flex-1 md:flex-none bg-green-500 text-black px-4 md:px-8 py-3 rounded-full font-bold uppercase tracking-wide text-[10px] md:text-sm"
                      >
                        Send via WA
                      </MagneticButton>
                      <MagneticButton
                        href={gmailLink}
                        className="flex-1 md:flex-none bg-white text-black px-4 md:px-8 py-3 rounded-full font-bold uppercase tracking-wide text-[10px] md:text-sm"
                      >
                        Send via Email
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Contact Cards */}
            <div
              ref={(el) => (bentoCards.current[2] = el)}
              className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pb-12 md:pb-0"
            >
              {/* Phone */}
              <a
                href={callLink}
                className="bg-zinc-900/30 border border-zinc-800 hover:border-blue-500 rounded-3xl p-5 md:p-6 flex flex-col justify-between group transition-colors backdrop-blur-md min-h-[120px]"
              >
                <div className="flex justify-between items-center mb-6 md:mb-12">
                  <span className="text-zinc-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">
                    Call Me
                  </span>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:text-black transition-all">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold group-hover:translate-x-2 transition-transform truncate block w-full">
                  {phone}
                </h3>
              </a>

              {/* Email */}
              <a
                href={gmailLink}
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-900/30 border border-zinc-800 hover:border-purple-500 rounded-3xl p-5 md:p-6 flex flex-col justify-between group transition-colors backdrop-blur-md min-h-[120px]"
              >
                <div className="flex justify-between items-center mb-6 md:mb-12">
                  <span className="text-zinc-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">
                    Email Me
                  </span>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-black transition-all">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold group-hover:translate-x-2 transition-transform truncate block w-full">
                  {email}
                </h3>
              </a>

              {/* Socials */}
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-5 md:p-6 flex flex-col justify-between backdrop-blur-md min-h-[120px]">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <span className="text-zinc-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">
                    Network
                  </span>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <a
                    href="https://www.linkedin.com/in/aditya-bhakat-anshu/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-zinc-800 hover:bg-white hover:text-black flex items-center justify-center transition-all hover:-translate-y-2"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/Bhakat-Aditya"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-zinc-800 hover:bg-white hover:text-black flex items-center justify-center transition-all hover:-translate-y-2"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
