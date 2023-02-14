import { useEffect, useState } from "react";
import "./App.css";
import { FPS } from "./components/FPS";
import { PBR } from "./components/PBR";
import { BasicScene } from "./components/BasicScene";
import { WaterRace } from "./components/WaterRace";
import Sidebar from "./Sidebar";
function App() {
  const [circle, setCircle] = useState(0);
  const [square, setSquare] = useState(0);
  const [triangle, setTriangle] = useState(0);

  useEffect(() => {
    return () => {};
  });
  useEffect(() => {
    const canvas = document.querySelector("canvas")!;
    new BasicScene(canvas, circle, square, triangle);
  }, [circle, square, triangle]);
  const handleDrop = (event: any) => {
    event.preventDefault();
    const imageSrc = event.dataTransfer.getData("text/plain");
    console.log(imageSrc);
    if (imageSrc == "circle") {
      setCircle(circle + 1);
    }
    if (imageSrc == "sqaure") setSquare(square + 1);
    if (imageSrc == "triangle") setTriangle(triangle + 1);
    // Use Babylon.js to apply the image texture to the 3D model
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="App">
      <Sidebar />
      <h2>Babylon</h2>
      <canvas></canvas>
    </div>
  );
}

export default App;
