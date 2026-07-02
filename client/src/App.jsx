import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor /> 
      <Home />

      <Analytics />
      <SpeedInsights />
    </SmoothScroll>
  );
}