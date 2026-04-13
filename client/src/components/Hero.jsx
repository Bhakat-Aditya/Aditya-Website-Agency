import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Create a timeline so animations happen in a perfect sequence
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // 2. The masked text stagger reveal
    tl.from('.hero-word', {
      y: 150, // Pushed way down outside the overflow-hidden box
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      delay: 0.2, // Small pause so the browser catches its breath on load
    })
    // 3. Subheadline fade in (starts slightly before the main text finishes)
    .from('.hero-sub', {
      opacity: 0,
      y: 20,
      duration: 1,
    }, "-=0.6")
    // 4. The button pops in with a bounce
    .from('.hero-btn', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, "-=0.4");

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen flex flex-col justify-center items-center bg-zinc-950 text-white overflow-hidden px-4"
    >
      {/* Subtle Background Glow for that premium agency feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Headline - Using overflow-hidden to act as a mask for the text sliding up */}
      <div className="text-center z-10 flex flex-col gap-1 md:gap-2">
        <div className="overflow-hidden py-2">
          <h1 className="hero-word text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none">
            We Build
          </h1>
        </div>
        <div className="overflow-hidden py-2">
          <h1 className="hero-word text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">
            Digital Trust
          </h1>
        </div>
      </div>

      {/* Subheadline */}
      <div className="mt-8 text-center z-10 hero-sub max-w-xl">
        <p className="text-lg md:text-xl text-zinc-400 font-medium">
          Premium animations and fast, reliable websites designed to turn your visitors into paying clients.
        </p>
      </div>

      {/* Call to Action Button - Notice the 'cursor-hover' class hooked up to your CustomCursor */}
      <div className="mt-10 z-10 hero-btn">
        <a 
          href="#work" 
          className="cursor-hover inline-block px-8 py-4 bg-white text-black font-bold rounded-full text-lg transition-transform hover:scale-105"
        >
          View Our Work
        </a>
      </div>
    </section>
  );
}