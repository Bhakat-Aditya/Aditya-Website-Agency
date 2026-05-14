import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AwwwardsRecognition = () => {
  const sectionRef = useRef(null);
  const textRef = useRef([]);
  const certRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    // 1. Staggered Text Reveal
    gsap.fromTo(textRef.current,
      { y: 40, opacity: 0 },
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

    // 2. Certificate Floating & Entrance Animation
    gsap.fromTo(certRef.current,
      { scale: 0.8, opacity: 0, rotationY: 15 },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
        },
        onComplete: () => {
          // Continuous floating effect after entrance
          gsap.to(certRef.current, {
            y: -15,
            rotationX: 2,
            rotationY: -2,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      }
    );

    // 3. Spinning Badge Effect
    gsap.to(badgeRef.current, {
      rotate: 360,
      duration: 10,
      repeat: -1,
      ease: "linear"
    });

  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-zinc-950 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-zinc-800/30 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Copywriting */}
          <div className="relative z-20">
            <div 
              ref={el => textRef.current[0] = el}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Global Recognition</span>
            </div>

            <h2 
              ref={el => textRef.current[1] = el}
              className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-tight"
            >
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600 font-serif italic">Masterpieces.</span>
            </h2>

            <p 
              ref={el => textRef.current[2] = el}
              className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed"
            >
              Recognized internationally for pushing the boundaries of web development. I don't just write code; I orchestrate seamless GSAP animations and implement strict Invisible Design principles to craft digital experiences that leave users in awe.
            </p>

            {/* Feature List */}
            <ul 
              ref={el => textRef.current[3] = el}
              className="space-y-4"
            >
              {[
                "Certified Awwwards Independent Developer",
                "Mastery in High-Performance Animations",
                "Award-Winning Interface Architecture"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-zinc-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Certificate Display */}
          <div className="relative perspective-1000">
            
            {/* The Floating Certificate Frame */}
            <div 
              ref={certRef}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-xl shadow-2xl shadow-black/50 aspect-[4/3] group"
            >
              {/* Dynamic lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
              
              {/* === ADD YOUR CERTIFICATE IMAGE HERE === */}
              {/* Ensure you save your certificate image as 'awwwards-cert.png' inside the client/public folder */}
              <img 
                src="/cert.png" 
                alt="Awwwards Developer Certificate" 
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              />
              
              {/* Placeholder text in case image is missing initially (can be removed once image is placed) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 -z-10">
                <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm tracking-widest uppercase">Certificate Placeholder</p>
              </div>
            </div>

            {/* Decorative Awwwards Badge */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center shadow-2xl z-20">
              <div ref={badgeRef} className="absolute inset-2 border border-dashed border-zinc-600 rounded-full"></div>
              <div className="text-center">
                <span className="block text-2xl font-black text-white leading-none">W.</span>
                <span className="block text-[0.6rem] font-bold text-zinc-400 tracking-widest uppercase mt-1">Honors</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AwwwardsRecognition;