import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '../data/portfolio.json';

gsap.registerPlugin(ScrollTrigger);

// 1. Custom Image Component that handles Loading & Error states like a pro
const SafeImage = ({ src, alt, accentColor }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full bg-zinc-900 rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-800">
      {/* Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-4 border-zinc-700 border-t-zinc-300 animate-spin"></div>
          <span className="text-xs font-mono text-zinc-500 tracking-widest">LOADING ASSET...</span>
        </div>
      )}
      
      {/* Error State (If image path in JSON is wrong) */}
      {hasError && (
        <div className="absolute flex flex-col items-center gap-2">
          <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-xs font-mono text-zinc-600 tracking-widest">ASSET NOT FOUND</span>
        </div>
      )}

      {/* The Actual Image - Fades in smoothly once fully loaded */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Dynamic Overlay using your JSON accent color */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ backgroundColor: accentColor }}
      ></div>
    </div>
  );
};

// 2. The Main Z-Axis Scroll Component
export default function WorksTunnel() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.tunnel-card');
    
    // Set initial states: First card is visible, all others are tiny and invisible (pushed back in 3D space)
    gsap.set(cards, { opacity: 0, scale: 0.1 });
    gsap.set(cards[0], { opacity: 1, scale: 1 });

    // Create the scrubbing timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        // The length of the scroll depends on how many projects you have in JSON
        end: `+=${cards.length * 100}%`, 
        pin: true,
        scrub: 1, // 1 second lag for buttery smoothness
      }
    });

    // Animate the cards transitioning through the Z-axis
    cards.forEach((card, index) => {
      // If we aren't on the last card, animate the current one out and the next one in
      if (index < cards.length - 1) {
        tl.to(card, { 
            scale: 5, // Flied past the camera
            opacity: 0, 
            duration: 1, 
            ease: "power2.inOut" 
          }, `sync${index}`) // The label syncs the animations together
          .to(cards[index + 1], { 
            scale: 1, // Next card comes to normal size
            opacity: 1, 
            duration: 1, 
            ease: "power2.inOut" 
          }, `sync${index}`);
      }
    });
  }, { scope: containerRef });

  return (
    // h-screen is crucial here so the pinned section takes up exactly the viewport
    <section ref={containerRef} className="relative h-screen w-full bg-zinc-950 overflow-hidden flex items-center justify-center">
      
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50">
        <h2 className="text-sm font-mono text-zinc-500 tracking-[0.3em]">SELECTED WORKS</h2>
      </div>

      {/* Map through your JSON data */}
      {projectsData.map((project, i) => (
        <div 
          key={project.id} 
          className="tunnel-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[60vw] max-w-5xl h-[70vh] flex flex-col md:flex-row gap-8 items-center justify-center p-4 md:p-12 cursor-hover"
        >
          {/* Left Side: The Safe Loading Image */}
          <div className="w-full md:w-1/2 h-64 md:h-full">
            <SafeImage 
              src={project.imagePath} 
              alt={project.title} 
              accentColor={project.accentColor} 
            />
          </div>

          {/* Right Side: Project Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <p 
              className="text-xs font-bold tracking-widest mb-2"
              style={{ color: project.accentColor }}
            >
              {project.clientType}
            </p>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-4 leading-none tracking-tighter">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-lg mb-6 max-w-md">
              {project.shortPitch}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech, index) => (
                <span key={index} className="px-4 py-1.5 bg-zinc-900 text-zinc-300 text-sm rounded-full border border-zinc-800">
                  {tech}
                </span>
              ))}
            </div>

            <button 
              className="group flex items-center gap-2 w-fit px-6 py-3 bg-white text-black font-bold rounded-full transition-transform hover:scale-105"
            >
              Explore Project
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}