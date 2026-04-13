import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import WorksTunnel from './components/WorksTunnel';

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor /> 
      <main className="bg-zinc-950 min-h-screen text-white">
        <Hero />
        <WorksTunnel />
        {/* You can just drop a simple footer directly below this later */}
      </main>
    </SmoothScroll>
  );
}