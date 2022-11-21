import { useEffect, useState } from "react";
import "./App.css";
import { StandardMaterial } from "./components/StandardMaterials";
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const canvas = document.querySelector("canvas")!;
    new StandardMaterial(canvas);
  });
  return (
    <div className="App">
      <h2>Babylon</h2>
      <canvas></canvas>
    </div>
  );
}

export default App;
