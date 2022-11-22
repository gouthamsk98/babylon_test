import { useEffect, useState } from "react";
import "./App.css";
import { CustomModels } from "./components/CustomModels";
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    return () => {
      const canvas = document.querySelector("canvas")!;
      new CustomModels(canvas);
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
