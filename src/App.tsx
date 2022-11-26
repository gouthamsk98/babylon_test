import { useEffect, useState } from "react";
import "./App.css";
import { LightShadows } from "./components/LightShadows";
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    return () => {
      const canvas = document.querySelector("canvas")!;
      new LightShadows(canvas);
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
