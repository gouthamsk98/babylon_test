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
export class LightShadows {
  scene: Scene;
  engine: Engine;
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    // this.createLightShadow();
    this.createPrototype();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.4;
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    hemiLight.intensity = 0.5;
    return scene;
  }

  async createLightShadow(): Promise<void> {
    const models = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "LightingScene.glb"
    );
    // models.meshes[2].position = new Vector3(1, 0, 0);
    console.log("meshes=", models);
  }
  async createPrototype(): Promise<void> {
    const models = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "gsk2.glb"
    );
    console.log("meshes=", models);
  }
}
