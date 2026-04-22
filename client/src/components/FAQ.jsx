import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: 1,
    question:
      "I already have a Facebook/Instagram page, why do I need a website?",
    answer:
      "Social media is great, but you don't own it. A website is your permanent digital storefront. It builds massive trust, makes you look like a premium business, and most importantly, it allows you to show up on Google when people in your area search for your services.",
  },
  {
    id: 2,
    question: "Amar choto dokan, amar ki sotti website er dorkar ache?",
    answer:
      "Ekdom! Ajkal sobai Google-e aage search kore. Ekta choto website apnar dokan ke local market-e onnoder theke alada korbe. Customers der kache apnar business ke aaro professional ar trustworthy lagbe.",
  },
  {
    id: 3,
    question: "Do I have to write all the text and provide photos?",
    answer:
      "Not at all! If you have photos, great. If not, I can source high-quality, professional stock images that fit your business. For the text, we will have a quick chat, and I will write professional copy that sells your services effectively.",
  },
  {
    id: 4,
    question:
      "Pore jodi amar dokaner kono photo ba phone number change korte hoy, tokhon ki korbo?",
    answer:
      "Khub sohoj. Apni amake just WhatsApp kore diben, ami update kore debo (minor text changes are always free!). Ar jodi apni 'Backend System' plan nen, tahole apni nijei phone ba computer theke jekono somoy update korte parben.",
  },
  {
    id: 5,
    question: "What happens if something breaks after the website is live?",
    answer:
      "I don't just build your site and disappear. If there is a technical bug or something goes down, I am just a WhatsApp message away to fix it. I make sure your website stays running smoothly.",
  },
  {
    id: 6,
    question: "Domain ar Hosting jinis ta ki? Eta keno yearly pay korte hoy?",
    answer:
      "Bhabun 'Domain' holo apnar dokaner nam (jemon: apnardokan.com), ar 'Hosting' holo internet-e apnar dokaner bhara. Internet e apnar jaiga dhore rakhar jonno eta yearly dite hoy. Tobe chap nei, prothom bochor domain charge amar thekei free thakbe!",
  },
  {
    id: 7,
    question: "Are there any hidden charges or monthly fees?",
    answer:
      "No hidden tricks. You pay the one-time development fee based on the package you choose. The only recurring cost is for your domain name and hosting, which is a standard yearly cost to keep the site live on the internet.",
  },
  {
    id: 8,
    question: "How long does it take to build the website?",
    answer:
      "For standard business websites, it usually takes between 5 to 7 days from our first chat to the final live website, depending on how fast we finalize the design.",
  },
];

export default function FAQ() {
  const containerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(
    () => {
      // Animate Header
      gsap.from(".faq-header", {
        scrollTrigger: {
          trigger: ".faq-header",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate individual FAQ items staggering in
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-zinc-950 py-32 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="faq-header text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white italic">
            Got <span className="text-amber-500">Questions?</span>
          </h2>
          <p className="mt-6 text-zinc-400 text-lg uppercase tracking-widest font-medium">
            Clear your doubts. Let's get to work.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="faq-list flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id}
                className="faq-item bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden transition-colors hover:border-zinc-700"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <h3
                    className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 pr-8 ${
                      isOpen ? "text-amber-500" : "text-white"
                    }`}
                  >
                    {faq.question}
                  </h3>

                  {/* Plus/Minus Icon */}
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "border-amber-500 bg-amber-500/10 text-amber-500 rotate-180"
                        : "border-zinc-700 text-zinc-400"
                    }`}
                  >
                    <span className="text-xl leading-none block relative top-[-1px]">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                </button>

                {/* Animated Answer Body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-zinc-400 leading-relaxed text-base md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
