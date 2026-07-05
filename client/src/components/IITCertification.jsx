import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IITCertification = () => {
  const sectionRef = useRef(null);
  const textRef = useRef([]);
  const certRef = useRef(null);
  const badgeRef = useRef(null);
  const shimmerRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {

      // 1. Staggered Text Reveal (mirrors AwwwardsRecognition pattern)
      gsap.fromTo(textRef.current.filter(Boolean),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
          }
        }
      );

      // 2. Certificate 3D Perspective Entrance + Floating
      gsap.fromTo(certRef.current,
        { scale: 0.75, opacity: 0, rotationY: -20, rotationX: 8, y: 60 },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          y: 0,
          duration: 1.4,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: el,
            start: "top 65%",
          },
          onComplete: () => {
            // Continuous floating effect after entrance
            gsap.to(certRef.current, {
              y: -12,
              rotationX: 1.5,
              rotationY: -1.5,
              duration: 3.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      );

      // 3. Shimmer sweep across certificate
      gsap.fromTo(shimmerRef.current,
        { x: "-100%" },
        {
          x: "200%",
          duration: 2.5,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 4,
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
          }
        }
      );

      // 4. Spinning Badge (matches AwwwardsRecognition)
      gsap.to(badgeRef.current, {
        rotate: 360,
        duration: 12,
        repeat: -1,
        ease: "linear"
      });

      // 5. Stats counter stagger
      gsap.fromTo(statsRef.current.filter(Boolean),
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 55%",
          }
        }
      );

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-zinc-950 relative overflow-hidden">

      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-amber-900/8 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-800/25 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 w-[300px] h-[300px] bg-amber-700/5 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>

      {/* Subtle divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Certificate Display */}
          <div className="relative order-2 lg:order-1" style={{ perspective: "1200px" }}>

            {/* The Floating Certificate Frame */}
            <div
              ref={certRef}
              className="relative rounded-2xl overflow-hidden border border-amber-500/15 bg-zinc-900/60 backdrop-blur-xl shadow-2xl shadow-amber-900/10 group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Dynamic shimmer sweep */}
              <div
                ref={shimmerRef}
                className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 z-20 pointer-events-none"
              ></div>

              {/* Hover lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>

              {/* Certificate Image */}
              <img
                src="/IIT.jpg"
                alt="IIT Roorkee - Professional Certification in Full Stack Web Development - Aditya Bhakat"
                className="w-full h-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.03]"
              />

              {/* Inner corner accents */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-amber-400/20 rounded-tl-lg pointer-events-none"></div>
              <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-amber-400/20 rounded-tr-lg pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-amber-400/20 rounded-bl-lg pointer-events-none"></div>
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-amber-400/20 rounded-br-lg pointer-events-none"></div>
            </div>

            {/* Decorative IIT Badge */}
            <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center shadow-2xl z-20">
              <div ref={badgeRef} className="absolute inset-2 border border-dashed border-amber-600/40 rounded-full"></div>
              <div className="text-center">
                <span className="block text-lg font-black text-amber-400/90 leading-none tracking-tight">IIT</span>
                <span className="block text-[0.55rem] font-bold text-zinc-400 tracking-widest uppercase mt-0.5">Roorkee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Copywriting */}
          <div className="relative z-20 order-1 lg:order-2">
            <div
              ref={el => textRef.current[0] = el}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/15 bg-amber-900/10 backdrop-blur-md mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-sm font-semibold text-amber-200/80 uppercase tracking-widest">IIT Certified</span>
            </div>

            <h2
              ref={el => textRef.current[1] = el}
              className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-tight"
            >
              Backed by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 font-serif italic">IIT Roorkee.</span>
            </h2>

            <p
              ref={el => textRef.current[2] = el}
              className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed"
            >
              Professionally certified through the <span className="text-zinc-200 font-medium">Professional Certification Program in Computer Science Engineering</span> with Specialization in Full Stack Web Development — conducted by iHUB DivyaSampark at <span className="text-amber-400/80 font-medium">Indian Institute of Technology Roorkee</span> in association with Intellipaat.
            </p>

            {/* Feature List */}
            <ul
              ref={el => textRef.current[3] = el}
              className="space-y-4 mb-10"
            >
              {[
                "Full Stack Web Development Specialization",
                "IIT Roorkee & iHUB DivyaSampark Certified",
                "Industry-Grade Curriculum & Assessment"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-zinc-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-zinc-900 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* Stats Row */}
            <div className="flex gap-8 flex-wrap">
              {[
                { value: "2026", label: "Certified" },
                { value: "IIT-R", label: "Institution" },
                { value: "A+", label: "Grade" },
              ].map((stat, i) => (
                <div
                  key={i}
                  ref={el => statsRef.current[i] = el}
                  className="text-center"
                >
                  <span className="block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-600 leading-none">
                    {stat.value}
                  </span>
                  <span className="block text-[0.7rem] font-semibold text-zinc-500 tracking-widest uppercase mt-1.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IITCertification;
