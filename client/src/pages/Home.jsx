import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import WorksTunnel from '../components/WorksTunnel';

export default function Home() {
  return (
    <main className="bg-zinc-950 min-h-screen text-white">
      <Hero />
      <WorksTunnel />
      <Pricing />
      <Footer />
    </main>
  );
}