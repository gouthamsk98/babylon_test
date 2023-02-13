import { useEffect, useState } from "react";
import "./App.css";
import { FPS } from "./components/FPS";
import { PBR } from "./components/PBR";
import { WaterRace } from "./components/WaterRace";
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    return () => {
      const canvas = document.querySelector("canvas")!;
      new WaterRace(canvas);
    };
  });
  return (
    <div className="App">
      <h2>Babylon</h2>
      <canvas></canvas>
    </div>
  );
}

export default App;
