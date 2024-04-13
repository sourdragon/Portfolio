import { useState, useEffect } from "react";
import AnimatedStripe from "./components/AnimatedStripe";
import NamePane from "./components/NamePane";

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 576);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 576);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-ctp-base w-screen h-screen">
      <h1>Some changes f</h1>
      <AnimatedStripe />
      <NamePane />
    </div>
  );
}

export default App;
