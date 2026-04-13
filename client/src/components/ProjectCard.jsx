import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin so GSAP knows we are doing scroll animations
gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ data }) {
  const cardRef = useRef();
  const imageRef = useRef();

  useGSAP(() => {
    // 1. The Scroll Reveal: Cards slide up and fade in as they enter the screen
    gsap.from(cardRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%', // Animation starts when the top of the card is 85% down the screen
        toggleActions: 'play none none reverse' // Reverses if they scroll back up
      }
    });
  }, { scope: cardRef });

  // 2. Premium Hover Effects using GSAP
  const handleMouseEnter = () => {
    gsap.to(imageRef.current, { scale: 1.05, duration: 0.5, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' });
  };

  return (
    <div 
      ref={cardRef} 
      className="group relative flex flex-col gap-4 mb-10 cursor-hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container with hidden overflow for the zoom effect */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl">
        <div 
          className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10"
        ></div>
        <img 
          ref={imageRef}
          src={data.imagePath} 
          alt={data.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Hover Badge with Dynamic Accent Color */}
        <div 
          className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold text-white z-20 shadow-lg translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          style={{ backgroundColor: data.accentColor }}
        >
          View Project
        </div>
      </div>

      {/* Project Info */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-1">{data.clientType}</p>
        <h3 className="text-3xl font-bold text-white mb-2">{data.title}</h3>
        <p className="text-zinc-300 mb-4">{data.shortPitch}</p>
        
        {/* Map through the Tech Stack */}
        <div className="flex gap-2 flex-wrap">
          {data.techStack.map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}