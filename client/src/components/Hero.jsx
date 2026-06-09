import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/* ══════════════════════════════════════════════════════════════
   FILM GRAIN — SVG feTurbulence data-URI, zero download cost
   Animated via CSS keyframes for that living-film feel.
══════════════════════════════════════════════════════════════ */
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ══════════════════════════════════════════════════════════════
   CSS KEYFRAMES — injected once into <head>
   grain-move: makes the film grain shimmer like real celluloid
   glitch-r / glitch-b: RGB split channels
══════════════════════════════════════════════════════════════ */
const INJECTED_CSS = `
@keyframes grain-move {
  0%   { transform: translate(0,0); }
  10%  { transform: translate(-4%,-8%); }
  20%  { transform: translate(6%, 2%); }
  30%  { transform: translate(-2%, 7%); }
  40%  { transform: translate(8%,-4%); }
  50%  { transform: translate(-6%, 3%); }
  60%  { transform: translate(3%,-7%); }
  70%  { transform: translate(-8%, 2%); }
  80%  { transform: translate(5%,-3%); }
  90%  { transform: translate(-3%, 6%); }
  100% { transform: translate(0,0); }
}
@keyframes glitch-r {
  0%,100%{ clip-path: inset(0 0 100% 0); transform:translate(-4px,1px); }
  15%    { clip-path: inset(10% 0 55% 0); transform:translate(-5px,2px); }
  30%    { clip-path: inset(45% 0 20% 0); transform:translate(-3px,-1px); }
  50%    { clip-path: inset(70% 0 8% 0);  transform:translate(-4px,1px); }
  70%    { clip-path: inset(20% 0 65% 0); transform:translate(-2px,2px); }
  90%    { clip-path: inset(80% 0 3% 0);  transform:translate(-5px,-2px);}
}
@keyframes glitch-b {
  0%,100%{ clip-path: inset(100% 0 0 0); transform:translate(4px,-1px); }
  15%    { clip-path: inset(55% 0 10% 0); transform:translate(5px,-2px); }
  30%    { clip-path: inset(20% 0 45% 0); transform:translate(3px,1px);  }
  50%    { clip-path: inset(8%  0 70% 0); transform:translate(4px,-1px); }
  70%    { clip-path: inset(65% 0 20% 0); transform:translate(2px,-2px); }
  90%    { clip-path: inset(3%  0 80% 0); transform:translate(5px,2px);  }
}
@keyframes rotate-ring {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes badge-pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
  50%     { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
}
`;

/* ══════════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════════ */
const SCRAMBLE_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@!$%✦·∞";

const TICKER_WORDS = [
  "HIGH-PERFORMANCE WEBSITES", "✦",
  "LOCAL SEO DOMINATION", "✦",
  "PREMIUM DIGITAL EXPERIENCES", "✦",
  "CRAFTED IN MIDNAPORE", "✦",
  "RESULTS-DRIVEN DESIGN", "✦",
  "YOUR 24/7 SALES MACHINE", "✦",
];

const CYCLE_WORDS = ["WEBSITES", "EXPERIENCES", "EMPIRES", "IDENTITIES", "LEGACIES"];

/* ══════════════════════════════════════════════════════════════
   INJECT CSS ONCE
══════════════════════════════════════════════════════════════ */
if (typeof document !== "undefined" && !document.getElementById("awa-hero-css")) {
  const s = document.createElement("style");
  s.id = "awa-hero-css";
  s.textContent = INJECTED_CSS;
  document.head.appendChild(s);
}

/* ══════════════════════════════════════════════════════════════
   PRELOADER
   Counts 000 → 100 while the agency name types in at the bottom.
   When done: wipes UPWARD revealing the hero underneath.
   onReveal fires while still wiping (hero starts at ~70% of wipe)
══════════════════════════════════════════════════════════════ */
function Preloader({ onReveal }) {
  const wrapRef = useRef(null);
  const numRef  = useRef(null);
  const lineRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const obj = { val: 0 };

    /* Progress bar grows left→right */
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 1.6,
      ease: "power2.inOut",
    });

    /* Counter 000 → 100 in sync */
    tl.to(obj, {
      val: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numRef.current)
          numRef.current.textContent = String(Math.round(obj.val)).padStart(3, "0");
      },
    }, "<");

    /* Agency label fades in at midpoint */
    tl.fromTo(labelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.7);

    /* Brief hold at 100 */
    tl.to({}, { duration: 0.18 });

    /* Wipe UP — fire hero at 70% through the wipe */
    tl.to(wrapRef.current, {
      yPercent: -105,
      duration: 1.0,
      ease: "expo.inOut",
      onStart: onReveal,
    });
  }, [onReveal]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[990] bg-black flex flex-col justify-between overflow-hidden select-none"
      style={{ padding: "clamp(1.5rem, 4vw, 3.5rem)" }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
          Aditya Web Agency
        </span>
        <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>
          Est. 2023
        </span>
      </div>

      {/* Huge percentage counter */}
      <div className="flex items-end leading-none" style={{ gap: "0.15em" }}>
        <span
          ref={numRef}
          className="font-black"
          style={{
            fontSize: "clamp(5rem, 23vw, 20rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.05em",
            color: "rgba(255,255,255,0.06)",
          }}
        >
          000
        </span>
        <span
          className="font-black"
          style={{
            fontSize: "clamp(2.2rem, 9vw, 8rem)",
            lineHeight: 1,
            color: "rgba(255,255,255,0.06)",
            paddingBottom: "0.6vw",
          }}
        >
          %
        </span>
      </div>

      {/* Bottom */}
      <div>
        <div className="overflow-hidden mb-4">
          <div
            ref={lineRef}
            style={{
              height: "1px",
              background: "rgba(251,191,36,0.35)",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span
            ref={labelRef}
            style={{
              fontFamily: "monospace",
              fontSize: "clamp(0.55rem, 1vw, 0.75rem)",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.15)",
              textTransform: "uppercase",
              opacity: 0,
            }}
          >
            Loading premium experience...
          </span>
          <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(251,191,36,0.4)", textTransform: "uppercase" }}>
            ✦ Midnapore
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SPOTLIGHT CANVAS — cursor-following amber radial glow
   Desktop only. Pure Canvas 2D. ~0% CPU.
══════════════════════════════════════════════════════════════ */
function SpotlightCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const mouse = { x: -9999, y: -9999 };
    const cur   = { x: -9999, y: -9999 };
    let rafId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const draw = () => {
      cur.x += (mouse.x - cur.x) * 0.05;
      cur.y += (mouse.y - cur.y) * 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const r = Math.max(canvas.width, canvas.height) * 0.52;
      const g = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, r);
      g.addColorStop(0,    "rgba(251,191,36,0.065)");
      g.addColorStop(0.3,  "rgba(251,191,36,0.022)");
      g.addColorStop(0.7,  "rgba(99,102,241,0.012)");
      g.addColorStop(1,    "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      rafId = requestAnimationFrame(draw);
    };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    resize();
    draw();
    window.addEventListener("mousemove", onMove);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("mousemove", onMove); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ══════════════════════════════════════════════════════════════
   GLITCH TEXT COMPONENT
   Sits over the real text with RGB-split ghost copies.
   Triggers on an interval + random timing for that organic feel.
══════════════════════════════════════════════════════════════ */
function GlitchText({ text, className = "", style = {} }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    let timeout;
    const schedule = () => {
      timeout = setTimeout(() => {
        setGlitch(true);
        setTimeout(() => { setGlitch(false); schedule(); }, 380);
      }, 5500 + Math.random() * 4000);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="relative" style={{ display: "inline-block" }}>
      <span className={className} style={style}>{text}</span>
      {glitch && <>
        <span aria-hidden="true" className={className} style={{
          ...style, position: "absolute", top: 0, left: 0,
          color: "rgba(248,113,113,0.85)",
          animation: "glitch-r 0.38s steps(1) forwards",
          pointerEvents: "none",
        }}>{text}</span>
        <span aria-hidden="true" className={className} style={{
          ...style, position: "absolute", top: 0, left: 0,
          color: "rgba(96,165,250,0.75)",
          animation: "glitch-b 0.38s steps(1) forwards",
          pointerEvents: "none",
        }}>{text}</span>
      </>}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   WORD CYCLER WITH SCRAMBLE
   The word in the tagline cycles: WEBSITES → EXPERIENCES → …
   Each change scrambles through random chars before resolving.
══════════════════════════════════════════════════════════════ */
function ScrambleCycle({ words, className = "" }) {
  const ref   = useRef(null);
  const idxRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = words[0];

    const doScramble = (target) => {
      const len = target.length;
      let frame = 0;
      const total = 22;
      const tick = () => {
        const out = target.split("").map((ch, i) =>
          i < Math.floor((frame / total) * len)
            ? ch
            : SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)]
        ).join("");
        el.textContent = out;
        frame++;
        if (frame <= total) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
    };

    const cycle = () => {
      idxRef.current = (idxRef.current + 1) % words.length;
      gsap.to(el, {
        opacity: 0, y: -14, duration: 0.28, ease: "power2.in",
        onComplete: () => {
          doScramble(words[idxRef.current]);
          gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
        },
      });
    };

    const id = setInterval(cycle, 2800);
    return () => clearInterval(id);
  }, [words]);

  return <span ref={ref} className={className}>{words[0]}</span>;
}

/* ══════════════════════════════════════════════════════════════
   MAGNETIC BUTTON — dual-layer (wrapper + inner text) pull
   Desktop pointer devices only.
══════════════════════════════════════════════════════════════ */
function MagneticBtn({ children, className = "", href, onClick, style: extStyle }) {
  const wrapRef  = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner || !window.matchMedia("(pointer: fine)").matches) return;
    const xW = gsap.quickTo(wrap,  "x", { duration: 0.55, ease: "power3.out" });
    const yW = gsap.quickTo(wrap,  "y", { duration: 0.55, ease: "power3.out" });
    const xI = gsap.quickTo(inner, "x", { duration: 0.32, ease: "power3.out" });
    const yI = gsap.quickTo(inner, "y", { duration: 0.32, ease: "power3.out" });
    const onMove = (e) => {
      const { left, top, width, height } = wrap.getBoundingClientRect();
      const dx = e.clientX - (left + width / 2);
      const dy = e.clientY - (top + height / 2);
      const dist = Math.hypot(dx, dy);
      const zone = Math.max(width, height) * 1.5;
      if (dist < zone) {
        const p = 1 - dist / zone;
        xW(dx * p * 0.55); yW(dy * p * 0.55);
        xI(dx * p * 0.28); yI(dy * p * 0.28);
      } else { xW(0); yW(0); xI(0); yI(0); }
    };
    const onLeave = () => { xW(0); yW(0); xI(0); yI(0); };
    window.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => { window.removeEventListener("mousemove", onMove); wrap.removeEventListener("mouseleave", onLeave); };
  }, []);

  const Tag = href ? "a" : "button";
  return (
    <Tag
      ref={wrapRef} href={href} onClick={onClick}
      className={`cursor-hover ${className}`}
      style={{ willChange: "transform", display: "inline-block", ...extStyle }}
    >
      <span ref={innerRef} style={{ display: "block", willChange: "transform" }}>
        {children}
      </span>
    </Tag>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN HERO COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef(null);
  const tlRef      = useRef(null);

  /* Hero GSAP timeline — PAUSED, plays on preloader done */
  useGSAP(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reduced   = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "expo.out" },
    });
    tlRef.current = tl;

    /* 1 ▶ Top meta row drops down */
    tl.fromTo(".hero-meta", { y: -22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.07 });

    /* 2 ▶ Urgency badge pops in */
    tl.fromTo(".urgency-badge",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)" }, "-=0.3");

    /* 3 ▶ H1 line reveals (clip-path slide up — the Awwwards move) */
    tl.fromTo(".line-mask", { y: "108%" }, { y: "0%", duration: reduced ? 0.3 : 1.15, stagger: 0.13 }, "-=0.2");

    /* 4 ▶ Accent dash grows */
    tl.fromTo(".accent-dash", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "expo.out" }, "-=0.6");

    /* 5 ▶ Sub copy slides up */
    tl.fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, "-=0.4");

    /* 6 ▶ Social proof row */
    tl.fromTo(".social-proof", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.5");



    /* 8 ▶ Bottom bar slides up */
    tl.fromTo(".hero-bottom-bar", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 }, "-=0.5");

    /* 9 ▶ Vertical strip */
    tl.fromTo(".hero-vert", { opacity: 0, x: 18 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.35");

    /* 10 ▶ Marquee fades */
    tl.fromTo(".hero-ticker", { opacity: 0 }, { opacity: 1, duration: 0.45 }, "-=0.2");

    /* Count-up numbers (fires during step 8) */
    [{ sel: ".count-projects", end: 50, suf: "+" }, { sel: ".count-rate", end: 100, suf: "%" }]
      .forEach(({ sel, end, suf }) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const o = { v: 0 };
        tl.to(o, { v: end, duration: 2, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v) + suf; } }, "-=1.8");
      });

    /* ── Ticker marquee (independent, always loops) ── */
    const track = document.querySelector(".ticker-track");
    if (track) {
      const half = track.scrollWidth / 2;
      gsap.to(track, { x: -half, duration: 28, ease: "none", repeat: -1, modifiers: { x: gsap.utils.unitize(v => parseFloat(v) % half) } });
    }

    /* ── Vertical strip ticker ── */
    if (isDesktop) {
      const vt = document.querySelector(".vticker-track");
      if (vt) {
        const half = vt.scrollHeight / 2;
        gsap.to(vt, { y: -half, duration: 22, ease: "none", repeat: -1, modifiers: { y: gsap.utils.unitize(v => parseFloat(v) % half) } });
      }
    }

    /* ── Mouse parallax (desktop) ── */
    let cleanupParallax = () => {};
    if (isDesktop) {
      const xTo1 = gsap.quickTo(".parallax-1", "x", { duration: 1.3, ease: "power2.out" });
      const yTo1 = gsap.quickTo(".parallax-1", "y", { duration: 1.3, ease: "power2.out" });
      const xTo2 = gsap.quickTo(".parallax-2", "x", { duration: 1.6, ease: "power2.out" });
      const yTo2 = gsap.quickTo(".parallax-2", "y", { duration: 1.6, ease: "power2.out" });
      const xTo3 = gsap.quickTo(".parallax-3", "x", { duration: 1.0, ease: "power2.out" });
      const yTo3 = gsap.quickTo(".parallax-3", "y", { duration: 1.0, ease: "power2.out" });

      const onMove = (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        xTo1(dx * -22); yTo1(dy * -12);
        xTo2(dx * 16);  yTo2(dy * 9);
        xTo3(dx * -28); yTo3(dy * -16);
      };

      window.addEventListener("mousemove", onMove);
      cleanupParallax = () => window.removeEventListener("mousemove", onMove);
    }

    /* ── Scroll indicator pulse ── */
    gsap.to(".scroll-dot-inner", { y: 12, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut" });

    return cleanupParallax;
  }, { scope: sectionRef });

  /* Preloader done → play hero timeline */
  const handleReveal = useCallback(() => {
    if (tlRef.current) tlRef.current.play();
  }, []);

  return (
    <>
      {/* ════ PRELOADER (sits above everything, wipes up) ════ */}
      <Preloader onReveal={handleReveal} />

      {/* ════ HERO SECTION ════ */}
      <section
        ref={sectionRef}
        id="hero"
        aria-label="Aditya Web Agency — Hero"
        className="relative w-full overflow-hidden bg-black text-white"
        style={{ minHeight: "100svh" }}
      >

        {/* ── ANIMATED FILM GRAIN ────────────────────────────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[55] mix-blend-overlay"
          style={{
            backgroundImage: GRAIN_SVG,
            backgroundRepeat: "repeat",
            backgroundSize: "220px 220px",
            opacity: 0.24,
            animation: "grain-move 0.65s steps(1) infinite",
          }}
        />

        {/* ── MOUSE SPOTLIGHT ──────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <SpotlightCanvas />
        </div>

        {/* ── AMBIENT GRADIENTS ─────────────────────────────────── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2]">
          {/* Amber — blooms from bottom-right */}
          <div className="absolute bottom-0 right-0"
            style={{ width: "60vw", height: "60vw", maxWidth: 750, maxHeight: 750,
              background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 68%)",
              transform: "translate(22%, 22%)" }}
          />
          {/* Indigo — bleeds from top-left */}
          <div className="absolute top-0 left-0"
            style={{ width: "42vw", height: "42vw", maxWidth: 520, maxHeight: 520,
              background: "radial-gradient(circle, rgba(99,102,241,0.065) 0%, transparent 68%)",
              transform: "translate(-28%, -28%)" }}
          />
          {/* Subtle center vignette reinforcement */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
        </div>

        {/* ── VERTICAL STRIP TICKER (desktop right edge) ──────── */}
        <div
          aria-hidden="true"
          className="hero-vert hidden lg:flex absolute right-5 xl:right-7 top-0 bottom-0 z-20 items-center justify-center overflow-hidden"
          style={{ width: "26px" }}
        >
          <div className="vticker-track flex flex-col items-center">
            {[...Array(4)].flatMap((_, g) =>
              ["ADITYA", "·", "WEB", "·", "AGENCY", "·", "2023", "·"].map((w, i) => (
                <span key={`${g}-${i}`} style={{
                  writingMode: "vertical-rl",
                  fontSize: "8.5px", lineHeight: 1, marginBottom: "13px",
                  letterSpacing: "0.32em", fontWeight: 900, textTransform: "uppercase",
                  color: w === "·" ? "rgba(251,191,36,0.38)" : "rgba(255,255,255,0.13)",
                }}>
                  {w}
                </span>
              ))
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MAIN LAYOUT — flex column, full viewport
        ════════════════════════════════════════════ */}
        <div
          className="relative z-10 flex flex-col"
          style={{
            minHeight: "100svh",
            padding: "0 clamp(1.25rem, 5vw, 5rem)",
          }}
        >

          {/* ── TOP META ROW ──────────────────────────────────── */}
          <div className="flex items-center justify-between" style={{ paddingTop: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>

            <span
              className="hero-meta"
              style={{ fontFamily: "monospace", fontSize: "clamp(9px, 1.1vw, 11px)", letterSpacing: "0.28em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}
            >
              Est.&nbsp;2023&nbsp;·&nbsp;Midnapore,&nbsp;West&nbsp;Bengal
            </span>

            {/* Scarcity urgency badge */}
            <div
              className="urgency-badge flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{
                borderColor: "rgba(239,68,68,0.3)",
                background: "rgba(239,68,68,0.06)",
                animation: "badge-pulse 2.2s ease-in-out infinite",
              }}
            >
              <span className="relative flex" style={{ width: 7, height: 7 }}>
                <span className="animate-ping absolute inline-flex rounded-full opacity-75"
                  style={{ inset: 0, background: "#ef4444" }} />
                <span className="relative inline-flex rounded-full"
                  style={{ width: 7, height: 7, background: "#ef4444" }} />
              </span>
              <span style={{ fontFamily: "monospace", fontSize: "clamp(9px,1vw,10.5px)", letterSpacing: "0.18em", color: "#fca5a5", fontWeight: 700, textTransform: "uppercase" }}>
                3 Spots Left This Month
              </span>
            </div>
          </div>

          {/* ── HERO HEADLINE ─────────────────────────────────── */}
          <div className="flex-1 flex flex-col justify-center" style={{ paddingBottom: "2vh" }}>
            <h1
              className="font-black select-none"
              style={{ lineHeight: 0.83, letterSpacing: "-0.03em" }}
            >

              {/* — LINE 1: ADITYA — large, white, flush left, glitches */}
              <div className="overflow-hidden parallax-1">
                <div className="line-mask" style={{ display: "flex", alignItems: "baseline" }}>
                  <GlitchText
                    text="ADITYA"
                    className="text-white"
                    style={{ fontSize: "clamp(4.8rem, 19vw, 19rem)", display: "block", letterSpacing: "-0.03em" }}
                  />
                </div>
              </div>

              {/* — LINE 2: WEB — outline stroke, indented */}
              <div
                className="overflow-hidden parallax-2"
                style={{ marginLeft: "clamp(0.8rem, 4.5vw, 7rem)" }}
              >
                <div className="line-mask" style={{ display: "flex", alignItems: "baseline" }}>
                  <span
                    className="text-transparent block"
                    style={{
                      fontSize: "clamp(4.8rem, 19vw, 19rem)",
                      letterSpacing: "-0.03em",
                      WebkitTextStroke: "clamp(1.5px, 0.175vw, 3px) rgba(255,255,255,0.42)",
                    }}
                  >
                    WEB
                  </span>
                </div>
              </div>

              {/* — LINE 3: AGENCY. — amber, flush right, with animated dash */}
              <div
                className="overflow-hidden parallax-3"
                style={{ textAlign: "right", paddingRight: "clamp(2rem, 6vw, 8rem)" }}
              >
                <div
                  className="line-mask"
                  style={{ display: "inline-flex", alignItems: "center", gap: "clamp(0.8rem, 2.5vw, 3rem)" }}
                >
                  {/* Accent dash — grows on reveal, hidden on mobile */}
                  <span
                    className="accent-dash hidden sm:block"
                    style={{
                      width: "clamp(1.5rem, 4.5vw, 6rem)",
                      height: "clamp(2px, 0.22vw, 3.5px)",
                      background: "#fbbf24",
                      marginBottom: "0.18em",
                      transformOrigin: "left center",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="text-amber-400 block"
                    style={{ fontSize: "clamp(4.8rem, 19vw, 19rem)", letterSpacing: "-0.03em" }}
                  >
                    AGENCY.
                  </span>
                </div>
              </div>

            </h1>

            {/* ── TAGLINE + CTA ROW ─────────────────────────── */}
            <div
              className="hero-sub flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-4"
              style={{ marginTop: "clamp(1.5rem, 4vw, 3rem)" }}
            >

              {/* LEFT — Copy block */}
              <div style={{ maxWidth: "clamp(260px, 34vw, 460px)" }}>
                <p style={{ fontSize: "clamp(0.8rem, 1.35vw, 1.05rem)", color: "rgba(255,255,255,0.4)", fontWeight: 300, lineHeight: 1.75 }}>
                  We build{" "}
                  <ScrambleCycle
                    words={CYCLE_WORDS}
                    className="text-amber-400 font-bold"
                    style={{ display: "inline-block", minWidth: "10ch" }}
                  />
                  {" "}that{" "}
                  <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>win customers 24/7</span>
                  {" "}— for Midnapore businesses ready to{" "}
                  <span style={{ color: "#fbbf24", fontWeight: 600 }}>dominate their market.</span>
                </p>

                {/* Social proof row */}
                <div className="social-proof flex items-center gap-3" style={{ marginTop: "clamp(1rem, 2vw, 1.5rem)" }}>
                  {/* Avatar stack */}
                  <div style={{ display: "flex", gap: "-6px" }}>
                    {[
                      { l: "A", bg: "#fbbf24" },
                      { l: "R", bg: "#f59e0b" },
                      { l: "S", bg: "#d97706" },
                      { l: "M", bg: "#b45309" },
                      { l: "+", bg: "#78350f" },
                    ].map(({ l, bg }, i) => (
                      <div key={i} style={{
                        width: 26, height: 26, borderRadius: "50%",
                        border: "1.5px solid #000",
                        background: bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "9px", fontWeight: 900, color: "#000",
                        marginLeft: i === 0 ? 0 : -8,
                        position: "relative", zIndex: 5 - i,
                      }}>
                        {l}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
                      50+ businesses trust us
                    </div>
                    <div style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.12em", color: "rgba(251,191,36,0.5)", textTransform: "uppercase" }}>
                      ★★★★★ West Bengal
                    </div>
                  </div>
                </div>

                {/* Phone link */}
                <MagneticBtn
                  href="tel:+919476477956"
                  className="group"
                  style={{ marginTop: "clamp(0.8rem, 1.8vw, 1.25rem)", display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  <svg style={{ width: 13, height: 13, color: "rgba(255,255,255,0.35)", flexShrink: 0, transition: "color 0.3s" }}
                    fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <span style={{
                    fontFamily: "monospace", fontSize: "clamp(0.6rem, 0.9vw, 0.74rem)",
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                    paddingBottom: 2,
                    transition: "color 0.3s, border-color 0.3s",
                  }}>
                    +91 94764 77956 — Free Consult
                  </span>
                </MagneticBtn>
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR ─────────────────────────────────────── */}
          <div
            className="hero-bottom-bar flex items-center justify-between flex-wrap gap-4"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: "clamp(0.9rem, 1.8vw, 1.4rem)",
              paddingBottom: "clamp(0.9rem, 1.8vw, 1.4rem)",
            }}
          >
            {/* Stats */}
            <div className="flex items-center gap-6 sm:gap-10">
              {[
                { cls: "count-projects", init: "50+", label: "Projects" },
                { cls: "count-rate",     init: "100%", label: "Satisfaction", color: undefined },
                { cls: null, init: "∞",  label: "Support", color: "#fbbf24", hideOnMobile: true },
              ].map(({ cls, init, label, color, hideOnMobile }, i, arr) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
                  {i > 0 && <div style={{ width: 1, height: 30, background: "rgba(255,255,255,0.08)" }} />}
                  <div className={hideOnMobile ? "hidden sm:flex flex-col gap-0.5" : "flex flex-col gap-0.5"}>
                    <span
                      className={cls || ""}
                      style={{
                        fontSize: "clamp(1.3rem, 2.8vw, 2.3rem)",
                        fontWeight: 900, letterSpacing: "-0.04em",
                        color: color || "#ffffff",
                        lineHeight: 1,
                      }}
                    >
                      {init}
                    </span>
                    <span style={{ fontFamily: "monospace", fontSize: "8.5px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-2.5 ml-auto sm:ml-0">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: 38, overflow: "hidden" }}>
                <div
                  className="scroll-dot-inner"
                  style={{ width: 1, height: "100%", background: "rgba(251,191,36,0.4)" }}
                />
              </div>
              <span style={{
                writingMode: "vertical-rl",
                fontFamily: "monospace", fontSize: "8.5px",
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}>
                Scroll
              </span>
            </div>
          </div>
        </div>

        {/* ════ MEGA AMBER MARQUEE ════════════════════════════════
            Much larger text — feels like a fashion house billboard
        ════════════════════════════════════════════════════════ */}
        <div
          aria-hidden="true"
          className="hero-ticker relative z-20 overflow-hidden bg-amber-400"
          style={{ paddingTop: "clamp(0.6rem, 1.2vw, 1rem)", paddingBottom: "clamp(0.6rem, 1.2vw, 1rem)" }}
        >
          <div className="ticker-track flex items-center whitespace-nowrap" style={{ width: "max-content" }}>
            {[...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS].map((word, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(1rem, 2.4vw, 2rem)",
                  fontWeight: 900,
                  color: word === "✦" ? "rgba(0,0,0,0.28)" : "#000",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  marginLeft: "clamp(1rem,3vw,2.5rem)",
                  marginRight: "clamp(1rem,3vw,2.5rem)",
                  lineHeight: 1,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}
