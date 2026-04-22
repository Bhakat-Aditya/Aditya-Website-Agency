import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Comparison() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Header animation
      gsap.from(".comp-header", {
        scrollTrigger: {
          trigger: ".comp-header",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Left mockup (The Bad) slides in from the left
      gsap.from(".mockup-bad", {
        scrollTrigger: {
          trigger: ".mockup-container",
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Right mockup (The Good) slides in from the right
      gsap.from(".mockup-good", {
        scrollTrigger: {
          trigger: ".mockup-container",
          start: "top 80%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-zinc-950 py-32 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="comp-header text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white italic">
            The Difference is <span className="text-amber-500">Clear</span>
          </h2>
          <p className="mt-6 text-zinc-400 text-lg uppercase tracking-widest font-medium">
            Cheap Templates vs. Custom MERN Architecture
          </p>
        </div>

        {/* MOCKUPS CONTAINER (Columns on Mobile, Rows on Desktop) */}
        <div className="mockup-container flex flex-col md:flex-row gap-8 lg:gap-12 items-center justify-center">
          {/* ========================================= */}
          {/* ❌ THE BAD: Cheap Template Mockup           */}
          {/* ========================================= */}
          <div className="mockup-bad w-full md:w-1/2 flex flex-col items-center">
            <h3 className="text-red-500 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>❌</span> What Others Build
            </h3>

            {/* Browser Frame */}
            <div className="w-full bg-zinc-300 rounded-xl overflow-hidden shadow-2xl border border-zinc-700 h-[450px] flex flex-col">
              {/* Fake Browser Top Bar */}
              <div className="bg-zinc-400 px-4 py-3 flex gap-2 items-center border-b border-zinc-500">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 bg-white/50 w-full max-w-[200px] h-4 rounded-full"></div>
              </div>

              {/* FAKE UGLY LANDING PAGE (Inside Browser) */}
              <div className="flex-grow bg-white flex flex-col relative">
                {/* Clunky Nav */}
                <div className="bg-blue-800 text-white p-3 flex justify-between items-center font-serif">
                  <div className="text-xl font-bold">MY SHOP</div>
                  <div className="text-xs space-x-2 underline">
                    <span>Home</span> <span>About</span>{" "}
                    <span>Contact Us!!!</span>
                  </div>
                </div>

                {/* Clunky Hero */}
                <div className="p-6 flex flex-col items-center text-center mt-4">
                  <h1 className="text-red-600 text-3xl font-bold mb-4 font-serif">
                    WELCOME TO OUR WEBSITE
                  </h1>
                  <p className="text-black text-sm mb-6 leading-relaxed bg-yellow-200 p-2 border border-black">
                    We are the best business in town. Please buy our products
                    because they are very good and cheap.
                  </p>
                  <button className="bg-gray-300 border-[3px] border-black text-blue-900 font-black px-6 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-1 transition-transform">
                    CLICK HERE NOW
                  </button>
                </div>

                {/* Broken/Ugly Image Grid */}
                <div className="flex justify-center gap-4 mt-auto mb-8">
                  <div className="w-20 h-20 bg-gray-200 border border-dashed border-gray-500 flex flex-col items-center justify-center text-gray-500 text-[10px]">
                    <span>📄</span>
                    <span>Image Error</span>
                  </div>
                  <div className="w-20 h-20 bg-gray-200 border border-dashed border-gray-500 flex flex-col items-center justify-center text-gray-500 text-[10px]">
                    <span>📄</span>
                    <span>Image Error</span>
                  </div>
                </div>

                {/* Slow loading spinner overlay */}
                <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-mono animate-pulse">
                  Loading takes 6 seconds...
                </div>
              </div>
            </div>
            <p className="text-zinc-500 text-sm mt-4 text-center">
              Clunky, slow to load, and looks like a website from 2010.
            </p>
          </div>

          {/* ========================================= */}
          {/* ✅ THE GOOD: Aditya's Custom Mockup         */}
          {/* ========================================= */}
          <div className="mockup-good w-full md:w-1/2 flex flex-col items-center">
            <h3 className="text-amber-500 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>✅</span> What I Build
            </h3>

            {/* Browser Frame */}
            <div className="w-full bg-zinc-900 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.15)] border border-amber-500/30 h-[450px] flex flex-col relative group">
              {/* Fake Browser Top Bar (Dark Mode) */}
              <div className="bg-zinc-950 px-4 py-3 flex gap-2 items-center border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-zinc-700 group-hover:bg-red-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700 group-hover:bg-yellow-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700 group-hover:bg-green-500 transition-colors"></div>
                <div className="ml-4 flex items-center gap-2 bg-zinc-900 w-full max-w-[200px] rounded-md px-2 py-1">
                  <span className="text-[10px] text-emerald-500">🔒</span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    yourbusiness.com
                  </span>
                </div>
              </div>

              {/* FAKE PREMIUM LANDING PAGE (Inside Browser) */}
              <div className="flex-grow bg-zinc-950 flex flex-col relative overflow-hidden z-0">
                {/* Premium Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[60px] rounded-full -z-10"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full -z-10"></div>

                {/* Sleek Nav */}
                <div className="px-6 py-5 flex justify-between items-center z-10">
                  <div className="text-white font-black tracking-widest text-sm">
                    ELEVATE.
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-0.5 bg-zinc-600 rounded-full"></div>
                    <div className="w-4 h-0.5 bg-zinc-600 rounded-full"></div>
                  </div>
                </div>

                {/* Sleek Hero */}
                <div className="px-6 mt-8 flex flex-col items-start z-10">
                  <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-mono tracking-widest rounded-full uppercase mb-4">
                    Premium Quality
                  </span>
                  <h1 className="text-white text-4xl font-black uppercase tracking-tighter leading-none mb-4">
                    Redefine
                    <br />
                    Your Brand
                  </h1>
                  <p className="text-zinc-400 text-xs max-w-[80%] leading-relaxed mb-6">
                    Experience lightning-fast performance and an interface
                    designed specifically to convert your visitors into paying
                    customers.
                  </p>

                  <div className="flex gap-3">
                    <button className="bg-white text-black font-bold text-xs px-5 py-2.5 rounded-full hover:scale-105 transition-transform">
                      Explore Now
                    </button>
                    <button className="bg-zinc-900 text-white font-bold text-xs px-5 py-2.5 rounded-full border border-zinc-800 hover:border-zinc-600 transition-colors">
                      View Menu
                    </button>
                  </div>
                </div>

                {/* Sleek Image Grid Mockup */}
                <div className="flex gap-3 px-6 mt-auto mb-6 z-10">
                  <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-900"></div>
                    <div className="absolute bottom-2 left-2 w-10 h-1 bg-zinc-700 rounded-full"></div>
                  </div>
                  <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-900"></div>
                    <div className="absolute bottom-2 left-2 w-10 h-1 bg-zinc-700 rounded-full"></div>
                  </div>
                </div>

                {/* Fast loading indicator */}
                <div className="absolute bottom-2 right-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_#10b981] animate-pulse"></div>
                  <span className="text-[10px] text-emerald-500/70 font-mono tracking-widest">
                    LOADED IN 0.8s
                  </span>
                </div>
              </div>
            </div>
            <p className="text-zinc-500 text-sm mt-4 text-center">
              Lightning fast, ultra-modern, and built to convert sales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
