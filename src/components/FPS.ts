import {
  CubeTexture,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  PBRMaterial,
  Scene,
  SceneLoader,
  Texture,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders";
export class FPS {
  scene: Scene;
  engine: Engine;
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.createController();
    this.createPrototype();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    scene.onPointerDown = (e) => {
      if (e.button == 0) this.engine.enterPointerlock();
      if (e.button == 1) this.engine.exitPointerlock();
    };
    const framesPerSeconds = 60;
    const gravity = -9.81;
    scene.gravity = new Vector3(0, gravity / framesPerSeconds, 0);
    scene.collisionsEnabled = true;

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    hemiLight.intensity = 0.5;
    return scene;
  }

  createController(): void {
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.4;
    camera.applyGravity = true;
    camera.checkCollisions = true;
    camera.ellipsoid = new Vector3(1, 1, 1);
    camera.minZ = 0.65;
    camera.angularSensibility = 3000;
    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
  }
  async createPrototype(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "gsk2.glb"
    );
    meshes.map((mesh) => (mesh.checkCollisions = true));
    console.log("meshes=", meshes);
  }
}
