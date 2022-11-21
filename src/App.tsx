import { useEffect, useState } from "react";
import "./App.css";
import { StandardMaterials } from "./components/StandardMaterials";
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const canvas = document.querySelector("canvas")!;
    new StandardMaterials(canvas);
  });
  return (
    <div className="App">
      <h2>Babylon</h2>
      <canvas></canvas>
    </div>
  );
}

export default App;
