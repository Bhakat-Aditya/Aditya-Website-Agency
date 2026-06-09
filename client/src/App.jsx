import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import VirtualConsultant from './components/VirtualConsultant';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor /> 
      <Home />
      <VirtualConsultant />
      <Analytics />
      <SpeedInsights />
    </SmoothScroll>
  );
}