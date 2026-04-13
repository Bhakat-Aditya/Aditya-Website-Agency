import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  // Your actual contact details
  const email = "bhakataditya0@gmail.com";
  const phone = "+91 9476477956";

  // The Boilerplate Template (URL Encoded for links)
  // The Boilerplate Template (URL Encoded for links)
  const rawTemplate = `Hello Aditya,\n\nI am looking to get a website for my business. Here are my details:\n\nName: \nMobile Number: \nBusiness Name: \nPlan: \nWhat I need: \n\nThanks!`;
  const emailSubject = encodeURIComponent("Enquiry for website");
  const encodedTemplate = encodeURIComponent(rawTemplate);

  // Force Gmail Web Web Client instead of default desktop app
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${emailSubject}&body=${encodedTemplate}`;

  const whatsappLink = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodedTemplate}`;
  const callLink = `tel:${phone}`;

  useGSAP(
    () => {
      // Smooth fade-up for all elements when the footer comes into view
      gsap.from(".footer-reveal", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <footer
        ref={containerRef}
        className="relative bg-zinc-950 text-white pt-32 pb-12 px-6 md:px-12 border-t border-zinc-900 overflow-hidden"
      >
        {/* Subtle Background Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Section: CTA & Contact Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            {/* Left: The Local Pitch */}
            <div className="footer-reveal">
              <h2 className="text-sm font-mono text-zinc-500 tracking-[0.2em] mb-4 uppercase">
                Need a website for your business?
              </h2>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
                Let's <br />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-zinc-400">
                  Talk.
                </span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-md">
                Whether you are running a local wholesale business, a sports
                turf, or a cafe, I build smart, fast, and beautifully animated
                websites that bring customers directly to your door. Khata kolom
                er jhamela bad din, let's go digital.
              </p>
            </div>

            {/* Right: Direct Contact Info */}
            <div className="footer-reveal flex flex-col justify-center gap-6">
              {/* Email Box */}
              {/* Email Box */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
                <p className="text-sm text-zinc-500 mb-2">Drop an Email</p>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="text-xl md:text-2xl font-bold">{email}</span>
                  <a
                    href={gmailLink}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-hover px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform inline-block"
                  >
                    Email Me
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp Box */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm">
                <p className="text-sm text-zinc-500 mb-2">
                  Call or WhatsApp (Midnapore)
                </p>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="text-xl md:text-2xl font-bold">{phone}</span>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="cursor-hover px-6 py-2 bg-green-500 text-black font-bold rounded-full hover:scale-105 transition-transform"
                  >
                    Reach Aditya
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Clean Copyright */}
          <div className="footer-reveal pt-8 border-t border-zinc-800/50 text-center text-sm text-zinc-500 flex flex-col items-center gap-2">
            <p className="font-bold text-zinc-400">
              Aditya Bhakat • Full Stack Developer
            </p>
            <p>
              © {new Date().getFullYear()} Crafted with React, Tailwind & GSAP
              in Midnapore, WB.
            </p>
          </div>
        </div>
      </footer>

      {/* --- CUSTOM POPUP OVERLAY --- */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          {/* Invisible click-away backdrop */}
          <div
            className="absolute inset-0 cursor-hover"
            onClick={() => setShowPopup(false)}
          ></div>

          {/* Popup Modal Box */}
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl z-10 transform transition-all">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white cursor-hover transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
              How would you like to connect?
            </h3>
            <p className="text-zinc-400 mb-8 text-sm">
              Choose the fastest way to get your project started.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowPopup(false)}
                className="cursor-hover w-full py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full flex items-center justify-center gap-2 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>

              <a
                href={callLink}
                onClick={() => setShowPopup(false)}
                className="cursor-hover w-full py-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-full flex items-center justify-center gap-2 transition-colors"
              >
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Directly
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
