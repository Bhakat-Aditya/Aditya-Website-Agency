import AboutMe from '../components/AboutMe';
import Comparison from '../components/Comparison';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import Process from '../components/Process';
import SeoMidnapore from '../components/SeoMidnapore';
import Testimonials from '../components/Testimonials';
import WorksTunnel from '../components/WorksTunnel';

export default function Home() {
  return (
    <main className="bg-zinc-950 min-h-screen text-white">
      <Hero />
      <Process />
      <AboutMe />
      <Comparison />
      <WorksTunnel />
      <Testimonials />
      <Pricing />
      <SeoMidnapore />
      <FAQ />
      <Footer />
    </main>
  );
}