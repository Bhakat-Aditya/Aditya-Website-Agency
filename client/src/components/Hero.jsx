import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PRO_QUOTES_MOBILE = [
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
const PRO_QUOTES = [
  "Still waiting for customers? Naki customer ke attract korte ready?",
  "Apnar business ki Google e dekha jai? Naki completely invisible?",
  "Customers khuje pachhe na apnake… naki apni online e nei?",
  "First impression ta ki powerful hocche? Naki ignore kore chole jacche?",
  "Apnar competitor online e sell korche… apni ekhono offline e atke?",
  "Website chara business mane half potential wasted.",
  "Jodi customer apnake na pay, se competitor ke peye jabe.",
  "You don’t need more effort… you need a smarter system.",
  "Business ta grow korte chan? Tahole online presence mandatory.",
  "Trust build korte hole professional look dorkar—achhe?",
  "Apnar dokan ki 24/7 open? Naki raat hole income bondho?",
  "Website hocche apnar digital salesman—kaaj korche naki?",
  "People judge your business in 3 seconds… ready achen?",
  "Offline theke online e na ashle growth thame jabe.",
  "Customer jodi apnar website dekhe impressed na hoy, chole jabe.",
  "Apnar brand ki premium feel dey? Naki normal lagche?",
  "More visibility = more customers = more sales. Simple math.",
  "Apni ki lead miss korchen sudhu website na thakar jonno?",
  "A strong website = nonstop leads. Apnar ta ready?",
  "Aaj invest korun, kal theke automated income start korun.",
];

const BUBBLE_ZONES = [
  { xMin: 5, xMax: 25, yMin: 10, yMax: 30 },
  { xMin: 75, xMax: 95, yMin: 10, yMax: 30 },
  { xMin: 2, xMax: 18, yMin: 45, yMax: 65 },
  { xMin: 82, xMax: 98, yMin: 45, yMax: 65 },
  { xMin: 8, xMax: 25, yMin: 75, yMax: 85 },
  { xMin: 75, xMax: 92, yMin: 75, yMax: 85 },
];

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Shutter
    tl.to(".shutter", {
      height: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: "power4.inOut",
    });

    // Hero text
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

    tl.from(".hero-sub", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    });

    tl.from(".hero-btn", {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.5)",
    });

    tl.from(".marquee-container", {
      opacity: 0,
      y: 20,
      duration: 1,
    });

    // Orbs
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

    // Marquee
    gsap.to(".marquee-track", {
      xPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1,
    });

    // ✅ DESKTOP BUBBLES ONLY
    if (window.matchMedia("(min-width: 768px)").matches) {
      const bubbles = gsap.utils.toArray(".quote-bubble");

      bubbles.forEach((bubble, i) => {
        const zone = BUBBLE_ZONES[i];

        const animateBubble = () => {
          const randomQuote =
            PRO_QUOTES[Math.floor(Math.random() * PRO_QUOTES.length)];

          bubble.innerText = randomQuote;

          const xPos = gsap.utils.random(zone.xMin, zone.xMax);
          const yPos = gsap.utils.random(zone.yMin, zone.yMax);

          gsap.set(bubble, {
            left: xPos + "%",
            top: yPos + "%",
            rotation: gsap.utils.random(-15, 15),
            xPercent: -50,
            yPercent: -50,
          });

          const bubbleTl = gsap.timeline({ onComplete: animateBubble });

          bubbleTl
            .to(bubble, {
              opacity: 1,
              scale: gsap.utils.random(0.9, 1.1),
              duration: 0.5,
              ease: "back.out(2.5)",
            })
            .to(
              bubble,
              {
                y: "-=30",
                duration: 3.5,
                ease: "none",
              },
              "<",
            )
            .to(
              bubble,
              {
                opacity: 0,
                scale: 0.5,
                duration: 0.3,
                ease: "power2.in",
              },
              "-=0.3",
            );
        };

        gsap.delayedCall(i * 1.2 + 2, animateBubble);
      });
    }

    // ✅ MOBILE QUOTES (NEW)
    if (window.matchMedia("(max-width: 768px)").matches) {
      const mobileQuotes = gsap.utils.toArray(".mobile-quote");
      let index = 0;

      const showQuotes = () => {
        mobileQuotes[0].innerText =
          PRO_QUOTES_MOBILE[index % PRO_QUOTES_MOBILE.length];
        mobileQuotes[1].innerText =
          PRO_QUOTES_MOBILE[(index + 1) % PRO_QUOTES_MOBILE.length];

        index += 2;

        gsap.fromTo(
          mobileQuotes,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        );

        gsap.to(mobileQuotes, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          delay: 2,
          stagger: 0.1,
          onComplete: showQuotes,
        });
      };

      showQuotes();
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-zinc-950 text-white overflow-hidden flex flex-col justify-center items-center"
    >
      {/* SHUTTERS */}
      <div className="absolute inset-0 z-50 flex pointer-events-none">
        <div className="shutter w-1/4 h-full bg-black"></div>
        <div className="shutter w-1/4 h-full bg-black"></div>
        <div className="shutter w-1/4 h-full bg-black"></div>
        <div className="shutter w-1/4 h-full bg-black"></div>
      </div>

      {/* ORBS */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <div className="orb absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[100px]"></div>
        <div className="orb absolute top-[40%] right-[15%] w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[120px]"></div>
        <div className="orb absolute bottom-[10%] left-[40%] w-[350px] h-[350px] bg-zinc-400/20 rounded-full blur-[90px]"></div>
      </div>

      {/* DESKTOP BUBBLES */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div
            key={index}
            className="quote-bubble absolute opacity-0 scale-0 px-8 py-4 bg-white border-4 border-zinc-900 rounded-[2.5rem] rounded-bl-md text-black text-xl font-black italic shadow-[8px_8px_0px_rgba(0,0,0,0.5)] whitespace-nowrap"
          />
        ))}
      </div>

      {/* ✅ MOBILE QUOTES */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 flex flex-col gap-3 z-30 md:hidden pointer-events-none">
        <div className="mobile-quote px-4 py-2 bg-zinc-900/60 rounded-full text-sm font-bold border border-zinc-800"></div>
        <div className="mobile-quote px-4 py-2 bg-zinc-900/60 rounded-full text-sm font-bold border border-zinc-800"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 mt-[-5vh]">
        <h1 className="flex flex-col items-center leading-none font-black">
          <span className="hero-text text-6xl md:text-8xl lg:text-[10rem]">
            ADITYA
          </span>
          <span className="hero-text text-5xl md:text-6xl lg:text-[10rem] text-amber-400">
            WEB AGENCY.
          </span>
        </h1>
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
