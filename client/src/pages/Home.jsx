import { useEffect, useState } from "react";
import AboutMe from "../components/AboutMe";
import AwwwardsRecognition from "../components/AwwwardsRecognition";
import IITCertification from "../components/IITCertification";
import Comparison from "../components/Comparison";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PremiumScroll from "../components/PremiumScroll";
import Pricing from "../components/Pricing";
import Process from "../components/Process";
import SeoMidnapore from "../components/SeoMidnapore";
import Testimonials from "../components/Testimonials";
import TrustMetrics from "../components/TrustMetrics";
import WhatIBuild from "../components/WhatIBuild";
import WorksTunnel from "../components/WorksTunnel";
import { Terms, Privacy, Refund } from "../components/Policies";

export default function Home() {
  const [pageParam, setPageParam] = useState(null);

  useEffect(() => {
    // Read URL query string on mount safely in client side
    const urlParams = new URLSearchParams(window.location.search);
    setPageParam(urlParams.get("page"));
  }, []);

  // Intercept render if a specialized gateway path matches
  if (pageParam === "terms") return <Terms />;
  if (pageParam === "privacy") return <Privacy />;
  if (pageParam === "refund") return <Refund />;

  return (
    <main className="bg-zinc-950 min-h-screen text-white">
      <PremiumScroll />
      <Hero />
      <Process />
      <AboutMe />
      <Comparison />
      <TrustMetrics />
      <AwwwardsRecognition />
      <IITCertification />
      <WorksTunnel />
      <Testimonials />
      {/* <Pricing /> */}
      <WhatIBuild />
      <SeoMidnapore />
      <FAQ />
      <Footer />
    </main>
  );
}
