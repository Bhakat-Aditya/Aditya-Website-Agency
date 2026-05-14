import AboutMe from '../components/AboutMe';
import AwwwardsRecognition from '../components/AwwwardsRecognition';
import Comparison from '../components/Comparison';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import PremiumScroll from '../components/PremiumScroll';
import Pricing from '../components/Pricing';
import Process from '../components/Process';
import SeoMidnapore from '../components/SeoMidnapore';
import Testimonials from '../components/Testimonials';
import TrustMetrics from '../components/TrustMetrics';
import WhatIBuild from '../components/WhatIBuild';
import WorksTunnel from '../components/WorksTunnel';

export default function Home() {
  return (
    <main className="bg-zinc-950 min-h-screen text-white">
      <PremiumScroll />
      <Hero />
      <Process />
      <AboutMe />
      <Comparison />
      <TrustMetrics />
      <AwwwardsRecognition />
      <WorksTunnel />
      <Testimonials />
      <Pricing />
      <WhatIBuild />
      <SeoMidnapore />
      <FAQ />
      <Footer />
    </main>
  );
}