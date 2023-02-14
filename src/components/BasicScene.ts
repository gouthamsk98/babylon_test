import {
  Engine,
  FreeCamera,
  HemisphericLight,
  int,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";

export class BasicScene {
  scene: Scene;
  engine: Engine;
  constructor(private canvas: HTMLCanvasElement, private circle: int) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  CreateScene(): Scene {
    console.log("circle", this.circle);
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    hemiLight.intensity = 0.5;
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      this.scene
    );

    for (let i = 0; i < this.circle; i++) {
      const ball = MeshBuilder.CreateSphere(
        "ball",
        { diameter: 0.5 },
        this.scene
      );
      ball.position = new Vector3(i + 0.5, 1, 0);
    }

    return scene;
  }
}
