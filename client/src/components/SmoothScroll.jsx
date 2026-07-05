import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // --- THE FIX: PREVENT BROWSER SCROLL RESTORATION ---
    // This stops the browser from jumping down the page on reload,
    // which breaks GSAP ScrollTriggers and causes the black screen.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force the window to the very top before GSAP calculates anything
    window.scrollTo(0, 0);

    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // 2. Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Sync tickers
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Disable lag smoothing for perfect sync
    gsap.ticker.lagSmoothing(0);

    // 5. Cleanup
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
