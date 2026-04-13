import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor /> 
      <Home />
    </SmoothScroll>
  );
}