import {
  CubeTexture,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";
import diffuse from "../assets/textures/ground/cobblestone_floor_08_diff_1k.jpg";
import normal from "../assets/textures/ground/cobblestone_floor_08_nor_gl_1k.jpg";
import ao from "../assets/textures/ground/cobblestone_floor_08_ao_1k.jpg";
import spec from "../assets/textures/ground/cobblestone_floor_08_disp_1k.jpg";
import ao_ball from "../assets/textures/metal/metal_ao.jpg";
import diffuse_ball from "../assets/textures/metal/metal_diffuse.jpg";
import normal_ball from "../assets/textures/metal/metal_normal.jpg";
import spec_ball from "../assets/textures/metal/metal_spec.jpg";
export class PBR {
  scene: Scene;
  engine: Engine;
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    hemiLight.intensity = 0.5;
    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./env/environment.env",
      scene
    );
    scene.environmentTexture = envTex;
    scene.createDefaultSkybox(envTex);
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      this.scene
    );
    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    ball.position = new Vector3(0, 1, 0);

    return scene;
  }
}
