import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '../data/portfolio.json';

gsap.registerPlugin(ScrollTrigger);

// 1. Safe Image Loader (Unchanged - works perfectly)
const SafeImage = ({ src, alt, accentColor }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full bg-zinc-900 rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-800">
      {!isLoaded && !hasError && (
        <div className="absolute flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-4 border-zinc-700 border-t-zinc-300 animate-spin"></div>
          <span className="text-xs font-mono text-zinc-500 tracking-widest">LOADING ASSET...</span>
        </div>
      )}
      {hasError && (
        <div className="absolute flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-zinc-600 tracking-widest">ASSET NOT FOUND</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundColor: accentColor }}></div>
    </div>
  );
};

// 2. The Main Z-Axis Scroll Component
export default function WorksTunnel() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Combine an intro title screen with your JSON projects
  const tunnelItems = [
    { id: 'intro', isIntro: true, title: 'SEE MY WORKS' },
    ...projectsData
  ];

  useGSAP(() => {
    const items = gsap.utils.toArray('.tunnel-item');
    const totalItems = items.length;

    // 0 EXISTENCE: Start everything tiny (scale 0) and invisible
    gsap.set(items, { opacity: 0, scale: 0, transformOrigin: "center center" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalItems * 120}%`, // Scroll length based on how many projects you have
        pin: true,
        scrub: 1, // Smooth lag
        onUpdate: (self) => {
          // Calculate which dot should be glowing on the side scale
          const currentIdx = Math.min(Math.floor(self.progress * totalItems), totalItems - 1);
          setActiveIndex(currentIdx);
        }
      }
    });

    // Animate the Side Scale Progress Line
    tl.to('.progress-fill', { height: '100%', ease: 'none' }, 0);

    // Step 1: The Intro Title grows from 0 to 1 on first scroll
    tl.to(items[0], { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' });

    // Step 2: Loop through all items and make them fly past the camera
    for (let i = 0; i < totalItems - 1; i++) {
      tl.to(items[i], { 
          scale: 5, // Flies past the screen
          opacity: 0, 
          duration: 1, 
          ease: "power2.inOut" 
        }, `sync${i}`) 
        .to(items[i + 1], { 
          scale: 1, // Next item grows from 0 to 1
          opacity: 1, 
          duration: 1, 
          ease: "power2.inOut" 
        }, `sync${i}`);
    }

    // Small pause at the end so the last card doesn't vanish instantly
    tl.to(items[totalItems - 1], { opacity: 1, duration: 0.5 }); 

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-zinc-950 overflow-hidden flex items-center justify-center">
      
      {/* --- THE SIDE SCALE TRACKER --- */}
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 h-[40vh] w-1 bg-zinc-800 rounded-full z-50 flex flex-col justify-between items-center py-0">
        {/* The growing blue line */}
        <div className="progress-fill absolute top-0 left-0 w-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" style={{ height: '0%' }}></div>
        
        {/* The glowing dots */}
        {tunnelItems.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-3 h-3 rounded-full z-10 transition-all duration-500 ${
              activeIndex === idx ? 'bg-white shadow-[0_0_15px_white] scale-150' : 'bg-zinc-700 scale-100'
            }`} 
          />
        ))}
      </div>

      {/* --- THE TUNNEL ITEMS --- */}
      {tunnelItems.map((item) => (
        <div 
          key={item.id} 
          className="tunnel-item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 md:w-[70vw] max-w-6xl flex items-center justify-center cursor-hover"
        >
          {item.isIntro ? (
            // THE INTRO TEXT
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-center tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
              {item.title}
            </h2>
          ) : (
            // THE PROJECT CARDS
            <div className="w-full flex flex-col md:flex-row gap-8 items-center bg-zinc-900/40 p-6 md:p-10 rounded-3xl border border-zinc-800/50 backdrop-blur-sm">
              
              <div className="w-full md:w-1/2 h-48 md:h-[400px]">
                <SafeImage src={item.imagePath} alt={item.title} accentColor={item.accentColor} />
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <p className="text-xs font-bold tracking-widest mb-2" style={{ color: item.accentColor }}>
                  {item.clientType}
                </p>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-none tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-base md:text-lg mb-6">
                  {item.shortPitch}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.techStack.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-zinc-950 text-zinc-300 text-xs rounded-full border border-zinc-800">
                      {tech}
                    </span>
                  ))}
                </div>

                <button className="group flex items-center gap-2 w-fit px-6 py-3 bg-white text-black font-bold rounded-full transition-transform hover:scale-105">
                  Explore Project
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}