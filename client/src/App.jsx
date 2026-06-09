import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import VirtualConsultant from './components/VirtualConsultant';

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor /> 
      <Home />
      <VirtualConsultant />
    </SmoothScroll>
  );
}