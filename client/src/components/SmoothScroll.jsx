import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger just to be safe
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // 1. Initialize Lenis with premium easing settings
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // The classic 'Awwwards' ease
      smoothWheel: true,
    });

    // 2. Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Make GSAP ticker and Lenis run on the exact same frame loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Disable GSAP lag smoothing to prevent any visual stuttering
    gsap.ticker.lagSmoothing(0);

    // 5. Cleanup when the component unmounts
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}