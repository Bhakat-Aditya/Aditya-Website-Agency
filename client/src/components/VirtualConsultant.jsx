import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const STEPS = {
  GREETING: "GREETING",
  INDUSTRY_SELECTED: "INDUSTRY_SELECTED",
  PACKAGE_SELECTED: "PACKAGE_SELECTED",
  ASK_CONTACT: "ASK_CONTACT",
  COMPLETED: "COMPLETED",
};

export default function VirtualConsultant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(STEPS.GREETING);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  
  const [messages, setMessages] = useState([]);
  
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const chatEndRef = useRef(null);

  // Initialize initial welcome messages on mount
  useEffect(() => {
    // Show tooltip after 3 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    const welcomeMessages = [
      {
        id: 1,
        sender: "bot",
        text: "Welcome to **Aditya Web Agency**! 👋 Let's find the perfect digital solution for your brand.",
        timestamp: new Date(),
      },
      {
        id: 2,
        sender: "bot",
        text: "To give you the best advice, what industry is your business in?",
        timestamp: new Date(),
        options: [
          "Cafe & Restaurant ☕",
          "Gym & Fitness 🏋️‍♂️",
          "Hardware & Retail 🛍️",
          "Hotel & Resort 🏨",
          "Clinic & Healthcare 🏥",
          "Personal Portfolio ✨",
          "Other / Custom 🚀"
        ],
      },
    ];
    setMessages(welcomeMessages);
    setStep(STEPS.INDUSTRY_SELECTED);

    return () => clearTimeout(tooltipTimer);
  }, []);

  // Auto scroll to bottom of chat whenever messages change or typing changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showInput]);

  // GSAP animation for chat window slide open/close
  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }
      );
      setHasUnread(false);
      setShowTooltip(false);
    } else {
      gsap.to(panelRef.current, { scale: 0.9, opacity: 0, y: 30, duration: 0.3, ease: "power2.in" });
    }
  }, [isOpen]);

  const triggerBotResponse = (userText, currentStep = step) => {
    setIsTyping(true);
    setShowInput(false);

    setTimeout(() => {
      let responseMessages = [];
      let nextStep = currentStep;
      let nextShowInput = false;

      if (userText === "Start a New Chat 🔄") {
        responseMessages.push({
          id: Date.now(),
          sender: "bot",
          text: "Welcome back! Let's start fresh. What industry is your business in?",
          timestamp: new Date(),
          options: [
            "Cafe & Restaurant ☕",
            "Gym & Fitness 🏋️‍♂️",
            "Hardware & Retail 🛍️",
            "Hotel & Resort 🏨",
            "Clinic & Healthcare 🏥",
            "Personal Portfolio ✨",
            "Other / Custom 🚀"
          ],
        });
        nextStep = STEPS.INDUSTRY_SELECTED;
      } 
      else if (currentStep === STEPS.INDUSTRY_SELECTED) {
        // Handle Industry Selection
        setSelectedIndustry(userText);
        let pitch = "";
        let package1 = "";
        let package2 = "";

        if (userText.includes("Cafe")) {
          pitch = "Awesome! For a **Cafe & Restaurant**, a website is your 24/7 menu and booking engine. It builds trust and steals hungry customers from competitors! 🌟";
          package1 = "**1. Essential Menu Site**: Perfect for showcasing your menu and location. (₹4,500 - ₹6,000)";
          package2 = "**2. Full Ordering System**: Online food ordering, reservations, & admin dashboard. (₹15,000+)";
        } else if (userText.includes("Gym")) {
          pitch = "Great! A strong online presence for a **Gym & Fitness** center means more walk-ins and memberships. Show off your equipment and trainers! 💪";
          package1 = "**1. Landing Page**: Lead generation form, pricing, and facility showcase. (₹5,000 - ₹8,000)";
          package2 = "**2. Member Portal**: Automated class scheduling, member logins, and workout tracking. (₹15,000+)";
        } else if (userText.includes("Hardware") || userText.includes("Retail")) {
          pitch = "Perfect! For **Hardware & Retail**, a website establishes instant authority locally so people call you before visiting the store. 🛠️";
          package1 = "**1. Digital Catalog**: Showcase top products, brands, and contact info. (₹6,000 - ₹9,000)";
          package2 = "**2. E-Commerce Store**: Full-scale online shop with inventory tracking & payments. (₹18,000+)";
        } else if (userText.includes("Hotel")) {
          pitch = "Fantastic! A **Hotel & Resort** needs a premium, highly visual website to convince guests to book directly with you instead of third-party apps. 🌴";
          package1 = "**1. Premium Showcase**: High-end visuals, gallery, and direct WhatsApp booking. (₹8,000 - ₹12,000)";
          package2 = "**2. Direct Booking Engine**: Full room availability calendars and payment gateways. (₹20,000+)";
        } else if (userText.includes("Clinic")) {
          pitch = "Excellent! Patients look for trust. A **Clinic & Healthcare** website ensures you look professional and easy to reach. 🩺";
          package1 = "**1. Practice Overview**: Services, doctor profiles, and location. (₹5,000 - ₹7,000)";
          package2 = "**2. Appointment System**: Secure patient booking and consultation scheduling. (₹12,000+)";
        } else if (userText.includes("Portfolio")) {
          pitch = "A **Personal Portfolio** is your ultimate digital business card. High-end personal branding with smooth animations will make you stand out! ✨";
          package1 = "**1. Standard Portfolio**: Clean, professional, and fast. (₹3,000 - ₹5,000)";
          package2 = "**2. Premium Animated**: GSAP scroll animations and high-end creative showcase. (₹8,000+)";
        } else {
          pitch = "Got it! No matter the industry, a website is your **24/7 sales engine** that builds credibility and steals customers from competitors! 🚀";
          package1 = "**1. Standard Landing Page**: Optimized for speed and local SEO. (₹4,500 - ₹8,000)";
          package2 = "**2. Custom MERN Platform**: Dashboards, databases, and advanced features. (₹15,000+)";
        }

        responseMessages.push({
          id: Date.now(),
          sender: "bot",
          text: pitch,
          timestamp: new Date(),
        });
        responseMessages.push({
          id: Date.now() + 1,
          sender: "bot",
          text: `We have two main approaches for this:\n\n${package1}\n\n${package2}`,
          timestamp: new Date(),
        });
        responseMessages.push({
          id: Date.now() + 2,
          sender: "bot",
          text: "Which approach sounds like a better fit for your goals?",
          timestamp: new Date(),
          options: [
            "Option 1 (Standard/Essential)",
            "Option 2 (Full/Premium)",
            "Why should I choose you? 🤔"
          ],
        });
        nextStep = STEPS.PACKAGE_SELECTED;
      }
      else if (currentStep === STEPS.PACKAGE_SELECTED && userText === "Why should I choose you? 🤔") {
        responseMessages.push({
          id: Date.now(),
          sender: "bot",
          text: "At **Aditya Web Agency**, we guarantee results. We have successfully delivered **50+ projects**, maintain a **5-star rating** on Google, and ensure **100% client satisfaction**. 🌟",
          timestamp: new Date(),
        });
        responseMessages.push({
          id: Date.now() + 1,
          sender: "bot",
          text: "Plus, we specialize in high-end Motion and Animated websites, and we deliver most projects in **less than 1 week**! ⚡",
          timestamp: new Date(),
        });
        responseMessages.push({
          id: Date.now() + 2,
          sender: "bot",
          text: "Shall we proceed with Option 1 or Option 2?",
          timestamp: new Date(),
          options: [
            "Option 1 (Standard/Essential)",
            "Option 2 (Full/Premium)"
          ],
        });
        nextStep = STEPS.PACKAGE_SELECTED;
      }
      else if (currentStep === STEPS.PACKAGE_SELECTED && (userText.includes("Option 1") || userText.includes("Option 2"))) {
        responseMessages.push({
          id: Date.now(),
          sender: "bot",
          text: "Excellent choice! That's exactly what we specialize in. 🎯",
          timestamp: new Date(),
        });
        responseMessages.push({
          id: Date.now() + 1,
          sender: "bot",
          text: "Plus, hosting is entirely **FREE** from our end forever, and there are absolutely **zero Annual Maintenance Charges (AMC)**. We work on a strict one-time payment model! 💡",
          timestamp: new Date(),
        });
        responseMessages.push({
          id: Date.now() + 2,
          sender: "bot",
          text: "Are you ready to claim your free hosting and get your site live in under a week? Drop your contact info so we can finalize a custom quote for you! 📲",
          timestamp: new Date(),
          options: [
            "Enter Contact Details",
            "Maybe later"
          ],
        });
        nextStep = STEPS.ASK_CONTACT;
      }
      else if (userText === "Enter Contact Details") {
        responseMessages.push({
          id: Date.now(),
          sender: "bot",
          text: "Great! Please type your phone number or email below.",
          timestamp: new Date(),
        });
        nextStep = STEPS.COMPLETED; // We are waiting for the input now
        nextShowInput = true;
      }
      else if (userText === "Maybe later") {
        responseMessages.push({
          id: Date.now(),
          sender: "bot",
          text: "No problem! We're always here when you're ready to scale your business. Have a great day! ✨",
          timestamp: new Date(),
          options: ["Start a New Chat 🔄"],
        });
        nextStep = STEPS.GREETING;
      }
      else if (currentStep === STEPS.COMPLETED) {
        responseMessages.push({
          id: Date.now(),
          sender: "bot",
          text: `Thank you! I have recorded your details: **${userText}**.\n\nAditya will personally reach out to you shortly to go over your exact requirements. Let's make your digital presence unstoppable! 🚀`,
          timestamp: new Date(),
          options: ["Start a New Chat 🔄"],
        });
        nextStep = STEPS.GREETING;
      }
      else {
        // Fallback
        responseMessages.push({
          id: Date.now(),
          sender: "bot",
          text: "I'm always ready. Let me know how I can help you scale your business.",
          timestamp: new Date(),
          options: ["Start a New Chat 🔄"],
        });
      }

      // Add messages incrementally to simulate human typing speed
      let currentDelay = 0;
      responseMessages.forEach((msg, index) => {
        setTimeout(() => {
          setMessages((prev) => {
            // Remove options from previous bot messages so they only show on the latest one
            const updatedPrev = prev.map(m => m.sender === "bot" ? { ...m, options: [] } : m);
            return [...updatedPrev, msg];
          });
          if (index === responseMessages.length - 1) {
            setIsTyping(false);
            setStep(nextStep);
            setShowInput(nextShowInput);
          }
        }, currentDelay);
        // Delay is longer for longer messages to seem natural
        currentDelay += msg.text.length * 12 + 300; 
      });

    }, 600);
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      // Remove options from previous bot messages when user replies
      const updatedPrev = prev.map(m => m.sender === "bot" ? { ...m, options: [] } : m);
      return [...updatedPrev, newMsg];
    });
    setInputValue("");
    triggerBotResponse(text);
  };

  const handleOptionClick = (option) => {
    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: option,
      timestamp: new Date(),
    };
    setMessages((prev) => {
      const updatedPrev = prev.map(m => m.sender === "bot" ? { ...m, options: [] } : m);
      return [...updatedPrev, newMsg];
    });
    triggerBotResponse(option);
  };

  const renderTextContent = (text) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = text.split(boldRegex);
    return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">{part}</strong> : part);
  };

  return (
    <>
      {/* 1. ATTENTION GETTING FLOATING TOOLTIP */}
      {showTooltip && !isOpen && (
        <div 
          className="fixed bottom-[96px] right-6 md:bottom-[108px] md:right-8 z-[9998] flex items-center bg-zinc-950/90 text-white text-xs md:text-sm font-medium py-3.5 px-5 rounded-2xl border border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-bounce select-none pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="tracking-wide">Chat with us to build your dream site! ✨</span>
          </div>
          <div className="absolute right-7 bottom-[-7px] w-3.5 h-3.5 bg-zinc-950/90 border-r border-b border-zinc-800 rotate-45 backdrop-blur-xl" />
        </div>
      )}

      {/* 2. STICKY TRIGGER BUTTON */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] md:bottom-8 md:right-8 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-zinc-950 shadow-[0_0_30px_rgba(245,158,11,0.5)] border-2 border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden group"
        aria-label="Toggle virtual consultant chat"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 pointer-events-none relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 pointer-events-none relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600 border-2 border-zinc-900 text-[10px] text-white font-black items-center justify-center">1</span>
          </span>
        )}
      </button>

      {/* 3. CHAT WINDOW PANEL */}
      <div
        ref={panelRef}
        data-lenis-prevent="true"
        className={`fixed bottom-28 right-6 w-[400px] max-w-[calc(100vw-48px)] h-[650px] max-h-[calc(100vh-160px)] z-[9997] md:bottom-32 md:right-8 rounded-[2rem] overflow-hidden flex flex-col bg-zinc-950/80 border border-zinc-800/60 shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.05)] backdrop-blur-3xl transition-all duration-300 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none select-none opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-zinc-900/40 border-b border-zinc-800/50 px-6 py-5 flex items-center justify-between shadow-sm backdrop-blur-md relative z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-50" />
          <div className="flex items-center gap-4 relative">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/80 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h1v1H9V9zm5 0h1v1h-1V9z" />
              </svg>
              <span className="absolute bottom-0.5 right-0.5 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-zinc-900 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-[15px] font-black text-white tracking-tight leading-tight drop-shadow-md">Aditya Web Agency</span>
              <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span> Online
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 p-2 rounded-full transition-all duration-300 cursor-pointer relative"
            aria-label="Close chat window"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Message Box */}
        <div 
          className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent overscroll-contain relative z-0"
          data-lenis-prevent="true"
        >
          {messages.map((msg) => {
            const isBot = msg.sender === "bot";
            
            return (
              <div
                key={msg.id}
                className={`flex w-full ${isBot ? "justify-start" : "justify-end"} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] text-[14px] px-5 py-4 rounded-3xl leading-relaxed whitespace-pre-line shadow-lg ${
                    isBot
                      ? "bg-zinc-800/60 border border-zinc-700/50 text-zinc-100 rounded-tl-sm backdrop-blur-md"
                      : "bg-gradient-to-br from-amber-500 to-amber-600 border border-amber-400/30 text-zinc-950 font-bold rounded-tr-sm shadow-[0_5px_20px_rgba(245,158,11,0.25)]"
                  }`}
                >
                  {renderTextContent(msg.text)}

                  {/* Render Quick Options nested within the chat bubble */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="flex flex-wrap gap-2.5 pt-4 mt-3 border-t border-zinc-700/50">
                      {msg.options.map((opt, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(opt)}
                          className="bg-zinc-900/80 border border-zinc-600/50 hover:border-amber-400/80 hover:bg-amber-500/10 hover:text-amber-300 text-[12.5px] font-bold py-2.5 px-4 rounded-xl text-zinc-300 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm cursor-pointer w-full text-left flex items-center justify-between group"
                        >
                          <span>{opt}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator Bubble */}
          {isTyping && (
            <div className="flex w-full justify-start animate-fade-in">
              <div className="bg-zinc-800/60 border border-zinc-700/50 px-5 py-4 rounded-3xl rounded-tl-sm shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2.5 h-2.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2.5 h-2.5 bg-zinc-400 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} className="h-2" />
        </div>

        {/* Footer Input Area - ONLY shown when we explicitly ask for contact details */}
        {showInput && (
          <div className="p-4 border-t border-zinc-800/60 bg-zinc-900/50 backdrop-blur-xl flex items-center gap-3 animate-fade-in relative z-10">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Enter email or phone number..."
              className="flex-grow bg-zinc-950/80 border border-zinc-700 hover:border-zinc-500 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
            />
            <button
              onClick={() => handleSend()}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 w-12 h-12 rounded-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-[0_5px_15px_rgba(245,158,11,0.3)] cursor-pointer"
              aria-label="Send details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

