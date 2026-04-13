import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// The Strategic Quotes (Mixed English & Bonglish)
const PRO_QUOTES = [
  "24/7 Open for Business",
  "Dokan bondho holeo website khola thakbe",
  "Build Instant Trust",
  "Khata kolom er jhamela sesh",
  "Outshine Your Competitors",
  "Customer apnake khuje pabe easily",
  "Reach More Customers",
  "Brand value onnek bere jabe",
  "Automate Your Sales",
  "Competitor der theke egiye thakun",
  "Showcase Your Best Work",
  "Boro order asar chance besi",
  "Stop Relying on Word of Mouth",
  "Phone call er opor bhorsa komabe",
  "Your Digital Storefront",
  "Local market e rajjoto korun",
  "First Impressions Matter",
  "Sob details ek jaigai thakbe",
  "Dominate Local Searches",
  "Trust barle business barbe",
];

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Cinematic Shutter Reveal
      tl.to(".shutter", {
        height: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.inOut",
      });

      // 2. Main Title Reveal
      tl.fromTo(
        ".hero-text",
        { scale: 1.3, opacity: 0, filter: "blur(20px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=1",
      );

      tl.from(
        ".hero-sub",
        { opacity: 0, y: 30, duration: 1, ease: "power2.out" },
        "-=1",
      );
      tl.from(
        ".hero-btn",
        { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.8",
      );
      tl.from(
        ".marquee-container",
        { opacity: 0, y: 20, duration: 1 },
        "-=0.5",
      );

      // 3. Ambient Floating Orbs
      gsap.to(".orb", {
        y: "random(-50, 50)",
        x: "random(-50, 50)",
        rotation: "random(-180, 180)",
        duration: "random(6, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 3, from: "random" },
      });

      // 4. Infinite Scrolling Marquee
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1,
      });

      // 5. COMIC-STYLE THOUGHT BUBBLE ENGINE
      const bubbles = gsap.utils.toArray(".quote-bubble");

      bubbles.forEach((bubble, i) => {
        const animateBubble = () => {
          const randomQuote =
            PRO_QUOTES[Math.floor(Math.random() * PRO_QUOTES.length)];
          bubble.innerText = randomQuote;

          // Generate random X and Y anywhere on the screen
          let xPos = gsap.utils.random(10, 90);
          let yPos = gsap.utils.random(15, 80);

          // Smart logic: Dodge the exact center so the main title isn't completely blocked
          if (xPos > 35 && xPos < 65 && yPos > 35 && yPos < 65) {
            xPos =
              Math.random() > 0.5
                ? gsap.utils.random(5, 25)
                : gsap.utils.random(75, 95);
          }

          // Apply Comic Tilt & Position instantly while invisible
          gsap.set(bubble, {
            left: xPos + "%",
            top: yPos + "%",
            rotation: gsap.utils.random(-15, 15), // Crazy comic tilt
            xPercent: -50,
            yPercent: -50,
          });

          // The Comic "POP" Animation
          const bubbleTl = gsap.timeline({ onComplete: animateBubble });

          bubbleTl
            // Pop in fast and bouncy
            .to(bubble, {
              opacity: 1,
              scale: gsap.utils.random(0.9, 1.2), // Slight size variation
              duration: 0.5,
              ease: "back.out(2.5)", // Heavy overshoot for that comic book POP
            })
            // Slowly float upwards while the person is "thinking"
            .to(
              bubble,
              {
                y: "-=40",
                duration: 3.5,
                ease: "none",
              },
              "<",
            ) // Starts at the same time as the pop-in
            // Snap closed
            .to(
              bubble,
              {
                opacity: 0,
                scale: 0.5,
                duration: 0.3,
                ease: "power2.in",
              },
              "-=0.3",
            ); // Overlaps the end of the float
        };

        // Stagger the start times so they don't all pop at once
        gsap.delayedCall(i * 0.9 + 2, animateBubble);
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-zinc-950 text-white overflow-hidden flex flex-col justify-center items-center"
    >
      {/* CINEMATIC SHUTTERS */}
      <div className="absolute inset-0 z-50 flex w-full h-full pointer-events-none">
        <div className="shutter w-1/4 h-full bg-black"></div>
        <div className="shutter w-1/4 h-full bg-black"></div>
        <div className="shutter w-1/4 h-full bg-black"></div>
        <div className="shutter w-1/4 h-full bg-black"></div>
      </div>

      {/* FLOATING AMBIENT ORBS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
        <div className="orb absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="orb absolute top-[40%] right-[15%] w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="orb absolute bottom-[10%] left-[40%] w-[350px] h-[350px] bg-zinc-400/20 rounded-full blur-[90px] mix-blend-screen"></div>
      </div>

      {/* --- COMIC THOUGHT BUBBLES --- */}
      {/* Hidden on mobile to keep the screen clean, visible on medium+ screens */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div
            key={index}
            // Comic styling: White bg, black text, huge bold italic font, sharp bottom-left corner
            className="quote-bubble absolute opacity-0 scale-0 px-8 py-4 bg-white border-4 border-zinc-900 rounded-[2.5rem] rounded-bl-md text-black text-xl lg:text-2xl font-black italic shadow-[8px_8px_0px_rgba(0,0,0,0.5)] whitespace-nowrap"
          >
            {/* GSAP injects text here */}
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-30 flex flex-col items-center justify-center w-full px-4 text-center mt-[-5vh] pointer-events-none">
        <h1 className="flex flex-col items-center justify-center leading-none tracking-tighter uppercase font-black drop-shadow-2xl">
          <span className="hero-text text-6xl md:text-8xl lg:text-[10rem] text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
            Rule Your
          </span>
          <span className="hero-text text-6xl md:text-8xl lg:text-[10rem] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 mt-[-2%]">
            Empire.
          </span>
        </h1>

        <p className="hero-sub mt-8 text-lg md:text-xl text-zinc-300 font-medium max-w-2xl drop-shadow-lg bg-zinc-950/40 p-4 rounded-2xl backdrop-blur-sm">
          Don't just compete. Dominate. Amra apnar business er jonno emon
          high-performance smart system banabo jeta dekhe market apnar control e
          thakbe. Rajar moto business korun.
        </p>

        {/* Pointer-events-auto added back here so the button remains clickable */}
        <div className="pointer-events-auto">
          <a
            href="#work"
            className="hero-btn cursor-hover mt-10 px-10 py-4 bg-white text-black font-bold rounded-full text-lg flex items-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Claim Your Space
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* INFINITE TICKER TAPE */}
      <div className="marquee-container absolute bottom-0 left-0 w-full bg-zinc-900/50 border-t border-zinc-800/50 py-3 overflow-hidden backdrop-blur-md z-40">
        <div className="marquee-track flex whitespace-nowrap w-max">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="flex items-center text-sm font-mono tracking-[0.2em] text-zinc-500 uppercase px-4"
            >
              <span className="mx-4">✦</span> CRAFTED IN MIDNAPORE
              <span className="mx-4">✦</span> AUTOMATE YOUR WHOLESALE
              <span className="mx-4">✦</span> DOMINATE YOUR MARKET
              <span className="mx-4">✦</span> HIGH-PERFORMANCE WEBSITES
              <span className="mx-4">✦</span> NO MORE PAPERWORK
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
