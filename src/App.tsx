import { useEffect, useState } from "react";
import "./App.css";
import { FPS } from "./components/FPS";
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    return () => {
      const canvas = document.querySelector("canvas")!;
      new FPS(canvas);
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
